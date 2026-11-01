import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const BhetkiPaturi3D: React.FC = () => {
  const steamGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamGroup.current) {
      steamGroup.current.children.forEach((particle, idx) => {
        particle.position.y += 0.003;
        particle.position.x += Math.sin(state.clock.elapsedTime * 2 + idx) * 0.0008;
        if (particle.position.y > 0.8) {
          particle.position.y = 0.15;
        }
      });
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 1. Dark Handcrafted Slate Stoneware Platter */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.25, 0.06, 48]} />
        <meshStandardMaterial
          color="#181512"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Rim Bevel */}
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.03, 16, 48]} />
        <meshStandardMaterial color="#221e1a" roughness={0.7} />
      </mesh>

      {/* 2. Charred Wood-Fired Banana Leaf Envelope Parcel */}
      <group position={[0, 0.08, 0]} rotation={[0, 0.15, 0]}>
        {/* Main Leaf Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.14, 0.65]} />
          <meshStandardMaterial
            color="#27462a"
            roughness={0.45}
            metalness={0.08}
          />
        </mesh>

        {/* Charred wood-fire grill lines */}
        {[-0.35, -0.12, 0.12, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0.075, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.04, 0.005, 0.64]} />
            <meshStandardMaterial color="#0c120c" roughness={0.9} />
          </mesh>
        ))}

        {/* Natural Hemp Twine Bindings */}
        {[-0.22, 0.22].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 0.076, 0]}>
              <boxGeometry args={[0.03, 0.012, 0.67]} />
              <meshStandardMaterial color="#a89270" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.33]}>
              <boxGeometry args={[0.03, 0.15, 0.015]} />
              <meshStandardMaterial color="#a89270" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, -0.33]}>
              <boxGeometry args={[0.03, 0.15, 0.015]} />
              <meshStandardMaterial color="#a89270" roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Twine Knot */}
        <mesh position={[-0.22, 0.09, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#8e7855" roughness={0.95} />
        </mesh>

        {/* Slit Fresh Green Chili Garnish */}
        <group position={[0.05, 0.09, 0]} rotation={[0, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.01, 0.45, 16]} />
            <meshStandardMaterial color="#2d7e32" roughness={0.25} />
          </mesh>
          {/* Chili Stem */}
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.008, 0.01, 0.06, 8]} />
            <meshStandardMaterial color="#1a4d1e" roughness={0.8} />
          </mesh>
        </group>

        {/* Mustard Oil & Turmeric Emulsion Droplets */}
        {[
          [0.6, 0.035, 0.3],
          [-0.65, 0.035, -0.2],
          [0.45, 0.035, -0.4],
          [-0.4, 0.035, 0.4],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]} scale={[1, 0.25, 1]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#d4a017" roughness={0.15} metalness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 3. Rising Warm Aromatics & Steam Particles */}
      <group ref={steamGroup}>
        {[
          [-0.1, 0.25, 0],
          [0.12, 0.35, 0.05],
          [0.0, 0.45, -0.05],
          [-0.08, 0.55, 0.08],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.035 + i * 0.015, 10, 10]} />
            <meshBasicMaterial
              color="#e8dec8"
              transparent
              opacity={0.25 - i * 0.04}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
