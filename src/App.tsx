import React, { useState } from 'react';
import { HotspotInfo, QualitySettings } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ScrollytellingExperience } from './components/ui/ScrollytellingExperience';
import { MobileHeroSection } from './components/ui/MobileHeroSection';
import { MobileMenuSheet } from './components/ui/MobileMenuSheet';
import { Navbar } from './components/ui/Navbar';
import { ConceptStorySection } from './components/ui/ConceptStorySection';
import { FounderStorySection } from './components/ui/FounderStorySection';
import { WhyJalchabiSection } from './components/ui/WhyJalchabiSection';
import { FoodMarqueeBridge } from './components/ui/FoodMarqueeBridge';
import { OrbitalDishShowcase } from './components/ui/OrbitalDishShowcase';
import { MenuSection } from './components/ui/MenuSection';
import { BengalCulinaryGlossary } from './components/ui/BengalCulinaryGlossary';
import { MobileQuickActionDock } from './components/ui/MobileQuickActionDock';
import { PromotionalOffersSection } from './components/ui/PromotionalOffersSection';
import { CustomerReviewsSection } from './components/ui/CustomerReviewsSection';
import { ProvenanceMarqueeSection } from './components/ui/ProvenanceMarqueeSection';
import { GallerySection } from './components/ui/GallerySection';
import { VisitSection } from './components/ui/VisitSection';
import { ReservationSection } from './components/ui/ReservationSection';
import { Footer } from './components/ui/Footer';
import { OrderCheckoutModal } from './components/ui/OrderCheckoutModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { FloatingCartButton } from './components/ui/FloatingCartButton';
import { HotspotModal } from './components/ui/HotspotModal';
import { AccessibilityModal } from './components/ui/AccessibilityModal';
import { WebGLFallback } from './components/ui/WebGLFallback';
import { isWebGLAvailable } from './utils/webgl';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { AmbientCursorGlow } from './components/ui/AmbientCursorGlow';
import { RealWorldPortalExperience } from './components/ui/RealWorldPortalExperience';
import { SolarTimePreset, getKolkataAutoSolarPreset } from './config/solarLighting';
import { detectDeviceCapabilities, isHighEndMobile } from './utils/devicePerformance';
import { soundFoley } from './utils/soundFoley';

