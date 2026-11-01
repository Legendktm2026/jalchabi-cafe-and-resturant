import React from 'react';
import { Text } from '@react-three/drei';

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
          <meshStandardMaterial color="#dfb86c" metalness={0.88} roughness={0.25} />
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
          <meshStandardMaterial color="#dfb86c" metalness={0.85} roughness={0.25} />
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
          HERITAGE ARTWORK WALL: "JALCHABI CAFE & RESTAURANT" (Right Wall White Board)
          ========================================================================= */}
      <group position={[5.5, 2.3, -1.4]}>
        {/* Antique Brass Slim Outer Picture Frame */}
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[2.2, 1.4, 0.06]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Outer Picture Matting (Rich Heritage Deep Forest Border) */}
        <mesh position={[-0.04, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial
            color="#14211a"
            roughness={0.8}
          />
        </mesh>

        {/* Gallery White Board / Canvas Centerpiece */}
        <mesh position={[-0.045, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.7, 0.95]} />
          <meshStandardMaterial
            color="#faf7f2"
            roughness={0.35}
            metalness={0.02}
          />
        </mesh>

        {/* Fine Brass Inset Border on White Board */}
        <mesh position={[-0.048, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.62, 0.87]} />
          <meshStandardMaterial
            color="#dfb86c"
            metalness={0.85}
            roughness={0.25}
            wireframe
          />
        </mesh>

        {/* =======================================================================
            BOLD CAFE NAME & ARTISANAL BRANDING ON WHITE BOARD
            ======================================================================= */}
        {/* Established Tagline */}
        <Text
          position={[-0.052, 0.24, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.042}
          color="#a37e36"
          letterSpacing={0.22}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ✦ ESTD. 2024 • SARBERIA ✦
        </Text>

        {/* Bold Primary Cafe Name: JALCHABI */}
        <Text
          position={[-0.052, 0.11, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.17}
          color="#121815"
          fontWeight="bold"
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#070e0c"
        >
          JALCHABI
        </Text>

        {/* Cafe & Restaurant Subtitle */}
        <Text
          position={[-0.052, -0.01, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.055}
          color="#b88a32"
          letterSpacing={0.24}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          CAFE & RESTAURANT
        </Text>

        {/* Bengali Calligraphy Name */}
        <Text
          position={[-0.052, -0.13, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.075}
          color="#15271e"
          fontWeight="bold"
          letterSpacing={0.05}
          anchorX="center"
          anchorY="middle"
        >
          জলছবি ক্যাফে ও রেস্তোরাঁ
        </Text>

        {/* Terroir & Culinary Craft Footnote */}
        <Text
          position={[-0.052, -0.25, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.032}
          color="#485c53"
          letterSpacing={0.16}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          ARTISANAL COFFEE • BENGAL CULINARY SANCTUARY • CANNING II
        </Text>

        {/* Dedicated Brass Picture Light Mounted Above Frame */}
        <group position={[-0.2, 0.85, 0]}>
          {/* Support bracket */}
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
            <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Horizontal Hood */}
          <mesh position={[-0.08, 0.08, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.05, 0.04, 0.8]} />
            <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Warm Emissive Glow Strip */}
          <mesh position={[-0.06, 0.06, 0]}>
            <boxGeometry args={[0.02, 0.01, 0.74]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffe0aa" emissiveIntensity={2.0} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          BRASS WALL SCONCES (Warm Emissive Glowing Fixtures)
          ========================================================================= */}
      {/* Right Wall Sconces */}
      {[-4.0, 1.0].map((zPos, idx) => (
        <group key={`r-sconce-${idx}`} position={[5.5, 2.2, zPos]}>
          {/* Brass Cylindrical Fixture */}
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
            <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.2} />
          </mesh>
          {/* Upper Glowing Accent */}
          <mesh position={[-0.06, 0.14, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffbb66" emissiveIntensity={2.5} />
          </mesh>
          {/* Lower Glowing Accent */}
          <mesh position={[-0.06, -0.14, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffbb66" emissiveIntensity={2.5} />
          </mesh>
        </group>
      ))}

      {/* Left Wall Sconces (Back-bar side) */}
      {[-4.5, 1.5].map((zPos, idx) => (
        <group key={`l-sconce-${idx}`} position={[-5.5, 2.2, zPos]}>
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
            <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.2} />
          </mesh>
          <mesh position={[0.06, 0.14, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffbb66" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.06, -0.14, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#fff0aa" emissive="#ffbb66" emissiveIntensity={2.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
