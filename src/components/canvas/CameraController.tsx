import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CameraViewPreset, SceneMode } from '../../types';
import { SCROLLY_ZONES } from '../../config/scrollytellingData';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';
import { scrollyStore } from '../../stores/scrollyStore';

interface CameraControllerProps {
  currentPreset?: CameraViewPreset;
  sceneMode?: SceneMode;
  onEnterAnimationComplete?: () => void;
  doorOpenProgress: number;
  setDoorOpenProgress: (val: number | ((prev: number) => number)) => void;
  reducedMotion?: boolean;
  scrollProgress?: number;
  isOrbitMode?: boolean;
}

// Preset camera positions [x, y, z] and lookAt targets [x, y, z] for fallback/discrete views
const PRESETS: Record<CameraViewPreset, { pos: [number, number, number]; target: [number, number, number]; fov: number }> = {
  exterior: { pos: [0, 1.8, 8.5], target: [0, 1.8, 0], fov: 46 },
  entering: { pos: [0, 1.8, 1.8], target: [0, 1.8, -3.5], fov: 50 },
  interior_overview: { pos: [0, 2.0, 3.6], target: [0, 1.5, -2.5], fov: 52 },
  counter: { pos: [-1.4, 1.7, -0.6], target: [-2.6, 1.4, -2.8], fov: 48 },
  seating: { pos: [1.8, 1.6, 0.2], target: [2.5, 1.2, -1.8], fov: 48 },
  menu: { pos: [-1.2, 2.2, -1.5], target: [-2.8, 2.4, -3.8], fov: 42 },
  story: { pos: [1.6, 2.0, -0.2], target: [3.8, 2.1, -1.2], fov: 45 },
  window: { pos: [0.3, 1.7, 1.8], target: [0, 1.7, 4.8], fov: 50 },
};

// Static Catmull-Rom Spline generation across the 6 sanctuary zones
const posSplinePoints = SCROLLY_ZONES.map((z) => new THREE.Vector3(...z.camera.pos));
const targetSplinePoints = SCROLLY_ZONES.map((z) => new THREE.Vector3(...z.camera.target));

const posSpline = new THREE.CatmullRomCurve3(posSplinePoints, false, 'catmullrom', 0.25);
const targetSpline = new THREE.CatmullRomCurve3(targetSplinePoints, false, 'catmullrom', 0.25);

// Pre-allocated reusable vectors to prevent GC pauses
const tmpPos = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const vExteriorPos = new THREE.Vector3(...PRESETS.exterior.pos);
const vInteriorPos = new THREE.Vector3(...PRESETS.interior_overview.pos);
const vExteriorTarget = new THREE.Vector3(...PRESETS.exterior.target);
const vInteriorTarget = new THREE.Vector3(...PRESETS.interior_overview.target);

