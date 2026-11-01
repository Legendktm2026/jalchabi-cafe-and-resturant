import React, { useState } from 'react';
import { soundFoley } from '../../utils/soundFoley';

interface DiningAreaProps {
  onSelectTable?: (seatingId: string) => void;
  selectedTableId?: string;
}

export const DiningArea: React.FC<DiningAreaProps> = ({
  onSelectTable,
  selectedTableId,
}) => {
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);

  const handleTableClick = (tIdx: number) => {
    soundFoley.playPorcelainClink();
    const targetId = tIdx === 0 ? 'cozy-booth' : 'lakeside-edge';
    onSelectTable?.(targetId);
  };

  return (
    <group position={[2.6, 0, -1.6]}>
      {/* =========================================================================
          CURVED FOREST GREEN BANQUETTE BOOTH (Against right wall)
          ========================================================================= */}
      <group position={[1.8, 0, 0]}>
        {/* Dark Walnut Plinth Base */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.44, 4.4]} />
          <meshStandardMaterial color="#0e1b17" roughness={0.7} />
        </mesh>

        {/* Forest Green Leather Seat Cushion (Channel tufted) */}
        <mesh position={[-0.05, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.16, 4.3]} />
          <meshStandardMaterial color="#1b3026" roughness={0.55} />
        </mesh>

        {/* Fluted / Channel-Tufted Leather Backrest */}
        <mesh position={[0.28, 0.95, 0]} castShadow>
          <boxGeometry args={[0.22, 0.85, 4.3]} />
          <meshStandardMaterial color="#182c23" roughness={0.5} />
        </mesh>

        {/* Individual Tufting Ribs along backrest */}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={`rib-${i}`} position={[0.16, 0.95, -1.95 + i * 0.3]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.82, 12]} />
            <meshStandardMaterial color="#14241c" roughness={0.6} />
          </mesh>
        ))}

        {/* Walnut Top Cap along backrest */}
        <mesh position={[0.28, 1.4, 0]}>
          <boxGeometry args={[0.26, 0.05, 4.35]} />
          <meshStandardMaterial color="#2b1c13" roughness={0.65} />
        </mesh>
      </group>

      {/* =========================================================================
          BISTRO DINING TABLES (Interactive Raycastable Tables)
          ========================================================================= */}
      {[-1.2, 1.2].map((zTable, tIdx) => {
        const isHovered = hoveredTable === tIdx;
        const isSelected = selectedTableId === (tIdx === 0 ? 'cozy-booth' : 'lakeside-edge');

        return (
          <group
            key={`table-${tIdx}`}
            position={[0.6, 0, zTable]}
            onClick={(e) => {
              e.stopPropagation();
              handleTableClick(tIdx);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              setHoveredTable(tIdx);
              soundFoley.playPorcelainClink();
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'auto';
              setHoveredTable(null);
            }}
          >
            {/* Satin Brass Circular Floor Base */}
            <mesh position={[0, 0.015, 0]} receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.03, 32]} />
              <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
            </mesh>

            {/* Brass Central Pedestal Column */}
            <mesh position={[0, 0.38, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.045, 0.72, 20]} />
              <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
            </mesh>

            {/* Table Top: Dark Solid Walnut with Brass Edge Rim */}
            <group position={[0, 0.74, 0]}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
                <meshStandardMaterial
                  color={isSelected ? '#382012' : '#281a12'}
                  roughness={0.4}
                  metalness={0.1}
                />
              </mesh>
              {/* Brass Outer Rim with selection glow */}
              <mesh>
                <cylinderGeometry args={[0.555, 0.555, 0.042, 32]} />
                <meshStandardMaterial
                  color="#dfb86c"
                  metalness={0.88}
                  roughness={0.2}
                  emissive={isHovered || isSelected ? '#ffaa33' : '#000000'}
                  emissiveIntensity={isHovered || isSelected ? 1.5 : 0}
                />
              </mesh>

              {/* Selection Halo Ring when hovered or selected */}
              {(isHovered || isSelected) && (
                <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.58, 0.63, 36]} />
                  <meshBasicMaterial color="#dfb86c" transparent opacity={0.8} />
                </mesh>
              )}

              {/* Tabletop Items */}
              <mesh position={[-0.2, 0.06, 0.1]} castShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.08, 16]} />
                <meshStandardMaterial color="#f4efe6" roughness={0.3} />
              </mesh>
              <mesh position={[-0.2, 0.022, 0.1]}>
                <cylinderGeometry args={[0.065, 0.065, 0.01, 16]} />
                <meshStandardMaterial color="#f4efe6" roughness={0.3} />
              </mesh>

              {/* Candle Votive */}
              <group position={[0.08, 0.06, -0.1]}>
                <mesh>
                  <cylinderGeometry args={[0.035, 0.03, 0.07, 16]} />
                  <meshStandardMaterial
                    color="#d48a37"
                    transparent
                    opacity={0.65}
                    roughness={0.1}
                  />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <sphereGeometry args={[0.012, 8, 8]} />
                  <meshStandardMaterial
                    color="#fff0aa"
                    emissive="#ffaa22"
                    emissiveIntensity={3.0}
                  />
                </mesh>
              </group>

              {/* Brass Bud Vase */}
              <group position={[-0.05, 0.07, -0.18]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.02, 0.03, 0.1, 12]} />
                  <meshStandardMaterial color="#dfb86c" metalness={0.85} roughness={0.25} />
                </mesh>
                <mesh position={[0, 0.12, 0]} rotation={[0.1, 0, 0.2]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.16, 6]} />
                  <meshStandardMaterial color="#6b705c" roughness={0.9} />
                </mesh>
              </group>
            </group>

            {/* Chairs */}
            {[-0.35, 0.35].map((zChair, cIdx) => (
              <group
                key={`chair-${tIdx}-${cIdx}`}
                position={[-0.65, 0, zChair]}
                rotation={[0, Math.PI / 2 + (cIdx === 0 ? 0.2 : -0.2), 0]}
              >
                {[-0.18, 0.18].map((xLeg, lx) =>
                  [-0.18, 0.18].map((yLeg, ly) => (
                    <mesh
                      key={`leg-${lx}-${ly}`}
                      position={[xLeg, 0.22, yLeg]}
                      rotation={[xLeg * 0.1, 0, yLeg * 0.1]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.012, 0.008, 0.44, 12]} />
                      <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
                    </mesh>
                  ))
                )}
                <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
                  <boxGeometry args={[0.42, 0.06, 0.42]} />
                  <meshStandardMaterial color="#4a3525" roughness={0.6} />
                </mesh>
                <group position={[-0.18, 0.72, 0]}>
                  <mesh castShadow>
                    <boxGeometry args={[0.05, 0.24, 0.42]} />
                    <meshStandardMaterial color="#2b1c13" roughness={0.65} />
                  </mesh>
                  <mesh position={[0.02, -0.15, -0.14]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
                    <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
                  </mesh>
                  <mesh position={[0.02, -0.15, 0.14]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
                    <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
                  </mesh>
                </group>
              </group>
            ))}

            {/* Pendant Light */}
            <group position={[0, 2.7, 0]}>
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.004, 0.004, 1.0, 6]} />
                <meshStandardMaterial color="#111" />
              </mesh>
              <mesh position={[0, -0.04, 0]} castShadow>
                <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.06, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial
                  color="#ffeecc"
                  emissive="#ffaa33"
                  emissiveIntensity={2.5}
                />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
};
