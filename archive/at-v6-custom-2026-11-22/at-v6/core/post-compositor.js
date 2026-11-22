/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/post-compositor.js
   Multi-Pass Nuke Compositor:
   1. Chapter A / Chapter B -> FXScrollTransition.glsl
   2. WorkComposite.fs (6-Octave FBM Radial Zoom <-> WorkDetail)
   3. Half-Res Luminance Bloom Extraction & Blur
   4. GlobalComposite.fs (Frost + MouseFluid Melt + Corner Mist + Grain)
   ============================================================================ */

import * as THREE from 'three';
import { bus, tween } from './state-bus.js';
import {
  FULLSCREEN_VERT,
  WORK_COMPOSITE_FRAG,
  FX_SCROLL_TRANSITION_FRAG,
  GLOBAL_COMPOSITE_FRAG
} from '../shaders/detail-and-global-shaders.js';

const BLOOM_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 uTexel;

void main() {
  vec2 stepUv = uTexel * 2.6;
  vec3 c0 = texture2D(tInput, vUv).rgb;
  vec3 c1 = texture2D(tInput, clamp(vUv + vec2(stepUv.x, 0.0), 0.002, 0.998)).rgb;
  vec3 c2 = texture2D(tInput, clamp(vUv - vec2(stepUv.x, 0.0), 0.002, 0.998)).rgb;
  vec3 c3 = texture2D(tInput, clamp(vUv + vec2(0.0, stepUv.y), 0.002, 0.998)).rgb;
  vec3 c4 = texture2D(tInput, clamp(vUv - vec2(0.0, stepUv.y), 0.002, 0.998)).rgb;
  vec3 c5 = texture2D(tInput, clamp(vUv + stepUv * 0.75, 0.002, 0.998)).rgb;
  vec3 c6 = texture2D(tInput, clamp(vUv - stepUv * 0.75, 0.002, 0.998)).rgb;
  vec3 avg = (c0 * 0.24 + (c1 + c2 + c3 + c4) * 0.14 + (c5 + c6) * 0.10);
  float lum = dot(avg, vec3(0.2126, 0.7152, 0.0722));
  gl_FragColor = vec4(avg * smoothstep(0.32, 0.92, lum), 1.0);
}
`;

function createColorRT(w, h) {
  return new THREE.WebGLRenderTarget(Math.max(2, w), Math.max(2, h), {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    depthBuffer: true,
    stencilBuffer: false
  });
}

export class PostCompositor {
  constructor(renderer, sharedTextures, fluidSolver, workScene, detailScene, worldChapters) {
    this.renderer = renderer;
    this.sharedTextures = sharedTextures;
    this.fluidSolver = fluidSolver;
    this.workScene = workScene;
    this.detailScene = detailScene;
    this.worldChapters = worldChapters;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rw = Math.floor(window.innerWidth * dpr);
    const rh = Math.floor(window.innerHeight * dpr);

    this.rtA = createColorRT(rw, rh);
    this.rtB = createColorRT(rw, rh);
    this.rtChapterMerged = createColorRT(rw, rh);
    this.rtDetail = createColorRT(rw, rh);
    this.rtWorkMerged = createColorRT(rw, rh);
    this.rtBloom = createColorRT(Math.floor(rw * 0.4), Math.floor(rh * 0.4));

    this.orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
    this.quadScene = new THREE.Scene();
    this.quadScene.add(this.quad);

    this.anim = { workTrans: 0, contact: 0, visible: 1, uiBlend: 0, chatOpen: 1 };

    this.fxTransMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: FX_SCROLL_TRANSITION_FRAG,
      uniforms: {
        tMap1: { value: this.rtA.texture },
        tMap2: { value: this.rtB.texture },
        tNormal: { value: sharedTextures.roadNormal },
        uTransition: { value: 0 },
        uAngle: { value: 0.7 },
        uRatio: { value: rw / Math.max(1, rh) }
      },
      depthTest: false,
      depthWrite: false
    });

    this.workCompMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: WORK_COMPOSITE_FRAG,
      uniforms: {
        tWork: { value: this.rtChapterMerged.texture },
        tDetail: { value: this.rtDetail.texture },
        uTransition: { value: 0 },
        uResolution: { value: new THREE.Vector2(rw, rh) }
      },
      depthTest: false,
      depthWrite: false
    });

    this.bloomMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLOOM_FRAG,
      uniforms: {
        tInput: { value: this.rtWorkMerged.texture },
        uTexel: { value: new THREE.Vector2(1 / Math.max(2, this.rtBloom.width), 1 / Math.max(2, this.rtBloom.height)) }
      },
      depthTest: false,
      depthWrite: false
    });

    this.globalMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: GLOBAL_COMPOSITE_FRAG,
      uniforms: {
        tDiffuse: { value: this.rtWorkMerged.texture },
        tBloom: { value: this.rtBloom.texture },
        tNormal: { value: sharedTextures.roadNormal },
        tFluid: { value: fluidSolver.velocityTexture },
        tFluidMask: { value: fluidSolver.maskTexture },
        uResolution: { value: new THREE.Vector2(rw, rh) },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uScrollDelta: { value: 0 },
        uContact: { value: 0 },
        uChatOpen: { value: 1 },
        uVisible: { value: 1 },
        uUIColor: { value: new THREE.Color('#00f2fe') },
        uUIBlend: { value: 0 }
      },
      depthTest: false,
      depthWrite: false
    });

    this.bindTransitions();
  }

  bindTransitions() {
    bus.on('work/project', (proj) => {
      if (proj) {
        this.globalMat.uniforms.uUIColor.value.set(`#${proj.uiColor || '00f2fe'}`);
        tween(this.anim, { workTrans: 1, uiBlend: 1 }, 1450, 'workInOut', 0, () => {
          this.workCompMat.uniforms.uTransition.value = this.anim.workTrans;
          this.globalMat.uniforms.uUIBlend.value = this.anim.uiBlend;
        });
      } else {
        tween(this.anim, { workTrans: 0, uiBlend: 0 }, 820, 'workInOut', 0, () => {
          this.workCompMat.uniforms.uTransition.value = this.anim.workTrans;
          this.globalMat.uniforms.uUIBlend.value = this.anim.uiBlend;
        });
      }
    });

    bus.on('ui/contact', (open) => {
      tween(this.anim, { contact: open ? 1 : 0 }, open ? 1200 : 750, 'workInOut', 0, () => {
        this.globalMat.uniforms.uContact.value = this.anim.contact;
      });
    });

    bus.listen('stage/reveal', () => {
      tween(this.anim, { visible: 1 }, 1150, 'easeOutCubic', 0, () => {
        this.globalMat.uniforms.uVisible.value = this.anim.visible;
      });
    });
  }

  onResize(w, h, dpr) {
    const rw = Math.max(2, Math.floor(w * dpr));
    const rh = Math.max(2, Math.floor(h * dpr));
    this.rtA.setSize(rw, rh);
    this.rtB.setSize(rw, rh);
    this.rtChapterMerged.setSize(rw, rh);
    this.rtDetail.setSize(rw, rh);
    this.rtWorkMerged.setSize(rw, rh);
    this.rtBloom.setSize(Math.max(2, Math.floor(rw * 0.4)), Math.max(2, Math.floor(rh * 0.4)));

    this.fxTransMat.uniforms.uRatio.value = rw / rh;
    this.workCompMat.uniforms.uResolution.value.set(rw, rh);
    this.bloomMat.uniforms.uTexel.value.set(1 / this.rtBloom.width, 1 / this.rtBloom.height);
    this.globalMat.uniforms.uResolution.value.set(rw, rh);
  }

  renderSingleChapter(id, rt, localProgress, timeSec, dtSec) {
    if (id === 'work') {
      this.workScene.renderToTarget(rt, localProgress, timeSec, dtSec);
    } else {
      this.worldChapters.renderChapter(id, rt, localProgress, timeSec);
    }
  }

  renderFrame(blendInfo, timeSec, dtSec) {
    // 1. Render primary (& optional secondary seam) chapter
    if (this.anim.workTrans < 0.999) {
      this.renderSingleChapter(blendInfo.primary, this.rtA, blendInfo.localPrimary, timeSec, dtSec);
      if (blendInfo.secondary && blendInfo.transition > 0.001) {
        this.renderSingleChapter(blendInfo.secondary, this.rtB, blendInfo.localSecondary, timeSec, dtSec);
        this.fxTransMat.uniforms.uTransition.value = blendInfo.transition;
        this.quad.material = this.fxTransMat;
        this.renderer.setRenderTarget(this.rtChapterMerged);
        this.renderer.render(this.quadScene, this.orthoCam);
      } else {
        this.fxTransMat.uniforms.uTransition.value = 0;
        this.quad.material = this.fxTransMat;
        this.renderer.setRenderTarget(this.rtChapterMerged);
        this.renderer.render(this.quadScene, this.orthoCam);
      }
    }

    // 2. Render WorkDetail when active or mid-transition
    if (this.anim.workTrans > 0.001) {
      this.detailScene.renderToTarget(this.rtDetail, timeSec, dtSec);
    }

    // 3. Composite Work <-> WorkDetail
    this.workCompMat.uniforms.uTransition.value = this.anim.workTrans;
    this.quad.material = this.workCompMat;
    this.renderer.setRenderTarget(this.rtWorkMerged);
    this.renderer.render(this.quadScene, this.orthoCam);

    // 4. Half-res Bloom pass
    this.quad.material = this.bloomMat;
    this.renderer.setRenderTarget(this.rtBloom);
    this.renderer.render(this.quadScene, this.orthoCam);

    // 5. Final GlobalComposite to screen
    const inWork = blendInfo.primary === 'work' || blendInfo.secondary === 'work' ? 1 : 0;
    this.anim.chatOpen += ((inWork ? 1 : 0) - this.anim.chatOpen) * 0.1;

    this.globalMat.uniforms.uTime.value = timeSec;
    this.globalMat.uniforms.uScroll.value = bus.get('scroll/progress', 0);
    this.globalMat.uniforms.uScrollDelta.value = bus.get('scroll/delta', 0);
    this.globalMat.uniforms.uChatOpen.value = this.anim.chatOpen;
    this.globalMat.uniforms.tFluid.value = this.fluidSolver.velocityTexture;
    this.globalMat.uniforms.tFluidMask.value = this.fluidSolver.maskTexture;

    this.quad.material = this.globalMat;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.orthoCam);
  }
}
