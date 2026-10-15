"use client";

import { useState, useRef, useEffect, useMemo, useCallback, Fragment } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchModal from "@/components/SearchModal";
import { SEARCH_ITEMS, QUICK_LINKS, type SearchItem } from "@/data/searchData";

function HighlightText({ text, query }: { text: string; query: string }) {
  const clean = query.trim();
  if (!clean) return <span>{text}</span>;

  const escapedQuery = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);
  const lowerQuery = clean.toLowerCase();

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === lowerQuery ? (
          <mark
            key={index}
            className="bg-transparent text-[#0071E3] dark:text-[#2997FF] font-semibold"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </span>
  );
}

export default function Navigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"projects" | "designs" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setSearchQuery("");
      setSelectedIndex(0);
    }, 220);
  }, []);

  const openSearch = useCallback(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSelectedIndex(0);
    setSearchOpen(true);
  }, []);

  const navigateToItem = useCallback(
    (item: SearchItem) => {
      closeSearch();
      if (item.url.startsWith("/#")) {
        const hash = item.url.replace("/", "");
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(item.url);
        }
      } else {
        router.push(item.url);
      }
    },
    [router, closeSearch]
  );

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const clean = searchQuery.trim().toLowerCase();
    if (!clean) return [];

    return SEARCH_ITEMS.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(clean);
      const subtitleMatch = item.subtitle.toLowerCase().includes(clean);
      const descMatch = item.description.toLowerCase().includes(clean);
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(clean));
      const categoryMatch = item.category.toLowerCase().includes(clean);

      return titleMatch || subtitleMatch || descMatch || tagMatch || categoryMatch;
    });
  }, [searchQuery]);

  const activeDisplayItems = useMemo(() => {
    return searchQuery.trim() ? filteredItems : QUICK_LINKS;
  }, [searchQuery, filteredItems]);

  // Handle Search open/close lifecycle (focus input on desktop)
  useEffect(() => {
    if (searchOpen) {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const timer = setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [searchOpen]);

  // Keyboard navigation inside search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeDisplayItems.length === 0) return;
      setSelectedIndex((prev) => {
        const next = (prev + 1) % activeDisplayItems.length;
        const activeEl = searchListRef.current?.querySelector(`[data-index="${next}"]`);
        activeEl?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeDisplayItems.length === 0) return;
      setSelectedIndex((prev) => {
        const next = (prev - 1 + activeDisplayItems.length) % activeDisplayItems.length;
        const activeEl = searchListRef.current?.querySelector(`[data-index="${next}"]`);
        activeEl?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetItem = activeDisplayItems[selectedIndex];
      if (targetItem) {
        navigateToItem(targetItem);
      }
    }
  };

  // Global ⌘K / Ctrl+K and / keyboard shortcut for Spotlight Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => {
          if (!prev) {
            setActiveDropdown(null);
            setMobileMenuOpen(false);
            setSelectedIndex(0);
            return true;
          }
          return false;
        });
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  // Close dropdown and mobile menu & reset search on route change during render (per react.dev/learn/you-might-not-need-an-effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  }

  // Prevent background scrolling when mobile menu is open, with smooth exit delay
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        if (!searchOpen) {
          document.body.style.overflow = "";
        }
      }, 380);
      return () => clearTimeout(timer);
    }
    return () => {
      if (!searchOpen) {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen, searchOpen]);

  // Handle Escape key & screen resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeSearch]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Auto-reset accordions after mobile menu closing completes
  useEffect(() => {
    if (!mobileMenuOpen) {
      const timer = setTimeout(() => {
        setMobileExpanded({});
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menu: "projects" | "designs") => {
    if (searchOpen) return;
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  if (pathname === "/maintenance") {
    return null;
  }

  return (
    <>
      <header
        id="main-navigation"
        data-mobile-open={mobileMenuOpen ? "true" : "false"}
        data-dropdown-open={activeDropdown || searchOpen ? "true" : "false"}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "h-12 bg-transparent border-transparent shadow-none"
            : activeDropdown || searchOpen
            ? "bg-white/95 dark:bg-[#0a0a0c]/92 backdrop-blur-3xl backdrop-saturate-150 border-b border-[#E5E5EA]/70 dark:border-white/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
            : "bg-white/80 dark:bg-black/80 backdrop-blur-3xl backdrop-saturate-150 border-b border-[#E5E5EA]/60 dark:border-white/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Navigation Row - Apple 48px Height with seamless morphing to search bar */}
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 h-12 w-full flex items-center overflow-hidden">
          {/* Layer A: Standard Navigation Bar (slides left & dissolves on desktop when search is active) */}
          <div
            className={`w-full flex items-center justify-between shrink-0 transition-all motion-reduce:transition-none ${
              searchOpen
                ? "md:opacity-0 md:-translate-x-2 md:scale-[0.99] md:pointer-events-none duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
                : "opacity-100 translate-x-0 scale-100 pointer-events-auto duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            }`}
          >
            {/* Brand / Logo (functions as Home link) */}
            <Link prefetch={false}
              href="/"
              className="group h-8 flex items-center gap-2 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] focus-visible:ring-offset-2 z-20"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMobileMenuOpen(false);
              }}
            >
              <span className="font-semibold text-[15px] sm:text-base tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-none">
                Sri Tulasi Ram
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 z-20" aria-label="Main Navigation">
              {/* 1. Projects Trigger */}
              <Link prefetch={false}
                href="/projects"
                onMouseEnter={() => handleMouseEnter("projects")}
                onFocus={() => handleMouseEnter("projects")}
                aria-expanded={activeDropdown === "projects"}
                aria-haspopup="true"
                className={`h-7.5 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium leading-none transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] ${
                  pathname.startsWith("/projects")
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold bg-[#1D1D1F]/5 dark:bg-white/10"
                    : activeDropdown === "projects"
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#1D1D1F]/5 dark:bg-white/10"
                    : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#1D1D1F]/5 dark:hover:bg-white/10"
                }`}
              >
                Projects
              </Link>

              {/* 2. Designs Trigger */}
              <Link prefetch={false}
                href="/designs"
                onMouseEnter={() => handleMouseEnter("designs")}
                onFocus={() => handleMouseEnter("designs")}
                aria-expanded={activeDropdown === "designs"}
                aria-haspopup="true"
                className={`h-7.5 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium leading-none transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] ${
                  pathname.startsWith("/designs")
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold bg-[#1D1D1F]/5 dark:bg-white/10"
                    : activeDropdown === "designs"
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#1D1D1F]/5 dark:bg-white/10"
                    : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#1D1D1F]/5 dark:hover:bg-white/10"
                }`}
              >
                Designs
              </Link>

              {/* 3. Photography Trigger (Direct Link, No Dropdown) */}
              <Link prefetch={false}
                href="/photography"
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  setActiveDropdown(null);
                }}
                onFocus={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  setActiveDropdown(null);
                }}
                className={`h-7.5 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium leading-none transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] ${
                  pathname.startsWith("/photography")
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold bg-[#1D1D1F]/5 dark:bg-white/10"
                    : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#1D1D1F]/5 dark:hover:bg-white/10"
                }`}
              >
                Photography
              </Link>

              {/* 4. About Trigger (Direct Link) */}
              <Link prefetch={false}
                href="/about"
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  setActiveDropdown(null);
                }}
                onFocus={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  setActiveDropdown(null);
                }}
                className={`h-7.5 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium leading-none transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] ${
                  pathname.startsWith("/about")
                    ? "text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold bg-[#1D1D1F]/5 dark:bg-white/10"
                    : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#1D1D1F]/5 dark:hover:bg-white/10"
                }`}
              >
                About
              </Link>
            </nav>

            {/* Action CTA: Search, Theme Toggle & Let's Talk (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 z-20">
              {/* Apple Spotlight Search Trigger (Icon-only matching ThemeToggle) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search portfolio (⌘K)"
                title="Search (⌘K)"
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] focus-visible:ring-offset-2 cursor-pointer"
              >
                <Search className="w-[17px] h-[17px] stroke-[1.65]" />
              </button>

              <ThemeToggle />
              <Link prefetch={false}
                href="/#contact"
                className="h-7.5 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-[#F5F5F7] shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] focus-visible:ring-offset-2 leading-none"
              >
                <span>Let&apos;s Talk</span>
              </Link>
            </div>

            {/* Mobile Search, Theme Toggle & Apple Animated 2-Line Menu Button */}
            <div className="flex md:hidden items-center gap-1 z-20">
              {/* Mobile Search Trigger Button (meets 44x44pt touch target per Apple HIG accessibility.md) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search portfolio"
                title="Search"
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] cursor-pointer after:absolute after:-inset-1.5 after:content-['']"
              >
                <Search className="w-[17px] h-[17px] stroke-[1.65]" />
              </button>

              <ThemeToggle />
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] after:absolute after:-inset-1.5 after:content-['']"
              >
                <span
                  className={`w-[17px] h-[1.5px] bg-current rounded-full transition-transform duration-380 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    mobileMenuOpen ? "translate-y-[3.25px] rotate-45" : "translate-y-0 rotate-0"
                  }`}
                />
                <span
                  className={`w-[17px] h-[1.5px] bg-current rounded-full transition-transform duration-380 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    mobileMenuOpen ? "-translate-y-[3.25px] -rotate-45" : "translate-y-0 rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Layer B: Morphed Search Bar (Desktop only) */}
          <div
            className={`hidden md:flex absolute inset-0 px-6 sm:px-8 items-center gap-3 w-full h-12 transition-all motion-reduce:transition-none ${
              searchOpen
                ? "opacity-100 translate-x-0 pointer-events-auto duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : "opacity-0 translate-x-2 pointer-events-none duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
            }`}
          >
            {/* Search Icon */}
            <Search className="w-[18px] h-[18px] text-[#86868B] dark:text-[#8E8E93] shrink-0 stroke-[2]" />

            {/* In-Navbar Search Input */}
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={searchOpen}
              aria-controls="desktop-search-results"
              aria-activedescendant={
                searchOpen && activeDisplayItems[selectedIndex]
                  ? `desktop-search-item-${selectedIndex}`
                  : undefined
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search sritulasiram.my"
              aria-label="Search"
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-transparent font-sans antialiased text-[16px] sm:text-[17px] font-semibold placeholder:font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#8E8E93] focus:outline-hidden tracking-[-0.015em] py-2 leading-none caret-[#0071E3] dark:caret-[#2997FF]"
            />

            {/* Close / Cancel Button */}
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              title="Close search (Esc)"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ATTACHED SPOTLIGHT SEARCH DROPDOWN (Desktop only - CSS Grid Zero-Lag Height) */}
        {/* ========================================================= */}
        <div
          ref={searchListRef}
          className={`hidden md:grid transition-[grid-template-rows,opacity] motion-reduce:transition-none ${
            searchOpen
              ? "grid-rows-[1fr] opacity-100 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto"
              : "grid-rows-[0fr] opacity-0 duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex flex-col max-h-[calc(72vh-20px)]">
              {/* Header label */}
              <p
                className={`text-[11px] sm:text-[12px] font-normal text-[#86868B] dark:text-[#8E8E93] mb-2 sm:mb-2.5 tracking-normal select-none px-3 transition-opacity duration-200 ${
                  searchOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {searchQuery.trim() ? "Suggestions" : "Quick Links"}
              </p>

              {/* Results / Quick Links List (Apple-standard left arrow, SF Pro typography) */}
              {activeDisplayItems.length > 0 ? (
                <div
                  id="desktop-search-results"
                  role="listbox"
                  aria-label="Search suggestions"
                  className="overflow-y-auto no-scrollbar space-y-1 overscroll-contain flex-1"
                >
                  {activeDisplayItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        id={`desktop-search-item-${idx}`}
                        role="option"
                        aria-selected={isSelected}
                        data-index={idx}
                        onClick={() => navigateToItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          borderRadius: "12px",
                          transitionDelay: searchOpen ? `${Math.min(idx * 25, 150)}ms` : "0ms",
                        }}
                        className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isSelected
                            ? "bg-black/[0.05] dark:bg-white/[0.08]"
                            : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                        } ${
                          searchOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <ArrowRight
                            className={`w-3.5 h-3.5 shrink-0 stroke-[2] transition-transform duration-150 ${
                              isSelected
                                ? "text-[#0071E3] dark:text-[#2997FF] translate-x-1"
                                : "text-[#86868B] dark:text-[#8E8E93] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] group-hover:translate-x-1"
                            }`}
                          />
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`text-[13.5px] sm:text-[14px] font-medium tracking-tight truncate transition-colors duration-150 ${
                                isSelected
                                  ? "text-[#0071E3] dark:text-[#2997FF]"
                                  : "text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]"
                              }`}
                            >
                              <HighlightText text={item.title} query={searchQuery} />
                            </span>
                            {(item.subtitle || item.description) && searchQuery.trim() && (
                              <span className="text-[12px] text-[#86868B] dark:text-[#8E8E93] truncate hidden sm:inline">
                                — {item.subtitle || item.description}
                              </span>
                            )}
                          </div>
                        </div>

                        {searchQuery.trim() && item.category && (
                          <span className="text-[11px] font-normal text-[#86868B] dark:text-[#8E8E93] shrink-0 pl-3">
                            {item.category}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Zero Results State */
                <div className="py-6 px-3 text-left">
                  <p className="text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                    No results for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
                  </p>
                  <p className="text-[12px] text-[#86868B] dark:text-[#8E8E93]">
                    Try searching for warranty, diagnostics, sage, or iot.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* UNIFIED SEAMLESS MEGA-DROPDOWN CONTENT (Inside Single Blur) */}
        {/* ========================================================= */}
        <div
          className={`hidden md:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeDropdown
              ? "max-h-[500px] opacity-100 pointer-events-auto visible pt-2.5 pb-8"
              : "max-h-0 opacity-0 pointer-events-none invisible pt-0 pb-0"
          }`}
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            {/* 1. Projects Mega Dropdown Content */}
            {activeDropdown === "projects" && (
              <div key="projects-menu" className="grid grid-cols-12 gap-8">
                {/* Column 1: Engineering Systems */}
                <div className="col-span-5 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1">
                    Projects
                  </p>
                  <div className="space-y-1">
                    <Link prefetch={false}
                      href="/projects"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-2 hover:translate-x-0.5"
                    >
                      Explore All Projects
                    </Link>
                    <Link prefetch={false}
                      href="/projects/warranty-rma"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-3 hover:translate-x-0.5"
                    >
                      Warranty &amp; RMA Management System
                    </Link>
                    <Link prefetch={false}
                      href="/projects/raspberry-pi-diagnostics"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-4 hover:translate-x-0.5"
                    >
                      Raspberry Pi Diagnostic Suite
                    </Link>
                    <Link prefetch={false}
                      href="/projects/iot-fertiliser-mixing"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-5 hover:translate-x-0.5"
                    >
                      IoT Fertiliser Mixing System
                    </Link>
                  </div>
                </div>

                {/* Column 2: Case Study */}
                <div className="col-span-4 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1">
                    Case Study
                  </p>
                  <div className="space-y-1">
                    <Link prefetch={false}
                      href="/projects/opencore-efi-hackintosh"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-2 hover:translate-x-0.5"
                    >
                      OpenCore EFI Hackintosh Build
                    </Link>
                    <Link prefetch={false}
                      href="/projects/rog-gaming-center"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-3 hover:translate-x-0.5"
                    >
                      ROG Gaming Center macOS App
                    </Link>
                    <Link prefetch={false}
                      href="/projects/esp32-heart-saver"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-4 hover:translate-x-0.5"
                    >
                      ESP32 Heart Saver
                    </Link>
                  </div>
                </div>

                {/* Column 3: Research & Publications */}
                <div className="col-span-3 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1">
                    Research &amp; Publications
                  </p>
                  <ul className="space-y-0.5">
                    <li className="apple-stagger-2">
                      <a
                        href="https://journal.uthm.edu.my/index.php/ijie/article/view/24386"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Published Research Paper (IJIE · UTHM)
                      </a>
                    </li>
                    <li className="apple-stagger-3">
                      <a
                        href="https://github.com/sritulasiram/iot-fertiliser-mixing-esp32"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        IoT Fertiliser Firmware (GitHub)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. Designs Mega Dropdown Content */}
            {activeDropdown === "designs" && (
              <div key="designs-menu" className="grid grid-cols-12 gap-8">
                {/* Column 1: Main Category Links */}
                <div className="col-span-7 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1">
                    UI/UX &amp; Design
                  </p>
                  <div className="space-y-1">
                    <Link prefetch={false}
                      href="/designs"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-2 hover:translate-x-0.5"
                    >
                      Explore All Designs
                    </Link>
                    <Link prefetch={false}
                      href="/designs/sage"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-3 hover:translate-x-0.5"
                    >
                      Sage
                    </Link>
                    <Link prefetch={false}
                      href="/designs/recycle-ai"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-4 hover:translate-x-0.5"
                    >
                      Recycle AI
                    </Link>
                    <Link prefetch={false}
                      href="/designs/kopiesatu"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-5 hover:translate-x-0.5"
                    >
                      KopieSatu
                    </Link>
                    <Link prefetch={false}
                      href="/designs/pmc-clinic"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-6 hover:translate-x-0.5"
                    >
                      Perak Medical Centre
                    </Link>
                    <Link prefetch={false}
                      href="/designs/void"
                      onClick={() => setActiveDropdown(null)}
                      className="block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight apple-stagger-6 hover:translate-x-0.5"
                    >
                      Void
                    </Link>
                  </div>
                </div>

                {/* Column 2 Design Systems */}
                <div className="col-span-5 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1">
                    Design Systems
                  </p>
                  <ul className="space-y-0.5">
                    <li className="apple-stagger-2">
                      <Link prefetch={false}
                        href="/designs#design"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Apple Liquid Glass
                      </Link>
                    </li>
                    <li className="apple-stagger-3">
                      <Link prefetch={false}
                        href="/designs#design"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Google Material 3
                      </Link>
                    </li>
                    <li className="apple-stagger-4">
                      <Link prefetch={false}
                        href="/designs#icons"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Icon Systems (FA &amp; Symbols)
                      </Link>
                    </li>
                    <li className="apple-stagger-5">
                      <Link prefetch={false}
                        href="/designs#typography"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Typography Systems
                      </Link>
                    </li>
                    <li className="apple-stagger-6">
                      <Link prefetch={false}
                        href="/designs#workflow"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 block"
                      >
                        Design Workflow
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

      </header>

      {/* ========================================================= */}
      {/* SEAMLESS APPLE-GRADE MOBILE MENU (Single Unified Glass Sheet) */}
      {/* ========================================================= */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`md:hidden fixed inset-0 z-40 bg-white/85 dark:bg-[#0a0a0c]/85 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto mobile-nav-panel px-6 sm:px-8 pt-16 pb-12 w-full max-w-6xl mx-auto flex flex-col justify-between">
          <nav className="flex flex-col space-y-1">
            {/* 1. Projects Accordion */}
            <div className={mobileMenuOpen ? "mobile-item-1" : ""}>
              <button
                type="button"
                aria-expanded={Boolean(mobileExpanded.projects)}
                aria-controls="mobile-projects-submenu"
                onClick={() => toggleMobileSubmenu("projects")}
                className="w-full flex items-center justify-between py-2 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] rounded-lg"
              >
                <span
                  className={`text-[26px] sm:text-[28px] font-semibold tracking-apple-tight transition-colors ${
                    pathname.startsWith("/projects")
                      ? "text-[#0071E3] dark:text-[#2997FF]"
                      : "text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-black dark:group-hover:text-white"
                  }`}
                >
                  Projects
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors">
                  <ChevronDown
                    className={`w-5 h-5 text-[#86868B] dark:text-[#8E8E93] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      mobileExpanded.projects ? "rotate-180 text-[#1D1D1F] dark:text-[#F5F5F7]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Smooth Animated Accordion Grid */}
              <div
                id="mobile-projects-submenu"
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileExpanded.projects
                    ? "grid-rows-[1fr] opacity-100 pt-1 pb-3"
                    : "grid-rows-[0fr] opacity-0 pt-0 pb-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden pl-1">
                  <Link prefetch={false}
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0071E3] dark:text-[#2997FF] py-1.5 hover:underline"
                  >
                    <span>Explore All Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Category 1: Engineering Systems */}
                  <div className="pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
                      Projects
                    </p>
                    <div className="space-y-0.5 pt-1.5">
                      <Link prefetch={false}
                        href="/projects/warranty-rma"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Warranty &amp; RMA Management System
                      </Link>
                      <Link prefetch={false}
                        href="/projects/raspberry-pi-diagnostics"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Raspberry Pi Diagnostic Suite
                      </Link>
                      <Link prefetch={false}
                        href="/projects/iot-fertiliser-mixing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        IoT Fertiliser Mixing System
                      </Link>
                    </div>
                  </div>

                  {/* Category 2: Case Study */}
                  <div className="pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
                      Case Study
                    </p>
                    <div className="space-y-0.5 pt-1.5">
                      <Link prefetch={false}
                        href="/projects/opencore-efi-hackintosh"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        OpenCore EFI Hackintosh Build
                      </Link>
                      <Link prefetch={false}
                        href="/projects/rog-gaming-center"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        ROG Gaming Center macOS App
                      </Link>
                    </div>
                  </div>

                  {/* Category 3: Research & Publications */}
                  <div className="pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
                      Research &amp; Publications
                    </p>
                    <div className="space-y-0.5 pt-1.5">
                      <a
                        href="https://journal.uthm.edu.my/index.php/ijie/article/view/24386"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        <span>Published Research Paper (IJIE · UTHM)</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B]" />
                      </a>
                      <a
                        href="https://github.com/sritulasiram/iot-fertiliser-mixing-esp32"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        <span>IoT Fertiliser Firmware (GitHub)</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Designs Accordion */}
            <div className={mobileMenuOpen ? "mobile-item-2" : ""}>
              <button
                type="button"
                aria-expanded={Boolean(mobileExpanded.designs)}
                aria-controls="mobile-designs-submenu"
                onClick={() => toggleMobileSubmenu("designs")}
                className="w-full flex items-center justify-between py-2 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0071E3] dark:focus-visible:ring-[#2997FF] rounded-lg"
              >
                <span
                  className={`text-[26px] sm:text-[28px] font-semibold tracking-apple-tight transition-colors ${
                    pathname === "/designs" || pathname.startsWith("/designs/")
                      ? "text-[#0071E3] dark:text-[#2997FF]"
                      : "text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-black dark:group-hover:text-white"
                  }`}
                >
                  Designs
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors">
                  <ChevronDown
                    className={`w-5 h-5 text-[#86868B] dark:text-[#8E8E93] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      mobileExpanded.designs ? "rotate-180 text-[#1D1D1F] dark:text-[#F5F5F7]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Smooth Animated Accordion Grid */}
              <div
                id="mobile-designs-submenu"
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileExpanded.designs
                    ? "grid-rows-[1fr] opacity-100 pt-1 pb-3"
                    : "grid-rows-[0fr] opacity-0 pt-0 pb-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden pl-1">
                  <Link prefetch={false}
                    href="/designs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0071E3] dark:text-[#2997FF] py-1.5 hover:underline"
                  >
                    <span>Explore All Designs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Category 1: UI/UX & Design */}
                  <div className="pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
                      UI/UX &amp; Design
                    </p>
                    <div className="space-y-0.5 pt-1.5">
                      <Link prefetch={false}
                        href="/designs/sage"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Sage
                      </Link>
                      <Link prefetch={false}
                        href="/designs/recycle-ai"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Recycle AI
                      </Link>
                      <Link prefetch={false}
                        href="/designs/kopiesatu"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        KopieSatu
                      </Link>
                      <Link prefetch={false}
                        href="/designs/pmc-clinic"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Perak Medical Centre
                      </Link>
                      <Link prefetch={false}
                        href="/designs/void"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Void
                      </Link>
                    </div>
                  </div>

                  {/* Category 2: Design Foundations */}
                  <div className="pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
                      Design Systems
                    </p>
                    <div className="space-y-0.5 pt-1.5">
                      <Link prefetch={false}
                        href="/designs#design"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Apple Liquid Glass
                      </Link>
                      <Link prefetch={false}
                        href="/designs#design"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Google Material 3
                      </Link>
                      <Link prefetch={false}
                        href="/designs#icons"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Icon Systems
                      </Link>
                      <Link prefetch={false}
                        href="/designs#typography"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Typography Systems
                      </Link>
                      <Link prefetch={false}
                        href="/designs#workflow"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
                      >
                        Design Workflow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Photography */}
            <div className={mobileMenuOpen ? "mobile-item-3" : ""}>
              <Link prefetch={false}
                href="/photography"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-[26px] sm:text-[28px] font-semibold tracking-apple-tight transition-colors ${
                  pathname === "/photography"
                    ? "text-[#0071E3] dark:text-[#2997FF]"
                    : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white"
                }`}
              >
                Photography
              </Link>
            </div>

            {/* 4. About */}
            <div className={mobileMenuOpen ? "mobile-item-4" : ""}>
              <Link prefetch={false}
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-[26px] sm:text-[28px] font-semibold tracking-apple-tight transition-colors ${
                  pathname === "/about"
                    ? "text-[#0071E3] dark:text-[#2997FF]"
                    : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white"
                }`}
              >
                About
              </Link>
            </div>
          </nav>

          {/* Bottom Actions & Metadata Quick Links */}
          <div className={`pt-4 mt-6 space-y-5 ${mobileMenuOpen ? "mobile-item-5" : ""}`}>
            <Link prefetch={false}
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-11 px-6 rounded-full text-[14px] font-medium text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-[#F5F5F7] shadow-xs hover:shadow-sm flex items-center justify-center transition-all duration-200 active:scale-[0.98]"
            >
              Let&apos;s Talk
            </Link>

            {/* Secondary links */}
            <div className="flex items-center justify-center gap-5 text-[13px] font-medium text-[#86868B] dark:text-[#8E8E93]">
              <a
                href="https://www.linkedin.com/in/sritulasiram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
              >
                LinkedIn
              </a>
              <span className="w-1 h-1 rounded-full bg-[#86868B]/40 dark:bg-[#8E8E93]/40" />
              <a
                href="https://github.com/sritulasiram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
              >
                GitHub
              </a>
              <span className="w-1 h-1 rounded-full bg-[#86868B]/40 dark:bg-[#8E8E93]/40" />
              <a
                href="mailto:sritulasiram@yahoo.com"
                className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Blur Overlay when desktop dropdown or search is active (Desktop) */}
      <div
        onClick={() => {
          setActiveDropdown(null);
          closeSearch();
        }}
        className={`hidden md:block fixed inset-0 top-0 bg-black/25 dark:bg-black/50 backdrop-blur-xs z-40 transition-opacity ${
          activeDropdown || searchOpen
            ? "opacity-100 pointer-events-auto duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "opacity-0 pointer-events-none duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
        }`}
      />

      {/* Apple Mobile Search Overlay (only active on mobile screens < 768px) */}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}
