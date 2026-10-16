import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Check, 
  Copy, 
  Sparkles, 
  Compass, 
  Layers, 
  Palette, 
  Megaphone,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = ({ t = portfolioData }) => {
  const [copiedField, setCopiedField] = useState(null);

  const profile = t?.profile || portfolioData.profile;
  const about = t?.about || portfolioData.about;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const expertiseIcons = [
    <Palette className="w-4 h-4 text-white" />,
    <Compass className="w-4 h-4 text-white" />,
    <Layers className="w-4 h-4 text-white" />,
    <Megaphone className="w-4 h-4 text-white" />
  ];

  return (
    <section 
      id="about" 
      data-section="About"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-brand-orange text-white flex flex-col justify-center border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Visual Hero Banner: Clean 4K crop of Mas Lui & characters */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-14 bg-black/10 border border-white/20 group">
          <img 
            src="/assets/extracted/intro/intro_banner_4k.png" 
            alt="Louis Vigo - Visual Specialist & Art Direction" 
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Section: 3-Column Layout exactly like Page 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Column 1: Main Introduction (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/15 text-white border border-white/20">
                {about?.roleBadge || 'Creative Director & Visual Strategist'}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
                {about?.greeting || 'Hello, My name is'} <span className="font-serif italic font-normal text-white">{profile.nickname || 'Lui!'}</span>
              </h2>
            </div>

            <p className="text-white/90 text-base md:text-lg leading-relaxed font-normal text-justify md:text-left">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-black/20 text-white/90 border border-white/10">
                📍 {profile.location}
              </span>
              <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-white/20 text-white border border-white/20">
                ✨ {profile.status}
              </span>
            </div>
          </div>

          {/* Column 2: Core Expertise (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-brand-umber uppercase font-sans">
              {about?.expertiseTitle || 'Expertise'}
            </h3>

            <div className="space-y-3">
              {profile.expertise.map((item, index) => (
                <div 
                  key={item.name}
                  className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-white/20 group-hover:bg-brand-umber transition-colors">
                      {expertiseIcons[index % expertiseIcons.length]}
                    </span>
                    <h4 className="font-bold text-white text-base">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-white/75 text-xs mt-1.5 pl-8">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Let's Get In Touch (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-brand-umber uppercase font-sans">
              {about?.contactTitle || "Let's Get In Touch"}
            </h3>

            <div className="space-y-3.5">
              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20 text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                      {about?.phoneLabel || 'Phone / WhatsApp'}
                    </p>
                    <a 
                      href={profile.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:underline block"
                    >
                      {profile.contact.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(profile.contact.phoneRaw, 'phone')}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Copy number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between group">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-white/20 text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                      {about?.emailLabel || 'Email'}
                    </p>
                    <a 
                      href={`mailto:${profile.contact.email}`}
                      className="text-sm font-semibold text-white hover:underline break-all block"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(profile.contact.email, 'email')}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors shrink-0"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/20 text-white">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                      {about?.linkedinLabel || 'LinkedIn'}
                    </p>
                    <a 
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:underline flex items-center space-x-1"
                    >
                      <span>{profile.contact.linkedinHandle}</span>
                      <ArrowRight className="w-3 h-3 -rotate-45" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <a
                href={profile.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-brand-umber hover:bg-brand-umber-dark text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>{about?.hireCta || 'Hire / Start Collaboration'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
