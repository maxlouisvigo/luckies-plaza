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
import { GlassReveal } from './GlassReveal';

export const ContactSection = ({ lang = 'en', t = portfolioData, onOpenCV }) => {
  const profile = t?.profile || portfolioData.profile;
  const contact = t?.contact || portfolioData.contact;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#F05A22', '#FFFFFF', '#5C2208', '#FFD166']
    });
  };

  const isId = lang === 'id';

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
          <span>{contact?.badge || 'Available for New Projects & Full-Time Roles'}</span>
        </span>
      </div>

      {/* Centerpiece: The Iconic Page 15 Typography with Frosted Glass Entrance */}
      <GlassReveal delay={0.08} yOffset={24} className="z-10 my-auto py-12 max-w-4xl w-full">
        <div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-umber tracking-tight font-sans leading-none mb-2 select-none">
            {contact?.thankYou || 'Thank You!'}
          </h2>
          
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white tracking-wide font-normal mt-2">
            {contact?.workTogether || "Let's Work Together"}
          </p>

          {/* Action Buttons: Differentiated CTA Priority based on Audience */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            {isId ? (
              <>
                {/* ID Primary: WhatsApp */}
                <a
                  href={profile.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-brand-umber hover:bg-brand-umber-dark text-white font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl relative group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>{contact?.chatWhatsapp || 'Chat via WhatsApp'}</span>
                </a>

                {/* ID Secondary: Email */}
                <a
                  href={`mailto:${profile.contact.email}?subject=Diskusi%20Proyek%20via%20Portfolio&body=Halo%20Mas%20Lui%2C%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20project...`}
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-white text-brand-orange hover:bg-brand-cream font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Mail className="w-5 h-5" />
                  <span>{contact?.sendEmail || 'Kirim Email Resmi'}</span>
                </a>
              </>
            ) : (
              <>
                {/* EN Primary: Direct Email (Corporate / Global standard) */}
                <a
                  href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20via%20Portfolio&body=Hi%20Louis%20Vigo%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss...`}
                  onClick={triggerConfetti}
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-white text-brand-orange hover:bg-brand-cream font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Mail className="w-5 h-5" />
                  <span>{contact?.sendEmail || 'Send Direct Email'}</span>
                </a>

                {/* EN Secondary: Direct WhatsApp */}
                <a
                  href={profile.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-brand-umber hover:bg-brand-umber-dark text-white font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{contact?.chatWhatsapp || 'Direct WhatsApp'}</span>
                </a>
              </>
            )}
          </div>

          {/* Micro-hint for Audience */}
          <p className="text-xs text-white/70 mt-3 font-medium tracking-wide">
            {isId ? '• Respon cepat untuk diskusi proyek & kerja sama •' : '• Best for RFPs, Creative Briefs & Remote Opportunities •'}
          </p>

          {/* Direct Download Portfolio & CV */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href={profile.contact.portfolioPdf}
              download
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{contact?.downloadPortfolio || 'Download 2026 Portfolio (PDF)'}</span>
            </a>

            <button
              type="button"
              onClick={onOpenCV}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{contact?.downloadCv || (isId ? 'Lihat / Unduh CV (PDF)' : 'Preview & Download CV (PDF)')}</span>
            </button>
          </div>
        </div>
      </GlassReveal>

      {/* Bottom Bar: Exact Recreation of Page 15 Footer */}
      <GlassReveal delay={0.18} yOffset={16} className="z-10 w-full max-w-5xl">
        <div className="pt-10 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          
          {/* Left: Phone */}
          <a 
            href={profile.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-wide font-sans text-base">
              {profile.contact.phone}
            </span>
          </a>

          {/* Middle: Socials */}
          <div className="flex items-center space-x-6 text-xs uppercase tracking-wider font-semibold">
            <a 
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a 
              href={profile.contact.behance}
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
            href={`mailto:${profile.contact.email}`}
            className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-wide font-sans text-sm">
              {profile.contact.email}
            </span>
          </a>

        </div>
      </GlassReveal>
    </section>
  );
};
