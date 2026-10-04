"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TelemetryBentoGrid from "./TelemetryBentoGrid";
import ProjectCtaIcon from "./ProjectCtaIcon";
import { MacbookPro } from "@/components/ui/macbook-pro";
import AppleCarouselController from "./AppleCarouselController";

interface SystemProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  placeholderLabel: string;
  placeholderRatio: string;
  caseStudyLink: string;
  buttonColor: string;
  ctaLabel: string;
  aspectRatio: string;
  maxLaptopWidth?: string;
}

const SYSTEM_PROJECTS: SystemProject[] = [
  {
    id: "warranty-rma",
    title: "Warranty & RMA",
    subtitle: "Cytron Support Operations & Database",
    description:
      "Full-stack Flask & SQLite repair operations platform integrating thermal barcode printing, multi-invoice supplier RMA manifests, and Cloudflare Zero Trust telemetry.",
    imageSrc: "/images/project-rma.webp",
    placeholderLabel: "Replace: project-rma.webp",
    placeholderRatio: "16:9 System Dashboard (1920×1080)",
    caseStudyLink: "/projects/warranty-rma",
    buttonColor: "#0071E3",
    ctaLabel: "View Operations Architecture",
    aspectRatio: "16/9",
    maxLaptopWidth: "max-w-[560px]",
  },
  {
    id: "raspberry-pi-diagnostics",
    title: "Raspberry Pi Diagnostics",
    subtitle: "Enterprise Hardware QA & Automated Triage",
    description:
      "Automated multi-vector diagnostic sweeps across compute, thermals, PMIC rails, storage, and I/O with SHA-256 tamper-evident test reports in under 60 seconds.",
    imageSrc: "/images/pi-diagnostic.webp",
    placeholderLabel: "pi-diagnostic.webp",
    placeholderRatio: "16:9 Diagnostic Dashboard (1920×1080)",
    caseStudyLink: "/projects/raspberry-pi-diagnostics",
    buttonColor: "#C51A4A",
    ctaLabel: "View Hardware Validation",
    aspectRatio: "16/9",
    maxLaptopWidth: "max-w-[560px]",
  },
  {
    id: "iot-fertiliser-mixing",
    title: "IoT Fertiliser Mixing",
    subtitle: "Precision Agriculture & Telemetry Research",
    description:
      "Automated closed-loop IoT nutrient mixing system engineered for precision hydroponic farms with ESP32 controllers, calibrated peristaltic dosing, and real-time Blynk cloud telemetry.",
    imageSrc: "/images/project-fertiliser-mixing.webp",
    placeholderLabel: "Replace: project-fertiliser-mixing.webp",
    placeholderRatio: "16:9 Hardware Telemetry Grid (1920×1080)",
    caseStudyLink: "/projects/iot-fertiliser-mixing",
    buttonColor: "#1E7E34",
    ctaLabel: "Read Published Research",
    aspectRatio: "16/9",
    maxLaptopWidth: "max-w-[560px]",
  },
];

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProject = SYSTEM_PROJECTS[activeIndex];

  const handleNextProject = () => {
    setActiveIndex((prev) => (prev + 1) % SYSTEM_PROJECTS.length);
  };

  const handlePrevProject = () => {
    setActiveIndex((prev) => (prev - 1 + SYSTEM_PROJECTS.length) % SYSTEM_PROJECTS.length);
  };

  return (
    <section id="projects" className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* 1. Section Header: Dual-Tone Typographic Precision */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.1] text-balance">
            Built for scale.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Engineered for quiet,{" "}
              <br className="hidden sm:inline" />
              mission-critical reliability
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1 text-balance">
            Scalable internal platforms, automated diagnostic pipelines, and embedded firmware designed to turn complex hardware challenges into seamless, dependable workflows.
          </p>
        </div>

        {/* 2. Split Showcase Stage: Dashboard on Left + Project Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Dynamic Laptop Mockup Preview (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
            <div
              className={`w-full transition-all duration-500 ease-out ${
                currentProject.maxLaptopWidth || "max-w-[560px]"
              }`}
            >
              <div className="relative w-full" style={{ aspectRatio: "650 / 400" }}>
                {SYSTEM_PROJECTS.map((project, idx) => (
                  <div
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeIndex === idx
                        ? "opacity-100 pointer-events-auto z-10"
                        : "opacity-0 pointer-events-none z-0"
                    }`}
                  >
                    <MacbookPro
                      src={project.id === "iot-fertiliser-mixing" ? undefined : project.imageSrc}
                      className="size-full drop-shadow-2xl"
                    >
                      {project.id === "iot-fertiliser-mixing" ? (
                        <div className="w-full h-full p-2 bg-[#0E0E11]">
                          <TelemetryBentoGrid />
                        </div>
                      ) : null}
                    </MacbookPro>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Story, Details & Conversion CTA (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7">
            <div
              key={currentProject.id}
              className="space-y-4 apple-slide-enter"
            >
              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-lg sm:text-xl font-medium text-[#6E6E73] dark:text-[#A1A1A6] tracking-tight">
                  {currentProject.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal pt-1">
                {currentProject.description}
              </p>
            </div>

            {/* Action Bar: Apple Carousel Controller (Left) & Case Study CTA (Right) */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              {/* Apple Signature Carousel Controller & Secondary Chevrons */}
              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto shrink-0">
                <AppleCarouselController
                  itemCount={SYSTEM_PROJECTS.length}
                  activeIndex={activeIndex}
                  onSelectIndex={setActiveIndex}
                  slideDuration={5500}
                  ariaLabel="System engineering projects autoplay slider"
                />

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevProject}
                    aria-label="Previous system project"
                    className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5E5EA]/85 dark:bg-[#323236]/85 hover:bg-[#DCDCE2] dark:hover:bg-[#3E3E42] backdrop-blur-xl border border-black/[0.04] dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-xs after:absolute after:-inset-1.5 after:content-['']"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextProject}
                    aria-label="Next system project"
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
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 shadow-xs cursor-pointer hover:brightness-110 active:scale-[0.98] shrink-0 whitespace-nowrap w-full sm:w-auto"
              >
                <span>{currentProject.ctaLabel}</span>
                <ProjectCtaIcon projectId={currentProject.id} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
