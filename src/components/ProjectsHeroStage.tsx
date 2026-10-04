"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { MacbookPro } from "@/components/ui/macbook-pro";
import AppleCarouselController from "./AppleCarouselController";
import TelemetryBentoGrid from "./TelemetryBentoGrid";
import { cn } from "@/lib/cn";

interface StageProject {
  id: string;
  name: string;
  subtitle: string;
  shortSubtitle: string;
  category: string;
  imageSrc: string;
  caseStudyUrl: string;
  buttonColor: string;
  ctaText: string;
}

const STAGE_PROJECTS: StageProject[] = [
  {
    id: "raspberry-pi-diagnostics",
    name: "Raspberry Pi Diagnostics",
    subtitle: "Enterprise Hardware QA & Automated RMA Triage Platform",
    shortSubtitle: "Hardware QA & Triage",
    category: "Automated Hardware Validation",
    imageSrc: "/images/pi-diagnostic.webp",
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    buttonColor: "#C51A4A", // Raspberry Pi Red
    ctaText: "View Hardware Validation",
  },
  {
    id: "warranty-rma",
    name: "Warranty & RMA",
    subtitle: "Internal Support Operations & Case Logistics",
    shortSubtitle: "Operations Hub & Ledger",
    category: "Internal Enterprise Operations",
    imageSrc: "/images/project-rma.webp",
    caseStudyUrl: "/projects/warranty-rma",
    buttonColor: "#0071E3", // Apple System Blue
    ctaText: "View Operations System",
  },
  {
    id: "iot-fertiliser-mixing",
    name: "IoT Fertiliser Mixing",
    subtitle: "Peer-Reviewed Smart Agriculture Automation",
    shortSubtitle: "Precision Agriculture",
    category: "Smart Agriculture & Research",
    imageSrc: "/images/projects/iot-fertiliser/fig-1-system-overview.png",
    caseStudyUrl: "/projects/iot-fertiliser-mixing",
    buttonColor: "#1E7E34", // Emerald Green
    ctaText: "Read Published Research",
  },
];

export default function ProjectsHeroStage() {
  const [activeIndex, setActiveIndex] = useState(0); // Starts on Raspberry Pi Diagnostics
  const activeProject = STAGE_PROJECTS[activeIndex];
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // Swiped left -> next slide
        setActiveIndex((prev) => (prev + 1) % STAGE_PROJECTS.length);
      } else {
        // Swiped right -> previous slide
        setActiveIndex((prev) => (prev - 1 + STAGE_PROJECTS.length) % STAGE_PROJECTS.length);
      }
    }
    touchStartX.current = null;
  };

  const getSlot = (index: number) => {
    let diff = (index - activeIndex) % STAGE_PROJECTS.length;
    if (diff > STAGE_PROJECTS.length / 2) diff -= STAGE_PROJECTS.length;
    if (diff < -STAGE_PROJECTS.length / 2) diff += STAGE_PROJECTS.length;
    return diff; // -1, 0, 1
  };

  const getSlotStyle = (diff: number) => {
    switch (diff) {
      case 0:
        return {
          xPercent: 0,
          scale: 1.02,
          rotate: 0,
          zIndex: 30,
          opacityClass: "opacity-100",
          brightness: 1,
          isCenter: true,
        };
      case -1:
        return {
          xPercent: -48,
          scale: 0.82,
          rotate: 0,
          zIndex: 20,
          opacityClass: "opacity-85 sm:opacity-95",
          brightness: 0.88,
          isCenter: false,
        };
      case 1:
        return {
          xPercent: 48,
          scale: 0.82,
          rotate: 0,
          zIndex: 20,
          opacityClass: "opacity-85 sm:opacity-95",
          brightness: 0.88,
          isCenter: false,
        };
      default:
        return {
          xPercent: 0,
          scale: 0.7,
          rotate: 0,
          zIndex: 0,
          opacityClass: "opacity-0 pointer-events-none",
          brightness: 0.5,
          isCenter: false,
        };
    }
  };

  return (
    <section id="overview" className="scroll-mt-20 relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
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

        {/* Page Header matching Design & Photography layout */}
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Projects
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">Built for precision</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
            Low-level Linux kernel diagnostics, production RMA operations architecture, and published IoT precision agriculture firmware.
          </p>
        </div>

        {/* MacBook Pro 3-Laptop Staging Viewport */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative z-10 w-full max-w-[560px] sm:max-w-[620px] md:max-w-[660px] mx-auto touch-pan-y"
          style={{ aspectRatio: "650 / 400" }}
        >
          {STAGE_PROJECTS.map((item, idx) => {
            const diff = getSlot(idx);
            const slot = getSlotStyle(diff);

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "absolute inset-0 origin-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                  slot.opacityClass,
                  !slot.isCenter ? "cursor-pointer hover:brightness-95" : "cursor-default",
                )}
                style={{
                  transform: `translateX(${slot.xPercent}%) scale(${slot.scale}) rotate(${slot.rotate}deg)`,
                  zIndex: slot.zIndex,
                  filter: `brightness(${slot.brightness})`,
                }}
              >
                <div className="w-full h-full relative">
                  <MacbookPro
                    src={item.id === "iot-fertiliser-mixing" ? undefined : item.imageSrc}
                    fit="fill"
                    showNotch={false}
                    className="w-full h-full drop-shadow-2xl"
                  >
                    {item.id === "iot-fertiliser-mixing" ? (
                      <div className="w-full h-full p-2 bg-[#0E0E11]">
                        <TelemetryBentoGrid />
                      </div>
                    ) : null}
                  </MacbookPro>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Side-by-Side Control Bar: Title, Dot Play Scrubber, CTA Button */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
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

          {/* Dot Play Option (Apple Carousel Scrubber) */}
          <div className="shrink-0">
            <AppleCarouselController
              itemCount={STAGE_PROJECTS.length}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              slideDuration={4500}
              ariaLabel="Featured engineering systems carousel controller"
            />
          </div>

          {/* Action Button Matching Project Brand Color */}
          <Link
            href={activeProject.caseStudyUrl}
            style={{ backgroundColor: activeProject.buttonColor }}
            className="h-9 sm:h-10 px-4 sm:px-5 inline-flex items-center justify-center gap-1.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xs hover:brightness-110 active:scale-95 transition-all duration-300 shrink-0 whitespace-nowrap group"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
