import { LINK, PILL } from "@/components/ui/Button";
import UnlockStatement from "@/components/projects/UnlockStatement";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import CountUp from "@/components/shared/CountUp";
import ExploreMore from "@/components/shared/ExploreMore";
import Reveal from "@/components/shared/Reveal";
import PinnedScreens from "@/components/shared/PinnedScreens";
import type { ViewerScreen } from "@/components/shared/ScreenViewer";
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

function Rows({ rows }: { rows: { name: string; note: string; value?: string }[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={`${ROW} justify-between`}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{row.name}</span>
            <span className={`block text-xs ${GRAY}`}>{row.note}</span>
          </span>
          {row.value && <Mono>{row.value}</Mono>}
        </li>
      ))}
    </ul>
  );
}

function LightingVisual() {
  return (
    <Rows
      rows={[
        { name: "Keyboard zones", note: "Coloured together or one by one", value: "4" },
        { name: "Effects", note: "Static, Breathing, Color Cycle, Rainbow, Strobe", value: "5" },
        { name: "Transaction", note: "Handshake, brightness, mode, set, apply", value: "17 bytes each" },
        { name: "Write queue", note: "Latest wins, so a colour drag never builds a backlog", value: "10 ms apart" },
      ]}
    />
  );
}

function InterfaceVisual() {
  const steps = [
    "ASUS vendor ID 0x0B05, with full-size feature reports",
    "Vendor usage pages first, then known product IDs",
    "Never mix two product IDs",
    "One lock, so the app and the CLI never interleave",
  ];
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step} className={ROW}>
          <Mono>{i + 1}</Mono>
          <span className={`text-sm font-semibold ${INK}`}>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function DisplayVisual() {
  const modes = ["Standard", "Vivid", "Eye Care", "Cinema", "FPS", "RTS / RPG"];
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3">
        {modes.map((mode, i) => (
          <li
            key={mode}
            className={`rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-xs ${
              i === 0 ? "bg-[var(--pa)] text-white dark:text-black" : `bg-[#FFFFFF] dark:bg-[#232326] ${INK}`
            }`}
          >
            {mode}
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-xs ${GRAY}`}>
        Each profile is computed from the display’s own ColorSync curve, so Standard is exactly what you had before.
      </p>
    </div>
  );
}

function ReadingsVisual() {
  return (
    <Rows
      rows={[
        { name: "CPU load and memory", note: "macOS kernel", value: "Live" },
        { name: "CPU temperature", note: "SMC, through VirtualSMC", value: "Reported" },
        { name: "Battery health and cycles", note: "AppleSmartBattery", value: "Reported" },
        { name: "Fan speed", note: "No macOS driver reads this laptop’s fans", value: "Not reported" },
      ]}
    />
  );
}

function HotkeysVisual() {
  return (
    <Rows
      rows={[
        { name: "ROG key", note: "Show the window, next preset or light on and off", value: "0x38" },
        { name: "Fn+↑ and Fn+↓", note: "Backlight brightness, with an optional overlay", value: "0xC4 · 0xC5" },
        { name: "Fn+F11", note: "Puts the Mac to sleep", value: "0x6C" },
        { name: "⌃⌥⌘ shortcuts", note: "Optional, and they work from any keyboard", value: "Any keyboard" },
      ]}
    />
  );
}

const CHAPTERS: { problem: string; headline: string; body: string; visual: React.ReactNode }[] = [
  {
    problem: "Lighting locked to Windows.",
    headline: "Four zones, straight over USB.",
    body: "The keyboard’s lighting controller speaks an undocumented protocol of 17-byte feature reports. The app sends a complete lighting state every time, and keeps only the newest one waiting, so dragging a colour picker never leaves the keyboard behind.",
    visual: <LightingVisual />,
  },
  {
    problem: "Packets in the wrong place.",
    headline: "Only the keyboard hears it.",
    body: "Version 1 could send lighting packets to any ASUS USB device, including mice and docks. Now a small, tested rule picks the one Aura interface, and a shared lock stops the app and the command-line tool from talking over each other.",
    visual: <InterfaceVisual />,
  },
  {
    problem: "Colours that never match.",
    headline: "Six display profiles.",
    body: "Profiles apply to every connected display and come back after sleep or when a display is plugged in. Gamma is left alone until you choose a profile, so Night Shift keeps working, and choosing Standard or quitting restores your calibration.",
    visual: <DisplayVisual />,
  },
  {
    problem: "Numbers you can’t trust.",
    headline: "Only real readings.",
    body: "Version 1 showed an estimated fan speed and placeholder battery values. Now every number comes from macOS, and a sensor that isn’t there says Not reported. Readings are only taken while the Dashboard or Status screen is open.",
    visual: <ReadingsVisual />,
  },
  {
    problem: "Keys that fired everywhere.",
    headline: "Only the keys on the keyboard.",
    body: "macOS tags every arrow and F-key with the function modifier, so the old key monitor acted on ordinary presses in other apps. Now the ROG key, Fn+↑, Fn+↓ and Fn+F11 are read straight from the controller, and everything else is left to macOS.",
    visual: <HotkeysVisual />,
  },
];

const SCREENS: ViewerScreen[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "The machine at a glance.",
    description:
      "CPU load with history, memory, CPU temperature with its status, battery charge, health and cycles, the system, and quick keyboard controls.",
    src: "/images/projects/rog-gaming-center/app.png",
    alt: "The Dashboard: processor load chart at 4%, memory at 52%, CPU temperature 55°C, battery 100% with 94% health, keyboard controls and macOS Tahoe system details.",
  },
  {
    id: "lighting",
    label: "Lighting",
    title: "See it before the keyboard does.",
    description:
      "A live four-zone preview that matches what the hardware can do, five effects with speed, brightness, and built-in and saved presets.",
    src: "/images/projects/rog-gaming-center/lighting.png",
    alt: "The Lighting screen: a keyboard preview in teal, purple, red and lime zones, backlight and brightness controls, effect and speed pickers with Rainbow selected, and presets.",
  },
  {
    id: "display",
    label: "Display",
    title: "Six ways to see the same screen.",
    description:
      "Standard, Vivid, Eye Care, Cinema, FPS and RTS / RPG, with a test pattern to compare them: each grey step should stay distinct from its neighbours.",
    src: "/images/projects/rog-gaming-center/display.png",
    alt: "The Display screen: six display profiles with Standard selected, and a test pattern of grey steps and red, blue and green ramps.",
  },
  {
    id: "status",
    label: "Status",
    title: "When something’s wrong, it says so.",
    description:
      "The keyboard controller and its product ID, the Input Monitoring permission, which sensors macOS reports, a re-sync button and an event log.",
    src: "/images/projects/rog-gaming-center/status.png",
    alt: "The Status screen: keyboard connected on ITE Device 8910, product ID 0x1869, Input Monitoring allowed, SMC available, CPU temperature reported and fan speed not reported.",
  },
];

const EXTRAS: { label: string; title: string; body: string; src: string; alt: string; width: number; height: number }[] = [
  {
    label: "Settings · Keyboard",
    title: "Your keys, your way.",
    body: "Choose what the ROG key does, show a brightness overlay for Fn+↑ and Fn+↓, and turn on ⌃⌥⌘ shortcuts that work from any keyboard.",
    src: "/images/projects/rog-gaming-center/settings-keyboard.png",
    alt: "Keyboard settings: ROG key action, brightness overlay, and keyboard shortcuts for backlight brightness, presets and on or off.",
    width: 612,
    height: 772,
  },
  {
    label: "Menu bar",
    title: "The everyday controls.",
    body: "Light on or off, brightness, the lighting preset and the display profile, without opening the window.",
    src: "/images/projects/rog-gaming-center/menu-bar.png",
    alt: "The menu bar panel: a keyboard light switch, brightness slider, lighting and display pickers, and open, settings and quit commands.",
    width: 306,
    height: 292,
  },
  {
    label: "Settings · General",
    title: "Runs quietly.",
    body: "Open at login, hide the Dock icon and keep running in the menu bar. Lighting comes back after sleep.",
    src: "/images/projects/rog-gaming-center/settings-general.png",
    alt: "General settings: open at login, show icon in the Dock, and keep running in the menu bar when the window is closed.",
    width: 612,
    height: 425,
  },
];

const NOT_NEEDED = ["Electron", "Python", "Node.js", "libusb", "Root privileges", "Kexts for lighting", "Estimated readings"];

const MODULES = [
  { name: "AuraCore", note: "Packets, effects, key decoding and display curves. Pure Swift, unit-tested." },
  { name: "AuraHID", note: "The only code that touches the keyboard controller." },
  { name: "ROG Gaming Center", note: "The SwiftUI app, its menu bar panel and Settings." },
  { name: "rogauracore", note: "The command-line tool, with --diagnose and --keys." },
];

/* ---------- Page ---------- */

export default function RogGamingCenterCaseStudy({ project }: Props) {
  const next = PROJECTS_DATA.find((p) => p.id === "opencore-efi-hackintosh");

  return (
    <div className="project-theme selection:bg-red-500/20" style={projectThemeStyle(project.id)}>
      {/* 1. Hero */}
      <section className="hero-glow hero-glow-rog overflow-hidden">
        <div className={`${WRAP} pt-10 sm:pt-14 text-center`}>
          <div className="flex justify-center">
            <CaseStudyBreadcrumb title="ROG Gaming Center" />
          </div>
          <p className="mt-4 text-sm font-semibold text-[var(--pa)]">Native macOS app · Swift &amp; SwiftUI · Version 2</p>
          <h1 className={`mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            Every ROG control. <span className="sm:whitespace-nowrap">Zero runtimes.</span>
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            Keyboard lighting, system vitals and display profiles for ASUS ROG laptops running macOS. Rebuilt from the core as a native SwiftUI app, with nothing running as root.
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
              alt="The ROG Gaming Center dashboard showing processor load, memory, CPU temperature, battery health, keyboard controls and system details"
              width={1397}
              height={825}
              priority
              sizes="(max-width: 768px) 100vw, 880px"
              className="h-auto w-full max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <UnlockStatement
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          problem="On macOS, a ROG laptop’s keyboard lighting, display modes and hotkeys stay locked inside Armoury Crate, which only runs on Windows."
          answer="ROG Gaming Center brings them back as one native app, in plain Swift."
          marks={[
            { phrase: "lighting", kind: "rgb" },
            { phrase: "display modes", kind: "profile" },
          ]}
        />
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
      <section id="screens" aria-label="Every screen" className="scroll-mt-20 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See every screen.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>Four screens in one native window. Scroll to see each one.</p>
            <PinnedScreens screens={SCREENS} fitWidth />
          </Reveal>
        </div>
      </section>

      {/* 5. Menu bar and Settings */}
      <section id="menu-bar" aria-label="Menu bar and Settings" className="scroll-mt-20 py-16 sm:py-24">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08]`}>
              <span className={`block ${GRAY}`}>Close the window.</span>
              <span className={`block ${INK}`}>It stays out of the way.</span>
            </h2>
            <p className={`mt-5 max-w-2xl text-lg ${GRAY} leading-relaxed`}>
              The everyday controls live in the menu bar, and everything else is in a standard Settings window, opened with ⌘,.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {EXTRAS.map((extra, i) => (
              <Reveal key={extra.src} delay={i * 80} className={i === 0 ? "md:row-span-2" : ""}>
                <figure className="flex h-full flex-col rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-8">
                  <figcaption>
                    <p className="text-sm font-semibold text-[var(--pa)]">{extra.label}</p>
                    <h3 className={`mt-1 text-xl sm:text-2xl font-semibold ${INK} tracking-apple-hero`}>{extra.title}</h3>
                    <p className={`mt-2 text-base ${GRAY} leading-relaxed`}>{extra.body}</p>
                  </figcaption>
                  <div className="mt-6 flex flex-1 items-center justify-center">
                    <Image
                      src={extra.src}
                      alt={extra.alt}
                      width={extra.width}
                      height={extra.height}
                      sizes={`(max-width: 768px) 100vw, ${extra.width}px`}
                      className="h-auto w-full"
                      style={{ maxWidth: extra.width }}
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. What it doesn't need */}
      <section aria-label="Built without" className="py-16 sm:py-24">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>
              What it doesn’t need.
            </h2>
            <p className={`mt-3 max-w-2xl text-lg ${GRAY} leading-relaxed`}>
              Everything is Swift and SwiftUI, running in user space. No kexts are needed for lighting, and every reading comes from macOS.
            </p>
          </Reveal>
          <Reveal delay={80}>
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
          <Reveal delay={80}>
            <p className={`mt-14 max-w-2xl text-lg ${GRAY} leading-relaxed`}>
              Four modules, so the hardware logic is tested without the hardware.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {MODULES.map((module) => (
                <li key={module.name} className={ROW}>
                  <span className="min-w-0">
                    <span className={`block font-mono text-sm font-semibold ${INK}`}>{module.name}</span>
                    <span className={`block text-xs ${GRAY}`}>{module.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7. Results */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">At a glance</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Rebuilt from the core.
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

      {/* 8. Keep exploring */}
      {next && <ExploreMore projectId={project.id} nextProject={next} nextKicker="The firmware behind it" />}
    </div>
  );
}
