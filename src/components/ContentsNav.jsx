import React from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ContentsNav = () => {
  return (
    <section 
      id="works" 
      data-section="Contents"
      className="relative py-24 px-6 md:px-12 bg-brand-orange text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Page 4 Title: "Contents" in deep terracotta accent */}
        <div className="mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70 block mb-2">
            Table of Deliverables & Case Studies
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-brand-umber font-sans select-none">
            Contents
          </h2>
        </div>

        {/* 2-Column Grid exactly like Page 4 of PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-12">
          {portfolioData.projects.map((proj, idx) => (
            <a 
              key={proj.id}
              href={`#project-${proj.id}`}
              className="group block p-6 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-white/50 tracking-widest uppercase mb-1 block">
                    Case Study 0{idx + 1} • {proj.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-brand-cream transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm md:text-base font-serif italic text-white/80 mt-1">
                    {proj.subtitle}
                  </p>
                </div>

                <div className="p-3 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-brand-orange transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                {proj.deliverables.slice(0, 2).map((item) => (
                  <span 
                    key={item}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-black/20 text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
