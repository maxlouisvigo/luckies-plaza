import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Mail, 
  MessageCircle,
  Briefcase
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/**
 * CVModal
 * Elegant lightbox modal to inspect Mas Lui's CV directly on the page without forcing a new tab.
 * Offers dual-mode viewing (High-Resolution Visual Slide & Official PDF Viewer),
 * direct download action, and quick-copy recruiter contact pills.
 */
export const CVModal = ({ 
  isOpen = false, 
  onClose, 
  lang = 'en', 
  t = portfolioData 
}) => {
  const [viewMode, setViewMode] = useState('slide'); // 'slide' | 'pdf'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const profile = t?.profile || portfolioData.profile;
  const cv = t?.cv || portfolioData.cv;

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum Vitae Preview"
      >
        {/* Frosted Glass Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#3D1504]/95 border border-white/25 rounded-2xl md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden text-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/15 bg-black/25">
            {/* Title & Metadata */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-brand-orange text-white shrink-0 shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg leading-tight tracking-tight text-white">
                  {lang === 'id' ? 'Curriculum Vitae — Louis Vigo' : 'Curriculum Vitae — Louis Vigo'}
                </h3>
                <p className="text-xs text-white/70">
                  {lang === 'id' ? 'Visual Specialist & Communication Strategist' : 'Visual Specialist & Communication Strategist'}
                </p>
              </div>
            </div>

            {/* View Mode Switcher Pill */}
            <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/20 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('slide')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  viewMode === 'slide'
                    ? 'bg-white text-brand-orange shadow-sm font-bold'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{lang === 'id' ? 'Slide Visual (HD)' : 'Visual Slide (HD)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  viewMode === 'pdf'
                    ? 'bg-white text-brand-orange shadow-sm font-bold'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Document</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href={profile.contact.cvPdf}
                download="CV_Maximilianus_Louis_Vigo.pdf"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-brand-orange hover:bg-[#F05A22]/90 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                title="Download Official PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
              </a>

              <a
                href={profile.contact.cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all"
                title="Open PDF in new tab"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all ml-1"
                title="Close modal (Esc)"
                aria-label="Close CV Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black/10 flex items-center justify-center min-h-[50vh]">
            {viewMode === 'slide' ? (
              <div className="relative w-full flex flex-col items-center">
                <div className="relative max-w-4xl w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#2D0F03]">
                  <img
                    src="/assets/03 - CV.png"
                    alt="Maximilianus Louis Vigo - Curriculum Vitae Slide"
                    className="w-full h-auto object-contain block"
                    loading="eager"
                  />
                </div>
                <p className="text-xs text-white/60 mt-3 flex items-center space-x-1.5">
                  <span>✦</span>
                  <span>{lang === 'id' ? 'Render visual resmi dari portofolio 2026' : 'Official high-resolution visual slide from 2026 portfolio'}</span>
                </p>
              </div>
            ) : (
              <div className="w-full h-[65vh] md:h-[70vh] rounded-xl overflow-hidden border border-white/15 bg-white shadow-xl">
                <iframe
                  src={`${profile.contact.cvPdf}#view=FitH`}
                  title="Official CV PDF Viewer"
                  className="w-full h-full border-none"
                />
              </div>
            )}
          </div>

          {/* Modal Footer: Quick Recruiter Outreach Contacts */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-white/15 bg-black/30 text-xs">
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">
                {lang === 'id' ? 'Siap dihubungi untuk wawancara & kolaborasi proyek' : 'Available for immediate interviews & contract discussions'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? (lang === 'id' ? 'Email Tersalin!' : 'Copied!') : profile.contact.email}</span>
              </button>

              <a
                href={profile.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-700/80 hover:bg-blue-600 text-white font-semibold transition-all"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
