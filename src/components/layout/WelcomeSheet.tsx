"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Source = "linkedin" | "instagram";

const COPY: Record<Source, { label: string; lead: string; rest: string; cta: string; href: string }> = {
  linkedin: {
    label: "Welcome",
    lead: "Great to meet you.",
    rest: "I'm Sri, a Support Engineer at Cytron. Here's the work I'm proud of.",
    cta: "See my projects",
    href: "/projects",
  },
  instagram: {
    label: "Welcome",
    lead: "You have the heart of an explorer.",
    rest: "I'm Sri. Come, wander through nature with me.",
    cta: "See my photography",
    href: "/photography",
  },
};

const STORAGE_KEY = "welcome-dismissed";

/** In-app browsers rarely pass a referrer, so a `?ref=` param is checked first and the user agent second. */
function detectSource(): Source | null {
  const ref = new URLSearchParams(window.location.search).get("ref")?.toLowerCase();
  if (ref === "linkedin" || ref === "instagram") return ref;
  const ua = navigator.userAgent;
  if (/LinkedInApp/i.test(ua)) return "linkedin";
  if (/Instagram/i.test(ua)) return "instagram";
  return null;
}

export default function WelcomeSheet() {
  const [source, setSource] = useState<Source | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    try {
      if (window.location.pathname !== "/") return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      const found = detectSource();
      if (!found) return;
      timer = window.setTimeout(() => {
        setSource(found);
        setOpen(true);
      }, 900);
    } catch {}
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  if (!open || !source) return null;
  const c = COPY[source];

  return (
    <div
      role="dialog"
      aria-label={c.label}
      className="welcome-sheet fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-[420px] rounded-[28px] border border-black/[0.06] bg-white/80 p-6 pb-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-[#1c1c1e]/80 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close welcome"
        className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.06] text-[#6e6e73] transition-colors hover:bg-black/10 dark:bg-white/10 dark:text-[#a1a1a6] dark:hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <p className="text-[12px] font-semibold tracking-wide text-[#6e6e73] uppercase dark:text-[#a1a1a6]">
        {c.label}
      </p>
      <h2 className="mt-2 pr-8 text-[26px] leading-[1.12] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {c.lead} <span className="text-[#6e6e73] dark:text-[#a1a1a6]">{c.rest}</span>
      </h2>

      <div className="mt-5 flex items-center gap-5">
        <Link
          href={c.href}
          onClick={dismiss}
          className="inline-flex h-11 items-center rounded-full bg-[#1d1d1f] px-5 text-[15px] font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-[#1d1d1f] dark:hover:bg-[#f5f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {c.cta}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="text-[15px] font-medium text-[#1d1d1f] hover:underline dark:text-[#f5f5f7] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Explore on my own
        </button>
      </div>
    </div>
  );
}
