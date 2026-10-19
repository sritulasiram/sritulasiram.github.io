import { ArrowRight, ArrowLeftRight, Bot, Cloud, FileSpreadsheet, Monitor, ShieldCheck, type LucideIcon } from "lucide-react";
import BeforeAfter from "@/components/shared/BeforeAfter";
import CountUp from "@/components/shared/CountUp";
import ExploreMore from "@/components/shared/ExploreMore";
import { Fn, Footnotes } from "@/components/shared/Footnotes";
import Reveal from "@/components/shared/Reveal";
import CardCarousel from "@/components/shared/CardCarousel";
import PinnedScreens from "@/components/shared/PinnedScreens";
import type { ViewerScreen } from "@/components/shared/ScreenViewer";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const ACCENT = "text-[var(--pa)]";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const PANEL =
  "rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-10 min-h-[320px] flex flex-col justify-center";
const ROW = "flex items-center gap-3 rounded-2xl bg-white dark:bg-[#232326] px-4 py-3.5 shadow-xs";

const SCREEN_DIR = "/images/projects/warranty-rma";

const SCREENS: ViewerScreen[] = [
  {
    id: "intake",
    label: "Case Intake",
    title: "Log a repair, print the label.",
    description:
      "Scan a serial or order ID, add several units to one order, and watch the 60×40 mm label take shape beside the form before it prints.",
    src: `${SCREEN_DIR}/system-intake.png`,
    alt: "The Case Intake page: a repair form on the left and a live thermal label preview with recent intakes on the right.",
  },
  {
    id: "records",
    label: "Records",
    title: "Every case, one timeline.",
    description:
      "Filter by status, open a case to see its problem, solution and status history, and send it on to a supplier batch from the same row.",
    src: `${SCREEN_DIR}/cover.webp`,
    alt: "The Records page: a status filter, a table of repair cases, and an expanded case showing its status timeline.",
  },
];

const HIGHLIGHTS: { icon: LucideIcon; badge: string; title: string; body: string }[] = [
  {
    icon: Bot,
    badge: "Assistant",
    title: "Ask in chat.",
    body: "A Gemini-powered assistant in allow-listed Telegram chats answers from live data using 24 read-only tools, limited to 20 requests an hour per person.",
  },
  {
    icon: ArrowLeftRight,
    badge: "Replacements",
    title: "Swap, linked.",
    body: "The defective serial is tied to its replacement, flagged automatically, and the new unit inherits the original warranty cover.",
  },
  {
    icon: Cloud,
    badge: "Access",
    title: "Reachable, not exposed.",
    body: "A Cloudflare Tunnel gives floor staff HTTPS access from anywhere with no ports opened on the network.",
  },
  {
    icon: FileSpreadsheet,
    badge: "Sync",
    title: "Records in Sheets.",
    body: "Repairs, replacements and RMA claims sync to Google Sheets, with files kept locally, in Google Drive or in Cloud Storage.",
  },
  {
    icon: ShieldCheck,
    badge: "Security",
    title: "The right role for the job.",
    body: "Admin, Manager and Technician roles. By default an account locks for 15 minutes after 5 failed sign-ins, and uploads are checked by file signature.",
  },
  {
    icon: Monitor,
    badge: "Hardware",
    title: "Status at a glance.",
    body: "A small OLED shows the IP, load and tunnel link, and a 3.5-inch dashboard can run as a kiosk on the same Raspberry Pi.",
  },
];

/* ---------- Chapter visuals ---------- */

function LabelVisual() {
  return (
    <div className="space-y-4" role="img" aria-label="A 60 by 40 millimetre thermal label with a product model, order ID and a Code128 barcode.">
      <div className="mx-auto w-full max-w-[280px] rounded-xl bg-white p-4 shadow-md ring-1 ring-black/5 text-[#111]">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-black tracking-tight">CYTRON</span>
          <span className="text-[9px] font-semibold uppercase">Warranty</span>
        </div>
        <p className="mt-3 text-[8px] font-semibold uppercase text-black/50">Product model</p>
        <p className="text-sm font-bold">PRODUCT NAME</p>
        <p className="mt-2 text-[8px] font-semibold uppercase text-black/50">Order ID</p>
        <div
          className="mt-3 h-12 w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px,#111 8px 11px,transparent 11px 13px)",
          }}
          aria-hidden="true"
        />
      </div>
      <p className={`text-center text-xs ${GRAY}`}>60×40 mm · Code128 · GP-1324D</p>
    </div>
  );
}

function SlaVisual() {
  const states = [
    { name: "Healthy", note: "Inside the window", dot: "bg-emerald-500" },
    { name: "Warning", note: "From day 4", dot: "bg-amber-500" },
    { name: "Breached", note: "Day 5 and over", dot: "bg-rose-500" },
  ];
  return (
    <ul className="space-y-3">
      {states.map((s) => (
        <li key={s.name} className={`${ROW} justify-between`}>
          <span className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
            <span className={`text-sm font-semibold ${INK}`}>{s.name}</span>
          </span>
          <span className={`text-sm ${GRAY}`}>{s.note}</span>
        </li>
      ))}
      <li className={`pt-1 text-xs ${GRAY}`}>Business days, weekends excluded. Defaults can be changed in settings.</li>
    </ul>
  );
}

