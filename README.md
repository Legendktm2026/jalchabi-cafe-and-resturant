# Jalchabi Cafe & Restaurant — Immersive 3D Experience

> **A place to linger.**  
> An extraordinary, cinematic, interactive 3D WebGL digital destination set in the cultural context of **Kolkata, India**. Inspired by the Bengali heritage of *Jalchabi* (জলছবি) — watercolor reflections, liquid silhouettes, and the unhurried spirit of adda.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.174-black.svg)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.0-red.svg)](https://docs.pmnd.rs/react-three-fiber/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38b2ac.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)

---

## 1. Project Overview & Art Direction

### Cinematic Realism
Jalchabi is not a generic restaurant template or a flat landing page with CSS zoom effects. It is a genuine 3D architectural sanctuary rendered in real-time WebGL, capturing the golden twilight atmosphere of an intimate café at dusk:

- **Color Palette**: Deep forest green (`#0d2218`), warm dark walnut timber (`#1f140e`), antique brass & brushed gold (`#d4af37`, `#b89047`), warm amber illumination (`#ffaa44`), and cream/ivory typography (`#f5f0e8`).
- **Atmosphere**: Dusk exterior with glowing street gas lamps, warm interior illumination spilling through tall arched paned windows onto wet stone pavement, and rich material reflections.
- **Kolkata Context**: Designed specifically around Kolkata's celebrated coffee house tradition, literary culture, and conversational warmth (*adda*), without inventing unverified street addresses, telephone numbers, coordinates, or fake map pins.
- **Concept Designation**: All architectural designs, sample menu items, prices, and booking confirmations are explicitly designated as concept artwork and demonstration data pending official launch.

---

## 2. 3D Architectural & Scene Architecture

Built with **Three.js** and **@react-three/fiber**, the 3D scene consists of procedural architectural geometry, custom materials, and dynamic camera choreography:

### The 5-Shot Cinematic Sequence
1. **Shot 1 — Establishing Shot (Exterior at Dusk)**:
   - Full 20-meter masonry facade in deep forest green with classical cornices, pilasters, and granite curb.
   - Twin 3.5m arched display windows with warm interior illumination and street gas lamps.
   - Glass double entrance with illuminated brass canopy and typographic wordmark: `JALCHABI CAFE & RESTAURANT`.
   - Call to Action: **"ENTER JALCHABI"** with immediate **"SKIP INTRO"** bypass.
2. **Shot 2 — The Approach**:
   - Smooth camera dolly toward the entrance along an eased spline trajectory.
   - Subtle parallax between street elements, lamps, and interior silhouettes.
3. **Shot 3 — The Entrance**:
   - Double entrance doors smoothly swing open 80 degrees on animated hinges as the camera crosses the threshold.
   - Zero geometry clipping or disorienting sudden cuts.
4. **Shot 4 — The Reveal**:
   - Camera glides into the interior, panning across the fluted walnut brew bar, exposed ceiling beams, polished marble surfaces, and green leather banquettes.
5. **Shot 5 — Interactive Exploration**:
   - The HUD activates, revealing interactive 3D spatial beacons and camera controls.

### Dual Exploration Modes
- **Guided Tour**: Curated camera presets (`Overview`, `Brew Bar`, `Banquettes`, `Kitchen Board`, `Heritage Wall`, `Veranda`) with smooth damping and focused angles.
- **Free 3D Orbit**: Clamped pointer and touch controls (azimuth ±75°, polar 50°–88°, zoom distance 1.5m–14m) preventing disorientation or boundary clipping. Includes a single-click "Reset View" action.

### 3D Environment Components (`src/components/canvas/`)
- `ExteriorEntrance.tsx`: Facade, sidewalk, gas lamp, double doors with animated rotation, entrance canopy, and warm downlights.
- `InteriorArchitecture.tsx`: Herringbone dark walnut parquet floor with roughness map reflections, heavy timber beams, classical support columns, fluted acoustic timber fins, and arched courtyard window showing dusk garden shrub silhouettes.
- `BrewBarCounter.tsx`: Curved fluted walnut counter, cream polished marble bar top, brass footrail, LED undercounter glow, custom dual-group brass espresso machine with portafilters, conical burr grinders, Kalita Wave pour-over drippers, glass pastry cloche with baked goods, chalkboard menu board, and back-bar shelving with amber apothecary glassware.
- `DiningArea.tsx`: Curved channel-tufted forest green leather banquette booth, round walnut bistro tables with brass pedestals, cafe chairs, ceramic coffee mugs, and glowing amber candle lamps.
- `DecorativeElements.tsx`: Potted *Monstera deliciosa* in ceramic planter, tall Fiddle-leaf fig tree, brass wall sconces, and the "Reflections on Water" framed artwork with dedicated spotlight.
- `LightingSetup.tsx`: Ambient twilight sky fill, directional golden-hour dusk light casting soft shadows, and warm interior point lights.
- `HotspotsLayer.tsx`: 3D spatial pins with pulsing halo rings that hover above key zones and open interactive modal cards.
- `CameraController.tsx`: Eased camera interpolation controller managing cinematic shots, guided presets, and orbit bounds.

---

## 3. Website Sections & Practical Features

Surrounding the 3D scene is an editorial hospitality experience:

1. **Top Navigation (`Navbar.tsx`)**:
   - Sticky glassmorphic bar with typographic wordmark, quick jump links (`3D Experience`, `The Concept`, `Menu Preview`, `Visual Gallery`, `Visit Kolkata`, `Concierge`), audio mute toggle, 3D settings trigger, and CTA.
2. **Hero HUD (`CinematicHeroOverlay.tsx`)**:
   - Seamless overlay for Shot 1 with brand copy, "ENTER JALCHABI" button, skip intro, and persistent mode/preset controls.
3. **Hotspot Detail Modals (`HotspotModal.tsx`)**:
   - Informative slide-over cards displaying zone backstory, specialty details, concept imagery, and direct links to corresponding website sections.
4. **The Concept Story (`ConceptStorySection.tsx`)**:
   - Editorial exploration of the Bengali word *Jalchabi*, Kolkata's coffee house heritage, and the three architectural pillars: *The Hearth & Brew Bar*, *The Living Room*, and *The Courtyard Veranda*.
5. **Artisanal Menu Preview (`MenuSection.tsx`)**:
   - Categorized menu with instant filtering: `All`, `Coffee`, `Signatures`, `Brunch`, `Mains`, `Desserts`.
   - Clear sample data notices, dietary tags (`Vegan`, `Vegetarian`, `Gluten-Free`, `Chef Specialty`), and calorie counts.
6. **Concept Visual Gallery (`GallerySection.tsx`)**:
   - Filterable gallery (`All`, `Atmosphere`, `Brew Bar`, `Culinary`, `Architecture`) featuring concept imagery with AI Concept badges and full-screen lightbox modal.
7. **Visit Kolkata (`VisitSection.tsx`)**:
   - Kolkata cultural quarter city context, weekly operating rhythms, configurable contact placeholders, and guest amenities (High-Speed Wi-Fi, Curbside Pickup, Heritage Courtyard, Wheelchair Accessible, Private Salon).
8. **Concierge Table Inquiries (`ReservationSection.tsx`)**:
   - Interactive booking simulation: guests selector (1–8), date picker, time slot selector, seating area choice (Banquette, Brew Bar, Courtyard Veranda).
   - Instant simulated reference code generation (`JAL-CC-XXXX`), gold & ivory confetti celebration, and explicit disclaimer that bookings are simulated pending official opening.
9. **Accessibility & Graphics Suite (`AccessibilityModal.tsx`)**:
   - Reduced Motion toggle (`prefers-reduced-motion` auto-detected).
   - Dynamic Shadows toggle for performance optimization on lower-end devices.
   - Graphics DPR Resolution selector (1.0x to 2.0x).
   - Ambient Audio toggle (synthesized procedural soundscape via Web Audio API).
10. **WebGL Fallback (`WebGLFallback.tsx`)**:
    - High-resolution visual fallback with full feature access on browsers lacking WebGL support or GPU acceleration.
11. **Footer (`Footer.tsx`)**:
    - Complete editorial footer with brand mark, sitemap links, city context, and concept disclaimers.

---

## 4. Performance, 120Hz ProMotion & Apple-Grade Scrolling

- **120Hz ProMotion Optimization (MacBook Pro M1 Pro / Liquid Retina XDR)**:
  - **Frame-Rate Invariant Exponential Damping**: In Three.js and React Three Fiber, all camera transitions, presets, and door mechanics use continuous `THREE.MathUtils.damp(current, target, lambda, delta)` normalized by frame delta, eliminating the 2× speedup and micro-stutter typical on 120Hz displays.
  - **Zero-Allocation Render Loop**: Static `THREE.Vector3` objects are pre-allocated outside `useFrame`, eliminating garbage collection pauses during high-frequency ProMotion 120fps animation.
  - **Weighted Trackpad Inertia**: OrbitControls calibrated with `dampingFactor: 0.05` for a tactile, weighted Apple Force Touch trackpad feel.
- **Apple-Style Smooth Momentum Scrolling (Lenis Engine)**:
  - Integrated **Lenis** with Apple's exponential momentum curve: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` synchronized directly to browser `requestAnimationFrame` at 120Hz.
  - **Luminous Top Scroll Progress Bar (`ScrollProgressBar.tsx`)**: An ultra-thin amber-gold progress indicator pinned to the top edge tracking reading progress with subpixel precision.
  - **Staggered Apple Scroll Reveals (`AppleScrollReveal.tsx`)**: Elements float upward (`translate3d(0, 28px, 0)` -> `translate3d(0, 0, 0)`) with `cubic-bezier(0.16, 1, 0.3, 1)` easing and GPU layer promotion.
  - **Hero 3D Perspective Scale & Dim**: As the visitor scrolls down from the 3D sanctuary, the canvas gently scales down ($1.0 \to 0.96$) and dims seamlessly into the editorial sections.
  - **Dynamic Apple Glass Navigation Elevation**: Header transitions from translucent glass to elevated `backdrop-blur-2xl bg-[#100b07]/92` with shadow as scroll passes 40px.
- **Initial Shell Bundle**: Code-split via `vite.config.ts` into discrete manual chunks (`three`, `react-three`, `vendor`). Initial HTML + CSS + JS shell is under **75 KB** gzipped, ensuring near-instant loading.
- **Lazy 3D Loading**: The `CafeScene` 3D canvas is dynamically imported via `React.lazy()` with a branded suspense loader.
- **Clean Fallback Isolation**: Centralized `isWebGLAvailable()` detection ensures zero DOM/typography collision between WebGL and fallback states.
- **Shadow Map Budgeting**: Optimized 1024x1024 PCF soft shadow maps with clamped bias to eliminate shadow acne.

---

## 5. Configuration & Content Customization

All restaurant copy, menu items, gallery images, contact placeholders, and 3D hotspots are managed in centralized TypeScript configuration files:

### Modifying Restaurant Data: `src/config/restaurantData.ts`
```typescript
export const RESTAURANT_DATA: RestaurantConfig = {
  meta: {
    brandName: "Jalchabi",
    tagline: "A place to linger.",
    cityContext: "Kolkata, India",
    isVerified: false, // Set to true once physical premises are finalized
  },
  contact: {
    addressLine1: "Flagship Sanctuary [Location Pending Announcement]",
    city: "Kolkata",
    phoneDisplay: "+91 (033) 2400-XXXX (Configurable)",
    email: "concierge@jalchabi-kolkata.example.com",
    isDemoLocation: true,
  },
  menu: [ /* Add, remove, or modify sample dishes & prices */ ],
  gallery: [ /* Update image URLs and descriptions */ ],
};
```

### Modifying 3D Hotspots: `src/config/hotspotsData.ts`
```typescript
export const HOTSPOTS: Hotspot[] = [
  {
    id: "brew_bar",
    title: "The Specialty Brew Bar",
    category: "01 / Brew Bar",
    position: [-2.2, 1.4, 0.5], // 3D coordinates in meters
    cameraTarget: [-1.8, 1.35, 1.6],
    cameraLookAt: [-2.2, 1.2, 0.2],
    description: "Featuring a dual-group custom antique brass espresso machine...",
  },
  // Add additional 3D pins as needed
];
```

---

## 6. Sourced & Generated Asset Disclosures

- **Procedural 3D Models**: All architectural structures (facade, windows, doors, columns, beams, parquet floors, fluted counters, espresso machine, lamps, banquettes, chairs, tables) are custom-engineered procedural 3D meshes created specifically for this project without proprietary models or paid external subscriptions.
- **AI Concept Imagery**:
  - `public/images/jalchabi-exterior-dusk.jpg`: High-resolution architectural concept render of the dusk facade on wet Kolkata stone pavement.
  - `public/images/jalchabi-interior-concept.jpg`: High-resolution architectural concept render of the fluted walnut brew bar and banquettes.
  - Sourced and generated for concept visualization purposes only; clearly labeled with AI Concept indicators in accordance with creative direction.

---

## 7. Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "jalchabi cafee and Restaurant"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
# Opens on http://localhost:5173/
```

### Production Build
```bash
npm run build
# Compiles TypeScript and builds optimized production bundles into dist/
```

### Local Production Preview
```bash
npm run preview
# Serves the production build on http://localhost:4173/
```

### Automated End-to-End Browser Testing
```bash
npm run test:browser
# Runs headless Chrome with WebGL enabled, captures 11 end-to-end verification screenshots into verification_screenshots/
```

---

## 8. Verification Screenshots

The project has been tested and verified across desktop and mobile viewports with GPU acceleration enabled:

| Screenshot | Description |
| :--- | :--- |
| `01_establishing_exterior.png` | Shot 1: Establishing dusk facade, street gas lamp, tagline, and "ENTER JALCHABI" CTA |
| `02_interior_reveal.png` | Shot 4: Interior reveal showing fluted bar counter, banquette booth, and interactive HUD |
| `03_brew_bar_preset.png` | Guided preset view focusing on the custom brass espresso machine and brew station |
| `04_hotspot_modal_open.png` | Interactive 3D hotspot slide-over card open with narrative details and action link |
| `05_banquette_seating.png` | Guided preset view focusing on the forest green channel-tufted banquette booth |
| `06_menu_section.png` | Curated artisanal menu with dietary filters, calorie counts, and sample badges |
| `07_menu_filtered.png` | Instant category filtering showing signature coffee roasts |
| `08_gallery_section.png` | Concept visual gallery with AI concept badges and category filters |
| `09_visit_kolkata.png` | Kolkata cultural context, weekly operating rhythms, and facility amenities |
| `10_reservation_confirmation.png` | Concierge booking simulation with reference voucher (`JAL-CC-XXXX`) and confetti |
| `11_mobile_establishing.png` | Mobile viewport (390x844) responsive verification with adaptive typography |

---

## 9. License

This project is a conceptual architectural and web prototype developed for **Jalchabi Cafe & Restaurant, Kolkata**. Open source code is distributed under the MIT License.
