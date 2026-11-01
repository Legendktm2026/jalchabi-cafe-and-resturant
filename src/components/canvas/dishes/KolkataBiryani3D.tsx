import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const KolkataBiryani3D: React.FC = () => {
  const steamGroup = useRef<THREE.Group>(null);

  // Animated rising fragrant biryani steam particles
  useFrame((state) => {
    if (steamGroup.current) {
      steamGroup.current.children.forEach((particle, idx) => {
        particle.position.y += 0.0035;
        particle.position.x += Math.sin(state.clock.elapsedTime * 2.2 + idx) * 0.0009;
        particle.position.z += Math.cos(state.clock.elapsedTime * 1.8 + idx) * 0.0007;
        if (particle.position.y > 0.85) {
          particle.position.y = 0.28;
        }
      });
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. Heritage Kolkata Royal Brass Platter (Kansa/Pitol Thali) */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.28, 1.18, 0.05, 64]} />
        <meshStandardMaterial
          color="#d4af37" // Royal Bengal Brass/Bronze tone
          roughness={0.28}
          metalness={0.82}
        />
      </mesh>

      {/* Decorative Beveled Brass Rim */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.24, 0.025, 16, 64]} />
        <meshStandardMaterial color="#c59b27" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Inner Decorative Brass Ring */}
      <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.94, 0.015, 12, 48]} />
        <meshStandardMaterial color="#b88a1e" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 2. Fragrant Long-Grain Basmati Rice Mound (Golden Saffron & Pearl White) */}
      <group position={[0, 0.025, 0]}>
        {/* Main Base Rice Mound */}
        <mesh castShadow receiveShadow position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.86, 1.05, 0.14, 48]} />
          <meshStandardMaterial
            color="#fffcf2" // Pearl white aged basmati
            roughness={0.82}
            metalness={0.04}
          />
        </mesh>

        {/* Top Saffron Dum Rice Layer with Meetha Attar yellow tone */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.78, 0.86, 0.05, 48]} />
          <meshStandardMaterial
            color="#f7c244" // Golden saffron zafran hue
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>

        {/* Scattered individual long basmati grain meshes */}
        {[
          [0.2, 0.18, 0.1],
          [-0.25, 0.18, -0.15],
          [0.35, 0.17, -0.2],
          [-0.32, 0.17, 0.25],
          [0.05, 0.19, -0.22],
          [-0.1, 0.19, 0.2],
          [0.15, 0.18, 0.35],
          [-0.28, 0.17, -0.3],
        ].map(([x, y, z], idx) => (
          <mesh key={`rice-${idx}`} position={[x, y, z]} rotation={[0.4, idx * 1.1, 0.2]}>
            <capsuleGeometry args={[0.012, 0.055, 4, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        ))}

        {/* 3. The Iconic Kolkata Golden Aloo (Slow-braised with saffron and broth) */}
        <group position={[0.32, 0.24, 0.15]} rotation={[0.2, 0.4, -0.1]} scale={[1.15, 0.95, 1.05]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.22, 32, 24]} />
            <meshStandardMaterial
              color="#e69c24" // Rich golden turmeric-potato hue
              roughness={0.38}
              metalness={0.14}
            />
          </mesh>
          {/* Roasted caramelized crust patch */}
          <mesh position={[0.06, 0.09, 0.04]}>
            <sphereGeometry args={[0.1, 16, 12]} />
            <meshStandardMaterial color="#b86910" roughness={0.6} />
          </mesh>
        </group>

        {/* 4. The Signature Royal Kolkata Boiled Egg (Cut in Half showing creamy yolk) */}
        <group position={[-0.3, 0.22, -0.12]} rotation={[-0.35, 0.6, 0.25]}>
          {/* White Albumen Dome */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.18, 32, 24]} />
            <meshStandardMaterial color="#fdfbf7" roughness={0.28} />
          </mesh>
          {/* Flat Cut Surface */}
          <mesh position={[0, 0.088, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.165, 32]} />
            <meshStandardMaterial color="#f7f5ed" roughness={0.25} />
          </mesh>
          {/* Creamy Golden Yolk */}
          <mesh position={[0, 0.092, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.095, 32]} />
            <meshStandardMaterial color="#f39c12" roughness={0.35} metalness={0.06} />
          </mesh>
        </group>

        {/* 5. Succulent Slow-Braised Mutton Shank Piece with Bone */}
        <group position={[-0.05, 0.23, 0.28]} rotation={[0.1, -0.4, 0.2]}>
          {/* Tender Meat Cut */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.35, 0.16, 0.22]} />
            <meshStandardMaterial
              color="#4a220d" // Deep caramelized slow-braised glaze
              roughness={0.42}
              metalness={0.22}
            />
          </mesh>
          {/* Bone tip poking out */}
          <mesh position={[-0.2, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.042, 0.14, 16]} />
            <meshStandardMaterial color="#eae4d7" roughness={0.35} />
          </mesh>
        </group>

        {/* 6. Crispy Deep-Fried Caramelized Onion (Beresta) ribbons */}
        {[
          [0.0, 0.21, 0.0],
          [0.15, 0.2, -0.12],
          [-0.12, 0.2, 0.1],
          [0.12, 0.19, 0.3],
          [-0.22, 0.19, -0.05],
          [0.28, 0.18, 0.05],
        ].map(([x, y, z], idx) => (
          <mesh key={`beresta-${idx}`} position={[x, y, z]} rotation={[0.3, idx * 1.4, 0.2]}>
            <boxGeometry args={[0.09, 0.008, 0.02]} />
            <meshStandardMaterial color="#3b1706" roughness={0.55} />
          </mesh>
        ))}

        {/* 7. Whole Indian Spices (Tejpatta / Bay Leaf & Cinnamon Stick) */}
        {/* Bay Leaf (Tejpatta) */}
        <mesh position={[-0.05, 0.2, -0.22]} rotation={[0.25, 0.6, -0.15]}>
          <boxGeometry args={[0.26, 0.006, 0.12]} />
          <meshStandardMaterial color="#554425" roughness={0.7} />
        </mesh>
        {/* Cinnamon Stick (Dalchini) */}
        <mesh position={[0.22, 0.2, -0.15]} rotation={[0.1, 0.8, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, 0.25, 12]} />
          <meshStandardMaterial color="#5c3818" roughness={0.8} />
        </mesh>

        {/* Fresh Green Mint Leaf Garnish */}
        <mesh position={[0.02, 0.24, 0.05]} rotation={[-0.2, 0.5, 0.1]}>
          <boxGeometry args={[0.08, 0.006, 0.05]} />
          <meshStandardMaterial color="#2d7e32" roughness={0.3} />
        </mesh>
      </group>

      {/* 8. Rising Volumetric Aromatic Steam Particles */}
      <group ref={steamGroup}>
        {[
          [0.0, 0.28, 0.0],
          [-0.1, 0.38, 0.08],
          [0.12, 0.46, -0.06],
          [-0.06, 0.54, -0.08],
          [0.08, 0.62, 0.1],
          [0.02, 0.72, 0.02],
        ].map(([x, y, z], idx) => (
          <mesh key={`steam-${idx}`} position={[x, y, z]}>
            <sphereGeometry args={[0.04 + idx * 0.012, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.22 - idx * 0.025}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
