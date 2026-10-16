import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CameraViewPreset, SceneMode } from '../../types';

interface CameraControllerProps {
  currentPreset: CameraViewPreset;
  sceneMode: SceneMode;
  onEnterAnimationComplete?: () => void;
  doorOpenProgress: number;
  setDoorOpenProgress: (val: number | ((prev: number) => number)) => void;
  reducedMotion?: boolean;
}

// Preset camera positions [x, y, z] and lookAt targets [x, y, z]
const PRESETS: Record<CameraViewPreset, { pos: [number, number, number]; target: [number, number, number]; fov: number }> = {
  exterior: {
    pos: [0, 1.8, 8.5],
    target: [0, 1.8, 0],
    fov: 46,
  },
  entering: {
    pos: [0, 1.8, 1.8],
    target: [0, 1.8, -3.5],
    fov: 50,
  },
  interior_overview: {
    pos: [0, 2.0, 3.6],
    target: [0, 1.5, -2.5],
    fov: 52,
  },
  counter: {
    pos: [-1.4, 1.7, -0.6],
    target: [-2.6, 1.4, -2.8],
    fov: 48,
  },
  seating: {
    pos: [1.8, 1.6, 0.2],
    target: [2.5, 1.2, -1.8],
    fov: 48,
  },
  menu: {
    pos: [-1.2, 2.2, -1.5],
    target: [-2.8, 2.4, -3.8],
    fov: 42,
  },
  story: {
    pos: [1.6, 2.0, -0.2],
    target: [3.8, 2.1, -1.2],
    fov: 45,
  },
  window: {
    pos: [0.3, 1.7, 1.8],
    target: [0, 1.7, 4.8],
    fov: 50,
  },
};

// Pre-allocated static vectors to avoid GC allocation jitter on 120Hz ProMotion displays
const vExteriorPos = new THREE.Vector3(...PRESETS.exterior.pos);
const vInteriorPos = new THREE.Vector3(...PRESETS.interior_overview.pos);
const vExteriorTarget = new THREE.Vector3(...PRESETS.exterior.target);
const vInteriorTarget = new THREE.Vector3(...PRESETS.interior_overview.target);

export const CameraController: React.FC<CameraControllerProps> = ({
  currentPreset,
  sceneMode,
  onEnterAnimationComplete,
  setDoorOpenProgress,
  reducedMotion = false,
}) => {
  const { camera } = useThree();
  const currentTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 0));
  const desiredPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 8.5));
  const desiredTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 0));
  const isEnteringAnim = useRef(false);
  const enterTimeRef = useRef(0);

  // Update target when preset changes
  useEffect(() => {
    const config = PRESETS[currentPreset] || PRESETS.interior_overview;
    desiredPos.current.set(...config.pos);
    desiredTarget.current.set(...config.target);

    if (currentPreset === 'entering') {
      if (reducedMotion) {
        // Reduced motion: jump immediately to interior overview
        setDoorOpenProgress(1.0);
        camera.position.set(...PRESETS.interior_overview.pos);
        currentTarget.current.set(...PRESETS.interior_overview.target);
        camera.lookAt(currentTarget.current);
        onEnterAnimationComplete?.();
      } else {
        isEnteringAnim.current = true;
        enterTimeRef.current = 0;
      }
    }
  }, [currentPreset, reducedMotion, camera, onEnterAnimationComplete, setDoorOpenProgress]);

  useFrame((_, delta) => {
    // If we are currently executing the entering transition
    if (isEnteringAnim.current) {
      enterTimeRef.current += delta;
      const duration = 2.4; // 2.4s cinematic sweep
      const t = Math.min(enterTimeRef.current / duration, 1);
      
      // Open doors as camera moves forward
      setDoorOpenProgress(Math.min(t * 1.5, 1));

      // Ease-in-out movement
      const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      camera.position.lerpVectors(vExteriorPos, vInteriorPos, easeT);
      currentTarget.current.lerpVectors(vExteriorTarget, vInteriorTarget, easeT);
      camera.lookAt(currentTarget.current);

      if (t >= 1) {
        isEnteringAnim.current = false;
        onEnterAnimationComplete?.();
      }
      return;
    }

    // In explore mode, OrbitControls takes over camera manipulation
    if (sceneMode === 'explore') {
      return;
    }

    // 120Hz ProMotion frame-rate invariant exponential damping
    if (reducedMotion) {
      camera.position.copy(desiredPos.current);
      currentTarget.current.copy(desiredTarget.current);
    } else {
      // Exponential damp with delta normalization for silky 120Hz refresh rates
      camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.current.x, 4.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.current.y, 4.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.current.z, 4.2, delta);

      currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, desiredTarget.current.x, 4.2, delta);
      currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, desiredTarget.current.y, 4.2, delta);
      currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, desiredTarget.current.z, 4.2, delta);
    }
    camera.lookAt(currentTarget.current);
  });

  if (sceneMode === 'explore') {
    return (
      <OrbitControls
        enableDamping
        dampingFactor={0.05} // Weighted Apple trackpad inertia
        rotateSpeed={0.55}
        panSpeed={0.45}
        zoomSpeed={0.65}
        minDistance={0.8}
        maxDistance={6.5}
        maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
        minPolarAngle={Math.PI / 6} // don't flip upside down
        target={[0, 1.6, -1]}
      />
    );
  }

  return null;
};
