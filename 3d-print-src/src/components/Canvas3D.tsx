import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelScene } from './ModelScene';

interface Canvas3DProps {
  scrollProgress: number;
  sectionIndex: number;
  sectionProgress: number;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({
  scrollProgress,
  sectionIndex,
  sectionProgress,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          localClippingEnabled: true,
        }}
        dpr={[1, 2]}
      >
        {/* Cinematic High-Tech Studio Lighting */}
        <ambientLight intensity={0.4} />

        {/* Key Hot Nozzle Spotlight (Incandescent Orange) */}
        <spotLight
          position={[3.5, 4.5, 3.5]}
          angle={0.6}
          penumbra={0.8}
          intensity={4.2}
          color="#ff5500"
          castShadow
        />

        {/* Cold Rim Fill Light (Cyber Cyan / Soft White) */}
        <directionalLight
          position={[-4, 2, -2]}
          intensity={1.8}
          color="#4488ff"
        />

        {/* Bottom Accent Uplight (Warm Amber) */}
        <pointLight
          position={[0, -3, 2]}
          intensity={1.5}
          color="#ff8800"
        />

        {/* Top Nozzle Glow */}
        <pointLight
          position={[0, 3, 0]}
          intensity={1.2}
          color="#ff3300"
        />

        <Suspense fallback={null}>
          <ModelScene
            scrollProgress={scrollProgress}
            sectionIndex={sectionIndex}
            sectionProgress={sectionProgress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
