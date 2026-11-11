"use client";

import { useEffect } from "react";

/**
 * Marks the page while the visitor is using the keyboard (`data-kbd` on <html>). The blue focus ring only
 * shows then, so clicks, taps and programmatic focus (a search box opening, a menu closing) never flash it.
 * Pressing Tab or an arrow key brings it back for keyboard users; any mouse or touch input hides it again.
 */
export default function KeyboardFocus() {
  useEffect(() => {
    const root = document.documentElement;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key.startsWith("Arrow")) root.setAttribute("data-kbd", "");
    };
    const off = () => root.removeAttribute("data-kbd");
    window.addEventListener("keydown", on, true);
    window.addEventListener("pointerdown", off, true);
    return () => {
      window.removeEventListener("keydown", on, true);
      window.removeEventListener("pointerdown", off, true);
    };
  }, []);
  return null;
}
