import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraViewPreset, SceneMode, HotspotInfo, QualitySettings } from '../../types';
import { ExteriorEntrance } from './ExteriorEntrance';
import { InteriorArchitecture } from './InteriorArchitecture';
import { BrewBarCounter } from './BrewBarCounter';
import { DiningArea } from './DiningArea';
import { DecorativeElements } from './DecorativeElements';
import { LightingSetup } from './LightingSetup';
import { HotspotsLayer } from './HotspotsLayer';
import { CameraController } from './CameraController';

interface CafeSceneProps {
  currentPreset: CameraViewPreset;
  sceneMode: SceneMode;
  onEnterAnimationComplete: () => void;
  onSelectHotspot: (hotspot: HotspotInfo) => void;
  activeHotspotId?: string;
  qualitySettings: QualitySettings;
  isVisible?: boolean;
}

export const CafeScene: React.FC<CafeSceneProps> = ({
  currentPreset,
  sceneMode,
  onEnterAnimationComplete,
  onSelectHotspot,
  activeHotspotId,
  qualitySettings,
  isVisible = true,
}) => {
  const [doorOpenProgress, setDoorOpenProgress] = useState(0);

  // Hotspots are visible when we are inside (interior or explore mode, or when currentPreset is an interior one)
  const isInside =
    sceneMode !== 'intro' ||
    currentPreset === 'interior_overview' ||
    currentPreset === 'counter' ||
    currentPreset === 'seating' ||
    currentPreset === 'menu' ||
    currentPreset === 'story';

  return (
    <div className="relative w-full h-full bg-[#120d09]">
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        shadows={qualitySettings.shadows}
        dpr={[1, Math.min(1.75, qualitySettings.pixelRatio)]}
        camera={{ position: [0, 1.8, 8.5], fov: 46 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#100b08']} />
        <fog attach="fog" args={['#100b08', 8, 22]} />

        <Suspense fallback={null}>
          {/* Lighting */}
          <LightingSetup shadowsEnabled={qualitySettings.shadows} />

          {/* Camera Management */}
          <CameraController
            currentPreset={currentPreset}
            sceneMode={sceneMode}
            onEnterAnimationComplete={onEnterAnimationComplete}
            doorOpenProgress={doorOpenProgress}
            setDoorOpenProgress={setDoorOpenProgress}
            reducedMotion={qualitySettings.reducedMotion}
          />

          {/* 3D Geometry */}
          <ExteriorEntrance doorOpenProgress={doorOpenProgress} />
          <InteriorArchitecture />
          <BrewBarCounter />
          <DiningArea />
          <DecorativeElements />

          {/* Interactive 3D Hotspots */}
          <HotspotsLayer
            visible={isInside}
            onSelectHotspot={onSelectHotspot}
            activeHotspotId={activeHotspotId}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
