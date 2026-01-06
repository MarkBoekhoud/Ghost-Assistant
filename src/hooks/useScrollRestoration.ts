import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export const useScrollRestoration = () => {
  const location = useLocation();
  const isRestoring = useRef(false);

  // Save scroll position before navigating away
  useEffect(() => {
    const handleScroll = () => {
      if (!isRestoring.current) {
        scrollPositions.set(location.pathname, window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Restore scroll position when returning to a page
  useEffect(() => {
    const savedPosition = scrollPositions.get(location.pathname);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      isRestoring.current = true;
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
        // Reset flag after a short delay
        setTimeout(() => {
          isRestoring.current = false;
        }, 100);
      });
    }
  }, [location.pathname]);

  // Save current position (for manual save before navigation)
  const savePosition = () => {
    scrollPositions.set(location.pathname, window.scrollY);
  };

  return { savePosition };
};
