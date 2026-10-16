import React from 'react';
import { 
  ZoomIn, 
  Layers, 
  Target, 
  Lightbulb, 
  Maximize2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const ProjectShowcase = ({ project, index, onOpenLightbox }) => {
  // Collect all inspectable assets for this project
  const allInspectable = [
    { src: project.heroMockup, caption: `${project.title} — ${project.heroMockupAlt || 'Digital Mockup'}` },
    ...(project.secondaryMockup ? [{ src: project.secondaryMockup, caption: `${project.title} — ${project.secondaryTitle}` }] : []),
    ...(project.deliverablesGallery || []).map(d => ({ src: d.src, caption: `${project.title} — ${d.title} (${d.category})` }))
  ];

  return (
    <section 
      id={`project-${project.id}`}
      data-section={project.title}
      className="relative py-28 px-6 md:px-12 bg-brand-orange text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full space-y-20">
        
        {/* ========================================================================= */}
        {/* PART 1: HERO STAGE — NATIVE EDITORIAL STORY & TRANSPARENT DEVICE MOCKUP */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Creative Direction Narrative (5 Cols) */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Project Index & Category Pill */}
            <div className="flex items-center space-x-3.5">
              <span className="px-3 py-1 rounded-md bg-brand-umber text-white font-mono text-xs font-bold uppercase tracking-widest shadow-sm">
                Case Study 0{index + 1}
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                {project.category}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70">
                {project.period}
              </span>
            </div>

            {/* Title with Brand Logo */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                {project.logo && (
                  <div className="p-2 rounded-xl bg-white/15 border border-white/20 shadow-md flex items-center justify-center shrink-0">
                    <img 
                      src={project.logo} 
                      alt={`${project.title} Logo`} 
                      className="h-10 w-auto object-contain drop-shadow"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-sans leading-none">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg font-serif italic text-white/90 mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Scope / Role Description */}
            <p className="text-white/90 text-sm md:text-base leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Creative Focus */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-white" />
                <span>Creative Focus</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                {project.focus}
              </p>
            </div>

            {/* Challenge & Strategic Solution */}
            <div className="p-4 rounded-xl bg-black/15 border border-white/10 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-white" />
                <span>The Challenge & Strategic Solution</span>
              </div>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Key Deliverables Tags */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Core Deliverables</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item) => (
                  <span 
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/20 font-medium shadow-sm"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {project.stats.map((st) => (
                  <div key={st.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white truncate">{st.value}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5 truncate">{st.label}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Native Transparent Mockup (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div 
              onClick={() => onOpenLightbox(allInspectable, 0)}
              className="relative w-full max-w-2xl cursor-pointer group flex flex-col items-center"
            >
              {/* Native Transparent Mockup directly on canvas */}
              <div className="relative transform transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                <img 
                  src={project.heroMockup} 
                  alt={project.heroMockupAlt || project.title}
                  className="w-full h-auto max-h-[550px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                />

                {/* Hover Click to Zoom Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 rounded-full bg-brand-umber text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-transform flex items-center space-x-2 px-5 py-2.5 border border-white/30">
                    <ZoomIn className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Inspect Fullscreen</span>
                  </div>
                </div>
              </div>

              {/* Caption Tag */}
              <p className="text-xs text-white/70 text-center mt-4 tracking-wide font-medium">
                {project.heroMockupAlt || 'Click mockup to inspect in full resolution'}
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* PART 2: DELIVERABLES STAGE — REAL PRINT, FLYERS, POSTERS & PACKAGING GRID */}
        {/* ========================================================================= */}
        {project.deliverablesGallery && project.deliverablesGallery.length > 0 && (
          <div className="pt-12 border-t border-white/15 space-y-8">
            
            {/* Header for Deliverables */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/70 block">
                  Campaign Output & Production Assets
                </span>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                  {project.secondaryTitle || 'Individual Deliverables & Collateral'}
                </h4>
              </div>

              <span className="text-xs text-white/60">
                Click any piece to inspect detail & typography
              </span>
            </div>

            {/* Split view: If there's a standing banner or large vertical mockup */}
            {project.secondaryMockup ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Standing Banner / Large Signage (4 Cols) */}
                <div 
                  onClick={() => onOpenLightbox(allInspectable, 1)}
                  className="lg:col-span-4 rounded-2xl bg-black/10 border border-white/15 p-4 flex flex-col items-center justify-center cursor-pointer group hover:bg-black/20 transition-all"
                >
                  <img 
                    src={project.secondaryMockup} 
                    alt={project.secondaryTitle}
                    className="w-full max-h-[480px] object-contain drop-shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="mt-3 flex items-center space-x-1.5 text-xs text-white/80 font-semibold group-hover:text-white">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Rollup Standing Banner / Event Print</span>
                  </div>
                </div>

                {/* Right Column: Grid of Individual Posters/Carousels (8 Cols) */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.deliverablesGallery.map((item, dIdx) => (
                    <div 
                      key={dIdx}
                      onClick={() => onOpenLightbox(allInspectable, 2 + dIdx)}
                      className="group rounded-2xl overflow-hidden bg-black/15 border border-white/15 hover:border-white/40 transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer hover:bg-black/25 transform hover:-translate-y-1 shadow-md"
                    >
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/20 flex items-center justify-center relative mb-3">
                        <img 
                          src={item.src} 
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                          {item.category}
                        </span>
                        <h5 className="text-xs md:text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5 group-hover:text-brand-cream transition-colors">
                          {item.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              /* Standard Full-Width Grid (for SMC RS Telogorejo, SSH, Sambal) */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {project.deliverablesGallery.map((item, dIdx) => (
                  <div 
                    key={dIdx}
                    onClick={() => onOpenLightbox(allInspectable, 1 + dIdx)}
                    className="group rounded-2xl overflow-hidden bg-black/15 border border-white/15 hover:border-white/40 transition-all duration-300 p-3 flex flex-col justify-between cursor-pointer hover:bg-black/25 transform hover:-translate-y-1 shadow-md"
                  >
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/20 flex items-center justify-center relative mb-3">
                      <img 
                        src={item.src} 
                        alt={item.title}
                        className="w-full h-full object-contain p-1 transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                        {item.category}
                      </span>
                      <h5 className="text-xs md:text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5 group-hover:text-brand-cream transition-colors">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
