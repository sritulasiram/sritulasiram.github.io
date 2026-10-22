"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import StageDevice from "./StageDevice";
import AppleCarouselController from "@/components/ui/AppleCarouselController";
import Button from "@/components/ui/Button";
import { APP_STUDIES } from "./appStudies";
import { cn } from "@/lib/cn";
import { STAGE_DESIGNS as DESIGNS } from "./designStage";

export default function DesignHeroStage() {
  const [activeIndex, setActiveIndex] = useState(2); // Starts with Sage or center item
  const activeDesign = DESIGNS[activeIndex];
  const touchStartX = useRef<number | null>(null);
  // Track which cards have finished entrance so animation doesn't override carousel transitions
  const animatedCards = useRef<Set<string>>(new Set());

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // Swiped left -> next slide
        setActiveIndex((prev) => (prev + 1) % DESIGNS.length);
      } else {
        // Swiped right -> previous slide
        setActiveIndex((prev) => (prev - 1 + DESIGNS.length) % DESIGNS.length);
      }
    }
    touchStartX.current = null;
  };

  const getSlot = (index: number) => {
    const total = DESIGNS.length;
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff; // -2, -1, 0, 1, 2
  };

  const getSlotStyle = (diff: number) => {
    switch (diff) {
      case 0:
        return {
          xPercent: 0,
          scale: 1.04,
          rotate: 0,
          zIndex: 30,
          opacityClass: "opacity-100",
          brightness: 1,
          isCenter: true,
        };
      case -1:
        return {
          xPercent: -68,
          scale: 0.9,
          rotate: -5,
          zIndex: 20,
          opacityClass: "opacity-100",
          brightness: 0.92,
          isCenter: false,
        };
      case 1:
        return {
          xPercent: 68,
          scale: 0.9,
          rotate: 5,
          zIndex: 20,
          opacityClass: "opacity-100",
          brightness: 0.92,
          isCenter: false,
        };
      case -2:
        return {
          xPercent: -130,
          scale: 0.8,
          rotate: -10,
          zIndex: 10,
          opacityClass: "opacity-0 sm:opacity-100",
          brightness: 0.84,
          isCenter: false,
        };
      case 2:
        return {
          xPercent: 130,
          scale: 0.8,
          rotate: 10,
          zIndex: 10,
          opacityClass: "opacity-0 sm:opacity-100",
          brightness: 0.84,
          isCenter: false,
        };
      default:
        return {
          xPercent: 0,
          scale: 0.75,
          rotate: 0,
          zIndex: 0,
          opacityClass: "opacity-0",
          brightness: 0.5,
          isCenter: false,
        };
    }
  };

  return (
    <section data-section="overview" className="scroll-mt-20 relative pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] sm:w-[920px] h-[480px] rounded-full bg-gradient-to-b from-[#0071E3]/12 via-[#2997FF]/6 to-transparent blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
        {/* Back Link Breadcrumb matching Photography layout */}
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
              <ChevronRight className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93] shrink-0" />
            </li>
            <li>
              <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold" aria-current="page">
                Designs
              </span>
            </li>
          </ol>
        </nav>

        {/* Page Header matching Photography layout */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Design
            <span className="mt-3 block text-[0.36em] font-medium leading-[1.15] tracking-apple-tight text-[#6E6E73] dark:text-[#8E8E93] text-balance">Crafted for humans</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
            Five products across health, retail, education and sustainability. Each starts with a problem worth solving.
          </p>
        </div>

        {/* Phone Fan Staging Viewport */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="mt-6 sm:mt-12 relative w-full max-w-5xl mx-auto h-[460px] sm:h-[540px] md:h-[600px] lg:h-[650px] flex items-center justify-center overflow-x-clip overflow-y-visible touch-pan-y"
        >
          {DESIGNS.map((item, idx) => {
            const diff = getSlot(idx);
            const slot = getSlotStyle(diff);
            // Stagger: center 0ms, ±1 = 40ms, ±2 = 80ms — tight enough to reduce center overlap
            const staggerMs = Math.abs(diff) * 40;
            // --pan-offset: negate the slot's X so the phone starts at visual center
            const panOffset = `${-slot.xPercent}%`;
            const hasAnimated = animatedCards.current.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                role={slot.isCenter ? undefined : "button"}
                tabIndex={Math.abs(diff) === 1 ? 0 : -1}
                aria-label={slot.isCenter ? undefined : `Show ${item.name}`}
                aria-hidden={Math.abs(diff) > 1 ? true : undefined}
                onKeyDown={(e) => {
                  if (!slot.isCenter && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 w-[190px] sm:w-[245px] md:w-[275px] lg:w-[295px] origin-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                  slot.opacityClass,
                  !slot.isCenter ? "cursor-pointer" : "cursor-default",
                  !slot.isCenter && "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071E3] rounded-[2.5rem]",
                )}
                style={{
                  transform: `translate(calc(-50% + ${slot.xPercent}%), -50%) scale(${slot.scale})`,
                  zIndex: slot.zIndex,
                  filter: `brightness(${slot.brightness})`,
                  isolation: "isolate",
                }}
              >
                {/* Inner wrapper: pans from visual center outward — cleared after first play so carousel transitions own it */}
                <div
                  className="phone-reveal-anim"
                  style={
                    hasAnimated
                      ? {
                          willChange: "auto",
                        }
                      : {
                          ["--pan-offset" as string]: panOffset,
                          animation: `phonePanFromCenter 0.65s cubic-bezier(0.16,1,0.3,1) ${staggerMs}ms both`,
                          willChange: "transform, opacity",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }
                  }
                  onAnimationEnd={() => {
                    animatedCards.current.add(item.id);
                  }}
                >
                  <StageDevice device={item.device} src={item.imageSrc} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Side-by-Side Control Bar: Title, Dot Play Scrubber, Learn More Button */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4">
          {/* Reduced Title Content */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              {activeDesign.name}
            </span>
            <span className="text-[#8E8E93] text-xs">·</span>
            <span className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] font-normal">
              {activeDesign.shortSubtitle}
            </span>
          </div>

          {/* Dot Play Option (Apple Carousel Scrubber) */}
          <div className="shrink-0">
            <AppleCarouselController
              itemCount={DESIGNS.length}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              slideDuration={4500}
              ariaLabel="Featured designs carousel scrub controller"
            />
          </div>

          {/* Learn More Button Matching App Brand Color */}
          <Button
            href={activeDesign.caseStudyUrl}
            accent={APP_STUDIES[activeDesign.id]?.accent}
            icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            className="shrink-0 whitespace-nowrap"
          >
            {activeDesign.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
