"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { GRAY, INK } from "@/components/home/homeShared";

const SEGMENTS = [
  { text: "And through photography, I explore ", className: GRAY },
  { text: "nature's magic ", className: INK },
  { text: "and freeze the moments that only happen once.", className: GRAY },
];
const WORDS = SEGMENTS.flatMap((s) =>
  (s.text.match(/\S+/g) ?? []).map((text) => ({
    text,
    className: s.className,
  })),
);

const WORD_STAGGER_MS = 110;
const FOCUS_MS = 800;
const LOCK_AT_MS = WORDS.length * WORD_STAGGER_MS + FOCUS_MS;

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

/**
 * The closing line of the intro, shot like a photograph. Viewfinder brackets frame the block while the words
 * pull into focus one after another (blurred, then sharp). The brackets then close in to lock focus.
 * Reduced-motion visitors get the sharp text and the frame at once.
 */
export default function PhotographyStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  // 0 waiting, 1 words focusing, 2 focus locked.
  const [phase, setPhase] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setPhase(2);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase(1);
        timers.push(setTimeout(() => setPhase(2), LOCK_AT_MS));
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const locked = phase >= 2;

  return (
    <div
      ref={rootRef}
      className="sm:ml-auto sm:text-right max-w-3xl w-fit sm:w-fit"
    >
      <div className="relative p-3 sm:p-5">
        {/* Viewfinder brackets: wide while hunting for focus, tight once locked. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute text-[var(--pa)]"
          style={{
            inset: locked || still ? 0 : "-14px",
            opacity: phase === 0 ? 0 : 1,
            transition:
              "inset 450ms cubic-bezier(0.3, 0.9, 0.3, 1), opacity 500ms ease-out",
          }}
        >
          {CORNERS.map((pos) => (
            <span
              key={pos}
              className={`absolute size-4 rounded-[2px] border-current sm:size-5 ${pos}`}
            />
          ))}
        </div>

        <p
          aria-label={SEGMENTS.map((s) => s.text).join("")}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-apple-hero"
        >
          {WORDS.map((word, i) => {
            const sharp = phase >= 1;
            const delay = sharp && !still ? i * WORD_STAGGER_MS : 0;
            return (
              <Fragment key={i}>
                {i > 0 && " "}
                <span
                  aria-hidden="true"
                  className={`${word.className} inline-block`}
                  style={{
                    filter: sharp ? "blur(0)" : "blur(14px)",
                    opacity: sharp ? 1 : 0.25,
                    transition: still
                      ? "none"
                      : `filter ${FOCUS_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, opacity ${FOCUS_MS}ms ease-out ${delay}ms`,
                  }}
                >
                  {word.text}
                </span>
              </Fragment>
            );
          })}
        </p>
      </div>

    </div>
  );
}
