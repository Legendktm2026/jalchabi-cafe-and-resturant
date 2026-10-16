import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { HotspotInfo } from '../../types';
import { HOTSPOTS } from '../../config/hotspotsData';

interface HotspotsLayerProps {
  visible: boolean;
  onSelectHotspot: (hotspot: HotspotInfo) => void;
  activeHotspotId?: string;
}

export const HotspotsLayer: React.FC<HotspotsLayerProps> = ({
  visible,
  onSelectHotspot,
  activeHotspotId,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // If a hotspot modal is currently open, hide the 3D badges to prevent UI overlap
  if (!visible || activeHotspotId) return null;

  return (
    <group>
      {HOTSPOTS.map((hotspot) => {
        const isHovered = hoveredId === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            {/* Small 3D Anchor Glow Beacon */}
            <mesh>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial
                color="#e6be8a"
                emissive="#c58b4b"
                emissiveIntensity={isHovered ? 2.2 : 1.2}
                roughness={0.2}
              />
            </mesh>

            {/* Pulsing Outer 3D Halo Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 24]} />
              <meshBasicMaterial
                color="#c58b4b"
                transparent
                opacity={isHovered ? 0.8 : 0.45}
              />
            </mesh>

            {/* Rich Interactive Screen-space HTML Tag with fixed scale */}
            <Html
              position={[0, 0.15, 0]}
              center
              zIndexRange={[40, 0]}
              className="pointer-events-auto select-none"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(hotspot);
                }}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`View hotspot: ${hotspot.title}`}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md border shadow-lg cursor-pointer ${
                  isHovered
                    ? 'bg-[#281e17]/95 border-[#e6be8a] shadow-[0_0_20px_rgba(197,139,75,0.45)]'
                    : 'bg-[#18120d]/80 border-[#c58b4b]/40 hover:border-[#c58b4b]'
                }`}
              >
                {/* Glowing Dot indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c58b4b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e6be8a]" />
                </span>

                {/* Badge text */}
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#f5efe6] whitespace-nowrap">
                  {hotspot.badgeText}
                </span>

                {/* Expanded Title on Hover */}
                {isHovered && (
                  <span className="text-[11px] font-medium text-[#c58b4b] border-l border-[#c58b4b]/30 pl-2 whitespace-nowrap animate-fadeIn">
                    {hotspot.title}
                  </span>
                )}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
