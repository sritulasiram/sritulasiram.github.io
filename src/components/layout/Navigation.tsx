"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";
import { QUICK_LINKS, type SearchItem } from "@/data/searchData";
import MegaMenu from "./nav/MegaMenu";
import MobileMenu from "./nav/MobileMenu";
import { NAV_DIRECT_LINKS, NAV_MENUS, isActivePath, type NavMenu } from "./nav/navData";
import { HighlightText, openSearchItem, searchSite } from "./nav/siteSearch";
import { useMediaQuery } from "./nav/useMediaQuery";

const TRIGGER_BASE =
  "press nav-focus h-7.5 pointer-coarse:min-h-11 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium leading-none transition-all duration-200 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
const TRIGGER_ON = "text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#1D1D1F]/5 dark:bg-white/10";
const TRIGGER_OFF =
  "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#1D1D1F]/5 dark:hover:bg-white/10";

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
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeDropdownRef = useRef(activeDropdown);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    activeDropdownRef.current = activeDropdown;
  }, [activeDropdown]);

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
      openSearchItem(item, (url) => router.push(url));
    },
    [router, closeSearch]
  );

  const filteredItems = useMemo(() => searchSite(searchQuery), [searchQuery]);

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
      } else if (e.key === "/" && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
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
        const open = activeDropdownRef.current;
        if (open && document.activeElement?.closest("[data-mega-menu]")) {
          triggerRefs.current[open]?.focus();
        }
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

  // Every page ends with the contact block, so scroll to it in place; fall back to the Home link.
  const handleContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const wasMobileOpen = mobileMenuOpen;
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    const target = document.getElementById("contact");
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait for the mobile sheet to release the page scroll lock before scrolling
    window.setTimeout(
      () => {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        window.history.replaceState(null, "", "#contact");
      },
      wasMobileOpen ? 420 : 0,
    );
  };

  // ArrowDown on a trigger opens its menu and moves focus to the first link once it has rendered
  const focusMenuOnOpenRef = useRef<NavMenu["id"] | null>(null);
  const focusFirstMenuLink = (id: NavMenu["id"]) =>
    document.querySelector<HTMLElement>(`[data-mega-menu="${id}"] a[href]`)?.focus();

  const openMenuFromKeyboard = (menu: NavMenu) => {
    if (activeDropdown === menu.id) {
      focusFirstMenuLink(menu.id);
      return;
    }
    focusMenuOnOpenRef.current = menu.id;
    setActiveDropdown(menu.id);
  };

  useEffect(() => {
    if (!activeDropdown || focusMenuOnOpenRef.current !== activeDropdown) return;
    focusMenuOnOpenRef.current = null;
    // The menu is `visibility: hidden` for its first frame(s), so retry until focus lands inside it
    let frames = 0;
    let raf = 0;
    const tryFocus = () => {
      focusFirstMenuLink(activeDropdown);
      if (!document.activeElement?.closest("[data-mega-menu]") && frames++ < 30) {
        raf = requestAnimationFrame(tryFocus);
      }
    };
    raf = requestAnimationFrame(tryFocus);
    return () => cancelAnimationFrame(raf);
  }, [activeDropdown]);

  const toggleMobileSubmenu = (menu: string) => {
    setMobileExpanded((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  if (pathname === "/maintenance") {
    return null;
  }

  // Product pages (Overview / Tech Specs) scroll this bar away so the local nav can take the top edge.
  const scrollsAway = /^\/projects\/[^/]+(\/specs|\/compare)?\/?$/.test(pathname);

  return (
    <>
      <header
        id="main-navigation"
        data-mobile-open={mobileMenuOpen ? "true" : "false"}
        data-dropdown-open={activeDropdown || searchOpen ? "true" : "false"}
        className={`${scrollsAway ? "absolute" : "fixed"} top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "h-12 bg-transparent border-transparent shadow-none"
            : activeDropdown || searchOpen
            ? "bg-white/70 dark:bg-[#0a0a0c]/68 backdrop-blur-3xl backdrop-saturate-200 border-b border-[#E5E5EA]/60 dark:border-white/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
            : "bg-white/55 dark:bg-black/50 backdrop-blur-3xl backdrop-saturate-200 border-b border-[#E5E5EA]/50 dark:border-white/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
        }`}
        onMouseLeave={handleMouseLeave}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveDropdown(null);
        }}
      >
        {/* Top Navigation Row - Apple 48px Height with seamless morphing to search bar */}
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 h-12 w-full flex items-center overflow-hidden">
          {/* Layer A: Standard Navigation Bar (slides left & dissolves on desktop when search is active) */}
          <div
            inert={searchOpen && isDesktop}
            className={`w-full flex items-center justify-between shrink-0 transition-all motion-reduce:transition-none ${
              searchOpen
                ? "md:opacity-0 md:-translate-x-2 md:scale-[0.99] md:pointer-events-none duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
                : "opacity-100 translate-x-0 scale-100 pointer-events-auto duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            }`}
          >
            {/* Brand / Logo (functions as Home link) */}
            <Link prefetch={false}
              href="/"
              className="group h-8 pointer-coarse:min-h-11 flex items-center gap-2 rounded-lg press nav-focus focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] z-20"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMobileMenuOpen(false);
              }}
            >
              <svg viewBox="0 0 128 128" className="size-7 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-[filter] duration-300 group-active:drop-shadow-none group-active:duration-100 motion-reduce:transition-none" fill="none" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="fill-[#1D1D1F] dark:fill-[#C7C7CC]" />
                <path
                  d="M60.05 78.96Q63.98 78.96 66.43 78.1Q71.07 76.44 71.07 71.94Q71.07 69.31 68.77 67.87Q66.46 66.46 61.53 65.38L55.91 64.12Q47.63 62.25 44.46 60.05Q39.09 56.38 39.09 48.57Q39.09 41.44 44.28 36.72Q49.47 32 59.51 32Q67.9 32 73.83 36.45Q79.75 40.9 80.04 49.36H69.38Q69.09 44.57 65.2 42.55Q62.61 41.22 58.76 41.22Q54.47 41.22 51.92 42.95Q49.36 44.68 49.36 47.77Q49.36 50.62 51.88 52.02Q53.5 52.96 58.79 54.22L67.94 56.42Q73.95 57.86 77.02 60.27Q81.77 64.02 81.77 71.11Q81.77 78.38 76.21 83.19Q70.64 88 60.49 88Q50.11 88 44.17 83.26Q38.23 78.53 38.23 70.25H48.82Q49.32 73.88 50.8 75.68Q53.5 78.96 60.05 78.96Z"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="fill-[#F5F5F7] stroke-[#F5F5F7] dark:fill-[#1D1D1F] dark:stroke-[#1D1D1F]"
                />
                <circle cx="108" cy="108" r="12" className="fill-[#0071E3] dark:fill-[#2997FF]" />
              </svg>
              <span className="font-semibold text-[15px] sm:text-base tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-none">
                Sri Tulasi Ram
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 z-20" aria-label="Main Navigation">
              {Object.values(NAV_MENUS).map((menu) => {
                const active = isActivePath(pathname, menu.href);
                const open = activeDropdown === menu.id;
                return (
                  <Link
                    key={menu.id}
                    ref={(node) => {
                      triggerRefs.current[menu.id] = node;
                    }}
                    prefetch={false}
                    href={menu.href}
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                    onFocus={() => {
                      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                      setActiveDropdown((current) => (current === menu.id ? current : null));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        openMenuFromKeyboard(menu);
                      }
                    }}
                    aria-expanded={open}
                    aria-current={active ? "page" : undefined}
                    className={`${TRIGGER_BASE} ${active || open ? TRIGGER_ON : TRIGGER_OFF}`}
                  >
                    {menu.label}
                  </Link>
                );
              })}

              {NAV_DIRECT_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                const closeMenus = () => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  setActiveDropdown(null);
                };
                return (
                  <Link
                    key={link.href}
                    prefetch={false}
                    href={link.href}
                    onMouseEnter={closeMenus}
                    onFocus={closeMenus}
                    aria-current={active ? "page" : undefined}
                    className={`${TRIGGER_BASE} ${active ? TRIGGER_ON : TRIGGER_OFF}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTA: Search, Theme Toggle & Let's Talk (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 z-20">
              {/* Apple Spotlight Search Trigger (Icon-only matching ThemeToggle) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search portfolio (⌘K)"
                title="Search (⌘K)"
                className="press nav-focus relative w-9 h-9 pointer-coarse:min-w-11 pointer-coarse:min-h-11 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] cursor-pointer"
              >
                <Search className="w-[17px] h-[17px] stroke-[1.65]" />
              </button>

              <ThemeToggle />
              <Link prefetch={false}
                href="/#contact"
                onClick={handleContact}
                className="press nav-focus h-7.5 pointer-coarse:min-h-11 px-3.5 inline-flex items-center justify-center rounded-full text-[13px] font-medium text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-[#F5F5F7] shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-hidden leading-none"
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
                className="press nav-focus relative w-9 h-9 pointer-coarse:min-w-11 pointer-coarse:min-h-11 rounded-full flex items-center justify-center transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 focus:outline-hidden cursor-pointer after:absolute after:-inset-1.5 after:content-['']"
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
                className="press nav-focus relative w-9 h-9 pointer-coarse:min-w-11 pointer-coarse:min-h-11 flex flex-col items-center justify-center gap-[5px] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 focus:outline-hidden after:absolute after:-inset-1.5 after:content-['']"
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
            inert={!searchOpen}
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
              className="no-focus-ring w-full bg-transparent font-sans antialiased text-[16px] sm:text-[17px] font-semibold placeholder:font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#8E8E93] focus:outline-hidden focus-visible:outline-hidden tracking-[-0.015em] py-2 leading-none caret-[#0071E3] dark:caret-[#2997FF]"
            />

            {/* Close / Cancel Button */}
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              title="Close search (Esc)"
              className="press nav-focus w-8 h-8 pointer-coarse:min-w-11 pointer-coarse:min-h-11 rounded-full flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10 transition-all focus:outline-hidden cursor-pointer shrink-0"
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
          inert={!searchOpen}
          aria-hidden={!searchOpen}
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
            {activeDropdown && (
              <MegaMenu key={activeDropdown} menu={NAV_MENUS[activeDropdown]} onNavigate={() => setActiveDropdown(null)} />
            )}
          </div>
        </div>

      </header>

      {/* Mobile menu sheet */}
      <MobileMenu
        open={mobileMenuOpen}
        pathname={pathname}
        expanded={mobileExpanded}
        onToggle={toggleMobileSubmenu}
        onNavigate={() => setMobileMenuOpen(false)}
        onContact={handleContact}
      />

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