export const CameraController: React.FC<CameraControllerProps> = ({
  currentPreset = 'interior_overview',
  sceneMode = 'interior',
  onEnterAnimationComplete,
  setDoorOpenProgress,
  reducedMotion = false,
  scrollProgress,
  isOrbitMode = false,
}) => {
  const { camera } = useThree();
  const orientation = useDeviceOrientation();
  const currentTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, -2.5));
  const desiredPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.0, 4.2));
  const desiredTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, -2.5));
  const isEnteringAnim = useRef(false);
  const enterTimeRef = useRef(0);

  // Update target when preset changes (non-scrolly fallback)
  useEffect(() => {
    if (sceneMode !== 'explore' && sceneMode !== 'intro') {
      return;
    }

    const config = PRESETS[currentPreset] || PRESETS.interior_overview;
    desiredPos.current.set(...config.pos);
    desiredTarget.current.set(...config.target);

    if (currentPreset === 'entering') {
      if (reducedMotion) {
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
  }, [currentPreset, reducedMotion, camera, onEnterAnimationComplete, setDoorOpenProgress, sceneMode]);

  useFrame((_, delta) => {
    // 1. Orbit Mode: OrbitControls handles the camera directly
    if (isOrbitMode || sceneMode === 'explore') {
      return;
    }

    // 2. Continuous Scrollytelling Spline Evaluation (Zero-React-overhead via scrollyStore)
    const activeProgress = scrollProgress !== undefined ? scrollProgress : scrollyStore.progress;
    if (activeProgress !== undefined && (sceneMode !== 'intro' || activeProgress > 0)) {
      const clamped = Math.max(0, Math.min(1, activeProgress));
      posSpline.getPointAt(clamped, tmpPos);
      targetSpline.getPointAt(clamped, tmpTarget);

      // Mobile Gyroscope Subtle Parallax
      if (orientation.isSupported && !reducedMotion) {
        tmpPos.x += orientation.tiltX * 0.12;
        tmpPos.y += orientation.tiltY * 0.08;
        tmpTarget.x += orientation.tiltX * 0.06;
      }

      // Interpolate Field-Of-View across the 6 zones
      const totalZones = SCROLLY_ZONES.length;
      const segIndex = Math.min(Math.floor(clamped * (totalZones - 1)), totalZones - 2);
      const segT = (clamped * (totalZones - 1)) - segIndex;
      const baseFov = THREE.MathUtils.lerp(
        SCROLLY_ZONES[segIndex].camera.fov,
        SCROLLY_ZONES[segIndex + 1].camera.fov,
        segT
      );

      // Responsive Mobile Portrait FOV & Composition Adaptation:
      // When aspect < 1.0 (smartphones), expand FOV and refine position so horizontal field of view
      // frames the full architectural facade and interior rather than cropping it tightly.
      const aspect = (camera as THREE.PerspectiveCamera).aspect || 1.0;
      const targetFov = aspect < 1.0
        ? THREE.MathUtils.clamp(baseFov + (1.0 - aspect) * 15, baseFov, 64)
        : baseFov;

      if (aspect < 1.0) {
        tmpPos.z += (1.0 - aspect) * 0.8;
        tmpPos.y += (1.0 - aspect) * 0.12;
      }

      const perspectiveCam = camera as THREE.PerspectiveCamera;
      if (perspectiveCam.fov && Math.abs(perspectiveCam.fov - targetFov) > 0.05) {
        perspectiveCam.fov = THREE.MathUtils.damp(perspectiveCam.fov, targetFov, 4.5, delta);
        perspectiveCam.updateProjectionMatrix();
      }

      if (reducedMotion) {
        camera.position.copy(tmpPos);
        currentTarget.current.copy(tmpTarget);
      } else {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, tmpPos.x, 4.8, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, tmpPos.y, 4.8, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, tmpPos.z, 4.8, delta);

        currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, tmpTarget.x, 4.8, delta);
        currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, tmpTarget.y, 4.8, delta);
        currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, tmpTarget.z, 4.8, delta);
      }

      camera.lookAt(currentTarget.current);
      return;
    }

    // 3. Intro Sequence (Entering doors sweep)
    if (isEnteringAnim.current) {
      enterTimeRef.current += delta;
      const duration = 2.4;
      const t = Math.min(enterTimeRef.current / duration, 1);
      setDoorOpenProgress(Math.min(t * 1.5, 1));

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

    // 4. Discrete View Preset Damping
    if (reducedMotion) {
      camera.position.copy(desiredPos.current);
      currentTarget.current.copy(desiredTarget.current);
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.current.x, 4.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.current.y, 4.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.current.z, 4.2, delta);

      currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, desiredTarget.current.x, 4.2, delta);
      currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, desiredTarget.current.y, 4.2, delta);
      currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, desiredTarget.current.z, 4.2, delta);
    }
    camera.lookAt(currentTarget.current);
  });

  if (isOrbitMode || sceneMode === 'explore') {
    return (
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.55}
        panSpeed={0.45}
        zoomSpeed={0.65}
        minDistance={0.8}
        maxDistance={6.5}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minPolarAngle={Math.PI / 6}
        target={[currentTarget.current.x, currentTarget.current.y, currentTarget.current.z]}
      />
    );
  }

  return null;
};

