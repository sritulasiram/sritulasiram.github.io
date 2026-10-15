"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  UserCheck,
  Cpu,
  Clock,
  Layers,
  Zap,
  ShieldCheck,
  FileText,
  Activity,
} from "lucide-react";
import ProjectCtaIcon from "@/components/ProjectCtaIcon";
import CaseStudyBreadcrumb from "@/components/CaseStudyBreadcrumb";
import ProjectScreenWalkthrough from "@/components/ProjectScreenWalkthrough";
import { MacbookPro } from "@/components/ui/macbook-pro";
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

// 40-Pin Header Pinout Definition (Electrically accurate to Raspberry Pi Foundation specification)
const HEADER_PINS = [
  { pin: 1, name: "3V3 Power", type: "power3v3" },
  { pin: 2, name: "5V Power", type: "power5v" },
  { pin: 3, name: "GPIO 2 (SDA1)", type: "gpio" },
  { pin: 4, name: "5V Power", type: "power5v" },
  { pin: 5, name: "GPIO 3 (SCL1)", type: "gpio" },
  { pin: 6, name: "Ground", type: "gnd" },
  { pin: 7, name: "GPIO 4 (GPCLK0)", type: "fault", note: "Blown ESD Diode · Stuck Low" },
  { pin: 8, name: "GPIO 14 (TXD0)", type: "gpio" },
  { pin: 9, name: "Ground", type: "gnd" },
  { pin: 10, name: "GPIO 15 (RXD0)", type: "gpio" },
  { pin: 11, name: "GPIO 17", type: "gpio" },
  { pin: 12, name: "GPIO 18 (PWM0)", type: "gpio" },
  { pin: 13, name: "GPIO 27", type: "gpio" },
  { pin: 14, name: "Ground", type: "gnd" },
  { pin: 15, name: "GPIO 22", type: "gpio" },
  { pin: 16, name: "GPIO 23", type: "gpio" },
  { pin: 17, name: "3V3 Power", type: "power3v3" },
  { pin: 18, name: "GPIO 24", type: "gpio" },
  { pin: 19, name: "GPIO 10 (MOSI)", type: "gpio" },
  { pin: 20, name: "Ground", type: "gnd" },
  { pin: 21, name: "GPIO 9 (MISO)", type: "gpio" },
  { pin: 22, name: "GPIO 25", type: "gpio" },
  { pin: 23, name: "GPIO 11 (SCLK)", type: "gpio" },
  { pin: 24, name: "GPIO 8 (CE0)", type: "gpio" },
  { pin: 25, name: "Ground", type: "gnd" },
  { pin: 26, name: "GPIO 7 (CE1)", type: "gpio" },
  { pin: 27, name: "ID_SD (EEPROM)", type: "id" },
  { pin: 28, name: "ID_SC (EEPROM)", type: "id" },
  { pin: 29, name: "GPIO 5", type: "gpio" },
  { pin: 30, name: "Ground", type: "gnd" },
  { pin: 31, name: "GPIO 6", type: "gpio" },
  { pin: 32, name: "GPIO 12 (PWM0)", type: "gpio" },
  { pin: 33, name: "GPIO 13 (PWM1)", type: "gpio" },
  { pin: 34, name: "Ground", type: "gnd" },
  { pin: 35, name: "GPIO 19 (MISO)", type: "gpio" },
  { pin: 36, name: "GPIO 16", type: "gpio" },
  { pin: 37, name: "GPIO 26", type: "gpio" },
  { pin: 38, name: "GPIO 20 (MOSI)", type: "gpio" },
  { pin: 39, name: "Ground", type: "gnd" },
  { pin: 40, name: "GPIO 21 (SCLK)", type: "gpio" },
];

interface HardwareModel {
  name: string;
  soc: string;
  badge: string;
  image: string;
  specs: string;
}

