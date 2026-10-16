import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Languages, 
  Download, 
  ExternalLink,
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CVSection = () => {
  return (
    <section 
      id="cv" 
      data-section="Curriculum Vitae"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-brand-orange text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
              Credentials & Track Record
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
              Curriculum Vitae
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={portfolioData.profile.contact.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-brand-orange font-bold text-sm shadow-md hover:bg-brand-cream hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Official CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* 2-Column Grid recreating Page 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Education, Software Competences, Languages (5 Cols) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* 1. Education */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2.5 border-b border-white/20 pb-3">
                <GraduationCap className="w-5 h-5 text-white" />
                <h3 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-white font-sans">
                  Education
                </h3>
              </div>

              <div className="space-y-5">
                {portfolioData.education.map((edu) => (
                  <div 
                    key={edu.degree}
                    className="p-4 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                      <span>{edu.period}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">
                      {edu.institution}
                    </h4>
                    <p className="text-sm font-medium text-white/90 mt-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                      {edu.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Software Competences */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2.5 border-b border-white/20 pb-3">
                <Cpu className="w-5 h-5 text-white" />
                <h3 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-white font-sans">
                  Software Competences
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {portfolioData.softwareCompetences.map((tool) => (
                  <div 
                    key={tool.name}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{tool.name}</span>
                    </div>
                    <span className="text-[10px] text-white/60 tracking-wide mt-1 block uppercase">
                      {tool.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Languages */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5 border-b border-white/20 pb-3">
                <Languages className="w-5 h-5 text-white" />
                <h3 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-white font-sans">
                  Languages
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {portfolioData.languages.map((lang) => (
                  <div 
                    key={lang.name}
                    className="p-3.5 rounded-xl bg-white/10 border border-white/15"
                  >
                    <p className="font-bold text-sm text-white">{lang.name}</p>
                    <p className="text-xs text-white/80 mt-0.5">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Work Experiences Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2.5 border-b border-white/20 pb-3">
              <Briefcase className="w-5 h-5 text-white" />
              <h3 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-white font-sans">
                Work Experiences
              </h3>
            </div>

            <div className="space-y-6">
              {portfolioData.workExperiences.map((exp, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 md:gap-5 group"
                >
                  {/* Timeline Column: Guaranteed 100% Coaxial Alignment */}
                  <div className="flex flex-col items-center self-stretch shrink-0 w-6">
                    {/* Concentric Timeline Dot */}
                    <div className="w-5 h-5 rounded-full bg-brand-orange border-2 border-white flex items-center justify-center shadow-md group-hover:scale-125 transition-transform duration-200 mt-2 shrink-0 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    {/* Connecting Vertical Line */}
                    {index !== portfolioData.workExperiences.length - 1 && (
                      <div className="w-[2px] bg-white/25 grow my-1" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div className="grow p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white font-bold text-xs">
                        {exp.period}
                      </span>
                      <span className="text-xs text-white/70">
                        {exp.location}
                      </span>
                    </div>

                    <h4 className="text-xl font-extrabold text-white">
                      {exp.company}
                    </h4>

                    <p className="text-sm font-semibold text-white/90 mt-0.5">
                      {exp.role}
                    </p>

                    <p className="text-xs md:text-sm text-white/80 mt-2 leading-relaxed">
                      {exp.description}
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
