"use client";

import { useState, useEffect, useRef } from "react";

interface UseScrollDirectionReturn {
  isVisible: boolean;
  scrollY: number;
}

/**
 * Custom hook to detect scroll direction and control topbar visibility
 * @param threshold - Minimum scroll distance to trigger visibility change (default: 10px)
 * @returns Object containing isVisible (topbar visibility) and scrollY (current scroll position)
 */
export function useScrollDirection(threshold: number = 10): UseScrollDirectionReturn {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // Always show topbar at the very top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
      }
      // Show topbar when scrolling up
      else if (currentScrollY < lastScrollY.current - threshold) {
        setIsVisible(true);
      }
      // Hide topbar when scrolling down
      else if (currentScrollY > lastScrollY.current + threshold) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { isVisible, scrollY };
}