export const AppContent: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [webGLSupported] = useState<boolean>(() => isWebGLAvailable());

  // Phase 3: Mobile-First Optimization Mode
  // Mobile (<768px): Defaults to fast mode on low/mid-range phones, 3D on high-end flagships.
  // Desktop/Tablet (≥768px): Always full 3D mode (mobileFirstMode = false).
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  const [mobileFirstMode, setMobileFirstMode] = useState<boolean>(() => {
    if (!isMobileDevice) return false;
    try {
      const saved = localStorage.getItem('jalchabi_mobile_mode');
      if (saved !== null) return saved === 'fast';
    } catch { /* ignore */ }
    return !isHighEndMobile();
  });

  const [isMobileMenuSheetOpen, setIsMobileMenuSheetOpen] = useState(false);

  const handleEnable3D = () => {
    setMobileFirstMode(false);
    try { localStorage.setItem('jalchabi_mobile_mode', '3d'); } catch { /* ignore */ }
  };

  const handleEnableFastMode = () => {
    setMobileFirstMode(true);
    try { localStorage.setItem('jalchabi_mobile_mode', 'fast'); } catch { /* ignore */ }
  };

  // Reference for off-screen viewport intersection to suspend WebGL rendering
  const [isCanvasVisible] = useState(true);

  // Initialize adaptive graphics profile based on real device capabilities
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>(() => {
    return detectDeviceCapabilities().recommendedSettings;
  });

  // Apple-grade smooth momentum scroll engine
  const { scrollTo } = useSmoothScroll({
    reducedMotion: qualitySettings.reducedMotion,
  });

  // Action inside Hotspot Modal
  const handleHotspotAction = (targetSectionId: string) => {
    setActiveHotspot(null);
    scrollTo(`#${targetSectionId}`, { offset: -70 });
  };

  const [solarPreset, setSolarPreset] = useState<SolarTimePreset>('golden_hour');
  const [isAutoSolar, setIsAutoSolar] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string>('cozy-booth');

  // Sync Web Audio foley mute with qualitySettings.soundEnabled
  React.useEffect(() => {
    soundFoley.setMuted(!qualitySettings.soundEnabled);
  }, [qualitySettings.soundEnabled]);

  // Handle live Kolkata solar tracking when Auto mode is enabled
  React.useEffect(() => {
    if (isAutoSolar) {
      setSolarPreset(getKolkataAutoSolarPreset());
      const timer = setInterval(() => {
        setSolarPreset(getKolkataAutoSolarPreset());
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [isAutoSolar]);

  // Interactive 3D Table Selection
  const handleSelectTable = (seatingId: string) => {
    setSelectedTableId(seatingId);
    scrollTo('#reservations', { offset: -70 });
  };

  // Audio Toggle
  const handleToggleSound = () => {
    setQualitySettings((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#070e0c] text-[#fdfbf7] selection:bg-[#dfb86c] selection:text-[#070e0c]">
      {/* Apple-style Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Navigation with dynamic elevation on scroll & Language Switcher */}
      <Navbar
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onEnter3D={() => {
          scrollTo(0);
        }}
        soundEnabled={qualitySettings.soundEnabled}
        onToggleSound={handleToggleSound}
        mobileFirstMode={mobileFirstMode}
        onToggleMobileFirstMode={mobileFirstMode ? handleEnable3D : handleEnableFastMode}
      />

      {/* Hero: Mobile-First Hero on mobile fast-mode, full 3D Scrollytelling on desktop/tablets or when explicitly toggled */}
      {isMobileDevice && mobileFirstMode ? (
        <MobileHeroSection
          onOrderClick={() => setIsMobileMenuSheetOpen(true)}
          onNavigateSection={(sectionId) => scrollTo(`#${sectionId}`, { offset: -70 })}
          onEnable3D={handleEnable3D}
        />
      ) : webGLSupported ? (
        <ScrollytellingExperience
          qualitySettings={qualitySettings}
          onToggleSound={handleToggleSound}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onNavigateSection={(sectionId) => scrollTo(`#${sectionId}`, { offset: -70 })}
          isCanvasVisible={isCanvasVisible}
          isVideoModalOpen={isVideoModalOpen}
          solarPreset={solarPreset}
          isAutoSolar={isAutoSolar}
          onSelectSolarPreset={(preset) => {
            setIsAutoSolar(false);
            setSolarPreset(preset);
          }}
          onToggleAutoSolar={() => setIsAutoSolar((prev) => !prev)}
          onSelectTable={handleSelectTable}
          selectedTableId={selectedTableId}
        />
      ) : (
        <WebGLFallback
          onExploreClick={() => {
            const el = document.getElementById('story');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Concept Architectural Story */}
      <ConceptStorySection />

      {/* Founder Sabir Hossen Khan's Story & Leadership Recognition */}
      <FounderStorySection />

      {/* Why Jalchabi is Canning II's #1 Sanctuary vs Local Competitors */}
      <WhyJalchabiSection />

      {/* Cafeine-Style Fraunces Kinetic Typographic Marquee Bridge */}
      <FoodMarqueeBridge />

      {/* Mobile-Optimized Orbital Signature Dish Showcase (Fraunces Editorial Typography) */}
      <OrbitalDishShowcase />

      {/* Authentic Cafe Menu (Momos, Drums of Heaven, Fish Fry, Rolls, Biryani) */}
      <MenuSection />

      {/* Cultural Heritage & Culinary Glossary (Persona 3 Outside Bengal diners) */}
      <BengalCulinaryGlossary />

      {/* Weekend Specials & Promotional Value Combos with Live Countdown */}
      <PromotionalOffersSection />

      {/* Provenance Marquee */}
      <ProvenanceMarqueeSection />

      {/* Gallery Section */}
      <GallerySection onOpenVideoModal={() => setIsVideoModalOpen(true)} />

      {/* Customer Reviews & 4.9 Star Social Proof */}
      <CustomerReviewsSection />

      {/* Visit Sarberia, Atharobanki, Canning II */}
      <VisitSection />

      {/* Reservation Concierge */}
      <ReservationSection
        onSuccessModal={() => {}}
        selectedSeatingId={selectedTableId}
      />

      {/* Footer with Sabir Hossen Khan & Rizwan Khan Credits */}
      <Footer onOpenAccessibility={() => setIsAccessibilityOpen(true)} />

      {/* Real-time Order Cart Floating Button & Drawers */}
      <FloatingCartButton />
      <CartDrawer />
      <OrderCheckoutModal />

      {/* Phase 4: Zomato-style Mobile Menu Bottom Sheet */}
      <MobileMenuSheet
        isOpen={isMobileMenuSheetOpen}
        onClose={() => setIsMobileMenuSheetOpen(false)}
      />

      {/* Animmaster-inspired Ambient Mouse Glow (Desktop Viewports) */}
      <AmbientCursorGlow />

      {/* Interactive Modals */}
      <HotspotModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
        onActionClick={handleHotspotAction}
      />

      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        qualitySettings={qualitySettings}
        setQualitySettings={setQualitySettings}
      />

      {/* Google Gemini AI Real-World Veranda Portal Experience */}
      <RealWorldPortalExperience
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onNavigateSection={(sectionId) => scrollTo(`#${sectionId}`, { offset: -70 })}
      />

      {/* Floating 1-Tap Mobile Conversion Quick Action Dock (Persona 1 Owner & Highway Travelers) */}
      <MobileQuickActionDock
        onNavigateSection={(sectionId) => scrollTo(`#${sectionId}`, { offset: -70 })}
        onOpenMenuSheet={() => setIsMobileMenuSheetOpen(true)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
