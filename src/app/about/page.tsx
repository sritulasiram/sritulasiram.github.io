import Image from "next/image";
import { Download } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import Button from "@/components/ui/Button";
import SectionNav from "@/components/layout/SectionNav";
import PinnedJourney, { type JourneyStep } from "@/components/about/PinnedJourney";
import CredentialCards, { type Credential } from "@/components/about/CredentialCards";
import Recognition from "@/components/about/Recognition";
import SkillsScroller from "@/components/about/SkillsScroller";
import CountUp from "@/components/shared/CountUp";
import Reveal from "@/components/shared/Reveal";
import StatementReveal from "@/components/about/StatementReveal";
import { ABOUT_DATA, HERO_DATA } from "@/data/content";
import { ABOUT_ACCENT, accentStyle } from "@/data/projectTheme";

// Put the PDF at public/Sri-Tulasi-Ram-Resume.pdf; it is served from the site root.
const RESUME_PATH = "/Sri-Tulasi-Ram-Resume.pdf";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const H2 = `text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`;

const NUMBERS = [
  { value: "7", label: "Awards", text: "From Universiti Tun Hussein Onn Malaysia and Politeknik Ungku Omar." },
  { value: "2", label: "Engineering qualifications", text: "A diploma in Mechatronic Engineering and a B.Eng in Electronic Engineering." },
  { value: "1", label: "Published paper", text: "Peer-reviewed in the IJIE, from UTHM." },
  { value: "BEM", label: "Graduate Engineer", text: `Registered with the Board of Engineers Malaysia, no. ${ABOUT_DATA.accreditation.registrationNo}.` },
];

const HONORS_BY_ORG: Record<string, string[]> = {
  "Politeknik Ungku Omar (PUO)": [
    "Department Head Medal Award, Jun 2020, and Dean’s Award every semester",
    "Best Project, DEM Program, MEDspec 2019",
    "Best Project in Information Technology & Communication, and Gold Medal, SPICE 2019",
  ],
  "Universiti Tun Hussein Onn Malaysia (UTHM)": [
    "Best Project Award, 1st Place, Computer Engineering Cluster, Jun 2024",
    "Gold Award, Final Year Project Industrial Award, Jun 2024",
    "Silver Award, Integrated Design Project Showcase Day, Jan 2024",
  ],
};

// The four skills shown large in each category, in the same order as ABOUT_DATA.skillCategories.
// The rest keep their order from the data and follow as smaller pills.
const SKILL_HEADLINES: string[][] = [
  ["Technical Support", "Warranty & RMA Management", "Hardware QA & Triage", "Technical Consultation"],
  ["Raspberry Pi", "Embedded Systems", "ESP32 Microcontrollers", "Internet of Things (IoT)"],
  ["Python & Flask", "API Design", "Web Application Security", "Next.js & React"],
  ["Retrieval-Augmented Generation", "Vector Search (ChromaDB)", "LLM Function Calling", "Embeddings & Reranking"],
  ["Swift & SwiftUI", "IOKit HID", "AppleSMC Telemetry", "OpenCore & UEFI"],
  ["Figma", "User Interface Design", "Mobile Interface Design", "Interactive Prototyping"],
  ["Peer-Reviewed Publication", "Technical Documentation", "Standard Operating Procedures (SOPs)", "Data Analysis"],
];

const SKILL_GROUPS = (ABOUT_DATA.skillCategories ?? []).map((group, i) => {
  const lead = SKILL_HEADLINES[i] ?? [];
  const rank = (name: string) => {
    const at = lead.indexOf(name);
    return at === -1 ? lead.length : at;
  };
  // Array.sort is stable, so everything outside the headline keeps its original order.
  return { ...group, items: [...group.items].sort((a, b) => rank(a.name) - rank(b.name)) };
});

// Oldest first by start year (the sort is stable), so the pinned year only ever counts upwards.
const JOURNEY: JourneyStep[] = [
  ...[...(ABOUT_DATA.education ?? [])].reverse(),
  ...(ABOUT_DATA.experience ?? []),
]
  .sort((a, b) => Number(a.period.slice(0, 4)) - Number(b.period.slice(0, 4)))
  .map((step) => ({
  id: `${step.period}-${step.role}`,
  year: step.period.slice(0, 4),
  period: step.period,
  role: step.role,
  organization: step.organization,
  place: step.location,
  logoSrc: step.logoSrc,
  logoAlt: step.logoAlt,
  description: step.description,
  highlights: step.highlights.map((h) => {
    const [lead, rest] = splitLead(h);
    return { lead, rest };
  }),
  honors: HONORS_BY_ORG[step.organization],
}));

const CREDENTIALS: Credential[] = [
  {
    title: ABOUT_DATA.accreditation.title,
    body: ABOUT_DATA.accreditation.body,
    subtitle: ABOUT_DATA.accreditation.discipline,
    status: ABOUT_DATA.accreditation.status,
    active: true,
    logoSrc: ABOUT_DATA.accreditation.logoSrc,
    verify: { label: "Registration no.", value: ABOUT_DATA.accreditation.registrationNo },
  },
  ...(ABOUT_DATA.firstAid
    ? [
        {
          title: "First Aid & CPR",
          body: ABOUT_DATA.firstAid.body,
          status: ABOUT_DATA.firstAid.status,
          active: true,
          note: `Valid until ${ABOUT_DATA.firstAid.expires}`,
          logoSrc: ABOUT_DATA.firstAid.logoSrc,
          verify: { label: "Serial", value: ABOUT_DATA.firstAid.serialNo },
        },
      ]
    : []),
  ...(ABOUT_DATA.flutterCert
    ? [
        {
          title: "Flutter App Development",
          body: ABOUT_DATA.flutterCert.body,
          status: ABOUT_DATA.flutterCert.status,
          note: ABOUT_DATA.flutterCert.issuedRange,
          logoSrc: ABOUT_DATA.flutterCert.logoSrc,
                verify: { label: "Serial", value: ABOUT_DATA.flutterCert.serialNo },
        },
      ]
    : []),
];

