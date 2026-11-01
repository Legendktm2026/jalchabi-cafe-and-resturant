import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SolarTimePreset, SOLAR_PRESETS } from '../../config/solarLighting';

interface LightingSetupProps {
  shadowsEnabled?: boolean;
  solarPreset?: SolarTimePreset;
}

export const LightingSetup: React.FC<LightingSetupProps> = ({
  shadowsEnabled = true,
  solarPreset = 'golden_hour',
}) => {
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const moonRef = useRef<THREE.DirectionalLight>(null);

  // Pre-allocated target color helpers to eliminate GC pauses
  const targetSkyColor = useRef(new THREE.Color());
  const targetGroundColor = useRef(new THREE.Color());
  const targetAmbientColor = useRef(new THREE.Color());
  const targetSunColor = useRef(new THREE.Color());
  const targetPointColor = useRef(new THREE.Color());
  const targetMoonColor = useRef(new THREE.Color());

  useFrame((state, delta) => {
    const config = SOLAR_PRESETS[solarPreset] || SOLAR_PRESETS.golden_hour;

    // 1. Hemisphere light
    if (hemiRef.current) {
      targetSkyColor.current.set(config.hemisphere.skyColor);
      targetGroundColor.current.set(config.hemisphere.groundColor);
      hemiRef.current.color.lerp(targetSkyColor.current, delta * 3.5);
      hemiRef.current.groundColor.lerp(targetGroundColor.current, delta * 3.5);
      hemiRef.current.intensity = THREE.MathUtils.damp(
        hemiRef.current.intensity,
        config.hemisphere.intensity,
        3.5,
        delta
      );
    }

    // 2. Ambient light
    if (ambientRef.current) {
      targetAmbientColor.current.set(config.ambient.color);
      ambientRef.current.color.lerp(targetAmbientColor.current, delta * 3.5);
      ambientRef.current.intensity = THREE.MathUtils.damp(
        ambientRef.current.intensity,
        config.ambient.intensity,
        3.5,
        delta
      );
    }

    // 3. Directional Sun
    if (sunRef.current) {
      targetSunColor.current.set(config.sun.color);
      sunRef.current.color.lerp(targetSunColor.current, delta * 3.5);
      sunRef.current.intensity = THREE.MathUtils.damp(
        sunRef.current.intensity,
        config.sun.intensity,
        3.5,
        delta
      );
      sunRef.current.position.x = THREE.MathUtils.damp(
        sunRef.current.position.x,
        config.sun.position[0],
        3.5,
        delta
      );
      sunRef.current.position.y = THREE.MathUtils.damp(
        sunRef.current.position.y,
        config.sun.position[1],
        3.5,
        delta
      );
      sunRef.current.position.z = THREE.MathUtils.damp(
        sunRef.current.position.z,
        config.sun.position[2],
        3.5,
        delta
      );
    }

    // 4. Interior Point Fill with organic Candlelight Flicker
    if (pointRef.current) {
      targetPointColor.current.set(config.interiorPoint.color);
      pointRef.current.color.lerp(targetPointColor.current, delta * 3.5);

      let targetIntensity = config.interiorPoint.intensity;
      if (config.candlelightFlicker) {
        // Natural candle flicker harmonic
        const flicker =
          Math.sin(state.clock.elapsedTime * 9) * 0.14 +
          Math.sin(state.clock.elapsedTime * 23) * 0.08 +
          (Math.random() - 0.5) * 0.05;
        targetIntensity += flicker;
      }

      pointRef.current.intensity = THREE.MathUtils.damp(
        pointRef.current.intensity,
        targetIntensity,
        config.candlelightFlicker ? 8.0 : 3.5,
        delta
      );
    }

    // 5. Back Courtyard / Moon light
    if (moonRef.current) {
      targetMoonColor.current.set(config.courtyardMoon.color);
      moonRef.current.color.lerp(targetMoonColor.current, delta * 3.5);
      moonRef.current.intensity = THREE.MathUtils.damp(
        moonRef.current.intensity,
        config.courtyardMoon.intensity,
        3.5,
        delta
      );
      moonRef.current.position.x = THREE.MathUtils.damp(
        moonRef.current.position.x,
        config.courtyardMoon.position[0],
        3.5,
        delta
      );
      moonRef.current.position.y = THREE.MathUtils.damp(
        moonRef.current.position.y,
        config.courtyardMoon.position[1],
        3.5,
        delta
      );
      moonRef.current.position.z = THREE.MathUtils.damp(
        moonRef.current.position.z,
        config.courtyardMoon.position[2],
        3.5,
        delta
      );
    }
  });

  return (
    <>
      {/* Soft Sky & Ground Hemisphere Light */}
      <hemisphereLight
        ref={hemiRef}
        color="#2a3b4c"
        groundColor="#23170e"
        intensity={0.65}
      />

      {/* Warm Ambient Fill to prevent pitch-black shadows */}
      <ambientLight ref={ambientRef} color="#ffebd6" intensity={0.55} />

      {/* Directional Sun */}
      <directionalLight
        ref={sunRef}
        position={[4, 7, 9]}
        color="#ffaa55"
        intensity={1.8}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0008}
      />

      {/* Interior Center Fill Light */}
      <pointLight
        ref={pointRef}
        position={[0, 3.2, -1.0]}
        color="#ffcc88"
        intensity={1.5}
        distance={9}
        decay={2}
      />

      {/* Courtyard Moon Light */}
      <directionalLight
        ref={moonRef}
        position={[-2, 5, -10]}
        color="#7092b0"
        intensity={0.8}
      />
    </>
  );
};
