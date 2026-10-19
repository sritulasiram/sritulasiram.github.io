"use client";

import { useState, useEffect, useRef, useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { QUICK_LINKS, type SearchItem } from "@/data/searchData";
import { HighlightText, openSearchItem, searchSite } from "./nav/siteSearch";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const hoveredIndexRef = useRef<number | null>(null);

  // Synchronize opening/closing animation lifecycle (mobile sheet only)
  useEffect(() => {
    let unmountTimer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      // SearchModal is strictly mobile (< 768px); desktop uses the morphed navbar search
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (!isMobile) {
        setShouldRender(false);
        return;
      }

      setShouldRender(true);
      setQuery("");
      setSelectedIndex(0);
      setIsKeyboardNav(false);
      hoveredIndexRef.current = null;

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 70);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(focusTimer);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      setIsVisible(false);
      unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 220);

      return () => clearTimeout(unmountTimer);
    }
  }, [isOpen]);

  // Global Escape key shortcut
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = useMemo(() => searchSite(query), [query]);

  const activeDisplayItems = query.trim() ? filteredItems : QUICK_LINKS;

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
    setIsKeyboardNav(false);
    hoveredIndexRef.current = null;
  }, [activeDisplayItems]);

  const navigateToItem = (item: SearchItem) => {
    onClose();
    openSearchItem(item, (url) => router.push(url));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeDisplayItems.length === 0) return;
      setIsKeyboardNav(true);
      const startIdx =
        !isKeyboardNav && hoveredIndexRef.current !== null
          ? hoveredIndexRef.current
          : selectedIndex;
      const nextIndex = (startIdx + 1) % activeDisplayItems.length;
      setSelectedIndex(nextIndex);
      hoveredIndexRef.current = nextIndex;
      const activeEl = listRef.current?.querySelector(`[data-index="${nextIndex}"]`);
      activeEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeDisplayItems.length === 0) return;
      setIsKeyboardNav(true);
      const startIdx =
        !isKeyboardNav && hoveredIndexRef.current !== null
          ? hoveredIndexRef.current
          : selectedIndex;
      const prevIndex = (startIdx - 1 + activeDisplayItems.length) % activeDisplayItems.length;
      setSelectedIndex(prevIndex);
      hoveredIndexRef.current = prevIndex;
      const activeEl = listRef.current?.querySelector(`[data-index="${prevIndex}"]`);
      activeEl?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetIdx = isKeyboardNav
        ? selectedIndex
        : (hoveredIndexRef.current ?? selectedIndex);
      const activeItem = activeDisplayItems[targetIdx];
      if (activeItem) {
        navigateToItem(activeItem);
      }
    }
  };

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className={`fixed inset-0 z-[60] overflow-hidden md:hidden ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Full Backdrop Overlay (Apple dimming layer) */}
      <div
        className={`fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-xs transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Apple.com Dropdown Search Canvas with Navbar Frosted Glass (Liquid Glass) */}
      <div
        className={`relative w-full bg-white/80 dark:bg-black/80 backdrop-blur-3xl backdrop-saturate-150 border-b border-[#E5E5EA]/70 dark:border-white/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.6)] z-10 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-7 sm:pb-9">
          {/* Top Row: Clean Close Button (Top-Right) */}
          <div className="flex items-center justify-end -mr-2 -mt-1 mb-1">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] after:absolute after:-inset-1.5 after:content-['']"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Apple Signature Search Input Row (Magnifying Glass + Balanced 20px-23px Typography) */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-[#86868B] dark:text-[#8E8E93] shrink-0 stroke-[1.75]" />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search sritulasiram.my"
              aria-label="Search"
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-transparent text-[20px] sm:text-[23px] font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#6E6E73] focus:outline-hidden leading-tight"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear input"
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Links / Suggestions Section (Clean Minimalist Apple.com Hierarchy) */}
          <div
            ref={listRef}
            onPointerMove={() => {
              if (isKeyboardNav) setIsKeyboardNav(false);
            }}
            className="mt-5 sm:mt-6 max-h-[50vh] overflow-y-auto no-scrollbar"
          >
            {/* Small Subtle Label aligned with items */}
            <p className="text-[11px] sm:text-[12px] font-normal text-[#86868B] dark:text-[#8E8E93] mb-2 sm:mb-2.5 tracking-normal select-none px-3">
              {query.trim() ? "Suggestions" : "Quick Links"}
            </p>

            {/* List of Links (Arrow + Compact 13.5px-14px Title with Rounded-xl Frosted Highlight) */}
            {activeDisplayItems.length > 0 ? (
              <div className="flex flex-col space-y-1">
                {activeDisplayItems.map((item, idx) => {
                  const isKeyboardActive = isKeyboardNav && idx === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      data-index={idx}
                      type="button"
                      onClick={() => navigateToItem(item)}
                      onMouseEnter={() => {
                        hoveredIndexRef.current = idx;
                      }}
                      onMouseLeave={() => {
                        if (hoveredIndexRef.current === idx) {
                          hoveredIndexRef.current = null;
                        }
                      }}
                      style={{ borderRadius: "12px" }}
                      className={`group w-full flex items-center justify-between text-left py-2 px-3 rounded-xl transition-[background-color,box-shadow,color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                        isKeyboardActive
                          ? "bg-black/[0.05] dark:bg-white/[0.08] ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
                          : "hover:bg-black/[0.04] dark:hover:bg-white/[0.08] hover:ring-1 hover:ring-black/[0.03] dark:hover:ring-white/[0.06]"
                      }`}
                    >
                      <div className="inline-flex items-center gap-2.5 min-w-0">
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] stroke-[2] ${
                            isKeyboardActive
                              ? "text-[#0071E3] dark:text-[#2997FF] translate-x-1"
                              : "text-[#86868B] dark:text-[#8E8E93] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] group-hover:translate-x-1"
                          }`}
                        />
                        <span
                          className={`text-[13.5px] sm:text-[14px] font-medium tracking-tight transition-colors duration-150 truncate ${
                            isKeyboardActive
                              ? "text-[#0071E3] dark:text-[#2997FF]"
                              : "text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]"
                          }`}
                        >
                          {query.trim() ? (
                            <HighlightText text={item.title} query={query} />
                          ) : (
                            item.title
                          )}
                        </span>
                      </div>

                      {/* Right-side Category (when searching) and subtle Return Indicator */}
                      <div className="flex items-center gap-2 shrink-0 pl-3">
                        {query.trim() ? (
                          <span className="text-[11px] font-normal text-[#86868B] dark:text-[#8E8E93]">
                            {item.category}
                          </span>
                        ) : null}
                        <span
                          aria-hidden="true"
                          className={`text-[11px] font-medium transition-opacity duration-150 ${
                            isKeyboardActive
                              ? "opacity-60 text-[#0071E3] dark:text-[#2997FF]"
                              : "opacity-0 group-hover:opacity-60 text-[#86868B] dark:text-[#8E8E93]"
                          }`}
                        >
                          ↵
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* No Results State */
              <div className="py-6 px-3 text-left">
                <p className="text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-[12px] text-[#86868B] dark:text-[#8E8E93]">
                  Try searching for RMA, diagnostics, Sage, fertiliser mixing, or photography.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
