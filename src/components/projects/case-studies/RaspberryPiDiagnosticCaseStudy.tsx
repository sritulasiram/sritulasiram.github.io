import RecordGapStatement from "@/components/projects/RecordGapStatement";
import BeforeAfter from "@/components/shared/BeforeAfter";
import CountUp from "@/components/shared/CountUp";
import ExploreMore from "@/components/shared/ExploreMore";
import { Fn, Footnotes } from "@/components/shared/Footnotes";
import Reveal from "@/components/shared/Reveal";
import PinnedScreens from "@/components/shared/PinnedScreens";
import type { ViewerScreen } from "@/components/shared/ScreenViewer";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import PiBoardShowcase from "@/components/projects/visuals/PiBoardShowcase";
import PiPinMap from "@/components/projects/visuals/PiPinMap";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const PANEL =
  "rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-10 min-h-[320px] flex flex-col justify-center";
const ROW = "flex items-center gap-3 rounded-2xl bg-white dark:bg-[#232326] px-4 py-3.5 shadow-xs";

const PAGE_DIR = "/images/projects/raspberry-pi-diagnostics/pages";

const SCREENS: ViewerScreen[] = [
  {
    id: "login",
    label: "Sign in",
    title: "A passcode keeps the bench private.",
    description: "Even the sign-in screen shows live host telemetry: platform, CPU load and temperature, memory and disk, power and port.",
    src: `${PAGE_DIR}/login.webp`,
    alt: "The sign-in screen: a passcode box on the right and four live host telemetry cards on the left.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    title: "The board at a glance.",
    description: "Device details, a live board layout, vitals, memory, storage and network, with shutdown, reboot, restart, cache and bootloader controls.",
    src: `${PAGE_DIR}/dashboard.webp`,
    alt: "The Dashboard page: device overview, board layout, system vitals, memory, controls, storage and a network chart.",
  },
  {
    id: "diagnostics-page",
    label: "Diagnostics",
    title: "Every subsystem on one page.",
    description: "Compute, power and storage on the left, the 40-pin map in the middle, radios and external interfaces on the right, and the Run All bar at the bottom.",
    src: `${PAGE_DIR}/diagnostics.webp`,
    alt: "The Diagnostics page after a complete run: processor thermals, DRAM, power audit, a 40-pin map, radio and network cards, USB and HDMI, and a run bar showing 19 of 19 passed.",
  },
  {
    id: "network",
    label: "Network",
    title: "Know the connection.",
    description: "Identity and path, latency, jitter and packet loss, interface status, live traffic, signal strength and throughput.",
    src: `${PAGE_DIR}/network.webp`,
    alt: "The Network page: network identity, active path topology, ICMP latency chart, wireless and Ethernet status, traffic metrics, RF signal and throughput charts.",
  },
  {
    id: "records-page",
    label: "Records",
    title: "Every session, every board.",
    description: "A device registry, session history with inspection notes, and a result for each of the 19 subsystems.",
    src: `${PAGE_DIR}/records.webp`,
    alt: "The Records page: a device registry, four test sessions, session notes and a status pill for each of the 19 subsystems.",
  },
  {
    id: "report",
    label: "Report",
    title: "The certificate, ready to print.",
    description: "A reference ID, the unit’s spec sheet, a verdict and one row per test, with the person in charge named and a Print Report or Save as PDF button.",
    src: `${PAGE_DIR}/report.webp`,
    alt: "A hardware diagnostic report with a reference ID, a conformant and passed verdict, the unit under test specifications and a table of test vectors, each marked passed.",
  },
  {
    id: "about",
    label: "About",
    title: "Built for the support team.",
    description: "Live telemetry, interactive tests, signed records and printable reports, all following one four-step lifecycle from triage to report.",
    src: `${PAGE_DIR}/about.webp`,
    alt: "The About page: the platform summary, what the suite gives the team, a four-step validation lifecycle and the operating specifications.",
  },
];

/* ---------- Chapter visuals ---------- */

