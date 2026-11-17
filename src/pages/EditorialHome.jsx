import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  stickerWords,
  ALL_LETTERS,
  TOTAL_LETTERS,
  RING_STICKERS,
  preloadStickers,
} from '../data/stickerData';

const ZERO_WEIGHTS = () => Array(TOTAL_LETTERS).fill(0);
const ALL_FALSE_MASK = () => Array(TOTAL_LETTERS).fill(false);
const ALL_TRUE_MASK = () => Array(TOTAL_LETTERS).fill(true);

export const EditorialHome = () => {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'revealing' | 'ready'
  const [loadProgress, setLoadProgress] = useState(0);
  const [weights, setWeights] = useState(ZERO_WEIGHTS);
  const [revealedMask, setRevealedMask] = useState(ALL_FALSE_MASK);
  const [focusedLetterId, setFocusedLetterId] = useState(null);
  const [captionX, setCaptionX] = useState(null);
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  const headingContainerRef = useRef(null);
  const letterRefs = useRef({});
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const introControlRef = useRef({
    runId: 0,
    rafId: null,
    holdTimer: null,
    waveDelayTimer: null,
  });
  const touchResetTimerRef = useRef(null);
  const hoverRafRef = useRef(null);
  const isMouseInsideRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompactViewport(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearTouchResetTimer = useCallback(() => {
    if (touchResetTimerRef.current) {
      clearTimeout(touchResetTimerRef.current);
      touchResetTimerRef.current = null;
    }
  }, []);

  const stopIntro = useCallback(() => {
    introControlRef.current.runId += 1;
    if (introControlRef.current.rafId) {
      cancelAnimationFrame(introControlRef.current.rafId);
      introControlRef.current.rafId = null;
    }
    if (introControlRef.current.holdTimer) {
      clearTimeout(introControlRef.current.holdTimer);
      introControlRef.current.holdTimer = null;
    }
    if (introControlRef.current.waveDelayTimer) {
      clearTimeout(introControlRef.current.waveDelayTimer);
      introControlRef.current.waveDelayTimer = null;
    }
  }, []);

  const resetHoverState = useCallback(() => {
    if (hoverRafRef.current) {
      cancelAnimationFrame(hoverRafRef.current);
      hoverRafRef.current = null;
    }
    setWeights(ZERO_WEIGHTS);
    setFocusedLetterId(null);
  }, []);

  const runIntroSequence = useCallback(() => {
    stopIntro();
    clearTouchResetTimer();
    isMouseInsideRef.current = false;

    const myRunId = introControlRef.current.runId;

    setPhase('loading');
    setLoadProgress(0);
    setWeights(ZERO_WEIGHTS);
    setRevealedMask(ALL_FALSE_MASK);
    setFocusedLetterId(null);

    const loadDuration = 1000;
    const holdDuration = 200;
    const exitDuration = 200;
    const waveDuration = 1000;
    const loadStart = performance.now();

    const startRevealWave = () => {
      if (introControlRef.current.runId !== myRunId) return;
      setPhase('revealing');

      introControlRef.current.waveDelayTimer = setTimeout(() => {
        if (introControlRef.current.runId !== myRunId) return;
        const waveStart = performance.now();

        const tickWave = (now) => {
          if (introControlRef.current.runId !== myRunId) return;
          const t = Math.min(1, (now - waveStart) / waveDuration);
          const wavePos = -1.5 + t * (TOTAL_LETTERS + 4.3);

          const nextWeights = Array(TOTAL_LETTERS).fill(0);
          const nextRevealed = Array(TOTAL_LETTERS).fill(false);

          for (let id = 0; id < TOTAL_LETTERS; id += 1) {
            const delta = wavePos - id;
            if (delta < -1.2) {
              nextWeights[id] = 0;
              nextRevealed[id] = false;
            } else if (delta <= 1.8) {
              const norm = (delta + 1.2) / 3.0;
              nextWeights[id] = Math.sin(norm * Math.PI);
              nextRevealed[id] = delta > 1.1;
            } else {
              nextWeights[id] = 0;
              nextRevealed[id] = true;
            }
          }

          setWeights(nextWeights);
          setRevealedMask(nextRevealed);

          if (t < 1) {
            introControlRef.current.rafId = requestAnimationFrame(tickWave);
          } else {
            introControlRef.current.rafId = null;
            setWeights(ZERO_WEIGHTS);
            setRevealedMask(ALL_TRUE_MASK);
            setPhase('ready');
          }
        };

        introControlRef.current.rafId = requestAnimationFrame(tickWave);
      }, exitDuration);
    };

    const tickLoader = (now) => {
      if (introControlRef.current.runId !== myRunId) return;
      const t = Math.min(1, (now - loadStart) / loadDuration);
      const eased = 1 - Math.pow(1 - t, 3);
      setLoadProgress(Math.round(eased * 100));

      if (t < 1) {
        introControlRef.current.rafId = requestAnimationFrame(tickLoader);
      } else {
        introControlRef.current.rafId = null;
        setLoadProgress(100);
        introControlRef.current.holdTimer = setTimeout(
          startRevealWave,
          holdDuration
        );
      }
    };

    introControlRef.current.rafId = requestAnimationFrame(tickLoader);
  }, [clearTouchResetTimer, stopIntro]);

  useEffect(() => {
    preloadStickers();
    runIntroSequence();
    return () => {
      stopIntro();
      clearTouchResetTimer();
      if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);
    };
  }, [clearTouchResetTimer, runIntroSequence, stopIntro]);

  const computeProximityWeights = useCallback((clientX, clientY) => {
    const next = Array(TOTAL_LETTERS).fill(0);
    let bestId = null;
    let bestWeight = 0;
    let bestCenterX = null;

    const containerRect = headingContainerRef.current?.getBoundingClientRect();
    const isDesktopSingleLine =
      typeof window !== 'undefined' && window.innerWidth >= 640;

    for (let id = 0; id < TOTAL_LETTERS; id += 1) {
      const el = letterRefs.current[id];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const h = rect.height || 60;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const yTolerance = isDesktopSingleLine ? h * 0.95 : h * 0.62;
      if (Math.abs(clientY - cy) > yTolerance) continue;

      const radius = Math.max(h * 1.2, 68);
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

  const ensureReadyForInteraction = useCallback(() => {
    if (phaseRef.current === 'ready') return;
    stopIntro();
    setRevealedMask(ALL_TRUE_MASK);
    setPhase('ready');
  }, [stopIntro]);

  const handlePointerMove = useCallback(
    (e) => {
      if (e.pointerType !== 'mouse') return;
      isMouseInsideRef.current = true;
      ensureReadyForInteraction();
      clearTouchResetTimer();

      const { clientX, clientY } = e;
      if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);
      hoverRafRef.current = requestAnimationFrame(() => {
        computeProximityWeights(clientX, clientY);
        hoverRafRef.current = null;
      });
    },
    [clearTouchResetTimer, computeProximityWeights, ensureReadyForInteraction]
  );

  const handlePointerLeave = useCallback(
    (e) => {
      if (e.pointerType !== 'mouse') return;
      isMouseInsideRef.current = false;
      ensureReadyForInteraction();
      resetHoverState();
    },
    [ensureReadyForInteraction, resetHoverState]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      ensureReadyForInteraction();
      clearTouchResetTimer();

      const { clientX, clientY } = touch;
      if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);
      hoverRafRef.current = requestAnimationFrame(() => {
        computeProximityWeights(clientX, clientY);
        hoverRafRef.current = null;
      });
    },
    [clearTouchResetTimer, computeProximityWeights, ensureReadyForInteraction]
  );

  const handleTouchEnd = useCallback(() => {
    clearTouchResetTimer();
    touchResetTimerRef.current = setTimeout(() => {
      resetHoverState();
    }, 850);
  }, [clearTouchResetTimer, resetHoverState]);

  const handleLetterClick = useCallback(
    (id) => {
      if (isMouseInsideRef.current) return;
      const el = letterRefs.current[id];
      if (!el) return;

      ensureReadyForInteraction();
      clearTouchResetTimer();
      const rect = el.getBoundingClientRect();
      computeProximityWeights(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      touchResetTimerRef.current = setTimeout(() => {
        resetHoverState();
      }, 850);
    },
    [
      clearTouchResetTimer,
      computeProximityWeights,
      ensureReadyForInteraction,
      resetHoverState,
    ]
  );

  const ringRadius = isCompactViewport ? 96 : 138;
  const activeCaption =
    phase === 'ready' && focusedLetterId !== null
      ? ALL_LETTERS[focusedLetterId]?.caption
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
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-5 sm:pt-8 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
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

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white bg-[#3D1504]/35 px-3.5 py-2 rounded-full border border-white/20 select-none shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-medium">
              Semarang, ID · Available Worldwide
            </span>
          </div>

          <button
            type="button"
            onClick={runIntroSequence}
            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-[0.14em] uppercase text-white bg-[#3D1504] hover:bg-[#260C02] px-4 min-h-[44px] rounded-full border border-white/25 shadow-sm cursor-pointer transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
            aria-label="Replay intro animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY</span>
          </button>
        </div>
      </header>

      {/* Center Stage: Circular Ring Loader -> Unrolling Wave -> Always-Mounted Proximity Hover */}
      <main className="relative z-10 w-full max-w-[92vw] xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-10 my-auto py-6 sm:py-8 text-center flex flex-col items-center justify-center min-h-[360px]">
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <motion.div
              key="ring-loader"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] flex items-center justify-center select-none"
            >
              {/* 12 Clockwise Ring Stickers */}
              {RING_STICKERS.map((item) => {
                const rad = (item.angleDeg * Math.PI) / 180;
                const x = Math.cos(rad) * ringRadius;
                const y = Math.sin(rad) * ringRadius;
                const visible = loadProgress >= item.threshold;

                return (
                  <motion.img
                    key={item.id}
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    style={{
                      left: `calc(50% + ${x.toFixed(1)}px)`,
                      top: `calc(50% + ${y.toFixed(1)}px)`,
                    }}
                    initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                    animate={
                      visible
                        ? {
                            scale: 1,
                            opacity: 1,
                            rotate: item.rotate,
                            x: '-50%',
                            y: '-50%',
                          }
                        : {
                            scale: 0,
                            opacity: 0,
                            rotate: item.rotate - 16,
                            x: '-50%',
                            y: '-50%',
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 440,
                      damping: 24,
                      mass: 0.65,
                    }}
                    className="pointer-events-none select-none absolute w-11 h-11 sm:w-16 sm:h-16 max-w-none object-contain drop-shadow-[0_10px_14px_rgba(61,21,4,0.4)]"
                  />
                );
              })}

              {/* Center Counter & Micro Label */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-white tabular-nums leading-none">
                  {loadProgress}%
                </span>
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.26em] uppercase text-white/85 mt-2">
                  LOADING THINGS
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hero-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="w-full flex flex-col items-center"
            >
              {/* Eyebrow Label */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-white/95 mb-5 sm:mb-7 font-semibold"
              >
                Visual Direction &amp; Identity Systems
              </motion.p>

              {/* Wordmark + Horizontally Tracking Caption Wrapper */}
              <div
                ref={headingContainerRef}
                className="relative w-full flex flex-col items-center"
              >
                <h1
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  aria-label="Maximilianus Louis Vigo"
                  className="font-serif text-[clamp(3.25rem,13.5vw,4.75rem)] sm:text-[clamp(3.5rem,10.2vw,10.2rem)] sm:whitespace-nowrap font-normal tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] px-4 py-6 -my-6 select-none touch-pan-y cursor-default"
                >
                  {stickerWords.map((wordObj, wordIndex) => (
                    <React.Fragment key={wordObj.word}>
                      <span className="inline-block whitespace-nowrap">
                        {wordObj.letters.map((letter) => {
                          const w = weights[letter.id] || 0;
                          const isRevealed = revealedMask[letter.id];
                          const isStickerVisible = w > 0.02;
                          const stickerScale = isStickerVisible
                            ? 0.25 + w * 1.18
                            : 0;
                          const zIndex = Math.round(20 + w * 80);

                          const letterTarget = !isRevealed
                            ? { opacity: 0, y: '0.32em', scale: 0.35 }
                            : w > 0.35
                            ? { opacity: 0, y: '0.28em', scale: 0.3 }
                            : w > 0
                            ? {
                                opacity: Math.max(0, 1 - w * 1.8),
                                y: `${(w * 0.28).toFixed(3)}em`,
                                scale: 1 - w * 0.55,
                              }
                            : { opacity: 1, y: '0em', scale: 1 };

                          const stickerTarget = isStickerVisible
                            ? {
                                x: '-50%',
                                y: '-52%',
                                scale: stickerScale,
                                rotate: letter.rotate,
                                opacity: 1,
                              }
                            : {
                                x: '-50%',
                                y: '-10%',
                                scale: 0,
                                rotate: letter.rotate - 12,
                                opacity: 0,
                              };

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
                              {/* White Serif Letterform */}
                              <motion.span
                                animate={letterTarget}
                                transition={{
                                  type: 'spring',
                                  stiffness: 340,
                                  damping: 26,
                                  mass: 0.65,
                                }}
                                className="inline-block will-change-transform"
                              >
                                {letter.char}
                              </motion.span>

                              {/* Always-mounted 3D Object for zero mount-churn spring smoothness */}
                              <motion.img
                                src={letter.src}
                                alt={letter.label}
                                draggable={false}
                                style={{ zIndex }}
                                initial={false}
                                animate={stickerTarget}
                                transition={{
                                  type: 'spring',
                                  stiffness: 340,
                                  damping: 26,
                                  mass: 0.65,
                                }}
                                className="pointer-events-none select-none absolute top-1/2 left-1/2 w-[1em] h-[1em] max-w-none object-contain drop-shadow-[0_12px_18px_rgba(61,21,4,0.45)] will-change-transform"
                              />
                            </span>
                          );
                        })}
                      </span>
                      {wordIndex < stickerWords.length - 1 ? ' ' : null}
                    </React.Fragment>
                  ))}
                </h1>

                {/* Horizontally Tracking Micro-Caption Pill Slot (Fixed-height, CLS = 0) */}
                <div className="relative w-full h-10 mt-8 sm:mt-10">
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
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-white font-medium mt-2 sm:mt-3"
              >
                Creative Director &amp; Visual Specialist
              </motion.p>

              {/* Editorial Philosophy Statement */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="font-serif italic text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal px-2 drop-shadow-sm"
              >
                &ldquo;Focusing on timeless brand systems, editorial discipline,
                and thoughtful digital interfaces.&rdquo;
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
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
