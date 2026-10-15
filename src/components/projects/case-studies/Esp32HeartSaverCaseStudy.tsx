"use client";

import Link from "next/link";
import {
  Activity,
  Building2,
  UserCheck,
  Cpu,
  Code2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import CaseStudyBreadcrumb from "@/components/CaseStudyBreadcrumb";
import Esp32TrackerBentoGrid from "@/components/projects/Esp32TrackerBentoGrid";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const NEXT_PROJECT_ACCENT: Record<string, { bg: string; hoverBg: string; textHover: string }> = {
  "warranty-rma": {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  },
  "cytron-rma": {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  },
  "raspberry-pi-diagnostics": {
    bg: "bg-[#C51A4A]",
    hoverBg: "hover:bg-[#B01440]",
    textHover: "group-hover:text-[#C51A4A] dark:group-hover:text-[#FF375F]",
  },
  "iot-fertiliser-mixing": {
    bg: "bg-[#28A745]",
    hoverBg: "hover:bg-[#218838]",
    textHover: "group-hover:text-[#28A745] dark:group-hover:text-[#30D158]",
  },
  "esp32-heart-saver": {
    bg: "bg-[#FF453A]",
    hoverBg: "hover:bg-[#E0382E]",
    textHover: "group-hover:text-[#FF453A] dark:group-hover:text-[#FF6961]",
  },
  "opencore-efi-hackintosh": {
    bg: "bg-[#5E5CE6]",
    hoverBg: "hover:bg-[#4F4CD7]",
    textHover: "group-hover:text-[#5E5CE6] dark:group-hover:text-[#7D7AFF]",
  },
  "opencore-efi-gl503ge": {
    bg: "bg-[#5E5CE6]",
    hoverBg: "hover:bg-[#4F4CD7]",
    textHover: "group-hover:text-[#5E5CE6] dark:group-hover:text-[#7D7AFF]",
  },
  "rog-gaming-center": {
    bg: "bg-[#FF453A]",
    hoverBg: "hover:bg-[#E0382E]",
    textHover: "group-hover:text-[#FF453A] dark:group-hover:text-[#FF6961]",
  },
};

export default function Esp32HeartSaverCaseStudy({ project, nextProject }: Props) {
  const nextAccent = NEXT_PROJECT_ACCENT[nextProject?.id] || {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hardware Workbench Hero Section */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Semantic Accessible Breadcrumb */}
        <CaseStudyBreadcrumb title={project.title} />

        {/* Headline & Description */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FF453A]/10 text-[#FF453A] dark:text-[#FF6961] border border-[#FF453A]/20">
            <Activity className="w-3 h-3" />
            <span>Embedded IoT · Autonomous Biometrics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>

          {/* GitHub Repository Button */}
          {project.githubUrl && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the repository on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-neutral-200 transition-all duration-200 group shadow-sm hover:shadow-md border border-transparent dark:border-white/20 min-h-[44px]"
              >
                <Code2 className="w-3.5 h-3.5 text-white/80 dark:text-[#1D1D1F]/80" />
                <span>{project.githubLabel || "View the repo on GitHub"}</span>
              </a>
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Organization
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.organization}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Role
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.role}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Microcontroller
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">ESP32 38-Pin FreeRTOS</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#FF453A] dark:text-[#FF6961] font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Auto Trigger
            </p>
            <p className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">&gt; 90 BPM Distress Level</p>
          </div>
        </div>

        {/* 2. Interactive Bento Telemetry Workbench */}
        <div className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-xl bg-[#0E0E11] p-3 sm:p-5 flex items-center justify-center transition-colors">
          <Esp32TrackerBentoGrid />
        </div>
      </section>

      {/* 3. Problem Statement & Engineering Context */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#FF453A] dark:text-[#FF6961]">
            01 · Problem Statement
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Bridging critical seconds between acute cardiac events and rescue dispatch.
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
            {project.background.problemStatement}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engineering Context Card */}
          <div className="p-7 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Embedded Systems Architecture
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
              {project.background.context}
            </p>
          </div>

          {/* Field & Hardware Challenges */}
          <div className="p-7 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Field &amp; Hardware Challenges
            </h3>
            <ul className="space-y-2.5">
              {project.background.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF453A] dark:bg-[#FF6961] mt-2 shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Hardware Pinout & Architecture Blueprint */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#FF453A] dark:text-[#FF6961]">
            02 · Hardware Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Subsystem Pinouts &amp; Transceivers
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            {project.architecture.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {project.architecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2.5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FF453A]/10 text-[#FF453A] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {comp.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pl-8">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Key Safety & Biometric Features */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#FF453A] dark:text-[#FF6961]">
            03 · Core Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Safety Automation &amp; Radio Pipelines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {project.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {feat.title}
                </h3>
                {feat.badge && (
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FF453A]/10 text-[#FF453A]">
                    {feat.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Results & Telemetry Benchmarks */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#FF453A] dark:text-[#FF6961]">
            04 · Performance Verification
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Field Benchmarks &amp; Electrical Stability
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.results.map((result, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-1.5 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white tabular-nums">
                {result.metric}
              </div>
              <p className="text-xs font-semibold text-[#FF453A] dark:text-[#FF6961]">
                {result.label}
              </p>
              <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-normal">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Comprehensive Tech Stack */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">
            05 · Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Microcontroller, Radios &amp; Peripherals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.techStack.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 transition-colors"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#242426] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#3A3A3C]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Circular Next Project Footer Card */}
      {nextProject && (
        <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pb-16">
          <Link
            href={`/projects/${nextProject.id}`}
            className="group block p-8 sm:p-10 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] hover:border-[#0071E3]/40 dark:hover:border-[#0071E3]/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                  Next Project
                </p>
                <h3 className={`text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] ${nextAccent.textHover} transition-colors`}>
                  {nextProject.title}
                </h3>
                <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-xl">
                  {nextProject.subtitle}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] ${nextAccent.textHover} shrink-0 pt-2 sm:pt-0`}>
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}

