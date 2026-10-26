"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children in once they scroll into view. Content already on screen at
 * load is never hidden, and nothing is hidden when the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  rootMargin = "0px 0px -12% 0px",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** How far up the screen it must be before it plays. A bigger bottom inset waits longer. */
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"shown" | "hidden" | "revealed">("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    const hide = requestAnimationFrame(() => setState("hidden"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("revealed");
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(hide);
      io.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "revealed" ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        state === "hidden" ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
