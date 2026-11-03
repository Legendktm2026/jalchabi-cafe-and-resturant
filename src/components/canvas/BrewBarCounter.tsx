import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { soundFoley } from '../../utils/soundFoley';
import { scrollyStore } from '../../stores/scrollyStore';
import { X, ArrowUpRight } from 'lucide-react';

export const BrewBarCounter: React.FC = () => {
  const [shelfModalOpen, setShelfModalOpen] = useState(false);
  const [isShelfVisible, setIsShelfVisible] = useState(false);

  // Canvas texture for Back-Bar Chalkboard Menu Slate
  const chalkboardTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Deep slate background with fine chalk grain
    ctx.fillStyle = '#141718';
    ctx.fillRect(0, 0, 1024, 512);

    // Antique gold frame border
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#dfb86c';
    ctx.strokeRect(16, 16, 992, 480);

    ctx.textAlign = 'center';

    // Header Tagline
    ctx.fillStyle = '#dfb86c';
    ctx.font = 'bold 44px "Cinzel", Georgia, serif';
    ctx.fillText('★ JALCHABI SPECIALS ★', 512, 85);

    // Bengali Name
    ctx.fillStyle = '#faf0dd';
    ctx.font = 'bold 50px "Noto Sans Bengali", "Kalpurush", "Segoe UI", sans-serif';
    ctx.fillText('জলছবি তাজা রসুই • ক্যানিং ২', 512, 165);

    // Divider
    ctx.beginPath();
    ctx.moveTo(250, 195);
    ctx.lineTo(774, 195);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#dfb86c';
    ctx.stroke();

    // Menu Special Items
    ctx.fillStyle = '#e8d2a0';
    ctx.font = 'bold 34px "Segoe UI", sans-serif';
    ctx.fillText('Darjeeling Momos • Royal Dum Biryani • Araku Wave', 512, 255);
    ctx.fillText('Wood-Fired Bhetki Paturi • Daab Chingri • Mishti Doi', 512, 320);

    // Direct hospitality & founder credit
    ctx.fillStyle = '#9cb8ac';
    ctx.font = 'italic bold 28px "Times New Roman", Georgia, serif';
    ctx.fillText('Founder: Sabir Hossen Khan | Mobile: +91 8918948730', 512, 400);

    ctx.fillStyle = '#dfb86c';
    ctx.font = 'bold 20px "Cinzel", monospace';
    ctx.fillText('✦ FRESHLY PREPARED WITH BENGAL TERROIR & TRADITION ✦', 512, 455);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Canvas texture for Top Crown Architrave
  const architraveTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#16100b';
    ctx.fillRect(0, 0, 1024, 128);

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#dfb86c';
    ctx.strokeRect(8, 8, 1008, 112);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#dfb86c';
    ctx.font = '900 52px "Playfair Display", Georgia, serif';
    ctx.fillText('JALCHABI CAFE & RESTAURANT', 512, 62);

    ctx.fillStyle = '#fdfbf7';
    ctx.font = 'bold 26px "Noto Sans Bengali", "Segoe UI", sans-serif';
    ctx.fillText('জলছবি ক্যাফে ও রেস্তোরাঁ • SARBERIA, CANNING II', 512, 104);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(() => {
    const inside = scrollyStore.progress >= 0.08 && scrollyStore.progress <= 0.50;
    if (inside !== isShelfVisible) {
      setIsShelfVisible(inside);
    }
  });

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
          <meshStandardMaterial color="#dfb86c" metalness={0.88} roughness={0.22} />
        </mesh>
      </group>

      {/* Brushed Antique Brass Footrail */}
      <group position={[0.92, 0.16, 0]}>
        {/* Rail tube */}
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.025, 4.3, 16]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Stanchion floor brackets */}
        {[-1.8, -0.6, 0.6, 1.8].map((zPos, i) => (
          <group key={`stanchion-${i}`} position={[0, 0, zPos]}>
            <mesh position={[-0.08, -0.06, 0]}>
              <boxGeometry args={[0.16, 0.03, 0.06]} />
              <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

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
          <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[-0.33, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.43, 0.86]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Cup Warming Top Rail */}
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.8]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
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
          <meshStandardMaterial color="#dfb86c" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.34, 0.18, -0.38]} rotation={[-0.4, 0, 0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.22, 12]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.95} roughness={0.15} />
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
          <meshStandardMaterial
            color="#2d1d12"
            opacity={0.7}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Hopper Lid */}
        <mesh position={[0, 0.57, 0]}>
          <cylinderGeometry args={[0.125, 0.125, 0.02, 16]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          POUR-OVER MANUAL DRIP STATION (Kalita Wave & Brass Stand)
          ========================================================================= */}
      <group position={[0.15, 1.16, 0.5]}>
        {/* Brass Stand Frame */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.18, 0.02, 0.55]} />
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
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
              <meshStandardMaterial
                color="#eaf3fa"
                transparent
                opacity={0.35}
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
          <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
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
          <meshStandardMaterial
            color="#dce7f0"
            transparent
            opacity={0.3}
            roughness={0.05}
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

        {/* 3 Floating Walnut Shelves with Brass Edge & Bold Cafe Name on Top of Every Shelf */}
        {[-0.2, 0.4, 1.0].map((yShelf, idx) => (
          <group key={`shelf-${idx}`} position={[0.12, yShelf, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.04, 4.2]} />
              <meshStandardMaterial color="#2c1f17" roughness={0.65} />
            </mesh>
            <mesh position={[0.15, 0, 0]}>
              <boxGeometry args={[0.01, 0.045, 4.2]} />
              <meshStandardMaterial color="#dfb86c" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Bold Cafe Name Sign Plaque mounted on top of every shelf */}
            <group position={[0.155, 0.07, 0]}>
              {/* Dark Timber Base Plaque */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.008, 0.11, 1.35]} />
                <meshStandardMaterial color="#1a120b" metalness={0.6} roughness={0.4} />
              </mesh>
              {/* Antique Brass Bevel Trim */}
              <mesh position={[0.004, 0, 0]}>
                <boxGeometry args={[0.003, 0.12, 1.39]} />
                <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.18} />
              </mesh>
              {/* Bold 3D Cafe Name in Gold */}
              <Text
                position={[0.009, 0.015, 0]}
                rotation={[0, Math.PI / 2, 0]}
                fontSize={0.095}
                color="#dfb86c"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.006}
                outlineColor="#0d0905"
                fontWeight="bold"
                letterSpacing={0.1}
              >
                JALCHABI
              </Text>
              {/* Artisanal Category Subtitle on Shelf */}
              <Text
                position={[0.009, -0.03, 0]}
                rotation={[0, Math.PI / 2, 0]}
                fontSize={0.032}
                color="#fdfbf7"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.16}
                fontWeight="bold"
              >
                {idx === 2
                  ? 'ARTISANAL ROASTERY & PANTRY'
                  : idx === 1
                  ? 'SINGLE-ORIGIN RESERVE • ARAKU'
                  : 'CAFE & RESTAURANT • ESTD 2024'}
              </Text>
            </group>

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

        {/* =========================================================================
            INTERACTIVE 3D POP-UP TEXT SETUP ON RESTAURANT SHELF
            ========================================================================= */}
        {isShelfVisible && (
          <group position={[0.26, 0.46, 1.25]}>
            <Html
              center
              distanceFactor={6.5}
              zIndexRange={[100, 0]}
            >
              {!shelfModalOpen ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFoley.playSwitchClick();
                    setShelfModalOpen(true);
                  }}
                  className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#dfb86c]/90 bg-[#070e0c]/95 text-[#fdfbf7] hover:border-[#dfb86c] hover:bg-[#dfb86c] hover:text-[#070e0c] shadow-[0_0_20px_rgba(223,184,108,0.45)] backdrop-blur-xl transition-all cursor-pointer transform-gpu hover:scale-105 active:scale-95 select-none whitespace-nowrap"
                  title="Click to inspect Jalchabi artisanal pantry & coffee roast shelf"
                >
                  <span className="w-2 h-2 rounded-full bg-[#dfb86c] group-hover:bg-[#070e0c] animate-ping" />
                  <span className="font-serif text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
                    ✦ Jalchabi Shelf • Tap to Inspect ✦
                  </span>
                </button>
              ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-80 sm:w-96 rounded-2xl border border-[#dfb86c]/70 bg-[#070e0c]/95 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-[#fdfbf7] select-none"
              >
                {/* Golden Corner Gradient Glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#dfb86c]/20 blur-xl pointer-events-none" />

                {/* Top Header */}
                <div className="flex items-start justify-between gap-3 mb-3 pb-2.5 border-b border-[#dfb86c]/20">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfb86c]" />
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#dfb86c] uppercase">
                        Jalchabi Artisanal Pantry
                      </span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#fdfbf7] leading-tight">
                      Reserve Roast & Single-Origin Shelf
                    </h4>
                    <p className="font-serif text-xs text-[#dfb86c]/90 italic mt-0.5">
                      জলছবি সংরক্ষিত কফি ও বনজ মধু সম্ভার
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFoley.playSwitchClick();
                      setShelfModalOpen(false);
                    }}
                    className="p-1 rounded-lg text-[#8fa69d] hover:text-[#fdfbf7] hover:bg-[#dfb86c]/20 transition-colors cursor-pointer"
                    title="Close shelf pop-up"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Item Highlights */}
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-start gap-2.5 bg-[#0e1b17]/80 p-2 sm:p-2.5 rounded-xl border border-[#dfb86c]/15">
                    <span className="text-[#dfb86c] text-sm mt-0.5">☕</span>
                    <div>
                      <div className="font-semibold text-[#fdfbf7]">Araku Valley Single-Origin Arabica</div>
                      <div className="text-[11px] text-[#8fa69d] leading-snug">
                        Shade-grown at 3,200ft, medium roast with natural honey & roasted hazelnut notes.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0e1b17]/80 p-2 sm:p-2.5 rounded-xl border border-[#dfb86c]/15">
                    <span className="text-[#dfb86c] text-sm mt-0.5">🍯</span>
                    <div>
                      <div className="font-semibold text-[#fdfbf7]">Sundarban Wild Blossom Honey</div>
                      <div className="text-[11px] text-[#8fa69d] leading-snug">
                        Raw, unpasteurized forest nectar harvested sustainably by local Mouli foragers.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0e1b17]/80 p-2 sm:p-2.5 rounded-xl border border-[#dfb86c]/15">
                    <span className="text-[#dfb86c] text-sm mt-0.5">🍶</span>
                    <div>
                      <div className="font-semibold text-[#fdfbf7]">Antique Copper Vessels & Pour-Overs</div>
                      <div className="text-[11px] text-[#8fa69d] leading-snug">
                        Kalita Wave stainless drippers, brass kettles, and handcrafted demitasse ceramics.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#dfb86c]/20">
                  <button
                    onClick={() => {
                      soundFoley.playSwitchClick();
                      setShelfModalOpen(false);
                      const el = document.getElementById('menu');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#dfb86c] to-[#c99e52] text-[#070e0c] font-serif text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <span>Explore Coffee Menu</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      soundFoley.playSwitchClick();
                      setShelfModalOpen(false);
                      const el = document.getElementById('reservations');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#dfb86c]/40 bg-[#0e1b17] text-xs font-mono text-[#e5c378] hover:text-[#fdfbf7] hover:border-[#dfb86c] transition-all cursor-pointer"
                  >
                    <span>Reserve Table</span>
                  </button>
                </div>
              </div>
            )}
          </Html>
        </group>
        )}

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
            <meshStandardMaterial color="#dfb86c" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Front illuminated face with canvas texture */}
          <mesh position={[0.026, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.76, 0.86]} />
            {chalkboardTexture ? (
              <meshStandardMaterial
                map={chalkboardTexture}
                emissiveMap={chalkboardTexture}
                emissive="#ffffff"
                emissiveIntensity={0.35}
                roughness={0.65}
              />
            ) : (
              <meshStandardMaterial color="#141718" roughness={0.9} />
            )}
          </mesh>
        </group>

        {/* Crown Architrave Pediment above Back-Bar Shelving Unit */}
        <group position={[0.1, 2.18, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.08, 0.28, 2.6]} />
            <meshStandardMaterial color="#18110b" roughness={0.7} />
          </mesh>
          {/* Polished Brass Bevel Trim */}
          <mesh position={[0.042, 0, 0]}>
            <boxGeometry args={[0.006, 0.29, 2.64]} />
            <meshStandardMaterial color="#dfb86c" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Front illuminated face with architrave texture */}
          <mesh position={[0.046, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[2.58, 0.26]} />
            {architraveTexture ? (
              <meshStandardMaterial
                map={architraveTexture}
                emissiveMap={architraveTexture}
                emissive="#ffffff"
                emissiveIntensity={0.4}
                roughness={0.4}
              />
            ) : (
              <meshStandardMaterial color="#18110b" roughness={0.7} />
            )}
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
            <meshStandardMaterial color="#dfb86c" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Glowing Edison Bulb */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color="#ffdd99"
              emissive="#ffaa33"
              emissiveIntensity={2.8}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
