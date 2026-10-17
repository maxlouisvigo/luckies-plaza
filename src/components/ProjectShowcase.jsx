import React, { useState, useRef, useMemo } from 'react';
import { 
  ZoomIn, 
  Layers, 
  Target, 
  Lightbulb, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

import { portfolioData } from '../data/portfolioData';
import { TiltMockup } from './TiltMockup';
import { GlassReveal } from './GlassReveal';

export const ProjectShowcase = ({ project, index, t = portfolioData, onOpenLightbox }) => {
  const p = t?.project || portfolioData.project;
  const carouselRef = useRef(null);

  // Collect all inspectable assets for this project
  const allInspectable = useMemo(() => [
    { src: project.heroMockup, caption: `${project.title} — ${project.heroMockupAlt || 'Digital Mockup'}` },
    ...(project.secondaryMockup ? [{ src: project.secondaryMockup, caption: `${project.title} — ${project.secondaryTitle}` }] : []),
    ...(project.deliverablesGallery || []).map(d => ({ src: d.src, caption: `${project.title} — ${d.title} (${d.category})` }))
  ], [project]);

  // Deliverables gallery
  const filteredGallery = useMemo(() => project.deliverablesGallery || [], [project.deliverablesGallery]);

  const handleOpenLightboxForItem = (itemSrc) => {
    const idx = allInspectable.findIndex(i => i.src === itemSrc);
    onOpenLightbox(allInspectable, idx !== -1 ? idx : 0);
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const distance = 280;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id={`project-${project.id}`}
      data-section={project.title}
      className="relative py-28 px-6 md:px-12 bg-brand-orange text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full space-y-20">
        
        {/* ========================================================================= */}
        {/* PART 1: HERO STAGE — NATIVE EDITORIAL STORY & 3D TILT DEVICE MOCKUP */}
        {/* ========================================================================= */}
        <GlassReveal delay={0.06} yOffset={24}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Creative Direction Narrative (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project Index & Category Pill */}
            <div className="flex items-center space-x-3.5">
              <span className="px-3 py-1 rounded-md bg-brand-umber text-white font-sans text-xs font-extrabold uppercase tracking-widest shadow-sm">
                {p?.caseStudyLabel || 'Case Study'} 0{index + 1}
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
                <span>{p?.creativeFocusTitle || 'Creative Focus'}</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                {project.focus}
              </p>
            </div>

            {/* Challenge & Strategic Solution */}
            <div className="p-4 rounded-xl bg-black/15 border border-white/10 space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-white" />
                <span>{p?.challengeTitle || 'The Challenge & Strategic Solution'}</span>
              </div>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Key Deliverables Tags */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{p?.coreDeliverablesTitle || 'Core Deliverables'}</span>
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

            {/* Stats: Fully responsive and NEVER truncated */}
            {project.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {project.stats.map((st) => (
                  <div key={st.label} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col justify-center">
                    <p className="text-xs md:text-sm font-bold text-white leading-snug break-words">
                      {st.value}
                    </p>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider mt-1 leading-tight break-words">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: 3D Tilt Mockup with Dynamic Glare Reflection */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center py-2">
            <div className="w-full max-w-xl xl:max-w-2xl flex flex-col items-center justify-center">
              <TiltMockup
                src={project.heroMockup}
                alt={project.heroMockupAlt || project.title}
                onClick={() => onOpenLightbox(allInspectable, 0)}
                badgeText={p?.inspectFullscreen || 'Inspect Fullscreen'}
                maxTilt={10}
                imgClassName="max-h-[460px] md:max-h-[500px] lg:max-h-[520px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
              />

              {/* Caption Tag */}
              <p className="text-xs text-white/70 text-center mt-3 tracking-wide font-medium">
                {project.heroMockupAlt || p?.clickMockupHint || 'Click mockup to inspect in full resolution'}
              </p>
            </div>
          </div>

        </div>
        </GlassReveal>

        {/* ========================================================================= */}
        {/* PART 2: DELIVERABLES STAGE — REAL PRINT, FLYERS, POSTERS & PACKAGING */}
        {/* ========================================================================= */}
        {project.deliverablesGallery && project.deliverablesGallery.length > 0 && (
          <GlassReveal delay={0.12} yOffset={24}>
            <div className="pt-12 border-t border-white/15 space-y-6">
              
              {/* Header for Deliverables */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/70 block">
                    {p?.productionTitle || 'Campaign Output & Production Assets'}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                    {project.secondaryTitle || 'Individual Deliverables & Collateral'}
                  </h4>
                </div>

                {/* Mobile Carousel Arrow Controls */}
                <div className="flex md:hidden items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white border border-white/20 active:scale-95 transition-all shadow-sm"
                    title="Previous item"
                    aria-label="Previous item"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white border border-white/20 active:scale-95 transition-all shadow-sm"
                    title="Next item"
                    aria-label="Next item"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Split view: If there's a standing banner or large vertical mockup */}
              {project.secondaryMockup ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Standing Banner / Large Signage with 3D Tilt (4 Cols) */}
                  <div className="lg:col-span-4 rounded-2xl bg-black/10 border border-white/15 p-4 flex flex-col items-center justify-center">
                    <TiltMockup
                      src={project.secondaryMockup}
                      alt={project.secondaryTitle}
                      onClick={() => onOpenLightbox(allInspectable, 1)}
                      badgeText={p?.inspectFullscreen || 'Inspect Fullscreen'}
                      maxTilt={8}
                      imgClassName="max-h-[480px] drop-shadow-xl"
                    />
                    <div className="mt-3 flex items-center space-x-1.5 text-xs text-white/80 font-semibold">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{p?.rollupBanner || 'Rollup Standing Banner / Event Print'}</span>
                    </div>
                  </div>

                  {/* Right Column: Grid on Desktop, Smooth Touch Swipe Carousel on Mobile (8 Cols) */}
                  <div className="lg:col-span-8">
                    {/* Mobile Touch Swipeable Track (Visible on < md) */}
                    <div 
                      ref={carouselRef}
                      className="flex md:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-3.5 pb-2 pt-1 px-1"
                    >
                      {filteredGallery.map((item, dIdx) => (
                        <div 
                          key={dIdx}
                          onClick={() => handleOpenLightboxForItem(item.src)}
                          className="w-[74vw] max-w-[290px] shrink-0 snap-center rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-black/35 backdrop-blur-md border border-white/25 p-3 flex flex-col justify-between cursor-pointer active:scale-95 transition-all shadow-xl group"
                        >
                          {/* Card Header: Index & Category Pill */}
                          <div className="flex items-center justify-between mb-2.5 px-0.5">
                            <span className="font-serif italic text-brand-cream text-xs font-semibold">
                              #{String(dIdx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[9px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                              {item.category}
                            </span>
                          </div>

                          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center relative mb-3 border border-white/10">
                            <img 
                              src={item.src} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 shadow">
                              <ZoomIn className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h5 className="text-xs font-bold text-white leading-snug line-clamp-2 break-words">
                              {item.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Swipe Lookbook Navigation Indicator */}
                    <div className="flex md:hidden items-center justify-between text-xs text-white/70 pt-2 px-1">
                      <span className="flex items-center space-x-1.5 font-sans font-medium text-[11px]">
                        <span className="text-brand-cream animate-pulse">✦</span>
                        <span>{t?.nav?.about === 'Tentang' ? 'Geser untuk eksplor karya' : 'Swipe to explore all'}</span>
                        <span className="text-white/40">({filteredGallery.length})</span>
                      </span>
                      <span className="text-[11px] text-white/60 font-sans font-semibold">
                        {t?.nav?.about === 'Tentang' ? 'Tap perbesar ↗' : 'Tap to expand ↗'}
                      </span>
                    </div>

                    {/* Desktop Grid Layout (Visible on >= md) */}
                    <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredGallery.map((item, dIdx) => (
                        <div 
                          key={dIdx}
                          onClick={() => handleOpenLightboxForItem(item.src)}
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
                            <h5 className="text-xs md:text-sm font-bold text-white leading-snug mt-1 group-hover:text-brand-cream transition-colors break-words">
                              {item.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* Standard Projects (RS Telogorejo, SSH, Sambal) */
                <div>
                  {/* Mobile Touch Swipeable Track */}
                  <div 
                    ref={carouselRef}
                    className="flex md:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-3.5 pb-2 pt-1 px-1"
                  >
                    {filteredGallery.map((item, dIdx) => (
                      <div 
                        key={dIdx}
                        onClick={() => handleOpenLightboxForItem(item.src)}
                        className="w-[74vw] max-w-[290px] shrink-0 snap-center rounded-2xl overflow-hidden bg-gradient-to-b from-white/15 to-black/35 backdrop-blur-md border border-white/25 p-3 flex flex-col justify-between cursor-pointer active:scale-95 transition-all shadow-xl group"
                      >
                        {/* Card Header: Index & Category Pill */}
                        <div className="flex items-center justify-between mb-2.5 px-0.5">
                          <span className="font-serif italic text-brand-cream text-xs font-semibold">
                            #{String(dIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                            {item.category}
                          </span>
                        </div>

                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center relative mb-3 border border-white/10">
                          <img 
                            src={item.src} 
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 shadow">
                            <ZoomIn className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug line-clamp-2 break-words">
                            {item.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Swipe Lookbook Navigation Indicator */}
                  <div className="flex md:hidden items-center justify-between text-xs text-white/70 pt-2 px-1">
                    <span className="flex items-center space-x-1.5 font-sans font-medium text-[11px]">
                      <span className="text-brand-cream animate-pulse">✦</span>
                      <span>{t?.nav?.about === 'Tentang' ? 'Geser untuk eksplor karya' : 'Swipe to explore all'}</span>
                      <span className="text-white/40">({filteredGallery.length})</span>
                    </span>
                    <span className="text-[11px] text-white/60 font-sans font-semibold">
                      {t?.nav?.about === 'Tentang' ? 'Tap perbesar ↗' : 'Tap to expand ↗'}
                    </span>
                  </div>

                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {filteredGallery.map((item, dIdx) => (
                      <div 
                        key={dIdx}
                        onClick={() => handleOpenLightboxForItem(item.src)}
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
                          <h5 className="text-xs md:text-sm font-bold text-white leading-snug mt-1 group-hover:text-brand-cream transition-colors break-words">
                            {item.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </GlassReveal>
        )}

      </div>
    </section>
  );
};
