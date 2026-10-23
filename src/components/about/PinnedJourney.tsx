"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";

export interface JourneyStep {
  id: string;
  year: string;
  period: string;
  role: string;
  organization: string;
  place?: string;
  logoSrc?: string;
  logoAlt?: string;
  description: string;
  highlights: { lead: string | null; rest: string }[];
  honors?: string[];
}

/** A number whose digits roll to their new value instead of swapping, like an odometer. */
function RollingYear({ value }: { value: string }) {
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {value.split("").map((ch, i) => {
          const digit = Number(ch);
          if (Number.isNaN(digit)) return <span key={i}>{ch}</span>;
          return (
            <span key={i} className="inline-block h-[1em] overflow-hidden align-top">
              <span
                className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ transform: `translateY(${-digit}em)` }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <span key={d} className="block h-[1em]">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}

/** Layers stacked in one cell, so a change crossfades in place and the cell keeps the widest size. */
const STACK = "grid [&>*]:[grid-area:1/1]";
const FADE =
  "transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";
const fade = (on: boolean) =>
  on ? "opacity-100 blur-0 translate-y-0" : "pointer-events-none opacity-0 blur-[6px] translate-y-1.5";

function YearCard({
  steps,
  active,
  year,
  compact,
}: {
  steps: JourneyStep[];
  active: number;
  /** The year counting with the scroll; null shows the current step's own year. */
  year: number | null;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[32px] bg-[var(--pa-tint)] ${compact ? "h-[27svh] p-5 pb-7" : "aspect-[4/3] p-9 pb-11"} flex flex-col justify-between`}
    >
      {/* Who: the logo tile stays put while the logos and names crossfade inside it */}
      <div className={`flex items-center ${compact ? "gap-3" : "gap-5"}`}>
        <span
          className={`relative shrink-0 bg-[#ffffff] shadow-sm ring-1 ring-black/5 ${
            compact ? "h-14 w-14 rounded-2xl" : "h-24 w-24 rounded-[26px]"
          }`}
        >
          {steps.map((step, i) =>
            step.logoSrc ? (
              <Image
                key={step.id}
                src={step.logoSrc}
                alt={step.logoAlt ?? step.organization}
                aria-hidden={i !== active}
                width={96}
                height={96}
                className={`absolute object-contain ${
                  compact ? "inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]" : "inset-3.5 h-[calc(100%-1.75rem)] w-[calc(100%-1.75rem)]"
                } ${FADE} ${i === active ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[6px] scale-90"}`}
              />
            ) : null,
          )}
        </span>
        <p className={`${STACK} items-center`}>
          {steps.map((step, i) => (
            <span
              key={step.id}
              aria-hidden={i !== active}
              className={`font-semibold leading-tight text-[#1D1D1F] dark:text-[#F5F5F7] ${FADE} ${fade(i === active)} ${
                compact ? "text-sm" : "text-xl"
              }`}
            >
              {step.organization}
            </span>
          ))}
        </p>
      </div>

      {/* When: one number that counts with the scroll, and the period crossfading under it */}
      <div>
        <p
          className={`font-semibold leading-none tracking-apple-hero text-[var(--pa)] dark:text-white tabular-nums ${
            compact ? "text-[clamp(48px,17cqw,72px)]" : "text-[clamp(72px,12cqw,136px)]"
          }`}
        >
          <RollingYear value={String(year ?? steps[active]?.year ?? "")} />
        </p>
        <p
          className={`${STACK} font-medium text-[#68686D] dark:text-[#A1A1A6] ${compact ? "mt-2 text-sm" : "mt-4 text-lg"}`}
        >
          {steps.map((step, i) => (
            <span key={step.id} aria-hidden={i !== active} className={`${FADE} ${fade(i === active)}`}>
              {step.period}
            </span>
          ))}
        </p>
      </div>

      {/* Progress: one segment per step along the bottom edge */}
      <ol
        className={`absolute flex gap-1.5 ${compact ? "inset-x-5 bottom-3" : "inset-x-9 bottom-5"}`}
        aria-hidden="true"
      >
        {steps.map((step, i) => (
          <li key={step.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#68686D]/25">
            {/* Filled by PinnedJourney as you scroll through this step (scaleX 0 to 1) */}
            <span
              data-fill={i}
              className="block h-full origin-left rounded-full bg-[var(--pa)]"
              style={{ transform: `scaleX(${i < active ? 1 : 0})` }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

/** How far through a step (its progress bar) the year waits before it starts counting to the next. */
const COUNT_FROM = 0.7;

/**
 * Signature scroll moment: a pinned card shows the year and place while the steps scroll past.
 * On desktop the card sits beside the steps; on small screens it is pinned at the top, smaller,
 * and the steps scroll underneath it.
 */
export default function PinnedJourney({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0);
  const [year, setYear] = useState<number | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // One reading line drives both the card and the year: the middle of the screen, lower on phones.
  // The card switches to the next step as the progress bar fills, and the big number counts
  // over the last stretch of the bar, so it lands on the new year as the new card appears
  // (2017 to 2020 reads 2018, 2019 on the way). Reduced motion keeps each step's own year.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const years = steps.map((step) => Number(step.year));
    const countYears = !reduceMotion && !years.some(Number.isNaN);
    let raf = 0;

    const update = () => {
      raf = 0;
      const els = refs.current;
      if (els.length < steps.length || els.some((el) => !el)) return;
      const line = window.innerHeight * (mq.matches ? 0.5 : 0.55);
      const rects = els.map((el) => el!.getBoundingClientRect());

      // Progress bar: each segment fills as the reading line passes through its step.
      const fills = rects.map((r) => Math.min(1, Math.max(0, (line - r.top) / r.height)));
      rootRef.current?.querySelectorAll<HTMLElement>("[data-fill]").forEach((bar) => {
        bar.style.transform = `scaleX(${fills[Number(bar.dataset.fill)] ?? 0})`;
      });

      // The card switches when the reading line reaches the next step's top, which is also when
      // the current step's bar is full.
      let current = 0;
      for (let i = 1; i < rects.length; i++) {
        if (line >= rects[i].top) current = i;
      }
      setActive(current);
      if (!countYears) return;

      // The year holds while the bar fills to COUNT_FROM, then counts on to the next step's year,
      // arriving as the bar completes and the card switches.
      const ease = (t: number) => t * t * (3 - 2 * t);
      const progress = (from: number, to: number) =>
        Math.min(1, Math.max(0, (fills[current] - from) / (to - from)));

      let value = years[current];
      if (current + 1 < rects.length) {
        value += (years[current + 1] - years[current]) * ease(progress(COUNT_FROM, 1));
      }
      // An ongoing last step ("2024 — Present") keeps counting on to the current year, passing
      // 2025 and 2026, and reaches it as its bar completes.
      const last = rects.length - 1;
      if (current === last && last > 0 && /present/i.test(steps[last].period)) {
        value += (new Date().getFullYear() - years[last]) * ease(progress(COUNT_FROM, 1));
      }
      setYear(Math.round(value));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps]);

  return (
    <div ref={rootRef} className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16">
      {/* Pinned year card (phones) */}
      <div className="sticky top-14 z-10 -mx-6 bg-white px-6 pb-3 pt-2 dark:bg-black md:hidden [container-type:inline-size]">
        <YearCard steps={steps} active={active} year={year} compact />
      </div>

      {/* Pinned year card (desktop) */}
      <div className="hidden md:block [container-type:inline-size]">
        <div className="sticky top-[max(72px,calc(50vh_+_26px_-_37.5cqw))]">
          <YearCard steps={steps} active={active} year={year} />
        </div>
      </div>

      {/* Steps */}
      <ol>
        {steps.map((step, i) => (
          <li
            key={step.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            id={`journey-step-${i}`}
            className="scroll-mt-24 py-8 md:py-[10svh]"
          >
            <div className={`transition-opacity duration-500 motion-reduce:transition-none ${i === active ? "opacity-100" : "opacity-35"}`}>
              <h3 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.1]">
                {step.role}
              </h3>
              {step.place && <p className="mt-2 text-sm text-[#68686D] dark:text-[#A1A1A6]">{step.place}</p>}
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">{step.description}</p>

              {step.honors && step.honors.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {step.honors.map((honor) => (
                    <li key={honor} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#1D1D1F] dark:text-[#F5F5F7]">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-[var(--pa)]" aria-hidden="true" />
                      {honor}
                    </li>
                  ))}
                </ul>
              )}

              <details className="group mt-4">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-medium text-[var(--pa)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-xs [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">More about this</span>
                  <span className="hidden group-open:inline">Show less</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <ul className="mt-3 space-y-3.5">
                  {step.highlights.map((h) => (
                    <li key={h.rest} className="text-[15px] leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">
                      {h.lead && <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{h.lead}. </span>}
                      {h.rest}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
