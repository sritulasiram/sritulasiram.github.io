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

/**
 * Signature scroll moment: a pinned card shows the year and place while the steps scroll past on
 * the right. On small screens each step carries its own year badge instead.
 */
export default function PinnedJourney({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16">
      {/* Pinned year card (desktop) */}
      <div className="hidden md:block [container-type:inline-size]">
        <div className="sticky top-[max(72px,calc(50vh_+_26px_-_37.5cqw))]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)]">
            {steps.map((step, i) => (
              <div
                key={step.id}
                aria-hidden={i !== active}
                className={`absolute inset-0 flex flex-col justify-between p-8 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  i === active ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                <div className="flex items-center gap-3">
                  {step.logoSrc && (
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffffff] p-1.5 ring-1 ring-black/10">
                      <Image src={step.logoSrc} alt={step.logoAlt ?? step.organization} width={36} height={36} className="h-full w-full object-contain" />
                    </span>
                  )}
                  <p className="text-sm font-semibold text-[#68686D] dark:text-[#A1A1A6] leading-snug">{step.organization}</p>
                </div>
                <div>
                  <p className="text-[clamp(72px,11cqw,128px)] font-semibold leading-none tracking-apple-hero text-[var(--pa)] dark:text-white tabular-nums">
                    {step.year}
                  </p>
                  <p className="mt-3 text-base font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{step.period}</p>
                </div>
              </div>
            ))}
            <ol className="absolute bottom-7 right-8 flex items-center gap-2" aria-hidden="true">
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
            className="scroll-mt-24 py-10 md:flex md:min-h-[60vh] md:items-center md:py-0"
          >
            <div className={`transition-opacity duration-500 motion-reduce:transition-none ${i === active ? "md:opacity-100" : "md:opacity-35"}`}>
              <p className="text-sm font-semibold text-[var(--pa)] md:hidden">{step.period}</p>
              <h3 className="mt-1 text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.1] md:mt-0">
                {step.role}
              </h3>
              <p className="mt-2 text-sm text-[#68686D] dark:text-[#A1A1A6] md:hidden">
                {step.organization}
                {step.place ? ` · ${step.place}` : ""}
              </p>
              {step.place && <p className="mt-2 hidden text-sm text-[#68686D] dark:text-[#A1A1A6] md:block">{step.place}</p>}
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
