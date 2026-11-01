import { useEffect, useRef } from 'react';

export interface DeviceOrientationState {
  tiltX: number; // Normalized -1 to 1 (gamma: left/right tilt)
  tiltY: number; // Normalized -1 to 1 (beta: forward/back tilt)
  isSupported: boolean;
}

export function useDeviceOrientation(): DeviceOrientationState {
  const orientationRef = useRef<DeviceOrientationState>({
    tiltX: 0,
    tiltY: 0,
    isSupported: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;

      // gamma is left-to-right tilt in degrees [-90, 90]
      const clampedGamma = Math.max(-45, Math.min(45, event.gamma));
      // beta is front-to-back tilt in degrees [-180, 180], typical holding angle ~45 deg
      const clampedBeta = Math.max(15, Math.min(75, event.beta)) - 45;

      orientationRef.current.tiltX = clampedGamma / 45; // -1 to 1
      orientationRef.current.tiltY = clampedBeta / 30;  // -1 to 1
      orientationRef.current.isSupported = true;
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return orientationRef.current;
}
