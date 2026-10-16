import React, { useState, useEffect } from 'react';
import { Download, MessageCircle, Menu, X, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar = ({ activeSection, lang = 'en', onToggleLang, t = portfolioData }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t?.nav?.about || 'About', href: '#about' },
    { label: t?.nav?.cv || 'Curriculum Vitae', href: '#cv' },
    { label: t?.nav?.works || 'Featured Works', href: '#works' },
    { label: t?.nav?.contact || 'Contact', href: '#contact' },
  ];

  const profile = t?.profile || portfolioData.profile;

  // Language Pill Switch
  const LanguageToggle = ({ className = '' }) => (
    <div className={`inline-flex items-center bg-black/25 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => onToggleLang && onToggleLang('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 select-none ${
          lang === 'en'
            ? 'bg-white text-brand-orange shadow-md font-extrabold'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onToggleLang && onToggleLang('id')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 select-none ${
          lang === 'id'
            ? 'bg-white text-brand-orange shadow-md font-extrabold'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
        title="Bahasa Indonesia"
      >
        ID
      </button>
    </div>
  );

  return (
    <>
      {/* Top scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-brand-umber/40">
        <div 
          className="h-full bg-white transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F05A22]/95 backdrop-blur-md shadow-md py-3 border-b border-white/15' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Title: Exactly "Visual Portfolio — [Section]" */}
          <div className="flex items-center space-x-3 text-white">
            <span className="font-semibold text-sm md:text-base tracking-wide flex items-center">
              <span>{t?.nav?.viewPdf || 'Visual Portfolio'}</span>
              <span className="mx-2.5 text-white/60 font-light">—</span>
              <span className="font-light tracking-wider capitalize text-white/90">
                {activeSection || 'Cover'}
              </span>
            </span>
          </div>

          {/* Right Header Navigation & Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-7">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
              {/* Language Switcher Pill */}
              <LanguageToggle />

              <a
                href={profile.contact.cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-orange border border-white/30 transition-all duration-200 shadow-sm"
                title="Download CV (PDF)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t?.nav?.downloadCv || 'CV (PDF)'}</span>
              </a>

              <a
                href={profile.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#5C2208] hover:bg-[#3D1504] text-white transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t?.nav?.letsTalk || "Let's Talk"}</span>
              </a>

              <span className="text-white font-bold text-sm tracking-wide ml-1">
                {profile.displayName || 'Louis Vigo'}
              </span>
            </div>
          </div>

          {/* Mobile Right Controls: Language Pill + Name + Hamburger Button */}
          <div className="md:hidden flex items-center space-x-2.5">
            {/* Quick Language Switcher on Mobile Top Bar */}
            <LanguageToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F05A22] border-b border-white/20 px-6 py-5 shadow-2xl animate-fade-in">
            <nav className="flex flex-col space-y-4 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-brand-umber transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 border-t border-white/20 flex flex-col space-y-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Language / Bahasa
                  </span>
                  <LanguageToggle />
                </div>

                <a
                  href={profile.contact.cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-white text-brand-orange font-bold text-sm shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>{t?.cv?.downloadButton || 'Download CV (PDF)'}</span>
                </a>
                
                <a
                  href={profile.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#5C2208] text-white font-bold text-sm shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t?.contact?.chatWhatsapp || 'Chat via WhatsApp'}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
