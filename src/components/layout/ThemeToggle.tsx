"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";

const syncStatusBar = (isDark: boolean) => {
  if (typeof document === "undefined") return;
  const color = isDark ? "#000000" : "#ffffff";
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  if (metas.length > 0) {
    metas.forEach((m) => m.setAttribute("content", color));
  } else {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", color);
    document.head.appendChild(meta);
  }
  const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (appleMeta) {
    appleMeta.setAttribute("content", isDark ? "black" : "default");
  }
};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const maskId = useId();

  // Keep state in sync with actual DOM class on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only check; the server render must start from the initial state
    setTheme(isDark ? "dark" : "light");
    syncStatusBar(isDark);
  }, []);

  const lastToggleRef = useRef(0);

  const toggleTheme = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // The new theme grows out of the button, so the change reads as coming from the toggle.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // Throttle rapid spam-clicks (200ms) for smooth interaction
    const now = Date.now();
    if (now - lastToggleRef.current < 200) return;
    lastToggleRef.current = now;

    const isDark =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false;
    const nextTheme = isDark ? "light" : "dark";
    const nextIsDark = nextTheme === "dark";

    setTheme(nextTheme);

    if (typeof document !== "undefined") {
      const applyChange = () => {
        if (nextIsDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        syncStatusBar(nextIsDark);
      };

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if ("startViewTransition" in document && !prefersReduced) {
        const root = document.documentElement;
        root.classList.add("theme-switching");
        const vt = (
          document as Document & {
            startViewTransition: (cb: () => void) => { finished: Promise<void> };
          }
        ).startViewTransition(applyChange);
        vt.ready
          .then(() => {
            root.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
              { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
            );
          })
          .catch(() => {});
        vt.finished.finally(() => root.classList.remove("theme-switching"));
      } else {
        applyChange();
      }
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      className={`press nav-focus relative w-9 h-9 pointer-coarse:min-w-11 pointer-coarse:min-h-11 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] cursor-pointer after:absolute after:-inset-1.5 after:content-[''] ${className}`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {/* A sun that turns into a moon. Everything is driven by the page's dark class through CSS, so the icon
          follows the theme however it was changed. The sun's disc grows while a second circle slides in to bite
          out the crescent, and the rays fold away. */}
      <svg
        data-theme-icon=""
        viewBox="0 0 24 24"
        className="size-[19px] rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] dark:-rotate-[15deg] motion-reduce:transition-none"
        fill="none"
        aria-hidden="true"
      >
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <circle
            cx="12"
            cy="12"
            r="7"
            fill="black"
            className="translate-x-[14px] -translate-y-[14px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] dark:translate-x-[3.5px] dark:-translate-y-[3.5px] motion-reduce:transition-none"
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="currentColor"
          mask={`url(#${maskId})`}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          className="scale-[0.56] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] dark:scale-100 motion-reduce:transition-none"
        />
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}
          className="scale-100 opacity-100 transition-[transform,opacity] duration-500 ease-out dark:rotate-90 dark:scale-50 dark:opacity-0 motion-reduce:transition-none"
        >
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </g>
      </svg>
    </button>
  );
}
