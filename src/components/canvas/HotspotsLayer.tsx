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
                color="#e5c378"
                emissive="#dfb86c"
                emissiveIntensity={isHovered ? 2.2 : 1.2}
                roughness={0.2}
              />
            </mesh>

            {/* Pulsing Outer 3D Halo Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 24]} />
              <meshBasicMaterial
                color="#dfb86c"
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
                    ? 'bg-[#14241f]/95 border-[#e5c378] shadow-[0_0_20px_rgba(223,184,108,0.45)]'
                    : 'bg-[#0e1b17]/90 border-[#dfb86c]/40 hover:border-[#dfb86c]'
                }`}
              >
                {/* Glowing Dot indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfb86c] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e5c378]" />
                </span>

                {/* Badge text */}
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#fdfbf7] whitespace-nowrap">
                  {hotspot.badgeText}
                </span>

                {/* Expanded Title on Hover */}
                {isHovered && (
                  <span className="text-[11px] font-medium text-[#dfb86c] border-l border-[#dfb86c]/30 pl-2 whitespace-nowrap animate-fadeIn">
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
