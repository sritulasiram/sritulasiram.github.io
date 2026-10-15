"use client";

import { useState } from "react";
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
  Cpu,
  Layers,
  Activity,
  Check,
  Copy,
  Zap,
  Droplets,
  Gauge,
  ShieldCheck,
  Scale,
  Clock,
} from "lucide-react";
import ProjectCtaIcon from "@/components/shared/ProjectCtaIcon";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
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
    bg: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
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

const BIBTEX_CITATION = `@article{rajalingam2026iot,
  title     = {IoT-Based Fertiliser Mixing for Precision Farming},
  author    = {Rajalingam, Sri Tulasi Ram and Nadzri, Muhammad Muzakkir Mohd and Ahmad, Afandi and Ishak, Mohamad Khairi},
  journal   = {International Journal of Integrated Engineering},
  volume    = {18},
  number    = {1},
  pages     = {186--201},
  year      = {2026},
  publisher = {Penerbit UTHM},
  doi       = {10.30880/ijie.2026.18.01.014},
  url       = {https://doi.org/10.30880/ijie.2026.18.01.014}
}`;

export default function IotFertiliserCaseStudy({ project, nextProject }: Props) {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const nextAccent = NEXT_PROJECT_ACCENT[nextProject.id] || {
    bg: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(BIBTEX_CITATION);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2200);
  };

  return (
    <div className="space-y-20 sm:space-y-28 selection:bg-emerald-500/20 selection:text-emerald-950 dark:selection:text-emerald-100">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & PROTOTYPE SHOWCASE                                      */}
      {/* ========================================================================= */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title="IoT Fertiliser Mixing" />

        <div className="space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/60 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Peer-Reviewed Journal Publication · IJIE Vol. 18(1), 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://doi.org/10.30880/ijie.2026.18.01.014"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View official journal paper on IJIE via DOI (opens in a new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border border-emerald-300/60 dark:border-emerald-800/60 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Read Published Journal (DOI: 10.30880)</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-emerald-700 dark:text-emerald-400" />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View firmware repository on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
              >
                <Code2 className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>Firmware Repository (v1.1.0)</span>
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
              <Calendar className="w-3.5 h-3.5" /> Citation Volume
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Vol. 18(1), pp. 186–201</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Journal Indexing
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Scopus / MyCite</p>
          </div>
        </div>

        {/* Hero Image: Prototype Layout */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Image
            src="/images/projects/iot-fertiliser-mixing/fig-2a-prototype-layout.jpg"
            alt="Prototype layout showing flow sensors, ESP32 expansion board, dual relay modules, and solenoid valves"
            width={751}
            height={581}
            priority
            sizes="(max-width: 768px) 100vw, 750px"
            className="w-full max-w-2xl sm:max-w-3xl h-auto rounded-2xl sm:rounded-3xl"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AT-A-GLANCE TELEMETRY METRICS (APPLE TYPOGRAPHIC SPEC STYLE)           */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-2">
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">99.60%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">TDS Sensing Accuracy</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">100–1,000 ppm range</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">&gt; 94%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Flow Rate Accuracy</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">250–1,000 ml range</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">22.17s</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Mean Response Time</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Command to delivery</p>
          </div>

          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">92.8%–98.8%</p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">Target Achievement</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Closed-loop reservoir dosing</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SYSTEM OVERVIEW SECTION & FIG. 1 SYSTEM DIAGRAM                        */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            End-to-End Closed-Loop Mixing Architecture
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The automated system pairs an ESP32 microcontroller with analog TDS and dual-level water sensors, Hall-effect pulse flow meters, dual 12V submersible dosing pumps, and anti-backflow solenoid valves. Together with the Blynk IoT cloud platform, it provides closed-loop precision nutrient dosing and live telemetry for commercial hydroponic agriculture.
          </p>
        </div>

        {/* System Overview Diagram */}
        <div>
          <Image
            src="/images/projects/iot-fertiliser-mixing/fig-1-system-overview.png"
            alt="Overall IoT-based fertiliser mixing system processes: Real-Time Monitoring, Fertiliser Mixing System, and User-End Experience"
            width={1408}
            height={779}
            className="w-full h-auto rounded-2xl sm:rounded-3xl dark:brightness-[0.93] dark:contrast-[1.02]"
          />
        </div>

        {/* 3 Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Layer 01</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Submerged Sensing Bus</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Analog TDS probe on ADC1 VP line paired with dual conductive water level sensors and in-line Hall-effect flow turbine meters tracking fluid transfer with microsecond pulse accuracy.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Layer 02</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Actuation &amp; Silicon Isolation</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Optoisolated 12V relays powering 3 submersible pumps and dual solenoid shutoff valves. Firmware state engine decouples analog reads from Wi-Fi synthesis to protect sensor linearity.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Layer 03</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-base">Cloud Telemetry Bridge</p>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Bidirectional Blynk IoT mobile stream managing target volume commands (V1), live dispensed tally (V2), real-time TDS ppm (V3), and multi-threshold reservoir indicators (V4, V5).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HARDWARE ARCHITECTURE (FIG. 3 SCHEMATIC + CLEAN SPEC LIST)             */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Hardware Architecture &amp; Silicon RF Isolation
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            During prototyping, hardware validation revealed that all analog sensors must reside exclusively on <strong>ADC1 (GPIO 32–39)</strong>. Because the ESP32 ADC2 block shares silicon clock routing with the 2.4GHz Wi-Fi RF PLL synthesizer, active packet transmission severely corrupts ADC2 readings. Architecting TDS sampling strictly on GPIO 36 (VP pin) and reservoir water level monitoring on GPIO 34 and 35 guaranteed 100% measurement stability during live cloud synchronization.
          </p>
        </div>

        {/* Circuit Design Diagram */}
        <div>
          <Image
            src="/images/projects/iot-fertiliser-mixing/fig-3-circuit-design.png"
            alt="Circuit design diagram showing full ESP32 wiring schematic, relay modules, buck converter, and sensors"
            width={1211}
            height={730}
            className="w-full h-auto rounded-2xl sm:rounded-3xl dark:brightness-[0.93] dark:contrast-[1.02]"
          />
        </div>

        {/* Pin Allocations & Electrical Architecture */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
            GPIO Pinout &amp; Electrical Topology
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">TDS Sensor</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 36 · ADC1 (VP Pin)</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                30-point running median circular buffer filtering analog signal for noise-free ppm calculation.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Dual Water Level Probes</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 34 &amp; 35 · ADC1</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Calibrated three-tier threshold detection: Low (≤700), Medium (701–1200), and High (&gt;1200).
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Dual Flow Sensors</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 18 &amp; 19 · IRAM ISRs</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Hardware interrupt routines with atomic pulse reads (5.25 ml/pulse and 5.50 ml/pulse calibration factors).
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Dual 12V Dosing Pumps</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">GPIO 16 &amp; 17 · 12V Relays</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Independent metering of Concentrated Nutrients A &amp; B into the hydroponic mixing reservoir.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Anti-Backflow Solenoids</p>
              <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">GPIO 22 &amp; 23 · Directional</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Synchronized shutoff valves preventing fluid back-siphoning and line pressure transients.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Blynk Virtual Telemetry</p>
              <p className="text-xs font-medium text-[#6E6E73] dark:text-[#86868B]">Virtual Pins V1–V5</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                Target volume (V1), dispensed tally (V2), real-time TDS (V3), and dual-level status LEDs (V4, V5).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FIRMWARE & MATHEMATICAL FORMULATION (FIG. 4 + EQUATION 1 DERIVATION)   */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-10">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Firmware State Machine &amp; Mathematical Formulation
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            To prevent ESP32 Watchdog Timer (WDT) lockups during prolonged liquid dispensing cycles, firmware version 1.1.0 replaces blocking delays with an asynchronous state machine loop. This maintains an uninterrupted Blynk cloud heartbeat while continuously sampling sensor inputs.
          </p>
        </div>

        {/* Firmware Process Flowchart */}
        <div className="flex justify-center">
          <Image
            src="/images/projects/iot-fertiliser-mixing/fig-4-firmware-flowchart.png"
            alt="Process flow of the prototype code implementation flowchart"
            width={1340}
            height={1001}
            sizes="(max-width: 768px) 100vw, 680px"
            className="w-full max-w-2xl h-auto rounded-2xl sm:rounded-3xl dark:brightness-[0.93] dark:contrast-[1.02]"
          />
        </div>

        {/* Clean 4-Stage Firmware Pipeline Narrative */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Phase 01</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">Boot &amp; Cloud Handshake</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Connects to 2.4GHz Wi-Fi, validates Blynk authentication token, initiates GPIO safe-LOW states, and registers IRAM-cached ISR handlers.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Phase 02</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">40ms ADC Sampling</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Non-blocking circular buffer collects raw ADC samples every 40 ms. 30-sample running median filter strips pump motor inductive switching spikes.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Phase 03</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">Atomic Flow Metering</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Upon receiving target volume via V1, solenoids and pumps actuate. Multi-byte pulse counters are evaluated inside atomic interrupt guards.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Phase 04</p>
            <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">Independent Pump Cutoff</p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Pumps shut off independently once their respective target volume is met (5.25 ml and 5.50 ml per pulse), eliminating volumetric overshoot.
            </p>
          </div>
        </div>

        {/* Mathematical Derivation Box (Equation 1 from Published Paper) */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Mathematical Derivation · Equation (1)
            </span>
            <span className="text-xs font-mono text-[#6E6E73] dark:text-[#86868B]">IJIE (2026) p. 191</span>
          </div>

          <div className="py-4 px-6 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.06] dark:border-white/[0.08] text-center overflow-x-auto">
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-[#1D1D1F] dark:text-[#F5F5F7] tracking-wide whitespace-nowrap">
              TDS = <span className="inline-block align-middle text-left"><span className="block border-b border-black/20 dark:border-white/20 pb-1">133.42 · V³ − 255.86 · V² + 857.39 · V</span><span className="block pt-1 text-center">2</span></span> · F
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6E6E73] dark:text-[#A1A1A6]">
            <div>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">Compensated Voltage (V):</strong> Normalized analog voltage derived from raw 12-bit ADC reads (0–4095) with reference voltage VREF = 3.3V.
            </div>
            <div>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">Calibration Factor (F):</strong> Empirical scaling factor (F = 2.3) tuned against standardized 1,413 µS/cm mineral reference solutions.
            </div>
            <div>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">Temperature Normalization:</strong> V<span className="text-[10px]">comp</span> = V / [1.0 + 0.02 · (T − 25°C)], normalizing thermal conductivity drift to 25.0°C baseline.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXPERIMENTAL FINDINGS & VALIDATION DATA (5 PUBLISHED STUDIES)          */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-20 sm:space-y-24">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Experimental Findings &amp; Empirical Validation
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Each subsystem underwent rigorous empirical testing to validate measurement accuracy, calibration stability, volumetric metering precision, and closed-loop actuation responsiveness as documented in the <em>International Journal of Integrated Engineering</em>.
          </p>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.1: TDS Sensor Accuracy                                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              1. TDS Sensor Accuracy across Solution Concentrations
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Accuracy evaluation of the submersible analog TDS sensor against a calibrated laboratory TDS meter across four standard solution concentrations using a 30-point running median filter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-5-tds-test-setup.jpg"
              alt="Accuracy test setup of the TDS sensor using 4 solution concentrations"
              width={1216}
              height={693}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-auto rounded-2xl sm:rounded-3xl"
            />

            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-6-tds-accuracy-chart.png"
              alt="Graph of TDS sensor accuracy comparing sensor readings with calibrated meter"
              width={1463}
              height={870}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-auto rounded-2xl sm:rounded-3xl dark:brightness-[0.93] dark:contrast-[1.02]"
            />
          </div>

          {/* Sensor Accuracy Data Breakdown */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.56%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">896.0 vs. 898 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Concentrated (900 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.90%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">666.7 vs. 666 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">First Dilution (666 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.93%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">458.3 vs. 458 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Second Dilution (458 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">99.01%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">232.7 vs. 235 ppm</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Third Dilution (235 ppm)</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Mean accuracy of <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">99.60%</strong> across all concentrations, with maximum deviation capped at 4.0 ppm.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.2: Calibration Stability 7-Day Test                         */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              2. Seven-Day Calibration Stability
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Evaluation of long-term sensor drift by sampling a sealed 258 ppm mineral water reference standard daily at identical conditions across seven consecutive days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-7-blynk-calibration-setup.jpg"
              alt="Setup for TDS calibration stability test with 258 ppm reference solution and Blynk IoT monitoring"
              width={991}
              height={468}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-auto rounded-2xl sm:rounded-3xl"
            />

            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-8-tds-stability-chart.png"
              alt="Graph of TDS sensor reading stability over a 7-day monitoring period"
              width={1463}
              height={660}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-auto rounded-2xl sm:rounded-3xl dark:brightness-[0.93] dark:contrast-[1.02]"
            />
          </div>

          {/* Calibration Stability Metrics */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">256.4 ppm</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">7-Day Mean Reading</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Reference Standard: 258.0 ppm</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">1.94%</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Maximum Recorded Drift</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Observed on Day 2 (253 ppm)</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">0.00% Drift</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Exact Match on Day 6</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Zero baseline recalibration needed</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Sensor readings remained strictly within ±2% of factory calibration across 7 days of continuous monitoring in typical environmental conditions.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.3: Flow Sensor Precision                                    */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              3. Flow Sensor Volumetric Precision
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Volumetric accuracy evaluation of Flow Sensor #1 and #2 across four target dosing volumes (250, 500, 750, and 1,000 ml) using laboratory graduated cylinders.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-9-flow-sensor-testbench.jpg"
              alt="Test-bench configuration for flow rate evaluation of dual sensors"
              width={1280}
              height={678}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="w-full max-w-4xl h-auto rounded-2xl sm:rounded-3xl"
            />
          </div>

          {/* Flow Sensor Precision Breakdown */}
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
              Both sensors exceed the &gt;94% operational threshold across all volumes, reaching &gt;99% accuracy on doses of 500 ml and greater.
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.4: Closed-Loop Reservoir Dosing                            */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              4. Closed-Loop Reservoir Dosing &amp; Concentration Adjustment
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Closed-loop dosing evaluation determining the volume of concentrated AB fertiliser required to reach target ppm levels in the active hydroponic reservoir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <Image
                src="/images/projects/iot-fertiliser-mixing/fig-10-hydroponic-rig-dispensing.jpg"
                alt="Fertiliser dispensing process into the hydroponic water storage system"
                width={479}
                height={626}
                sizes="(max-width: 768px) 320px, 350px"
                className="w-full max-w-xs sm:max-w-sm md:max-w-none h-auto rounded-2xl sm:rounded-3xl"
              />
            </div>

            {/* Dosing Target Progression */}
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
                Linear range achievement: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">92.83% to 98.75%</strong>, verifying dependable incremental dosing from seedling nursery stages up to mature fruiting concentrations.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* Subsection 6.5: Response Time Analysis                                   */}
        {/* ----------------------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              5. System Response Time &amp; Operational Latency
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Precision timing analysis measuring the end-to-end operational latency from user input on the Blynk app to sequential solenoid valve opening, pump activation, and fluid delivery.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/projects/iot-fertiliser-mixing/fig-11-response-time-stopwatch.jpg"
              alt="Dispensing fertiliser AB while recording response time with precision stopwatch"
              width={1206}
              height={675}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="w-full max-w-4xl h-auto rounded-2xl sm:rounded-3xl"
            />
          </div>

          {/* Operational Latency Breakdown */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">10.85s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Solenoid Valves Open</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Hydraulic depressurization</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">1.07s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Pumps Activation</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Relay closure &amp; acceleration</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">10.79s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Fertiliser Dispense</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Volumetric line transfer</p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">22.17s</p>
                <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Total Response Time</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">Command to delivery</p>
              </div>
            </div>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B] pt-4">
              Mean response time of 22.17 seconds provides deterministic real-time control while safely dampening hydraulic water hammer transients.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PEER-REVIEWED ACADEMIC PUBLICATION DOSSIER & CITATION                  */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Peer-Reviewed Academic Publication · Scopus / MyCite Indexed · Open Access
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              IoT-Based Fertiliser Mixing for Precision Farming
            </h3>
          </div>

          <div className="space-y-1 text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            <p>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">Sri Tulasi Ram Rajalingam</strong> (First &amp; Lead Author),{" "}
              Muhammad Muzakkir Mohd Nadzri, Afandi Ahmad (Corresponding Author), &amp; Mohamad Khairi Ishak
            </p>
            <p>
              Faculty of Electrical and Electronic Engineering, Universiti Tun Hussein Onn Malaysia (UTHM)
            </p>
            <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
              Co-author affiliation: Department of Computer Engineering, University of Sharjah (M. K. Ishak)
            </p>
            <p className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">
              <em>International Journal of Integrated Engineering (IJIE)</em>, Vol. 18, No. 1 (2026), pp. 186–201. DOI: 10.30880/ijie.2026.18.01.014
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                BibTeX Citation
              </span>
              <button
                onClick={copyToClipboard}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-[#6E6E73] dark:text-[#A1A1A6] overflow-x-auto p-2">
              {BIBTEX_CITATION}
            </pre>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://doi.org/10.30880/ijie.2026.18.01.014"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View official published article in IJIE via DOI (opens in a new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-xs group min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
            >
              <BookOpen className="w-4 h-4" />
              <span>Resolve via DOI: 10.30880</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://publisher.uthm.edu.my/ojs/index.php/ijie/article/view/24386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View official published article on UTHM OJS Portal (opens in a new tab)"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#202023] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
            >
              <FileText className="w-4 h-4 text-[#6E6E73] dark:text-[#A1A1A6]" />
              <span>Publisher Portal (UTHM OJS)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inspect open-source firmware on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#202023] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-black/5 dark:border-white/10 transition-all duration-200 group shadow-2xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
              >
                <Code2 className="w-4 h-4 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>Firmware Repository (GitHub)</span>
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
          className="group block space-y-4 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden rounded-3xl p-2 -m-2"
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
