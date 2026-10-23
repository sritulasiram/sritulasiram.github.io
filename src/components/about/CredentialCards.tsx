"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";

export interface Credential {
  title: string;
  /** The issuing body. */
  body: string;
  /** Short state, such as "Active" or "Completed". */
  status: string;
  /** Whether the credential is current, which sets the status dot. */
  active?: boolean;
  /** Extra detail beside the status, such as "Valid until Mar 2028". */
  note?: string;
  /** A reference number a third party can check. */
  verify?: { label: string; value: string };
  /** One line under the issuer, such as the discipline. */
  subtitle?: string;
  logoSrc?: string;
}

// Aligns the first card with the page's 64rem content column and lets the row bleed off the right edge.
const EDGE = "max(1.5rem, calc((100% - 64rem) / 2 + 2rem))";

/**
 * Credentials as an Apple-style card row: the heading on the left, circular previous/next buttons on
 * the right, and a snapping track of tall rounded cards that bleeds off the edge. Each card holds
 * the issuer logo, the status, the title and the reference number.
 */
export default function CredentialCards({ items, heading }: { items: Credential[]; heading: React.ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 20 : 340), behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.06] text-[#1D1D1F] transition-[opacity,background-color] hover:bg-black/10 disabled:pointer-events-none disabled:opacity-30 dark:bg-white/10 dark:text-[#F5F5F7] dark:hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl items-end justify-between gap-6 px-6 sm:px-8">
        {heading}
        <div className={`flex shrink-0 gap-2 ${canPrev || canNext ? "" : "hidden"}`}>
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous credential" className={btn}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next credential" className={btn}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Credentials"
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: EDGE, scrollPaddingInline: EDGE }}
      >
        {items.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </ul>
    </>
  );
}

function Card({ item }: { item: Credential }) {
  return (
    <li className="flex min-h-[22rem] w-[18.5rem] shrink-0 snap-start flex-col rounded-[28px] bg-[#F5F5F7] p-8 [corner-shape:squircle] sm:w-[22rem] dark:bg-[#1D1D1F]">
      <div className="flex items-start">
        {item.logoSrc ? (
          <span className="flex h-20 w-20 items-center justify-center rounded-[28%] bg-[#ffffff] p-3 ring-2 ring-white [corner-shape:squircle]">
            <Image src={item.logoSrc} alt={`${item.body} logo`} width={112} height={112} className="h-full w-full object-contain" />
          </span>
        ) : (
          <BadgeCheck className="h-10 w-10 text-[var(--pa)]" aria-hidden="true" />
        )}
      </div>

      <div className="mt-8">
        <p className="mb-2 text-sm font-medium text-[#68686D] dark:text-[#A1A1A6]">{item.status}</p>
        <h3 className="text-3xl font-semibold leading-[1.1] tracking-apple-hero text-[#1D1D1F] dark:text-[#F5F5F7]">{item.title}</h3>
        <p className="mt-3 text-base text-[#68686D] dark:text-[#A1A1A6]">
          {item.body}
          {item.subtitle && (
            <>
              <br />
              {item.subtitle}
            </>
          )}
        </p>
      </div>

      {item.verify && (
        <dl className="mt-auto">
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#68686D] dark:text-[#A1A1A6]">{item.verify.label}</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums text-[#1D1D1F] dark:text-[#F5F5F7]">{item.verify.value}</dd>
          {item.note && <dd className="mt-1 text-sm text-[#68686D] dark:text-[#A1A1A6]">{item.note}</dd>}
        </dl>
      )}
    </li>
  );
}
