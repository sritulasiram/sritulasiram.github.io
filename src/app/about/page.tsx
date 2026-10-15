"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  Award,
  X,
  ExternalLink,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { ABOUT_DATA } from "@/data/content";

// ── Consolidated high-signal chapter sections for side nav ───────────────────
const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "career", label: "Career" },
  { id: "impact", label: "Impact" },
  { id: "credentials", label: "Credentials" },
  { id: "languages", label: "Languages" },
  { id: "contact", label: "Contact" },
];

function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function getSocialIcon(label: string) {
  const norm = label.toLowerCase();
  if (norm.includes("linkedin")) return <LinkedInIcon className="w-3.5 h-3.5 text-current" />;
  if (norm.includes("github")) return <GitHubIcon className="w-3.5 h-3.5 text-current" />;
  if (norm.includes("instagram")) return <InstagramIcon className="w-3.5 h-3.5 text-current" />;
  return null;
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [navVisible, setNavVisible] = useState(false);
  const [certificateModal, setCertificateModal] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const isScrollingToRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Achievements carousel scroll ref & states ────────────────────────────
  const achievementsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = achievementsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollPrev = () => {
    const el = achievementsScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth * 0.75, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = achievementsScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.75, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // ── Keyboard accessibility & scroll lock for certificate preview modal ───────
  useEffect(() => {
    if (!certificateModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertificateModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [certificateModal]);

  // ── Unified robust scroll listener for nav visibility & chapter tracking ────
  useEffect(() => {
    const handleScroll = () => {
      const overview = document.getElementById("overview");
      if (overview) {
        const rect = overview.getBoundingClientRect();
        setNavVisible(rect.bottom < 120);
      }

      // If programmatic smooth scrolling is running, respect that target
      if (isScrollingToRef.current) return;

      // Bottom of page: activate last section (contact)
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Reverse search for topmost active section intersecting reading line (240px from top)
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const { id } = NAV_SECTIONS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 240) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    isScrollingToRef.current = id;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = null;
    }, 850);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };


  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 selection:bg-black/10 dark:selection:bg-white/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP CHAPTER SCRUBBER (Hidden on mobile/tablet to protect viewport) */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Page chapters"
        className={`hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${navVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
      >
        {NAV_SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-3 py-1.5 px-1 text-left group cursor-pointer select-none"
            >
              {/* Precision Optical Tick Mark with Apple Spring Animation */}
              <span
                className={`block rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] shrink-0 ${isActive
                    ? "w-6 h-[2.5px] bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                    : "w-2.5 h-[1px] bg-[#C7C7CC] dark:bg-[#3A3A3C] group-hover:w-4 group-hover:bg-[#6E6E73] dark:group-hover:bg-[#8E8E93]"
                  }`}
              />
              {/* Chapter Label: Bold & Shifted on Active with Apple Spring Curve */}
              <span
                className={`whitespace-nowrap transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${isActive
                    ? "text-[13.5px] font-bold tracking-tight text-black dark:text-white translate-x-1"
                    : "text-[12px] font-normal tracking-apple-tight text-[#6E6E73] dark:text-[#8E8E93] opacity-80 group-hover:opacity-100 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5"
                  }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTAINER                                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <main className="flex flex-col">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-24 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-2 -my-2 min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
              </li>
              <li>
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold" aria-current="page">
                  About
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* ── 1. Overview & Studio Hero (#overview) ────────────────────────── */}
        <section
          id="overview"
          aria-label="Overview & Bio"
          className="max-w-6xl mx-auto w-full px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-20 scroll-mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-x-14 lg:gap-y-6 items-start">

            {/* 1. Headline */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                About &amp; Background
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-apple-hero text-[#1D1D1F] dark:text-[#F5F5F7]">
                <span className="block">Engineering precision.</span>
                <span className="block text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                  Design intuition.
                </span>
              </h1>
            </div>

            {/* 2. Portrait Column: Photo + Full Name + Links (Under tagline on mobile, right column on desktop) */}
            <div className="lg:col-span-5 lg:row-span-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] space-y-3 text-center">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/portraits/sri-portrait.webp"
                    alt="Portrait of Sri Tulasi Ram"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    className="object-contain object-bottom dark:hidden transition-transform duration-500 hover:scale-[1.02]"
                    priority
                  />
                  <Image
                    src="/images/portraits/sri-portrait-dark.webp"
                    alt="Portrait of Sri Tulasi Ram (Dark Mode)"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    className="object-cover object-center hidden dark:block transition-transform duration-500 hover:scale-[1.02]"
                    priority
                  />
                </div>

                {/* Full Name */}
                <div className="pt-2 text-center">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Sri Tulasi Ram
                  </h2>
                </div>

                {/* Action Pills: Resume + Socials */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] hover:bg-black dark:hover:bg-[#F5F5F7] text-xs font-semibold transition-all active:scale-[0.98] shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Resume</span>
                  </a>

                  {ABOUT_DATA.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all active:scale-[0.98] shadow-2xs"
                    >
                      {getSocialIcon(link.label)}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Bio Narrative */}
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-[580px]">
              <p>
                I&rsquo;m Sri. I&rsquo;ve always been drawn to the line where engineering precision meets human intuition. Whether it&rsquo;s an intermittent signal on a microcontroller bus or friction in a digital user flow, I care about the invisible details that make complex systems feel effortless.
              </p>
              <p>
                At Cytron Technologies, my work sits at the intersection of embedded electronics, hardware diagnostics, and systems automation. Working directly with makers, developers, and robotics engineers across the region, I diagnose elusive component-level hardware faults, architect automated test suites, and turn manual bench triage into fast, reliable software.
              </p>
              <p>
                Product and interface design is where that technical rigor meets human empathy. I design mobile and web interfaces&mdash;not simply to look sleek or impressive, but to feel natural, responsive, and genuinely human. Grounded in Apple&rsquo;s design principles, my goal is to strip away cognitive clutter so the technology gets out of the way, leaving an experience that people can instinctively connect with.
              </p>
              <p>
                Photography keeps that eye honest. Where engineering and design are about imposing structure, photography is about patient observation&mdash;learning to see light, atmosphere, and authentic moments as they actually exist, training the eye to notice what everyone else overlooks.
              </p>
            </div>

          </div>
        </section>

        {/* ── 2. Career & Education Timeline (#career) ─────────────────────── */}
        <section
          id="career"
          aria-label="Career & Education"
          className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20 space-y-12"
        >
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
              Career & Foundations
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.06]">
              Experience & Education.
            </h2>
          </div>

          <div className="space-y-16">
            {/* Experience Section */}
            <div className="space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                Professional Experience
              </p>

              <div className="space-y-10 sm:space-y-12">
                {ABOUT_DATA.experience?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
                  >
                    {/* Left Column: Logo -> Organization -> Location -> Period */}
                    <div className="md:col-span-4 space-y-3">
                      {item.logoSrc && (
                        <div className="h-11 sm:h-12 flex items-center">
                          <Image
                            src={item.logoSrc}
                            alt={item.logoAlt || item.organization}
                            width={48}
                            height={48}
                            className="h-11 w-11 sm:h-12 sm:w-12 object-contain rounded-full shadow-2xs"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {item.organization}
                        </p>
                        {item.location && (
                          <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                            {item.location}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] pt-0.5">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Title, Narrative & Highlights */}
                    <div className="md:col-span-8 space-y-3.5">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.role}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                      <ul className="space-y-2 pt-1 max-w-2xl">
                        {item.highlights.map((h, hIdx) => {
                          const colonIdx = h.indexOf(":");
                          if (colonIdx !== -1) {
                            const label = h.slice(0, colonIdx);
                            const desc = h.slice(colonIdx + 1);
                            return (
                              <li key={hIdx} className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40 dark:bg-white/40 mt-2 shrink-0" />
                                <span>
                                  <strong className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{label}:</strong>
                                  {desc}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li key={hIdx} className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40 dark:bg-white/40 mt-2 shrink-0" />
                              <span>{h}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                Academic Foundations
              </p>

              <div className="space-y-10 sm:space-y-12">
                {ABOUT_DATA.education?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
                  >
                    {/* Left Column: Logo -> School -> Faculty/Location -> Period */}
                    <div className="md:col-span-4 space-y-3">
                      {item.logoSrc && (
                        <div className="h-11 sm:h-12 flex items-center">
                          <Image
                            src={item.logoSrc}
                            alt={item.logoAlt || item.organization}
                            width={130}
                            height={48}
                            className="h-11 sm:h-12 w-auto object-contain opacity-90 dark:opacity-85 dark:brightness-[1.15]"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {item.organization}
                        </p>
                        {item.faculty && (
                          <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                            {item.faculty}
                          </p>
                        )}
                        {item.location && (
                          <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                            {item.location}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] pt-0.5">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Degree & Academic Research */}
                    <div className="md:col-span-8 space-y-3.5">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.role}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                      <ul className="space-y-2 pt-1 max-w-2xl">
                        {item.highlights.map((h, hIdx) => {
                          const colonIdx = h.indexOf(":");
                          if (colonIdx !== -1) {
                            const label = h.slice(0, colonIdx);
                            const desc = h.slice(colonIdx + 1);
                            return (
                              <li key={hIdx} className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40 dark:bg-white/40 mt-2 shrink-0" />
                                <span>
                                  <strong className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{label}:</strong>
                                  {desc}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li key={hIdx} className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40 dark:bg-white/40 mt-2 shrink-0" />
                              <span>{h}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Impact & Honours (#impact) ─────────────────────────────────── */}
        {/* Apple Showcase Carousel Architecture (Matching 'Set to stunning.') */}
        <section
          id="impact"
          aria-label="Impact & Achievements"
          className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20 space-y-8"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                Honours & Awards
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.06]">
                Recognised for impact.
              </h2>
            </div>

            {/* Top Carousel Navigation Buttons (Apple circular arrows) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous achievement"
                className="w-10 h-10 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next achievement"
                className="w-10 h-10 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Apple Showcase Carousel Track */}
          <div
            ref={achievementsScrollRef}
            onScroll={checkScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8"
          >
            {ABOUT_DATA.achievements?.map((item, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-[84vw] sm:w-[480px] lg:w-[540px] space-y-4 select-none group"
              >
                {/* Large Apple Rounded Image Frame */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden bg-[#F5F5F7] dark:bg-[#151518] border border-black/[0.05] dark:border-white/[0.08] apple-card-shadow">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.label}
                      fill
                      sizes="(max-width: 640px) 85vw, 540px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F5F7] to-[#E5E5EA]/50 dark:from-[#1C1C1E] dark:to-[#121214] border border-black/5 dark:border-white/10 p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#252528] border border-black/5 dark:border-white/10 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shadow-2xs">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {item.label}
                        </p>
                        <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                          {item.source || "Official Credential"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Editorial Caption: Bold lead-in + descriptive text */}
                <div className="space-y-1.5 text-left px-1">
                  <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                    <strong className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {item.label}.
                    </strong>{" "}
                    {item.context}
                  </p>
                  {item.source && (
                    <p className="text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#8E8E93] pt-0.5">
                      {item.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Controls */}
          <div className="flex sm:hidden items-center justify-end gap-2 pt-1">
            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label="Previous achievement"
              className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Next achievement"
              className="w-9 h-9 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ── 4. Credentials & Certifications (#credentials) ───────────────── */}
        <section
          id="credentials"
          aria-label="Credentials and Certifications"
          className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20 space-y-10"
        >
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
              Professional Record
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.06]">
              Qualifications, research &amp; training.
            </h2>
          </div>

          {/* Professional Credentials List */}
          <div className="space-y-10 sm:space-y-12">

            {/* 1. Board of Engineers Malaysia (BEM) */}
            {ABOUT_DATA.accreditation && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                <div className="md:col-span-4 space-y-2.5">
                  <div className="h-11 sm:h-12 flex items-center">
                    <Image
                      src={ABOUT_DATA.accreditation.logoSrc || "/images/logos/bem.png"}
                      alt="Board of Engineers Malaysia"
                      width={56}
                      height={56}
                      className="h-11 sm:h-12 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                      Statutory Professional Body
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#6E6E73] dark:text-[#A1A1A6] text-[11px] font-medium">
                      Washington Accord &middot; EAC
                    </span>
                  </div>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold font-display tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {ABOUT_DATA.accreditation.body}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium tracking-apple-subhead text-[#6E6E73] dark:text-[#A1A1A6]">
                    {ABOUT_DATA.accreditation.title} &middot; {ABOUT_DATA.accreditation.discipline}
                  </p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-0.5 leading-relaxed">
                    Registration of Engineers Act 1967 &middot; Active Registration
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right flex md:flex-col md:items-end justify-between items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                    Registration No.
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7] px-3 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06]">
                    {ABOUT_DATA.accreditation.registrationNo}
                  </span>
                </div>
              </div>
            )}

            {/* 2. Malaysian Red Crescent Society (MRCS) */}
            {ABOUT_DATA.firstAid && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                <div className="md:col-span-4 space-y-2.5">
                  <div className="h-11 sm:h-12 flex items-center">
                    <Image
                      src={ABOUT_DATA.firstAid.logoSrc || "/images/logos/red-crescent.png"}
                      alt="Malaysian Red Crescent Society Logo"
                      width={140}
                      height={32}
                      className="h-8 sm:h-9 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src={ABOUT_DATA.firstAid.logoDarkSrc || "/images/logos/red-crescent-dark.png"}
                      alt="Malaysian Red Crescent Society Logo"
                      width={140}
                      height={32}
                      className="h-8 sm:h-9 w-auto object-contain hidden dark:block"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                      Emergency Life Support &amp; First Aid
                    </span>
                  </div>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold font-display tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {ABOUT_DATA.firstAid.body}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium tracking-apple-subhead text-[#6E6E73] dark:text-[#A1A1A6]">
                    {ABOUT_DATA.firstAid.title} &middot; {ABOUT_DATA.firstAid.branch}
                  </p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-0.5 leading-relaxed">
                    National Training Committee &middot; Certified First Aider &amp; CPR Provider
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right flex md:flex-col md:items-end justify-between items-center gap-2">
                  <div className="space-y-0.5 md:text-right">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                      Serial No.
                    </span>
                    <span className="text-sm font-semibold tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7] px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06] inline-block">
                      {ABOUT_DATA.firstAid.serialNo}
                    </span>
                  </div>
                  {ABOUT_DATA.firstAid.certificateSrc && (
                    <button
                      type="button"
                      onClick={() =>
                        setCertificateModal({
                          src: ABOUT_DATA.firstAid?.certificateSrc || "/images/certificates/red-crescent.png",
                          title: "Malaysian Red Crescent Society — First Aid & CPR Certification",
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/15 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93]" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 3. International Journal of Integrated Engineering (IJIE) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
              <div className="md:col-span-4 space-y-2.5">
                <div className="h-11 sm:h-12 flex items-center">
                  <Image
                    src="/images/logos/ijie.png"
                    alt="International Journal of Integrated Engineering"
                    width={100}
                    height={36}
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                    Peer-Reviewed Journal
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#6E6E73] dark:text-[#A1A1A6] text-[11px] font-medium">
                    Scopus Indexed &middot; 2026
                  </span>
                </div>
              </div>
              <div className="md:col-span-5 space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold font-display tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7]">
                  International Journal of Integrated Engineering
                </h3>
                <p className="text-xs sm:text-sm font-medium tracking-apple-subhead text-[#6E6E73] dark:text-[#A1A1A6] leading-snug">
                  IoT-Based Fertiliser Mixing for Hydroponic Precision Agriculture
                </p>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-0.5 leading-relaxed">
                  First Author &middot; Penerbit UTHM &middot; Vol. 18, No. 1, pp. 186–201
                </p>
              </div>
              <div className="md:col-span-3 md:text-right flex md:flex-col md:items-end justify-between items-center gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                  Archive Access
                </span>
                <a
                  href="https://journal.uthm.edu.my/index.php/ijie/article/view/24386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/15 transition-all active:scale-[0.98]"
                >
                  <span>Read Paper</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93]" />
                </a>
              </div>
            </div>

            {/* 4. Academind & KPT PACE */}
            {ABOUT_DATA.flutterCert && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                <div className="md:col-span-4 space-y-2.5">
                  <div className="h-11 sm:h-12 flex items-center">
                    <Image
                      src={ABOUT_DATA.flutterCert.logoSrc}
                      alt="Academind Network Logo"
                      width={110}
                      height={40}
                      className="h-8 sm:h-9 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src={ABOUT_DATA.flutterCert.logoDarkSrc || ABOUT_DATA.flutterCert.logoSrc}
                      alt="Academind Network Logo"
                      width={110}
                      height={40}
                      className="h-8 sm:h-9 w-auto object-contain hidden dark:block"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                      Certificate of Competence
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#6E6E73] dark:text-[#A1A1A6] text-[11px] font-medium">
                      KPT PACE &middot; Oct 2023
                    </span>
                  </div>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold font-display tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {ABOUT_DATA.flutterCert.body}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium tracking-apple-subhead text-[#6E6E73] dark:text-[#A1A1A6] leading-snug">
                    {ABOUT_DATA.flutterCert.course}
                  </p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] pt-0.5 leading-relaxed">
                    KPT PACE &amp; UTHM Collaboration &middot; {ABOUT_DATA.flutterCert.issuedRange}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right flex md:flex-col md:items-end justify-between items-center gap-2">
                  <div className="space-y-0.5 md:text-right">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93] block">
                      Serial No.
                    </span>
                    <span className="text-sm font-semibold tracking-apple-headline text-[#1D1D1F] dark:text-[#F5F5F7] px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06] inline-block">
                      {ABOUT_DATA.flutterCert.serialNo}
                    </span>
                  </div>
                  {ABOUT_DATA.flutterCert.certificateSrc && (
                    <button
                      type="button"
                      onClick={() =>
                        setCertificateModal({
                          src: ABOUT_DATA.flutterCert?.certificateSrc || "/images/certificates/flutter-academind.png",
                          title: "Academind Network — Google Flutter Cross-Platform Development Certificate",
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/15 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93]" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </section>

        {/* ── 5. Spoken Languages (#languages) ──────────────────────────── */}
        <section
          id="languages"
          aria-label="Spoken Languages"
          className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20 space-y-8"
        >
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
              Spoken Languages
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
              Multilingual fluency.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 sm:gap-x-10 pt-2">
            {ABOUT_DATA.languages?.map((lang) => (
              <div key={lang.name} className="flex flex-col gap-0.5">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {lang.name}
                </h3>
                {lang.nativeName && lang.nativeName !== lang.name && (
                  <p className="text-xs sm:text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {lang.nativeName}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] mt-auto pt-1">
                  {lang.proficiency}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact & Footer (#contact) ────────────────────────── */}
        <Footer className="scroll-mt-20" />

        {/* ── Certificate Preview Lightbox Modal ───────────────────────── */}
        {certificateModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={certificateModal.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setCertificateModal(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#1C1C1E] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/15 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-black/5 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#161618]">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8E93]">
                    Verified Credential
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                    {certificateModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCertificateModal(null)}
                  aria-label="Close certificate preview"
                  className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[75vh] bg-[#F5F5F7] dark:bg-black p-4 flex items-center justify-center overflow-auto">
                <Image
                  src={certificateModal.src}
                  alt={certificateModal.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 95vw, 896px"
                  priority
                />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
