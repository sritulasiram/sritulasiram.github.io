"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Building2,
  UserCheck,
  Code2,
  Printer,
  Database,
  Cpu,
  Activity,
  Box,
  Radio,
  Clock,
  Workflow,
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

export default function WarrantyRmaCaseStudy({ project, nextProject }: Props) {
  const nextAccent = NEXT_PROJECT_ACCENT[nextProject.id] || {
    bg: "bg-[#0071E3]",
    hoverBg: "hover:bg-[#0077ED]",
    textHover: "group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]",
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Industrial Case Study Hero Section */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Semantic Accessible Breadcrumb */}
        <CaseStudyBreadcrumb title="Warranty & RMA" />

        {/* Headline & Description */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View repository on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#2C2C2E] transition-all duration-200 group shadow-2xs min-h-[44px]"
              >
                <Code2 className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>View Repository on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
              </a>
            )}
          </div>
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
              <Calendar className="w-3.5 h-3.5" /> Runtime
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.timeframe}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Architecture
            </p>
            <p className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">Flask + SQLite (WAL)</p>
          </div>
        </div>

        {/* 2. Main System Showcase Visual Viewport */}
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
          eyebrow="Platform Tour"
          title="Explore each screen."
          subtitle="From rapid multi-item customer intake to automated thermal label printing and vendor batch manifests."
          screens={project.screens}
        />
      )}

      {/* 3. Tailored Operations Pulse Deck (Real 4-Card Monitor) */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">Live Telemetry</p>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                Daily Operations &amp; Workshop Pulse Deck
              </h2>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] text-[#6E6E73] dark:text-[#A1A1A6] px-3 py-1 rounded-full hidden sm:inline-block transition-colors">
              Shift Pulse Active
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 transition-colors">
              <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#86868B]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Today&apos;s Intakes</span>
                <Activity className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">24 Units</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6]">Logged across current shift</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 transition-colors">
              <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#86868B]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Active in Pipeline</span>
                <Box className="w-4 h-4 text-[#00D084]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">38 Units</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6]">Under bench diagnosis &amp; test</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 transition-colors">
              <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#86868B]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Average SLA</span>
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">&lt; 4 Days</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Within target SLA limit</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 transition-colors">
              <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#86868B]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Duty Technicians</span>
                <UserCheck className="w-4 h-4 text-[#C51A4A] dark:text-[#FF375F]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight tabular-nums">5 PICs</p>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6]">Assigned across stations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Workflow Lifecycle Engine */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-6 transition-colors">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#0071E3] dark:text-[#2997FF] flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5" /> State Machine Pipeline
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              Deterministic Hardware Repair Lifecycle
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
              Every hardware unit entering the Cytron regional support workshop progresses through strict state transitions, enforcing technician diagnostic checklists and customer tracking notifications at each milestone.
            </p>
          </div>

          {/* Pipeline Step Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 text-xs">
            {[
              { step: "01", name: "PENDING", desc: "Customer Intake & Barcode" },
              { step: "02", name: "DIAGNOSING", desc: "Bench Inspection & Checklist" },
              { step: "03", name: "REPAIRING", desc: "Parts Swap & Soldering" },
              { step: "04", name: "TESTING", desc: "Burn-in & QA Sweep" },
              { step: "05", name: "COMPLETED", desc: "Courier Out / Customer Handover" },
              { step: "06", name: "CANCELLED", desc: "Beyond Economical Repair" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] flex flex-col justify-between space-y-1 shadow-2xs transition-colors"
              >
                <span className="text-[10px] text-[#0071E3] dark:text-[#2997FF] font-semibold">{item.step}</span>
                <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">{item.name}</span>
                <span className="text-[10px] text-[#6E6E73] dark:text-[#86868B] font-sans leading-snug">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. System Architecture Topology */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">02 · Technical Topology</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Flask Blueprint Architecture &amp; Peripheral Daemons
          </h2>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
            {project.architecture.summary}
          </p>
        </div>

        {/* 4-Tier Topology Dark Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#1D1D1F] dark:bg-[#121214] text-white border border-[#2C2E35] dark:border-white/[0.12] space-y-4 apple-card-shadow transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-neutral-400 border-b border-[#2C2E35] dark:border-white/10 pb-3">
            <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] dark:bg-[#2997FF]"></span>
              SYSTEM RUNTIME &amp; HARDWARE TOPOLOGY
            </span>
            <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-neutral-300 font-medium">
              v2.50.0 · SQLite (WAL Mode)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <p className="text-[10px] text-[#0071E3] dark:text-[#2997FF] uppercase font-semibold tracking-wider">Tier 1 · Web Interface</p>
              <p className="font-semibold text-white text-sm">8 Modular Blueprints</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Split-card repair intake, live barcode twin, supplier RMA claims, KPI pulse deck &amp; RBAC sessions.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <p className="text-[10px] text-[#0071E3] dark:text-[#2997FF] uppercase font-semibold tracking-wider">Tier 2 · Backend Core</p>
              <p className="font-semibold text-white text-sm">Flask &amp; SQLite WAL</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Write-Ahead Logging, strict foreign keys, atomic transactions &amp; high-concurrency multi-user support.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <p className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider">Tier 3 · Hardware Daemons</p>
              <p className="font-semibold text-white text-sm">Thermal Label &amp; I2C OLED</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Raw CUPS thermal label printing (60×40mm Code128), USB barcode scanning &amp; 128×64 status OLED.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <p className="text-[10px] text-purple-400 uppercase font-semibold tracking-wider">Tier 4 · Cloud &amp; Sync</p>
              <p className="font-semibold text-white text-sm">Cloudflare &amp; Telegram</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Zero Trust HTTPS tunnels, Telegram bot SLA triggers &amp; automated Google Drive/Sheets two-way sync.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Architecture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {project.architecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-2 apple-card-shadow transition-colors"
            >
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">{comp.title}</h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">{comp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Hardware Peripherals & Workshop Workbench */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">03 · Physical Peripherals</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Workbench Hardware &amp; Hardware Daemons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <div className="p-2.5 rounded-2xl bg-[#0071E3]/10 dark:bg-[#0071E3]/20 text-[#0071E3] dark:text-[#2997FF] w-fit">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Thermal Label Printer</h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Native printing of 60×40mm thermal labels with human-readable tracking identifiers and scannable Code128 barcodes via CUPS or direct <code className="text-xs font-medium bg-[#F5F5F7] dark:bg-[#1C1C1E] px-1.5 py-0.5 rounded border border-[#E5E5EA] dark:border-[#2C2C2E]">/dev/usb/lp0</code>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <div className="p-2.5 rounded-2xl bg-[#00D084]/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">128×64 I2C OLED Telemetry</h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Autonomous background daemon on Raspberry Pi (<code className="text-xs font-medium bg-[#F5F5F7] dark:bg-[#1C1C1E] px-1.5 py-0.5 rounded border border-[#E5E5EA] dark:border-[#2C2C2E]">rpi5-oled.service</code>) broadcasting LAN IP, active port, system RAM, and live Cloudflare URL.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow transition-colors">
            <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 w-fit">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Cloudflare Tunnel &amp; Telegram</h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Zero Trust HTTPS remote tunnel for floor technicians without open incoming ports, paired with real-time Telegram bot notifications for technician SLA triggers.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Database Modeling & SQLite WAL Table */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">04 · Storage Architecture</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Optimized SQLite WAL Database Schema
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6]">
            Engineered with Write-Ahead Logging (WAL Mode), strict foreign key constraints, and relational indexing to ensure zero record loss across support and logistics.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] bg-white dark:bg-[#121214] transition-colors">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border-b border-[#E5E5EA] dark:border-[#2C2C2E]">
              <tr>
                <th className="p-3.5 font-semibold">Table</th>
                <th className="p-3.5 font-semibold">Operational Function</th>
                <th className="p-3.5 font-semibold">Key Fields &amp; Constraints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA] dark:divide-[#2C2C2E] text-[#6E6E73] dark:text-[#A1A1A6]">
              <tr>
                <td className="p-3.5 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">repairs</td>
                <td className="p-3.5 font-sans">Hardware repair tickets &amp; diagnostic charges</td>
                <td className="p-3.5 font-medium">order_id, serial_number (UQ), status, charges_json</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">supplier_claims</td>
                <td className="p-3.5 font-sans">Vendor-bound RMA shipment batches</td>
                <td className="p-3.5 font-medium">rma_number (UQ), supplier_name, status, return_tracking</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">claim_invoices</td>
                <td className="p-3.5 font-sans">Multi-invoice bundling &amp; drag-move batches</td>
                <td className="p-3.5 font-medium">claim_id ➔ supplier_claims(id), invoice_no, status</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">products</td>
                <td className="p-3.5 font-sans">Master inventory catalog &amp; replacement pricing</td>
                <td className="p-3.5 font-medium">sku (UQ), model_name, default_part_price, cost</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">protection_watchlist</td>
                <td className="p-3.5 font-sans">Extended warranty monitoring &amp; cert vault</td>
                <td className="p-3.5 font-medium">serial_number (UQ), product_name, customer_name</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Tech Stack Grid */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">05 · Technology Stack</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Tooling &amp; Production Dependencies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.techStack.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 transition-colors"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Next Project Navigation (Seamless) */}
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