function RmaVisual() {
  const steps = [
    { name: "Repair record", note: "Vendor fault found" },
    { name: "Supplier RMA batch", note: "One click to push" },
    { name: "Invoice bundle", note: "Documents attached" },
    { name: "Resolved", note: "Credited, replaced or approved" },
  ];
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step.name} className={`${ROW} justify-between`}>
          <span className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--pa-soft)] text-xs font-semibold text-[var(--pa)]">
              {i + 1}
            </span>
            <span className={`text-sm font-semibold ${INK}`}>{step.name}</span>
          </span>
          <span className={`text-right text-sm ${GRAY}`}>{step.note}</span>
        </li>
      ))}
      <li className={`pt-1 text-xs ${GRAY}`}>The result is written back to the original repair.</li>
    </ol>
  );
}

function WatchVisual() {
  return (
    <div className="space-y-3">
      <div className={`${ROW} justify-between font-mono text-xs`}>
        <span className={INK}>Original S/N</span>
        <ArrowRight className={`h-4 w-4 ${GRAY}`} aria-hidden="true" />
        <span className={`font-semibold ${ACCENT}`}>New S/N</span>
      </div>
      <div className={`${ROW} justify-between`}>
        <span className={`text-sm font-semibold ${INK}`}>Soft warning</span>
        <span className={`text-sm ${GRAY}`}>Operator acknowledges</span>
      </div>
      <div className={`${ROW} justify-between`}>
        <span className={`text-sm font-semibold ${INK}`}>Hard block</span>
        <span className={`text-sm ${GRAY}`}>Supervisor override</span>
      </div>
    </div>
  );
}

const FOOTNOTES = [
  "Five and four business days are the shipped defaults for the SLA target and warning. Both, and whether weekends count, can be changed in settings.",
  "Counted from the test functions in the repository’s tests folder at v2.52.1: 302.",
  "The assistant’s code declares 24 tools. The project documentation describes all of them as read-only.",
];

const RESULT_FN: Record<string, number> = { "Automated Tests": 2, "Read-Only Assistant Tools": 3 };

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
    problem: "Labels typed by hand.",
    headline: "Scan once. Label printed.",
    body: "Scan a serial or order ID and the terminal checks repair history, warranty cover and the watchlist before it creates the ticket and prints a Code128 label on the thermal printer.",
    visual: (
      <BeforeAfter
        before={<StepList items={["Type the order ID", "Copy the serial number", "Write the label by hand"]} />}
        after={<LabelVisual />}
      />
    ),
  },
  {
    problem: "Cases aging out of sight.",
    headline: "A clock on every case.",
    body: "Each case shows whether it is healthy, close to its target or past it, counted in business days. Post-warranty repairs are exempt, because their repair time can’t be predicted.",
    fn: 1,
    visual: <SlaVisual />,
  },
  {
    problem: "Returns scattered across invoices.",
    headline: "One batch. Every document.",
    body: "Push a repair into a supplier batch in one click, group it by invoice, attach credit notes and photos, and print the manifest. When the supplier resolves it, the repair record updates itself.",
    visual: <RmaVisual />,
  },
  {
    problem: "Replaced units coming back.",
    headline: "It remembers every unit.",
    body: "Replaced serials are flagged automatically. Depending on the flag, intake shows a warning or blocks until a supervisor signs in to override it.",
    visual: <WatchVisual />,
  },
];

export default function WarrantyRmaCaseStudy({ project, nextProject }: Props) {
  return (
    <div>
      {/* 1. Hero */}
      <section className="bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-14 sm:pt-20 text-center`}>
          <p className={`text-xl sm:text-2xl font-semibold ${INK} tracking-apple-tight`}>{project.title}</p>
          <h1 className={`mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            One system.
            <span className={`block ${ACCENT}`}>Every repair.</span>
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
        <Reveal>
          <p className={`text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl ${GRAY}`}>
            Repairs, supplier returns and warranty claims lived in separate tools and spreadsheets.{" "}
            <span className={INK}>
              Nothing tied a unit’s label to its bench notes, its supplier batch, or the last time it came back.
            </span>
          </p>
        </Reveal>
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
          <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>The two pages the team uses most.</p>
          <PinnedScreens screens={SCREENS} tone="light" />
        </Reveal>
      </section>

      {/* 5. Highlights */}
      <CardCarousel title="Get the highlights." label="Highlights">
        {HIGHLIGHTS.map(({ icon: Icon, badge, title, body }) => (
          <article
            key={title}
            className="snap-start shrink-0 w-[78vw] sm:w-[320px] min-h-[360px] rounded-[28px] bg-white dark:bg-[#1C1C1E] p-8 flex flex-col"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pa-soft)]">
              <Icon className={`h-6 w-6 ${ACCENT}`} aria-hidden="true" />
            </span>
            <p className={`mt-6 text-xs font-semibold uppercase tracking-wider ${ACCENT}`}>{badge}</p>
            <h3 className={`mt-2 text-2xl font-semibold ${INK} tracking-apple-tight leading-tight`}>{title}</h3>
            <p className={`mt-3 text-[15px] ${GRAY} leading-relaxed`}>{body}</p>
          </article>
        ))}
      </CardCarousel>

      {/* 6. Result */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">In use at Cytron</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Built to be relied on.
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
