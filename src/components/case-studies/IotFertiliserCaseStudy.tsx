"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Building2,
  UserCheck,
  Code2,
  BookOpen,
  FileText,
  ExternalLink,
} from "lucide-react";
import ProjectCtaIcon from "@/components/ProjectCtaIcon";
import CaseStudyBreadcrumb from "@/components/CaseStudyBreadcrumb";
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
  "opencore-efi-gl503ge": {
    bg: "bg-[#5E5CE6]",
    hoverBg: "hover:bg-[#4F4CD7]",
    textHover: "group-hover:text-[#5E5CE6] dark:group-hover:text-[#7D7AFF]",
  },
};

export default function IotFertiliserCaseStudy({ project, nextProject }: Props) {
  const nextAccent = NEXT_PROJECT_ACCENT[nextProject.id] || {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & PROTOTYPE SHOWCASE                                      */}
      {/* ========================================================================= */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title="IoT Fertiliser Mixing" />

        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.publicationUrl && (
              <a
                href={project.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View official journal paper on IJIE UTHM (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border border-emerald-300/60 dark:border-emerald-800/60 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>View Official Journal Paper (IJIE · UTHM)</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-emerald-700 dark:text-emerald-400" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View firmware repository on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:outline-hidden"
              >
                <Code2 className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>View Firmware on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
              </a>
            )}
          </div>
        </div>

        {/* Project Meta Details (Clean Typography, No Divider Line) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Institution
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">UTHM (Malaysia)</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Authorship
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">First &amp; Lead Author</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Publication
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Vol. 18(1), 2026</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Indexing
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Scopus / MyCite</p>
          </div>
        </div>

        {/* Hero Image: Fig. 2(a) Prototype Layout */}
        <div className="mt-10 sm:mt-12 space-y-3">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image
              src="/images/projects/iot-fertiliser/fig-2a-prototype-layout.jpg"
              alt="Fig. 2(a) Prototype layout showing flow sensors, ESP32 expansion board, dual relay modules, and solenoid valves"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain p-3 sm:p-6"
            />
          </div>
          <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
            <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 2(a)</strong> · Physical prototype layout inside transparent acrylic enclosure.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AT-A-GLANCE TELEMETRY METRICS (APPLE TYPOGRAPHIC SPEC STYLE)           */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-2">
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">99.6%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">TDS Accuracy</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">100–1,000 ppm range</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">&gt; 94%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Flow Accuracy</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">250–1,000 ml range</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">22.2s</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Response Time</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Command to delivery</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">92.8%–98.8%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Target Achievement</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Closed-loop dosing</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SYSTEM OVERVIEW SECTION & FIG. 1 SYSTEM DIAGRAM                        */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            End-to-End Closed-Loop Mixing Architecture
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The automated system pairs an ESP32 microcontroller with analog TDS and dual-level water sensors, Hall-effect pulse flow meters, dual 12V peristaltic dosing pumps, and anti-backflow solenoid valves. Together with the Blynk IoT cloud platform, it provides closed-loop precision nutrient dosing and live telemetry for modern commercial hydroponics.
          </p>
        </div>

        {/* System Overview Diagram (Fig. 1) */}
        <div className="space-y-3">
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] flex justify-center items-center">
            <Image
              src="/images/projects/iot-fertiliser/fig-1-system-overview.png"
              alt="Fig. 1 Overall IoT-based fertiliser mixing system processes: Real-Time Monitoring, Fertiliser Mixing System, and User-End Experience"
              width={1408}
              height={779}
              className="w-full h-auto object-contain rounded-xl dark:brightness-[0.93] dark:contrast-[1.02]"
            />
          </div>
          <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
            <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 1</strong> · Three-stage system workflow: Real-Time Monitoring ➔ Fertiliser Mixing System ➔ User-End Experience.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HARDWARE ARCHITECTURE (FIG. 3 SCHEMATIC + CLEAN SPEC LIST)             */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Hardware Architecture &amp; Silicon Isolation
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            During prototyping, hardware validation revealed that analog sensors must reside exclusively on <strong>ADC1 (GPIO 32–39)</strong>. Because ADC2 shares silicon routing with the ESP32 Wi-Fi RF synthesizer, active Wi-Fi packet transmission corrupts ADC2 readings. Architecting TDS sampling strictly on GPIO 36 (VP pin) and reservoir water level monitoring on GPIO 34 and 35 guarantees 100% sensor accuracy during live cloud synchronization.
          </p>
        </div>

        {/* Circuit Design Diagram (Fig. 3) */}
        <div className="space-y-3">
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] flex justify-center items-center">
            <Image
              src="/images/projects/iot-fertiliser/fig-3-circuit-design.png"
              alt="Fig. 3 Circuit design diagram showing full ESP32 wiring schematic, relay modules, buck converter, and sensors"
              width={1211}
              height={730}
              className="w-full h-auto object-contain rounded-xl dark:brightness-[0.93] dark:contrast-[1.02]"
            />
          </div>
          <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
            <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 3</strong> · Complete circuit design with isolated 12V, 5V, and 3.3V power distribution rails.
          </p>
        </div>

        {/* Clean Apple Pin Allocations (Typographic Layout, No Table Gridlines) */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
            GPIO Pinout &amp; Electrical Architecture
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">TDS Sensor</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 36 · ADC1 (VP)</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                30-point running median filter for noise-free nutrient concentration ppm.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Dual Water Level Probes</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 34 &amp; 35 · ADC1</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Multi-threshold analog detection for dynamic reservoir safety monitoring.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Dual Flow Sensors</p>
              <p className="text-xs font-medium text-[#0071E3] dark:text-[#2997FF]">GPIO 18 &amp; 19 · Hardware ISR</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Microsecond interrupt accumulation tracking exact milliliters dispensed.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Peristaltic Dosing Pumps</p>
              <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">GPIO 16 &amp; 17 · 12V Relays</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Dual optoisolated relay drivers metering Concentrated Nutrients A &amp; B.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Anti-Backflow Solenoids</p>
              <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">GPIO 22 &amp; 23 · Directional</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Synchronized shutoff valves preventing reverse siphoning into reservoirs.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Blynk Virtual Telemetry</p>
              <p className="text-xs font-medium text-[#6E6E73] dark:text-[#86868B]">V1–V5 Virtual Stream</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Live volume target, dispensed ml, real-time ppm, and reservoir statuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FIRMWARE & CONTROL LOGIC (FIG. 4 FLOWCHART + CLEAN EDITORIAL FLOW)     */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Firmware Architecture &amp; Control Loop
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            To prevent ESP32 Watchdog Timer (WDT) lockups during prolonged dispensing cycles, the firmware avoids blocking delays in favor of an asynchronous state machine loop. This maintains an uninterrupted Blynk cloud heartbeat while continuously sampling sensor inputs.
          </p>
        </div>

        {/* Firmware Process Flowchart (Fig. 4) */}
        <div className="space-y-3">
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] flex justify-center items-center">
            <Image
              src="/images/projects/iot-fertiliser/fig-4-firmware-flowchart.png"
              alt="Fig. 4 Process flow of the prototype code implementation flowchart"
              width={1340}
              height={1001}
              className="w-full h-auto max-h-[560px] object-contain rounded-xl dark:brightness-[0.93] dark:contrast-[1.02]"
            />
          </div>
          <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
            <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 4</strong> · Asynchronous process flow: Initialization, telemetry loop, and interrupt cutoff.
          </p>
        </div>

        {/* Clean 3-Stage Narrative (No Boxed Cards, Pure Apple Hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">Phase 01</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Boot &amp; Handshake</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Connects to 2.4GHz Wi-Fi, authenticates the Blynk cloud token, initializes GPIO pin modes, and attaches hardware interrupt service routines for flow metering.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">Phase 02</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Asynchronous Telemetry</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Non-blocking event loop executes a 40ms circular buffer for analog TDS sampling and an 800ms timer pushing telemetry without blocking cloud communication.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">Phase 03</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Target Milliliter Cutoff</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Upon receiving target dosing volume from the mobile app, pumps and solenoids actuate in parallel. Atomic ISR pulse counts trigger independent shutoff once target volume is achieved.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXPERIMENTAL FINDINGS & VALIDATION DATA (NO SPREADSHEET LINES)         */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-20 sm:space-y-24">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Experimental Findings &amp; Validation Data
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Each subsystem underwent rigorous empirical testing to validate measurement accuracy, long-term calibration stability, volumetric metering precision, and real-time actuation responsiveness as published in the <em>International Journal of Integrated Engineering</em>.
          </p>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.1: TDS Sensor Accuracy (Fig. 5, Fig. 6)                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              TDS Sensor Accuracy across Concentrations
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Accuracy evaluation of the submersible analog TDS sensor against a calibrated laboratory TDS meter across four standard solution concentrations using a 30-point running median filter.
            </p>
          </div>

          {/* Visual Showcase: Fig. 5 (Setup) & Fig. 6 (Graph) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative w-full aspect-[16/10] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden">
                <Image
                  src="/images/projects/iot-fertiliser/fig-5-tds-test-setup.jpg"
                  alt="Fig. 5 Accuracy test setup of the TDS sensor using 4 solution concentrations"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain p-2"
                />
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 5</strong> · Four test concentration solutions (900, 666, 458, 235 ppm).
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative w-full aspect-[16/10] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/projects/iot-fertiliser/fig-6-tds-accuracy-chart.png"
                  alt="Fig. 6 Graph of TDS sensor accuracy comparing sensor readings with calibrated meter"
                  width={1463}
                  height={870}
                  className="w-full h-auto object-contain rounded-lg dark:brightness-[0.93] dark:contrast-[1.02]"
                />
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 6</strong> · TDS sensor vs. calibrated meter linear correlation.
              </p>
            </div>
          </div>

          {/* Clean Apple Benchmark Callout (No Bordered Spreadsheet Lines) */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.56%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">896 vs. 898 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Concentrated (900 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.90%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">666.7 vs. 666 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Diluted 1 (666 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.93%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">458.3 vs. 458 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Diluted 2 (458 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.01%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">232.7 vs. 235 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Diluted 3 (235 ppm)</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Mean accuracy of <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">99.60%</strong> across all concentrations. Complete trial-by-trial logs available in the published paper.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.2: Calibration Stability 7-Day Test (Fig. 7, Fig. 8)        */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              7-Day Calibration Stability
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Evaluates long-term sensor drift by sampling a sealed 258 ppm mineral standard at the same hour each day across seven consecutive days.
            </p>
          </div>

          {/* Visual Showcase: Fig. 7 (Setup) & Fig. 8 (Graph) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative w-full aspect-[16/10] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden">
                <Image
                  src="/images/projects/iot-fertiliser/fig-7-blynk-calibration-setup.jpg"
                  alt="Fig. 7 Setup for TDS calibration stability test with 258 ppm reference solution and Blynk IoT monitoring"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain p-2"
                />
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 7</strong> · 258 ppm reference standard test bench.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative w-full aspect-[16/10] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/projects/iot-fertiliser/fig-8-tds-stability-chart.png"
                  alt="Fig. 8 Graph of TDS sensor reading stability over a 7-day monitoring period"
                  width={1463}
                  height={660}
                  className="w-full h-auto object-contain rounded-lg dark:brightness-[0.93] dark:contrast-[1.02]"
                />
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 8</strong> · 7-day reading stability line graph.
              </p>
            </div>
          </div>

          {/* Clean Stability Metrics */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">256.4 ppm</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">7-Day Mean Reading</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Reference: 258.0 ppm</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">1.94%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Maximum Deviation</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Recorded on Day 2 (253 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">0.00% Drift</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Exact Match on Day 6</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Zero recalibration required</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Sensor readings remained consistently within ±2% of the factory calibration across seven days of continuous operation.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.3: Flow Sensor Precision (Fig. 9)                           */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Flow Sensor Volumetric Precision
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Volumetric accuracy evaluation of Flow Sensor #1 and #2 across four target dosing volumes (250, 500, 750, and 1,000 ml) using laboratory graduated cylinders.
            </p>
          </div>

          {/* Visual Showcase: Fig. 9 Flow Sensor Testbench */}
          <div className="space-y-2">
            <div className="relative w-full aspect-[16/9] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden">
              <Image
                src="/images/projects/iot-fertiliser/fig-9-flow-sensor-testbench.jpg"
                alt="Fig. 9 Test-bench configuration for flow rate evaluation of dual sensors"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain p-2"
              />
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 9</strong> · Dual flow sensor test-bench configuration.
            </p>
          </div>

          {/* Clean Dual Sensor Accuracy Callout */}
          <div className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">97.18%</p>
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Flow Sensor #1 Mean Precision</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  235.0 ml at 250 ml (94.00%) · 478.3 ml at 500 ml (95.66%) · 746.6 ml at 750 ml (99.54%) · 995.0 ml at 1,000 ml (99.50%).
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">97.90%</p>
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Flow Sensor #2 Mean Precision</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  236.7 ml at 250 ml (94.68%) · 501.7 ml at 500 ml (99.66%) · 756.7 ml at 750 ml (99.10%) · 1,018.3 ml at 1,000 ml (98.17%).
                </p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Both sensors surpass the &gt;94% precision threshold across all volumes, reaching &gt;99% precision on doses of 500 ml and greater.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.4: Fertiliser Concentration Adjustment (Fig. 10)            */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Fertiliser Concentration Adjustment
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Closed-loop dosing evaluation determining the volume of concentrated AB fertiliser needed to reach target ppm levels in the active hydroponic reservoir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2 md:col-span-1">
              <div className="relative w-full aspect-[3/4] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden">
                <Image
                  src="/images/projects/iot-fertiliser/fig-10-hydroponic-rig-dispensing.jpg"
                  alt="Fig. 10 Fertiliser dispensing process into the hydroponic water storage system"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-contain p-2"
                />
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 10</strong> · Hydroponic rig dispensing.
              </p>
            </div>

            {/* Dosing Target Progression (Clean Typographic Breakdown) */}
            <div className="space-y-5 md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">96.00%</p>
                  <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">103 ➔ 200 ppm Target</p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">200 ml added · 187 ppm sensor (192 ppm meter)</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">98.75%</p>
                  <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">192 ➔ 400 ppm Target</p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">300 ml added · 392 ppm sensor (395 ppm meter)</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">92.83%</p>
                  <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">395 ➔ 600 ppm Target</p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">400 ml added · 559 ppm sensor (557 ppm meter)</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">95.50%</p>
                  <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">557 ➔ 800 ppm Target</p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">500 ml added · 769 ppm sensor (764 ppm meter)</p>
                </div>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Linear range achievement: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">92.83% to 98.75%</strong>, verifying dependable incremental dosing from dilute nursery stages up to mature fruiting concentrations.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.5: Response Time Analysis (Fig. 11)                         */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Response Time &amp; Latency Analysis
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Precision timing analysis measuring the operational latency from user input on the Blynk app to sequential solenoid valve opening, peristaltic pump activation, and fluid delivery.
            </p>
          </div>

          {/* Visual Showcase: Fig. 11 Stopwatch Response Test */}
          <div className="space-y-2">
            <div className="relative w-full aspect-[16/9] bg-[#F5F5F7] dark:bg-[#161618] rounded-2xl overflow-hidden">
              <Image
                src="/images/projects/iot-fertiliser/fig-11-response-time-stopwatch.jpg"
                alt="Fig. 11 Dispensing fertiliser AB while recording response time with precision stopwatch"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain p-2"
              />
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Fig. 11</strong> · Stopwatch timing during live dispensing.
            </p>
          </div>

          {/* Clean Latency Breakdown (No Gridlines) */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">10.85s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Solenoid Valves</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Depressurization &amp; release</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">1.07s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Peristaltic Pumps</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Relay closure &amp; acceleration</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">10.79s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Fluid Flow Delivery</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Volumetric line transfer</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">22.17s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Total Turnaround</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Command to delivery</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Mean response time of 22.17 seconds provides deterministic real-time control while safely protecting hydraulic lines against water hammer transients.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PEER-REVIEWED ACADEMIC PUBLICATION (CLEAN HERO CARD)                   */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
              Peer-Reviewed Academic Publication · Scopus / MyCite Indexed
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              IoT-Based Fertiliser Mixing for Precision Farming
            </h3>
          </div>

          <div className="space-y-1 text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            <p>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Sri Tulasi Ram Rajalingam</strong> (Lead Author),{" "}
              Muhammad Muzakkir Mohd Nadzri, Afandi Ahmad, &amp; Mohamad Khairi Ishak
            </p>
            <p>
              Faculty of Electrical and Electronic Engineering, Universiti Tun Hussein Onn Malaysia (UTHM)
            </p>
            <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">
              <em>International Journal of Integrated Engineering (IJIE)</em>, Vol. 18, No. 1 (2026), pp. 186–201.
            </p>
          </div>

          <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
            The complete academic dataset, multi-trial error matrices, sensor calibration curves, and fluid dynamics equations are published in full in the peer-reviewed journal.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.publicationUrl && (
              <a
                href={project.publicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View official published article in IJIE on UTHM OJS (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-xs group min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Paper on IJIE (UTHM OJS)</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inspect open-source firmware on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#202023] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:outline-hidden"
              >
                <Code2 className="w-4 h-4 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>Inspect ESP32 Firmware on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. NEXT PROJECT NAVIGATION (SEAMLESS CIRCULAR)                           */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pt-10 sm:pt-14 pb-20">
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block space-y-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:outline-hidden rounded-3xl p-2 -m-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
            Next Project
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3
                className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight ${nextAccent.textHover} transition-colors leading-[1.1]`}
              >
                {nextProject.title}
              </h3>
              <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                {nextProject.subtitle}
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white ${nextAccent.bg} ${nextAccent.hoverBg} transition-all duration-200 shadow-xs shrink-0`}
            >
              <span>{nextProject.ctaLabel || "Explore Case Study"}</span>
              <ProjectCtaIcon projectId={nextProject.id} />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

