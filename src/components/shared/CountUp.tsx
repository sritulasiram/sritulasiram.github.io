"use client";

import { useEffect, useRef, useState } from "react";

// Only plain numbers with a non-numeric suffix animate ("300+", "0.60", "180s"). Anything like
// "2.52.1" is shown as is.
const PATTERN = /^(\d+(?:\.\d+)?)([^\d.]*)$/;

/**
 * Counts up to its value once, when it scrolls into view. Server-rendered with the final value,
 * so it reads correctly without JavaScript, and never animates for reduced-motion visitors or for
 * numbers already on screen at load.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const match = PATTERN.exec(value);
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(match[1]);
    if (target === 0) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const decimals = (match[1].split(".")[1] ?? "").length;
    const format = (n: number) => n.toFixed(decimals) + match[2];

    let raf = 0;
    const hide = requestAnimationFrame(() => setShown(format(0)));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setShown(t < 1 ? format(target * (1 - Math.pow(1 - t, 3))) : value);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(hide);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    // One text node, labelled with the final value: screen readers hear "300+" once, and copying
    // the text never picks up a hidden duplicate.
    <span ref={ref} role="img" aria-label={value} className={className}>
      {shown}
    </span>
  );
}
