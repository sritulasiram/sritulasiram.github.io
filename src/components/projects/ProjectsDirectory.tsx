"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import { cn } from "@/lib/cn";
import HrAssistiveMacbook from "./visuals/HrAssistiveMacbook";

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
  "rog-gaming-center": "personal",
  "opencore-efi-hackintosh": "personal",
};


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
  /** Short, scannable list shown under the description. Full lists live on the case study. */
  tech: string[];
}

const LINEUP_PROJECTS: ProjectCardData[] = [
  {
    id: "raspberry-pi-diagnostics",
    name: "Raspberry Pi Diagnostics",
    tagline: "",
    category: "Developed Systems",
    categoryId: "developed-systems",
    description:
      "Runs 19 diagnostic checks on compute, power, storage and GPIO from one Run All button, then issues a formal RMA inspection report.",
    imageSrc: "/images/projects/raspberry-pi-diagnostics/cover.webp",
    tech: ["Python", "Flask", "SQLite", "Raspberry Pi OS"],
    caseStudyUrl: "/projects/raspberry-pi-diagnostics",
    badgeColor: "#C51A4A",
    stats: ["19 diagnostic checks", "4 run phases", "Signed RMA report"],
  },
  {
    id: "warranty-rma",
    name: "Warranty & RMA",
    tagline: "",
    category: "Developed Systems",
    categoryId: "developed-systems",
    description:
      "Repair intake, thermal barcode labels and supplier claim manifests in one internal system, with secure remote access through Cloudflare Zero Trust.",
    imageSrc: "/images/projects/warranty-rma/screen-intake-laptop.jpg",
    tech: ["Flask", "SQLite", "Cloudflare Tunnel", "Thermal printing"],
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
    tech: ["Python", "FastAPI", "ChromaDB", "React"],
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
    tech: ["ESP32", "Arduino C++", "Blynk"],
    caseStudyUrl: "/projects/iot-fertiliser-mixing",
    badgeColor: "#1E7E34",
    stats: ["99.6% TDS accuracy", ">94% dosing precision", "Peer-reviewed"],
  },
  {
    id: "rog-gaming-center",
    name: "ROG Gaming Center",
    tagline: "",
    category: "Case Studies",
    categoryId: "case-studies",
    description:
      "Native Swift app for ASUS ROG laptops on macOS. Drives the Aura keyboard lighting directly over USB HID, shows real system readings, and applies display profiles, with nothing running as root.",
    imageSrc: "/images/projects/rog-gaming-center/app.png",
    tech: ["Swift", "SwiftUI", "IOKit", "USB HID"],
    caseStudyUrl: "/projects/rog-gaming-center",
    badgeColor: "#FF453A",
    stats: ["Version 2.0", "Pure Swift & SwiftUI", "No root"],
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
    tech: ["OpenCore", "ACPI", "UEFI"],
    caseStudyUrl: "/projects/opencore-efi-hackintosh",
    badgeColor: "#5856D6",
    stats: ["12 ACPI hotpatches", "17 components working", "macOS Sonoma to Tahoe"],
  },
];

/** Already shown large in the hero lineup above, so they go last here to avoid a repeat. */
const HERO_IDS = new Set(["cytron-hr-assistive-intelligence", "raspberry-pi-diagnostics", "warranty-rma"]);
const ORDERED_PROJECTS = [
  ...LINEUP_PROJECTS.filter((p) => !HERO_IDS.has(p.id)),
  ...LINEUP_PROJECTS.filter((p) => HERO_IDS.has(p.id)),
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
      ? ORDERED_PROJECTS
      : ORDERED_PROJECTS.filter((p) => p.categoryId === selectedFilter);

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
      id="all-projects"
      aria-label="All projects"
      className="relative z-10 scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        {/* Heading and category filter chips */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-apple-headline leading-[1.08] text-[#1D1D1F] dark:text-[#F5F5F7]">
            Every project.
            <span className="block text-[#6E6E73] dark:text-[#8E8E93]">Browse by system and build.</span>
          </h2>

          <div role="tablist" aria-label="Filter engineering lineup by category" className="mt-8 flex flex-wrap justify-center gap-2">
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
                    "px-4 min-h-[44px] rounded-full text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1D1F] dark:focus-visible:outline-[#F5F5F7]",
                    isSelected
                      ? "bg-[#1D1D1F] text-white dark:bg-[#F5F5F7] dark:text-[#1D1D1F]"
                      : "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] dark:bg-[#1C1C1E] dark:text-[#F5F5F7] dark:hover:bg-[#2C2C2E]",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mt-4 text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-xl mx-auto text-balance min-h-10">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            {selectedFilter === "all" ? "" : ` in ${CATEGORIES.find((c) => c.id === selectedFilter)?.label}`}
            . Production systems, embedded hardware, and native-app case studies.
          </p>
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
                  <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.42] text-[#6E6E73] dark:text-[#A1A1A6]">
                    <Link href={project.caseStudyUrl} className="hover:underline">
                      <strong className="font-semibold text-[#1D1D1F] dark:text-white tracking-tight hover:text-[#0071E3] transition-colors">
                        {project.name}.{project.tagline ? ` ${project.tagline}` : ""}{" "}
                      </strong>
                    </Link>
                    {project.description}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#6E6E73] dark:text-[#A1A1A6]">
                    <span>{project.tech.join(" · ")}</span>
                    {PROJECT_STATUS[project.id] && (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: STATUS_META[PROJECT_STATUS[project.id]].dot }}
                        />
                        {STATUS_META[PROJECT_STATUS[project.id]].label}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
