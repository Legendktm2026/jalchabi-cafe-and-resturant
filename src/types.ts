export type SceneMode = 'intro' | 'interior' | 'explore';

export type CameraViewPreset = 
  | 'exterior'
  | 'entering'
  | 'interior_overview'
  | 'counter'
  | 'seating'
  | 'menu'
  | 'story'
  | 'window';

export interface HotspotInfo {
  id: string;
  preset: CameraViewPreset;
  title: string;
  subtitle: string;
  category: 'Barista & Brew' | 'Dining & Comfort' | 'Curated Flavors' | 'Heritage' | 'Sanctuary';
  description: string;
  position: [number, number, number];
  badgeText: string;
  actionText: string;
  targetSectionId: string;
  featuredImage: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea:
    | 'lakeside-edge'
    | 'lawn-tent'
    | 'restaurant-se'
    | 'rooftop-deck'
    | 'lakeside-tent'
    | 'espresso-bar'
    | 'cozy-booth'
    | 'main-dining';
  specialRequests: string;
  dietaryNotes: string;
}

export interface QualitySettings {
  pixelRatio: number;
  shadows: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  soundEnabled: boolean;
}

export type ActiveModal = 
  | { type: 'none' }
  | { type: 'hotspot'; hotspot: HotspotInfo }
  | { type: 'gallery'; index: number }
  | { type: 'accessibility' }
  | { type: 'privacy' }
  | { type: 'reservation-success'; referenceId: string; data: ReservationFormData };
