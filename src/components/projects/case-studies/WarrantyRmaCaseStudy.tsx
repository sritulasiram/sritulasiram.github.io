import Image from "next/image";
import ScatterStatement from "@/components/projects/ScatterStatement";
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
      "Scan a serial or order ID, add several units to one order with Batch Mode, and watch the 60×40 mm Code128 label take shape beside the form before it prints.",
    src: `${SCREEN_DIR}/screen-intake.jpg`,
    alt: "The Case Intake page: a Log a Repair form with order, product, serial, technician and problem fields, and a live thermal label preview with recent intakes beside it.",
  },
  {
    id: "records",
    label: "Records",
    title: "Every case, one history.",
    description:
      "Switch between active and completed cases, search by serial, order ID, product or technician, and expand a row to see its units, status and last update.",
    src: `${SCREEN_DIR}/screen-records.jpg`,
    alt: "The Records page: a status filter and a table of completed repair cases with product, quantity, technician, status and dates.",
  },
  {
    id: "rma",
    label: "Supplier RMA",
    title: "One batch. Every document.",
    description:
      "Each supplier has its own registry of batches. Open one to see the supplier’s profile, the RMA number, courier and tracking, attached files, and the units grouped by invoice, with Print RMA and Print Labels beside them.",
    src: `${SCREEN_DIR}/screen-rma.jpg`,
    alt: "The Supplier RMA page: a registry of suppliers with batch counts, a supplier profile, batch logistics with the RMA number, courier and tracking, attached files, and the units in the batch grouped by invoice.",
  },
  {
    id: "replacements",
    label: "Replacements",
    title: "Every swap, on the record.",
    description:
      "Each replacement links the original serial to the new one, with the technician, coverage tier, problem and fix, and the date, in a log you can search and print.",
    src: `${SCREEN_DIR}/screen-replacements.jpg`,
    alt: "The Replacement Log: a searchable table linking each original serial number to its replacement, with coverage tier, issue and fix.",
  },
  {
    id: "protection",
    label: "Protection",
    title: "Flag it once.",
    description:
      "A flagged unit keeps its replacement details, who flagged it, when, why and the restriction policy, so a repeat comes up with the full story.",
    src: `${SCREEN_DIR}/screen-protection.jpg`,
    alt: "The Protection page: a flagged watchlist item with its replacement info, audit trail, attachments and notes.",
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "The whole operation at a glance.",
    description:
      "Intake against closures within the SLA target, replacements over time, and filters by day, week, month, quarter or year, all on one dashboard.",
    src: `${SCREEN_DIR}/screen-analytics.jpg`,
    alt: "The Home dashboard: totals, an intake against closure SLA chart and a replacements over time chart.",
  },
  {
    id: "catalogue",
    label: "Catalogue",
    title: "Thousands of products, searchable.",
    description:
      "A product ledger of thousands of items, searchable by SKU or name, with stock status, location and category, so intake can pick the right product fast.",
    src: `${SCREEN_DIR}/screen-catalogue.jpg`,
    alt: "The Products page: a catalogue ledger with product name, SKU, stock, status, location and category columns.",
  },
  {
    id: "settings",
    label: "Settings",
    title: "Rules you can change.",
    description:
      "Currency and date formats, the warranty policy text, RMA numbering, grace periods and repair thresholds, plus devices, integrations and security, all in one place.",
    src: `${SCREEN_DIR}/screen-settings.jpg`,
    alt: "The System Settings page: locale and numbering, warranty policy text and limits, with sections for workflows, hardware, integrations and security.",
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
  // Code128-style bars: a repeating pattern of thick and thin strokes, like the printed label.
  const bars =
    "repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px,#111 8px 11px,transparent 11px 12px,#111 12px 13px,transparent 13px 16px)";
  return (
    <div className="space-y-4" role="img" aria-label="A 60 by 40 millimetre thermal label: Cytron, a warranty type, product model, SKU, order ID, technician, a Code128 barcode and the case number WTY-261019-0001.">
      <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-xl bg-white text-[#111] shadow-lg ring-1 ring-black/5">
        <div className="px-5 pt-5">
          {/* Brand and warranty type */}
          <div className="flex items-baseline justify-between gap-3 border-b-2 border-[#111] pb-1.5">
            <span className="text-[19px] font-extrabold tracking-wide">CYTRON</span>
            <span className="truncate text-[8px] font-extrabold uppercase tracking-wide">Manufacturing Warr…</span>
          </div>

          {/* Product */}
          <div className="border-b-2 border-[#111] py-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[7.5px] font-bold uppercase tracking-wider text-black/55">Product model</span>
              <span className="text-[7.5px] font-bold uppercase tracking-wider text-black/55">SKU: -</span>
            </div>
            <p className="text-[17px] font-extrabold uppercase leading-tight tracking-tight">Product name</p>
          </div>

          {/* Order and technician */}
          <div className="grid grid-cols-2 border-b-2 border-[#111] py-2">
            <div className="border-r border-[#111]/70 pr-3">
              <p className="text-[7.5px] font-bold uppercase tracking-wider text-black/55">Order ID</p>
              <p className="text-[13px] font-extrabold leading-tight">-</p>
            </div>
            <div className="pl-3">
              <p className="text-[7.5px] font-bold uppercase tracking-wider text-black/55">PIC / Technician</p>
              <p className="text-[13px] font-extrabold leading-tight">SRI</p>
            </div>
          </div>

          {/* Barcode */}
          <div className="px-3 py-3.5" aria-hidden="true">
            <div className="h-11 w-full" style={{ backgroundImage: bars }} />
          </div>
        </div>

        {/* Case number */}
        <p className="bg-[#0A0A0A] py-2.5 text-center text-[13px] font-extrabold tracking-wider text-white">WTY-261019-0001</p>
      </div>
      <p className={`text-center text-xs ${GRAY}`}>60×40 mm · Code128 · GP-1324D</p>
    </div>
  );
}

function SlaVisual() {
  const stats = [
    { value: "144", label: "Closed within SLA", dot: "bg-emerald-500" },
    { value: "53", label: "Closed past SLA", dot: "bg-rose-500" },
    { value: "73.1%", label: "SLA met", dot: "bg-sky-500" },
  ];
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 dark:ring-white/10">
        <Image
          src={`${SCREEN_DIR}/chart-sla.jpg`}
          alt="The Intake vs Closure SLA chart: cases taken in each month against cases closed within and past the SLA target, with the share that met it."
          width={1566}
          height={466}
          sizes="(max-width: 768px) 92vw, 460px"
          className="h-auto w-full"
        />
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <li key={stat.label} className="rounded-xl bg-white px-3 py-3 shadow-xs dark:bg-[#232326]">
            <p className={`text-2xl font-semibold tabular-nums tracking-apple-tight ${INK}`}>{stat.value}</p>
            <p className={`mt-1 flex items-center gap-1.5 text-xs ${GRAY}`}>
              <span className={`h-2 w-2 shrink-0 rounded-full ${stat.dot}`} aria-hidden="true" />
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
      <p className={`text-xs ${GRAY}`}>Target: closed in under 5 business days. Post-warranty repairs are exempt.</p>
    </div>
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
    body: "Each case shows whether it is healthy, close to its target or past it, counted in business days, and the dashboard tracks how many close in time. Post-warranty repairs are exempt, because their repair time can’t be predicted.",
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
        <ScatterStatement
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          problem="Repairs, supplier returns and warranty claims lived in separate tools and spreadsheets."
          answer="Nothing tied a unit’s label to its bench notes, its supplier batch, or the last time it came back."
          marks={["label", "bench notes", "supplier batch", "the last time it came back"]}
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
          <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>The pages the team works in every day.</p>
          <PinnedScreens screens={SCREENS} tone="light" fitWidth />
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
