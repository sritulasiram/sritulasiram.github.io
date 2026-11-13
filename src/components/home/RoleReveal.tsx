"use client";

import { useEffect } from "react";

/**
 * On phones the role block (Cytron Technologies down to the buttons) sits below the fold, so its entrance plays when
 * it scrolls into view instead of on load. It renders nothing visible: it marks the hero with `data-role-in` and the
 * CSS (`.hg-role .hx` under 1024px) does the rest. Without JavaScript the noscript rule shows the block as usual.
 */
export default function RoleReveal() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    const role = document.getElementById("hero-role");
    if (!hero || !role) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.setAttribute("data-role-in", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        hero.setAttribute("data-role-in", "");
        io.disconnect();
      },
      { threshold: 0.3, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(role);
    return () => io.disconnect();
  }, []);
  return (
    <noscript>
      <style>{"@media (max-width:1023px){.hg-role .hx{opacity:1!important;animation:none!important}}"}</style>
    </noscript>
  );
}
