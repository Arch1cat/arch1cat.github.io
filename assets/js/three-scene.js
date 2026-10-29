/* ============================================================
   ARCH1CAT — three-scene.js
   Active Theory V6 Work WebGL Stage & Crystalline Spine
   Faithfully engineered after Active Theory (activetheory.net/work)
   Features:
   - Iridescent Biomechanical Crystalline Spine / Vertebrae (Liquid Crystal)
   - 4,000+ Volumetric Swarming Micro-Particle Cloud (Magenta, Cyan, Violet, Amber)
   - 3D Spatial Project Carousel with frosted glass cards & perspective depth
   - Inertial mouse drag & velocity-reactive fluid deformation
   - Real-time Bloom & Post-processing via Three.js r170 EffectComposer
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export const PROJECTS_DATA = [
    {
        id: 'yotei',
        index: '01',
        category: 'WEBSITES & CRM',
        title: 'YOTEI CRM',
        subtitle: 'Enterprise Real Estate Intelligence & CRM',
        desc: 'Production proptech ecosystem. 3-level taxonomy, Mapbox GL clustering, automated Vitest QA gates, bidirectional lead pipelines.',
        tags: ['Next.js 16', 'Turborepo', 'Mapbox GL', 'Supabase'],
        url: 'https://yotei.com.ua/',
        source: 'https://github.com/l2bote4game',
        accentColor: 0x00f2fe
    },
    {
        id: 'wardogs',
        index: '02',
        category: '3D EXPERIENCES & WEBGL',
        title: 'WARDOGS 3D',
        subtitle: 'Tactical GIS & Ballistic Simulator',
        desc: 'High-precision WebGL terrain engine. Sub-meter DEM raymarching, 360° viewshed occlusions, MIL-dot sniper scope, and true 3D parabolic artillery arcs.',
        tags: ['Three.js r170', 'WebGL 2.0', 'Viewshed', 'MIL Ballistics'],
        url: 'https://l2bote4game.github.io/wardogs-tactical-map/',
        source: 'https://github.com/l2bote4game/wardogs-tactical-map',
        accentColor: 0x10b981
    },
    {
        id: 'world-monitor',
        index: '03',
        category: 'REALTIME GIS & TELEMETRY',
        title: 'WORLD MONITOR',
        subtitle: 'Global OSINT & Cyber Defense Telemetry',
        desc: 'Real-time global geopolitical and cyber telemetry suite. Live geospatial node mapping, automated incident triage, edge latency aggregation.',
        tags: ['TypeScript', 'Cloudflare Workers', 'Tauri', 'Mapbox'],
        url: 'https://github.com/l2bote4game/world-monitor',
        source: 'https://github.com/l2bote4game/world-monitor',
        accentColor: 0xf59e0b
    },
    {
        id: 'opengym',
        index: '04',
        category: 'MOBILE APPS (KOTLIN)',
        title: 'OPENGYM',
        subtitle: 'Self-Hosted Progressive Fitness Suite',
        desc: 'Android APK with WebAuthn passkey security, algorithmic progressive overload curves, and local-first offline synchronization.',
        tags: ['React 19', 'Capacitor', 'Android APK', 'Passkeys'],
        url: 'https://github.com/l2bote4game/openGym',
        source: 'https://github.com/l2bote4game/openGym',
        accentColor: 0xec4899
    },
    {
        id: 'wifiscanner',
        index: '05',
        category: 'MOBILE APPS (KOTLIN)',
        title: 'WIFI SCANNER',
        subtitle: 'Native RF Diagnostics & Subnet Grapher',
        desc: 'High-performance Kotlin utility for 2.4/5GHz channel RF visual graphing, mDNS discovery, and sub-millisecond network diagnostics.',
        tags: ['Kotlin', 'Jetpack Compose', 'mDNS', 'Coroutines'],
        url: 'https://github.com/l2bote4game/wifiscaner',
        source: 'https://github.com/l2bote4game/wifiscaner',
        accentColor: 0x8b5cf6
    },
    {
        id: 'meta-cleaner',
        index: '06',
        category: 'AUTONOMOUS AI AGENTS',
        title: 'METADATA CLEANER',
        subtitle: 'Multi-Threaded Privacy Stripping Suite',
        desc: 'Zero-trace image and media privacy tool stripping GPS, device serial hashes, and EXIF signatures with high-throughput batch workers.',
        tags: ['Python 3', 'FFmpeg', 'Pillow', 'Cryptography'],
        url: 'https://github.com/l2bote4game/media-meta-cleaner',
        source: 'https://github.com/l2bote4game/media-meta-cleaner',
        accentColor: 0x06b6d4
    },
    {
        id: 'cats-match3',
        index: '07',
        category: '3D EXPERIENCES & WEBGL',
        title: 'CATS MATCH-3',
        subtitle: 'Casual Engine & Physics Particle FX',
        desc: 'Custom Kotlin mobile game engine with multi-stage cascade matching, shelter builder economy, and hardware-accelerated particle emitters.',
        tags: ['Kotlin', 'Android Canvas', 'Particle FX', 'Game Loop'],
        url: 'https://github.com/l2bote4game/cats-match3-game',
        source: 'https://github.com/l2bote4game/cats-match3-game',
        accentColor: 0xf43f5e
    }
];

class ActiveTheoryWebGLStage {
    constructor() {
        this.container = document.getElementById('webgl-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.bloomPass = null;

        // Visual elements
        this.spineGroup = null;
        this.spineMeshes = [];
        this.particleCloud = null;
        this.particlePositions = null;
        this.carouselGroup = null;
        this.cardMeshes = [];

        // Interaction & physics state
        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);
        this.velocity = new THREE.Vector2(0, 0);
        this.carouselAngle = 0;
        this.targetCarouselAngle = 0;
        this.activeProjectIndex = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartAngle = 0;

        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // 1. Scene & Camera Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.FogExp2(0x000000, 0.022);

        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        this.camera.position.set(0, 0, 14);

        // 2. High-Fidelity WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false
        });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.15;
        this.container.appendChild(this.renderer.domElement);

        // 3. Post-Processing Pipeline
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(w, h),
            0.45,  // Bloom strength
            0.4,   // Radius
            0.82   // Threshold
        );
        this.composer.addPass(this.bloomPass);

        // 4. Lighting Rig (Active Theory style: moody specular rim highlights)
        const ambient = new THREE.AmbientLight(0x0a101d, 1.2);
        this.scene.add(ambient);

        this.keyLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
        this.keyLight.position.set(5, 8, 10);
        this.scene.add(this.keyLight);

        this.rimLight = new THREE.DirectionalLight(0xf43f5e, 2.8);
        this.rimLight.position.set(-6, -6, -5);
        this.scene.add(this.rimLight);

        const pointLight = new THREE.PointLight(0x7c3aed, 2.5, 20);
        pointLight.position.set(0, 0, 3);
        this.scene.add(pointLight);

        // 5. Build Scene Components
        this.createCrystallineSpine();
        this.createVolumetricParticleCloud();
        this.createSpatialCarousel();

        // 6. Event Listeners
        this.setupEvents();

        // 7. Start Animation Loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    /**
     * Active Theory Signature: Iridescent Crystalline Spine (Biomechanic Vertebrae)
     */
    createCrystallineSpine() {
        this.spineGroup = new THREE.Group();
        this.spineMeshes = [];

        const VERTEBRAE_COUNT = 32;
        const spineGeo = new THREE.TorusGeometry(1.2, 0.28, 16, 48);

        // Custom Iridescent Material Shader
        const iridescentMat = new THREE.MeshPhysicalMaterial({
            color: 0x111827,
            emissive: 0x030712,
            metalness: 0.95,
            roughness: 0.12,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            transmission: 0.25,
            ior: 1.52,
            reflectivity: 0.9
        });

        // Add iridescent rim color via onBeforeCompile
        iridescentMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            iridescentMat.userData.shader = shader;

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `#include <common>
                uniform float uTime;`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `#include <dithering_fragment>
                // Active Theory Iridescence Rainbow Frensel
                vec3 viewDir = normalize(vViewPosition);
                float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);
                vec3 rainbow = 0.5 + 0.5 * cos(uTime * 0.8 + vec3(0.0, 2.0, 4.0) + fresnel * 4.0);
                gl_FragColor.rgb += rainbow * fresnel * 0.75;`
            );
        };

        for (let i = 0; i < VERTEBRAE_COUNT; i++) {
            const mesh = new THREE.Mesh(spineGeo, iridescentMat);
            const y = (i - VERTEBRAE_COUNT / 2) * 0.42;
            const scale = Math.sin((i / VERTEBRAE_COUNT) * Math.PI) * 0.85 + 0.35;

            mesh.position.set(0, y, 0);
            mesh.scale.set(scale, scale, scale * 0.8);
            mesh.rotation.x = Math.PI / 2;
            mesh.rotation.z = i * 0.22;

            this.spineGroup.add(mesh);
            this.spineMeshes.push({
                mesh,
                baseY: y,
                baseScale: scale,
                phase: i * 0.18
            });
        }

        // Position spine slightly to the right & deeper (Active Theory aesthetic)
        this.spineGroup.position.set(3.2, 0, -3.5);
        this.scene.add(this.spineGroup);
    }

    /**
     * Volumetric Swarming Particle Cloud (4,000+ colored micro-spheres)
     */
    createVolumetricParticleCloud() {
        const COUNT = 4200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const scales = new Float32Array(COUNT);
        const velocities = new Float32Array(COUNT * 3);

        const palette = [
            new THREE.Color(0xf43f5e), // Rose Magenta
            new THREE.Color(0x00f2fe), // Electric Cyan
            new THREE.Color(0x8b5cf6), // Deep Violet
            new THREE.Color(0xf59e0b), // Amber Gold
            new THREE.Color(0xffffff)  // Sparkle White
        ];

        for (let i = 0; i < COUNT; i++) {
            // Cylindrical distribution around the spine
            const radius = Math.random() * 4.5 + 0.8;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 16.0;

            positions[i * 3] = Math.cos(theta) * radius + 1.5;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(theta) * radius - 2.0;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() * 0.02) + 0.005;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

            const col = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;

            scales[i] = Math.random() * 2.5 + 0.8;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        // Procedural circular glow dot texture
        const dotCanvas = document.createElement('canvas');
        dotCanvas.width = dotCanvas.height = 64;
        const ctx = dotCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
        grad.addColorStop(0.7, 'rgba(255,255,255,0.15)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const dotTexture = new THREE.CanvasTexture(dotCanvas);

        const material = new THREE.PointsMaterial({
            size: 0.14,
            vertexColors: true,
            map: dotTexture,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particleCloud = new THREE.Points(geometry, material);
        this.particlePositions = positions;
        this.particleVelocities = velocities;
        this.scene.add(this.particleCloud);
    }

    /**
     * Active Theory 3D Spatial Project Carousel (Frosted Glass Cards)
     */
    createSpatialCarousel() {
        this.carouselGroup = new THREE.Group();
        this.cardMeshes = [];

        const radius = 8.5;
        const total = PROJECTS_DATA.length;
        const angleStep = (Math.PI * 2) / total;

        PROJECTS_DATA.forEach((proj, idx) => {
            const cardGroup = new THREE.Group();

            // 1. Frosted Glass Plate
            const cardGeo = new THREE.PlaneGeometry(4.2, 2.6, 1, 1);

            // Generate Canvas Texture for card content (Terminal cyber style)
            const cardCanvas = document.createElement('canvas');
            cardCanvas.width = 512;
            cardCanvas.height = 320;
            const c = cardCanvas.getContext('2d');

            // Draw dark frosted card background with high contrast
            c.fillStyle = '#060911';
            c.fillRect(0, 0, 512, 320);

            // Inner subtle gradient
            const grad = c.createLinearGradient(0, 0, 512, 320);
            grad.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
            grad.addColorStop(1, 'rgba(10, 15, 26, 0.95)');
            c.fillStyle = grad;
            c.fillRect(0, 0, 512, 320);

            // Tech border rim
            c.strokeStyle = 'rgba(0, 242, 254, 0.6)';
            c.lineWidth = 4;
            c.strokeRect(6, 6, 500, 308);

            // Header line
            c.fillStyle = '#00f2fe';
            c.font = 'bold 20px monospace';
            c.fillText(`// ${proj.index} · ${proj.category}`, 28, 48);

            // Title
            c.fillStyle = '#ffffff';
            c.font = '900 40px sans-serif';
            c.fillText(proj.title, 28, 110);

            // Subtitle
            c.fillStyle = '#94a3b8';
            c.font = '19px sans-serif';
            c.fillText(proj.subtitle, 28, 150);

            // Tech Tags
            c.fillStyle = '#38bdf8';
            c.font = 'bold 16px monospace';
            c.fillText(`[ ${proj.tags.join(' // ')} ]`, 28, 220);

            // Bottom CTA prompt
            c.fillStyle = '#ffffff';
            c.font = 'bold 16px monospace';
            c.fillText(`CLICK TO INSPECT ->`, 28, 280);

            const cardTexture = new THREE.CanvasTexture(cardCanvas);

            const cardMat = new THREE.MeshStandardMaterial({
                map: cardTexture,
                roughness: 0.25,
                metalness: 0.1,
                transparent: true,
                opacity: 0.96,
                side: THREE.FrontSide
            });

            const cardMesh = new THREE.Mesh(cardGeo, cardMat);
            cardMesh.userData = { project: proj, index: idx };
            cardGroup.add(cardMesh);

            // Outer glowing accent border
            const edgeGeo = new THREE.EdgesGeometry(cardGeo);
            const edgeMat = new THREE.LineBasicMaterial({
                color: proj.accentColor,
                linewidth: 2,
                transparent: true,
                opacity: 0.85
            });
            const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
            cardGroup.add(edgeMesh);

            // Position card in a 3D circle - facing camera (+Z) with angle orientation
            const angle = idx * angleStep;
            cardGroup.position.set(
                Math.sin(angle) * radius,
                0,
                Math.cos(angle) * radius - 4.5
            );
            // Orient face directly along the radial vector towards the camera
            cardGroup.rotation.y = angle;

            this.carouselGroup.add(cardGroup);
            this.cardMeshes.push({
                group: cardGroup,
                mesh: cardMesh,
                angle: angle,
                project: proj
            });
        });

        this.carouselGroup.position.set(-0.8, 0, 0);
        this.scene.add(this.carouselGroup);
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
            this.composer.setSize(w, h);
        });

        // Pointer move for mouse-inertia
        window.addEventListener('pointermove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Pointer drag on canvas to spin carousel
        window.addEventListener('pointerdown', (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX;
            this.dragStartAngle = this.targetCarouselAngle;
        });

        window.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;
            const deltaX = (e.clientX - this.dragStartX) / window.innerWidth;
            this.targetCarouselAngle = this.dragStartAngle + deltaX * Math.PI * 1.5;
        });

        window.addEventListener('pointerup', () => {
            this.isDragging = false;
        });

        // Mouse wheel for carousel spin
        window.addEventListener('wheel', (e) => {
            this.targetCarouselAngle += e.deltaY * 0.0018;
        }, { passive: true });

        // Raycasting clicks on 3D project cards
        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
            const interactiveMeshes = this.cardMeshes.map(c => c.mesh);
            const intersects = this.raycaster.intersectObjects(interactiveMeshes);

            if (intersects.length > 0) {
                const clicked = intersects[0].object.userData.project;
                window.dispatchEvent(new CustomEvent('project-select', { detail: clicked }));
                if (window.__playSfx) window.__playSfx('ping');
            }
        });
    }

    setActiveProject(index) {
        const total = PROJECTS_DATA.length;
        this.activeProjectIndex = (index + total) % total;
        const angleStep = (Math.PI * 2) / total;
        this.targetCarouselAngle = -this.activeProjectIndex * angleStep;
    }

    animate() {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Smooth mouse lerp
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08;

        // Smooth carousel spin lerp
        this.carouselAngle += (this.targetCarouselAngle - this.carouselAngle) * 0.08;
        if (this.carouselGroup) {
            this.carouselGroup.rotation.y = this.carouselAngle;
        }

        // Animate Crystalline Spine (Organic swimming / twisting wave)
        if (this.spineGroup) {
            this.spineGroup.rotation.y = time * 0.25 + this.mouse.x * 0.5;
            this.spineGroup.position.x = 1.5 + Math.sin(time * 0.5) * 0.35 + this.mouse.x * 0.8;
            this.spineGroup.position.y = Math.cos(time * 0.4) * 0.25 + this.mouse.y * 0.6;

            this.spineMeshes.forEach(item => {
                const wave = Math.sin(time * 1.5 + item.phase);
                item.mesh.position.y = item.baseY + wave * 0.15;
                item.mesh.rotation.z = (item.phase * 1.4) + Math.cos(time + item.phase) * 0.35;
                const scaleWobble = item.baseScale * (1.0 + wave * 0.1);
                item.mesh.scale.set(scaleWobble, scaleWobble, scaleWobble * 0.8);
            });

            // Update shader uTime
            const shader = this.spineMeshes[0]?.mesh.material.userData.shader;
            if (shader) shader.uniforms.uTime.value = time;
        }

        // Animate Swarming Particles
        if (this.particleCloud && this.particlePositions) {
            const count = this.particlePositions.length / 3;
            for (let i = 0; i < count; i++) {
                const idx = i * 3;
                this.particlePositions[idx + 1] += this.particleVelocities[idx + 1];
                // Loop particles vertically
                if (this.particlePositions[idx + 1] > 8.0) {
                    this.particlePositions[idx + 1] = -8.0;
                }
                // Gentle orbital swirl
                const x = this.particlePositions[idx] - 1.5;
                const z = this.particlePositions[idx + 2] + 2.0;
                const dist = Math.sqrt(x * x + z * z);
                const angle = Math.atan2(z, x) + 0.005;
                this.particlePositions[idx] = Math.cos(angle) * dist + 1.5;
                this.particlePositions[idx + 2] = Math.sin(angle) * dist - 2.0;
            }
            this.particleCloud.geometry.attributes.position.needsUpdate = true;
        }

        // Camera gentle parallax
        this.camera.position.x = this.mouse.x * 0.6;
        this.camera.position.y = this.mouse.y * 0.4;
        this.camera.lookAt(0, 0, 0);

        this.composer.render();
    }
}

// Global Singleton instance
export const stage = new ActiveTheoryWebGLStage();
window.__atStage = stage;
