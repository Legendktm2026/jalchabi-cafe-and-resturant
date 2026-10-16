import React from 'react';

export const DecorativeElements: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================================
          POTTED MONSTERA DELICIOSA (Near Left Column / Entrance to Counter)
          ========================================================================= */}
      <group position={[-2.4, 0, 2.6]}>
        {/* Ribbed Ceramic Planter Pot */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.64, 24]} />
          <meshStandardMaterial color="#2c241e" roughness={0.7} />
        </mesh>
        {/* Brass Rim on Pot */}
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.03, 24]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Soil Surface */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 16]} />
          <meshStandardMaterial color="#1a120b" roughness={0.95} />
        </mesh>

        {/* Sculpted Monstera Stems & Broad Leaves */}
        {[
          { pos: [0.1, 0.95, 0.1], rot: [0.2, 0.4, 0.3], scale: 0.35 },
          { pos: [-0.12, 1.1, -0.08], rot: [-0.3, -0.6, -0.2], scale: 0.4 },
          { pos: [0.15, 1.25, -0.15], rot: [-0.1, 1.2, 0.4], scale: 0.38 },
          { pos: [-0.15, 0.85, 0.15], rot: [0.4, -0.8, -0.3], scale: 0.32 },
          { pos: [0, 1.35, 0], rot: [0.05, 0.1, 0.1], scale: 0.42 },
        ].map((leaf, idx) => (
          <group key={`leaf-${idx}`} position={leaf.pos as [number, number, number]} rotation={leaf.rot as [number, number, number]}>
            {/* Stem */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.01, 0.015, 0.45, 8]} />
              <meshStandardMaterial color="#2a4533" roughness={0.6} />
            </mesh>
            {/* Broad Leaf Blade (curved plane/disc) */}
            <mesh castShadow receiveShadow position={[0, 0.15, 0]} rotation={[0.4, 0, 0]}>
              <sphereGeometry args={[leaf.scale, 12, 8, 0, Math.PI * 2, 0, Math.PI / 4]} />
              <meshStandardMaterial color="#1c3826" roughness={0.4} metalness={0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          TALL FIDDLE LEAF FIG (Beside the Back Window, Right Corner)
          ========================================================================= */}
      <group position={[4.6, 0, -6.0]}>
        {/* Fluted Brass Planter */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.28, 0.9, 24]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Slender Woody Trunk */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.045, 1.6, 10]} />
          <meshStandardMaterial color="#402e21" roughness={0.8} />
        </mesh>
        {/* Clusters of Upward Arching Leaves */}
        {[-0.2, 0, 0.2, 0.4, 0.6].map((yOffset, i) => (
          <group key={`fig-cluster-${i}`} position={[0, 1.5 + yOffset, 0]} rotation={[0, i * 1.3, 0]}>
            <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.3]} castShadow>
              <sphereGeometry args={[0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
              <meshStandardMaterial color="#193322" roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          HERITAGE ARTWORK WALL: "JALCHOBI — REFLECTIONS ON WATER" (Right Wall)
          ========================================================================= */}
      <group position={[5.5, 2.3, -1.4]}>
        {/* Antique Brass Slim Picture Frame */}
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[2.2, 1.4, 0.06]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Picture Matting / Canvas (Deep Indigo & Gold Watercolor representation) */}
        <mesh position={[-0.04, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial
            color="#1b2a3a"
            emissive="#1e3445"
            emissiveIntensity={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Gold watercolor swirl accents on the canvas */}
        <mesh position={[-0.045, -0.1, 0.1]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.4, 0.5]} />
          <meshStandardMaterial
            color="#c58b4b"
            emissive="#dfb15b"
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Dedicated Brass Picture Light Mounted Above Frame */}
        <group position={[-0.2, 0.85, 0]}>
          {/* Support bracket */}
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Horizontal Hood */}
          <mesh position={[-0.08, 0.08, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.05, 0.04, 0.8]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Warm Picture Spotlight pointing down at the artwork */}
          <spotLight
            position={[-0.08, 0.06, 0]}
            target-position={[0, -0.8, 0]}
            color="#ffe0aa"
            intensity={2.2}
            angle={0.65}
            penumbra={0.7}
            distance={3.2}
          />
        </group>
      </group>

      {/* =========================================================================
          BRASS WALL SCONCES (Casting up-down light fans along side walls)
          ========================================================================= */}
      {/* Right Wall Sconces */}
      {[-4.0, 1.0].map((zPos, idx) => (
        <group key={`r-sconce-${idx}`} position={[5.5, 2.2, zPos]}>
          {/* Brass Cylindrical Fixture */}
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.92} roughness={0.2} />
          </mesh>
          {/* Upper Light cone */}
          <pointLight position={[-0.1, 0.2, 0]} color="#ffbb66" intensity={1.2} distance={2.4} decay={2} />
          {/* Lower Light cone */}
          <pointLight position={[-0.1, -0.2, 0]} color="#ffbb66" intensity={1.2} distance={2.4} decay={2} />
        </group>
      ))}

      {/* Left Wall Sconces (Back-bar side) */}
      {[-4.5, 1.5].map((zPos, idx) => (
        <group key={`l-sconce-${idx}`} position={[-5.5, 2.2, zPos]}>
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.92} roughness={0.2} />
          </mesh>
          <pointLight position={[0.1, 0.2, 0]} color="#ffbb66" intensity={1.2} distance={2.4} decay={2} />
          <pointLight position={[0.1, -0.2, 0]} color="#ffbb66" intensity={1.2} distance={2.4} decay={2} />
        </group>
      ))}
    </group>
  );
};
