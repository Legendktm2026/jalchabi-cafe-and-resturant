import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { BhetkiPaturi3D } from './BhetkiPaturi3D';
import { MishtiDoiBhar3D } from './MishtiDoiBhar3D';
import { KalitaPourOver3D } from './KalitaPourOver3D';
import { KolkataBiryani3D } from './KolkataBiryani3D';
import { DaabChingri3D } from './DaabChingri3D';
import { RotateCw, Smartphone, Sparkles, Check } from 'lucide-react';
import { soundFoley } from '../../../utils/soundFoley';

interface DishCanvasProps {
  dishId: string;
  dishName: string;
  className?: string;
}

export const DishCanvas: React.FC<DishCanvasProps> = ({
  dishId,
  dishName,
  className = '',
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [arCopied, setArCopied] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Map dish IDs to the appropriate photorealistic 3D model
  const renderDishModel = () => {
    const id = dishId.toLowerCase();
    const name = dishName.toLowerCase();

    // 1. Kolkata Royal Biryani & Heritage Meat
    if (id.includes('biryani') || name.includes('biryani') || id.includes('kosha') || name.includes('kosha') || name.includes('mutton') || id.includes('kathi') || name.includes('roll')) {
      return <KolkataBiryani3D />;
    }

    // 2. Daab Chingri (Jumbo Prawns in Green Coconut)
    if (id.includes('daab') || name.includes('daab') || id.includes('chingri') || name.includes('chingri') || name.includes('prawn')) {
      return <DaabChingri3D />;
    }

    // 3. Bhetki Paturi (Banana leaf steamed fish)
    if (id.includes('bhetki') || name.includes('bhetki') || id.includes('paturi') || name.includes('paturi') || name.includes('fish')) {
      return <BhetkiPaturi3D />;
    }

    // 4. Mishti Doi in Terracotta Bhar & Traditional Bengali Sweets
    if (id.includes('mishti') || name.includes('mishti') || id.includes('doi') || name.includes('doi') || name.includes('sandesh') || name.includes('rosogolla') || name.includes('dessert') || name.includes('torte') || id.includes('phuchka') || name.includes('phuchka')) {
      return <MishtiDoiBhar3D />;
    }

    // 5. Default to Artisanal Kalita Pour-Over / Darjeeling Tea / Coffee
    return <KalitaPourOver3D />;
  };

  const handleResetView = () => {
    soundFoley.playSwitchClick();
    controlsRef.current?.reset();
    setAutoRotate(true);
  };

  // WebXR / AR Mobile Intent trigger
  const handleLaunchAR = () => {
    soundFoley.playSwitchClick();
    // Check if on iOS for QuickLook USDZ or Android Scene Viewer
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS || isAndroid) {
      // In production WebXR, mobile will project through camera
      window.alert(`Launching 3D AR projection for "${dishName}". Position your camera towards a flat tabletop surface.`);
    } else {
      // Desktop: Show guidance and provide quick copy link
      setArCopied(true);
      setTimeout(() => setArCopied(false), 2400);
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[300px] sm:min-h-[380px] bg-[#070e0c] rounded-2xl overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.4, 2.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerDown={() => setAutoRotate(false)}
        className="w-full h-full"
      >
        <color attach="background" args={['#070e0c']} />

        {/* Studio Food Photography Lighting */}
        <ambientLight intensity={0.65} color="#fff6ea" />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.8}
          color="#ffeedd"
          castShadow
          shadow-mapSize={1024}
        />
        {/* Soft Cool Rim Light for silhouette separation */}
        <directionalLight
          position={[-3, 3, -3]}
          intensity={0.8}
          color="#8cb4d8"
        />
        {/* Warm Golden Reflection from below */}
        <pointLight
          position={[0, -0.5, 1]}
          intensity={0.6}
          color="#dfb86c"
          distance={4}
        />

        <Suspense fallback={null}>
          <group position={[0, -0.15, 0]}>
            {renderDishModel()}

            {/* Soft Ambient Ground Contact Shadow */}
            <ContactShadows
              position={[0, -0.32, 0]}
              opacity={0.6}
              scale={3.5}
              blur={1.8}
              far={1.5}
            />
          </group>

          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            enablePan={false}
            minDistance={1.2}
            maxDistance={4.2}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Suspense>
      </Canvas>

      {/* Top Floating Badge & HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e1b17]/90 border border-[#dfb86c]/40 text-[10px] font-mono uppercase tracking-widest text-[#e5c378] backdrop-blur-md shadow-lg">
          <Sparkles className="w-3 h-3 text-[#dfb86c]" />
          <span>Interactive 3D Dish View</span>
        </span>
      </div>

      {/* Bottom Floating Turntable Controls */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Reset / Auto-rotate toggle */}
          <button
            type="button"
            onClick={handleResetView}
            title="Reset 360° Turntable"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e1b17]/85 border border-[#dfb86c]/30 text-[10px] font-mono uppercase tracking-wider text-[#8fa69d] hover:text-[#fdfbf7] hover:border-[#dfb86c] backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            <RotateCw className="w-3 h-3 text-[#dfb86c]" />
            <span className="hidden sm:inline">Reset Turntable</span>
          </button>
        </div>

        {/* Mobile AR Projection Button */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={handleLaunchAR}
            title="Project this dish in Augmented Reality onto your table"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] text-[10px] font-mono uppercase tracking-wider font-semibold hover:brightness-110 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(223,184,108,0.35)] cursor-pointer"
          >
            {arCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>AR Ready (Scan on Mobile)</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>View on Table in AR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
