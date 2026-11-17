import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  stickerLines,
  ALL_SEGMENTS,
  TOTAL_STICKERS,
  preloadStickers,
} from '../data/stickerData';

export const EditorialHome = () => {
  const [activeMap, setActiveMap] = useState({});
  const [focusedSegId, setFocusedSegId] = useState(null);

  const zCounterRef = useRef(10);
  const sinkTimersRef = useRef({});
  const waveTimersRef = useRef([]);

  const cancelWave = useCallback(() => {
    if (waveTimersRef.current.length === 0) return;
    waveTimersRef.current.forEach((t) => clearTimeout(t));
    waveTimersRef.current = [];
  }, []);

  const scheduleSink = useCallback((id, delayMs = 260) => {
    if (sinkTimersRef.current[id]) {
      clearTimeout(sinkTimersRef.current[id]);
    }
    sinkTimersRef.current[id] = setTimeout(() => {
      delete sinkTimersRef.current[id];
      setActiveMap((prev) => {
        if (prev[id] === undefined) return prev;
        const next = { ...prev };
        delete next[id];
        if (Object.keys(next).length === 0) {
          setFocusedSegId(null);
        }
        return next;
      });
    }, delayMs);
  }, []);

  const showSegment = useCallback(
    (id, autoSinkMs = null) => {
      if (sinkTimersRef.current[id]) {
        clearTimeout(sinkTimersRef.current[id]);
        delete sinkTimersRef.current[id];
      }

      zCounterRef.current += 1;
      const nextZ = zCounterRef.current;

      setActiveMap((prev) => ({ ...prev, [id]: nextZ }));
      setFocusedSegId(id);

      if (typeof autoSinkMs === 'number') {
        scheduleSink(id, autoSinkMs);
      }
    },
    [scheduleSink]
  );

  // Preload stickers and run subtle opening wave so visitors discover letter interactivity naturally
  useEffect(() => {
    preloadStickers();

    const timers = [];
    const startDelay = 250;
    const stepDelay = 65;

    for (let id = 0; id < TOTAL_STICKERS; id += 1) {
      const t = setTimeout(() => {
        showSegment(id, 360);
      }, startDelay + id * stepDelay);
      timers.push(t);
    }

    const settleTimer = setTimeout(() => {
      setFocusedSegId(null);
    }, startDelay + TOTAL_STICKERS * stepDelay + 420);
    timers.push(settleTimer);

    waveTimersRef.current = timers;

    return () => {
      timers.forEach((t) => clearTimeout(t));
      Object.values(sinkTimersRef.current).forEach((t) => clearTimeout(t));
      sinkTimersRef.current = {};
    };
  }, [showSegment]);

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      cancelWave();
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const segEl = target?.closest?.('[data-sticker-id]');
      if (segEl) {
        const id = Number(segEl.getAttribute('data-sticker-id'));
        if (!Number.isNaN(id)) {
          showSegment(id, 550);
        }
      }
    },
    [cancelWave, showSegment]
  );

  const activeCount = Object.keys(activeMap).length;
  const activeCaption =
    focusedSegId !== null && activeCount > 0
      ? ALL_SEGMENTS[focusedSegId]?.caption
      : null;

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

      {/* Center Stage — Transient Sticker Type Hero */}
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

          {/* Primary Display Name with Transient Hover & Sinking Stickers */}
          <h1
            onTouchMove={handleTouchMove}
            aria-label="Maximilianus Louis Vigo"
            className="font-serif text-[3.1rem] sm:text-7xl md:text-8xl lg:text-[6rem] font-normal tracking-tight text-white leading-[1.02] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-5xl px-2 select-none touch-pan-y flex flex-col items-center gap-y-2 sm:gap-y-3"
          >
            {stickerLines.map((line) => (
              <span key={line.id} className="block whitespace-nowrap">
                {line.words.map((wordObj, wordIndex) => (
                  <React.Fragment key={wordObj.word}>
                    <span className="inline-block whitespace-nowrap">
                      {wordObj.segments.map((seg) => {
                        const zOrder = activeMap[seg.id];
                        const isActive = zOrder !== undefined;

                        return (
                          <span
                            key={seg.id}
                            data-sticker-id={seg.id}
                            onPointerEnter={(e) => {
                              if (e.pointerType === 'mouse') {
                                cancelWave();
                                showSegment(seg.id);
                              }
                            }}
                            onPointerLeave={(e) => {
                              if (e.pointerType === 'mouse') {
                                scheduleSink(seg.id, 260);
                              }
                            }}
                            onClick={() => {
                              cancelWave();
                              showSegment(seg.id, 950);
                            }}
                            className="relative inline-block cursor-pointer select-none transition-opacity duration-200 hover:text-[#FFF4EE]"
                          >
                            <span>{seg.text}</span>

                            <AnimatePresence>
                              {isActive && (
                                <motion.img
                                  src={seg.src}
                                  alt={seg.label}
                                  draggable={false}
                                  style={{
                                    zIndex: zOrder,
                                    top: seg.offsetY,
                                  }}
                                  initial={{
                                    scale: 0.2,
                                    y: 22,
                                    rotate: seg.rotate - 16,
                                    opacity: 0,
                                    x: '-50%',
                                  }}
                                  animate={{
                                    scale: 1,
                                    y: 0,
                                    rotate: seg.rotate,
                                    opacity: 1,
                                    x: '-50%',
                                  }}
                                  exit={{
                                    scale: 0.15,
                                    y: 26,
                                    rotate: seg.rotate + 12,
                                    opacity: 0,
                                    x: '-50%',
                                    transition: {
                                      duration: 0.25,
                                      ease: [0.32, 0, 0.67, 0],
                                    },
                                  }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 520,
                                    damping: 24,
                                    mass: 0.75,
                                  }}
                                  className="pointer-events-none select-none absolute left-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 max-w-none object-contain drop-shadow-[0_14px_20px_rgba(61,21,4,0.48)] will-change-transform"
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

          {/* Contextual Micro-Caption Pill Slot (Fixed-height, CLS = 0) */}
          <div className="h-10 mt-5 sm:mt-6 flex items-center justify-center">
            <AnimatePresence>
              {activeCaption && (
                <motion.div
                  key="caption-pill"
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-[#3D1504] text-white border border-white/20 text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase shadow-md select-none"
                >
                  {activeCaption}
                </motion.div>
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
