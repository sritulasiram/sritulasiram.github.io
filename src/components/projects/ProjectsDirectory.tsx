"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import { cn } from "@/lib/cn";
import HrAssistiveMacbook from "./visuals/HrAssistiveMacbook";
import { STAGE_PROJECTS } from "./ProjectsHeroStage";

type ProjectStatus = "production" | "pilot" | "peer-reviewed" | "prototype" | "personal";

const STATUS_META: Record<ProjectStatus, { label: string; dot: string }> = {
  production: { label: "In production", dot: "#30D158" },
  pilot: { label: "Pilot", dot: "#FF9F0A" },
  "peer-reviewed": { label: "Peer-reviewed", dot: "#0A84FF" },
  prototype: { label: "Prototype", dot: "#AEAEB2" },
  personal: { label: "Personal build", dot: "#AEAEB2" },
};

const PROJECT_STATUS: Record<string, ProjectStatus> = {
  "warranty-rma": "production",
  "raspberry-pi-diagnostics": "production",
  "cytron-hr-assistive-intelligence": "pilot",
  "iot-fertiliser-mixing": "peer-reviewed",
  "esp32-heart-saver": "prototype",
  "rog-gaming-center": "personal",
  "opencore-efi-hackintosh": "personal",
};

// Projects already showcased in the hero carousel are hidden from the grid on "All"
const FEATURED_IDS = new Set(STAGE_PROJECTS.map((p) => p.id));

const Esp32TrackerBentoGrid = dynamic(() => import("./visuals/Esp32TrackerBentoGrid"), {
  loading: () => (
    <div className="w-full h-full bg-[#0E0E11] rounded-xl flex items-center justify-center p-4">
      <div className="text-center space-y-1">
        <div className="text-xs font-semibold text-[#FF453A]">ESP32 Biometrics</div>
        <div className="text-[10px] text-neutral-500 font-mono">Telemetry active</div>
      </div>
    </div>
  ),
});

const TelemetryBentoGrid = dynamic(() => import("./visuals/TelemetryBentoGrid"), {
  loading: () => (
    <div className="w-full h-full bg-[#0E0E11] rounded-xl flex items-center justify-center p-4">
      <div className="text-center space-y-1">
        <div className="text-xs font-semibold text-[#00D084]">IoT Mixing Telemetry</div>
        <div className="text-[10px] text-neutral-500 font-mono">Sensors active</div>
      </div>
    </div>
  ),
});

type ProjectCategory = "all" | "developed-systems" | "embedded-systems" | "case-studies";

interface ProjectCardData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryId: ProjectCategory;
  description: string;
  imageSrc: string;
  caseStudyUrl: string;
  badgeColor: string;
  stats?: string[];
}

const LINEUP_PROJECTS: ProjectCardData[] = [
  {
    id: "raspberry-pi-diagnostics",
    name: "Raspberry Pi Diagnostics",
    tagline: "",
    category: "Developed Systems",
    categoryId: "developed-systems",
    description:
      "Runs 19 diagnostic checks on compute, power, storage and GPIO in under 60 seconds, then issues a formal RMA inspection report.",
    imageSrc: "/images/projects/raspberry-pi-diagnostics/cover.webp",
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    badgeColor: "#C51A4A",
    stats: ["95% faster triage", "19 diagnostic checks", "Under 60 seconds"],
  },
  {
    id: "warranty-rma",
    name: "Warranty & RMA",
    tagline: "",
    category: "Developed Systems",
    categoryId: "developed-systems",
    description:
      "Repair intake, thermal barcode labels and supplier claim manifests in one internal system, with secure remote access through Cloudflare Zero Trust.",
    imageSrc: "/images/projects/warranty-rma/system-intake.png",
    caseStudyUrl: "/projects/warranty-rma",
    badgeColor: "#0071E3",
  },
  {
    id: "cytron-hr-assistive-intelligence",
    name: "Cytron HR Assistive Intelligence",
    tagline: "",
    category: "Developed Systems",
    categoryId: "developed-systems",
    description:
      "Pilot chat assistant that answers employee HR questions only from official documents. Every statement carries a numbered citation, and questions the documents don't cover are declined with a pointer to HR instead of a guess.",
    imageSrc: "",
    caseStudyUrl: "/projects/cytron-hr-assistive-intelligence",
    badgeColor: "#0F8B8D",
    stats: ["Cited answers", "Refuses to guess", "Pilot at Cytron"],
  },
  {
    id: "iot-fertiliser-mixing",
    name: "IoT Fertiliser Mixing",
    tagline: "",
    category: "Embedded Systems",
    categoryId: "embedded-systems",
    description:
      "Closed-loop hydroponic dosing, published in IJIE (UTHM). 99.6% TDS accuracy, over 94% dosing precision from 250 to 1,000 ml, and live Blynk cloud monitoring.",
    imageSrc: "/images/projects/iot-fertiliser-mixing/fig-1-system-overview.png",
    caseStudyUrl: "/projects/iot-fertiliser-mixing",
    badgeColor: "#1E7E34",
    stats: ["99.6% TDS accuracy", ">94% dosing precision", "Peer-reviewed"],
  },
  {
    id: "esp32-heart-saver",
    name: "ESP32 Heart Saver",
    tagline: "",
    category: "Embedded Systems",
    categoryId: "embedded-systems",
    description:
      "Prototype wearable that reads heart rate, then sends your GPS location by SMS when it spikes above 90 BPM. A manual SOS button overrides the sensor.",
    imageSrc: "",
    caseStudyUrl: "/projects/esp32-heart-saver",
    badgeColor: "#FF453A",
    stats: ["Auto-alert above 90 BPM", "GPS + GSM dispatch", "Manual SOS override"],
  },
  {
    id: "rog-gaming-center",
    name: "ROG Gaming Center",
    tagline: "",
    category: "Case Studies",
    categoryId: "case-studies",
    description:
      "Native Swift utility for ASUS ROG and TUF laptops on macOS. Interfaces directly with USB HID microcontrollers for Aura RGB lighting, reads AppleSMC thermals, and applies display calibration without root daemons.",
    imageSrc: "/images/projects/rog-gaming-center/app.png",
    caseStudyUrl: "/projects/rog-gaming-center",
    badgeColor: "#FF453A",
    stats: ["Pure Swift & SwiftUI", "No root daemons", "USB HID + AppleSMC"],
  },
  {
    id: "opencore-efi-hackintosh",
    name: "OpenCore EFI Hackintosh",
    tagline: "",
    category: "Case Studies",
    categoryId: "case-studies",
    description:
      "A working macOS setup for the ASUS GL503GE: 12 custom ACPI hotpatches, integrated-graphics routing, NVIDIA GPU power-gating, and stable sleep on Sonoma, Sequoia and Tahoe.",
    imageSrc: "/images/projects/opencore-efi-hackintosh/configurator-app.png",
    caseStudyUrl: "/projects/opencore-efi-hackintosh",
    badgeColor: "#5856D6",
    stats: ["12 ACPI hotpatches", "17 components working", "macOS Sonoma to Tahoe"],
  },
];

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "developed-systems", label: "Developed Systems" },
  { id: "embedded-systems", label: "Embedded Systems" },
  { id: "case-studies", label: "Case Studies" },
];

