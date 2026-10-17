import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { CoverSection } from './components/CoverSection';
import { AboutSection } from './components/AboutSection';
import { CVSection } from './components/CVSection';
import { ContentsNav } from './components/ContentsNav';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { CVModal } from './components/CVModal';
import { CustomCursor } from './components/CustomCursor';
import { MarqueeTicker } from './components/MarqueeTicker';
import { MobileFloatingDock } from './components/MobileFloatingDock';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Analytics } from '@vercel/analytics/react';
import { portfolioTranslations, portfolioData } from './data/portfolioData';

export function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('vigo_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const [langChanging, setLangChanging] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('Cover');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    slides: [],
    currentIndex: 0
  });

  // Enable momentum-damped smooth scrolling on desktop mousewheels
  useSmoothScroll();

  // Smooth language switch handler with soft dissolve fade & tactile toast
  const handleToggleLang = (newLang) => {
    if (newLang === lang) return;
    setLangChanging(true);

    setTimeout(() => {
      setLang(newLang);
      setToastMessage(newLang === 'en' ? 'Switched to English 🌐' : 'Beralih ke Bahasa Indonesia 🇮🇩');
      setTimeout(() => {
        setLangChanging(false);
      }, 50);
    }, 90);
  };

  // Auto-dismiss micro-toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Sync lang to localStorage and document tag
  useEffect(() => {
    try {
      localStorage.setItem('vigo_lang', lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = portfolioTranslations[lang] || portfolioTranslations.en;

  // ScrollSpy to update "Visual Portfolio — [Current Section]" in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section]');
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          const sectionName = section.getAttribute('data-section');
          if (sectionName) {
            setActiveSection(sectionName);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (slides, index = 0) => {
    setLightbox({
      isOpen: true,
      slides,
      currentIndex: index
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (newIndex) => {
    setLightbox(prev => ({ ...prev, currentIndex: newIndex }));
  };

  return (
    <div className="relative min-h-screen bg-brand-orange text-white overflow-x-hidden">
      {/* Interactive Magnetic & Ambient Halo Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Sticky Top Header */}
      <Navbar 
        activeSection={activeSection} 
        lang={lang} 
        onToggleLang={handleToggleLang} 
        onOpenCV={() => setIsCVModalOpen(true)}
        t={t} 
      />

      {/* Main Content with Smooth Soft Crossfade on Language Change */}
      <main className={`transition-opacity duration-200 ease-out ${langChanging ? 'opacity-85' : 'opacity-100'}`}>
        {/* Page 1: Cover */}
        <CoverSection t={t} />

        {/* Kinetic Infinite Marquee 1 */}
        <MarqueeTicker lang={lang} />

        {/* Page 2: About / Intro */}
        <AboutSection lang={lang} t={t} />

        {/* Page 3: Curriculum Vitae */}
        <CVSection t={t} onOpenCV={() => setIsCVModalOpen(true)} />

        {/* Page 4: Contents Navigation */}
        <ContentsNav t={t} />

        {/* Featured Projects / Case Studies */}
        <div id="projects-container">
          {t.projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
              t={t}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {/* Kinetic Infinite Marquee 2 (Reverse Flow) */}
        <MarqueeTicker lang={lang} reverse={true} />

        {/* Page 15: Thank You & Contact */}
        <ContactSection lang={lang} t={t} onOpenCV={() => setIsCVModalOpen(true)} />

        {/* Footer */}
        <Footer t={t} />
      </main>

      {/* Fullscreen High-Resolution Slide Inspection Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        slides={lightbox.slides}
        currentIndex={lightbox.currentIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />

      {/* In-Web Curriculum Vitae Inspection & Download Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        lang={lang}
        t={t}
      />

      {/* Floating Glass Island / Dock for Mobile View */}
      <MobileFloatingDock
        activeSection={activeSection}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenCV={() => setIsCVModalOpen(true)}
        t={t}
      />

      {/* Floating Micro-Toast for Tactile Feedback on Language Switch */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="px-4 py-2 rounded-full bg-[#3D1504]/90 backdrop-blur-xl border border-white/25 text-white text-xs font-bold tracking-wide shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Official Vercel Web Analytics Sensor */}
      <Analytics />
    </div>
  );
}

export default App;
