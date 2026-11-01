import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DaabChingri3D: React.FC = () => {
  const steamGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamGroup.current) {
      steamGroup.current.children.forEach((particle, idx) => {
        particle.position.y += 0.003;
        particle.position.x += Math.sin(state.clock.elapsedTime * 2.0 + idx) * 0.0008;
        if (particle.position.y > 0.85) {
          particle.position.y = 0.35;
        }
      });
    }
  });

  return (
    <group position={[0, -0.18, 0]}>
      {/* 1. Dark Hand-Thrown Clay Underplate */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.25, 1.15, 0.05, 48]} />
        <meshStandardMaterial color="#1a140f" roughness={0.88} metalness={0.08} />
      </mesh>

      {/* 2. Tender Green Coconut (Daab) Vessel */}
      <group position={[0, 0.05, 0]}>
        {/* Main Coconut Base (Hemisphere open at top) */}
        <mesh castShadow receiveShadow position={[0, 0.32, 0]} scale={[1, 0.9, 1]}>
          <cylinderGeometry args={[0.55, 0.35, 0.6, 36, 1, true]} />
          <meshStandardMaterial
            color="#466e28" // Fresh tropical green husk
            roughness={0.58}
            metalness={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Coconut Rounded Base Floor */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 36]} />
          <meshStandardMaterial color="#35541e" roughness={0.7} />
        </mesh>

        {/* Coconut Husk Texture Ribs */}
        {[0, Math.PI * 0.33, Math.PI * 0.66, Math.PI, Math.PI * 1.33, Math.PI * 1.66].map((rot, idx) => (
          <mesh key={`rib-${idx}`} position={[0, 0.32, 0]} rotation={[0, rot, 0]}>
            <boxGeometry args={[0.03, 0.58, 0.56]} />
            <meshStandardMaterial color="#38581e" roughness={0.7} />
          </mesh>
        ))}

        {/* Cut Coconut Rim (Tender White Flesh Inner Lining) */}
        <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.54, 0.04, 16, 40]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Inner Coconut Flesh Layer */}
        <mesh position={[0, 0.61, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.54, 36]} />
          <meshStandardMaterial color="#f5f2e9" roughness={0.35} />
        </mesh>

        {/* 3. Golden Mustard & Coconut Milk Gravy Filling */}
        <mesh position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.44, 36]} />
          <meshStandardMaterial
            color="#d89e24" // Turmeric-infused rich yellow coconut mustard gravy
            roughness={0.22}
            metalness={0.18}
          />
        </mesh>

        {/* 4. Giant Bay of Bengal Tiger Prawns (Chingri) with arched tails poking out */}
        {/* Prawn 1 */}
        <group position={[0.15, 0.68, 0.08]} rotation={[0.4, 0.2, 0.3]}>
          <mesh castShadow>
            <torusGeometry args={[0.2, 0.05, 16, 24, Math.PI * 0.9]} />
            <meshStandardMaterial
              color="#e05828" // Cooked vibrant orange coral tiger prawn
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
          {/* Prawn Tail Fan */}
          <mesh position={[0.18, 0.07, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.08, 0.015, 0.09]} />
            <meshStandardMaterial color="#c03e14" roughness={0.4} />
          </mesh>
        </group>

        {/* Prawn 2 */}
        <group position={[-0.16, 0.66, -0.08]} rotation={[-0.3, -0.6, -0.2]}>
          <mesh castShadow>
            <torusGeometry args={[0.18, 0.045, 16, 24, Math.PI * 0.85]} />
            <meshStandardMaterial color="#e86230" roughness={0.35} metalness={0.12} />
          </mesh>
          {/* Prawn Tail Fan */}
          <mesh position={[-0.16, 0.06, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.07, 0.015, 0.08]} />
            <meshStandardMaterial color="#c03e14" roughness={0.4} />
          </mesh>
        </group>

        {/* 5. Slit Green Bengal Chilies & Mustard Seeds Garnish */}
        <group position={[0.02, 0.62, -0.16]} rotation={[0.1, 0.8, -0.1]}>
          <mesh>
            <cylinderGeometry args={[0.018, 0.008, 0.38, 12]} />
            <meshStandardMaterial color="#2d8534" roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.006, 0.008, 0.05, 8]} />
            <meshStandardMaterial color="#1a5220" roughness={0.8} />
          </mesh>
        </group>

        {/* Shorshe (Black mustard seeds) floating */}
        {[
          [0.08, 0.59, 0.18],
          [-0.12, 0.59, 0.12],
          [0.18, 0.59, -0.08],
          [-0.05, 0.59, -0.22],
        ].map(([x, y, z], idx) => (
          <mesh key={`seed-${idx}`} position={[x, y, z]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial color="#1f1810" roughness={0.8} />
          </mesh>
        ))}

        {/* Coconut Cap / Lid rested slightly to the side */}
        <group position={[0.62, 0.22, 0.3]} rotation={[0.5, 0.2, -0.7]}>
          <mesh castShadow>
            <sphereGeometry args={[0.36, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
            <meshStandardMaterial color="#466e28" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.035, 0.05, 0.12, 12]} />
            <meshStandardMaterial color="#2e4a16" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* 6. Rising Coconut Steam */}
      <group ref={steamGroup}>
        {[
          [0.0, 0.68, 0.0],
          [-0.08, 0.76, 0.05],
          [0.09, 0.84, -0.05],
          [-0.05, 0.92, -0.06],
        ].map(([x, y, z], idx) => (
          <mesh key={`steam-${idx}`} position={[x, y, z]}>
            <sphereGeometry args={[0.038 + idx * 0.01, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.2 - idx * 0.03}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
