import React from 'react';

export const BrewBarCounter: React.FC = () => {
  return (
    <group position={[-2.4, 0, -2.0]}>
      {/* =========================================================================
          MAIN BREW BAR COUNTER UNIT (L-shape / long rectangular counter)
          ========================================================================= */}
      {/* Counter Base (Walnut Body) */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.1, 4.4]} />
        <meshStandardMaterial color="#241911" roughness={0.7} />
      </mesh>

      {/* Fluted Vertical Walnut Slat Facing (Facing the customer side, +X face) */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={`flute-${i}`} position={[0.76, 0.55, -2.0 + i * 0.15]} castShadow>
          <boxGeometry args={[0.03, 1.05, 0.08]} />
          <meshStandardMaterial color="#2a1e16" roughness={0.6} />
        </mesh>
      ))}

      {/* Polished Marble / Cream Terrazzo Countertop with Beveled Brass Edge */}
      <group position={[0, 1.12, 0]}>
        {/* Stone Top */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.65, 0.08, 4.55]} />
          <meshStandardMaterial color="#e8dfd3" roughness={0.25} metalness={0.08} />
        </mesh>
        {/* Brass Bullnose Edge Trim */}
        <mesh position={[0.83, 0, 0]}>
          <boxGeometry args={[0.02, 0.09, 4.56]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.88} roughness={0.22} />
        </mesh>
      </group>

      {/* Brushed Antique Brass Footrail */}
      <group position={[0.92, 0.16, 0]}>
        {/* Rail tube */}
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.025, 4.3, 16]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Stanchion floor brackets */}
        {[-1.8, -0.6, 0.6, 1.8].map((zPos, i) => (
          <group key={`stanchion-${i}`} position={[0, 0, zPos]}>
            <mesh position={[-0.08, -0.06, 0]}>
              <boxGeometry args={[0.16, 0.03, 0.06]} />
              <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Undercounter Warm LED Kickplate Glow */}
      <pointLight position={[0.85, 0.1, 0]} color="#ffb766" intensity={1.2} distance={2.5} decay={2} />

      {/* =========================================================================
          ESPRESSO MACHINE (Custom Antique Brass & Chrome Dual Group)
          ========================================================================= */}
      <group position={[0.1, 1.16, -0.8]} castShadow>
        {/* Machine Main Body Housing */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.65, 0.42, 0.85]} />
          <meshStandardMaterial color="#1a1410" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Brass Side Panels and Top Trim */}
        <mesh position={[0.33, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.43, 0.86]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[-0.33, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.43, 0.86]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Cup Warming Top Rail */}
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.8]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Stacked Ceramic Demitasse Cups on Top */}
        {[-0.2, 0, 0.2].map((zCup, idx) => (
          <mesh key={`topcup-${idx}`} position={[0.1, 0.54, zCup]}>
            <cylinderGeometry args={[0.04, 0.03, 0.06, 12]} />
            <meshStandardMaterial color="#f0e9df" roughness={0.4} />
          </mesh>
        ))}

        {/* Twin Groupheads (Facing customer / front) */}
        {[-0.18, 0.18].map((zGroup, idx) => (
          <group key={`group-${idx}`} position={[0.35, 0.22, zGroup]}>
            {/* Grouphead Collar */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
              <meshStandardMaterial color="#e0e0e0" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Portafilter Handle (Angled walnut handle) */}
            <mesh position={[0.15, -0.04, 0.08]} rotation={[0, 0.35, -0.15]}>
              <cylinderGeometry args={[0.015, 0.018, 0.18, 12]} />
              <meshStandardMaterial color="#3b2619" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Steam Wands (Twin articulated brass wands) */}
        <mesh position={[0.34, 0.18, 0.38]} rotation={[0.4, 0, 0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 12]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.34, 0.18, -0.38]} rotation={[-0.4, 0, 0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 12]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Circular Pressure Gauge with glowing amber needle */}
        <mesh position={[0.33, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          <meshStandardMaterial color="#f7f2ea" roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          TWIN ON-DEMAND COFFEE GRINDERS
          ========================================================================= */}
      <group position={[0.1, 1.16, -1.6]}>
        {/* Grinder Base */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[0.24, 0.36, 0.24]} />
          <meshStandardMaterial color="#1a1410" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Conical Bean Hopper (Clear glass with dark roasted coffee beans inside) */}
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.12, 0.06, 0.24, 16]} />
          <meshPhysicalMaterial
            color="#2d1d12"
            transmission={0.65}
            opacity={0.75}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Hopper Lid */}
        <mesh position={[0, 0.57, 0]}>
          <cylinderGeometry args={[0.125, 0.125, 0.02, 16]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          POUR-OVER MANUAL DRIP STATION (Kalita Wave & Brass Stand)
          ========================================================================= */}
      <group position={[0.15, 1.16, 0.5]}>
        {/* Brass Stand Frame */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.18, 0.02, 0.55]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Twin Ceramic Drippers */}
        {[-0.15, 0.15].map((zDrip, i) => (
          <group key={`drip-${i}`} position={[0, 0.18, zDrip]}>
            {/* Ceramic Wave Dripper Cone */}
            <mesh>
              <cylinderGeometry args={[0.07, 0.025, 0.1, 16]} />
              <meshStandardMaterial color="#f7f3ed" roughness={0.3} />
            </mesh>
            {/* Glass Server Jug underneath */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.05, 0.06, 0.12, 16]} />
              <meshPhysicalMaterial
                color="#eaf3fa"
                transparent
                opacity={0.4}
                transmission={0.8}
                roughness={0.05}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Gooseneck Pour-Over Kettle (Matte Black with Walnut Handle) */}
      <group position={[0.2, 1.16, 1.1]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.18, 16]} />
          <meshStandardMaterial color="#1a1410" roughness={0.4} />
        </mesh>
        {/* Curved Gooseneck Spout */}
        <mesh position={[0.09, 0.12, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.008, 0.01, 0.18, 12]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          GLASS PASTRY VITRINE / DISPLAY CASE (Near customer side)
          ========================================================================= */}
      <group position={[0.05, 1.16, 1.7]}>
        {/* White Marble Presentation Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.9]} />
          <meshStandardMaterial color="#f0ece6" roughness={0.25} />
        </mesh>
        {/* Clear Glass Cloche / Display Cover */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.66, 0.28, 0.86]} />
          <meshPhysicalMaterial
            color="#dce7f0"
            transparent
            opacity={0.3}
            roughness={0.05}
            transmission={0.9}
            thickness={0.08}
          />
        </mesh>
        {/* Pastries: Golden Brioche & Croissants */}
        {[-0.22, 0, 0.22].map((zPastry, idx) => (
          <mesh key={`croissant-${idx}`} position={[0, 0.07, zPastry]} castShadow>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial color="#d4944b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          BACK-BAR SHELVING & CHALKBOARD (Mounted against left wall)
          ========================================================================= */}
      <group position={[-1.8, 1.8, 0]}>
        {/* Timber Wall Unit Frame */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.15, 2.2, 4.4]} />
          <meshStandardMaterial color="#1c130d" roughness={0.7} />
        </mesh>

        {/* 3 Floating Walnut Shelves with Brass Edge */}
        {[-0.2, 0.4, 1.0].map((yShelf, idx) => (
          <group key={`shelf-${idx}`} position={[0.12, yShelf, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.04, 4.2]} />
              <meshStandardMaterial color="#2c1f17" roughness={0.65} />
            </mesh>
            <mesh position={[0.15, 0, 0]}>
              <boxGeometry args={[0.01, 0.045, 4.2]} />
              <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Shelf Items: Amber Glass Bottles & Ceramic Cups */}
            {[-1.6, -1.0, -0.4, 0.4, 1.0, 1.6].map((zItem, i) => (
              <mesh key={`bottle-${idx}-${i}`} position={[0.05, 0.12, zItem]} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 0.2, 12]} />
                <meshPhysicalMaterial
                  color={i % 2 === 0 ? '#b56d2b' : '#33483b'}
                  transparent
                  opacity={0.85}
                  roughness={0.1}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Framed Chalkboard / Menu Slate (Center of back-bar) */}
        <group position={[0.1, 1.6, 0]}>
          {/* Slate Board */}
          <mesh>
            <boxGeometry args={[0.04, 0.9, 1.8]} />
            <meshStandardMaterial color="#17191a" roughness={0.9} />
          </mesh>
          {/* Brass Frame */}
          <mesh position={[0.01, 0, 0]}>
            <boxGeometry args={[0.05, 0.94, 1.84]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          WARM PENDANT DROP LIGHTS (Hanging directly above the counter)
          ========================================================================= */}
      {[-1.2, 0.2, 1.4].map((zLight, idx) => (
        <group key={`counter-pendant-${idx}`} position={[0.2, 2.7, zLight]}>
          {/* Braided Cord down from ceiling */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 1.0, 8]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          {/* Spun Brass Bell Shade */}
          <mesh position={[0, -0.05, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.16, 0.18, 20]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Glowing Edison Bulb */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color="#ffdd99"
              emissive="#ffaa33"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
          {/* Dedicated Amber Point Light illuminating the counter below */}
          <pointLight
            position={[0, -0.15, 0]}
            color="#ffbb66"
            intensity={2.8}
            distance={4.2}
            decay={2}
            castShadow
          />
        </group>
      ))}
    </group>
  );
};
