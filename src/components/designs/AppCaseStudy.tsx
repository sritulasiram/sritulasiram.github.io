import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import CardCarousel from "@/components/shared/CardCarousel";
import CountUp from "@/components/shared/CountUp";
import DesignExploreMore from "@/components/designs/DesignExploreMore";
import Reveal from "@/components/shared/Reveal";
import Button from "@/components/ui/Button";
import ScrollTypeText from "@/components/shared/ScrollTypeText";
import StrikeStatement from "@/components/designs/StrikeStatement";
import FocusStatement from "@/components/designs/FocusStatement";
import BreatheStatement from "@/components/designs/BreatheStatement";
import TicketStatement from "@/components/designs/TicketStatement";
import IphoneFrame from "@/components/mockups/IphoneFrame";
import PhoneFlow from "@/components/designs/PhoneFlow";
import YouTubeEmbed from "@/components/shared/YouTubeEmbed";
import type { DesignCaseStudy, DesignItem } from "@/types";

const ACCENT = "text-[var(--pa)]";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const PANEL = "rounded-[28px] bg-[var(--pa-tint)] px-4 pt-8 sm:px-6 sm:pt-12 overflow-hidden";

export interface StudyPhone {
  src: string;
  alt: string;
}

export interface StudySwatch {
  name: string;
  hex: string;
  note: string;
  /** Text colour on top of the swatch. */
  fg: string;
}

export interface AppStudyConfig {
  /** Two-tone hero headline: ink line, then accent line. */
  headline: [string, string];
  /** Hero phones: the centre one is largest. */
  hero: { left: StudyPhone; center: StudyPhone; right: StudyPhone };
  flowTitle: [string, string];
  flowSubtitle: string;
  chapters: { gray: string; ink: string; body: string; phones: StudyPhone[] }[];
  visual: { gray: string; ink: string; swatches: StudySwatch[]; sample: ReactNode };
  featureIcons: LucideIcon[];
  resultsHeadline: string;
  /**
   * A custom reveal for the problem statement. "strike" crosses out each phrase; "focus" puts each
   * phrase in a viewfinder. Without it, the words rise in one after another.
   */
  statement?: { kind: "strike" | "focus" | "breathe" | "ticket"; phrases?: string[]; badge?: string };
  /** A soft glow behind the hero phones that rises and falls like breathing. */
  heroGlow?: boolean;
}

const delay = (s: number): CSSProperties => ({ "--d": `${s}s` }) as CSSProperties;

function Phone({ src, alt, className = "", style }: StudyPhone & { className?: string; style?: CSSProperties }) {
  return (
    <div role="img" aria-label={alt} className={`aspect-[420/870] ${className}`} style={style}>
      <IphoneFrame src={src} theme="light" hideStatusBar />
    </div>
  );
}

/** Phones sit on the panel's bottom edge and run off it, the way Apple crops product shots. */
function PhoneRow({ phones }: { phones: StudyPhone[] }) {
  return (
    <div className="flex items-end justify-center gap-[2%]">
      {phones.map((p, i) => (
        <Reveal key={p.src} delay={200 + i * 130} className={`shrink-0 ${phones.length > 2 ? "w-[32%]" : "w-[46%]"}`}>
          <Phone {...p} className="w-full translate-y-[12%]" />
        </Reveal>
      ))}
    </div>
  );
}

