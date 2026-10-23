"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import HrAssistiveMacbook from "./visuals/HrAssistiveMacbook";
import AppleCarouselController from "@/components/ui/AppleCarouselController";
import Button from "@/components/ui/Button";
import { PROJECT_ACCENTS } from "@/data/projectTheme";
import { cn } from "@/lib/cn";

export interface StageProject {
  id: string;
  name: string;
  subtitle: string;
  shortSubtitle: string;
  category: string;
  categoryId: "all" | "developed-systems" | "embedded-systems" | "case-studies";
  imageSrc: string;
  caseStudyUrl: string;
  ctaText: string;
}

export const STAGE_PROJECTS: StageProject[] = [
  {
    id: "cytron-hr-assistive-intelligence",
    name: "Cytron HR Assistive Intelligence",
    subtitle: "Internal HR Assistant · Retrieval-Augmented Generation",
    shortSubtitle: "Cited HR Answers",
    category: "Developed Systems",
    categoryId: "developed-systems",
    imageSrc: "",
    caseStudyUrl: "/projects/cytron-hr-assistive-intelligence",
    ctaText: "View retrieval architecture",
  },
  {
    id: "raspberry-pi-diagnostics",
    name: "Raspberry Pi Diagnostics",
    subtitle: "Hardware QA & Automated RMA Triage Platform",
    shortSubtitle: "Hardware QA & Triage",
    category: "Developed Systems",
    categoryId: "developed-systems",
    imageSrc: "/images/projects/raspberry-pi-diagnostics/cover.webp",
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    ctaText: "View hardware validation",
  },
  {
    id: "warranty-rma",
    name: "Warranty & RMA",
    subtitle: "Internal Support Operations & Case Logistics",
    shortSubtitle: "Repairs & Supplier RMA",
    category: "Developed Systems",
    categoryId: "developed-systems",
    imageSrc: "/images/projects/warranty-rma/screen-intake-laptop.jpg",
    caseStudyUrl: "/projects/warranty-rma",
    ctaText: "View operations architecture",
  },
];

