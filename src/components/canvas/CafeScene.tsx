import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CameraViewPreset, SceneMode, HotspotInfo, QualitySettings } from '../../types';
import { SolarTimePreset, SOLAR_PRESETS } from '../../config/solarLighting';
import { ExteriorEntrance } from './ExteriorEntrance';
import { InteriorArchitecture } from './InteriorArchitecture';
import { BrewBarCounter } from './BrewBarCounter';
import { DiningArea } from './DiningArea';
import { DecorativeElements } from './DecorativeElements';
import { LightingSetup } from './LightingSetup';
import { HotspotsLayer } from './HotspotsLayer';
import { CameraController } from './CameraController';
import { VerandaVideoPortal } from './VerandaVideoPortal';
import { soundFoley } from '../../utils/soundFoley';

interface CafeSceneProps {
  currentPreset?: CameraViewPreset;
  sceneMode?: SceneMode;
  onEnterAnimationComplete?: () => void;
  onSelectHotspot?: (hotspot: HotspotInfo) => void;
  activeHotspotId?: string;
  qualitySettings: QualitySettings;
  isVisible?: boolean;
  scrollProgress?: number;
  isOrbitMode?: boolean;
  solarPreset?: SolarTimePreset;
  onSelectTable?: (seatingId: string) => void;
  selectedTableId?: string;
  onOpenPortal?: () => void;
  isPortalDoorOpen?: boolean;
  onEnterSanctuary?: () => void;
}

export const CafeScene = React.memo<CafeSceneProps>(function CafeScene({
  currentPreset = 'interior_overview',
  sceneMode = 'interior',
  onEnterAnimationComplete,
  onSelectHotspot = () => {},
  activeHotspotId,
  qualitySettings,
  isVisible = true,
  isOrbitMode = false,
  solarPreset = 'golden_hour',
  onSelectTable,
  selectedTableId,
  onOpenPortal,
  isPortalDoorOpen = false,
  onEnterSanctuary,
}) {
  const [doorOpenProgress, setDoorOpenProgress] = useState(0);
  const [manualEntranceOpen, setManualEntranceOpen] = useState(false);
  const currentSolarConfig = SOLAR_PRESETS[solarPreset] || SOLAR_PRESETS.golden_hour;

  // Toggle front entrance doors when clicked at the start
  const handleToggleEntrance = () => {
    soundFoley.playDoorOpen();
    setManualEntranceOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full bg-[#070e0c]">
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        shadows={qualitySettings.shadows ? { type: THREE.PCFShadowMap } : false}
        dpr={[1, Math.min(1.2, qualitySettings.pixelRatio)]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 1.8, 8.5], fov: 46 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <color attach="background" args={[currentSolarConfig.fog.color]} />
        <fog
          attach="fog"
          args={[
            currentSolarConfig.fog.color,
            currentSolarConfig.fog.near,
            currentSolarConfig.fog.far,
          ]}
        />

        <Suspense fallback={null}>
          {/* Real-time Solar & Ambient Lighting */}
          <LightingSetup
            shadowsEnabled={qualitySettings.shadows}
            solarPreset={solarPreset}
          />

          {/* Camera Management */}
          <CameraController
            currentPreset={currentPreset}
            sceneMode={sceneMode}
            onEnterAnimationComplete={onEnterAnimationComplete}
            doorOpenProgress={doorOpenProgress}
            setDoorOpenProgress={setDoorOpenProgress}
            reducedMotion={qualitySettings.reducedMotion}
            isOrbitMode={isOrbitMode}
          />

          {/* 3D Geometry */}
          <ExteriorEntrance
            doorOpenProgress={manualEntranceOpen ? 1.0 : undefined}
            onToggleDoor={handleToggleEntrance}
            onEnterSanctuary={onEnterSanctuary}
          />

          {/* Veranda Video Portal: Manages internal visibility via scrollyStore to eliminate mount stalls */}
          <VerandaVideoPortal
            doorOpenProgress={isPortalDoorOpen ? 1.0 : undefined}
            onEnterPortal={onOpenPortal || (() => {})}
          />

          <InteriorArchitecture />
          <BrewBarCounter />
          <DiningArea
            onSelectTable={onSelectTable}
            selectedTableId={selectedTableId}
          />
          <DecorativeElements />

          {/* Interactive 3D Hotspots: Gated to 360° Free Look / Explore to avoid scrollytelling card clashes */}
          <HotspotsLayer
            visible={isOrbitMode || sceneMode === 'explore'}
            onSelectHotspot={onSelectHotspot}
            activeHotspotId={activeHotspotId}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});
