"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTypeText from "@/components/shared/ScrollTypeText";
import { GRAY, INK } from "@/components/home/homeShared";

// How long after the beat scrolls in each step happens.
const NAME_AT_MS = 500;
const POP_AT_MS = 1000;
const WAVE_AT_MS = 1550;
const DETAIL_AT_MS = 3500;

type Step = 0 | 1 | 2 | 3 | 4;

/**
 * "That's me, Sri." The line writes itself in, and a stick figure springs up from behind the word
 * "Sri.", waves hello to the reader, then the line about precision follows. Reduced-motion visitors get
 * everything at once, with the figure standing still.
 */
export default function MeetSri() {
  const rootRef = useRef<HTMLDivElement>(null);
  // 0 nothing, 1 "That's me,", 2 + "Sri.", 3 the figure pops up, 4 it waves and says hi.
  const [step, setStep] = useState<Step>(0);
  const [detail, setDetail] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setStep(3);
      setDetail(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStep(1);
        timers.push(
          setTimeout(() => setStep(2), NAME_AT_MS),
          setTimeout(() => setStep(3), POP_AT_MS),
          setTimeout(() => setStep(4), WAVE_AT_MS),
          setTimeout(() => setDetail(true), DETAIL_AT_MS),
        );
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const rise = (on: boolean) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(0.3em)",
    transition: "opacity 500ms ease-out, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
  });
  const popped = step >= 3;
  const waving = step >= 4;
  const stroke = "stroke-[#1D1D1F] dark:stroke-[#F5F5F7]";

  return (
    <div ref={rootRef} className="sm:ml-auto flex flex-col gap-4 sm:gap-5 max-w-3xl sm:items-end sm:text-right mt-8">
      <p aria-label="That's me, Sri." className={`text-3xl sm:text-5xl font-semibold leading-[1.1] tracking-apple-hero ${INK}`}>
        <span aria-hidden="true" className="inline-block whitespace-pre" style={rise(step >= 1)}>
          {"That's me, "}
        </span>
        <span aria-hidden="true" className="relative inline-block" style={rise(step >= 2)}>
          Sri.
          {/* The figure stands on the top of the word; the box clips it, so it rises from behind the letters. */}
          <span
            className="pointer-events-none absolute left-1/2 h-[4.75rem] w-[4.5rem] -translate-x-1/2 sm:h-24 sm:w-[5.75rem]"
            style={{ bottom: "calc(100% - 0.17em)", clipPath: "inset(-100% -200% 0 -200%)" }}
          >
            <svg
              viewBox="0 0 80 84"
              className="size-full overflow-visible"
              style={{
                transformBox: "view-box",
                transformOrigin: "40px 84px",
                transform: popped ? "none" : "translateY(104%)",
                animation: popped && !still ? "stick-pop 650ms cubic-bezier(0.3, 0.8, 0.4, 1) both" : undefined,
              }}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* legs and body */}
              <path d="M40 50 L27 82 M40 50 L53 82 M40 23 L40 50" className={stroke} />
              {/* resting arm */}
              <path d="M40 31 L26 48" className={stroke} />
              {/* waving arm, hinged at the shoulder */}
              <g
                style={{
                  transformBox: "view-box",
                  transformOrigin: "40px 31px",
                  transform: waving || still ? undefined : "rotate(93deg)",
                  animation: waving && !still ? "stick-wave 2s ease-in-out 1 forwards" : "none",
                }}
              >
                <path d="M40 31 L58 17" className={stroke} />
              </g>
              {/* head */}
              <circle cx="40" cy="13" r="10" className={`${stroke} fill-white dark:fill-black`} />
              <circle cx="36.5" cy="11.5" r="1.1" className="fill-[#1D1D1F] stroke-none dark:fill-[#F5F5F7]" />
              <circle cx="43.5" cy="11.5" r="1.1" className="fill-[#1D1D1F] stroke-none dark:fill-[#F5F5F7]" />
              <path d="M36 16.5 Q40 20 44 16.5" strokeWidth="2.4" className={stroke} />
            </svg>
            <span
              className="absolute bottom-[86%] right-[58%] whitespace-nowrap rounded-2xl rounded-br-sm bg-[var(--pa)] px-3 py-1 text-sm font-semibold text-white sm:text-base"
              style={{ opacity: waving || still ? 1 : 0, animation: waving && !still ? "stick-bubble 450ms cubic-bezier(0.34, 1.56, 0.64, 1) both" : undefined }}
            >
              Hi!
            </span>
          </span>
        </span>
      </p>

      <div className="min-h-[6rem] sm:min-h-[7.5rem]">
        {detail && (
          <ScrollTypeText
            mode="words"
            className="text-xl sm:text-3xl font-medium leading-snug tracking-apple-hero"
            segments={[
              { text: "That curiosity taught me ", className: GRAY },
              { text: "precision", className: INK },
              { text: ", because the details are what make a solution great.", className: GRAY },
            ]}
          />
        )}
      </div>
    </div>
  );
}
