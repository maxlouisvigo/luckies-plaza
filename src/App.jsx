import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CoverSection } from './components/CoverSection';
import { AboutSection } from './components/AboutSection';
import { CVSection } from './components/CVSection';
import { ContentsNav } from './components/ContentsNav';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { portfolioData } from './data/portfolioData';

export function App() {
  const [activeSection, setActiveSection] = useState('Cover');
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    slides: [],
    currentIndex: 0
  });

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
      {/* Sticky Top Header */}
      <Navbar activeSection={activeSection} />

      {/* Page 1: Cover */}
      <CoverSection />

      {/* Page 2: About / Intro */}
      <AboutSection />

      {/* Page 3: Curriculum Vitae */}
      <CVSection />

      {/* Page 4: Contents Navigation */}
      <ContentsNav />

      {/* Featured Projects / Case Studies */}
      <div id="projects-container">
        {portfolioData.projects.map((project, index) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            index={index}
            onOpenLightbox={openLightbox}
          />
        ))}
      </div>

      {/* Page 15: Thank You & Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Fullscreen High-Resolution Slide Inspection Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        slides={lightbox.slides}
        currentIndex={lightbox.currentIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}

export default App;
