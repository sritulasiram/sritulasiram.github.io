"use client";

import { useEffect, useRef, useState } from "react";

const WORD_STAGGER_MS = 70;

/**
 * A heading whose words come into focus one after another, each rising out of a blur, once it scrolls into
 * view. Content already on screen at load is never hidden, and nothing is hidden when the visitor prefers
 * reduced motion.
 */
export default function FocusText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
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
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(hide);
      io.disconnect();
    };
  }, []);

  const words = text.split(" ");
  return (
    <h3 ref={ref} aria-label={text} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span
            aria-hidden="true"
            className="inline-block transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{
              opacity: state === "hidden" ? 0 : 1,
              transform: state === "hidden" ? "translateY(0.4em)" : "none",
              filter: state === "hidden" ? "blur(8px)" : "none",
              transitionDelay: state === "revealed" ? `${delay + i * WORD_STAGGER_MS}ms` : "0ms",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h3>
  );
}
