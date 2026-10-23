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

function YearCard({ steps, active, compact }: { steps: JourneyStep[]; active: number; compact?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)] ${compact ? "h-[27svh]" : "aspect-[4/3]"}`}
    >
      {steps.map((step, i) => (
        <div
          key={step.id}
          aria-hidden={i !== active}
          className={`absolute inset-0 flex flex-col justify-between transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            compact ? "p-5" : "p-8"
          } ${i === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
        >
          <div className="flex items-center gap-3">
            {step.logoSrc && (
              <span
                className={`flex items-center justify-center rounded-xl bg-[#ffffff] p-1.5 ring-1 ring-black/10 ${
                  compact ? "h-10 w-10" : "h-12 w-12"
                }`}
              >
                <Image src={step.logoSrc} alt={step.logoAlt ?? step.organization} width={36} height={36} className="h-full w-full object-contain" />
              </span>
            )}
            <p className="text-sm font-semibold text-[#68686D] dark:text-[#A1A1A6] leading-snug">{step.organization}</p>
          </div>
          <div>
            <p
              className={`font-semibold leading-none tracking-apple-hero text-[var(--pa)] dark:text-white tabular-nums ${
                compact ? "text-[clamp(48px,17cqw,72px)]" : "text-[clamp(72px,11cqw,128px)]"
              }`}
            >
              {step.year}
            </p>
            <p className={`font-medium text-[#1D1D1F] dark:text-[#F5F5F7] ${compact ? "mt-2 text-sm" : "mt-3 text-base"}`}>{step.period}</p>
          </div>
        </div>
      ))}
      <ol className={`absolute flex items-center gap-2 ${compact ? "bottom-5 right-5" : "bottom-7 right-8"}`} aria-hidden="true">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className={`h-1.5 rounded-full transition-all duration-500 motion-reduce:transition-none ${
              i === active ? "w-6 bg-[var(--pa)]" : "w-1.5 bg-[#68686D]/40"
            }`}
          />
        ))}
      </ol>
    </div>
  );
}

/**
 * Signature scroll moment: a pinned card shows the year and place while the steps scroll past.
 * On desktop the card sits beside the steps; on small screens it is pinned at the top, smaller,
 * and the steps scroll underneath it.
 */
export default function PinnedJourney({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        },
        // Desktop: the middle of the viewport. Phones: just below the pinned card.
        { rootMargin: mq.matches ? "-45% 0px -45% 0px" : "-52% 0px -38% 0px" },
      );
      refs.current.forEach((el) => el && io!.observe(el));
    };
    observe();
    mq.addEventListener("change", observe);
    return () => {
      mq.removeEventListener("change", observe);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16">
      {/* Pinned year card (phones) */}
      <div className="sticky top-14 z-10 -mx-6 bg-white px-6 pb-3 pt-2 dark:bg-black md:hidden [container-type:inline-size]">
        <YearCard steps={steps} active={active} compact />
      </div>

      {/* Pinned year card (desktop) */}
      <div className="hidden md:block [container-type:inline-size]">
        <div className="sticky top-[max(72px,calc(50vh_+_26px_-_37.5cqw))]">
          <YearCard steps={steps} active={active} />
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
            className="scroll-mt-24 py-8 md:flex md:min-h-[60vh] md:items-center md:py-0"
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
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-medium text-[var(--pa)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)] rounded-xs [&::-webkit-details-marker]:hidden">
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
