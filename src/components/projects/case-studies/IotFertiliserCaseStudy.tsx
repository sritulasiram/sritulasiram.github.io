import GaugeStatement from "@/components/projects/GaugeStatement";
import { LINK, PILL } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import CountUp from "@/components/shared/CountUp";
import Reveal from "@/components/shared/Reveal";
import YouTubeEmbed from "@/components/shared/YouTubeEmbed";
import CopyCitation from "@/components/projects/CopyCitation";
import IotFigureTabs from "@/components/projects/IotFigureTabs";
import { projectThemeStyle } from "@/data/projectTheme";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const VIDEOS = [
  { id: "ZStZwBj2lk4", title: "HYDRA: Hydroponic Yield Driven Real-time Automation" },
  { id: "6alu8ssZnl8", title: "IoT-Based Fertiliser Mixing System Prototype Demonstration" },
];
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const PANEL =
  "rounded-[28px] bg-[var(--pa-tint)] p-6 sm:p-10 min-h-[320px] flex flex-col justify-center";
const ROW = "flex items-center gap-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#232326] px-4 py-3.5 shadow-xs";

const DOI = "https://doi.org/10.30880/ijie.2026.18.01.014";
const PUBLISHER = "https://publisher.uthm.edu.my/ojs/index.php/ijie/article/view/24386";

const BIBTEX = `@article{rajalingam2026iot,
  title     = {IoT-Based Fertiliser Mixing for Precision Farming},
  author    = {Rajalingam, Sri Tulasi Ram and Nadzri, Muhammad Muzakkir Mohd and Ahmad, Afandi and Ishak, Mohamad Khairi},
  journal   = {International Journal of Integrated Engineering},
  volume    = {18},
  number    = {1},
  pages     = {186--201},
  year      = {2026},
  publisher = {Penerbit UTHM},
  doi       = {10.30880/ijie.2026.18.01.014},
  url       = {https://doi.org/10.30880/ijie.2026.18.01.014}
}`;

const IMG = "/images/projects/iot-fertiliser-mixing";

/* ---------- Chapter visuals ---------- */

function EquationVisual() {
  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#232326] p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between gap-4">
        <p className={`text-xs font-semibold ${GRAY}`}>Equation (1) · IJIE 2026, p. 191</p>
        <span className="rounded-full bg-[var(--pa-soft)] px-3 py-1 text-xs font-semibold text-[var(--pa)]">Median-filtered</span>
      </div>
      <div className="overflow-x-auto py-1 text-center" role="img" aria-label="TDS equals the fraction 133.42 V cubed minus 255.86 V squared plus 857.39 V over 2, times F.">
        <p className={`whitespace-nowrap font-mono text-[13px] ${INK}`} aria-hidden="true">
          TDS ={" "}
          <span className="inline-block align-middle text-left">
            <span className="block border-b border-black/20 dark:border-white/20 pb-1">133.42V³ − 255.86V² + 857.39V</span>
            <span className="block pt-1 text-center">2</span>
          </span>{" "}
          · F
        </p>
      </div>
      <dl className={`space-y-2 border-t border-black/[0.06] dark:border-white/10 pt-4 text-xs leading-relaxed ${GRAY}`}>
        <div>
          <dt className={`inline font-semibold ${INK}`}>V, compensated voltage. </dt>
          <dd className="inline">The voltage from the TDS sensor, after median filtering.</dd>
        </div>
        <div>
          <dt className={`inline font-semibold ${INK}`}>F, calibration factor. </dt>
          <dd className="inline">Set against a standard solution at a fixed ppm before each evaluation.</dd>
        </div>
      </dl>
    </div>
  );
}

function PhasesVisual() {
  const phases = [
    { name: "Boot & cloud handshake", note: "Wi-Fi, Blynk token, safe-low GPIO, ISRs" },
    { name: "40 ms ADC sampling", note: "Circular buffer, 30-sample median" },
    { name: "Atomic flow metering", note: "Solenoids and pumps run on command" },
    { name: "Independent pump cut-off", note: "Each pump stops at its own target" },
  ];
  return (
    <ol className="space-y-3">
      {phases.map((phase, i) => (
        <li key={phase.name} className={ROW}>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--pa-soft)] text-xs font-semibold text-[var(--pa)]">
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{phase.name}</span>
            <span className={`block text-xs ${GRAY}`}>{phase.note}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function DosingVisual() {
  const rows = [
    { name: "Flow sensors", pins: "GPIO 18 & 19", note: "5.25 and 5.50 ml per pulse" },
    { name: "Dosing pumps", pins: "GPIO 16 & 17", note: "Switched off independently" },
    { name: "Anti-backflow solenoids", pins: "GPIO 22 & 23", note: "Close with the pumps" },
  ];
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name} className={`${ROW} justify-between`}>
          <span className="min-w-0">
            <span className={`block text-sm font-semibold ${INK}`}>{row.name}</span>
            <span className={`block text-xs ${GRAY}`}>{row.note}</span>
          </span>
          <span className="shrink-0 font-mono text-xs font-semibold text-[var(--pa)]">{row.pins}</span>
        </li>
      ))}
      <li className={`text-xs ${GRAY} pt-1`}>Pulse counts are read inside atomic guards, so a multi-byte count is never torn.</li>
    </ul>
  );
}

