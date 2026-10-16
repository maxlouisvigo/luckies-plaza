import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = ({ t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footer = t?.footer;

  return (
    <footer className="w-full py-8 px-6 bg-brand-umber-dark text-white/70 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© 2026 <span className="font-bold text-white">Maximilianus Louis Vigo F.</span> (Louis Vigo) — {footer?.rights || 'All Rights Reserved.'}</p>
          <p className="text-[11px] text-white/50 mt-0.5">{footer?.subtitle || 'Designed with Visual Mastery & Built for High-Impact Communication.'}</p>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          title="Back to top"
        >
          <span>{footer?.backToTop || 'Back to Top'}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
