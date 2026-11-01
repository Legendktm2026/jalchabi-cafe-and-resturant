import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { scrollyStore } from '../../stores/scrollyStore';

interface VerandaVideoPortalProps {
  doorOpenProgress?: number; // 0 (closed) to 1 (open)
  onEnterPortal: () => void;
}

export const VerandaVideoPortal: React.FC<VerandaVideoPortalProps> = ({
  doorOpenProgress,
  onEnterPortal,
}) => {
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const [posterTexture, setPosterTexture] = useState<THREE.Texture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lightShaftRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Initialize video texture with robust fallback
  useEffect(() => {
    // 1. Preload poster texture for immediate instant visual beauty
    const loader = new THREE.TextureLoader();
    loader.load(
      '/images/gemini-real-cafe.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        setPosterTexture(tex);
      },
      undefined,
      () => {}
    );

    // 2. Setup HTML5 video element for continuous video streaming
    const video = document.createElement('video');
    video.src = '/videos/jalchabi.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    // Start playing immediately (muted autoplay is universally supported)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback handled by poster texture
      });
    }

    const vTex = new THREE.VideoTexture(video);
    vTex.minFilter = THREE.LinearFilter;
    vTex.magFilter = THREE.LinearFilter;
    vTex.format = THREE.RGBAFormat;
    vTex.colorSpace = THREE.SRGBColorSpace;

    videoRef.current = video;
    setVideoTexture(vTex);

    return () => {
      try {
        video.pause();
        video.removeAttribute('src');
        video.load();
      } catch {
        // Safe cleanup
      }
      vTex.dispose();
    };
  }, []);

  // Animate volumetric light shaft when doors open
  useFrame((state, delta) => {
    const isVeranda = scrollyStore.progress >= 0.70;
    if (groupRef.current) {
      groupRef.current.visible = isVeranda;
    }
    if (!isVeranda) return;

    if (lightShaftRef.current) {
      const effDoor = doorOpenProgress !== undefined ? doorOpenProgress : 1.0;
      const targetOpacity = THREE.MathUtils.lerp(
        0.05,
        0.35,
        Math.min(1, effDoor * 1.2)
      );
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      const mat = lightShaftRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = THREE.MathUtils.damp(
          mat.opacity,
          Math.max(0, targetOpacity + pulse),
          4.0,
          delta
        );
      }
    }
  });

  const activeTexture = videoTexture || posterTexture;

  return (
    <group ref={groupRef} position={[0, 1.25, 4.015]} visible={false}>
      {/* =========================================================================
          1. PORTAL APERTURE & CINEMATIC GEMINI VIDEO MESH
          Placed directly behind the Veranda double French doors
          ========================================================================= */}
      <mesh
        position={[0, 0, 0]}
        onClick={onEnterPortal}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[3.45, 2.42]} />
        {activeTexture ? (
          <meshBasicMaterial
            map={activeTexture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial
            color="#2a3d52"
            emissive="#1e2c3d"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        )}
      </mesh>

      {/* Subtle Blue Twilight Sky & Golden Rim Glow Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.6, 2.55]} />
        <meshBasicMaterial
          color="#38597a"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* =========================================================================
          2. VOLUMETRIC SUNLIGHT & SKY LIGHT SHAFTS (Spilling onto the floor)
          ========================================================================= */}
      <mesh
        ref={lightShaftRef}
        position={[0, -0.7, -0.8]}
        rotation={[-Math.PI * 0.38, 0, 0]}
      >
        <planeGeometry args={[3.6, 2.8]} />
        <meshBasicMaterial
          color="#8ac7ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* =========================================================================
          3. SUBTLE ARCHED BRASS BEAM OVER THRESHOLD
          ========================================================================= */}
      <mesh position={[0, 1.25, 0.05]}>
        <boxGeometry args={[3.5, 0.06, 0.1]} />
        <meshStandardMaterial
          color="#dfb86c"
          metalness={0.9}
          roughness={0.2}
          emissive="#dfb86c"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};
