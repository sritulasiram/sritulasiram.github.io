"use client";

import Link from "next/link";
import {
  Building2,
  UserCheck,
  ShieldCheck,
  Cpu,
  Clock,
  Layers,
  Server,
} from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import ProjectCtaIcon from "@/components/ProjectCtaIcon";
import ProjectScreenWalkthrough from "@/components/ProjectScreenWalkthrough";
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

export default function RaspberryPiDiagnosticCaseStudy({ project, nextProject }: Props) {
  const nextAccent = NEXT_PROJECT_ACCENT[nextProject.id] || {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hardware Workbench Hero Section */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Semantic Accessible Breadcrumb */}
        <CaseStudyBreadcrumb title="Raspberry Pi Diagnostics" />

        {/* Headline & Description */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>
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
              <Cpu className="w-3.5 h-3.5" /> Compatible Models
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Raspberry Pi 5, 4, 3, Zero</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#C51A4A] dark:text-[#FF375F] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Triage Speed
            </p>
            <p className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">&lt; 60 Seconds / Unit</p>
          </div>
        </div>

        {/* 2. Main Workbench Visual Viewport */}
        <div className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-md bg-white dark:bg-[#121214] transition-colors">
          <ProjectImage
            src={project.imageSrc}
            alt={project.title}
            placeholderLabel={project.placeholderLabel}
            ratioText={project.placeholderRatio}
            type="screenshot"
            className="w-full h-full"
            priority
          />
        </div>
      </section>

      {/* 2b. Apple Screen-by-Screen Walkthrough Deck */}
      {project.screens && project.screens.length > 0 && (
        <ProjectScreenWalkthrough
          eyebrow="Diagnostic Suite Tour"
          title="Explore each screen."
          subtitle="From 19-vector automated triage sweeps to silicon thermal metrics and tamper-evident QA certificates."
          screens={project.screens}
        />
      )}

      {/* 3. Problem Statement & Engineering Context */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#C51A4A] dark:text-[#FF375F]">01 · Problem Statement</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Replacing fragmented manual terminal scripts with deterministic hardware triage.
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
            {project.background.problemStatement}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engineering Context Card */}
          <div className="p-7 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Hardware Architecture Shift
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
              {project.background.context}
            </p>
          </div>

          {/* Bench & Safety Challenges */}
          <div className="p-7 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Bench &amp; Safety Challenges
            </h3>
            <ul className="space-y-2.5">
              {project.background.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C51A4A] dark:bg-[#FF375F] mt-2 shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. The 19-Vector Diagnostic Sweep Matrix Table */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#C51A4A] dark:text-[#FF375F]">02 · Automated Diagnostic Vectors</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            The 19 Hardware Subsystem Vectors
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            Replaces manual terminal troubleshooting with an automated sweep validating silicon responsiveness, power regulation, flash memory endurance, and peripheral transceivers in under 60 seconds.
          </p>
        </div>

        {/* 19 Vectors Table Categorized */}
        <div className="overflow-x-auto rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] bg-white dark:bg-[#121214] transition-colors">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border-b border-[#E5E5EA] dark:border-[#2C2C2E]">
              <tr>
                <th className="p-3.5 font-semibold">Test ID</th>
                <th className="p-3.5 font-semibold">Diagnostic Module</th>
                <th className="p-3.5 font-semibold">Probing Method &amp; Interface</th>
                <th className="p-3.5 font-semibold">Nominal Limits &amp; Acceptance Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA] dark:divide-[#2C2C2E] text-[#6E6E73] dark:text-[#A1A1A6]">
              {/* Domain 1: Compute, DRAM & Thermals */}
              <tr className="bg-rose-50/40 dark:bg-rose-950/20 text-[#C51A4A] dark:text-[#FF375F] font-bold">
                <td colSpan={4} className="p-2.5 font-sans uppercase tracking-wider text-[11px]">
                  Domain 1: Compute, DRAM &amp; Thermals
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">cpu</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Multi-Core Stress</td>
                <td className="p-3">Multi-threaded CPU load test</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">All ARM cores responsive, Load &lt; 90%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">cpu_temp</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Thermal Equilibrium</td>
                <td className="p-3">System thermal zone polling</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Temp &lt; 80.0°C (No thermal throttling)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">memory</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">DRAM &amp; Swap Vitals</td>
                <td className="p-3">Virtual memory allocation &amp; swap check</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">DRAM stable, Swap space available</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">pcie</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">PCIe Express Bus</td>
                <td className="p-3">PCIe link negotiation &amp; bus enumeration</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Gen2/Gen3 link state active &amp; operational</td>
              </tr>

              {/* Domain 2: PMIC & Power Architecture */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 font-bold">
                <td colSpan={4} className="p-2.5 font-sans uppercase tracking-wider text-[11px]">
                  Domain 2: PMIC &amp; Power Architecture
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">power</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">PMIC Power Audit</td>
                <td className="p-3">Voltage rail monitoring &amp; throttle register</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Vcore 4.75V–5.25V, 0 Under-voltage events</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">bootloader</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">EEPROM Firmware</td>
                <td className="p-3">SPI EEPROM bootloader audit</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">EEPROM / SPI Firmware valid &amp; accessible</td>
              </tr>

              {/* Domain 3: Storage Endurance & Integrity */}
              <tr className="bg-blue-50/40 dark:bg-blue-950/20 text-[#0071E3] dark:text-[#2997FF] font-bold">
                <td colSpan={4} className="p-2.5 font-sans uppercase tracking-wider text-[11px]">
                  Domain 3: Storage Endurance &amp; Integrity
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">storage</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Storage Vitals</td>
                <td className="p-3">Disk mount point &amp; capacity analysis</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Partition table valid, mounts healthy</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">sd_speed</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">SD Benchmark</td>
                <td className="p-3">Direct I/O block dd read/write speed</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Seq Read &gt; 20 MB/s, Write &gt; 10 MB/s</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">fsck</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">File System Check</td>
                <td className="p-3">Root/boot inode integrity validation</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Partition check clean (Return code 0)</td>
              </tr>

              {/* Domain 4: Peripherals, Transceivers & RF */}
              <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-bold">
                <td colSpan={4} className="p-2.5 font-sans uppercase tracking-wider text-[11px]">
                  Domain 4: Peripherals, Transceivers &amp; RF
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">gpio</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">40-Pin Header</td>
                <td className="p-3">Passive logic probe (SET_PULL_NONE)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">17/17 GPIO lines accessible &amp; swappable</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">uart</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Serial Transceiver</td>
                <td className="p-3">ttyAMA0 / serial loopback verification</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Serial device accessible at 9600 baud</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">usb</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">USB 2.0 / 3.0 Hub</td>
                <td className="p-3">Topology bus enumeration (lsusb/sysfs)</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">USB 2.0 / USB 3.0 host controllers active</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">hdmi</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">DRM Display Engine</td>
                <td className="p-3">Framebuffer &amp; EDID signal probe</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">DRM display ports active &amp; responding</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">csi_dsi</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">MIPI D-PHY Bus</td>
                <td className="p-3">Transceiver ribbon lane status check</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">MIPI D-PHY transceiver lanes initialized</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">wifi</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">802.11 Wireless</td>
                <td className="p-3">WLAN interface RSSI &amp; link check</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">802.11 link associated / RSSI &gt; -80 dBm</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">bluetooth</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Bluetooth Controller</td>
                <td className="p-3">BlueZ hci0 controller state check</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">HCI controller powered &amp; operational</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">ethernet</td>
                <td className="p-3 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]">Ethernet PHY</td>
                <td className="p-3">Carrier detection &amp; speed negotiation</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">100/1000 Mbps PHY link active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Three-Tier System Architecture (Matching README Diagram) */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#C51A4A] dark:text-[#FF375F]">03 · Technical Topology</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Three-Tier Embedded Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            A high-performance validation platform connecting a lightweight Vanilla JS SPA presentation engine, a concurrency-mutexed Flask backend with in-memory TTL caching, and direct kernel hardware drivers.
          </p>
        </div>

        {/* 3-Tier Architecture Dark Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#1D1D1F] dark:bg-[#121214] text-white border border-[#2C2E35] dark:border-white/[0.12] space-y-4 apple-card-shadow text-xs transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 border-b border-[#2C2E35] dark:border-white/10 pb-3">
            <span className="text-[#C51A4A] dark:text-[#FF375F] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C51A4A] dark:bg-[#FF375F]"></span>
              THREE-TIER WORKBENCH ARCHITECTURE
            </span>
            <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-neutral-300">
              Flask 3.0.3 · Port 5001 · SQLite WAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1: Presentation */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[#C51A4A] dark:text-[#FF375F]">
                <span className="uppercase font-semibold text-[10px]">Tier 1 · Presentation</span>
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-sm font-bold text-white font-sans">Vanilla JS SPA Engine</p>
              <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                Zero framework bloat. GPU layer compositing (<code className="text-white">translateZ</code>) delivering 60fps telemetry dials and automated print engine under 45MB RAM footprint.
              </p>
            </div>

            {/* Tier 2: Core Application */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[#0071E3] dark:text-[#2997FF]">
                <span className="uppercase font-semibold text-[10px]">Tier 2 · Core Application</span>
                <Server className="w-4 h-4" />
              </div>
              <p className="text-sm font-bold text-white font-sans">Flask &amp; Mutex Engine</p>
              <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                Thread-safe TestManager pool, CSRF tokens, IP rate limiting (120 req/min), and 15s in-memory TTL caching to eliminate MicroSD flash memory write wear.
              </p>
            </div>

            {/* Tier 3: Hardware Probing */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="uppercase font-semibold text-[10px]">Tier 3 · Hardware Layer</span>
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-sm font-bold text-white font-sans">RP1 lgpio &amp; Sysfs</p>
              <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                Dynamic <code className="text-white">/dev/gpiochip</code> auto-discovery for Pi 5 RP1 southbridge, passive SET_PULL_NONE High-Z probing, and PMIC register polling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security, Systemd Daemon & Tech Stack */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">04 · System Deployment &amp; Tooling</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Production Systemd Service &amp; Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Systemd Daemon Card */}
          <div className="p-6 rounded-3xl bg-[#1D1D1F] dark:bg-[#121214] text-white border border-[#2C2E35] dark:border-white/[0.12] space-y-3 text-xs apple-card-shadow transition-colors">
            <div className="flex items-center justify-between text-[#C51A4A] dark:text-[#FF375F] border-b border-[#2C2E35] dark:border-white/10 pb-2">
              <span className="font-semibold uppercase text-[10px]">Persistent Service Daemon</span>
              <span>pi-diagnostics.service</span>
            </div>
            <pre className="text-[11px] text-neutral-300 leading-relaxed overflow-x-auto font-sans">
{`[Unit]
Description=Raspberry Pi Diagnostic Suite
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/pi-diagnostics
ExecStart=/home/pi/pi-diagnostics/venv/bin/python3 app.py
Environment=PORT=5001
Restart=always`}
            </pre>
          </div>

          {/* Security Architecture Card */}
          <div className="p-6 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 transition-colors">
            <h3 className="font-semibold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">Enterprise Security &amp; Rate Limiting</h3>
            <ul className="space-y-2 text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C51A4A] dark:text-[#FF375F] shrink-0 mt-0.5" />
                <span><strong>Session Management:</strong> Cookie session tokens with HttpOnly and SameSite=Lax flags.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C51A4A] dark:text-[#FF375F] shrink-0 mt-0.5" />
                <span><strong>CSRF Protection:</strong> Universal CSRF tokens validated on all mutating HTTP requests.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C51A4A] dark:text-[#FF375F] shrink-0 mt-0.5" />
                <span><strong>In-Memory Rate Limiting:</strong> Token bucket filter enforcing 120 req/min general, 20 req/min auth.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C51A4A] dark:text-[#FF375F] shrink-0 mt-0.5" />
                <span><strong>Auth Vault:</strong> PBKDF2-HMAC-SHA256 password hashing stored in restricted <code className="text-[10px] font-medium bg-white dark:bg-[#1C1C1E] px-1.5 py-0.5 rounded border border-[#E5E5EA] dark:border-[#2C2C2E]">.noc_auth/</code> vault.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {project.techStack.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Next Project Navigation (Seamless) */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pt-10 sm:pt-14 pb-20">
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block space-y-4 transition-colors"
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
