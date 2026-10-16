import React from 'react';

interface LightingSetupProps {
  shadowsEnabled?: boolean;
}

export const LightingSetup: React.FC<LightingSetupProps> = ({ shadowsEnabled = true }) => {
  return (
    <>
      {/* Soft Sky & Ground Hemisphere Light (Dusk indigo sky + warm ground bounce) */}
      <hemisphereLight
        color="#2a3b4c"
        groundColor="#23170e"
        intensity={0.65}
      />

      {/* Warm Ambient Fill to prevent pitch-black shadows */}
      <ambientLight color="#ffebd6" intensity={0.55} />

      {/* Directional Golden Hour Dusk Sun Angling through the front portal */}
      <directionalLight
        position={[4, 7, 9]}
        color="#ffaa55"
        intensity={1.8}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowsEnabled ? 1024 : 512}
        shadow-mapSize-height={shadowsEnabled ? 1024 : 512}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0005}
      />

      {/* Interior Warm Center Fill Light */}
      <pointLight
        position={[0, 3.2, -1.0]}
        color="#ffcc88"
        intensity={1.5}
        distance={9}
        decay={2}
      />

      {/* Courtyard Dusk Moonlight Angle through back arched window */}
      <directionalLight
        position={[-2, 5, -10]}
        color="#7092b0"
        intensity={0.8}
      />
    </>
  );
};