function PhasesVisual() {
  const phases = [
    { name: "Platform & Ports", count: 10 },
    { name: "Radio & Network", count: 3 },
    { name: "Storage", count: 3 },
    { name: "Compute & Power", count: 3 },
  ];
  return (
    <ol className="space-y-3">
      {phases.map((phase, i) => (
        <li key={phase.name} className={`${ROW} justify-between`}>
          <span className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[var(--pa-soft)] text-xs font-semibold flex items-center justify-center text-[var(--pa)]">
              {i + 1}
            </span>
            <span className={`text-sm font-semibold ${INK}`}>{phase.name}</span>
          </span>
          <span className={`text-sm tabular-nums ${GRAY}`}>{phase.count} tests</span>
        </li>
      ))}
      <li className={`text-xs ${GRAY} pt-1`}>The storage tests run apart from the network tests, and the power audit runs alone, so neither skews the other.</li>
    </ol>
  );
}

function DriverVisual() {
  const rows = [
    { board: "Raspberry Pi 5", via: "lgpio on the RP1, chip found automatically" },
    { board: "Pi 4, 3 and Zero 2 W", via: "gpiozero, with lgpio or RPi.GPIO as backups" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.board} className={`${ROW} justify-between`}>
          <span className={`text-sm font-semibold ${INK}`}>{row.board}</span>
          <span className={`text-sm ${GRAY} text-right`}>{row.via}</span>
        </li>
      ))}
      <li className={`text-xs ${GRAY} pt-1`}>The right driver is picked automatically at start-up.</li>
    </ul>
  );
}

function CertificateVisual() {
  return (
    <div
      role="img"
      aria-label="A test certificate with a reference ID, 19 vectors, and an HMAC-SHA256 seal."
      className="rounded-2xl bg-white dark:bg-[#232326] p-6 shadow-xs space-y-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold ${GRAY}`}>RMA test certificate</p>
          <p className={`mt-1 font-mono text-sm font-semibold ${INK}`}>DOC-RMA-YYYYMMDD-XXXX</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          19 vectors
        </span>
      </div>
      <div className="space-y-2" aria-hidden="true">
        {[100, 82, 64].map((w) => (
          <div key={w} className="h-2 rounded-full bg-black/[0.06] dark:bg-white/10" style={{ width: `${w}%` }} />
        ))}
      </div>
      <p className={`border-t border-black/[0.06] dark:border-white/10 pt-4 font-mono text-[11px] ${GRAY}`}>
        HMAC-SHA256 · record seal
      </p>
    </div>
  );
}

const FOOTNOTES = [
  "An estimate of the previous manual process. The automated sweep has not been timed since the four-phase run plan was introduced.",
  "The seal is an HMAC-SHA256 over the whole record, keyed with the application’s secret. A printed report stops matching the stored record if results are edited afterwards.",
  "Counted from the run plan in the diagnostics manager: 10 platform and port tests, 3 radio and network, 3 storage, and 3 compute and power.",
  "The storage tests run in their own phase, apart from the network tests, and the power audit runs alone after the compute sweep. Within the storage phase, its three tests run together.",
  "Each test runs in its own thread with a 180-second limit. If it hangs, it is reported as failed and the hardware lock is released.",
];

const RESULT_FN: Record<string, number> = { "Diagnostic Vectors": 3, "Run Phases": 4, "Per-Test Ceiling": 5 };