const SUPPORTED_HARDWARE: HardwareModel[] = [
  {
    name: "Raspberry Pi 5",
    soc: "BCM2712 · RP1 Southbridge",
    badge: "Flagship 2.4GHz",
    image: "/images/hardware/pi-5.jpg",
    specs: "Direct lgpio on /dev/gpiochip4, DA9091 PMIC telemetry, Dual Micro-HDMI DRM, and PCIe Gen2/3 bus probe.",
  },
  {
    name: "Raspberry Pi 4 Model B",
    soc: "BCM2711 · VL805 USB 3.0",
    badge: "Industry Standard",
    image: "/images/hardware/pi-4.jpg",
    specs: "VL805 host controller topology, Broadcom GPIO, Dual Micro-HDMI, and PMIC under-voltage register decoding.",
  },
  {
    name: "Raspberry Pi 400 / 500",
    soc: "Integrated Keyboard Subsystem",
    badge: "Unitary PC Form",
    image: "/images/hardware/pi-400.jpg",
    specs: "Keyboard matrix scancode detection via /proc/bus/input/devices alongside full Pi 4/5 peripheral routines.",
  },
  {
    name: "Raspberry Pi 3 Model B / B+",
    soc: "BCM2837B0 · Full-Size HDMI",
    badge: "Legacy Classic",
    image: "/images/hardware/pi-3.jpg",
    specs: "Standard 40-pin GPIO header, 2.4/5GHz Wi-Fi, Bluetooth 4.2, and legacy VideoCore HDMI verification.",
  },
  {
    name: "Raspberry Pi Zero 2 W",
    soc: "BCM2710A1 · Compact Form Factor",
    badge: "Embedded Micro",
    image: "/images/hardware/pi-zero-2.jpg",
    specs: "Mini-HDMI DRM engine, wireless RF transceivers, and low-power PMIC under-voltage monitoring.",
  },
];

const FLEET_API_ENDPOINTS = [
  { method: "POST", path: "/api/run_all", desc: "Trigger 3-phase automated diagnostic sweep" },
  { method: "GET", path: "/api/test_result/<id>", desc: "Stream real-time vector status & return codes" },
  { method: "GET", path: "/api/records/sessions", desc: "Retrieve historical QA logs and MAC registry" },
  { method: "GET", path: "/print_manifest", desc: "Generate ESC/POS thermal printer RMA label" },
];

