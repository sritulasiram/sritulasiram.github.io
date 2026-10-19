import { LINK, PILL } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import CountUp from "@/components/shared/CountUp";
import Reveal from "@/components/shared/Reveal";
import WindowScreenViewer, { type WindowScreen } from "@/components/projects/WindowScreenViewer";
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

/* ---------- Chapter visuals ---------- */

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 font-mono text-xs font-semibold text-[var(--pa)]">{children}</span>;
}

function LightingVisual() {
  const rows = [
    { name: "Keyboard zones", note: "Controlled independently", value: "4" },
    { name: "Modes", note: "Static, breathing, strobing, colour cycle", value: "4" },
    { name: "USB feature report", note: "Reverse-engineered protocol", value: "17 bytes" },
    { name: "Command queue", note: "Serialized, so the controller never locks up", value: "10 ms" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={`${ROW} justify-between`}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{row.name}</span>
            <span className={`block text-xs ${GRAY}`}>{row.note}</span>
          </span>
          <Mono>{row.value}</Mono>
        </li>
      ))}
    </ul>
  );
}

function ThermalsVisual() {
  const rows = [
    { name: "CPU die temperature", note: "Read from AppleSMC, no root needed", value: "TC0P" },
    { name: "Fans", note: "Both blowers, in RPM", value: "2 fans" },
    { name: "Battery charge limit", note: "Set through the AsusSMC driver", value: "60 · 80 · 100%" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={`${ROW} justify-between`}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{row.name}</span>
            <span className={`block text-xs ${GRAY}`}>{row.note}</span>
          </span>
          <Mono>{row.value}</Mono>
        </li>
      ))}
    </ul>
  );
}

