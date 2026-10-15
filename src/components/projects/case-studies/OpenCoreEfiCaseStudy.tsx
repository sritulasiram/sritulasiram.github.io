"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Workflow,
} from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import ProjectScreenWalkthrough from "@/components/ProjectScreenWalkthrough";
import CaseStudyBreadcrumb from "@/components/CaseStudyBreadcrumb";
import type { CaseStudy } from "@/types";

interface Props {
  project: CaseStudy;
}

export default function OpenCoreEfiCaseStudy({ project }: Props) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Firmware Engineering Hero Section */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Semantic Accessible Breadcrumb */}
        <CaseStudyBreadcrumb title="OpenCore EFI Hackintosh" />

        {/* Headline & Description */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#5E5CE6]/10 dark:bg-[#5E5CE6]/20 text-[#5E5CE6] dark:text-[#7D7AFF] border border-[#5E5CE6]/20 dark:border-[#5E5CE6]/40">
            <Terminal className="w-3 h-3" />
            <span>Firmware &amp; ACPI Systems</span>
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
                <span>View the repo on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white/80 dark:text-[#1D1D1F]/80" />
              </a>
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> Bootloader
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">OpenCore 1.0.7 (UEFI 2.7+)</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Target Silicon
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">i7-8750H (6C/12T)</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> SMBIOS Identity
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">MacBookPro16,4</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#5E5CE6] dark:text-[#7D7AFF] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> macOS Support
            </p>
            <p className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Sonoma · Sequoia · Tahoe</p>
          </div>
        </div>

        {/* Hero Visual Viewport */}
        <div className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-md bg-[#0F0F12]">
          <ProjectImage
            src={project.imageSrc}
            alt={project.title}
            placeholderLabel={project.placeholderLabel}
            ratioText={project.placeholderRatio}
            type="screenshot"
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </section>

      {/* 2. Walkthrough Screen Deck */}
      {project.screens && project.screens.length > 0 && (
        <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
          <ProjectScreenWalkthrough
            screens={project.screens}
            eyebrow="Firmware &amp; Diagnostics"
            title="Explore the environment."
            subtitle="Deep dive into the OpenCore UEFI boot stages and dynamic ACPI overrides."
          />
        </section>
      )}

      {/* 3. Problem Statement & The Ecosystem Fragmentation */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-[#E5E5EA]/80 dark:border-white/[0.08] space-y-8 transition-colors">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5E5CE6] dark:text-[#7D7AFF]">
              Problem Statement &amp; Context
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-headline">
              Taming Community Fragmentation &amp; Low-Level Hardware Quirks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#515154] dark:text-[#A1A1A6] leading-relaxed text-sm sm:text-base">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">Ecosystem Fragmentation</h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                    {project.background.problemStatement}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Workflow className="w-5 h-5 text-[#5E5CE6] dark:text-[#7D7AFF] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">The Engineering Objective</h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                    {project.background.context}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Challenges Grid */}
          <div className="pt-4 border-t border-[#E5E5EA] dark:border-[#2C2C2E]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] mb-4">
              Core Technical Challenges
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.background.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#1C1C1E] p-4 rounded-xl border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-2xs flex items-start gap-2.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5E5CE6] dark:text-[#7D7AFF] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug">
                    {challenge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACPI Bytecode & Architecture */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
            System Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-headline">
            Deterministic UEFI &amp; ACPI Bytecode Engineering
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            {project.architecture.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.architecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-2xs hover:shadow-sm transition-all space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#5E5CE6]/10 dark:bg-[#5E5CE6]/20 text-[#5E5CE6] dark:text-[#7D7AFF] text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{comp.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pl-8">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Key Highlights */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
            Firmware Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-headline">
            Key Features &amp; Kernel Stabilization
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {project.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 hover:border-[#D1D1D6] dark:hover:border-[#3A3A3C] transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{feat.title}</h3>
                {feat.badge && (
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white dark:bg-[#2C2C2E] text-[#5E5CE6] dark:text-[#7D7AFF] border border-[#5E5CE6]/20 dark:border-[#5E5CE6]/40">
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

      {/* 6. Hardware Status & Verified Coverage (Dark Accent Feature Block) */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="bg-[#1D1D1F] dark:bg-[#121214] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl border border-black/[0.08] dark:border-white/[0.12] transition-colors">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5E5CE6] dark:text-[#7D7AFF]">
              Hardware Status &amp; Coverage
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-apple-headline text-white">
              Verified System Scope &amp; Support
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {project.results.map((res, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {res.metric}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#86868B]">
                  {res.label}
                </div>
                <p className="text-xs text-white/70 leading-relaxed pt-1">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Complete Tech Stack Matrix */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
            Firmware &amp; Toolchain
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-headline">
            Technical Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {project.techStack.map((stack, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#121214] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-2xs space-y-3 transition-colors"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E5CE6] dark:text-[#7D7AFF]">
                {stack.category}
              </h3>
              <ul className="space-y-1.5">
                {stack.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-xs text-[#515154] dark:text-[#A1A1A6] font-medium flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5E5CE6]/60 dark:bg-[#7D7AFF]/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Next Project Navigation Banner */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pb-16">
        <Link
          href="/projects/rog-gaming-center"
          className="group block p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA]/70 dark:hover:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#2C2C2E] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                Companion Software Case Study
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#5E5CE6] dark:group-hover:text-[#7D7AFF] transition-colors flex items-center gap-2">
                <span>ROG Gaming Center macOS App</span>
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl">
                Explore the native Swift &amp; SwiftUI desktop application that interfaces directly with IOKit USB HID microcontrollers and reads AppleSMC kernel telemetry.
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