const CHAPTERS: { problem: string; headline: string; body: string; visual: React.ReactNode }[] = [
  {
    problem: "A blocking delay stalls the board.",
    headline: "It never stops listening.",
    body: "Long dispensing cycles used to trip the watchdog timer and drop the connection. Version 1.1.0 swaps blocking delays for an asynchronous state machine, so the Blynk heartbeat keeps running while it samples.",
    visual: <PhasesVisual />,
  },
  {
    problem: "Pumps that overshoot.",
    headline: "Each pump stops on its own.",
    body: "Hardware interrupts count pulses from each flow sensor and switch its pump off the moment its target volume is reached. There is no volumetric overshoot, and the solenoids close with the pumps.",
    visual: <DosingVisual />,
  },
  {
    problem: "A noisy electrode.",
    headline: "Thirty samples, one clean reading.",
    body: "Pump motors spike the analog line. A circular buffer collects a sample every 40 ms, and a 30-sample running median strips the spikes before a third-order polynomial turns voltage into ppm.",
    visual: <EquationVisual />,
  },
];

/* ---------- Figures ---------- */

const FIGURES = [
  {
    id: "architecture",
    label: "Architecture",
    title: "Three processes, one closed loop.",
    description:
      "Real-time monitoring, fertiliser mixing and the user interface, joined around a NodeMCU ESP32 that reads the sensors and drives the pumps and valves.",
    src: `${IMG}/fig-1-system-overview.png`,
    alt: "Overall IoT-based fertiliser mixing system processes: Real-Time Monitoring, Fertiliser Mixing System, and User-End Experience",
    width: 1408,
    height: 779,
  },
  {
    id: "circuit",
    label: "Circuit",
    title: "The full wiring, on one page.",
    description:
      "The ESP32 expansion board, relay modules, an AC-to-12 V power supply, the TDS and water-level sensors, flow sensors, pumps and solenoid valves.",
    src: `${IMG}/fig-3-circuit-design.png`,
    alt: "Circuit design diagram showing full ESP32 wiring schematic, relay modules, buck converter, and sensors",
    width: 1211,
    height: 730,
  },
  {
    id: "workflow",
    label: "Workflow",
    title: "A flowchart of the loop.",
    description: "The decisions and operations of the code, from reading the sensors to acting on a command from the Blynk app.",
    src: `${IMG}/fig-4-firmware-flowchart.png`,
    alt: "Process flow of the prototype code implementation flowchart",
    width: 1340,
    height: 1001,
    narrow: true,
  },
];

/* ---------- Experiments ---------- */

