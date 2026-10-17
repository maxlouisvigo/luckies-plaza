import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor
 * Interactive magnetic & ambient halo cursor inspired by high-end design portfolios.
 * Features a sharp central anchor dot + smooth spring-trailing frosted halo ring.
 * Reacts dynamically to clickable targets (buttons, links, mockups, cards).
 * Strictly hidden on touchscreens and mobile devices.
 */
export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw cursor position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast responsive spring for the center anchor dot
  const dotSpringConfig = { stiffness: 900, damping: 45, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Buttery, trailing halo spring physics
  const haloSpringConfig = { stiffness: 280, damping: 26, mass: 0.5 };
  const haloX = useSpring(mouseX, haloSpringConfig);
  const haloY = useSpring(mouseY, haloSpringConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if device supports hover/fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsTouchDevice(!mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsTouchDevice(!e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, .project-card, .tilt-mockup, [data-hover]'
      );

      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render on mobile or touchscreens
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Trailing Ambient Halo Ring with Spring Dynamics */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border flex items-center justify-center transition-colors duration-200"
        style={{
          x: haloX,
          y: haloY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPressed ? 0.8 : isHovered ? 1.7 : 1,
          borderColor: isHovered 
            ? 'rgba(254, 240, 138, 0.9)' // Warm Amber Glow on hover
            : 'rgba(255, 255, 255, 0.45)', // Crisp White Frosted Halo
          backgroundColor: isHovered 
            ? 'rgba(245, 158, 11, 0.16)' 
            : 'rgba(255, 255, 255, 0.05)',
          boxShadow: isHovered
            ? '0 0 25px rgba(245, 158, 11, 0.35)'
            : '0 0 10px rgba(255, 255, 255, 0.08)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 25 },
          borderColor: { duration: 0.15 },
          backgroundColor: { duration: 0.15 },
        }}
      />

      {/* 2. Sharp Core Anchor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPressed ? 0.6 : isHovered ? 0 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 30 },
        }}
      />
    </div>
  );
};
