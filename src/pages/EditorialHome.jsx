import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  stickerWords,
  ALL_LETTERS,
  TOTAL_LETTERS,
  preloadStickers,
} from '../data/stickerData';

const ZERO_WEIGHTS = () => Array(TOTAL_LETTERS).fill(0);
const INITIAL_WAVE_WEIGHTS = () => Array(TOTAL_LETTERS).fill(0.85);

export const EditorialHome = () => {
  const [weights, setWeights] = useState(INITIAL_WAVE_WEIGHTS);
  const [focusedLetterId, setFocusedLetterId] = useState(null);
  const [captionX, setCaptionX] = useState(null);

  const headingContainerRef = useRef(null);
  const letterRefs = useRef({});
  const cascadeTimersRef = useRef([]);
  const touchResetTimerRef = useRef(null);
  const isMouseInsideRef = useRef(false);
  const rafRef = useRef(null);

  const cancelCascade = useCallback(() => {
    if (cascadeTimersRef.current.length === 0) return;
    cascadeTimersRef.current.forEach((t) => clearTimeout(t));
    cascadeTimersRef.current = [];
  }, []);

  const clearTouchResetTimer = useCallback(() => {
    if (touchResetTimerRef.current) {
      clearTimeout(touchResetTimerRef.current);
      touchResetTimerRef.current = null;
    }
  }, []);

  const resetAll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setWeights(ZERO_WEIGHTS);
    setFocusedLetterId(null);
  }, []);

  const computeProximityWeights = useCallback((clientX, clientY) => {
    const next = Array(TOTAL_LETTERS).fill(0);
    let bestId = null;
    let bestWeight = 0;
    let bestCenterX = null;

    const containerRect = headingContainerRef.current?.getBoundingClientRect();

    for (let id = 0; id < TOTAL_LETTERS; id += 1) {
      const el = letterRefs.current[id];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const h = rect.height || 60;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Keep multi-line mobile hover isolated to the active line
      if (Math.abs(clientY - cy) > h * 0.65) continue;

      const radius = Math.max(h * 1.15, 58);
      const dx = Math.abs(clientX - cx);
      if (dx >= radius) continue;

      const w = 0.5 * (1 + Math.cos((dx / radius) * Math.PI));
      next[id] = w;

      if (w > bestWeight) {
        bestWeight = w;
        bestId = id;
        if (containerRect) {
          bestCenterX = cx - containerRect.left;
        }
      }
    }

    setWeights(next);

    if (bestId !== null && bestWeight > 0.25) {
      setFocusedLetterId(bestId);
      if (bestCenterX !== null && containerRect) {
        const minX = 85;
        const maxX = Math.max(minX, containerRect.width - 85);
        setCaptionX(Math.min(maxX, Math.max(minX, bestCenterX)));
      }
    } else {
      setFocusedLetterId(null);
    }
  }, []);

  // Preload stickers & play left-to-right opening reveal cascade (3D stickers sinking into serif letters)
  useEffect(() => {
    preloadStickers();

    const timers = [];
    const startDelay = 220;
    const stepDelay = 42;

    for (let id = 0; id < TOTAL_LETTERS; id += 1) {
      const t = setTimeout(() => {
        setWeights((prev) => {
          const next = [...prev];
          next[id] = 0;
          return next;
        });
      }, startDelay + id * stepDelay);
      timers.push(t);
    }

    cascadeTimersRef.current = timers;

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearTouchResetTimer();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [clearTouchResetTimer]);

  const handlePointerMove = useCallback(
    (e) => {
      if (e.pointerType !== 'mouse') return;
      isMouseInsideRef.current = true;
      cancelCascade();
      clearTouchResetTimer();

      const { clientX, clientY } = e;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        computeProximityWeights(clientX, clientY);
        rafRef.current = null;
      });
    },
    [cancelCascade, clearTouchResetTimer, computeProximityWeights]
  );

  const handlePointerLeave = useCallback(
    (e) => {
      if (e.pointerType !== 'mouse') return;
      isMouseInsideRef.current = false;
      cancelCascade();
      resetAll();
    },
    [cancelCascade, resetAll]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      cancelCascade();
      clearTouchResetTimer();
      const { clientX, clientY } = touch;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        computeProximityWeights(clientX, clientY);
        rafRef.current = null;
      });
    },
    [cancelCascade, clearTouchResetTimer, computeProximityWeights]
  );

  const handleTouchEnd = useCallback(() => {
    clearTouchResetTimer();
    touchResetTimerRef.current = setTimeout(() => {
      resetAll();
    }, 850);
  }, [clearTouchResetTimer, resetAll]);

  const handleLetterClick = useCallback(
    (id) => {
      // On desktop while mouse is actively tracking, pointermove owns the state
      if (isMouseInsideRef.current) return;
      const el = letterRefs.current[id];
      if (!el) return;

      cancelCascade();
      clearTouchResetTimer();
      const rect = el.getBoundingClientRect();
      computeProximityWeights(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      touchResetTimerRef.current = setTimeout(() => {
        resetAll();
      }, 850);
    },
    [cancelCascade, clearTouchResetTimer, computeProximityWeights, resetAll]
  );

  const activeCaption =
    focusedLetterId !== null ? ALL_LETTERS[focusedLetterId]?.caption : null;

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

      {/* Center Stage — Proximity Dock Wave & Letter-to-3D Swap */}
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

          {/* Wordmark + Horizontally Tracking Caption Wrapper */}
          <div
            ref={headingContainerRef}
            className="relative w-full max-w-6xl flex flex-col items-center"
          >
            <h1
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-label="Maximilianus Louis Vigo"
              className="font-serif text-[clamp(2.25rem,6.2vw,6.2rem)] sm:whitespace-nowrap font-normal tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] px-2 py-2 select-none touch-pan-y cursor-default"
            >
              {stickerWords.map((wordObj, wordIndex) => (
                <React.Fragment key={wordObj.word}>
                  <span className="inline-block whitespace-nowrap">
                    {wordObj.letters.map((letter) => {
                      const w = weights[letter.id] || 0;
                      const showSticker = w > 0.05;
                      const stickerScale = 0.25 + w * 1.18;
                      const zIndex = Math.round(20 + w * 80);

                      const letterTarget =
                        w > 0.38
                          ? { opacity: 0, y: '0.28em', scale: 0.3 }
                          : w > 0
                          ? {
                              opacity: Math.max(0, 1 - w * 1.8),
                              y: `${(w * 0.3).toFixed(3)}em`,
                              scale: 1 - w * 0.6,
                            }
                          : { opacity: 1, y: '0em', scale: 1 };

                      return (
                        <span
                          key={letter.id}
                          ref={(el) => {
                            if (el) {
                              letterRefs.current[letter.id] = el;
                            } else {
                              delete letterRefs.current[letter.id];
                            }
                          }}
                          data-letter-id={letter.id}
                          onClick={() => handleLetterClick(letter.id)}
                          className="relative inline-flex items-center justify-center cursor-pointer select-none"
                        >
                          {/* White Serif Letterform: sinks & vanishes inside influence field */}
                          <motion.span
                            animate={letterTarget}
                            transition={{
                              type: 'spring',
                              stiffness: 520,
                              damping: 28,
                              mass: 0.6,
                            }}
                            className="inline-block will-change-transform"
                          >
                            {letter.char}
                          </motion.span>

                          {/* Replacing 3D Object: scales continuously with proximity weight w */}
                          <AnimatePresence>
                            {showSticker && (
                              <motion.img
                                src={letter.src}
                                alt={letter.label}
                                draggable={false}
                                style={{ zIndex }}
                                initial={{
                                  x: '-50%',
                                  y: '-15%',
                                  scale: 0.15,
                                  rotate: letter.rotate - 12,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: '-50%',
                                  y: '-52%',
                                  scale: stickerScale,
                                  rotate: letter.rotate,
                                  opacity: 1,
                                }}
                                exit={{
                                  x: '-50%',
                                  y: '-10%',
                                  scale: 0.15,
                                  rotate: letter.rotate + 10,
                                  opacity: 0,
                                  transition: {
                                    duration: 0.22,
                                    ease: [0.32, 0, 0.67, 0],
                                  },
                                }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 460,
                                  damping: 25,
                                  mass: 0.65,
                                }}
                                className="pointer-events-none select-none absolute top-1/2 left-1/2 w-[1em] h-[1em] max-w-none object-contain drop-shadow-[0_12px_18px_rgba(61,21,4,0.45)] will-change-transform"
                              />
                            )}
                          </AnimatePresence>
                        </span>
                      );
                    })}
                  </span>
                  {wordIndex < stickerWords.length - 1 ? ' ' : null}
                </React.Fragment>
              ))}
            </h1>

            {/* Horizontally Tracking Micro-Caption Pill Slot (Fixed-height, CLS = 0) */}
            <div className="relative w-full h-10 mt-5 sm:mt-6">
              <div
                style={{
                  left: captionX !== null ? `${captionX}px` : '50%',
                }}
                className="absolute top-0 -translate-x-1/2 transition-[left] duration-150 ease-out"
              >
                <AnimatePresence>
                  {activeCaption && (
                    <motion.div
                      key="caption-pill"
                      initial={{ opacity: 0, y: 8, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.92 }}
                      transition={{ duration: 0.16 }}
                      className="inline-flex items-center whitespace-nowrap px-3.5 py-1.5 rounded-md bg-[#3D1504] text-white border border-white/20 text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase shadow-md select-none"
                    >
                      {activeCaption}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
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
