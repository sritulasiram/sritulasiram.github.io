"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { MacbookPro } from "@/components/ui/macbook-pro";
import AppleCarouselController from "@/components/AppleCarouselController";
import { cn } from "@/lib/cn";

const TelemetryBentoGrid = dynamic(() => import("@/components/TelemetryBentoGrid"), {
  loading: () => (
    <div className="w-full h-full bg-[#0E0E11] rounded-xl flex items-center justify-center p-4">
      <div className="text-center space-y-1">
        <div className="text-xs font-semibold text-[#00D084]">IoT Mixing Telemetry</div>
        <div className="text-[10px] text-neutral-500 font-mono">Sensors active</div>
      </div>
    </div>
  ),
});

export interface StageProject {
  id: string;
  name: string;
  subtitle: string;
  shortSubtitle: string;
  category: string;
  categoryId: "all" | "developed-systems" | "embedded-systems" | "case-studies";
  imageSrc: string;
  caseStudyUrl: string;
  buttonColor: string;
  ctaText: string;
}

export const STAGE_PROJECTS: StageProject[] = [
  {
    id: "raspberry-pi-diagnostics",
    name: "Raspberry Pi Diagnostics",
    subtitle: "Hardware QA & Automated RMA Triage Platform",
    shortSubtitle: "Hardware QA & Triage",
    category: "Developed Systems",
    categoryId: "developed-systems",
    imageSrc: "/images/pi-diagnostic.webp",
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    buttonColor: "#C51A4A",
    ctaText: "View case study",
  },
  {
    id: "warranty-rma",
    name: "Warranty & RMA",
    subtitle: "Internal Support Operations & Case Logistics",
    shortSubtitle: "Repairs & Supplier RMA",
    category: "Developed Systems",
    categoryId: "developed-systems",
    imageSrc: "/images/warranty-system-intake.png",
    caseStudyUrl: "/projects/warranty-rma",
    buttonColor: "#0071E3",
    ctaText: "View case study",
  },
  {
    id: "iot-fertiliser-mixing",
    name: "IoT Fertiliser Mixing",
    subtitle: "Peer-Reviewed Smart Agriculture Automation",
    shortSubtitle: "Precision Agriculture",
    category: "Embedded Systems",
    categoryId: "embedded-systems",
    imageSrc: "/images/projects/iot-fertiliser/fig-1-system-overview.png",
    caseStudyUrl: "/projects/iot-fertiliser-mixing",
    buttonColor: "#1E7E34",
    ctaText: "View case study",
  },
];

export default function HeroStage() {
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
      id="overview"
      ref={heroRef}
      className="scroll-mt-20 relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] sm:w-[920px] h-[480px] rounded-full bg-gradient-to-b from-[#0071E3]/12 via-[#2997FF]/6 to-transparent blur-3xl -z-10"
      />

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
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Projects
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">Hardware, software and the space between.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
            Hardware and software engineered as one.
            <br />
            From low-level silicon to production platforms.
          </p>
        </div>

        {/* Apple Scroll-Morph Staging Viewport */}
        <div
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative z-10 w-full max-w-[580px] sm:max-w-[640px] md:max-w-[700px] mx-auto touch-pan-y transition-transform duration-300 ease-out will-change-transform"
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
                  <MacbookPro
                    src={
                      item.id === "iot-fertiliser-mixing"
                        ? undefined
                        : item.imageSrc
                    }
                    fit="fill"
                    showNotch={false}
                    priority={slot.isCenter}
                    className="w-full h-full drop-shadow-2xl"
                  >
                    {item.id === "iot-fertiliser-mixing" ? (
                      <div className="w-full h-full p-2 bg-[#0E0E11]">
                        {Math.abs(diff) <= 1 ? (
                          <TelemetryBentoGrid />
                        ) : (
                          <div className="w-full h-full bg-[#0E0E11] rounded-xl flex items-center justify-center">
                            <span className="text-[11px] text-neutral-500 font-mono">IoT Telemetry</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </MacbookPro>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Side-by-Side Control Bar: Title, Dot Controller, CTA */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
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
          <Link
            href={activeProject.caseStudyUrl}
            style={{ backgroundColor: activeProject.buttonColor }}
            className="min-h-[44px] px-5 inline-flex items-center justify-center gap-1.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xs hover:brightness-110 active:scale-95 transition-all duration-300 shrink-0 whitespace-nowrap group"
          >
            <span>{activeProject.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
