/**
 * Jalchabi Real-Time Solar Lighting Configurations & Astronomical Presets
 */

export type SolarTimePreset = 'morning' | 'golden_hour' | 'candlelight';

export interface SolarLightingConfig {
  id: SolarTimePreset;
  label: string;
  timeDisplay: string;
  iconName: string;
  description: string;
  hemisphere: {
    skyColor: string;
    groundColor: string;
    intensity: number;
  };
  ambient: {
    color: string;
    intensity: number;
  };
  sun: {
    position: [number, number, number];
    color: string;
    intensity: number;
  };
  interiorPoint: {
    color: string;
    intensity: number;
    distance: number;
  };
  courtyardMoon: {
    position: [number, number, number];
    color: string;
    intensity: number;
  };
  fog: {
    color: string;
    near: number;
    far: number;
  };
  candlelightFlicker: boolean;
}

export const SOLAR_PRESETS: Record<SolarTimePreset, SolarLightingConfig> = {
  morning: {
    id: 'morning',
    label: 'Morning Sun',
    timeDisplay: '08:00 AM',
    iconName: 'Sun',
    description: 'Crisp morning rays angling through the veranda, cool mist over the lake, and awakening brew aromas.',
    hemisphere: {
      skyColor: '#6092c4',
      groundColor: '#3d2e24',
      intensity: 0.85,
    },
    ambient: {
      color: '#fff5ea',
      intensity: 0.75,
    },
    sun: {
      position: [5, 10, 8],
      color: '#fff1d6',
      intensity: 2.2,
    },
    interiorPoint: {
      color: '#ffe5c4',
      intensity: 0.9,
      distance: 10,
    },
    courtyardMoon: {
      position: [-2, 5, -10],
      color: '#90b0d0',
      intensity: 0.4,
    },
    fog: {
      color: '#070e0c',
      near: 9,
      far: 26,
    },
    candlelightFlicker: false,
  },
  golden_hour: {
    id: 'golden_hour',
    label: 'Golden Hour',
    timeDisplay: '05:30 PM',
    iconName: 'Sunset',
    description: 'Rich amber dusk setting over Rabindra Sarobar, casting long dramatic shadows across fluted walnut booths.',
    hemisphere: {
      skyColor: '#2a3b4c',
      groundColor: '#0e1b17',
      intensity: 0.65,
    },
    ambient: {
      color: '#ffebd6',
      intensity: 0.55,
    },
    sun: {
      position: [4, 7, 9],
      color: '#ffaa55',
      intensity: 1.8,
    },
    interiorPoint: {
      color: '#ffcc88',
      intensity: 1.5,
      distance: 9,
    },
    courtyardMoon: {
      position: [-2, 5, -10],
      color: '#7092b0',
      intensity: 0.8,
    },
    fog: {
      color: '#070e0c',
      near: 8,
      far: 22,
    },
    candlelightFlicker: false,
  },
  candlelight: {
    id: 'candlelight',
    label: 'Candlelight Hearth',
    timeDisplay: '09:00 PM',
    iconName: 'Flame',
    description: 'Intimate night sanctuary illuminated by dancing candles, glowing warm filament bulbs, and moonlight reflections.',
    hemisphere: {
      skyColor: '#121624',
      groundColor: '#0e1b17',
      intensity: 0.45,
    },
    ambient: {
      color: '#d69a58',
      intensity: 0.35,
    },
    sun: {
      position: [-3, 8, -6],
      color: '#4a6b8f', // Starlit moonlight
      intensity: 0.65,
    },
    interiorPoint: {
      color: '#ff8822',
      intensity: 2.6, // Deep cozy candlelight center
      distance: 8.5,
    },
    courtyardMoon: {
      position: [1, 6, 8],
      color: '#6585ab',
      intensity: 0.9,
    },
    fog: {
      color: '#070e0c',
      near: 7,
      far: 19,
    },
    candlelightFlicker: true,
  },
};

/**
 * Automatically determine the appropriate solar preset based on current Kolkata IST hour
 */
export function getKolkataAutoSolarPreset(): SolarTimePreset {
  const now = new Date();
  const kolkataHourStr = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false,
  });
  const hour = parseInt(kolkataHourStr, 10);

  if (hour >= 6 && hour < 16) {
    return 'morning';
  } else if (hour >= 16 && hour < 19) {
    return 'golden_hour';
  } else {
    return 'candlelight';
  }
}
