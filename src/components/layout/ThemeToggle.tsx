"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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

  // Keep state in sync with actual DOM class on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    syncStatusBar(isDark);
  }, []);

  const lastToggleRef = useRef(0);

  const toggleTheme = useCallback(() => {
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
        (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(applyChange);
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
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] cursor-pointer after:absolute after:-inset-1.5 after:content-[''] ${className}`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-[17px] h-[17px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-0 dark:rotate-180"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
      </svg>
    </button>
  );
}
