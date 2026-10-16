import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassReveal Component
 * Creates an editorial frosted-glass fade-in entrance when scrolled into view.
 * Uses `viewport: { once: true }` so once it has appeared, it permanently stays 
 * in place even when the user scrolls back to the top.
 */
export const GlassReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  yOffset = 28,
  duration = 0.75,
  blurAmount = 12
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset,
        filter: `blur(${blurAmount}px)`,
        scale: 0.98
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        scale: 1
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] // Snappy yet organic spring-like deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
