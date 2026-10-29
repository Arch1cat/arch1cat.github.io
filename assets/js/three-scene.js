/* ============================================================
   ARCH1CAT — three-scene.js
   Active Theory V6 Work WebGL Scene
   Faithfully engineered after Active Theory (activetheory.net/work)
   Features:
   - Authentic Biomechanical Spinal Column (Vertebral Column & Discs)
   - Prismatic Liquid-Chrome / Oil-Slick Iridescent Fresnel Shader
   - Neural Articulated Conduit running along spinal facet joints
   - Cosmic Horizontal Planetary Particle Ring (Saturn Dust Disc)
   - Swarming Volumetric Bokeh Sparkles & Micro-Particles
   - Spatial 3D Project Carousel with Cinematic Posters & Frosted Borders
   - Inertial Mouse Parallax & Smooth Velocity Lerping
   - UnrealBloomPass (Three.js r170)
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
        tagFilter: 'WEBSITES',
        glyph: '[= ◈ ︿ ◈ =]',
        title: 'YOTEI CRM',
        subtitle: 'Enterprise Real Estate Intelligence & CRM',
        desc: 'Production proptech ecosystem. Strict 3-level taxonomy, Mapbox GL geospatial clustering, automated Vitest QA gates, bidirectional lead pipelines.',
        tags: ['Next.js 16', 'Turborepo', 'Mapbox GL', 'Supabase'],
        url: 'https://yotei.com.ua/',
        source: 'https://github.com/l2bote4game',
        texture: 'assets/textures/projects/yotei.png',
        accentColor: 0x00f2fe
    },
    {
        id: 'wardogs',
        index: '02',
        category: '3D EXPERIENCES & WEBGL',
        tagFilter: '3D EXPERIENCES',
        glyph: '< ⌖ 3D ⌖ >',
        title: 'WARDOGS 3D',
        subtitle: 'Tactical GIS & Ballistic Simulator',
        desc: 'High-precision WebGL terrain engine. Sub-meter DEM raymarching, 360° viewshed occlusions, MIL-dot sniper scope, and true 3D parabolic artillery arcs.',
        tags: ['Three.js r170', 'WebGL 2.0', 'Viewshed', 'MIL Ballistics'],
        url: 'https://l2bote4game.github.io/wardogs-tactical-map/',
        source: 'https://github.com/l2bote4game/wardogs-tactical-map',
        texture: 'assets/textures/projects/wardogs.png',
        accentColor: 0x10b981
    },
    {
        id: 'world-monitor',
        index: '03',
        category: 'REALTIME GIS & TELEMETRY',
        tagFilter: 'XR / VR / AI',
        glyph: '[ • ☫ • ]',
        title: 'WORLD MONITOR',
        subtitle: 'Global OSINT & Cyber Defense Telemetry',
        desc: 'Real-time global geopolitical and cyber telemetry suite. Live geospatial node mapping, automated incident stream triage, edge latency aggregation.',
        tags: ['TypeScript', 'Cloudflare Workers', 'Tauri', 'Mapbox'],
        url: 'https://github.com/l2bote4game/world-monitor',
        source: 'https://github.com/l2bote4game/world-monitor',
        texture: 'assets/textures/projects/world-monitor.png',
        accentColor: 0xf59e0b
    },
    {
        id: 'opengym',
        index: '04',
        category: 'MOBILE APPS (KOTLIN)',
        tagFilter: 'MOBILE APPS',
        glyph: '( ⚡ FIT ⚡ )',
        title: 'OPENGYM',
        subtitle: 'Self-Hosted Progressive Fitness Suite',
        desc: 'Production Android APK with WebAuthn passkey security, algorithmic progressive overload curves, and local-first offline synchronization.',
        tags: ['React 19', 'Capacitor', 'Android APK', 'Passkeys'],
        url: 'https://github.com/l2bote4game/openGym',
        source: 'https://github.com/l2bote4game/openGym',
        texture: 'assets/textures/projects/opengym.png',
        accentColor: 0xec4899
    },
    {
        id: 'wifiscanner',
        index: '05',
        category: 'MOBILE APPS (KOTLIN)',
        tagFilter: 'MOBILE APPS',
        glyph: '{ ~ RF ~ }',
        title: 'WIFI SCANNER',
        subtitle: 'Native RF Diagnostics & Subnet Grapher',
        desc: 'High-performance Kotlin utility for 2.4/5GHz channel RF visual graphing, mDNS discovery, and sub-millisecond network diagnostics.',
        tags: ['Kotlin', 'Jetpack Compose', 'mDNS', 'Coroutines'],
        url: 'https://github.com/l2bote4game/wifiscaner',
        source: 'https://github.com/l2bote4game/wifiscaner',
        texture: 'assets/textures/projects/wifiscanner.png',
        accentColor: 0x8b5cf6
    },
    {
        id: 'meta-cleaner',
        index: '06',
        category: 'AUTONOMOUS AI AGENTS',
        tagFilter: 'MULTIPLAYER',
        glyph: '[ ⟁ SEC ⟁ ]',
        title: 'METADATA CLEANER',
        subtitle: 'Multi-Threaded Privacy Stripping Suite',
        desc: 'Zero-trace image and media privacy tool stripping GPS, device serial hashes, and EXIF signatures with high-throughput batch workers.',
        tags: ['Python 3', 'FFmpeg', 'Pillow', 'Cryptography'],
        url: 'https://github.com/l2bote4game/media-meta-cleaner',
        source: 'https://github.com/l2bote4game/media-meta-cleaner',
        texture: 'assets/textures/projects/meta-cleaner.png',
        accentColor: 0x06b6d4
    },
    {
        id: 'cats-match3',
        index: '07',
        category: '3D EXPERIENCES & WEBGL',
        tagFilter: '3D EXPERIENCES',
        glyph: '=^..^=',
        title: 'CATS MATCH-3',
        subtitle: 'Casual Engine & Particle Physics FX',
        desc: 'Custom Kotlin mobile game engine with multi-stage cascade matching, shelter builder progression, and hardware-accelerated particle emitters.',
        tags: ['Kotlin', 'Android Canvas', 'Particle FX', 'Game Loop'],
        url: 'https://github.com/l2bote4game/cats-match3-game',
        source: 'https://github.com/l2bote4game/cats-match3-game',
        texture: 'assets/textures/projects/cats-match3.png',
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

        // Visual Groups
        this.spineGroup = null;
        this.vertebraeMeshes = [];
        this.neuralCable = null;
        this.planetaryRing = null;
        this.particleCloud = null;
        this.carouselGroup = null;
        this.cardMeshes = [];

        // State & Physics
        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);
        this.carouselProgress = 0;
        this.targetCarouselProgress = 0;
        this.activeProjectIndex = 0;

        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();
        this.textureLoader = new THREE.TextureLoader();

        this.init();
    }

    init() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // 1. Scene & Camera Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.FogExp2(0x000000, 0.025);

        this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        this.camera.position.set(0, 0, 13.5);

        // 2. High-Fidelity WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false
        });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.25;
        this.container.appendChild(this.renderer.domElement);

        // 3. Post-Processing Pipeline (Bloom)
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(w, h),
            0.55,  // Bloom strength
            0.45,  // Radius
            0.78   // Threshold
        );
        this.composer.addPass(this.bloomPass);

        // 4. Studio Lighting Rig
        const ambient = new THREE.AmbientLight(0x060912, 1.5);
        this.scene.add(ambient);

        // Key light (Cyan)
        const keyLight = new THREE.DirectionalLight(0x00f2fe, 3.2);
        keyLight.position.set(5, 7, 8);
        this.scene.add(keyLight);

        // Rim light (Magenta / Prismatic)
        const rimLight = new THREE.DirectionalLight(0xf43f5e, 3.0);
        rimLight.position.set(-6, -5, -4);
        this.scene.add(rimLight);

        // Bottom Gold Accent
        const goldLight = new THREE.PointLight(0xf59e0b, 2.2, 25);
        goldLight.position.set(0, -3, 4);
        this.scene.add(goldLight);

        // 5. Construct Visuals
        this.createAnatomicalSpine();
        this.createPlanetaryDustRing();
        this.createVolumetricSparkles();
        this.createSpatialCarousel();

        // 6. Setup Interactivity
        this.setupEvents();

        // 7. Render Loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    /**
     * Active Theory Hallmark: Biomechanical Anatomical Spinal Column
     * Constructs true human vertebrae: Centrum body, transverse wing spurs, spinous rear spine, disc cushioning.
     */
    createAnatomicalSpine() {
        this.spineGroup = new THREE.Group();
        this.vertebraeMeshes = [];

        const VERTEBRAE_COUNT = 24;

        // Custom Iridescent Oil-Slick Liquid Chrome Material
        const spineMat = new THREE.MeshPhysicalMaterial({
            color: 0x080c14,
            emissive: 0x020408,
            metalness: 0.98,
            roughness: 0.14,
            clearcoat: 1.0,
            clearcoatRoughness: 0.06,
            transmission: 0.15,
            ior: 1.6,
            reflectivity: 0.95
        });

        spineMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            spineMat.userData.shader = shader;

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `#include <common>
                uniform float uTime;`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `#include <dithering_fragment>
                // Prismatic Rainbow Fresnel Sheen (Active Theory Signature)
                vec3 viewDir = normalize(vViewPosition);
                float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);
                vec3 rainbow = 0.5 + 0.5 * cos(uTime * 0.9 + vec3(0.0, 2.0, 4.0) + fresnel * 4.5);
                gl_FragColor.rgb += rainbow * fresnel * 0.85;`
            );
        };

        // Disc Material (Slightly darker, cartilage-like)
        const discMat = new THREE.MeshStandardMaterial({
            color: 0x03060c,
            metalness: 0.85,
            roughness: 0.35,
            emissive: 0x00f2fe,
            emissiveIntensity: 0.15
        });

        for (let i = 0; i < VERTEBRAE_COUNT; i++) {
            const vertGroup = new THREE.Group();
            const t = i / VERTEBRAE_COUNT;

            // Anatomical S-Curve progression (Cervical -> Thoracic -> Lumbar)
            const y = (i - VERTEBRAE_COUNT / 2) * 0.48;
            const curvatureZ = Math.sin(t * Math.PI * 2.0) * 0.45;
            const scale = 0.4 + Math.sin(t * Math.PI) * 0.65; // Lumbar is thicker, Cervical is sleeker

            // 1. Vertebral Body (Centrum)
            const bodyGeo = new THREE.CylinderGeometry(0.55 * scale, 0.6 * scale, 0.28, 18);
            const body = new THREE.Mesh(bodyGeo, spineMat);
            body.position.set(0, 0, 0);
            vertGroup.add(body);

            // 2. Transverse Processes (Lateral wing spurs left and right)
            const wingGeo = new THREE.ConeGeometry(0.18 * scale, 1.4 * scale, 8);
            wingGeo.rotateZ(Math.PI / 2);

            const leftWing = new THREE.Mesh(wingGeo, spineMat);
            leftWing.position.set(-0.85 * scale, 0.05, -0.15 * scale);
            leftWing.rotation.y = 0.25;
            vertGroup.add(leftWing);

            const rightWing = new THREE.Mesh(wingGeo, spineMat);
            rightWing.position.set(0.85 * scale, 0.05, -0.15 * scale);
            rightWing.rotation.y = -0.25;
            vertGroup.add(rightWing);

            // 3. Spinous Process (Distinctive sharp bone spine projecting backwards)
            const spineSpurGeo = new THREE.ConeGeometry(0.2 * scale, 1.2 * scale, 8);
            spineSpurGeo.rotateX(-Math.PI / 2);
            const spur = new THREE.Mesh(spineSpurGeo, spineMat);
            spur.position.set(0, -0.15 * scale, -0.95 * scale);
            spur.rotation.x = -0.4;
            vertGroup.add(spur);

            // 4. Intervertebral Disc
            const discGeo = new THREE.CylinderGeometry(0.52 * scale, 0.52 * scale, 0.08, 18);
            const disc = new THREE.Mesh(discGeo, discMat);
            disc.position.set(0, 0.18, 0);
            vertGroup.add(disc);

            vertGroup.position.set(0, y, curvatureZ);
            this.spineGroup.add(vertGroup);

            this.vertebraeMeshes.push({
                group: vertGroup,
                baseY: y,
                baseZ: curvatureZ,
                phase: i * 0.22,
                scale: scale
            });
        }

        // 5. Articulated Neural Conduit running along right facet joints
        const cableCurve = new THREE.CatmullRomCurve3(
            this.vertebraeMeshes.map(v => new THREE.Vector3(0.65 * v.scale, v.baseY, v.baseZ - 0.2))
        );
        const cableGeo = new THREE.TubeGeometry(cableCurve, 64, 0.06, 8, false);
        const cableMat = new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            emissive: 0x00f2fe,
            emissiveIntensity: 0.6,
            roughness: 0.2,
            metalness: 0.9
        });
        this.neuralCable = new THREE.Mesh(cableGeo, cableMat);
        this.spineGroup.add(this.neuralCable);

        // Position spine centered or slightly back
        this.spineGroup.position.set(0, 0, -1.0);
        this.scene.add(this.spineGroup);
    }

    /**
     * Active Theory Iconic Element: Horizontal Cosmic Dust Ring (Saturn Planetary Ring)
     * Intersects the lower half of the spine horizontally.
     */
    createPlanetaryDustRing() {
        const RING_PARTICLES = 3600;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(RING_PARTICLES * 3);
        const col = new Float32Array(RING_PARTICLES * 3);

        const palette = [
            new THREE.Color(0x00f2fe), // Cyan
            new THREE.Color(0xf59e0b), // Amber gold
            new THREE.Color(0xf43f5e), // Magenta
            new THREE.Color(0xffffff)  // Sparkle
        ];

        const innerR = 2.4;
        const outerR = 12.0;

        for (let i = 0; i < RING_PARTICLES; i++) {
            // Power distribution for denser inner ring
            const r = innerR + Math.pow(Math.random(), 1.5) * (outerR - innerR);
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 0.25; // Thin disc

            pos[i * 3] = Math.cos(theta) * r;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = Math.sin(theta) * r;

            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.planetaryRing = new THREE.Points(geo, mat);
        // Tilt ring slightly toward camera (14 deg) and place in lower midsection
        this.planetaryRing.position.set(0, -1.8, -1.0);
        this.planetaryRing.rotation.x = THREE.MathUtils.degToRad(14);
        this.scene.add(this.planetaryRing);
    }

    /**
     * Swarming Volumetric Bokeh Sparkles & Micro-Particles
     */
    createVolumetricSparkles() {
        const COUNT = 2200;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(COUNT * 3);
        const col = new Float32Array(COUNT * 3);

        const palette = [
            new THREE.Color(0xf43f5e),
            new THREE.Color(0x00f2fe),
            new THREE.Color(0x8b5cf6),
            new THREE.Color(0xf59e0b)
        ];

        for (let i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particleCloud = new THREE.Points(geo, mat);
        this.scene.add(this.particleCloud);
    }

    /**
     * Active Theory 3D Spatial Carousel
     * Projects float along a spatial perspective curve. Active project is centered right,
     * while other projects recede into 3D depth to the right and left.
     */
    createSpatialCarousel() {
        this.carouselGroup = new THREE.Group();
        this.cardMeshes = [];

        const total = PROJECTS_DATA.length;

        PROJECTS_DATA.forEach((proj, idx) => {
            const cardGroup = new THREE.Group();

            // Load high-resolution project texture
            const texture = this.textureLoader.load(proj.texture);
            texture.colorSpace = THREE.SRGBColorSpace;

            const cardGeo = new THREE.PlaneGeometry(4.8, 3.0, 1, 1);
            const cardMat = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.2,
                metalness: 0.1,
                transparent: true,
                opacity: 0.95,
                side: THREE.DoubleSide
            });

            const cardMesh = new THREE.Mesh(cardGeo, cardMat);
            cardMesh.userData = { project: proj, index: idx };
            cardGroup.add(cardMesh);

            // Specular border frame
            const edgeGeo = new THREE.EdgesGeometry(cardGeo);
            const edgeMat = new THREE.LineBasicMaterial({
                color: proj.accentColor,
                linewidth: 2,
                transparent: true,
                opacity: 0.8
            });
            const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
            cardGroup.add(edgeMesh);

            this.carouselGroup.add(cardGroup);
            this.cardMeshes.push({
                group: cardGroup,
                mesh: cardMesh,
                project: proj,
                index: idx
            });
        });

        this.scene.add(this.carouselGroup);
        this.updateCardPositions();
    }

    updateCardPositions() {
        const total = this.cardMeshes.length;

        this.cardMeshes.forEach((item, idx) => {
            // Offset relative to active carousel index
            let offset = idx - this.carouselProgress;
            // Wrap offset within [-total/2, total/2]
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isCurrent = Math.abs(offset) < 0.45;

            // Active Theory curved depth placement:
            // Center active card sits at X: 1.4, Y: 0, Z: 2.2
            // Trailing cards sweep backward and to the right/left
            const x = 1.4 + offset * 4.2;
            const z = 2.2 - Math.abs(offset) * 2.8;
            const y = -offset * 0.15;
            const rotY = -offset * 0.28;

            item.group.position.set(x, y, z);
            item.group.rotation.y = rotY;
            item.group.scale.setScalar(isCurrent ? 1.0 : 0.85);

            // Opacity falloff for distant cards
            item.mesh.material.opacity = Math.max(0.15, 1.0 - Math.abs(offset) * 0.4);
        });
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

        window.addEventListener('pointermove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Wheel to advance carousel
        window.addEventListener('wheel', (e) => {
            this.targetCarouselProgress += e.deltaY * 0.0018;
        }, { passive: true });

        // Click on 3D card
        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
            const meshes = this.cardMeshes.map(c => c.mesh);
            const hits = this.raycaster.intersectObjects(meshes);

            if (hits.length > 0) {
                const clickedProj = hits[0].object.userData.project;
                const clickedIdx = hits[0].object.userData.index;

                // If not already active, bring to center
                if (Math.abs(clickedIdx - this.carouselProgress) > 0.4) {
                    this.setActiveProject(clickedIdx);
                } else {
                    // Open drawer
                    window.dispatchEvent(new CustomEvent('project-select', { detail: clickedProj }));
                }
                if (window.__playSfx) window.__playSfx('ping');
            }
        });
    }

    setActiveProject(index) {
        const total = PROJECTS_DATA.length;
        this.activeProjectIndex = (index + total) % total;
        this.targetCarouselProgress = this.activeProjectIndex;
    }

    animate() {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Mouse lerp
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.06;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.06;

        // Carousel progress lerp
        this.carouselProgress += (this.targetCarouselProgress - this.carouselProgress) * 0.08;
        this.updateCardPositions();

        // Animate Anatomical Spinal Column (Gentle organic breathing & twist)
        if (this.spineGroup) {
            this.spineGroup.rotation.y = time * 0.18 + this.mouse.x * 0.35;
            this.spineGroup.position.x = -1.2 + this.mouse.x * 0.4;
            this.spineGroup.position.y = Math.sin(time * 0.6) * 0.15 + this.mouse.y * 0.3;

            this.vertebraeMeshes.forEach(v => {
                const wave = Math.sin(time * 1.8 + v.phase);
                v.group.position.y = v.baseY + wave * 0.04;
                v.group.rotation.y = Math.sin(time * 0.8 + v.phase) * 0.08;
            });

            // Update shader uTime
            const shader = this.vertebraeMeshes[0]?.group.children[0]?.material?.userData?.shader;
            if (shader) shader.uniforms.uTime.value = time;
        }

        // Rotate Planetary Dust Ring
        if (this.planetaryRing) {
            this.planetaryRing.rotation.z = time * 0.04;
            this.planetaryRing.position.x = -1.2 + this.mouse.x * 0.4;
        }

        // Swirl Volumetric Sparkles
        if (this.particleCloud) {
            this.particleCloud.rotation.y = time * 0.02;
        }

        // Camera gentle parallax
        this.camera.position.x = this.mouse.x * 0.5;
        this.camera.position.y = this.mouse.y * 0.35;
        this.camera.lookAt(0, 0, 0);

        this.composer.render();
    }
}

// Global Singleton
export const stage = new ActiveTheoryWebGLStage();
window.__atStage = stage;