export default function AppCaseStudy({
  design,
  nextDesign,
  config,
}: {
  design: DesignCaseStudy;
  nextDesign: DesignItem;
  config: AppStudyConfig;
}) {
  const { hero, chapters, visual } = config;
  const links = [
    design.figmaUrl && { href: design.figmaUrl, label: "Inspect in Figma" },
    design.liveUrl && { href: design.liveUrl, label: design.liveLabel ?? "Visit live site" },
    design.githubUrl && { href: design.githubUrl, label: "View on GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));
  const screens = design.screens ?? [];
  const meta = [
    { label: "Role", value: design.role },
    { label: "Platform", value: design.platform },
    { label: "Tool", value: design.tool },
    { label: "Timeframe", value: design.timeframe },
  ];

  return (
    <div>
      {/* 1. Hero */}
      {/* Sage keeps its own breathing glow; the other designs share the hero-glow mist. */}
      <section
        className={
          config.heroGlow
            ? "relative overflow-hidden"
            : `hero-glow hero-glow-d-${design.id} overflow-hidden`
        }
      >
        {config.heroGlow && (
          <div
            aria-hidden="true"
            className="breathe-glow pointer-events-none absolute bottom-0 left-1/2 h-[70%] w-[min(900px,90%)] -translate-x-1/2 rounded-full blur-2xl"
          />
        )}
        <div className={`${WRAP} relative pt-24 sm:pt-32 text-center`}>
          <p className={`story-rise text-xl sm:text-2xl font-semibold ${INK} tracking-apple-tight`} style={delay(0)}>{design.title}</p>
          <h1 className={`mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold ${INK} tracking-apple-hero leading-[1.03]`}>
            <span className="story-rise block" style={delay(0.1)}>{config.headline[0]}</span>
            <span className={`story-rise block ${ACCENT}`} style={delay(0.22)}>{config.headline[1]}</span>
          </h1>
          <p className={`story-rise mt-5 mx-auto max-w-2xl text-lg sm:text-xl ${GRAY} leading-relaxed tracking-apple-subhead`} style={delay(0.38)}>
            {design.tagline}
          </p>
          {links.length > 0 && (
            <div className="story-rise mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" style={delay(0.46)}>
              {links.map((l) => (
                <Button key={l.href} variant="link" href={l.href}>
                  {l.label}
                </Button>
              ))}
            </div>
          )}
          <div className="mt-10 sm:mt-14 relative mx-auto h-[300px] sm:h-[520px] max-w-3xl">
            <Phone
              {...hero.left}
              style={delay(0.7)}
              className="story-phone absolute bottom-0 left-[2%] sm:left-[6%] w-[34%] max-w-[220px] translate-y-[10%]"
            />
            <Phone
              {...hero.right}
              style={delay(0.7)}
              className="story-phone absolute bottom-0 right-[2%] sm:right-[6%] w-[34%] max-w-[220px] translate-y-[10%]"
            />
            <Phone
              {...hero.center}
              style={delay(0.55)}
              className="story-phone absolute bottom-0 left-1/2 w-[44%] max-w-[290px] -translate-x-1/2 translate-y-[6%] drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. Facts */}
      <section aria-label="Project details">
        <dl className={`${WRAP} grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 py-16 sm:py-24`}>
          {meta.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <dt className={`text-sm font-medium ${GRAY}`}>{m.label}</dt>
              <dd className={`mt-2 text-xl sm:text-2xl font-semibold leading-snug tracking-apple-tight ${INK}`}>{m.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* 3. The problem, typed out as you scroll */}
      <section aria-label="The problem" className={`${WRAP} py-28 sm:py-40`}>
        {config.statement ? (
          config.statement.kind === "focus" ? (
            <FocusStatement
              className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
              problem={design.background.problemStatement}
              focus={config.statement.phrases ?? []}
              answer={design.background.context}
            />
          ) : config.statement.kind === "breathe" ? (
            <BreatheStatement
              className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
              problem={design.background.problemStatement}
              answer={design.background.context}
            />
          ) : config.statement.kind === "ticket" ? (
            <TicketStatement
              className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
              problem={design.background.problemStatement}
              numbered={config.statement.phrases ?? []}
              answer={design.background.context}
              badge={config.statement.badge ?? ""}
            />
          ) : (
            <StrikeStatement
              className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
              problem={design.background.problemStatement}
              strike={config.statement.phrases ?? []}
              answer={design.background.context}
            />
          )
        ) : (
          <ScrollTypeText
            mode="words"
            className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
            segments={[
              { text: `${design.background.problemStatement} `, className: GRAY },
              { text: design.background.context, className: INK },
            ]}
          />
        )}
      </section>

      {/* 4. The flow, pinned */}
      <section aria-label="Screen flow" className="max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-32">
        <Reveal>
          <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>
            {config.flowTitle[0]} <span className={GRAY}>{config.flowTitle[1]}</span>
          </h2>
          <p className={`mt-3 mb-10 sm:mb-16 text-lg ${GRAY} text-center`}>{config.flowSubtitle}</p>
        </Reveal>
        <PhoneFlow screens={screens} />
      </section>

      {/* 4b. Videos */}
      {design.videos && design.videos.length > 0 && (
        <section aria-label="Videos" className="max-w-6xl mx-auto w-full px-6 sm:px-8 pb-20 sm:pb-32">
          <Reveal>
            <h2 className={`text-3xl sm:text-5xl font-semibold ${INK} tracking-apple-hero text-center`}>
              See it <span className={GRAY}>in motion.</span>
            </h2>
          </Reveal>
          <div className={`mt-10 sm:mt-14 grid grid-cols-1 gap-6 ${design.videos.length > 1 ? "md:grid-cols-2" : "max-w-3xl mx-auto"}`}>
            {design.videos.map((video, i) => (
              <Reveal key={video.id} delay={i * 120}>
                <YouTubeEmbed id={video.id} title={video.title} />
                <p className={`mt-4 text-sm sm:text-base ${GRAY} leading-snug`}>{video.title}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 5. Chapters */}
      <section aria-label="Design decisions" className="pb-12 sm:pb-20">
        {chapters.map((chapter, i) => (
          <div key={chapter.ink} className={`${WRAP} py-14 sm:py-24`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08]">
                  <span className={`block ${GRAY}`}>{chapter.gray}</span>
                  <span className={`block ${INK}`}>{chapter.ink}</span>
                </h2>
                <p className={`mt-5 text-base sm:text-lg ${GRAY} leading-relaxed`}>{chapter.body}</p>
              </Reveal>
              <Reveal delay={120} className={i % 2 ? "md:order-1" : ""}>
                <div className={PANEL}>
                  <PhoneRow phones={chapter.phones} />
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* 6. Design system */}
      <section aria-label="Visual language" className="py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08] max-w-3xl">
              <span className={GRAY}>{visual.gray}</span> <span className={INK}>{visual.ink}</span>
            </h2>
            <p className={`mt-5 max-w-2xl text-base sm:text-lg ${GRAY} leading-relaxed`}>{design.architecture.summary}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
            <div className="grid grid-cols-2 gap-4">
              {visual.swatches.map((s, i) => (
                <Reveal key={s.name} delay={i * 80} className="[&:last-child:nth-child(odd)]:col-span-2">
                  <div
                    className="rounded-2xl p-5 h-full min-h-[150px] flex flex-col justify-end ring-1 ring-black/5 dark:ring-white/10"
                    style={{ backgroundColor: s.hex, color: s.fg }}
                  >
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs font-mono opacity-80">{s.hex}</p>
                    <p className="mt-1 text-xs opacity-80">{s.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={Math.max(visual.swatches.length, 3) * 80} className="h-full">{visual.sample}</Reveal>
          </div>
        </div>
      </section>

      {/* 7. Features */}
      <Reveal>
      <CardCarousel title="Get the highlights." label="Highlights" plain>
        {design.keyFeatures.map((feature, i) => {
          const Icon = config.featureIcons[i % config.featureIcons.length];
          return (
            <article
              key={feature.title}
              className="snap-start shrink-0 w-[78vw] sm:w-[320px] min-h-[360px] rounded-[28px] bg-[#F5F5F7] dark:bg-[#1D1D1F] p-8 flex flex-col"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pa-soft)]">
                <Icon className={`h-6 w-6 ${ACCENT}`} aria-hidden="true" />
              </span>
              <p className={`mt-6 text-xs font-semibold uppercase tracking-wider ${ACCENT}`}>{feature.badge}</p>
              <h3 className={`mt-2 text-2xl font-semibold ${INK} tracking-apple-tight leading-tight`}>{feature.title}</h3>
              <p className={`mt-3 text-[15px] ${GRAY} leading-relaxed`}>{feature.description}</p>
            </article>
          );
        })}
      </CardCarousel>
      </Reveal>

      {/* 8. Results */}
      <section aria-label="At a glance" className="bg-[var(--pa-deep)] text-white py-24 sm:py-32">
        <div className={WRAP}>
          <Reveal>
            <p className="text-sm font-semibold text-[#86868B]">At a glance</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-apple-hero max-w-2xl leading-[1.08]">
              {config.resultsHeadline}
            </h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {design.results.map((result, i) => (
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

      {/* 9. Keep exploring */}
      <DesignExploreMore nextDesign={nextDesign} figmaUrl={design.figmaUrl} githubUrl={design.githubUrl} liveUrl={design.liveUrl} />
    </div>
  );
}