export default function ProjectsHeroStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(() => new Set());
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafScrollRef = useRef<number | null>(null);

  // Apple Scroll-Morph: 120 FPS rAF direct DOM GPU transform without triggering React re-renders
  useEffect(() => {
    const handleScroll = () => {
      if (rafScrollRef.current !== null) return;
      rafScrollRef.current = requestAnimationFrame(() => {
        rafScrollRef.current = null;
        const scrollY = window.scrollY;
        // Morph progress from 0 (at top) to 1 (scrolled 350px)
        const progress = Math.min(Math.max(scrollY / 350, 0), 1);
        if (viewportRef.current) {
          viewportRef.current.style.transform = `translateY(${progress * 20}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafScrollRef.current !== null) {
        cancelAnimationFrame(rafScrollRef.current);
      }
    };
  }, []);

  const activeProject = STAGE_PROJECTS[activeIndex] || STAGE_PROJECTS[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Only switch slides if horizontal swipe dominates vertical scrolling
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      if (deltaX > 0) {
        setActiveIndex((prev) => (prev + 1) % STAGE_PROJECTS.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + STAGE_PROJECTS.length) % STAGE_PROJECTS.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const getSlot = (index: number) => {
    const total = STAGE_PROJECTS.length;
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getSlotStyle = (diff: number) => {
    switch (diff) {
      case 0:
        return {
          xPercent: 0,
          scale: 1.0,
          zIndex: 30,
          opacityClass: "opacity-100",
          brightness: 1,
          isCenter: true,
        };
      case -1:
        return {
          xPercent: -48,
          scale: 0.82,
          zIndex: 20,
          opacityClass: "opacity-85 sm:opacity-95",
          brightness: 0.88,
          isCenter: false,
        };
      case 1:
        return {
          xPercent: 48,
          scale: 0.82,
          zIndex: 20,
          opacityClass: "opacity-85 sm:opacity-95",
          brightness: 0.88,
          isCenter: false,
        };
      case -2:
        return {
          xPercent: -92,
          scale: 0.7,
          zIndex: 10,
          opacityClass: "opacity-0 sm:opacity-80",
          brightness: 0.78,
          isCenter: false,
        };
      case 2:
        return {
          xPercent: 92,
          scale: 0.7,
          zIndex: 10,
          opacityClass: "opacity-0 sm:opacity-80",
          brightness: 0.78,
          isCenter: false,
        };
      default:
        return {
          xPercent: 0,
          scale: 0.65,
          zIndex: 0,
          opacityClass: "opacity-0 pointer-events-none",
          brightness: 0.5,
          isCenter: false,
        };
    }
  };

  return (
    <section
      data-section="overview"
      ref={heroRef}
      className="scroll-mt-20 relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
        {/* Back Link Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
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
                Projects
              </span>
            </li>
          </ol>
        </nav>

        {/* Page Header matching Design & Photography typography */}
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Projects
            <span className="mt-3 block text-[0.36em] font-medium leading-[1.15] tracking-apple-tight text-[#6E6E73] dark:text-[#8E8E93] text-balance">Hardware, software and the space between.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
            Hardware and software engineered as one.
            <br />
            From low-level silicon to production platforms.
          </p>
        </div>

        {/* Phones: one featured project in place of the carousel */}
        <div className="sm:hidden mt-8 text-left">
          <Link href={STAGE_PROJECTS[0].caseStudyUrl} aria-hidden="true" tabIndex={-1} className="block">
            <HrAssistiveMacbook className="w-full h-auto drop-shadow-xl" />
          </Link>
          <div className="pt-6 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0F8B8D" }}>
              Featured · In development
            </p>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">{STAGE_PROJECTS[0].name}</h2>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{STAGE_PROJECTS[0].subtitle}</p>
            <div className="pt-3">
              <Button
                href={STAGE_PROJECTS[0].caseStudyUrl}
                accent={PROJECT_ACCENTS[STAGE_PROJECTS[0].id]}
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                {STAGE_PROJECTS[0].ctaText}
              </Button>
            </div>
          </div>
        </div>

        {/* Apple Scroll-Morph Staging Viewport */}
        <div
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="hidden sm:block relative z-10 w-full max-w-[580px] sm:max-w-[640px] md:max-w-[700px] mx-auto touch-pan-y transition-transform duration-300 ease-out will-change-transform"
          style={{
            aspectRatio: "650 / 400",
          }}
        >
          {STAGE_PROJECTS.map((item, idx) => {
            const diff = getSlot(idx);
            const slot = getSlotStyle(diff);
            const staggerMs = Math.abs(diff) * 40;
            const panOffset = `${-slot.xPercent}%`;
            const hasAnimated = animatedIds.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                role={!slot.isCenter ? "button" : undefined}
                tabIndex={!slot.isCenter ? 0 : -1}
                aria-label={!slot.isCenter ? `Select ${item.name}` : `${item.name} showcase`}
                onKeyDown={(e) => {
                  if (!slot.isCenter && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                className={cn(
                  "stage-slide absolute inset-0 origin-center transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                  slot.opacityClass,
                  !slot.isCenter ? "cursor-pointer hover:brightness-95 focus-visible:outline-2 focus-visible:outline-[#0071E3] rounded-3xl" : "cursor-default",
                )}
                style={{
                  transform: `translateX(${slot.xPercent}%) scale(${slot.scale})`,
                  zIndex: slot.zIndex,
                  filter: `brightness(${slot.brightness})`,
                }}
              >
                <div
                  className="phone-reveal-anim w-full h-full relative"
                  style={
                    hasAnimated || slot.isCenter
                      ? {
                          willChange: "auto",
                        }
                      : {
                          ["--pan-offset" as string]: panOffset,
                          animation: `phonePanFromCenter 0.7s cubic-bezier(0.16,1,0.3,1) ${staggerMs}ms both`,
                          willChange: "transform, opacity",
                        }
                  }
                  onAnimationEnd={() => {
                    setAnimatedIds((prev) => {
                      if (prev.has(item.id)) return prev;
                      const next = new Set(prev);
                      next.add(item.id);
                      return next;
                    });
                  }}
                >
                  {item.id === "cytron-hr-assistive-intelligence" ? (
                    <HrAssistiveMacbook
                      priority={slot.isCenter}
                      className="w-full h-full drop-shadow-2xl"
                    />
                  ) : (
                    <MacbookPro
                      src={item.imageSrc}
                      fit="fill"
                      showNotch={false}
                      priority={slot.isCenter}
                      className="w-full h-full drop-shadow-2xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Side-by-Side Control Bar: Title, Dot Controller, CTA */}
        <div className="mt-6 sm:mt-8 hidden sm:flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
          {/* Active Project Title & Tagline */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              {activeProject.name}
            </span>
            <span className="text-[#8E8E93] text-xs">·</span>
            <span className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] font-normal">
              {activeProject.shortSubtitle}
            </span>
          </div>

          {/* Dot Scrubber */}
          <div className="shrink-0">
            <AppleCarouselController
              itemCount={STAGE_PROJECTS.length}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              slideDuration={4500}
              ariaLabel="Featured engineering systems carousel controller"
            />
          </div>

          {/* Action Link with Dynamic Descriptive CTA & Apple 44pt Touch Target */}
          <Button
            href={activeProject.caseStudyUrl}
            accent={PROJECT_ACCENTS[activeProject.id]}
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            className="shrink-0 whitespace-nowrap"
          >
            {activeProject.ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
