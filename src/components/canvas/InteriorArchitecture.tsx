import React from 'react';

export const InteriorArchitecture: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================================
          FLOOR: Herringbone Dark Walnut Parquet with warm specular response
          ========================================================================= */}
      {/* Main interior floor (from z = 4.0 front door to z = -7.0 back wall) */}
      <mesh position={[0, -0.01, -1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11.5, 11.5]} />
        <meshStandardMaterial
          color="#1e1510"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Decorative Brass Inlay Strip separating entrance threshold from main parquet */}
      <mesh position={[0, 0.005, 3.2]}>
        <boxGeometry args={[10.5, 0.01, 0.04]} />
        <meshStandardMaterial color="#c58b4b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* =========================================================================
          CEILING & EXPOSED ARCHITECTURAL TIMBER BEAMS
          ========================================================================= */}
      {/* Ceiling Plaster Plane */}
      <mesh position={[0, 4.0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.5, 11.5]} />
        <meshStandardMaterial color="#14100d" roughness={0.9} />
      </mesh>

      {/* Transverse Heavy Timber Beams */}
      {[-5.0, -2.8, -0.6, 1.6, 3.8].map((zPos, idx) => (
        <group key={`beam-${idx}`} position={[0, 3.85, zPos]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[11.4, 0.3, 0.28]} />
            <meshStandardMaterial color="#211710" roughness={0.75} />
          </mesh>
          {/* Subtle Brass Bracket on each beam end */}
          <mesh position={[-5.5, -0.1, 0]}>
            <boxGeometry args={[0.08, 0.2, 0.3]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[5.5, -0.1, 0]}>
            <boxGeometry args={[0.08, 0.2, 0.3]} />
            <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          BACK WALL & LARGE ARCHED DUSK WINDOW (z = -7.2)
          ========================================================================= */}
      {/* Back Wall Solid Structure */}
      <mesh position={[0, 2.0, -7.2]} receiveShadow>
        <boxGeometry args={[11.6, 4.0, 0.3]} />
        <meshStandardMaterial color="#18130e" roughness={0.85} />
      </mesh>

      {/* Large Arched Steel-Framed Window Aperture (Looking out to dusk courtyard) */}
      <group position={[0, 2.2, -7.05]}>
        {/* Dusk Sky Backdrop (Illuminated twilight plane behind window) */}
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshBasicMaterial color="#1e2c3d" />
        </mesh>
        {/* Horizon Golden Twilight Glow Strip */}
        <mesh position={[0, -0.8, -0.18]}>
          <planeGeometry args={[5.2, 1.2]} />
          <meshBasicMaterial color="#7a4e28" transparent opacity={0.6} />
        </mesh>

        {/* Outer Dark Steel Arch Frame */}
        <mesh>
          <boxGeometry args={[4.8, 2.8, 0.08]} />
          <meshStandardMaterial color="#0e0a08" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Window Glass Pane */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[4.6, 2.6]} />
          <meshPhysicalMaterial
            color="#cad9e8"
            transparent
            opacity={0.32}
            roughness={0.05}
            transmission={0.88}
            thickness={0.1}
            reflectivity={0.7}
          />
        </mesh>

        {/* Industrial Mullions / Window Grilles */}
        {/* Vertical mullions */}
        {[-1.5, -0.75, 0, 0.75, 1.5].map((xOffset, i) => (
          <mesh key={`vmullion-${i}`} position={[xOffset, 0, 0.03]}>
            <boxGeometry args={[0.04, 2.6, 0.06]} />
            <meshStandardMaterial color="#110d0a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Horizontal transoms */}
        {[-0.65, 0.2, 0.9].map((yOffset, i) => (
          <mesh key={`hmullion-${i}`} position={[0, yOffset, 0.03]}>
            <boxGeometry args={[4.6, 0.04, 0.06]} />
            <meshStandardMaterial color="#110d0a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

        {/* Courtyard Greenery Silhouettes behind glass */}
        {[-1.8, -0.6, 0.8, 1.9].map((xPlant, i) => (
          <mesh key={`bg-shrub-${i}`} position={[xPlant, -1.0, -0.15]}>
            <sphereGeometry args={[0.45 + (i % 2) * 0.15, 8, 8]} />
            <meshBasicMaterial color="#0c1712" />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          LEFT WALL (z = -1.5, x = -5.7): Fluted Walnut Wainscoting & Venetian Plaster
          ========================================================================= */}
      {/* Lower Walnut Wainscoting Baseboard & Paneling (height 1.4m) */}
      <mesh position={[-5.65, 0.7, -1.5]} receiveShadow>
        <boxGeometry args={[0.2, 1.4, 11.4]} />
        <meshStandardMaterial color="#221811" roughness={0.7} />
      </mesh>
      {/* Fluted panel grooves simulation */}
      <mesh position={[-5.54, 1.4, -1.5]}>
        <boxGeometry args={[0.04, 0.06, 11.4]} />
        <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Upper Textured Plaster Wall (Deep charcoal warm plaster) */}
      <mesh position={[-5.65, 2.7, -1.5]} receiveShadow>
        <boxGeometry args={[0.2, 2.6, 11.4]} />
        <meshStandardMaterial color="#1c1612" roughness={0.9} />
      </mesh>

      {/* =========================================================================
          RIGHT WALL (z = -1.5, x = +5.7): Forest Green Accent Wall & Acoustic Fins
          ========================================================================= */}
      {/* Upper Forest Green Plaster */}
      <mesh position={[5.65, 2.7, -1.5]} receiveShadow>
        <boxGeometry args={[0.2, 2.6, 11.4]} />
        <meshStandardMaterial color="#15241d" roughness={0.8} />
      </mesh>
      {/* Lower Walnut Wainscot */}
      <mesh position={[5.65, 0.7, -1.5]} receiveShadow>
        <boxGeometry args={[0.2, 1.4, 11.4]} />
        <meshStandardMaterial color="#221811" roughness={0.7} />
      </mesh>
      {/* Brass Chair Rail Trim */}
      <mesh position={[5.54, 1.4, -1.5]}>
        <boxGeometry args={[0.04, 0.06, 11.4]} />
        <meshStandardMaterial color="#c58b4b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Vertical Acoustic Timber Slats on Right Wall */}
      {[-4.5, -3.8, -3.1, -0.2, 0.5, 1.2, 1.9].map((zSlat, idx) => (
        <mesh key={`slat-${idx}`} position={[5.52, 2.7, zSlat]}>
          <boxGeometry args={[0.04, 2.4, 0.12]} />
          <meshStandardMaterial color="#2b1c13" roughness={0.65} />
        </mesh>
      ))}

      {/* =========================================================================
          ARCHITECTURAL COLUMNS (Flanking the central transition)
          ========================================================================= */}
      {/* Left Column (Near counter entrance) */}
      <group position={[-2.8, 2.0, 1.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.45, 4.0, 0.45]} />
          <meshStandardMaterial color="#1e1814" roughness={0.8} />
        </mesh>
        {/* Column Capital & Base Trim */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.52, 0.15, 0.52]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.9, 0]}>
          <boxGeometry args={[0.52, 0.15, 0.52]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Column (Near banquette zone) */}
      <group position={[2.8, 2.0, 1.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.45, 4.0, 0.45]} />
          <meshStandardMaterial color="#1e1814" roughness={0.8} />
        </mesh>
        {/* Column Capital & Base Trim */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.52, 0.15, 0.52]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.9, 0]}>
          <boxGeometry args={[0.52, 0.15, 0.52]} />
          <meshStandardMaterial color="#c58b4b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
