import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  stickerLines,
  TOTAL_STICKERS,
  preloadStickers,
} from '../data/stickerData';

export const EditorialHome = () => {
  const [stampedMap, setStampedMap] = useState({});
  const zCounterRef = useRef(10);
  const lastTouchSlideAtRef = useRef(0);
  const lastStampedAtRef = useRef({});

  useEffect(() => {
    preloadStickers();
  }, []);

  const stampedCount = Object.keys(stampedMap).length;

  const stampSegment = useCallback((id) => {
    setStampedMap((prev) => {
      if (prev[id] !== undefined) return prev;
      zCounterRef.current += 1;
      lastStampedAtRef.current[id] = Date.now();
      return { ...prev, [id]: zCounterRef.current };
    });
  }, []);

  const toggleSegment = useCallback((id) => {
    const now = Date.now();
    // Prevent accidental peel right after hover-stamp or touch-slide gesture ends
    if (now - lastTouchSlideAtRef.current < 350) return;
    if (now - (lastStampedAtRef.current[id] || 0) < 250) return;

    setStampedMap((prev) => {
      if (prev[id] !== undefined) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      zCounterRef.current += 1;
      lastStampedAtRef.current[id] = now;
      return { ...prev, [id]: zCounterRef.current };
    });
  }, []);

  const resetAllStamps = useCallback(() => {
    setStampedMap({});
    lastStampedAtRef.current = {};
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      lastTouchSlideAtRef.current = Date.now();
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const segEl = target?.closest?.('[data-sticker-id]');
      if (segEl) {
        const id = Number(segEl.getAttribute('data-sticker-id'));
        if (!Number.isNaN(id)) {
          stampSegment(id);
        }
      }
    },
    [stampSegment]
  );

  return (
    <div className="relative min-h-[100dvh] bg-[#F05A22] text-white flex flex-col justify-between selection:bg-[#3D1504] selection:text-white subtle-grain overflow-x-hidden">
      {/* Ambient Vignette for Editorial Paper Depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.08) 0%, rgba(61, 21, 4, 0.4) 100%)',
        }}
      />

      {/* Top Utility Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.16em] text-white uppercase font-semibold select-none shrink-0"
        >
          <span className="px-2 py-1 rounded bg-[#3D1504]/30 border border-white/20 text-white font-bold">
            LV
          </span>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium tracking-[0.14em]">
            LOUIS VIGO
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white bg-[#3D1504]/35 px-3.5 py-1.5 rounded-full border border-white/20 select-none shadow-sm shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] sm:text-xs font-medium">
            Semarang, ID · Available Worldwide
          </span>
        </motion.div>
      </header>

      {/* Center Stage — Interactive Sticker Type Hero */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 my-auto py-6 sm:py-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* Eyebrow Label */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-white/95 mb-5 sm:mb-7 font-semibold">
            Visual Direction &amp; Identity Systems
          </p>

          {/* Primary Display Name with Two-Line Architectural Layout & 10 Alternating 3D Stickers */}
          <h1
            onTouchMove={handleTouchMove}
            aria-label="Maximilianus Louis Vigo"
            className="font-serif text-[3.1rem] sm:text-7xl md:text-8xl lg:text-[6rem] font-normal tracking-tight text-white leading-[1.02] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-5xl px-2 select-none touch-pan-y flex flex-col items-center gap-y-2 sm:gap-y-3"
          >
            {stickerLines.map((line) => (
              <span
                key={line.id}
                className="block whitespace-nowrap"
              >
                {line.words.map((wordObj, wordIndex) => (
                  <React.Fragment key={wordObj.word}>
                    <span className="inline-block whitespace-nowrap">
                      {wordObj.segments.map((seg) => {
                        const zOrder = stampedMap[seg.id];
                        const isStamped = zOrder !== undefined;

                        return (
                          <span
                            key={seg.id}
                            data-sticker-id={seg.id}
                            onPointerEnter={(e) => {
                              if (e.pointerType === 'mouse') {
                                stampSegment(seg.id);
                              }
                            }}
                            onClick={() => toggleSegment(seg.id)}
                            className="relative inline-block cursor-pointer select-none transition-opacity duration-200 hover:text-[#FFF4EE]"
                          >
                            <span>{seg.text}</span>

                            <AnimatePresence>
                              {isStamped && (
                                <motion.img
                                  src={seg.src}
                                  alt={seg.label}
                                  draggable={false}
                                  style={{
                                    zIndex: zOrder,
                                    top: seg.offsetY,
                                  }}
                                  initial={{
                                    scale: 0,
                                    rotate: seg.rotate - 18,
                                    opacity: 0,
                                    x: '-50%',
                                  }}
                                  animate={{
                                    scale: 1,
                                    rotate: seg.rotate,
                                    opacity: 1,
                                    x: '-50%',
                                  }}
                                  exit={{
                                    scale: 0,
                                    rotate: seg.rotate + 14,
                                    opacity: 0,
                                    x: '-50%',
                                  }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 520,
                                    damping: 24,
                                    mass: 0.8,
                                  }}
                                  className="pointer-events-none select-none absolute left-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 max-w-none object-contain drop-shadow-[0_12px_18px_rgba(61,21,4,0.48)] will-change-transform"
                                />
                              )}
                            </AnimatePresence>
                          </span>
                        );
                      })}
                    </span>
                    {wordIndex < line.words.length - 1 ? ' ' : null}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </h1>

          {/* Fixed-height slot for Replay / Stamp Progress Pill (CLS = 0) */}
          <div className="h-11 mt-6 sm:mt-8 flex items-center justify-center">
            <AnimatePresence>
              {stampedCount > 0 && (
                <motion.button
                  type="button"
                  onClick={resetAllStamps}
                  initial={{ opacity: 0, scale: 0.9, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded-full bg-[#3D1504]/85 hover:bg-[#3D1504] text-white border border-white/25 text-xs font-mono tracking-[0.14em] uppercase shadow-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
                >
                  <span>
                    {stampedCount === TOTAL_STICKERS
                      ? 'STAMPED FULL · REPLAY'
                      : `${stampedCount} / ${TOTAL_STICKERS} · REPLAY`}
                  </span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Subheader / Role */}
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-white font-medium mt-2 sm:mt-3">
            Creative Director &amp; Visual Specialist
          </p>

          {/* Editorial Philosophy Statement */}
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2 drop-shadow-sm">
            &ldquo;Focusing on timeless brand systems, editorial discipline, and
            thoughtful digital interfaces.&rdquo;
          </p>
        </motion.div>
      </main>

      {/* Bottom Utility Bar & Curated Index */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-white/20 pt-5 sm:pt-6">
        {/* Navigation CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 w-full md:w-auto"
        >
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 min-h-[46px] rounded-full bg-white text-[#3D1504] font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-[#FFF4EE] hover:text-[#260C02] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
          >
            <span>Selected Works (2026)</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#3D1504]" />
          </Link>

          <a
            href="mailto:max.louisvigo@gmail.com?subject=Creative%20Inquiry%20%E2%80%94%20Louis%20Vigo"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 min-h-[46px] rounded-full bg-[#3D1504]/30 hover:bg-[#3D1504]/50 border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all duration-200 shadow-sm select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
            title="Send Email to Louis Vigo"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>Inquiries</span>
          </a>
        </motion.div>

        {/* Social Quick Links & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-white tracking-wider"
        >
          <a
            href="https://www.behance.net/gallery/256124861/Louis-Vigo-Portfolio-2026/modules/1493202679"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors duration-150 inline-flex items-center gap-1.5 min-h-[44px] px-1 font-semibold focus-visible:outline-none focus-visible:underline"
          >
            <span>Behance</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <span className="text-white/40">•</span>

          <a
            href="https://www.linkedin.com/in/louis-vigo-b75b5a262"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors duration-150 inline-flex items-center gap-1.5 min-h-[44px] px-1 font-semibold focus-visible:outline-none focus-visible:underline"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <span className="text-white/40 hidden sm:inline">•</span>

          <span className="text-white/80 hidden sm:inline text-xs font-medium">
            &copy; 2026 Louis Vigo
          </span>
        </motion.div>
      </footer>
    </div>
  );
};

export default EditorialHome;
