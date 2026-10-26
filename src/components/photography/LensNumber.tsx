"use client";

import { useEffect, useRef } from "react";

const COUNT_MS = 1000;

/**
 * A focal length that zooms in when it scrolls into view: the number counts up from zero while coming into
 * focus out of a blur. The full number is in the markup, so without JavaScript, or with reduced motion,
 * it reads as plain text.
 */
export default function LensNumber({ value, className, suffixClassName }: { value: number; className?: string; suffixClassName?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    const root = rootRef.current;
    const num = numRef.current;
    if (!root || !num) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const play = () => {
      const begin = performance.now();
      num.animate(
        [{ filter: "blur(10px)", transform: "scale(0.92)" }, { filter: "blur(0)", transform: "scale(1)" }],
        { duration: COUNT_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / COUNT_MS);
        num.textContent = (value * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    num.textContent = (0).toFixed(decimals);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        play();
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals]);

  return (
    <span ref={rootRef} className={className} aria-label={`${value}×`}>
      <span ref={numRef} aria-hidden="true" className="inline-block origin-left">
        {value}
      </span>
      <span aria-hidden="true" className={suffixClassName}>
        ×
      </span>
    </span>
  );
}
