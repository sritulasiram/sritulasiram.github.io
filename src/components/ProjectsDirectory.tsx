import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import EngineeringWorkflowKit from "./EngineeringWorkflowKit";

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const IMPACT_METRICS = [
  {
    metric: "< 60s",
    label: "Bench Triage Duration",
    subtext: "19-vector automated sweeps (down from 20-min manual triage)",
    accentColor: "text-[#C51A4A] dark:text-[#FF4A7A]",
    bgAccent: "bg-[#C51A4A]/10",
  },
  {
    metric: "19",
    label: "Forensic Probes",
    subtext: "Passive High-Z GPIO line checks with 0V short isolation",
    accentColor: "text-[#0071E3] dark:text-[#2997FF]",
    bgAccent: "bg-[#0071E3]/10",
  },
  {
    metric: "1,000+",
    label: "RMA Units Processed",
    subtext: "Thermal Code128 barcodes tracked in SQLite WAL operations ledger",
    accentColor: "text-[#1E7E34] dark:text-[#00D084]",
    bgAccent: "bg-[#1E7E34]/10",
  },
  {
    metric: "0 MB",
    label: "Daemon Footprint",
    subtext: "Pure user-space Swift & IOKit app running with zero background daemons",
    accentColor: "text-[#AF52DE] dark:text-[#D187FF]",
    bgAccent: "bg-[#AF52DE]/10",
  },
];

export default function ProjectsDirectory() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ============================================================ */}
      {/* 1. Systems Impact Telemetry Strip                            */}
      {/* ============================================================ */}
      <section aria-label="Systems Impact Telemetry" className="max-w-6xl mx-auto px-6 sm:px-8 space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
          Impact Telemetry
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {IMPACT_METRICS.map((item) => (
            <div
              key={item.label}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-white/10 apple-card-shadow space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight ${item.accentColor}`}>
                  {item.metric}
                </span>
                <span className={`w-2 h-2 rounded-full ${item.bgAccent}`} />
              </div>
              <div className="space-y-0.5 pt-1">
                <h4 className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {item.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Systems Architecture Case Study Showcase (Side-by-Side)   */}
      {/* ============================================================ */}
      <section aria-label="Case Study" className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-12">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            From Bootloader to Native App
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl leading-relaxed">
            What started as a hobbyist Hackintosh build turned into a full systems exercise — engineering custom UEFI ACPI patches for PC hardware, then writing a native Swift suite to control thermals and lighting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Project 1: ROG Gaming Center macOS App */}
          <div className="min-w-0 w-full space-y-6 sm:space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                  ROG Gaming Center
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
                  Native Swift &amp; Hardware Telemetry Suite
                </p>
              </div>

              {/* App Screenshot */}
              <div className="w-full">
                <Image
                  src="/images/rog-gaming-center-app.png"
                  alt="ROG Gaming Center macOS App Interface"
                  width={1024}
                  height={577}
                  className="w-full h-auto transition-transform duration-300 hover:scale-[1.01]"
                  priority
                />
              </div>

              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                A lightweight native macOS alternative to proprietary vendor utilities. Communicates directly with onboard USB HID microcontrollers for 4-zone Aura RGB lighting, reads AppleSMC silicon thermal registers, and manages fan profiles and battery thresholds with zero background daemons.
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/projects/rog-gaming-center"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1D1D1F] dark:bg-white dark:text-[#1D1D1F] hover:bg-black dark:hover:bg-neutral-200 transition-all shadow-2xs hover:brightness-110 active:scale-98 min-h-[44px]"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://github.com/sritulasiram/ROG-Gaming-Center-macOS-App"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white inline-flex items-center gap-1.5 min-h-[44px]"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Project 2: OpenCore EFI Hackintosh Architecture */}
          <div className="min-w-0 w-full space-y-6 sm:space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                  OpenCore EFI Hackintosh
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
                  Bespoke UEFI Boot Architecture &amp; ACPI Hotpatching
                </p>
              </div>

              {/* App Screenshot */}
              <div className="w-full">
                <Image
                  src="/images/opencore-configurator-app.png"
                  alt="OpenCore Configurator ACPI Architecture"
                  width={1024}
                  height={575}
                  className="w-full h-auto transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>

              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Production-grade UEFI bootloader architecture for the ASUS ROG Strix GL503GE. Features custom ACPI SSDT hotpatches, Coffee Lake UHD 630 framebuffer routing, power-gating the discrete GTX 1050 Ti to eliminate battery drain, and reliable S3 sleep/wake across macOS Sonoma and Sequoia.
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/projects/opencore-efi-hackintosh"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1D1D1F] dark:bg-white dark:text-[#1D1D1F] hover:bg-black dark:hover:bg-neutral-200 transition-all shadow-2xs hover:brightness-110 active:scale-98 min-h-[44px]"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://github.com/sritulasiram/ASUS-ROG-Strix-GL503GE-Hackintosh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white inline-flex items-center gap-1.5 min-h-[44px]"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Engineering Workflow, Tools, Silicon & Platforms          */}
      {/* ============================================================ */}
      <EngineeringWorkflowKit />

      {/* ============================================================ */}
      {/* 4. Open Source Ecosystem & General GitHub Info               */}
      {/* ============================================================ */}
      <section
        aria-label="GitHub and Open Source"
        className="max-w-6xl mx-auto px-6 sm:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
              GitHub
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              Explore the Source Code
            </h2>
            <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1">
              Public repositories, bench tools, and open-source contributions from bench to production.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://github.com/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#1D1D1F] dark:bg-white dark:text-[#1D1D1F] hover:bg-black dark:hover:bg-neutral-200 transition-all shadow-2xs hover:brightness-110 active:scale-98 min-h-[44px]"
            >
              <GitHubIcon className="w-4 h-4 fill-current" />
              <span>Explore @sritulasiram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
