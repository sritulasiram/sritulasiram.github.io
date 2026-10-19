"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTypeText from "@/components/shared/ScrollTypeText";
import { GRAY, INK } from "@/components/home/homeShared";

const START_SCALE = 0.7;
const DRAG_DELAY_MS = 450;
const DRAG_MS = 1200;
const GUIDES_AT_MS = DRAG_DELAY_MS + DRAG_MS - 100;
const CHROME_OUT_AT_MS = GUIDES_AT_MS + 800;
const FOLLOW_UP_AT_MS = CHROME_OUT_AT_MS + 350;

/** Eases out past 1 and settles back, like dragging a corner a touch too far and nudging it back. */
const easeOutBack = (t: number) => {
  const c = 2.2;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

const HANDLES = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"];

type Phase = "idle" | "drag" | "guides" | "settled";

/**
 * The design beat of the intro, played the way it's done in a design tool: the headline starts small and
 * selected, a cursor drags its corner up to size (the handles, a live W × H readout and snapping
 * guides all follow), the selection lets go, and only then does the follow-up line write itself in.
 * Reduced-motion visitors get the finished state.
 */
export default function DesignStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [followUp, setFollowUp] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("settled");
      setFollowUp(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    const paint = (scale: number) => {
      const box = boxRef.current;
      const text = textRef.current;
      if (box) box.style.transform = `scale(${scale})`;
      if (readoutRef.current && text) {
        readoutRef.current.textContent = `${Math.round(text.offsetWidth * scale)} × ${Math.round(text.offsetHeight * scale)}`;
      }
    };

    const run = () => {
      setPhase("drag");
      paint(START_SCALE);
      timers.push(
        setTimeout(() => {
          const begin = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - begin) / DRAG_MS);
            paint(START_SCALE + (1 - START_SCALE) * easeOutBack(t));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, DRAG_DELAY_MS),
        setTimeout(() => setPhase("guides"), GUIDES_AT_MS),
        setTimeout(() => setPhase("settled"), CHROME_OUT_AT_MS),
        setTimeout(() => setFollowUp(true), FOLLOW_UP_AT_MS),
      );
    };

    paint(START_SCALE);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const hidden = phase === "idle";
  const selecting = phase === "drag" || phase === "guides";
  const settled = phase === "settled";

  return (
    <div ref={rootRef} className="flex flex-col gap-5 sm:gap-7">
      <noscript>
        <style>{"[data-ds-hidden]{opacity:1!important;transform:none!important}"}</style>
      </noscript>

      <div className="relative w-fit max-w-4xl">
        <div
          ref={boxRef}
          data-ds-hidden={hidden ? "" : undefined}
          className="relative origin-top-left transition-opacity duration-300"
          style={{ opacity: hidden ? 0 : 1, transform: settled ? "none" : `scale(${START_SCALE})` }}
        >
          <p
            ref={textRef}
            className={`text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.06] tracking-apple-hero ${INK}`}
          >
            Then I discovered design, and it changed how I see everything.
          </p>

          <div aria-hidden="true" className="pointer-events-none absolute -inset-2 transition-opacity duration-300" style={{ opacity: selecting ? 1 : 0 }}>
            <div className="absolute inset-0 border border-[var(--pa)]" />
            {HANDLES.map((pos) => (
              <span key={pos} className={`absolute ${pos} size-2.5 border border-[var(--pa)] bg-white`} />
            ))}
            <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--pa)] px-2 py-0.5 text-xs font-medium text-white tabular-nums">
              <span ref={readoutRef} />
            </span>

            {/* The cursor holding the bottom-right handle, with its name tag. */}
            <span className="absolute -bottom-1.5 -right-1.5 translate-x-1 translate-y-1">
              <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-sm">
                <path d="M2 1.5v14l3.6-3.4 2.6 5.6 2.4-1.1-2.6-5.5h5L2 1.5z" fill="#1D1D1F" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <span className="absolute left-4 top-4 whitespace-nowrap rounded-md rounded-tl-none bg-[var(--pa)] px-1.5 py-0.5 text-[11px] font-medium text-white">Sri</span>
            </span>
          </div>
        </div>

        {/* Alignment guides that flash when the edges snap into place. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-200" style={{ opacity: phase === "guides" ? 1 : 0 }}>
          <span className="absolute -top-8 -bottom-8 -left-2 w-px bg-[var(--pa)]" />
          <span className="absolute -right-8 -left-8 -top-2 h-px bg-[var(--pa)]" />
        </div>
      </div>

      <div className="min-h-[7.5rem] sm:min-h-[10rem]">
        {followUp && (
          <ScrollTypeText
            mode="words"
            className="text-2xl sm:text-4xl font-medium leading-snug tracking-apple-hero max-w-3xl"
            segments={[
              { text: "It's not enough for something to work. It has to feel natural, like ", className: GRAY },
              { text: "home.", className: INK },
            ]}
          />
        )}
      </div>
    </div>
  );
}
