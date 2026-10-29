import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelSceneProps {
  scrollProgress: number; // 0 to 1 across whole page
  sectionIndex: number;  // 0: hero, 1: cad, 2: layers, 3: finished, 4: contacts
  sectionProgress: number; // 0 to 1 within current section
}

export const ModelScene: React.FC<ModelSceneProps> = ({
  scrollProgress,
  sectionIndex,
  sectionProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshSolidRef = useRef<THREE.Mesh>(null);
  const meshWireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const nozzleHeadRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { gl, size } = useThree();
  const isMobile = size.width < 768;

  // Enable clipping for layer-by-layer printing
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  // Dynamic clipping plane for 3D printing section
  const clipPlane = useMemo(() => {
    return new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.5);
  }, []);

  // Procedural complex parametric turbine/gear geometry
  const { mainGeometry, coreGeometry, ringGeometry } = useMemo(() => {
    // 1. Parametric vase/turbine rotor
    const mainGeom = new THREE.TorusKnotGeometry(1.0, 0.35, 128, 32, 2, 5);
    
    // 2. Central hub with precision cylinder
    const coreGeom = new THREE.CylinderGeometry(0.55, 0.55, 2.2, 32, 16, true);
    
    // 3. Precision outer telemetry ring
    const ringGeom = new THREE.TorusGeometry(1.55, 0.035, 16, 64);

    return {
      mainGeometry: mainGeom,
      coreGeometry: coreGeom,
      ringGeometry: ringGeom,
    };
  }, []);

  // Procedural floating sparks / molten filament particles
  const particles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 0.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.0;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    return geom;
  }, []);

  // Materials
  const materials = useMemo(() => {
    // Solid Carbon/Titanium PEEK material
    const solid = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14151a'),
      metalness: 0.82,
      roughness: 0.28,
      clippingPlanes: [clipPlane],
      clipShadows: true,
      side: THREE.DoubleSide,
    });

    // CAD Holographic Wireframe
    const wireframe = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff5500'),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    // Core internal casing with warm glowing rim
    const core = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0b0e'),
      emissive: new THREE.Color('#ff3300'),
      emissiveIntensity: 0.15,
      metalness: 0.9,
      roughness: 0.35,
      clippingPlanes: [clipPlane],
    });

    // Slicing Laser Ring material (molten layer edge)
    const laserRing = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff7700'),
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    // Sparks
    const sparks = new THREE.PointsMaterial({
      color: new THREE.Color('#ffaa00'),
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    return { solid, wireframe, core, laserRing, sparks };
  }, [clipPlane]);

  // Frame loop for smooth interpolation & continuous rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow ambient turntable rotation
    groupRef.current.rotation.y += delta * 0.35;

    // Cursor parallax tilt
    const targetMouseX = state.pointer.x * 0.25;
    const targetMouseY = state.pointer.y * 0.25;

    // Target positions & scales across sections
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotX = 0.25;
    let targetRotZ = 0;
    let targetScale = isMobile ? 0.78 : 1.05;
    let wireOpacity = 0.08;
    let clipY = 3.0; // default fully visible

    if (sectionIndex === 0) {
      // Hero: centered / slight right on desktop
      targetX = isMobile ? 0 : 1.3;
      targetY = isMobile ? 0.1 : 0.0;
      targetScale = isMobile ? 0.85 : 1.15;
      targetRotX = 0.35;
      clipY = 3.0;
      wireOpacity = 0.08;
    } else if (sectionIndex === 1) {
      // 01: «От идеи к модели» (CAD topology)
      targetX = isMobile ? 0 : 1.5;
      targetY = isMobile ? -0.2 : 0.0;
      targetScale = isMobile ? 0.82 : 1.25;
      targetRotX = 0.8;
      targetRotZ = 0.3;
      wireOpacity = 0.65; // Bright CAD wireframe active
      clipY = 3.0;
    } else if (sectionIndex === 2) {
      // 02: «Печать слой за слоем» (Active slicing)
      targetX = isMobile ? 0 : -1.4;
      targetY = isMobile ? 0.2 : 0.0;
      targetScale = isMobile ? 0.85 : 1.2;
      targetRotX = 0.4;
      wireOpacity = 0.12;

      // Slice plane animates upwards from -1.6 to +1.6 based on section progress
      const printProgress = Math.max(0, Math.min(1, sectionProgress));
      clipY = -1.6 + printProgress * 3.2;

      // Position the glowing nozzle print head ring at current layer height
      if (nozzleHeadRef.current) {
        nozzleHeadRef.current.position.y = clipY;
        nozzleHeadRef.current.visible = printProgress < 0.98;
      }
    } else if (sectionIndex === 3) {
      // 03: «Готовый объект» (Solid Masterpiece)
      targetX = isMobile ? 0 : 0.0;
      targetY = isMobile ? 0.1 : 0.0;
      targetScale = isMobile ? 0.95 : 1.45;
      targetRotX = 0.2;
      wireOpacity = 0.04;
      clipY = 3.0; // fully printed
      if (nozzleHeadRef.current) nozzleHeadRef.current.visible = false;
    } else {
      // 04: Контакты
      targetX = isMobile ? 0 : 0;
      targetY = isMobile ? 0.6 : 0.5;
      targetScale = isMobile ? 0.75 : 0.95;
      targetRotX = 0.15;
      wireOpacity = 0.05;
      clipY = 3.0;
      if (nozzleHeadRef.current) nozzleHeadRef.current.visible = false;
    }

    // Update clipping plane constant
    clipPlane.constant = clipY;

    // Smooth Lerp transitions
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX + targetMouseY,
      0.06
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ + targetMouseX,
      0.06
    );

    // Dynamic wireframe opacity transition
    if (materials.wireframe) {
      materials.wireframe.opacity = THREE.MathUtils.lerp(
        materials.wireframe.opacity,
        wireOpacity,
        0.08
      );
    }

    // Particle swirl effect
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.18;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Solid Printed Model */}
      <mesh
        ref={meshSolidRef}
        geometry={mainGeometry}
        material={materials.solid}
        castShadow
        receiveShadow
      />

      {/* CAD Wireframe Overlay */}
      <mesh
        ref={meshWireRef}
        geometry={mainGeometry}
        material={materials.wireframe}
      />

      {/* Internal Precision Core */}
      <mesh
        ref={coreRef}
        geometry={coreGeometry}
        material={materials.core}
      />

      {/* Outer Telemetry Reference Ring */}
      <mesh
        ref={ringRef}
        geometry={ringGeometry}
        material={materials.wireframe}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Slicing Nozzle / Hot Print Head Layer Indicator */}
      <group ref={nozzleHeadRef} visible={false}>
        {/* Glowing molten perimeter ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 1.45, 64]} />
          <primitive object={materials.laserRing} attach="material" />
        </mesh>
        
        {/* Central hotend nozzle spot */}
        <pointLight color="#ff5500" intensity={3.5} distance={2.5} />
      </group>

      {/* Emitted Sparks / Filament Particles */}
      <points ref={particlesRef} geometry={particles} material={materials.sparks} />
    </group>
  );
};
