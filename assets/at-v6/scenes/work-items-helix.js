/* ============================================================================
   ARCH1CAT HYDRA-V6 — scenes/work-items-helix.js
   3D DNA/Helical Frosted Glass Panes, Retina 1024x640 WorkPaneUI Generator
   (Full Latin + Cyrillic Support), Raycast Hover/Click & Category Filtering
   ============================================================================ */

import * as THREE from 'three';
import { bus, clamp, smoothStep, fpsLerpAlpha, tween } from '../core/state-bus.js';
import { PROJECTS_CATALOG } from '../data/projects-catalog.js';
import { createProjectPreviewTexture } from '../core/procedural-textures.js';
import { buildBevelGlassPaneGeometry } from '../geometries/bio-geometries.js';
import {
  WORK_ITEM_VERT,
  WORK_ITEM_FRAG,
  WORK_ITEM_UI_VERT,
  WORK_ITEM_UI_FRAG
} from '../shaders/work-pane-shaders.js';
import { drawPaneUICanvas } from './pane-ui-canvas.js';


export class WorkItemsHelix {
  constructor(sharedTextures, refractionRT) {
    this.group = new THREE.Group();
    this.sharedTextures = sharedTextures;
    this.refractionRT = refractionRT;
    this.slabGeo = buildBevelGlassPaneGeometry(3.12, 1.96, 0.10, 0.14);
    this.uiGeo = new THREE.PlaneGeometry(3.12, 1.96, 24, 12);

    this.items = [];
    this.visibleItems = [];
    this.camTargets = [];
    this.hoveredItem = null;
    this.lastPortraitState = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    this.raycaster = new THREE.Raycaster();
    this.pointerNDC = new THREE.Vector2(99, 99);
    this.pointerUV = new THREE.Vector2(0.5, 0.5);
    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    this.buildAllItems();
    this.layoutHelix('all', true);

    bus.on('work/filter', (tag) => this.layoutHelix(tag || 'all', false));
    bus.on('ui/lang', (lang) => this.refreshLanguage(lang || 'en'));
  }

