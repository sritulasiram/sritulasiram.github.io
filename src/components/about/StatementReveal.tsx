"use client";

import { useEffect, useRef } from "react";

const MIN_OPACITY = 0.2;
/** How many words are mid-fade at once: the reveal reads as a soft wave rather than word by word. */
const SOFT = 6;

interface Props {
  lead: string;
  rest: string;
  secondary: string;
  wrapClassName: string;
}

/**
 * The About statement, read aloud by scrolling. The section is pinned to the screen and every
 * word brightens in turn as you scroll: the big opening line first, then the smaller paragraph.
 * Reduced-motion visitors get the finished text. The full text is available to screen readers
 * in one piece; the animated copy is hidden from them.
 */
export default function StatementReveal({ lead, rest, secondary, wrapClassName }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const leadWords = lead.split(/\s+/);
  const restWords = rest.split(/\s+/);
  const secondaryWords = secondary.split(/\s+/);
  const total = leadWords.length + restWords.length + secondaryWords.length;

  useEffect(() => {
    const words = wordRefs.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w && (w.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1;
      // Finish a little before the pin releases so the last words rest fully lit.
      const pos = Math.min(1, p / 0.85) * (total + SOFT);
      words.forEach((w, i) => {
        if (!w) return;
        const t = Math.min(1, Math.max(0, (pos - i) / SOFT));
        w.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * t);
      });
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
  }, [total]);

  let n = 0;
  const renderWords = (list: string[]) =>
    list.map((word) => {
      const i = n++;
      return (
        <span
          key={i}
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
          className="inline-block mr-[0.26em]"
          style={{ opacity: MIN_OPACITY }}
        >
          {word}
        </span>
      );
    });

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative"
      style={{ height: "calc(100svh + 140svh)" }}
    >
      <p className="sr-only">
        {lead} {rest} {secondary}
      </p>
      <div aria-hidden="true" className="sticky top-0 flex h-svh items-center">
        <div className={wrapClassName}>
          <p className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero text-[#1D1D1F] dark:text-[#F5F5F7]">
            {renderWords(leadWords)}
            {renderWords(restWords)}
          </p>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7]">
            {renderWords(secondaryWords)}
          </p>
        </div>
      </div>
    </section>
  );
}
