import React, { useState, useRef, useCallback } from 'react';
import { ZoomIn } from 'lucide-react';

export const TiltMockup = ({ 
  src, 
  alt, 
  className = '', 
  imgClassName = '', 
  onClick, 
  badgeText = 'Inspect Fullscreen',
  maxTilt = 10,
  glare = true
}) => {
  const containerRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    glareX: 50,
    glareY: 50,
    glareOpacity: 0
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to +1
    const normY = (y / rect.height) * 2 - 1; // -1 to +1

    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.35
    });
  }, [maxTilt]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      glareX: 50,
      glareY: 50,
      glareOpacity: 0
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative cursor-pointer select-none perspective-container group ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Moving Wrapper */}
      <div 
        className="relative w-full flex items-center justify-center preserve-3d"
        style={{
          transform: style.transform,
          transition: style.transition
        }}
      >
        {/* Main Mockup Image */}
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain select-none pointer-events-none ${imgClassName}`}
        />

        {/* Dynamic Specular Glare Reflection Sheen */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: style.glareOpacity,
              background: `radial-gradient(circle 350px at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 80%)`
            }}
          />
        )}

        {/* Floating Zoom Pill Badge */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="px-5 py-2.5 rounded-full bg-brand-umber text-white font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center space-x-2 border border-white/30 backdrop-blur-md">
            <ZoomIn className="w-4 h-4 text-white" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
