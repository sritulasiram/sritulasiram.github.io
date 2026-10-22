"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTypeText from "@/components/shared/ScrollTypeText";
import { GRAY, INK } from "@/components/home/homeShared";

const WORDS = ["I've", "always", "felt", "inspired", "when", "exploring", "solutions."];

const SUBLINE_AT_MS = 1100;
/** The headline resolves the moment the typed line reaches the end of "Not just fixing". */
const FIX_AT_CHAR = "Not just fixing".length;
const WORD_STAGGER_MS = 70;

/**
 * The first beat. The headline arrives in soft gray, unfinished. The line under it types itself, and the
 * moment it says "fixing" the headline resolves left to right, each word settling into full colour as if
 * it had just been brought into place. Reduced-motion visitors get the finished headline at once.
 */
export default function FixStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [subline, setSubline] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setStarted(true);
      setSubline(true);
      setResolved(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStarted(true);
        timer = setTimeout(() => setSubline(true), SUBLINE_AT_MS);
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  /** Called as the line under the headline types out. */
  const onTyped = (count: number) => {
    if (count >= FIX_AT_CHAR) setResolved(true);
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-5 sm:gap-7">
      <p
        aria-label={WORDS.join(" ")}
        className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.06] tracking-apple-hero"
        style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(0.3em)", transition: "opacity 600ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {WORDS.map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span
              aria-hidden="true"
              className={`inline-block transition-colors duration-500 ease-out ${resolved ? INK : GRAY}`}
              style={{ transitionDelay: resolved && !still ? `${i * WORD_STAGGER_MS}ms` : "0ms" }}
            >
              {word}
            </span>
          </span>
        ))}
      </p>

      <div className="min-h-[3.5rem] sm:min-h-[5.5rem]">
        {subline && (
          <ScrollTypeText
            onProgress={onTyped}
            className="text-xl sm:text-3xl font-medium leading-snug tracking-apple-hero max-w-2xl"
            segments={[{ text: "Not just fixing what's broken, but asking what else is possible.", className: GRAY }]}
          />
        )}
      </div>
    </div>
  );
}
