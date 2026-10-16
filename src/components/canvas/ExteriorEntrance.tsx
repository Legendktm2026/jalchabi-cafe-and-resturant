import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ExteriorEntranceProps {
  doorOpenProgress: number; // 0 (closed) to 1 (fully open)
}

export const ExteriorEntrance: React.FC<ExteriorEntranceProps> = ({ doorOpenProgress }) => {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const targetAngle = doorOpenProgress * (Math.PI * 0.45); // open up to ~80 degrees
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.damp(
        leftDoorRef.current.rotation.y,
        -targetAngle,
        8.0,
        delta
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.damp(
        rightDoorRef.current.rotation.y,
        targetAngle,
        8.0,
        delta
      );
    }
  });

  return (
    <group position={[0, 0, 4.0]}>
      {/* =========================================================================
          FULL EXTERIOR ARCHITECTURAL FACADE WALL (Deep Forest Green & Stone)
          ========================================================================= */}
      {/* Left Building Facade Wing */}
      <mesh position={[-6.2, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.0, 5.0, 0.4]} />
        <meshStandardMaterial color="#17241d" roughness={0.75} />
      </mesh>

      {/* Right Building Facade Wing */}
      <mesh position={[6.2, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.0, 5.0, 0.4]} />
        <meshStandardMaterial color="#17241d" roughness={0.75} />
      </mesh>

      {/* Top Roof Parapet & Cornice along entire facade width */}
      <group position={[0, 5.0, 0.1]}>
        <mesh castShadow>
          <boxGeometry args={[20.5, 0.35, 0.6]} />
          <meshStandardMaterial color="#121815" roughness={0.8} />
        </mesh>
        {/* Brass Cornice Trim */}
        <mesh position={[0, -0.15, 0.28]}>
          <boxGeometry args={[20.6, 0.05, 0.08]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* =========================================================================
          LEFT ARCHED FACADE DISPLAY WINDOW (x = -4.5, y = 2.0)
          ========================================================================= */}
      <group position={[-4.5, 2.0, 0.15]}>
        {/* Bronze Arched Outer Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 2.8, 0.1]} />
          <meshStandardMaterial color="#1b140f" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Window Glass Pane */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshPhysicalMaterial
            color="#eaf3fa"
            transparent
            opacity={0.35}
            roughness={0.08}
            transmission={0.85}
            thickness={0.12}
            reflectivity={0.65}
          />
        </mesh>
        {/* Window Grilles */}
        {[-0.6, 0.6].map((xOffset, i) => (
          <mesh key={`l-mullion-${i}`} position={[xOffset, 0, 0.05]}>
            <boxGeometry args={[0.04, 2.5, 0.04]} />
            <meshStandardMaterial color="#221812" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {[-0.5, 0.5].map((yOffset, i) => (
          <mesh key={`l-transom-${i}`} position={[0, yOffset, 0.05]}>
            <boxGeometry args={[2.5, 0.04, 0.04]} />
            <meshStandardMaterial color="#221812" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Warm Interior Light Spilling out through Left Window */}
        <pointLight position={[0, 0, -0.6]} color="#ffbb66" intensity={2.0} distance={5.5} decay={2} />
        {/* Forest Green Awning Above Window */}
        <group position={[0, 1.55, 0.4]}>
          <mesh castShadow rotation={[0.4, 0, 0]}>
            <boxGeometry args={[3.0, 0.06, 0.8]} />
            <meshStandardMaterial color="#13241b" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.15, 0.35]}>
            <boxGeometry args={[3.02, 0.02, 0.04]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
        {/* Potted Bay Laurel Topiaries flanking window */}
        {[-1.6, 1.6].map((xPlant, idx) => (
          <group key={`l-topiary-${idx}`} position={[xPlant, -1.5, 0.4]}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.15, 0.5, 16]} />
              <meshStandardMaterial color="#2a1f18" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <sphereGeometry args={[0.28, 12, 12]} />
              <meshStandardMaterial color="#1a3525" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          RIGHT ARCHED FACADE DISPLAY WINDOW (x = +4.5, y = 2.0)
          ========================================================================= */}
      <group position={[4.5, 2.0, 0.15]}>
        <mesh castShadow>
          <boxGeometry args={[2.8, 2.8, 0.1]} />
          <meshStandardMaterial color="#1b140f" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshPhysicalMaterial
            color="#eaf3fa"
            transparent
            opacity={0.35}
            roughness={0.08}
            transmission={0.85}
            thickness={0.12}
            reflectivity={0.65}
          />
        </mesh>
        {[-0.6, 0.6].map((xOffset, i) => (
          <mesh key={`r-mullion-${i}`} position={[xOffset, 0, 0.05]}>
            <boxGeometry args={[0.04, 2.5, 0.04]} />
            <meshStandardMaterial color="#221812" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {[-0.5, 0.5].map((yOffset, i) => (
          <mesh key={`r-transom-${i}`} position={[0, yOffset, 0.05]}>
            <boxGeometry args={[2.5, 0.04, 0.04]} />
            <meshStandardMaterial color="#221812" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Warm Interior Light Spilling out through Right Window */}
        <pointLight position={[0, 0, -0.6]} color="#ffbb66" intensity={2.0} distance={5.5} decay={2} />
        {/* Awning Above Window */}
        <group position={[0, 1.55, 0.4]}>
          <mesh castShadow rotation={[0.4, 0, 0]}>
            <boxGeometry args={[3.0, 0.06, 0.8]} />
            <meshStandardMaterial color="#13241b" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.15, 0.35]}>
            <boxGeometry args={[3.02, 0.02, 0.04]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
        {/* Potted Bay Laurel Topiaries */}
        {[-1.6, 1.6].map((xPlant, idx) => (
          <group key={`r-topiary-${idx}`} position={[xPlant, -1.5, 0.4]}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.15, 0.5, 16]} />
              <meshStandardMaterial color="#2a1f18" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <sphereGeometry args={[0.28, 12, 12]} />
              <meshStandardMaterial color="#1a3525" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          CENTRAL ENTRANCE PORTAL & FRAMING (x = 0)
          ========================================================================= */}
      {/* Top Lintol / Architrave */}
      <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Left Pillar */}
      <mesh position={[-2.0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 3.0, 0.4]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[2.0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 3.0, 0.4]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Transom Glass Panel Above Doors */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[3.5, 0.6, 0.05]} />
        <meshPhysicalMaterial
          color="#dbe4eb"
          transparent
          opacity={0.35}
          roughness={0.1}
          transmission={0.8}
          thickness={0.2}
          reflectivity={0.6}
        />
      </mesh>

      {/* Entrance Canopy */}
      <mesh position={[0, 3.8, 0.6]} castShadow>
        <boxGeometry args={[4.8, 0.15, 1.4]} />
        <meshStandardMaterial color="#140f0c" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Brass Edge Trim on Canopy */}
      <mesh position={[0, 3.8, 1.32]}>
        <boxGeometry args={[4.82, 0.16, 0.04]} />
        <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Refined Architectural Brand Signboard */}
      <group position={[0, 3.4, 0.22]}>
        {/* Ebonized Timber Backing Panel */}
        <mesh>
          <boxGeometry args={[3.2, 0.46, 0.08]} />
          <meshStandardMaterial color="#130e0b" roughness={0.85} />
        </mesh>
        {/* Antique Brass Perimeter Frame */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[3.24, 0.5, 0.02]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Subtle Halo Brass Letters Plate */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.7, 0.26]} />
          <meshStandardMaterial
            color="#dfb15b"
            emissive="#c58b4b"
            emissiveIntensity={0.08}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Soft Canopy Downlight */}
      <pointLight
        position={[0, 3.5, 0.7]}
        color="#ffcc88"
        intensity={0.75}
        distance={4.5}
        decay={2}
        castShadow
      />

      {/* Left Lantern Sconce */}
      <group position={[-1.9, 2.3, 0.22]}>
        <mesh>
          <boxGeometry args={[0.16, 0.32, 0.16]} />
          <meshStandardMaterial color="#1b120c" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.12, 0.26, 0.12]} />
          <meshStandardMaterial
            color="#ffdd99"
            emissive="#ffaa44"
            emissiveIntensity={1.0}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#ffbb66" intensity={1.2} distance={3.2} decay={2} />
      </group>

      {/* Right Lantern Sconce */}
      <group position={[1.9, 2.3, 0.22]}>
        <mesh>
          <boxGeometry args={[0.16, 0.32, 0.16]} />
          <meshStandardMaterial color="#1b120c" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.12, 0.26, 0.12]} />
          <meshStandardMaterial
            color="#ffdd99"
            emissive="#ffaa44"
            emissiveIntensity={1.0}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#ffbb66" intensity={1.2} distance={3.2} decay={2} />
      </group>

      {/* Left Door (Hinged at x = -1.75) */}
      <group position={[-1.75, 1.2, 0]} ref={leftDoorRef}>
        <group position={[0.875, 0, 0]}>
          {/* Glass Pane */}
          <mesh castShadow>
            <boxGeometry args={[1.7, 2.36, 0.04]} />
            <meshPhysicalMaterial
              color="#eaf3fa"
              transparent
              opacity={0.38}
              roughness={0.08}
              transmission={0.85}
              thickness={0.15}
              reflectivity={0.7}
            />
          </mesh>

          {/* Door Bronze Outer Frame */}
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[1.74, 0.1, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.05, 0]}>
            <boxGeometry args={[1.74, 0.3, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[-0.84, 0, 0]}>
            <boxGeometry args={[0.08, 2.4, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.84, 0, 0]}>
            <boxGeometry args={[0.08, 2.4, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Brass Vertical Handle */}
          <mesh position={[0.72, 0, 0.06]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0.72, 0, -0.06]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* Right Door (Hinged at x = +1.75) */}
      <group position={[1.75, 1.2, 0]} ref={rightDoorRef}>
        <group position={[-0.875, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.7, 2.36, 0.04]} />
            <meshPhysicalMaterial
              color="#eaf3fa"
              transparent
              opacity={0.38}
              roughness={0.08}
              transmission={0.85}
              thickness={0.15}
              reflectivity={0.7}
            />
          </mesh>

          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[1.74, 0.1, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.05, 0]}>
            <boxGeometry args={[1.74, 0.3, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[-0.84, 0, 0]}>
            <boxGeometry args={[0.08, 2.4, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.84, 0, 0]}>
            <boxGeometry args={[0.08, 2.4, 0.07]} />
            <meshStandardMaterial color="#221812" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Brass Vertical Handle */}
          <mesh position={[-0.72, 0, 0.06]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[-0.72, 0, -0.06]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* Threshold Step / Granite Curb */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.06, 0.6]} />
        <meshStandardMaterial color="#28221d" roughness={0.8} />
      </mesh>

      {/* Welcome Inlay Mat */}
      <group position={[0, 0.035, 1.0]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.0, 0.01, 1.2]} />
          <meshStandardMaterial color="#1a120c" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.006, 0]}>
          <boxGeometry args={[2.06, 0.005, 1.26]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Exterior Street Pavement (outside entrance, z > 0 with subtle rain sheen) */}
      <mesh position={[0, 0, 5.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 11]} />
        <meshStandardMaterial
          color="#161210"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Street Gas Lantern on Sidewalk Curb (Right side) */}
      <group position={[3.2, 0, 3.2]}>
        {/* Cast iron black post */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 2.8, 12]} />
          <meshStandardMaterial color="#1a1816" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Lamp lantern housing */}
        <mesh position={[0, 2.9, 0]}>
          <cylinderGeometry args={[0.16, 0.1, 0.35, 8]} />
          <meshStandardMaterial color="#221a14" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Glowing gas mantle */}
        <mesh position={[0, 2.9, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#fff0b3" emissive="#ffaa33" emissiveIntensity={2.5} />
        </mesh>
        <pointLight position={[0, 2.9, 0]} color="#ffbb66" intensity={1.8} distance={4.5} decay={2} />
      </group>
    </group>
  );
};
