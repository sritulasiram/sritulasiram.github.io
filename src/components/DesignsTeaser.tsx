"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import IphoneFrame from "./mockups/IphoneFrame";
import AppleCarouselController from "./AppleCarouselController";

interface MobileDesignProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  caseStudyLink: string;
  buttonColor: string;
  mockupType: "sage" | "recycle-ai" | "kopiesatu";
}

const MOBILE_PROJECTS: MobileDesignProject[] = [
  {
    id: "sage",
    title: "Sage",
    subtitle: "Psychiatric Care & Mental Wellness",
    description: "Trauma-informed digital health platform with a calming botanical companion and immediate crisis routing.",
    caseStudyLink: "/designs/sage",
    buttonColor: "#2D6A4F",
    mockupType: "sage",
  },
  {
    id: "recycle-ai",
    title: "Recycle AI",
    subtitle: "Smart Waste Classification",
    description: "Circular commerce and material recovery platform with categorized recycling streams and marketplace discovery.",
    caseStudyLink: "/designs/recycle-ai",
    buttonColor: "#5B7B3A",
    mockupType: "recycle-ai",
  },
  {
    id: "kopiesatu",
    title: "KopieSatu",
    subtitle: "Coffee Ordering & Loyalty",
    description: "Quick-service mobile commerce with localized category rails, dual-column product cards, and unified checkout.",
    caseStudyLink: "/designs/kopiesatu",
    buttonColor: "#7C4424",
    mockupType: "kopiesatu",
  },
];

export default function DesignsTeaser() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const currentProject = MOBILE_PROJECTS[activeProjectIndex];

  const handleNextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % MOBILE_PROJECTS.length);
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + MOBILE_PROJECTS.length) % MOBILE_PROJECTS.length);
  };


  return (
    <section id="designs" className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* 1. Section Header: Dual-Tone Typographic Precision */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
            Design
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.1] text-balance">
            Interfaces with intent.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Intuitive by nature,{" "}
              <br className="hidden sm:inline" />
              crafted for clarity and balance.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1 text-balance">
            Digital experiences shaped by deliberate hierarchy, refined typography, and fluid micro-interactions that make complex technology feel second nature.
          </p>
        </div>

        {/* 2. Split Showcase Stage: Aligned Dual-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Project Story & Conversion CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 order-2 lg:order-1">
            <div key={currentProject.id} className="space-y-3 sm:space-y-3.5 apple-slide-enter">
              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-base sm:text-lg font-medium text-[#6E6E73] dark:text-[#A1A1A6] tracking-tight">
                  {currentProject.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
                {currentProject.description}
              </p>
            </div>

            {/* Action Bar: Apple Carousel Controller (Left) & Case Study CTA (Right) */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              {/* Apple Signature Carousel Controller & Secondary Chevrons */}
              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto shrink-0">
                <AppleCarouselController
                  itemCount={MOBILE_PROJECTS.length}
                  activeIndex={activeProjectIndex}
                  onSelectIndex={setActiveProjectIndex}
                  slideDuration={5500}
                  ariaLabel="Mobile designs autoplay slider"
                />

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    aria-label="Previous mobile design"
                    className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5E5EA]/85 dark:bg-[#323236]/85 hover:bg-[#DCDCE2] dark:hover:bg-[#3E3E42] backdrop-blur-xl border border-black/[0.04] dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-xs after:absolute after:-inset-1.5 after:content-['']"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextProject}
                    aria-label="Next mobile design"
                    className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5E5EA]/85 dark:bg-[#323236]/85 hover:bg-[#DCDCE2] dark:hover:bg-[#3E3E42] backdrop-blur-xl border border-black/[0.04] dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-xs after:absolute after:-inset-1.5 after:content-['']"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Link
                key={currentProject.id}
                href={currentProject.caseStudyLink}
                prefetch={false}
                style={{ backgroundColor: currentProject.buttonColor }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 shadow-xs cursor-pointer hover:brightness-110 active:scale-[0.98] shrink-0 whitespace-nowrap w-full sm:w-auto"
              >
                <span>Explore Design Study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>


          {/* Right Column: Centered Pixel-Perfect SVG iPhone Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[275px] flex justify-center">
              <IphoneFrame
                screens={MOBILE_PROJECTS.map((proj, idx) => ({
                  id: proj.id,
                  src:
                    proj.mockupType === "sage"
                      ? "/images/sage-screen-preview.webp"
                      : proj.mockupType === "recycle-ai"
                      ? "/images/recycle-ai-screen-preview.webp"
                      : "/images/kopiesatu-screen-preview.webp",
                  active: activeProjectIndex === idx,
                }))}
                theme="light"
                hideStatusBar={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
