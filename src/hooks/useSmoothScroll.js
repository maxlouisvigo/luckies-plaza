import { useEffect } from 'react';

/**
 * useSmoothScroll
 * Provides momentum-damped smooth scrolling for desktop mousewheel interactions
 * while preserving native 120Hz gestures for touchscreens and macOS precision trackpads.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Strictly skip mobile, tablets, and devices with coarse pointers
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    let rafId = null;

    // Damping factor: 0.095 produces a balanced, responsive momentum feel
    const damping = 0.095;

    const updateScroll = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.6) {
        currentY += diff * damping;
        window.scrollTo({ top: currentY, behavior: 'instant' });
        rafId = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo({ top: currentY, behavior: 'instant' });
        isRunning = false;
        rafId = null;
      }
    };

    const onWheel = (e) => {
      // Allow browser zoom (Cmd / Ctrl + wheel)
      if (e.ctrlKey || e.metaKey) return;

      // Don't intercept if scrolling inside a nested scrollable element (e.g. modals, iframes)
      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
          return;
        }
        target = target.parentElement;
      }

      // Detect notched mouse wheel vs precision trackpad
      // Notched mouse wheels send integer deltas >= 30, whereas trackpads send fractional / continuous small values
      const isNotchedMouse = Math.abs(e.deltaY) >= 30 && Number.isInteger(e.deltaY);

      if (isNotchedMouse) {
        e.preventDefault();

        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );

        targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY * 1.15));

        if (!isRunning) {
          currentY = window.scrollY;
          isRunning = true;
          rafId = requestAnimationFrame(updateScroll);
        }
      } else {
        // For trackpads, sync targetY with current position so next notch doesn't jump
        targetY = window.scrollY + e.deltaY;
      }
    };

    // Keep target synchronized when user clicks anchor links or uses keyboard scroll
    const onScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
