import React from 'react';

export const MishtiDoiBhar3D: React.FC = () => {
  return (
    <group position={[0, -0.15, 0]}>
      {/* 1. Terracotta Saucer Plate */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.1, 0.05, 48]} />
        <meshStandardMaterial
          color="#9c482c"
          roughness={0.92}
          metalness={0.04}
        />
      </mesh>

      {/* Saucer Rim Ring */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.025, 12, 48]} />
        <meshStandardMaterial color="#84391e" roughness={0.95} />
      </mesh>

      {/* 2. Traditional Kolkata Hand-Turned Terracotta Bhar (Matka) */}
      <group position={[0, 0.04, 0]}>
        {/* Pot Base */}
        <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.52, 0.38, 0.22, 36]} />
          <meshStandardMaterial color="#9c482c" roughness={0.92} />
        </mesh>

        {/* Pot Bellied Midsection */}
        <mesh castShadow receiveShadow position={[0, 0.28, 0]} scale={[1, 0.55, 1]}>
          <sphereGeometry args={[0.58, 36, 18]} />
          <meshStandardMaterial color="#a85233" roughness={0.92} />
        </mesh>

        {/* Flared Terracotta Lip */}
        <mesh castShadow position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.56, 0.5, 0.12, 36]} />
          <meshStandardMaterial color="#8a3c20" roughness={0.92} />
        </mesh>

        {/* Earthen Lip Rim */}
        <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.03, 16, 36]} />
          <meshStandardMaterial color="#7c3319" roughness={0.94} />
        </mesh>

        {/* 3. Baked Nolen Gur Mishti Doi Filling */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.5, 0.48, 0.03, 36]} />
          <meshStandardMaterial
            color="#8a4d29" // Rich date-palm jaggery caramelized tone
            roughness={0.3}
            metalness={0.12}
          />
        </mesh>

        {/* Caramelized Golden-Brown Surface Skin */}
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.49, 36]} />
          <meshStandardMaterial
            color="#7a3f1d"
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>

        {/* 4. Roasted Green Pistachio Slivers & Saffron Garnish */}
        {[
          [-0.15, 0.51, 0.1],
          [0.18, 0.51, -0.12],
          [0.08, 0.51, 0.22],
          [-0.2, 0.51, -0.15],
          [0.22, 0.51, 0.12],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]} rotation={[0.2, idx * 1.2, 0.1]}>
            <boxGeometry args={[0.07, 0.02, 0.03]} />
            <meshStandardMaterial color="#55883b" roughness={0.6} />
          </mesh>
        ))}

        {/* Saffron Strands */}
        {[
          [0.0, 0.515, -0.05],
          [-0.08, 0.515, 0.08],
          [0.12, 0.515, 0.02],
        ].map(([x, y, z], idx) => (
          <mesh key={`saffron-${idx}`} position={[x, y, z]} rotation={[0, idx * 2.1, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
            <meshStandardMaterial color="#c23b16" roughness={0.4} />
          </mesh>
        ))}

        {/* 5. Shimmering 24K Edible Gold Leaf Flakes */}
        {[
          [-0.06, 0.518, 0.02],
          [0.08, 0.518, -0.08],
        ].map(([x, y, z], idx) => (
          <mesh key={`gold-${idx}`} position={[x, y, z]} rotation={[-Math.PI / 2, 0, idx]}>
            <circleGeometry args={[0.045, 8]} />
            <meshStandardMaterial
              color="#e8b948"
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
