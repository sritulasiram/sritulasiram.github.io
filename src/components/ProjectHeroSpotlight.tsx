"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, BookOpen } from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import TelemetryBentoGrid from "@/components/TelemetryBentoGrid";
import AppleCarouselController from "@/components/AppleCarouselController";

interface SpotlightProject {
  id: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  caseStudyUrl: string;
  ctaLabel: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  subtitleColor: string;
  githubUrl?: string;
  publicationUrl?: string;
}

const SPOTLIGHT_PROJECTS: SpotlightProject[] = [
  {
    id: "warranty-rma",
    title: "Warranty & RMA Platform",
    eyebrow: "Cytron Technologies · Support Operations",
    subtitle: "Full-Stack Repair Operations & Logistics Hub",
    description:
      "Enterprise internal repair and supplier RMA platform integrating two-card intake terminals, direct thermal barcode printer drivers, multi-invoice vendor RMA batch bundling, and Cloudflare Zero Trust telemetry.",
    imageSrc: "/images/project-rma.webp",
    caseStudyUrl: "/projects/warranty-rma",
    ctaLabel: "View Operations Architecture",
    accentColor: "#0071E3",
    cardBg:
      "bg-gradient-to-br from-[#E1EFFF] via-[#EAF3FF] to-[#D5E8FF] dark:from-[#091526] dark:via-[#0B1A30] dark:to-[#081220]",
    cardBorder: "border-[#A6CEFF] dark:border-[#1A3D6E]",
    subtitleColor: "text-[#005FC6] dark:text-[#2997FF]",
  },
  {
    id: "raspberry-pi-diagnostics",
    title: "Pi Diagnostic Suite",
    eyebrow: "Cytron Technologies · Embedded QA Workbench",
    subtitle: "Enterprise Hardware QA & Automated RMA Triage",
    description:
      "Industrial-grade hardware validation platform executing 19 automated diagnostic sweeps across compute, thermals, PMIC power rails, storage, and I/O transceivers in under 60 seconds with SHA-256 sealed reports.",
    imageSrc: "/images/pi-diagnostic.webp",
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    ctaLabel: "View Hardware Validation",
    accentColor: "#C51A4A",
    cardBg:
      "bg-gradient-to-br from-[#FFE4EC] via-[#FFEDF2] to-[#FFD6E2] dark:from-[#1F050F] dark:via-[#260714] dark:to-[#17040B]",
    cardBorder: "border-[#FFA8BF] dark:border-[#521327]",
    subtitleColor: "text-[#BA0F40] dark:text-[#FF375F]",
  },
  {
    id: "iot-fertiliser-mixing",
    title: "IoT Fertiliser Mixing",
    eyebrow: "Published Research · IJIE Journal (UTHM)",
    subtitle: "Precision Hydroponic Dosing & Cloud Telemetry",
    description:
      "Peer-reviewed research and production ESP32 firmware featuring a 30-point median-filtered TDS pipeline on ADC1, dual pump actuation with interrupt-driven flow feedback, and real-time Blynk cloud telemetry.",
    imageSrc: "",
    caseStudyUrl: "/projects/iot-fertiliser-mixing",
    ctaLabel: "Read Published Research",
    accentColor: "#28A745",
    cardBg:
      "bg-gradient-to-br from-[#E2F7E8] via-[#EDFAF1] to-[#D3F3DC] dark:from-[#05170D] dark:via-[#071C10] dark:to-[#04120A]",
    cardBorder: "border-[#A0E2B2] dark:border-[#124224]",
    subtitleColor: "text-[#187A38] dark:text-[#30D158]",
    publicationUrl: "https://penerbit.uthm.edu.my/ojs/index.php/ijie/article/view/24386",
  },
  {
    id: "rog-gaming-center",
    title: "ROG Gaming Center",
    eyebrow: "macOS Systems Architecture · Swift 5.9",
    subtitle: "Native Hardware Driver & Kernel Telemetry",
    description:
      "Pure Swift systems application built with SwiftUI, direct IOKit HID driver communication, AppleSMC silicon die thermal readouts, and CoreGraphics display transfer table gamma calibration.",
    imageSrc: "/images/rog-gaming-center-preview.png",
    caseStudyUrl: "/projects/rog-gaming-center",
    ctaLabel: "View Systems Architecture",
    accentColor: "#0071E3",
    cardBg:
      "bg-gradient-to-br from-[#FFEADC] via-[#FFF1E8] to-[#FFDEC8] dark:from-[#1F0C05] dark:via-[#261007] dark:to-[#180903]",
    cardBorder: "border-[#FFB994] dark:border-[#542410]",
    subtitleColor: "text-[#C83E00] dark:text-[#FF6B4E]",
    githubUrl: "https://github.com/sritulasiram/rog-gaming-center-hackintosh",
  },
  {
    id: "opencore-efi-hackintosh",
    title: "OpenCore EFI Bootloader",
    eyebrow: "macOS Firmware Engineering · Low-Level Systems",
    subtitle: "macOS Sonoma, Sequoia & Tahoe Deployment",
    description:
      "Deterministic UEFI bootloader configuration with modular ACPI AML bytecode power-gating NVIDIA discrete GPU, dynamic CPU power management, and reliable S3 sleep/wake across three macOS versions.",
    imageSrc: "/images/project-opencore-uefi.png",
    caseStudyUrl: "/projects/opencore-efi-hackintosh",
    ctaLabel: "View Firmware Engineering",
    accentColor: "#5E5CE6",
    cardBg:
      "bg-gradient-to-br from-[#EBE6FF] via-[#F2EEFF] to-[#DDD4FF] dark:from-[#0F0C24] dark:via-[#13102C] dark:to-[#0B091B]",
    cardBorder: "border-[#BCADFF] dark:border-[#2C2462]",
    subtitleColor: "text-[#4F46E5] dark:text-[#7D7AFF]",
    githubUrl: "https://github.com/sritulasiram/ASUS-ROG-Strix-GL503GE-Hackintosh",
  },
];