export default function RaspberryPiDiagnosticCaseStudy({ project, nextProject }: Props) {
  const [pinFilter, setPinFilter] = useState<"all" | "gpio" | "power" | "gnd" | "fault">("all");

  const nextAccent = NEXT_PROJECT_ACCENT[nextProject.id] || {
    bg: "bg-[#C51A4A]",
    hoverBg: "hover:bg-[#B01440]",
    textHover: "group-hover:text-[#C51A4A] dark:group-hover:text-[#FF375F]",
  };

  return (
    <div className="space-y-20 sm:space-y-28 selection:bg-rose-500/20 selection:text-rose-950 dark:selection:text-rose-100">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & HARDWARE WORKBENCH SHOWCASE                             */}
      {/* ========================================================================= */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title="Raspberry Pi Diagnostics" />

        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>
        </div>

        {/* Project Meta Bar (Clean Typography, No Divider Line) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Organization
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.organization}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Role &amp; Division
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.role}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Compatible SoCs
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Raspberry Pi 5, 4, 3, Zero</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Bench Turnaround
            </p>
            <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              {project.heroMetric ? `${project.heroMetric} / Unit` : "40–55s / Unit"}
            </p>
          </div>
        </div>

        {/* Hardware Workbench Hero Stage with Ambient Studio Backlight & MacBook Pro Showcase */}
        <div className="relative mt-12 sm:mt-16 flex justify-center">
          {/* Ambient Specular Studio Halo */}
          <div className="absolute -inset-4 sm:-inset-8 bg-rose-500/10 dark:bg-rose-500/15 rounded-3xl blur-3xl -z-10 pointer-events-none" />

          {/* Workbench MacBook Pro Stage */}
          <div className="w-full max-w-5xl relative">
            <MacbookPro
              src={project.imageSrc}
              priority
              fit="cover"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SCREENSHOT WALKTHROUGH DECK                                            */}
      {/* ========================================================================= */}
      {project.screens && project.screens.length > 0 && (
        <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
          <ProjectScreenWalkthrough
            eyebrow="Diagnostic Suite Tour"
            title="Explore each screen."
            subtitle="From 19-vector automated triage sweeps to silicon thermal metrics and tamper-evident QA certificates."
            screens={project.screens}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. RESULTS & PRODUCTION BENCHMARKS                                        */}
      {/* ========================================================================= */}
      {project.results && project.results.length > 0 && (
        <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {project.results.map((res) => (
              <div
                key={res.label}
                className="p-6 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-2 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  {res.label}
                </span>
                <p className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">
                  {res.metric}
                </p>
                <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. OPERATIONAL IMPACT: BEFORE VS AFTER BENCH AUTOMATION                   */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-10">
        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Operational Evolution
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Up to 24× faster triage.
            <br />
            <span className="text-[#86868B]">With zero hardware risk.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1">
            Before automation, intake testing was completely manual: technicians had to toggle each GPIO pin HIGH and LOW via command-line scripts while physically probing 40 individual pins with a handheld digital multimeter to record voltage levels. Peripheral tests—HDMI displays, USB throughput, and network connections—had to be connected and validated manually one by one. This 15–20 minute manual inspection process carried recurring risks of metal multimeter probes slipping between pins and causing catastrophic silicon shorts.
          </p>
        </div>

        {/* Apple Keynote Benchmark */}
        <div className="space-y-6 pt-2 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Bench Inspection Time
            </span>
            <span className="text-xs text-[#86868B]">
              Lower is better · Single-board computer triage cycle
            </span>
          </div>

          <div className="space-y-5">
            {/* Legacy Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#6E6E73] dark:text-[#86868B]">
                <span className="font-medium">Legacy Manual Workflow (Multimeter pin probing &amp; manual CLI)</span>
                <span className="font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">1,200s (20m)</span>
              </div>
              <div className="h-2.5 sm:h-3 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-[#8E8E93] dark:bg-[#636366] rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* Platform Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Cytron Diagnostic Suite (19-vector automated sweep)
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  45s <span className="text-xs font-sans font-medium opacity-80">(24× faster)</span>
                </span>
              </div>
              <div className="h-2.5 sm:h-3 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-rose-600 dark:bg-rose-500 rounded-full"
                  style={{ width: "4%", minWidth: "48px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. 40-PIN HEADER VISUALIZER & NON-DESTRUCTIVE PULL-UP PROBING             */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <Layers className="w-3.5 h-3.5" />
            Electrical Safety
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Probe-free pin diagnostics.
            <br />
            <span className="text-[#86868B]">Engineered for fragile customer returns.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            In manual intake testing, technicians had to set each pin HIGH and LOW using console commands while physically holding a multimeter probe against the 2.54mm header. Beyond taking 15+ minutes per board, a single slipped probe tip could bridge a 3.3V line to an adjacent 5V rail and permanently destroy the SoC die. The automated engine completely eliminates physical probes with <strong>zero-external-wiring forensic probing</strong>: unattached pins are tested solely by enabling internal pull-ups (<code>SET_PULL_UP</code> via <code>lgpio</code> / kernel sysfs) and verifying logic transitions inside strict <code>try...finally</code> release blocks.
          </p>
        </div>

        {/* Interactive / Visual 40-Pin Header Representation */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Raspberry Pi 40-Pin Header Diagnostic Map
              </p>
              <p className="text-xs text-[#6E6E73] dark:text-[#86868B]">
                Live bench mapping identifying single-pin ESD damage vs system bus degradation
              </p>
            </div>

            {/* Pin Color Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#6E6E73] dark:text-[#86868B]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Nominal GPIO
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                3.3V / 5V Power
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                GND
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                Defective Pin (Fault)
              </span>
            </div>
          </div>

          {/* Apple Bus Filter Segment Control */}
          <div
            role="group"
            aria-label="Filter 40-pin header pins"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#1E1E20] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs"
          >
            <button
              type="button"
              aria-pressed={pinFilter === "all"}
              onClick={() => setPinFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                pinFilter === "all"
                  ? "bg-rose-700 text-white shadow-2xs"
                  : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              All Pins (40)
            </button>
            <button
              type="button"
              aria-pressed={pinFilter === "gpio"}
              onClick={() => setPinFilter("gpio")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                pinFilter === "gpio"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              GPIO Logic (26)
            </button>
            <button
              type="button"
              aria-pressed={pinFilter === "power"}
              onClick={() => setPinFilter("power")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                pinFilter === "power"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              3.3V / 5V Power (4)
            </button>
            <button
              type="button"
              aria-pressed={pinFilter === "gnd"}
              onClick={() => setPinFilter("gnd")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                pinFilter === "gnd"
                  ? "bg-zinc-700 text-white shadow-2xs"
                  : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              Ground (8)
            </button>
            <button
              type="button"
              aria-pressed={pinFilter === "fault"}
              onClick={() => setPinFilter("fault")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                pinFilter === "fault"
                  ? "bg-rose-700 text-white shadow-2xs animate-pulse"
                  : "text-rose-700 dark:text-rose-400 hover:bg-rose-100/50 dark:hover:bg-rose-950/30"
              }`}
            >
              Isolated Defect (1)
            </button>
          </div>

          {/* 40-Pin Dual-Column Grid (Physically Aligned 2x20 Rows on Mobile & Desktop) */}
          <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-2 py-2">
            {/* Left Column (Odd Pins: 1, 3, 5 ... 39) */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] pb-1">
                Odd Pins (Inner Rail 1–39)
              </p>
              {HEADER_PINS.filter((p) => p.pin % 2 !== 0).map((p) => {
                const isMatch =
                  pinFilter === "all" ||
                  (pinFilter === "gpio" && (p.type === "gpio" || p.type === "fault")) ||
                  (pinFilter === "power" && (p.type === "power3v3" || p.type === "power5v")) ||
                  (pinFilter === "gnd" && p.type === "gnd") ||
                  (pinFilter === "fault" && p.type === "fault");

                return (
                  <div
                    key={p.pin}
                    className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                      isMatch ? "opacity-100" : "opacity-25"
                    } ${
                      p.type === "fault"
                        ? "bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border border-rose-400/80 dark:border-rose-700 font-semibold"
                        : p.type === "power3v3"
                        ? "bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200"
                        : p.type === "gnd"
                        ? "bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#86868B]"
                        : "bg-white dark:bg-[#1E1E20] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.04] dark:border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="w-4 sm:w-5 text-right font-bold text-[11px] text-[#6E6E73] dark:text-[#86868B] shrink-0">
                        {p.pin}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] truncate">{p.name}</span>
                    </div>
                    {p.type === "fault" ? (
                      <div className="text-right shrink-0">
                        <span className="text-[9px] sm:text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block">
                          ⚠ FAULT
                        </span>
                        {p.note && (
                          <span className="text-[8px] sm:text-[9px] text-rose-600 dark:text-rose-400 font-sans hidden sm:block">
                            {p.note}
                          </span>
                        )}
                      </div>
                    ) : p.type === "gpio" ? (
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">PASS</span>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] text-[#6E6E73] dark:text-[#86868B] shrink-0">{p.type.toUpperCase()}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column (Even Pins: 2, 4, 6 ... 40) */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] pb-1">
                Even Pins (Outer Rail 2–40)
              </p>
              {HEADER_PINS.filter((p) => p.pin % 2 === 0).map((p) => {
                const isMatch =
                  pinFilter === "all" ||
                  (pinFilter === "gpio" && (p.type === "gpio" || p.type === "fault")) ||
                  (pinFilter === "power" && (p.type === "power3v3" || p.type === "power5v")) ||
                  (pinFilter === "gnd" && p.type === "gnd") ||
                  (pinFilter === "fault" && p.type === "fault");

                return (
                  <div
                    key={p.pin}
                    className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                      isMatch ? "opacity-100" : "opacity-25"
                    } ${
                      p.type === "power5v"
                        ? "bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200"
                        : p.type === "gnd"
                        ? "bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#86868B]"
                        : "bg-white dark:bg-[#1E1E20] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.04] dark:border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="w-4 sm:w-5 text-right font-bold text-[11px] text-[#6E6E73] dark:text-[#86868B] shrink-0">
                        {p.pin}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] truncate">{p.name}</span>
                    </div>
                    {p.type === "gpio" ? (
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">PASS</span>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] text-[#6E6E73] dark:text-[#86868B] shrink-0">{p.type.toUpperCase()}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fault Isolation Takeaway */}
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-start gap-3">
            <span className="text-rose-600 dark:text-rose-400 text-sm font-bold shrink-0">↳</span>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              <strong>Pin-Level Granularity:</strong> Rather than printing generic failures like &ldquo;GPIO Error&rdquo;, the platform explicitly flags: <strong>Pin 7 (GPIO4) — Blown ESD Diode · Stuck Low</strong>. This allows technicians to determine whether an RMA board can be salvaged or if the customer subjected the pin to over-voltage abuse.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PHASED EXECUTION TIMELINE & HARDWARE CONCURRENCY MUTEX                 */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <Clock className="w-3.5 h-3.5" />
            Deterministic Execution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Synchronized in three phases.
            <br />
            <span className="text-[#86868B]">Eliminating voltage sag and false rejects.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Running heavy multi-core CPU stress tests while simultaneously transmitting over Wi-Fi and reading block storage induces power rail sag and electrical cross-talk, producing false-positive test rejections. The suite serializes execution across a synchronized 3-phase timeline protected by an exclusive threading mutex (<code>hw_lock</code>).
          </p>
        </div>

        {/* 3-Stage Chronological Pipeline */}
        <div className="space-y-6 pt-2">
          {/* Timeline Progress Bar (0s to 50s) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#86868B]">
              <span>t = 0s (Intake Initialized)</span>
              <span>t = 15s</span>
              <span>t = 35s</span>
              <span className="text-rose-700 dark:text-rose-400 font-semibold">t = 50s (Sweep Complete)</span>
            </div>
            <div className="grid grid-cols-10 h-2 rounded-full overflow-hidden bg-black/[0.05] dark:bg-white/[0.06] gap-0.5 p-0.5">
              <div className="col-span-3 rounded-full bg-[#8E8E93] dark:bg-[#636366]" title="Phase 1: 0s–15s (Passive Discovery)" />
              <div className="col-span-4 rounded-full bg-[#A1A1A6] dark:bg-[#787880]" title="Phase 2: 15s–35s (I/O & RF)" />
              <div className="col-span-3 rounded-full bg-rose-600 dark:bg-rose-500" title="Phase 3: 35s–50s (Saturation)" />
            </div>
          </div>

          {/* 3-Column Phase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Phase 1 */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#1D1D1F] dark:text-[#F5F5F7]">
                    PHASE 01
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B]">
                    0s – 15s
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Passive Silicon Discovery
                  </h3>
                  <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                    0% Voltage / Thermal Load
                  </p>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  Evaluates peripheral presence without drawing significant power rail current.
                </p>
              </div>

              {/* Vector Badges */}
              <div className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold block">
                  10 Hardware Vectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["EEPROM", "I2C / SPI", "PCIe Bus", "MIPI D-PHY", "USB Hubs", "HDMI Framebuffer"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-[#202023] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.04] dark:border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#1D1D1F] dark:text-[#F5F5F7]">
                    PHASE 02
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B]">
                    15s – 35s
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Storage &amp; RF Throughput
                  </h3>
                  <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                    Moderate Bus Stress
                  </p>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  Stresses storage controllers and network PHYs after basic presence is confirmed.
                </p>
              </div>

              {/* Vector Badges */}
              <div className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold block">
                  5 Hardware Vectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Gigabit PHY", "Wi-Fi RSSI", "Partition Table", "EXT4 Journal", "Block I/O Speed"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-[#202023] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.04] dark:border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-rose-500/20 dark:border-rose-500/30 flex flex-col justify-between space-y-5 shadow-2xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400">
                    PHASE 03
                  </span>
                  <span className="text-[11px] font-mono text-rose-700 dark:text-rose-400 font-semibold">
                    35s – 50s
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Compute &amp; Power Saturation
                  </h3>
                  <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 mt-0.5">
                    100% Load &amp; Thermal Peak
                  </p>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  Maximum ARM stress, thermal boundary auditing, and PMIC under-voltage register probing.
                </p>
              </div>

              {/* Vector Badges */}
              <div className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-semibold block">
                  4 Hardware Vectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["ARM Multi-Core", "SoC < 80°C Limit", "DRAM Alloc", "PMIC Vcore Latch"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-[#202023] text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Concurrency Mutex Guarantee Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0" />
              <p className="text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">Exclusive Hardware Concurrency Lock (<code className="font-mono text-[11px] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">hw_lock</code>):</strong> Background dashboard telemetry is blocked while active sweeps evaluate physical rails.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0 font-medium self-start sm:self-auto">
              Thread-Safe
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PMIC THROTTLE BITMASK DECODER & POWER ARCHITECTURE                     */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <Zap className="w-3.5 h-3.5" />
            Silicon Forensics
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Catching transient voltage drops.
            <br />
            <span className="text-[#86868B]">Before healthy boards get rejected.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Most customer returns claiming &ldquo;defective boards&rdquo; are actually caused by inadequate third-party power adapters or thin USB cables that drop voltage under load. The engine decodes the Broadcom PMIC <code>vcgencmd get_throttled</code> bitmask, uncovering transient voltage events that occurred even hours prior to testing.
          </p>
        </div>

        {/* Bitmask Register Visual Table */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              vcgencmd get_throttled Bitmask Decoder
            </span>
            <span className="text-xs font-mono text-rose-700 dark:text-rose-400">
              Register: 0x50000 (Historical Drop Flagged)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Active Bit Flags */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                Active Real-Time State (Bits 0–3)
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-rose-700 dark:text-rose-400">Bit 0 (0x1)</span>
                    <p className="text-[#6E6E73] dark:text-[#86868B] text-[11px]">Active Under-voltage detected (&lt; 4.65V)</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">CLEARED</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Bit 1 (0x2)</span>
                    <p className="text-[#6E6E73] dark:text-[#86868B] text-[11px]">ARM Core frequency actively capped</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">CLEARED</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Bit 2 (0x4)</span>
                    <p className="text-[#6E6E73] dark:text-[#86868B] text-[11px]">Active SoC thermal throttling engaged</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">CLEARED</span>
                </div>
              </div>
            </div>

            {/* Latched Historical Bit Flags */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                Latched Historical State (Bits 16–19)
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300/60 dark:border-rose-800/60 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-rose-700 dark:text-rose-400">Bit 16 (0x10000)</span>
                    <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">Under-voltage has occurred since boot</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">LATCHED</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Bit 17 (0x20000)</span>
                    <p className="text-[#6E6E73] dark:text-[#86868B] text-[11px]">Frequency capping has occurred since boot</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">CLEARED</span>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300/60 dark:border-rose-800/60 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-rose-700 dark:text-rose-400">Bit 18 (0x40000)</span>
                    <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">Throttling has occurred since boot</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">LATCHED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. RP1 SOUTHBRIDGE & SILICON ABSTRACTION LAYER (PI 5 ARCHITECTURE)          */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <Cpu className="w-3.5 h-3.5" />
            Kernel Driver Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Mastering the RP1 southbridge.
            <br />
            <span className="text-[#86868B]">Across Linux Kernel 6.6+ and four board generations.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The release of Raspberry Pi 5 broke legacy diagnostic tools. Unlike earlier models where the Broadcom SoC directly controlled the 40-pin header, the Pi 5 routes all peripheral lines through Raspberry Pi&apos;s custom RP1 southbridge via PCIe. The suite transparently abstracts these changes across Linux Kernel 6.6+.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Pi 4 / Legacy Architecture */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
              Raspberry Pi 4, 3, Zero Architecture
            </span>
            <p className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Direct Broadcom Memory Mapped GPIO
            </p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Header mapped directly to BCM2711 / BCM2837 silicon registers via <code>/dev/gpiochip0</code>. The suite utilizes standard kernel descriptors with automatic fallback to <code>gpiozero</code> and <code>RPi.GPIO</code>.
            </p>
          </div>

          {/* Pi 5 RP1 Southbridge Architecture */}
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Raspberry Pi 5 Architecture
            </span>
            <p className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              PCIe-Attached RP1 I/O Southbridge
            </p>
            <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              BCM2712 routes all 40-pin lines through the RP1 coprocessor on <code>/dev/gpiochip4</code>. The diagnostic engine dynamically scans sysfs chip descriptors using <code>lgpio</code>, ensuring zero kernel panic or driver failure.
            </p>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 9. THE OFFICIAL 2-PAGE RMA MANIFEST & CRYPTOGRAPHIC CERTIFICATE           */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <FileText className="w-3.5 h-3.5" />
            Audit Certification
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Tamper-proof warranty sign-off.
            <br />
            <span className="text-[#86868B]">Sealed with SHA-256 cryptographic proof.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The workbench dynamically renders an official, printable 2-page RMA manifest certificate via <code>/print_manifest/&lt;session_id&gt;</code> that attaches directly to customer warranty tickets, complete with cryptographic verification.
          </p>
        </div>

        {/* Audit Document Preview */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-6">
          {/* Document Header */}
          <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Cytron Technologies · Hardware QA &amp; RMA Division
              </p>
              <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Hardware Diagnostic &amp; Warranty Inspection Certificate
              </h3>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-md bg-white dark:bg-[#111113] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                DOC-RMA-20261011-8492
              </span>
            </div>
          </div>

          {/* Unit Under Test (UUT) Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-[#6E6E73] dark:text-[#86868B] block">Board Model</span>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">Raspberry Pi 5 Model B</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#6E6E73] dark:text-[#86868B] block">Hardware Serial</span>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">10000000a3b4c5d6</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#6E6E73] dark:text-[#86868B] block">Memory / SoC Rev</span>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">8GB LPDDR4X · d04170</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#6E6E73] dark:text-[#86868B] block">Ethernet MAC</span>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">d8:3a:dd:2c:14:ef</strong>
            </div>
          </div>

          {/* Executive Disposition Banner */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] block">
                Warranty Disposition Verdict
              </span>
              <span className="text-base font-bold text-rose-700 dark:text-rose-400">
                NON-CONFORMANT / REPLACEMENT CLEARED
              </span>
            </div>
            <div className="sm:text-right text-xs">
              <span className="text-[#6E6E73] dark:text-[#86868B] block">Isolated Fault:</span>
              <span className="font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Pin 7 (GPIO4) — Stuck at Low
              </span>
            </div>
          </div>

          {/* Sign-off & Audit Digest Footer */}
          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[#6E6E73] dark:text-[#86868B]">QA Technician: </span>
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">
                Sri Tulasi Ram (Support Engineer · Warranty Division)
              </strong>
            </div>
            <div className="font-mono text-[11px] text-[#6E6E73] dark:text-[#86868B]">
              SHA-256: <span className="text-rose-700 dark:text-rose-400">9f86d081884c7d65...b0f00a08</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. HARDWARE COMPATIBILITY & FLEET REST API                               */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <Activity className="w-3.5 h-3.5" />
            Fleet Scalability
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-[1.1]">
            Universal hardware support.
            <br />
            <span className="text-[#86868B]">With 18 headless automation endpoints.</span>
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The platform supports all modern and legacy Raspberry Pi single-board computers, exposing 18 authenticated REST endpoints for automated production fixtures and fleet diagnostics.
          </p>
        </div>

        {/* Compatibility Hardware Visual Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {SUPPORTED_HARDWARE.map((hw) => (
            <div
              key={hw.name}
              className="group overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] flex flex-col transition-all duration-300 hover:shadow-lg hover:border-black/10 dark:hover:border-white/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.03] dark:bg-white/[0.03]">
                <Image
                  src={hw.image}
                  alt={hw.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/60 dark:bg-black/80 backdrop-blur-md text-white border border-white/15 shadow-xs">
                  {hw.badge}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {hw.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-rose-700 dark:text-rose-400">
                    {hw.soc}
                  </p>
                </div>
                <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
                  {hw.specs}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet REST API Architecture Banner */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                  HEADLESS FLEET API
                </span>
                <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Automation REST Engine
                </h3>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6]">
                18 Authenticated Endpoints for Factory Automated Test Equipment (ATE) &amp; Cloud RMA Registries
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
              TLS / Token Auth Verified
            </span>
          </div>

          <p className="text-xs text-[#6E6E73] dark:text-[#86868B] leading-relaxed">
            Full programmatic control over hardware fixtures via Flask daemon. Operators execute automated test cycles without browser GUI interaction, streaming machine-readable JSON logs directly to warranty databases.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {FLEET_API_ENDPOINTS.map((endpoint) => (
              <div
                key={endpoint.path}
                className="p-3.5 rounded-xl bg-white dark:bg-[#111113] border border-black/[0.05] dark:border-white/[0.06] flex items-start gap-3"
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                    endpoint.method === "POST"
                      ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/40"
                      : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40"
                  }`}
                >
                  {endpoint.method}
                </span>
                <div className="min-w-0 flex-1">
                  <code className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block truncate">
                    {endpoint.path}
                  </code>
                  <span className="text-[11px] text-[#6E6E73] dark:text-[#86868B] block mt-0.5">
                    {endpoint.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
          {project.techStack.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/5 dark:border-white/10 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. NEXT PROJECT NAVIGATION (SEAMLESS CIRCULAR)                           */}
      {/* ========================================================================= */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pt-10 sm:pt-14 pb-20">
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block space-y-4 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-hidden rounded-3xl p-2 -m-2"
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
