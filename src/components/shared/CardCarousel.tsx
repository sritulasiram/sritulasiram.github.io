"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Aligns the first card with the page's 64rem content column and lets the row bleed off the right edge.
const EDGE = "max(1.5rem, calc((100% - 64rem) / 2 + 2rem))";

/**
 * Apple-style card row: heading on the left, circular previous/next buttons on the right, and a
 * snapping track of cards that bleeds off the edge. Cards are the children; each should be
 * `snap-start shrink-0` with a fixed width.
 */
export default function CardCarousel({
  title,
  subtitle,
  label,
  children,
}: {
  title: string;
  subtitle?: string;
  label: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // Judge by the last card, not scrollWidth: the track's end padding would otherwise make a row
    // whose cards all fit look scrollable.
    const last = el.lastElementChild as HTMLElement | null;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(!!last && last.getBoundingClientRect().right > el.getBoundingClientRect().right + 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 340;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "h-10 w-10 rounded-full flex items-center justify-center bg-[var(--pa-soft)] text-[var(--pa)] transition-[opacity,background-color] hover:bg-[color-mix(in_srgb,var(--pa)_22%,transparent)] disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]";

  return (
    <section aria-label={label} className="py-16 sm:py-24 bg-[var(--pa-tint)]">
      <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-lg text-[#68686D] dark:text-[#A1A1A6] max-w-2xl">{subtitle}</p>}
        </div>
        <div className={`flex gap-2 shrink-0 ${canPrev || canNext ? "" : "hidden"}`}>
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous" className={btn}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next" className={btn}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`${label} cards`}
        className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-[var(--pa)]"
        style={{ paddingInline: EDGE, scrollPaddingInline: EDGE }}
      >
        {children}
      </div>
    </section>
  );
}
