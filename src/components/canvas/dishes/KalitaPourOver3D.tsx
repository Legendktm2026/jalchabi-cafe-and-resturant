import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const KalitaPourOver3D: React.FC = () => {
  const steamGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamGroup.current) {
      steamGroup.current.children.forEach((particle, idx) => {
        particle.position.y += 0.0035;
        particle.position.x += Math.sin(state.clock.elapsedTime * 2.5 + idx) * 0.0006;
        if (particle.position.y > 0.95) {
          particle.position.y = 0.55;
        }
      });
    }
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* 1. American Walnut Artisan Brew Plinth */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.08, 1.3]} />
        <meshStandardMaterial color="#221812" roughness={0.7} />
      </mesh>

      {/* Raw Brass Drip Plate Inlay */}
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.015, 36]} />
        <meshStandardMaterial color="#c5994b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* 2. Glass Decanter Server Carafe */}
      <group position={[0, 0.06, 0]}>
        {/* Lower Glass Chamber */}
        <mesh castShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.42, 0.52, 0.38, 32]} />
          <meshStandardMaterial
            color="#e6f2f2"
            transparent
            opacity={0.38}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Freshly Extracted Single-Origin Coffee Inside Carafe */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.4, 0.49, 0.22, 32]} />
          <meshStandardMaterial
            color="#1e1109" // Rich amber dark roast
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>

        {/* Glass Carafe Neck */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.32, 0.42, 0.12, 32]} />
          <meshStandardMaterial
            color="#e6f2f2"
            transparent
            opacity={0.38}
            roughness={0.1}
          />
        </mesh>

        {/* 3. Kalita Wave 155 Rippled Glass Dripper */}
        <group position={[0, 0.56, 0]}>
          {/* Glass Cone Funnel */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.48, 0.22, 0.28, 32, 1, true]} />
            <meshStandardMaterial
              color="#d9ecec"
              transparent
              opacity={0.45}
              roughness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Pleated Wave Paper Filter */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.46, 0.24, 0.26, 24, 1, true]} />
            <meshStandardMaterial
              color="#f8f4eb"
              roughness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Blooming Coffee Bed with Crema Bubbles */}
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.38, 0.26, 0.08, 24]} />
            <meshStandardMaterial color="#2a170c" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 4. Hammered Copper Gooseneck Kettle (Resting alongside) */}
      <group position={[0.7, 0.05, 0.15]} rotation={[0, -0.6, 0]}>
        {/* Kettle Base Body */}
        <mesh castShadow position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.32, 0.38, 0.45, 32]} />
          <meshStandardMaterial
            color="#bd5d32" // Hammered copper
            metalness={0.88}
            roughness={0.28}
          />
        </mesh>

        {/* Kettle Lid */}
        <mesh position={[0, 0.51, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 0.06, 32]} />
          <meshStandardMaterial color="#b2532a" metalness={0.88} roughness={0.3} />
        </mesh>

        {/* Walnut Lid Knob */}
        <mesh position={[0, 0.57, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#2d1d14" roughness={0.8} />
        </mesh>

        {/* Gooseneck Spout */}
        <mesh position={[-0.32, 0.32, 0]} rotation={[0, 0, -0.45]}>
          <cylinderGeometry args={[0.022, 0.038, 0.42, 16]} />
          <meshStandardMaterial color="#bd5d32" metalness={0.88} roughness={0.28} />
        </mesh>
      </group>

      {/* 5. Aromatic Bloom Steam Vapor */}
      <group ref={steamGroup}>
        {[
          [0.0, 0.72, 0.0],
          [-0.04, 0.82, 0.02],
          [0.05, 0.9, -0.03],
          [0.02, 1.0, 0.04],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03 + i * 0.012, 10, 10]} />
            <meshBasicMaterial
              color="#f5e6d3"
              transparent
              opacity={0.28 - i * 0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