/** Splits "Lead: rest of the sentence" so the lead can be set in bold. */
function splitLead(text: string): [string | null, string] {
  const i = text.indexOf(": ");
  return i > 0 && i < 40 ? [text.slice(0, i), text.slice(i + 2)] : [null, text];
}

export default function AboutTwoPage() {
  const [firstSentence, ...restSentences] = ABOUT_DATA.primaryParagraph.split(/(?<=\.)\s+/);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={accentStyle(ABOUT_ACCENT)}
      className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col pt-12 selection:bg-black/10 dark:selection:bg-white/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]"
    >
      <SectionNav sections={SECTIONS} ariaLabel="Page chapters" />

      {/* 1. Hero */}
      <section id="overview" aria-label="Overview" className="scroll-mt-14 overflow-hidden">
        <div className={`${WRAP} relative flex flex-col pt-0 lg:block lg:min-h-[620px] lg:pt-20`}>
          <div className="relative z-10 -mt-6 pb-4 sm:-mt-8 lg:mt-0 lg:pb-24">
            <p className={`text-xl sm:text-2xl font-semibold ${INK} tracking-apple-tight`}>{HERO_DATA.name}</p>
            <h1 className={`mt-2 text-5xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-semibold ${INK} tracking-apple-hero leading-[1.04]`}>
              <span className="block lg:whitespace-nowrap">Engineering precision.</span>
              <span className={`block lg:whitespace-nowrap ${GRAY} font-medium`}>Design intuition.</span>
            </h1>
            <p className={`mt-6 max-w-xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
              {HERO_DATA.positioning}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={RESUME_PATH} download accent={["#1D1D1F", "#F0F0F2"]} iconBefore icon={<Download className="h-4 w-4" aria-hidden="true" />}>
                Download resume
              </Button>
              <Button variant="link" href="#contact">
                Get in touch
              </Button>
            </div>
          </div>

          <div className="relative z-0 order-first mx-auto mt-6 aspect-[4/5] w-full max-w-[300px] sm:max-w-[340px] dark:-mt-12 dark:aspect-[3/4] lg:order-none lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[40%] lg:max-w-none dark:lg:bottom-auto dark:lg:-top-12 dark:lg:w-[47%]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[4%] bottom-0 top-[10%] rounded-full bg-[radial-gradient(closest-side,var(--pa-soft),transparent)] dark:hidden"
            />
            <Image
              src="/images/portraits/sri-portrait.webp"
              alt="Portrait of Sri Tulasi Ram"
              fill
              priority
              sizes="(max-width: 1024px) 360px, 400px"
              className="object-contain object-bottom dark:hidden"
            />
            <Image
              src="/images/portraits/sri-portrait-dark.webp"
              alt="Portrait of Sri Tulasi Ram"
              fill
              priority
              sizes="(max-width: 1024px) 360px, 400px"
              className="hidden object-cover object-top dark:block [mask-image:radial-gradient(ellipse_75%_100%_at_50%_0%,black_58%,transparent_100%)]"
            />
          </div>
        </div>
      </section>

      {/* 2. Statement */}
      <StatementReveal
        lead={firstSentence}
        rest={restSentences.join(" ")}
        secondary={ABOUT_DATA.secondaryParagraph}
        wrapClassName={WRAP}
      />

      {/* 3. Numbers */}
      <section aria-label="By the numbers" className="bg-[#F5F5F7] dark:bg-[#151517] py-20 sm:py-28">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[var(--pa)]">By the numbers</p>
            <h2 className={`mt-2 max-w-2xl text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>
              The path so far, in four figures.
            </h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 80}>
                <dt className="text-sm font-semibold text-[var(--pa)]">{n.label}</dt>
                <dd className={`mt-1 text-6xl sm:text-7xl font-semibold ${INK} tracking-apple-hero tabular-nums`}>
                  <CountUp value={n.value} />
                </dd>
                <dd className={`mt-3 text-sm leading-relaxed ${GRAY}`}>{n.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 6. Journey */}
      <section id="journey" aria-label="Journey" className={`${WRAP} scroll-mt-14 py-24 sm:py-32`}>
        <Reveal>
          <h2 className={H2}>
            How I got here.
            <span className={`block ${GRAY}`}>Diploma, degree, then Cytron.</span>
          </h2>
        </Reveal>
        <div className="mt-12">
          <PinnedJourney steps={JOURNEY} />
        </div>
      </section>

      {/* 7. Recognition */}
      <Recognition />

      {/* 8. Skills */}
      <section id="skills" aria-label="Skills" className={`${WRAP} scroll-mt-14 py-24 sm:py-32`}>
        <SkillsScroller
          groups={SKILL_GROUPS}
          heading={
            <h2 className={H2}>
              Skills.
              <span className={`block ${GRAY}`}>What I work with.</span>
            </h2>
          }
        />
      </section>

      {/* 9. Credentials */}
      <section id="credentials" aria-label="Credentials" className="scroll-mt-14 py-24 sm:py-32">
        <CredentialCards
          items={CREDENTIALS}
          heading={
            <Reveal>
              <h2 className={H2}>
                Credentials.
                <span className={`block ${GRAY}`}>Registered and certified.</span>
              </h2>
            </Reveal>
          }
        />
      </section>

      <Footer animate {...FOOTER_COPY.about} />
    </main>
  );
}
