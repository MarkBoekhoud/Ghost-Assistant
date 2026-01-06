import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export const useScrollRestoration = () => {
  const location = useLocation();
  const isRestoring = useRef(false);
  const pathKey = location.pathname;

  // Save scroll position continuously
  useEffect(() => {
    const handleScroll = () => {
      if (!isRestoring.current) {
        scrollPositions.set(pathKey, window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathKey]);

  // Restore scroll position when component mounts
  useEffect(() => {
    const savedPosition = scrollPositions.get(pathKey);
    
    if (savedPosition !== undefined && savedPosition > 0) {
      isRestoring.current = true;
      
      // Wait for content to render, then restore
      const restore = () => {
        window.scrollTo(0, savedPosition);
        setTimeout(() => {
          isRestoring.current = false;
        }, 100);
      };

      // Try multiple times to ensure content is loaded
      requestAnimationFrame(() => {
        restore();
        // Backup restore after a small delay
        setTimeout(restore, 50);
      });
    }
  }, [pathKey]);

  // Manual save function
  const savePosition = useCallback(() => {
    scrollPositions.set(pathKey, window.scrollY);
  }, [pathKey]);

  return { savePosition };
};
