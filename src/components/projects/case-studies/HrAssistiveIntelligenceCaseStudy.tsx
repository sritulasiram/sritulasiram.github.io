import AiStatement from "@/components/projects/AiStatement";
import { BookOpenCheck, Database, EyeOff, FolderCog, LineChart, MessageSquareReply, ShieldCheck, type LucideIcon } from "lucide-react";
import CardCarousel from "@/components/shared/CardCarousel";
import BeforeAfter from "@/components/shared/BeforeAfter";
import CountUp from "@/components/shared/CountUp";
import ExploreMore from "@/components/shared/ExploreMore";
import { Fn, Footnotes } from "@/components/shared/Footnotes";
import Reveal from "@/components/shared/Reveal";
import HrAssistiveMacbook from "@/components/projects/visuals/HrAssistiveMacbook";
import HrScreenshot from "@/components/projects/visuals/HrScreenshot";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const TEAL = "text-[var(--pa)]";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const ROW = "flex items-center gap-3 rounded-2xl bg-white dark:bg-[#232326] px-4 py-3.5 shadow-xs";
const PANEL =
  "rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-10 min-h-[320px] flex flex-col justify-center";

/* ---------- Mini visuals, one per chapter. Generic: no real HR content. ---------- */

function AskVisual() {
  return (
    <div className="space-y-3" role="img" aria-label="A chat where an employee asks a question and the assistant answers with a numbered citation.">
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[var(--pa)] px-4 py-3 text-sm font-medium text-white dark:text-black">
        How does this policy apply to me?
      </div>
      <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white dark:bg-[#232326] px-4 py-3 shadow-xs">
        <p className={`text-sm ${INK} leading-relaxed`}>
          Answered only from the official HR documents.
          <span className={`ml-1 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[var(--pa-soft)] text-[11px] font-semibold ${TEAL}`}>1</span>
        </p>
      </div>
      <p className={`text-xs ${GRAY}`}>No message to HR. No waiting for a reply.</p>
    </div>
  );
}

function ReindexVisual() {
  const changed = 3;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-2.5" role="img" aria-label="A grid of document chunks where only one changed chunk is highlighted for re-embedding.">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-14 rounded-xl ${
              i === changed ? "bg-[var(--pa)]" : "bg-white dark:bg-[#232326] shadow-xs"
            }`}
          />
        ))}
      </div>
      <p className={`text-sm ${GRAY}`}>
        <span className={`font-semibold ${INK}`}>Only the changed chunk</span> is embedded again.
      </p>
    </div>
  );
}

function GateVisual() {
  // Scale 0 to 1. Cut-off at 0.60; on-topic scores sit above 0.70, off-topic at 0.48 to 0.59.
  return (
    <div className="relative space-y-5 pt-6" role="img" aria-label="On-topic questions score above 0.70. Off-topic questions score between 0.48 and 0.59. The cut-off is 0.60.">
      <div className="absolute top-0 bottom-0 left-[60%] w-px bg-[#1D1D1F]/40 dark:bg-white/40" aria-hidden="true" />
      <span className={`absolute -top-0.5 left-[60%] -translate-x-1/2 text-[11px] font-semibold ${INK}`} aria-hidden="true">
        0.60 cut-off
      </span>
      <div className="space-y-1.5">
        <p className={`text-xs font-semibold ${GRAY}`}>On-topic questions</p>
        <div className="h-3 rounded-full bg-black/[0.06] dark:bg-white/10 overflow-hidden">
          <div className="h-full w-[78%] rounded-full bg-[var(--pa)]" />
        </div>
        <p className={`text-xs tabular-nums ${INK}`}>above 0.70, answered with citations</p>
      </div>
      <div className="space-y-1.5">
        <p className={`text-xs font-semibold ${GRAY}`}>Off-topic questions</p>
        <div className="h-3 rounded-full bg-black/[0.06] dark:bg-white/10 overflow-hidden">
          <div className="h-full w-[54%] rounded-full bg-[#86868B]" />
        </div>
        <p className={`text-xs tabular-nums ${INK}`}>0.48 – 0.59, “not found” reply, model never called</p>
      </div>
    </div>
  );
}

function EvalVisual() {
  const metrics = [
    { name: "Answered from the right document", note: "Share of answerable questions where the expected document passed the cut-offs" },
    { name: "Mean reciprocal rank", note: "How high the first correct passage ranks, where 1.0 means always first" },
    { name: "Off-topic correctly refused", note: "Share of must-refuse questions where nothing passed, so the model is never called" },
  ];
  return (
    <ul className="space-y-3">
      {metrics.map((m) => (
        <li key={m.name} className={`${ROW} items-start`}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{m.name}</span>
            <span className={`mt-0.5 block text-xs ${GRAY}`}>{m.note}</span>
          </span>
        </li>
      ))}
      <li className={`text-xs ${GRAY} pt-1`}>Every run is saved with a snapshot of its settings, so each change shows what it did.</li>
    </ul>
  );
}

const FOOTNOTES = [
  "Document text is sent to the AI provider you choose, Gemini or OpenAI, to create embeddings. When a question is asked, only the passages that pass the relevance gate are sent along with it to write the answer.",
  "When no passage clears the relevance gate, a fixed “not found” reply is returned and the language model is not called.",
  "Calibrated for the default embedding model, gemini-embedding-2, so that on-topic questions score above 0.70 and off-topic ones between 0.48 and 0.59. Scores depend on the model, so the cut-off should be re-checked after switching.",
];

const RESULT_FN: Record<string, number> = { "Model calls when nothing matches": 2, "Similarity cut-off": 3 };

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
    problem: "Every question to one person.",
    headline: "Employees ask. The documents answer.",
    body: "Cytron has a single HR person, and each leave, claim or policy question pulled them away from real HR work. Now employees ask in plain language and get a cited answer straight from the official documents.",
    visual: (
      <BeforeAfter
        before={<StepList items={["Email or message HR", "Wait for a reply", "HR stops other work to answer"]} />}
        after={<AskVisual />}
      />
    ),
  },
  {
    problem: "Policies change.",
    headline: "Change a document, not the system.",
    body: "HR adds or removes documents in a knowledge base manager, and only the text that changed is embedded again, so the assistant stays current without a rebuild.",
    visual: <ReindexVisual />,
  },
  {
    problem: "A wrong answer costs trust.",
    headline: "Accurate, or honest about it.",
    body: "A relevance gate checks every question against the documents. If nothing is close enough, a fixed reply points the employee to HR and the language model is never called. Every statement carries a citation that opens its source.",
    visual: <GateVisual />,
  },
  {
    problem: "Tuning by eye.",
    headline: "Measure every change.",
    body: "Each test case is a question plus the document that should answer it, or a flag that it must be refused. After any change to chunking, thresholds or models, a run scores retrieval against them without calling the answer model, and can suggest the best cut-off.",
    visual: <EvalVisual />,
  },
];

const HIGHLIGHT_INDEXES = [0, 2, 3, 4];
const HIGHLIGHT_ICONS: LucideIcon[] = [BookOpenCheck, MessageSquareReply, FolderCog, LineChart];

export default function HrAssistiveIntelligenceCaseStudy({ project, nextProject }: Props) {
  const highlights = HIGHLIGHT_INDEXES.map((i) => project.keyFeatures[i]).filter(Boolean);

  return (
    <div>
      {/* 1. Hero */}
      <section className="bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-14 sm:pt-20 text-center`}>
          <p className={`text-xl sm:text-2xl font-semibold ${INK} tracking-apple-tight`}>{project.title}</p>
          <h1 className={`mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            Answers it can prove.
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            {project.tagline}
          </p>
          <div className="mt-10 sm:mt-14 mx-auto w-full max-w-3xl">
            <HrAssistiveMacbook priority className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <AiStatement
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          problem="Cytron has one HR person, and every question lands in their chat or inbox."
          answer="That pulls them from real HR work, and the documents are too confidential for a public AI chat."
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

      {/* 3a. In action */}
      <section id="in-action" aria-label="See it in action" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See it in action.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} text-center max-w-2xl mx-auto`}>
              A plain-language question, an answer built from the official documents, and numbered sources underneath.
            </p>
            <HrScreenshot alt="The HR assistant answering a leave question with two tables, numbered citations beside each statement, and a Sources row listing the Leave policy sections it came from." />
          </Reveal>
        </div>
      </section>

      {/* 3b. Privacy */}
      <section aria-label="Privacy" className="bg-black text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[var(--pa-d)]">Privacy</p>
            <h2 className="mt-2 max-w-3xl text-4xl sm:text-6xl font-semibold tracking-apple-hero leading-[1.05]">
              Private where it counts.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[#A1A1A6] leading-relaxed">
              Policies and contracts don’t belong in a public chat. Here the index is stored locally, chats can leave no trace, and analytics never record what was asked. The AI provider is your choice.
              <Fn n={1} />
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              { icon: Database, title: "A local index", text: "Documents are split and stored in a local ChromaDB index, with a separate collection for each embedding model." },
              { icon: EyeOff, title: "Private chats", text: "A private chat stores no messages at all." },
              { icon: ShieldCheck, title: "Analytics without questions", text: "Usage analytics keep only the outcome, timing and cited document names, never what was asked." },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-6 w-6 text-[var(--pa-d)]" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-apple-tight">{title}</h3>
                <p className="mt-2 text-[15px] text-[#A1A1A6] leading-relaxed">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Highlights */}
      <CardCarousel title="Get the highlights." label="Highlights">
        {highlights.map((feat, i) => {
          const Icon = HIGHLIGHT_ICONS[i] ?? BookOpenCheck;
          return (
            <article
              key={feat.title}
              className="snap-start shrink-0 w-[78vw] sm:w-[320px] min-h-[360px] rounded-[28px] bg-white dark:bg-[#1C1C1E] p-8 flex flex-col"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pa-soft)]">
                <Icon className={`h-6 w-6 ${TEAL}`} aria-hidden="true" />
              </span>
              <p className={`mt-6 text-xs font-semibold uppercase tracking-wider ${TEAL}`}>{feat.badge}</p>
              <h3 className={`mt-2 text-2xl font-semibold ${INK} tracking-apple-tight leading-tight`}>{feat.title}</h3>
              <p className={`mt-3 text-[15px] ${GRAY} leading-relaxed`}>{feat.description}</p>
            </article>
          );
        })}
      </CardCarousel>

      {/* 5. Result */}
      <section aria-label="By design" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">By design</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Built to guarantee, not to guess.
            </h2>
            <p className="mt-4 text-[#A1A1A6] max-w-xl">
              The assistant is in internal pilot, so these are properties of the design rather than adoption figures.
            </p>
          </Reveal>
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {project.results.map((result, i) => (
              <Reveal key={result.label} delay={i * 80}>
                <dt className="order-2 text-sm font-semibold text-[var(--pa-d)]">{result.label}</dt>
                <dd className="text-6xl sm:text-7xl font-semibold tracking-apple-hero tabular-nums"><CountUp value={result.metric} /></dd>
                <p className="mt-3 text-sm text-[#A1A1A6] leading-relaxed">
                  {result.description}
                  {RESULT_FN[result.label] ? <Fn n={RESULT_FN[result.label]} size="text-[0.8em]" /> : null}
                </p>
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