export default function ProjectHeroSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_PROJECTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_PROJECTS.length) % SPOTLIGHT_PROJECTS.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <section aria-label="Signature Engineering Highlights" className="w-full text-left">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 px-1 text-left">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
          Signature Systems
        </h2>

        <span className="text-xs font-medium text-[#6E6E73] dark:text-[#8E8E93]">
          5 Systems Deployed
        </span>
      </div>

      {/* 2. Spotlight Stage Container */}
      <div
        className="relative w-full select-none py-2 text-left"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full min-h-[540px] sm:min-h-[500px] md:min-h-[460px]">
          {SPOTLIGHT_PROJECTS.map((project, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={project.id}
                className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-left ${
                  isActive
                    ? "opacity-100 translate-x-0 relative z-10 pointer-events-auto"
                    : "opacity-0 absolute inset-0 pointer-events-none z-0 translate-x-6"
                }`}
              >
                {/* Rich Project-Tailored Color Card Surface */}
                <div
                  className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl ${project.cardBg} ${project.cardBorder} border shadow-xs transition-colors duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Context, Narrative, CTAs (Cols 1-5) */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
                      {/* Eyebrow Text */}
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF] block">
                        {project.eyebrow}
                      </span>

                      {/* Title & Subtitle */}
                      <div className="space-y-1.5">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] dark:text-[#F5F5F7] tracking-apple-tight leading-tight">
                          {project.title}
                        </h3>
                        <p className={`text-base sm:text-lg font-semibold ${project.subtitleColor}`}>
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-[#374151] dark:text-[#A1A1A6] leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={project.caseStudyUrl}
                          style={{ backgroundColor: project.accentColor }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all duration-200 shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group min-h-[44px]"
                        >
                          <span>{project.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>

                        {project.publicationUrl && (
                          <a
                            href={project.publicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-black/10 dark:border-white/10 transition-colors shadow-2xs min-h-[44px]"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#374151] dark:text-[#A1A1A6]" />
                            <span>Journal Paper</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#374151] dark:text-[#A1A1A6]" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-black/10 dark:border-white/10 transition-colors shadow-2xs min-h-[44px]"
                          >
                            <Code2 className="w-3.5 h-3.5 text-[#374151] dark:text-[#A1A1A6]" />
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#374151] dark:text-[#A1A1A6]" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Framed Media Viewport (Cols 6-12) */}
                    <div className="lg:col-span-7">
                      <Link
                        href={project.caseStudyUrl}
                        className="block w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-[#2C2C2E] shadow-md dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] bg-[#121214] relative group cursor-pointer"
                      >
                        {project.id === "iot-fertiliser-mixing" ? (
                          <TelemetryBentoGrid />
                        ) : (
                          <ProjectImage
                            src={project.imageSrc}
                            alt={project.title}
                            priority={idx === 0}
                            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Centered Apple Highlights Carousel Controller */}
      <div className="mt-8 sm:mt-10 flex items-center justify-center">
        <AppleCarouselController
          itemCount={SPOTLIGHT_PROJECTS.length}
          activeIndex={activeIndex}
          onSelectIndex={setActiveIndex}
          slideDuration={6000}
          ariaLabel="Project highlights scrub controller"
        />
      </div>
    </section>
  );
}
