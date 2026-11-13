"use client";

import { useEffect } from "react";

const KEY = (path: string) => `scroll:${path}`;
/** Give up waiting for the page to grow tall enough after this long. */
const RESTORE_TIMEOUT_MS = 2500;

/**
 * Puts a refreshed page back where it was. The browser's own restore runs before images and the pinned
 * sections have settled, finds a page that is too short and gives up at the top, and the smooth-scroll
 * setting on the page does not help. This remembers the position for the tab and, on a reload or
 * back/forward load, keeps trying until the page is tall enough to get there. It renders nothing.
 */
export default function ScrollMemory() {
  useEffect(() => {
    const path = window.location.pathname;
    let restoring = true;
    let raf = 0;

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const revisit = nav?.type === "reload" || nav?.type === "back_forward";
    let target = 0;
    try {
      target = revisit ? Number(sessionStorage.getItem(KEY(path))) || 0 : 0;
    } catch {
      /* storage blocked: nothing to restore */
    }

    // The theme script in <head> hides the page on a revisit (see layout.tsx); show it once it is in place.
    const reveal = () => document.documentElement.classList.remove("scroll-restoring");

    if (target > 0) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      const start = performance.now();
      const attempt = () => {
        const room = document.documentElement.scrollHeight - window.innerHeight;
        if (room >= target - 2) {
          window.scrollTo({ top: target, behavior: "instant" });
          if (Math.abs(window.scrollY - target) < 2) {
            restoring = false;
            reveal();
            return;
          }
        }
        if (performance.now() - start < RESTORE_TIMEOUT_MS) {
          raf = requestAnimationFrame(attempt);
        } else {
          restoring = false;
          window.scrollTo({ top: Math.min(target, Math.max(0, room)), behavior: "instant" });
          reveal();
        }
      };
      raf = requestAnimationFrame(attempt);
      window.addEventListener("pagehide", () => (window.history.scrollRestoration = previous), { once: true });
    } else {
      restoring = false;
      reveal();
    }

    let saveRaf = 0;
    const save = () => {
      saveRaf = 0;
      // While restoring, the page is still at the top and must not overwrite the saved position.
      if (restoring) return;
      try {
        sessionStorage.setItem(KEY(path), String(Math.round(window.scrollY)));
      } catch {
        /* ignore */
      }
    };
    const onScroll = () => {
      if (!saveRaf) saveRaf = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(saveRaf);
      reveal();
    };
  }, []);

  return null;
}