interface Experiment {
  kicker: string;
  lead: string;
  result: string;
  body: string;
  images: { src: string; alt: string; width: number; height: number }[];
  stats: { value: string; label: string; note: string; accent?: boolean }[];
  note: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    kicker: "Test 1 of 5",
    lead: "TDS accuracy.",
    result: "99.6% across four concentrations.",
    body: "The TDS sensor against a calibrated TDS meter, at four solution strengths made by diluting a 900 ppm fertiliser AB solution. Each was measured three times.",
    images: [
      {
        src: `${IMG}/fig-5-tds-test-setup.jpg`,
        alt: "Accuracy test setup of the TDS sensor using 4 solution concentrations",
        width: 1216,
        height: 693,
      },
      {
        src: `${IMG}/fig-6-tds-accuracy-chart.png`,
        alt: "Graph of TDS sensor accuracy comparing sensor readings with calibrated meter",
        width: 1463,
        height: 870,
      },
    ],
    stats: [
      { value: "99.56%", label: "896.0 vs 898 ppm", note: "Concentrated, 900 ppm" },
      { value: "99.90%", label: "666.7 vs 666 ppm", note: "First dilution" },
      { value: "99.93%", label: "458.3 vs 458 ppm", note: "Second dilution" },
      { value: "99.01%", label: "232.7 vs 235 ppm", note: "Third dilution" },
    ],
    note: "Mean accuracy of 99.60% across all four, with a maximum deviation of 4.0 ppm.",
  },
  {
    kicker: "Test 2 of 5",
    lead: "Calibration stability.",
    result: "Seven days, under 2% drift.",
    body: "A mineral-water reference labelled 258 ppm, measured at the same time every day for seven days and compared with the initial calibration value.",
    images: [
      {
        src: `${IMG}/fig-7-blynk-calibration-setup.jpg`,
        alt: "Setup for TDS calibration stability test with 258 ppm reference solution and Blynk IoT monitoring",
        width: 991,
        height: 468,
      },
      {
        src: `${IMG}/fig-8-tds-stability-chart.png`,
        alt: "Graph of TDS sensor reading stability over a 7-day monitoring period",
        width: 1463,
        height: 660,
      },
    ],
    stats: [
      { value: "256.4 ppm", label: "7-day mean reading", note: "Reference standard: 258.0 ppm" },
      { value: "1.94%", label: "Maximum drift", note: "Observed on day 2, at 253 ppm" },
      { value: "0.00%", label: "Drift on day 6", note: "An exact match with the initial calibration" },
    ],
    note: "Readings stayed within 2% of the initial 258 ppm calibration for the whole week.",
  },
  {
    kicker: "Test 3 of 5",
    lead: "Flow precision.",
    result: "94% or better at every volume.",
    body: "Both flow sensors across four target volumes, 250, 500, 750 and 1,000 ml. Tap water stood in for fertiliser, and each dose was checked in a calibrated container, three times.",
    images: [
      {
        src: `${IMG}/fig-9-flow-sensor-testbench.jpg`,
        alt: "Test-bench configuration for flow rate evaluation of dual sensors",
        width: 1280,
        height: 678,
      },
    ],
    stats: [
      {
        value: "97.18%",
        label: "Flow sensor 1, mean precision",
        note: "235.0 ml at 250 (94.00%) · 478.3 at 500 (95.66%) · 746.6 at 750 (99.54%) · 995.0 at 1,000 (99.50%)",
      },
      {
        value: "97.90%",
        label: "Flow sensor 2, mean precision",
        note: "236.7 ml at 250 (94.68%) · 501.7 at 500 (99.66%) · 756.7 at 750 (99.10%) · 1,018.3 at 1,000 (98.17%)",
      },
    ],
    note: "Both sensors reached 94% accuracy or better at every volume tested.",
  },
  {
    kicker: "Test 4 of 5",
    lead: "Concentration adjustment.",
    result: "From 103 to 800 ppm, step by step.",
    body: "Measured amounts of concentrated AB fertiliser, 200, 300, 400 and 500 ml, added in turn to a hydroponic water store and mixed, with the sensor checked against a calibrated meter after each.",
    images: [
      {
        src: `${IMG}/fig-10-hydroponic-rig-dispensing.jpg`,
        alt: "Fertiliser dispensing process into the hydroponic water storage system",
        width: 479,
        height: 626,
      },
    ],
    stats: [
      { value: "96.00%", label: "103 → 200 ppm", note: "200 ml added · 187 ppm sensor, 192 meter" },
      { value: "98.75%", label: "192 → 400 ppm", note: "300 ml added · 392 ppm sensor, 395 meter" },
      { value: "92.83%", label: "395 → 600 ppm", note: "400 ml added · 559 ppm sensor, 557 meter" },
      { value: "95.50%", label: "557 → 800 ppm", note: "500 ml added · 769 ppm sensor, 764 meter" },
    ],
    note: "Between 92.83% and 98.75% of the target at every step. The readings rose almost linearly with each addition.",
  },
  {
    kicker: "Test 5 of 5",
    lead: "Response time.",
    result: "22.17 seconds, tap to delivery.",
    body: "From a command in the Blynk app to the system acting on it, timed with a stopwatch over three trials per action.",
    images: [
      {
        src: `${IMG}/fig-11-response-time-stopwatch.jpg`,
        alt: "Dispensing fertiliser AB while recording response time with precision stopwatch",
        width: 1206,
        height: 675,
      },
    ],
    stats: [
      { value: "10.85s", label: "Solenoid valves open", note: "Average of three trials" },
      { value: "1.07s", label: "Pump activation", note: "Average of three trials" },
      { value: "10.79s", label: "Fertiliser dispensed", note: "Average of three trials" },
      { value: "22.17s", label: "Total response time", note: "From the command being issued", accent: true },
    ],
    note: "A slight delay shows up during dispensing, but the system reacts quickly to user commands.",
  },
];

