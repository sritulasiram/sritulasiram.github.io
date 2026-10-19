import { LINK, PILL } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import CountUp from "@/components/shared/CountUp";
import Reveal from "@/components/shared/Reveal";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import { PROJECTS_DATA } from "@/data/content";
import { projectThemeStyle } from "@/data/projectTheme";
import type { CaseStudy } from "@/types";

interface Props {
  project: CaseStudy;
}

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const PANEL =
  "rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-10 min-h-[320px] flex flex-col justify-center";
const ROW = "flex items-center gap-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#232326] px-4 py-3.5 shadow-xs";

const IMG = "/images/projects/opencore-efi-hackintosh";

/* ---------- Chapter visuals ---------- */

function Pill({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "muted" }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
        tone === "accent" ? "bg-[var(--pa-soft)] text-[var(--pa)]" : "bg-black/[0.06] dark:bg-white/10 " + GRAY
      }`}
    >
      {children}
    </span>
  );
}

function GpuVisual() {
  return (
    <ul className="space-y-3">
      <li className={`${ROW} justify-between`}>
        <span className="min-w-0">
          <span className={`block text-sm font-semibold ${INK}`}>Intel UHD Graphics 630</span>
          <span className={`block text-xs ${GRAY}`}>Drives the display</span>
        </span>
        <Pill>Working</Pill>
      </li>
      <li className={`${ROW} justify-between`}>
        <span className="min-w-0">
          <span className={`block text-sm font-semibold ${INK}`}>NVIDIA GTX 1050 Ti Mobile</span>
          <span className={`block text-xs ${GRAY}`}>Unsupported on macOS</span>
        </span>
        <Pill tone="muted">Powered down</Pill>
      </li>
      <li className={`${ROW} justify-between`}>
        <span className={`text-sm font-medium ${GRAY}`}>SSDT-Disable_GPU_PEG0.aml</span>
        <span className="shrink-0 font-mono text-xs font-semibold text-[var(--pa)]">_OFF</span>
      </li>
      <li className={`text-xs ${GRAY} pt-1`}>The card is switched off electrically, so it can’t drain the battery or heat the chassis.</li>
    </ul>
  );
}

function SleepVisual() {
  const rows = [
    { name: "SSDT-GPRW", note: "Stops USB devices waking the machine instantly" },
    { name: "fix_sleep_pmset.sh", note: "Enforces clean S3 sleep and lid-close detection" },
    { name: "15-port XHCI map", note: "Compliant USB mapping, no controller reset loops" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={ROW}>
          <span className="min-w-0">
            <span className={`block font-mono text-xs font-semibold text-[var(--pa)]`}>{row.name}</span>
            <span className={`block text-sm ${GRAY}`}>{row.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function TrackpadVisual() {
  const rows = [
    { name: "1 to 4 finger gestures", note: "Native Apple multi-touch" },
    { name: "Smooth scrolling", note: "Through VoodooI2C and VoodooI2CHID" },
    { name: "Palm rejection", note: "Enabled by correct GPIO pin interrupts" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={`${ROW} justify-between`}>
          <span className={`text-sm font-semibold ${INK}`}>{row.name}</span>
          <span className={`text-sm text-right ${GRAY}`}>{row.note}</span>
        </li>
      ))}
      <li className={`text-xs ${GRAY} pt-1`}>The fix is one table: SSDT-GPI0.</li>
    </ul>
  );
}

function KeysVisual() {
  return (
    <div className="space-y-3">
      <div className={`${ROW} justify-between`}>
        <span className="min-w-0">
          <span className={`block text-sm font-semibold ${INK}`}>F1 to F12</span>
          <span className={`block text-xs ${GRAY}`}>Physical legends and media hotkeys</span>
        </span>
        <span className="shrink-0 font-mono text-xs font-semibold text-[var(--pa)]">setup_function_keys.sh</span>
      </div>
      <div className={`${ROW} justify-between`}>
        <span className="min-w-0">
          <span className={`block text-sm font-semibold ${INK}`}>4-zone Aura RGB</span>
          <span className={`block text-xs ${GRAY}`}>Handled by the companion app</span>
        </span>
        <Pill tone="muted">ROG Gaming Center</Pill>
      </div>
    </div>
  );
}

const CHAPTERS: { problem: string; headline: string; body: string; visual: React.ReactNode }[] = [
  {
    problem: "A GPU macOS can’t use.",
    headline: "Switched off at the firmware.",
    body: "The laptop’s discrete NVIDIA GTX 1050 Ti has no macOS driver, and left on it burns battery and heats the chassis. A custom ACPI table runs the card’s _OFF routine at boot, so only the Intel graphics stay in use.",
    visual: <GpuVisual />,
  },
  {
    problem: "A laptop that wakes itself.",
    headline: "Sleep that actually sleeps.",
    body: "Sleep and wake are a classic Hackintosh weak spot. One table stops USB triggers waking the laptop instantly, a script enforces clean S3 sleep and lid-close detection, and a 15-port USB map avoids reset loops.",
    visual: <SleepVisual />,
  },
  {
    problem: "A trackpad that won’t gesture.",
    headline: "Native multi-touch.",
    body: "The I2C trackpad needs its GPIO pin interrupts routed correctly before macOS will see it. With that patched, VoodooI2C delivers Apple’s own gestures, scrolling and palm rejection.",
    visual: <TrackpadVisual />,
  },
  {
    problem: "Function keys gone quiet.",
    headline: "Every key does its job.",
    body: "A setup script restores the physical F1 to F12 legends and media hotkeys. Lighting control is left to the native companion app, which talks to the hardware directly.",
    visual: <KeysVisual />,
  },
];

/* ---------- Page ---------- */

export default function OpenCoreEfiCaseStudy({ project }: Props) {
  const rog = PROJECTS_DATA.find((p) => p.id === "rog-gaming-center");

  return (
    <div className="project-theme selection:bg-indigo-500/20" style={projectThemeStyle(project.id)}>
      {/* 1. Hero */}
      <section className="bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-24 sm:pt-28 text-center`}>
          <div className="flex justify-center">
            <CaseStudyBreadcrumb title="OpenCore EFI Hackintosh" />
          </div>
          <p className="mt-4 text-sm font-semibold text-[var(--pa)]">macOS firmware engineering · OpenCore 1.0.7</p>
          <h1 className={`mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            A Mac, <span className="sm:whitespace-nowrap">from a gaming laptop.</span>
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            {project.tagline}
          </p>
          {project.githubUrl && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the repository on GitHub (opens in a new tab)"
                className={PILL}
              >
                View the repo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#config" className={LINK}>
                See the config
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
          <div className="mt-10 sm:mt-14 mx-auto w-full max-w-4xl">
            <MacbookPro src={project.imageSrc} priority fit="cover" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <Reveal>
          <p className={`text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl ${GRAY}`}>
            Hackintosh fixes are scattered across forum threads, old blog posts and buried repositories, and the drivers rarely agree.{" "}
            <span className={INK}>
              This EFI gathers the patches, quirks and configs into one tested build for the ASUS ROG Strix GL503GE.
            </span>
          </p>
        </Reveal>
      </section>

      {/* 3. Chapters */}
      <section aria-label="How it solves it" className="pb-12 sm:pb-20">
        {CHAPTERS.map((chapter, i) => (
          <div key={chapter.headline} className={`${WRAP} py-14 sm:py-24`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08]">
                  <span className={`block ${GRAY}`}>{chapter.problem}</span>
                  <span className={`block ${INK}`}>{chapter.headline}</span>
                </h2>
                <p className={`mt-5 text-base sm:text-lg ${GRAY} leading-relaxed`}>{chapter.body}</p>
              </Reveal>
              <Reveal delay={120} className={i % 2 ? "md:order-1" : ""}>
                <div className={PANEL}>{chapter.visual}</div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* 4. The config */}
      <section id="config" aria-label="The configuration" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See what’s inside.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} text-center max-w-2xl mx-auto`}>
              The config.plist in OpenCore Configurator, with twelve custom ACPI tables loaded.
            </p>
            <div className="mx-auto max-w-4xl">
              <Image
                src={`${IMG}/configurator-app.png`}
                alt="OpenCore Configurator showing config.plist with twelve SSDT tables enabled in the ACPI section"
                width={1024}
                height={575}
                sizes="(max-width: 1024px) 100vw, 880px"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Results */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">Verified on this machine</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Works like it was made for it.
            </h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {project.results.map((result, i) => (
              <Reveal key={result.label} delay={i * 80}>
                <dt className="text-sm font-semibold text-[var(--pa-d)]">{result.label}</dt>
                <dd className="mt-1 text-6xl sm:text-7xl font-semibold tracking-apple-hero tabular-nums">
                  <CountUp value={result.metric} />
                </dd>
                <dd className="mt-3 text-sm text-[#A1A1A6] leading-relaxed">{result.description}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 6. Tech specs */}
      <section aria-label="Technical stack" className={`${WRAP} py-20 sm:py-28`}>
        <Reveal>
          <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero`}>Under the hood.</h2>
          <p className={`mt-3 text-lg ${GRAY} max-w-2xl`}>
            {project.timeframe} · Tested against BIOS 319 on an ASUS ROG Strix GL503GE.
          </p>
        </Reveal>
        <div className="mt-12 divide-y divide-black/[0.08] dark:divide-white/10 border-y border-black/[0.08] dark:border-white/10">
          {project.techStack.map((group) => (
            <Reveal key={group.category}>
              <div className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                <h3 className={`text-sm font-semibold ${INK}`}>{group.category}</h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[var(--pa-tint)] px-3.5 py-1.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Next project */}
      {rog && (
        <section aria-label="Next project" className={`${WRAP} pb-20 sm:pb-28`}>
          <Link
            href={`/projects/${rog.id}`}
            className="group block rounded-[28px] bg-[var(--pa-tint)] p-8 sm:p-12 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
          >
            <p className="text-sm font-semibold text-[var(--pa)]">The companion app</p>
            <h2 className={`mt-2 text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>{rog.title}</h2>
            <p className={`mt-3 max-w-2xl text-lg ${GRAY} leading-relaxed`}>{rog.subtitle}</p>
            <span className="mt-8 inline-flex items-center gap-1 text-[17px] text-[var(--pa)] group-hover:underline">
              Explore the case study
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
