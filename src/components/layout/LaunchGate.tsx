"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/layout/BrandMark";
import { PILL_QUIET } from "@/components/ui/Button";
import { CONTACT_DATA } from "@/data/content";
import { LAUNCH_AT } from "@/lib/launch";

const pad = (n: number) => String(n).padStart(2, "0");

/** Words that rise in one after another on first load, starting `start` seconds in. */
function Words({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className={`word-in inline-block ${className ?? ""}`} style={{ animationDelay: `${start + i * 0.09}s` }}>
            {w}
          </span>
        </span>
      ))}
    </>
  );
}

/** One digit that rolls from top to bottom when it changes: the new digit drops in as the old one drops out. */
function Digit({ value }: { value: string }) {
  const [state, setState] = useState<{ cur: string; prev: string | null }>({ cur: value, prev: null });

  // Adjusting state while rendering (not in an effect) keeps the old digit around for exactly one roll.
  if (state.cur !== value) setState({ cur: value, prev: state.cur });

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom leading-[1.15]">
      <span key={state.cur} className={state.prev !== null ? "roll-in inline-block" : "inline-block"}>
        {state.cur}
      </span>
      {state.prev !== null && (
        <span key={`out-${state.cur}`} aria-hidden="true" className="roll-out absolute inset-x-0 top-0 text-center">
          {state.prev}
        </span>
      )}
    </span>
  );
}

/**
 * The pre-launch countdown. It is always in the page, but hidden by CSS unless the inline script in
 * the layout marked <html> as launch-gated. When the countdown ends it reloads the page, so the real
 * site opens fresh without a redeploy or a manual refresh.
 */
export default function LaunchGate() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const at = new Date(LAUNCH_AT).getTime();
    const tick = () => {
      const t = Math.floor((at - Date.now()) / 1000);
      setLeft(t);
      // The real site was hydrated while hidden, so reload for a clean first load rather than just unhiding it.
      if (t <= 0 && document.documentElement.classList.contains("launch-gated")) window.location.reload();
    };
    tick();
    const id = setInterval(tick, 1000);
    // Timers are throttled in background tabs, so catch up as soon as the tab is visible again.
    const onVisible = () => !document.hidden && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const parts =
    left !== null && left > 0
      ? ([
          [Math.floor(left / 86400), "d"],
          [Math.floor((left % 86400) / 3600), "h"],
          [Math.floor((left % 3600) / 60), "m"],
          [left % 60, "s"],
        ] as const)
      : null;

  return (
    <div
      id="launch-gate"
      className="min-h-dvh flex-col bg-white text-[#1D1D1F] dark:bg-black dark:text-[#F5F5F7]"
    >
      <div role="banner" className="px-6 py-5">
        <BrandMark />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <p className="rounded-full bg-[#F5F5F7] px-4 py-1.5 text-sm font-medium text-[#68686D] dark:bg-[#1C1C1E] dark:text-[#A1A1A6]">
          <Words text="Coming soon" />
        </p>
        <h1 className="mt-8 text-balance text-[clamp(44px,9vw,96px)] font-semibold leading-[1.03] tracking-[-0.045em]">
          <Words text="See you" start={0.15} />{" "}
          <Words text="at 11.11." start={0.4} className="text-[#6E6E73] dark:text-[#8E8E93]" />
        </h1>
        <p className="mt-6 max-w-md text-balance text-lg leading-snug text-[#68686D] dark:text-[#A1A1A6] sm:text-xl">
          <Words text="Engineering precision. Design intuition." start={0.7} />
        </p>
        <p style={{ animationDelay: "1.9s" }} className="fade-late mt-10 text-[clamp(22px,3vw,30px)] font-medium tracking-tight text-[#6E6E73] tabular-nums dark:text-[#8E8E93]">
          <span className="sr-only">Launching on 11 November 2026, 12:00 am Malaysia time.</span>
          <span aria-hidden="true">
            {parts ? (
              parts.map(([n, u], i) => (
                <span key={u}>
                  {i > 0 && " "}
                  <b className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {pad(n)
                      .split("")
                      .map((c, d) => (
                        <Digit key={d} value={c} />
                      ))}
                  </b>
                  <span className="inline-block h-[1.15em] align-bottom leading-[1.15]">{u}</span>
                </span>
              ))
            ) : (
              <>
                <b className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">11</b> November{" "}
                <b className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">2026</b>
              </>
            )}
          </span>
        </p>
      </main>

      <footer style={{ animationDelay: "2.3s" }} className="fade-late px-6 pb-8 text-center">
        <ul className="flex flex-wrap justify-center gap-3">
          <li>
            <a href={`mailto:${CONTACT_DATA.email}`} className={`${PILL_QUIET} !border-transparent !bg-[#1D1D1F] !text-white hover:!bg-[#1D1D1F] hover:opacity-90 dark:!bg-[#F5F5F7] dark:!text-black dark:hover:!bg-[#F5F5F7]`}>
              Send an Email
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className={PILL_QUIET}
            >
              Connect on LinkedIn
            </a>
          </li>
        </ul>
        <p className="mt-6 text-xs text-[#68686D] dark:text-[#A1A1A6]">
          &copy; {new Date().getFullYear()} Sri Tulasi Ram. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
