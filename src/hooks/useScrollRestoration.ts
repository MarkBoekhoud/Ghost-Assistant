import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

type ScrollRestorationOptions = {
  /**
   * When false, restoration will not run yet. Useful for pages that load data.
   * Defaults to true.
   */
  ready?: boolean;
  /** Optional override for the key used to store positions. Defaults to pathname. */
  key?: string;
};

export const useScrollRestoration = (options?: ScrollRestorationOptions) => {
  const location = useLocation();
  const isRestoring = useRef(false);

  const pathKey = options?.key ?? location.pathname;
  const ready = options?.ready ?? true;

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

  // Restore scroll position when the page is ready
  useEffect(() => {
    if (!ready) return;

    const savedPosition = scrollPositions.get(pathKey);
    if (savedPosition === undefined || savedPosition <= 0) return;

    isRestoring.current = true;

    const restore = () => {
      window.scrollTo(0, savedPosition);
    };

    // Try a few times after readiness to ensure layout/content is in place.
    let attempts = 0;
    const maxAttempts = 10;

    const tick = () => {
      restore();
      attempts += 1;

      if (attempts >= maxAttempts) {
        isRestoring.current = false;
        return;
      }

      setTimeout(tick, 75);
    };

    requestAnimationFrame(() => {
      tick();
    });
  }, [pathKey, ready]);

  // Manual save function
  const savePosition = useCallback(() => {
    scrollPositions.set(pathKey, window.scrollY);
  }, [pathKey]);

  return { savePosition };
};