function ExperimentBlock({ experiment, index }: { experiment: Experiment; index: number }) {
  const { images, stats } = experiment;
  const single = images.length === 1;
  const portrait = single && images[0].height > images[0].width;
  const gridCols = stats.length === 2 ? "sm:grid-cols-2" : stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`${WRAP} py-14 sm:py-20`}>
      <Reveal>
        <p className="text-sm font-semibold text-[var(--pa)]">{experiment.kicker}</p>
        <h3 className="mt-2 max-w-3xl text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08]">
          <span className={`block ${GRAY}`}>{experiment.lead}</span>
          <span className={`block ${INK}`}>{experiment.result}</span>
        </h3>
        <p className={`mt-5 max-w-2xl text-base sm:text-lg ${GRAY} leading-relaxed`}>{experiment.body}</p>
      </Reveal>

      <Reveal delay={100}>
        <div
          className={`mt-10 rounded-[28px] bg-[var(--pa-tint)] p-4 sm:p-8 ${
            single ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center"
          }`}
        >
          {images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority={index === 0}
              sizes={single ? (portrait ? "(max-width: 768px) 80vw, 360px" : "(max-width: 1024px) 100vw, 880px") : "(max-width: 768px) 100vw, 480px"}
              className={`h-auto rounded-2xl dark:brightness-[0.93] dark:contrast-[1.02] ${
                single ? (portrait ? "w-full max-w-xs sm:max-w-sm" : "w-full max-w-4xl") : "w-full"
              }`}
            />
          ))}
        </div>
      </Reveal>

      <dl className={`mt-10 grid grid-cols-1 gap-x-8 gap-y-8 ${gridCols}`}>
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 70}>
            <dd className={`text-4xl sm:text-5xl font-semibold tracking-apple-hero tabular-nums ${stat.accent ? "text-[var(--pa)]" : INK}`}>
              {stat.value}
            </dd>
            <dt className={`mt-2 text-sm font-semibold ${INK}`}>{stat.label}</dt>
            <dd className={`mt-1 text-sm leading-relaxed ${GRAY}`}>{stat.note}</dd>
          </Reveal>
        ))}
      </dl>
      <p className={`mt-8 max-w-2xl text-[15px] leading-relaxed ${GRAY}`}>{experiment.note}</p>
    </div>
  );
}