function StepList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`${ROW} text-sm font-medium ${GRAY}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

const CHAPTERS: { problem?: string; challenge?: string; headline: string; body: string; fn?: number; visual: React.ReactNode }[] = [
  {
    problem: "Up to 20 minutes by hand.",
    headline: "19 checks. One button.",
    body: "Technicians used to toggle pins from the command line and probe a 40-pin header with a multimeter, then plug in each peripheral by hand. Run All now works through the platform, radios, storage, compute and power in four phases.",
    fn: 1,
    visual: (
      <BeforeAfter
        before={
          <StepList
            items={["Toggle pins from the command line", "Probe 40 pins with a multimeter", "Plug in each peripheral by hand"]}
          />
        }
        after={<PhasesVisual />}
      />
    ),
  },
  {
    problem: "One slipped probe.",
    headline: "No probes. No risk.",
    body: "Pins are read with the board’s own internal pull-ups, and every line is released straight afterwards, even if a read fails. No probes and no loopback wiring.",
    visual: <PiPinMap />,
  },
  {
    problem: "Every board, one tool.",
    headline: "One suite for every Pi.",
    body: "On a Pi 5 it talks to the RP1 directly and finds the right GPIO chip on its own. On older boards it falls back to the libraries they already support.",
    visual: <DriverVisual />,
  },
  {
    problem: "Nothing on record.",
    headline: "A signed report for every board.",
    body: "Every session is stored against the board’s serial number, so a unit’s whole test history is one click away. Each one prints as a two-page manifest and certificate with a technician sign-off, sealed with an HMAC-SHA256 that changes if stored results are edited.",
    fn: 2,
    visual: <CertificateVisual />,
  },
];

export default function RaspberryPiDiagnosticCaseStudy({ project, nextProject }: Props) {
  return (
    <div className="selection:bg-rose-500/20">
      {/* 1. Hero */}
      <section className="bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-14 sm:pt-20 text-center`}>
          <p className={`text-xl sm:text-2xl font-semibold ${INK} tracking-apple-tight`}>{project.title}</p>
          <h1 className={`mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            Every board. <span className="whitespace-nowrap">19 checks.</span>
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            {project.tagline}
          </p>
          <div className="mt-10 sm:mt-14 mx-auto w-full max-w-4xl">
            <MacbookPro src={project.imageSrc} priority fit="cover" className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <RecordGapStatement
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          problem="Every test on a returned Raspberry Pi was done by hand, and one slip could short circuit the board."
          answer="None of it was recorded, so there was no database and no history to check."
          marks={[
            { phrase: "by hand", kind: "hand" },
            { phrase: "short circuit", kind: "danger" },
            { phrase: "no database", kind: "ghost" },
            { phrase: "no history", kind: "ghost" },
          ]}
          badge="0 records"
        />
      </section>

      {/* 3. Chapters: each challenge paired with its fix */}
      <section aria-label="How it solves it" className="pb-12 sm:pb-20">
        {CHAPTERS.map((chapter, i) => (
          <div key={chapter.headline} className={`${WRAP} py-14 sm:py-24`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08]">
                  <span className={`block ${GRAY}`}>{chapter.problem}</span>
                  <span className={`block ${INK}`}>{chapter.headline}</span>
                </h2>
                <p className={`mt-5 text-base sm:text-lg ${GRAY} leading-relaxed`}>{chapter.body}
                  {chapter.fn ? <Fn n={chapter.fn} /> : null}
                </p>
              </Reveal>
              <Reveal delay={120} className={i % 2 ? "md:order-1" : ""}>
                <div className={PANEL}>{chapter.visual}</div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Screens */}
      <section aria-label="Screens" className="max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-32">
        <Reveal>
          <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See it in action.</h2>
          <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>Seven screens, from sign-in to the printable report. Sample data shown.</p>
          <PinnedScreens screens={SCREENS} />
        </Reveal>
      </section>

      {/* 5. Supported boards */}
      <section aria-label="Supported boards" className="py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero`}>Works with the whole fleet.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} max-w-2xl`}>From the Pi 5 to the Zero 2 W, one workbench handles whatever comes in.</p>
            <PiBoardShowcase />
          </Reveal>
        </div>
      </section>

      {/* 6. Result */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">Built to hold up</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Predictable under load.
            </h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {project.results.map((result, i) => (
              <Reveal key={result.label} delay={i * 80}>
                <dt className="text-sm font-semibold text-[var(--pa-d)]">{result.label}</dt>
                <dd className="mt-1 text-6xl sm:text-7xl font-semibold tracking-apple-hero tabular-nums"><CountUp value={result.metric} /></dd>
                <dd className="mt-3 text-sm text-[#A1A1A6] leading-relaxed">
                  {result.description}
                  {RESULT_FN[result.label] ? <Fn n={RESULT_FN[result.label]} size="text-[0.8em]" /> : null}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <ExploreMore projectId={project.id} nextProject={nextProject} />

      <Footnotes items={FOOTNOTES} />
    </div>
  );
}
