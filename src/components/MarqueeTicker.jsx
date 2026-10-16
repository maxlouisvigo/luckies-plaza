import React from 'react';

export const MarqueeTicker = ({ lang = 'en', reverse = false, className = '' }) => {
  const itemsEn = [
    { text: "VISUAL SPECIALIST", italic: false },
    { text: "Art Direction", italic: true },
    { text: "7+ YEARS TRACK RECORD", italic: false },
    { text: "22K+ Viral Engagement", italic: true },
    { text: "BRAND IDENTITY ARCHITECTURE", italic: false },
    { text: "Clinical & Healthcare Visuals", italic: true },
    { text: "FMCG & RETAIL PACKAGING", italic: false },
    { text: "Mass Event Art Direction", italic: true }
  ];

  const itemsId = [
    { text: "SPESIALIS VISUAL", italic: false },
    { text: "Art Direction Strategis", italic: true },
    { text: "7+ TAHUN PENGALAMAN", italic: false },
    { text: "22K+ Viral Engagement", italic: true },
    { text: "ARSITEKTUR IDENTITAS BRAND", italic: false },
    { text: "Komunikasi Medis & Kesehatan", italic: true },
    { text: "DESAIN KEMASAN F&B & RITEL", italic: false },
    { text: "Art Direction Event Massal", italic: true }
  ];

  const items = lang === 'id' ? itemsId : itemsEn;

  // Repeat sequence 4 times to guarantee seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden py-4 bg-[#5C2208] border-y border-white/20 select-none shadow-inner ${className}`}>
      {/* Subtle edge fade overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[#5C2208] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[#5C2208] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 md:space-x-8 shrink-0 px-3 md:px-4">
            <span 
              className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-colors text-white/95 ${
                item.italic ? 'font-serif italic font-light tracking-widest text-brand-cream' : 'font-sans font-extrabold'
              }`}
            >
              {item.text}
            </span>
            <span className="text-white/40 text-xs select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