export default function IotFertiliserCaseStudy({ project, nextProject }: Props) {
  return (
    <div className="project-theme selection:bg-emerald-500/20" style={projectThemeStyle(project.id)}>
      {/* 1. Hero */}
      {/* White in light mode so the photo, which has a white background, blends in. */}
      <section className="bg-white dark:bg-[var(--pa-tint)] overflow-hidden">
        <div className={`${WRAP} pt-24 sm:pt-28 text-center`}>
          <div className="flex justify-center">
            <CaseStudyBreadcrumb title="IoT Fertiliser Mixing" />
          </div>
          <p className="mt-4 text-sm font-semibold text-[var(--pa)]">
            Peer-reviewed · IJIE Vol. 18(1), 2026
          </p>
          <h1 className={`mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            Nutrients, <span className="whitespace-nowrap">to the millilitre.</span>
          </h1>
          <p className={`mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`}>
            {project.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <a href={DOI} target="_blank" rel="noopener noreferrer" aria-label="Read the paper on IJIE via DOI (opens in a new tab)" className={PILL}>
              Read the paper
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View the firmware on GitHub (opens in a new tab)" className={LINK}>
                View the firmware
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="mt-10 sm:mt-14 pb-14 sm:pb-20 flex justify-center">
            <div className="w-full max-w-3xl rounded-[28px] bg-[#FFFFFF] p-3 sm:p-6 shadow-sm ring-1 ring-black/[0.05] dark:ring-white/10">
              <Image
                src={`${IMG}/fig-2a-prototype-layout.jpg`}
                alt="Prototype layout showing flow sensors, ESP32 expansion board, dual relay modules, and solenoid valves"
                width={751}
                height={581}
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The problem, in one screen */}
      <section className={`${WRAP} py-28 sm:py-40`}>
        <GaugeStatement
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          problem="In hydroponics, nutrient strength is held by hand. Add fertiliser AB, check the TDS, adjust, repeat."
          steps={["Add fertiliser AB", "check the TDS", "adjust", "repeat"]}
          answer="This prototype takes over. Set a ratio for your crop on your phone, and it mixes, measures and corrects the concentration for you."
          ticks={["mixes", "measures", "corrects"]}
        />
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

      {/* 3b. Videos */}
      <section aria-label="Videos" className="max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-32">
        <Reveal>
          <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>
            See it <span className={GRAY}>in action.</span>
          </h2>
        </Reveal>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {VIDEOS.map((video, i) => (
            <Reveal key={video.id} delay={i * 120}>
              <YouTubeEmbed id={video.id} title={video.title} />
              <p className={`mt-4 text-sm sm:text-base ${GRAY} leading-snug`}>{video.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Figures from the paper */}
      <section aria-label="Figures from the paper" className="py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-8">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>See how it’s built.</h2>
            <p className={`mt-3 mb-10 text-lg ${GRAY} text-center`}>Three figures from the published paper.</p>
            <IotFigureTabs figures={FIGURES} />
          </Reveal>
        </div>
      </section>

      {/* 5. Validation */}
      <section aria-label="Experimental validation" className="pt-16 sm:pt-24">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-semibold ${INK} tracking-apple-hero max-w-3xl leading-[1.08]`}>
              Tested five ways.
            </h2>
            <p className={`mt-4 max-w-2xl text-lg ${GRAY} leading-relaxed`}>
              Each subsystem was measured against a reference, as documented in the <em>International Journal of Integrated Engineering</em>.
            </p>
          </Reveal>
        </div>
        {EXPERIMENTS.map((experiment, i) => (
          <ExperimentBlock key={experiment.kicker} experiment={experiment} index={i} />
        ))}
      </section>

      {/* 6. Results */}
      <section aria-label="Results" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">The headline numbers</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              Precise, and peer-reviewed.
            </h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {project.results.map((result, i) => (
              <Reveal key={result.label} delay={i * 80}>
                <dt className="text-sm font-semibold text-[var(--pa-d)]">{result.label}</dt>
                <dd className="mt-1 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-apple-hero tabular-nums">
                  <CountUp value={result.metric} />
                </dd>
                <dd className="mt-3 text-sm text-[#A1A1A6] leading-relaxed">{result.description}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* 7. Publication */}
      <section aria-label="Publication" className="py-16 sm:py-24 bg-[var(--pa-tint)]">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[var(--pa)]">Peer-reviewed · Scopus and MyCite indexed · Open access</p>
            <h2 className={`mt-2 max-w-3xl text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>
              IoT-Based Fertiliser Mixing for Precision Farming.
            </h2>
            <div className={`mt-6 max-w-3xl space-y-1.5 text-base leading-relaxed ${GRAY}`}>
              <p>
                <strong className={`font-semibold ${INK}`}>Sri Tulasi Ram Rajalingam</strong> (first and lead author), Muhammad Muzakkir Mohd Nadzri, Afandi Ahmad (corresponding author) and Mohamad Khairi Ishak.
              </p>
              <p>Faculty of Electrical and Electronic Engineering, Universiti Tun Hussein Onn Malaysia (UTHM). Co-author affiliation: Department of Computer Engineering, University of Sharjah.</p>
              <p className={`text-sm ${INK}`}>
                <em>International Journal of Integrated Engineering</em>, Vol. 18, No. 1 (2026), pp. 186–201. DOI 10.30880/ijie.2026.18.01.014
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 max-w-3xl">
              <CopyCitation text={BIBTEX} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
              <a href={DOI} target="_blank" rel="noopener noreferrer" aria-label="Resolve the paper via DOI (opens in a new tab)" className={PILL}>
                Resolve via DOI
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={PUBLISHER} target="_blank" rel="noopener noreferrer" aria-label="Open the publisher portal at UTHM (opens in a new tab)" className={LINK}>
                Publisher portal
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Inspect the firmware on GitHub (opens in a new tab)" className={LINK}>
                  Firmware on GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Next project */}
      <section aria-label="Next project" className={`${WRAP} py-20 sm:py-28`}>
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block rounded-[28px] bg-[var(--pa-tint)] p-8 sm:p-12 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
        >
          <p className="text-sm font-semibold text-[var(--pa)]">Next project</p>
          <h2 className={`mt-2 text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero leading-[1.08]`}>{nextProject.title}</h2>
          <p className={`mt-3 max-w-2xl text-lg ${GRAY} leading-relaxed`}>{nextProject.subtitle}</p>
          <span className="mt-8 inline-flex items-center gap-1 text-[17px] text-[var(--pa)] group-hover:underline">
            {nextProject.ctaLabel || "Explore the case study"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </section>
    </div>
  );
}
