import React from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Download, 
  MessageCircle, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export const ContactSection = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#F05A22', '#FFFFFF', '#5C2208', '#FFD166']
    });
  };

  return (
    <section 
      id="contact" 
      data-section="Contact"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-brand-orange text-white flex flex-col justify-between items-center text-center border-t border-white/10 overflow-hidden"
    >
      {/* Background subtle cross-stitch texture */}
      <div className="absolute inset-0 stitch-bg opacity-30 pointer-events-none" />

      {/* Decorative top badge */}
      <div className="z-10 pt-4">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/15 text-white border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Available for New Projects & Full-Time Roles</span>
        </span>
      </div>

      {/* Centerpiece: The Iconic Page 15 Typography */}
      <div className="z-10 my-auto py-12 max-w-4xl w-full">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-umber tracking-tight font-sans leading-none mb-2 select-none">
          Thank You!
        </h2>
        
        <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white tracking-wide font-normal mt-2">
          Let's Work Together
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <a
            href={portfolioData.profile.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerConfetti}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-brand-umber hover:bg-brand-umber-dark text-white font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat via WhatsApp</span>
          </a>

          <a
            href={`mailto:${portfolioData.profile.contact.email}?subject=Project%20Inquiry%20via%20Portfolio&body=Halo%20Louis%20Vigo%2C%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20project...`}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-white text-brand-orange hover:bg-brand-cream font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <Mail className="w-5 h-5" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Direct Download Portfolio & CV */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={portfolioData.profile.contact.portfolioPdf}
            download
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-semibold border border-white/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 2026 Portfolio (PDF)</span>
          </a>

          <a
            href={portfolioData.profile.contact.cvPdf}
            download
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-semibold border border-white/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Curriculum Vitae (PDF)</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Exact Recreation of Page 15 Footer */}
      <div className="z-10 w-full max-w-5xl pt-10 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        
        {/* Left: Phone */}
        <a 
          href={portfolioData.profile.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20">
            <Phone className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-wider font-mono text-base">
            {portfolioData.profile.contact.phone}
          </span>
        </a>

        {/* Middle: Socials */}
        <div className="flex items-center space-x-6 text-xs uppercase tracking-wider font-semibold">
          <a 
            href={portfolioData.profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center space-x-1"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a 
            href={portfolioData.profile.contact.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center space-x-1"
          >
            <span>Behance</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Right: Email */}
        <a 
          href={`mailto:${portfolioData.profile.contact.email}`}
          className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20">
            <Mail className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-wider font-mono text-sm">
            {portfolioData.profile.contact.email}
          </span>
        </a>

      </div>
    </section>
  );
};