function DisplayVisual() {
  const modes = ["Vivid", "Cinema", "Eye Care", "FPS", "RTS / RPG", "Default"];
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3">
        {modes.map((mode, i) => (
          <li
            key={mode}
            className={`rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-xs ${
              i === 5 ? "bg-[var(--pa)] text-white dark:text-black" : `bg-[#FFFFFF] dark:bg-[#232326] ${INK}`
            }`}
          >
            {mode}
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-xs ${GRAY}`}>
        Each mode uploads 256-sample red, green and blue curves, and the original is restored on quit or sleep.
      </p>
    </div>
  );
}

function HotkeysVisual() {
  const rows = [
    { name: "Fn combinations", note: "Caught with a macOS event tap" },
    { name: "Dedicated ROG key", note: "Raw HID report, UsagePage 0xFF31 · Usage 0x0038" },
    { name: "Debounce", note: "250 ms, so one press is one action" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={ROW}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{row.name}</span>
            <span className={`block text-xs ${GRAY}`}>{row.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

const CHAPTERS: { problem: string; headline: string; body: string; visual: React.ReactNode }[] = [
  {
    problem: "Lighting locked to Windows.",
    headline: "Four zones, straight over USB.",
    body: "The keyboard’s lighting controller speaks an undocumented 17-byte protocol. The app reverse-engineers it for several ROG and TUF models and drives it directly through IOKit, with a serialized queue so the controller never locks up.",
    visual: <LightingVisual />,
  },
  {
    problem: "Thermals you can’t see.",
    headline: "Read from the silicon.",
    body: "Die temperature and fan speed come straight from the AppleSMC registers, without root. The charge limit goes through the AsusSMC driver, so the battery can be held at 60, 80 or 100 percent.",
    visual: <ThermalsVisual />,
  },
  {
    problem: "Colours that never match.",
    headline: "Six display modes.",
    body: "GameVisual profiles are rebuilt as gamma curves and uploaded through CoreGraphics. Nothing is left changed: quitting the app, or putting the Mac to sleep, puts the original curve back.",
    visual: <DisplayVisual />,
  },
  {
    problem: "Keys nobody listens to.",
    headline: "The ROG key, working.",
    body: "A global event tap catches the Fn combinations, and the dedicated ROG key is read from raw USB reports, so the physical key launches the app. It works entirely in user space.",
    visual: <HotkeysVisual />,
  },
];

const SCREENS: WindowScreen[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "The machine at a glance.",
    description:
      "System and battery details, live CPU and memory load, die temperature with thermal headroom, fan speed, and quick controls for backlight, lighting and display profile.",
    src: "/images/projects/rog-gaming-center/app.png",
    alt: "The Dashboard tab: system architecture and battery, CPU and RAM load, silicon thermal engine and hardware quick controls.",
    width: 1390,
    height: 784,
  },
  {
    id: "aura-core",
    label: "Aura Core",
    title: "Lighting you can see before you apply it.",
    description:
      "A live keyboard preview, five effects (Static, Breathing, Color Cycle, Rainbow and Strobing), brightness and tempo, then one button to send it to the keyboard.",
    src: "/images/projects/rog-gaming-center/aura-core.png",
    alt: "The Aura Core tab: a colourful keyboard preview, five lighting effect tiles, brightness and tempo controls and an Apply to Keyboard button.",
    width: 1390,
    height: 784,
  },
  {
    id: "gamevisual",
    label: "GameVisual",
    title: "Six ways to see the same screen.",
    description:
      "Display profiles from Default Standard to FPS Mode and RTS / RPG, each with its own colour strip, plus a live preview with a baseline switch to compare.",
    src: "/images/projects/rog-gaming-center/gamevisual.png",
    alt: "The GameVisual tab: six display colour calibration profiles and a real-time visual simulation with a baseline toggle.",
    width: 1390,
    height: 784,
  },
  {
    id: "settings",
    label: "Settings",
    title: "Set it once.",
    description:
      "Open at login, stay in the menu bar, pick the startup lighting, choose what the ROG key does, set a battery charge limit and look up the Fn key shortcuts.",
    src: "/images/projects/rog-gaming-center/settings.png",
    alt: "The Settings tab: system integration, lighting and controller behaviour, battery health and a function key reference.",
    width: 1390,
    height: 784,
  },
];

const NOT_NEEDED = ["Electron", "Python", "Node.js", "libusb", "Bridging headers", "Root daemons", "Kext changes"];

/* ---------- Page ---------- */

export default function RogGamingCenterCaseStudy({ project }: Props) {
  const next = PROJECTS_DATA.find((p) => p.id === "opencore-efi-hackintosh");

  return (
    <div className="project-theme selection:bg-red-500/20" style={projectThemeStyle(project.id)}>
      {/* 1. Hero */}
      <section className="bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-24 sm:pt-28 text-center`}>
          <div className="flex justify-center">
            <CaseStudyBreadcrumb title="ROG Gaming Center" />
          </div>
          <p className="mt-4 text-sm font-semibold text-[var(--pa)]">Native macOS app · Swift &amp; SwiftUI</p>
          <h1 className={`mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            Every ROG control. <span className="sm:whitespace-nowrap">Zero runtimes.</span>
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            A native app that controls the lighting, thermals, display and hotkeys of ASUS ROG and TUF laptops on macOS, without Electron or root daemons.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {project.githubUrl && (
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
            )}
            <a href="#screens" className={LINK}>
              See every screen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 sm:mt-14 pb-10 sm:pb-16 flex justify-center">
            <Image
              src={project.imageSrc}
              alt="The ROG Gaming Center dashboard showing CPU load, memory, silicon temperature, battery health and quick controls for the keyboard backlight, Aura lighting and display profile"
              width={1024}
              height={576}
              priority
              sizes="(max-width: 768px) 100vw, 880px"
              className="h-auto w-full max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <Reveal>
          <p className={`text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl ${GRAY}`}>
            On macOS, a gaming laptop’s lighting, fans, display modes and battery limits stay locked inside Windows-only utilities.{" "}
            <span className={INK}>
              ROG Gaming Center talks to the hardware directly, in plain Swift, with no runtimes and no root daemons.
            </span>
          </p>
        </Reveal>
      </section>

      {/* 3. Chapters */}
      <section id="how" aria-label="How it works" className="scroll-mt-20 pb-12 sm:pb-20">
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

      {/* 4. Every screen */}
      <section id="screens" aria-label="Every screen" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See every screen.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>Four tabs, one native app. Pick one to look closer.</p>
            <WindowScreenViewer screens={SCREENS} label="App screens" />
          </Reveal>
        </div>
      </section>

      {/* 5. What it doesn't need */}
      <section aria-label="Built without" className="py-16 sm:py-24">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>
              What it doesn’t need.
            </h2>
            <p className={`mt-3 max-w-2xl text-lg ${GRAY} leading-relaxed`}>
              Everything is Swift and SwiftUI, running in user space. A small command-line tool, rogauracore, is included for controlling the lighting from shell scripts.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {NOT_NEEDED.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-[#FFFFFF] dark:bg-[#232326] px-5 py-2.5 text-base font-medium text-[#68686D] dark:text-[#A1A1A6] line-through decoration-[var(--pa)] decoration-2 shadow-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Results */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">At a glance</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              One app. Four controls.
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
          <p className={`mt-3 text-lg ${GRAY} max-w-2xl`}>{project.timeframe} · v1.0 beta.</p>
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
      {next && (
        <section aria-label="Next project" className={`${WRAP} pb-20 sm:pb-28`}>
          <Link
            href={`/projects/${next.id}`}
            className="group block rounded-[28px] bg-[var(--pa-tint)] p-8 sm:p-12 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
          >
            <p className="text-sm font-semibold text-[var(--pa)]">The firmware behind it</p>
            <h2 className={`mt-2 text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>{next.title}</h2>
            <p className={`mt-3 max-w-2xl text-lg ${GRAY} leading-relaxed`}>{next.subtitle}</p>
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
