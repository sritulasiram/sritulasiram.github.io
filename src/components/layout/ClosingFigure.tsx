"use client";

import { useEffect, useRef, useState } from "react";

// How long after the closing scrolls in each step happens. The words finish rising at about 1.8s.
const PEEK_AT_MS = 2200;
const HOP_AT_MS = 3200;
const WAVE_AT_MS = 3750;
// The bubble follows the hand up, and goes before the figure does.
const BUBBLE_ON_AT_MS = WAVE_AT_MS + 300;
const BUBBLE_OFF_AT_MS = WAVE_AT_MS + 2400;
const EXIT_AT_MS = WAVE_AT_MS + 2900;

// 0 hidden, 1 peeks over the button, 2 hops up, 3 waves, 4 hops back down behind the button.
type Step = 0 | 1 | 2 | 3 | 4;

/**
 * The goodbye to the Home page's "Hi!": the stick figure peeks up from behind the top of the
 * email button, hops up, sways as it waves "See you!", then hops back down behind the button and
 * leaves the button clear. It shares the keyframes of the Home intro. Reduced-motion visitors do
 * not get it. Put it first inside a `relative` box that also holds the button, which sits above it.
 */
export default function ClosingFigure() {
  const ref = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState<Step>(0);
  const [bubble, setBubble] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReduced(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timers.push(
          setTimeout(() => setStep(1), PEEK_AT_MS),
          setTimeout(() => setStep(2), HOP_AT_MS),
          setTimeout(() => setStep(3), WAVE_AT_MS),
          setTimeout(() => setBubble(true), BUBBLE_ON_AT_MS),
          setTimeout(() => setBubble(false), BUBBLE_OFF_AT_MS),
          setTimeout(() => setStep(4), EXIT_AT_MS),
        );
      },
      { threshold: 0.9 },
    );
    io.observe(el.parentElement ?? el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  if (reduced) return <span ref={ref} aria-hidden="true" className="hidden" />;

  const peeking = step === 1;
  const waving = step === 3;
  const body = step === 4
    ? { transform: "translateY(104%)", animation: "stick-exit 700ms cubic-bezier(0.45, 0, 0.7, 0.2) both" }
    : step >= 2
    ? { transform: "none", animation: "stick-hop 650ms cubic-bezier(0.3, 0.8, 0.4, 1) both" }
    : peeking
      ? { transform: "translateY(58%)", animation: "stick-peek 600ms cubic-bezier(0.16, 1, 0.3, 1) both" }
      : { transform: "translateY(104%)" };
  const stroke = "stroke-[#1D1D1F] dark:stroke-[#F5F5F7]";

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 z-0 h-[4.75rem] w-[4.5rem] -translate-x-1/2 sm:h-24 sm:w-[5.75rem]"
      style={{ bottom: "calc(100% - 0.4rem)", clipPath: "inset(-100% -200% 0 -200%)" }}
    >
      <svg
        viewBox="0 0 80 84"
        className="size-full overflow-visible"
        style={{ transformBox: "view-box", transformOrigin: "40px 84px", ...body }}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* The whole figure sways from the feet while it waves */}
        <g
          style={{
            transformBox: "view-box",
            transformOrigin: "40px 84px",
            animation: waving ? "stick-sway 1s ease-in-out 2" : "none",
          }}
        >
        <path d="M40 50 L27 82 M40 50 L53 82 M40 23 L40 50" className={stroke} />
        <path d="M40 31 L26 48" className={stroke} />
        <g
          style={{
            transformBox: "view-box",
            transformOrigin: "40px 31px",
            transform: waving ? undefined : "rotate(93deg)",
            animation: waving ? "stick-wave 2s ease-in-out 1 forwards" : "none",
          }}
        >
          <path d="M40 31 L58 17" className={stroke} />
        </g>
        <circle cx="40" cy="13" r="10" className={`${stroke} fill-white dark:fill-black`} />
        <g style={{ animation: peeking ? "stick-glance 1000ms ease-in-out 100ms both" : undefined }}>
          <circle cx="36.5" cy="11.5" r="1.1" className="fill-[#1D1D1F] stroke-none dark:fill-[#F5F5F7]" />
          <circle cx="43.5" cy="11.5" r="1.1" className="fill-[#1D1D1F] stroke-none dark:fill-[#F5F5F7]" />
        </g>
        <path d="M36 16.5 Q40 20 44 16.5" strokeWidth="2.4" className={stroke} />
        </g>
      </svg>
      <span
        className="absolute bottom-[100%] right-[66%] whitespace-nowrap rounded-2xl rounded-br-sm bg-[#1D1D1F] px-3 py-1 text-sm font-semibold text-white transition-opacity duration-500 sm:text-base dark:bg-[#F5F5F7] dark:text-[#1D1D1F]"
        style={{
          opacity: bubble ? 1 : 0,
          animation: bubble ? "stick-bubble 450ms cubic-bezier(0.34, 1.56, 0.64, 1) both" : "none",
        }}
      >
        See you!
      </span>
    </span>
  );
}
