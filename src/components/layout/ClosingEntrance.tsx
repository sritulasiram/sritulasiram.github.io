"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The closing block's entrance: when it scrolls into view, every `.closing-item` inside rises and
 * fades in on its own `--i` delay (see globals.css). Nothing is hidden before this runs, without
 * JavaScript, or when the visitor prefers reduced motion.
 */
export default function ClosingEntrance({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"shown" | "hidden" | "revealed">("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
    const hide = requestAnimationFrame(() => setState("hidden"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("revealed");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(hide);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} data-closing={state} className={className}>
      {children}
    </div>
  );
}