  buildAllItems() {
    const lang = bus.get('ui/lang', 'en');
    for (const proj of PROJECTS_CATALOG) {
      const holder = new THREE.Group();
      const previewTex = createProjectPreviewTexture(proj, true);

      const uiCanvas = document.createElement('canvas');
      uiCanvas.width = 1024;
      uiCanvas.height = 640;
      drawPaneUICanvas(uiCanvas, proj, lang);
      const uiTex = new THREE.CanvasTexture(uiCanvas);
      uiTex.minFilter = THREE.LinearMipmapLinearFilter;
      uiTex.magFilter = THREE.LinearFilter;
      uiTex.needsUpdate = true;

      const colorVec = new THREE.Color(`#${proj.uiColor}`);
      const slabMat = new THREE.ShaderMaterial({
        vertexShader: WORK_ITEM_VERT,
        fragmentShader: WORK_ITEM_FRAG,
        uniforms: {
          tMap: { value: previewTex },
          tRefraction: { value: this.refractionRT.texture },
          tNormal: { value: this.sharedTextures.waterNormal },
          uColor: { value: colorVec },
          uHover: { value: 0 },
          uMouse: { value: this.pointerUV },
          uResolution: { value: this.resolution },
          uTime: { value: 0 },
          uPhone: { value: 0 },
          uFocus: { value: 0 }
        },
        transparent: true,
        depthWrite: true
      });

      const uiMat = new THREE.ShaderMaterial({
        vertexShader: WORK_ITEM_UI_VERT,
        fragmentShader: WORK_ITEM_UI_FRAG,
        uniforms: {
          tMap: { value: uiTex },
          uColor: { value: colorVec },
          uHover: { value: 0 },
          uCamDistance: { value: 6.0 },
          uPhone: { value: 0 }
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const slabMesh = new THREE.Mesh(this.slabGeo, slabMat);
      const uiMesh = new THREE.Mesh(this.uiGeo, uiMat);
      uiMesh.position.z = 0.08;
      holder.add(slabMesh, uiMesh);

      const anim = { hover: 0, scale: 1 };
      slabMesh.userData.workItem = { proj, holder, slabMesh, uiMesh, slabMat, uiMat, uiCanvas, uiTex, previewTex, anim, visibleIndex: 0 };
      this.items.push(slabMesh.userData.workItem);
      this.group.add(holder);
    }
  }

  refreshLanguage(lang) {
    for (const it of this.items) {
      drawPaneUICanvas(it.uiCanvas, it.proj, lang);
      it.uiTex.needsUpdate = true;
    }
  }

  layoutHelix(filterTag = 'all', immediate = false) {
    const isPortraitMobile = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    this.lastPortraitState = isPortraitMobile;
    const stepRad = THREE.MathUtils.degToRad(isPortraitMobile ? 36 : 50);
    const matched = this.items.filter((it) => filterTag === 'all' || it.proj.category === filterTag);
    const yStep = isPortraitMobile ? 1.42 : 1.24;
    const startY = isPortraitMobile ? 1.55 : 1.22;
    const targetScale = isPortraitMobile ? 0.76 : 1.0;

    this.visibleItems = matched;
    this.camTargets = [];

    for (const it of this.items) {
      const idx = matched.indexOf(it);
      if (idx === -1) {
        tween(it.anim, { scale: 0.001 }, immediate ? 20 : 280, 'easeInQuart', 0, () => {
          it.holder.scale.setScalar(Math.max(0.001, it.anim.scale));
          if (it.anim.scale <= 0.005) it.holder.visible = false;
        });
        continue;
      }

      it.visibleIndex = idx;
      it.holder.visible = true;
      const angle = -idx * stepRad;
      const y = startY - idx * yStep;
      const radius = 3.75;
      const camRadius = isPortraitMobile ? 11.3 : 9.65;

      const px = radius * Math.cos(angle);
      const pz = radius * Math.sin(angle);
      it.holder.position.set(px, y, pz);
      it.holder.lookAt(camRadius * Math.cos(angle), y, camRadius * Math.sin(angle));

      // Use PerspectiveCamera (isCamera=true) so Three.js lookAt orients -Z toward the Spine & Glass Slab!
      const camDummy = new THREE.PerspectiveCamera();
      camDummy.position.set(camRadius * Math.cos(angle), y + (isPortraitMobile ? -0.35 : 0.08), camRadius * Math.sin(angle));
      const lateralOffset = isPortraitMobile ? 0.0 : 0.38;
      camDummy.lookAt(-lateralOffset * Math.sin(angle), y - (isPortraitMobile ? 0.35 : 0.06), lateralOffset * Math.cos(angle));
      this.camTargets.push(camDummy);

      if (immediate) {
        it.anim.scale = targetScale;
        it.holder.scale.setScalar(targetScale);
      } else {
        it.anim.scale = 0.01;
        it.holder.scale.setScalar(0.01);
        tween(it.anim, { scale: targetScale }, 620, 'easeOutQuint', idx * 55, () => {
          it.holder.scale.setScalar(it.anim.scale);
        });
      }
    }

    bus.emit('work/helixRebuilt', { count: matched.length, filterTag });
  }

  onPointerMove(normX, normY) {
    this.pointerUV.set(normX, normY);
    this.pointerNDC.set(normX * 2 - 1, -(normY * 2 - 1));
  }

  onClick() {
    if (!this.hoveredItem || bus.get('work/project') || bus.get('ui/contact')) return false;
    const dist = this.hoveredItem.lastCamDist || 99;
    if (dist < 7.2) {
      bus.set('work/project', this.hoveredItem.proj);
      return true;
    }
    bus.emit('scroll/toWorkIndex', {
      index: this.hoveredItem.visibleIndex,
      total: this.visibleItems.length
    });
    return true;
  }

  onResize(w, h, dpr) {
    this.resolution.set(w * dpr, h * dpr);
    const nowPortrait = w < 768 && h > w;
    if (nowPortrait !== this.lastPortraitState) {
      this.layoutHelix(bus.get('work/filter', 'all'), true);
    }
  }

  updateCameraAndItems(camera, scrollProgress, timeSec, dtSec) {
    const n = this.camTargets.length;
    if (n > 0) {
      const isPhone = window.innerWidth < 768 ? 1 : 0;
      const pad = isPhone ? 0.08 : 0.05;
      const mapped = n === 1 ? 0 : smoothStep(pad, 1 - pad, clamp(scrollProgress, 0, 1)) * (n - 1);
      const i0 = clamp(Math.floor(mapped), 0, n - 1);
      const i1 = clamp(i0 + 1, 0, n - 1);
      const frac = mapped - i0;

      const t0 = this.camTargets[i0];
      const t1 = this.camTargets[i1];
      const goalPos = t0.position.clone().lerp(t1.position, frac);
      goalPos.y += -smoothStep(0, 0.14, scrollProgress) * 0.45 + smoothStep(1, 0.86, scrollProgress) * 0.45;
      const goalQuat = t0.quaternion.clone().slerp(t1.quaternion, frac);

      const alpha = fpsLerpAlpha(0.18, dtSec);
      camera.position.lerp(goalPos, alpha);
      camera.quaternion.slerp(goalQuat, alpha);

      for (let i = 0; i < this.visibleItems.length; i++) {
        const it = this.visibleItems[i];
        it.slabMat.uniforms.uTime.value = timeSec;
        it.slabMat.uniforms.uPhone.value = isPhone;
        it.uiMat.uniforms.uPhone.value = isPhone;
        const focusProx = clamp(1 - Math.abs(mapped - i), 0, 1);
        it.slabMat.uniforms.uFocus.value = focusProx;
        const d = it.holder.position.distanceTo(camera.position);
        it.lastCamDist = d;
        it.uiMat.uniforms.uCamDistance.value = d;
      }
    }

    // Sort visible glass panes back-to-front for artifact-free alpha & refraction
    const sorted = [...this.visibleItems].sort((a, b) => (b.lastCamDist || 0) - (a.lastCamDist || 0));
    sorted.forEach((it, orderIdx) => {
      it.slabMesh.renderOrder = 20 + orderIdx * 2;
      it.uiMesh.renderOrder = 21 + orderIdx * 2;
    });

    // Raycast hover only when in /work and no modal is open
    const canHover = bus.get('router/chapter') === 'work' && !bus.get('work/project') && !bus.get('ui/contact');
    let nextHover = null;
    if (canHover && this.visibleItems.length > 0) {
      this.raycaster.setFromCamera(this.pointerNDC, camera);
      const hits = this.raycaster.intersectObjects(this.visibleItems.map((v) => v.slabMesh), false);
      if (hits.length > 0) nextHover = hits[0].object.userData.workItem;
    }

    if (nextHover !== this.hoveredItem) {
      if (this.hoveredItem) {
        const prev = this.hoveredItem;
        tween(prev.anim, { hover: 0 }, 360, 'easeOutCubic', 0, () => {
          prev.slabMat.uniforms.uHover.value = prev.anim.hover;
          prev.uiMat.uniforms.uHover.value = prev.anim.hover;
        });
      }
      this.hoveredItem = nextHover;
      document.body.style.cursor = nextHover ? 'pointer' : '';
      if (nextHover) {
        bus.emit('sfx/hover');
        const cur = nextHover;
        tween(cur.anim, { hover: 1 }, 420, 'easeOutCubic', 0, () => {
          cur.slabMat.uniforms.uHover.value = cur.anim.hover;
          cur.uiMat.uniforms.uHover.value = cur.anim.hover;
        });
      }
    }
  }
}