export default function ProjectsDirectory() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    selectedFilter === "all"
      ? LINEUP_PROJECTS.filter((p) => !FEATURED_IDS.has(p.id))
      : LINEUP_PROJECTS.filter((p) => p.categoryId === selectedFilter);

  const heading =
    selectedFilter === "all"
      ? "More projects."
      : `${CATEGORIES.find((c) => c.id === selectedFilter)?.label}.`;

  const handleFilterKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedFilter(CATEGORIES[nextIndex].id);
    const nextBtn = document.getElementById(`filter-tab-${CATEGORIES[nextIndex].id}`);
    nextBtn?.focus();
  };

  return (
    <section
      id="lineup"
      aria-label="More projects"
      className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        {/* Section Header & Liquid Glass Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08]">
              {heading}
            </h2>
            <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Embedded telemetry, AI assistants, and native-app case studies beyond the featured work above.
            </p>
          </div>

          {/* Apple Category Filter Pills with Smooth Horizontal Scroll & 44pt Touch Hit Areas */}
          <div
            role="tablist"
            aria-label="Filter engineering lineup by category"
            className="inline-flex p-1 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.08] shrink-0 self-start md:self-auto max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat, idx) => {
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-tab-${cat.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="lineup-grid"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedFilter(cat.id)}
                  onKeyDown={(e) => handleFilterKeyDown(e, idx)}
                  className={cn(
                    "min-h-[38px] sm:min-h-[32px] px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0071E3] whitespace-nowrap inline-flex items-center justify-center",
                    isSelected
                      ? "bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs"
                      : "text-[#6E6E73] dark:text-[#8E8E93] hover:text-[#1D1D1F] dark:hover:text-white",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Apple Lineup Grid */}
        <div id="lineup-grid" role="region" aria-label="Projects lineup" className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-start">
          {filteredProjects.map((project) => (
            <div key={project.id} className="min-w-0 w-full space-y-4 group">
                {/* Card Visual Stage: Direct hardware mockup or embedded bento telemetry */}
                <Link
                  href={project.caseStudyUrl}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block w-full cursor-pointer select-none transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.01]"
                >
                  {project.id === "cytron-hr-assistive-intelligence" ? (
                    <HrAssistiveMacbook className="w-full h-auto drop-shadow-xl" />
                  ) : project.id === "esp32-heart-saver" ? (
                    <div className="w-full aspect-[650/400] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#0E0E11] shadow-xl p-2.5 sm:p-3">
                      <Esp32TrackerBentoGrid />
                    </div>
                  ) : project.id === "iot-fertiliser-mixing" ? (
                    <div className="w-full aspect-[650/400] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] bg-[#0E0E11] shadow-xl p-2.5 sm:p-3">
                      <TelemetryBentoGrid />
                    </div>
                  ) : project.id === "rog-gaming-center" || project.id === "opencore-efi-hackintosh" ? (
                    <div className="w-full aspect-[650/400] flex items-center justify-center">
                      <Image
                        src={project.imageSrc}
                        alt={project.name}
                        width={1024}
                        height={576}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                        className="w-full h-auto max-h-full object-contain select-none"
                      />
                    </div>
                  ) : (
                    <MacbookPro
                      src={project.imageSrc}
                      fit="fill"
                      showNotch={false}
                      className="w-full h-auto drop-shadow-xl"
                    />
                  )}
                </Link>

                {/* Dual-Sentence Apple Typography */}
                <div className="pt-1">
                  {PROJECT_STATUS[project.id] && (
                    <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: STATUS_META[PROJECT_STATUS[project.id]].dot }}
                      />
                      {STATUS_META[PROJECT_STATUS[project.id]].label}
                    </span>
                  )}
                  <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.42] text-[#6E6E73] dark:text-[#A1A1A6]">
                    <Link href={project.caseStudyUrl} className="hover:underline">
                      <strong className="font-semibold text-[#1D1D1F] dark:text-white tracking-tight hover:text-[#0071E3] transition-colors">
                        {project.name}.{project.tagline ? ` ${project.tagline}` : ""}{" "}
                      </strong>
                    </Link>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
