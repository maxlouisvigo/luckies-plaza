import React, { useState } from 'react';
import { 
  ZoomIn, 
  Layers, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const ProjectShowcase = ({ project, index, onOpenLightbox }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <section 
      id={`project-${project.id}`}
      data-section={project.title}
      className="relative py-28 px-6 md:px-12 bg-brand-orange text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Project Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-12 pb-4 border-b border-white/15">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-md bg-brand-umber text-white font-mono text-xs font-bold uppercase tracking-widest">
              0{index + 1}
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">
              {project.category}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/70">
              {project.period}
            </span>
          </div>

          <div className="text-xs text-white/70 italic font-serif">
            {project.subtitle}
          </div>
        </div>

        {/* Main Content Layout: Left Story / Right Interactive Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Strategic Storytelling (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Title & Tagline */}
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-sans">
                {project.title}
              </h3>
              <p className="text-base md:text-lg font-serif italic text-white/90 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Scope / Role */}
            <div className="space-y-2">
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Creative Focus */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-white" />
                <span>Creative Focus</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                {project.focus}
              </p>
            </div>

            {/* Challenge & Strategic Solution */}
            <div className="p-4 rounded-xl bg-black/15 border border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-white" />
                <span>The Challenge & Strategic Solution</span>
              </div>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Key Deliverables Pills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Key Deliverables</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item) => (
                  <span 
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/15 text-white border border-white/20 font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats / Highlights */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {project.stats.map((st) => (
                  <div key={st.label} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white truncate">{st.value}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5 truncate">{st.label}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Interactive Visual Showcase & Lightbox Preview (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Slide Navigation Tabs */}
            <div className="flex items-center space-x-3">
              {project.slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                    activeSlideIndex === idx
                      ? 'bg-white text-brand-orange shadow-md'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span>Slide 0{idx + 1}</span>
                  <span className="text-[10px] opacity-70">
                    ({idx === 0 ? 'Digital & Strategy' : 'Print & Collateral'})
                  </span>
                </button>
              ))}

              <button
                onClick={() => onOpenLightbox(project.slides, activeSlideIndex)}
                className="ml-auto inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white border border-white/20 transition-all"
                title="Fullscreen inspection"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Fullscreen</span>
              </button>
            </div>

            {/* Active Visual Canvas */}
            <div 
              onClick={() => onOpenLightbox(project.slides, activeSlideIndex)}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/10 border border-white/20 cursor-pointer group"
            >
              <img 
                src={project.slides[activeSlideIndex].src}
                alt={project.slides[activeSlideIndex].caption}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <div className="p-3.5 rounded-full bg-brand-orange text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300 mb-2">
                  <ZoomIn className="w-6 h-6" />
                </div>
                <p className="text-white font-bold text-sm">
                  Click to Inspect High-Resolution Slide
                </p>
                <p className="text-white/70 text-xs mt-1 max-w-md">
                  {project.slides[activeSlideIndex].caption}
                </p>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs flex items-center justify-between border border-white/10">
                <span className="truncate pr-2 font-medium">
                  {project.slides[activeSlideIndex].caption}
                </span>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Slide {activeSlideIndex + 1}/{project.slides.length}
                </span>
              </div>
            </div>

            {/* Alternate Slide Preview Thumbnails */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {project.slides.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    activeSlideIndex === idx 
                      ? 'border-white shadow-lg ring-2 ring-white/30' 
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={s.src} 
                    alt={s.caption} 
                    className="w-full h-28 md:h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <p className="text-[11px] font-bold text-white truncate">
                      {idx === 0 ? 'Digital & Campaign' : 'Print & Collateral'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
