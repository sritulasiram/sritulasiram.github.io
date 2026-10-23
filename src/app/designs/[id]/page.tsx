import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Calendar,
  Building2,
  UserCheck,
  Layers,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ProjectImage from "@/components/ui/ProjectImage";
import DesignPhoneStage from "@/components/designs/DesignPhoneStage";
import { DESIGN_ACCENT } from "@/components/designs/designStage";
import DesignScreensMarquee from "@/components/designs/DesignScreensMarquee";
import AppCaseStudy from "@/components/designs/AppCaseStudy";
import { APP_STUDIES } from "@/components/designs/appStudies";
import WebCaseStudy from "@/components/designs/WebCaseStudy";
import { WEB_STUDIES } from "@/components/designs/webStudies";
import { DESIGN_DETAILS, DESIGNS_DATA } from "@/data/designDetails";
import { accentStyle } from "@/data/projectTheme";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return DESIGNS_DATA.map((design) => ({
    id: design.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const design = DESIGN_DETAILS[id];

  if (!design) {
    return {
      title: "Design Not Found",
    };
  }

  return {
    title: design.title,
    description: design.tagline,
    alternates: { canonical: `/designs/${id}` },
    ...pageSocial({
      title: design.title,
      description: design.tagline,
      path: `/designs/${id}`,
      image: design.imageSrc,
    }),
  };
}

export default async function DesignDetailPage({ params }: PageProps) {
  const { id } = await params;
  const design = DESIGN_DETAILS[id];

  if (!design) {
    notFound();
  }

  // Find next design for navigation
  const currentIndex = DESIGNS_DATA.findIndex((d) => d.id === id);
  const nextDesign =
    DESIGNS_DATA[(currentIndex + 1) % DESIGNS_DATA.length];

  const webStudy = WEB_STUDIES[id];
  if (webStudy) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        style={accentStyle(webStudy.accent)}
        className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]"
      >
        <WebCaseStudy design={design} nextDesign={nextDesign} config={webStudy.config} />
        <Footer {...FOOTER_COPY.designs} />
      </main>
    );
  }

  const study = APP_STUDIES[id];
  if (study) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        style={accentStyle(study.accent)}
        className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]"
      >
        <AppCaseStudy design={design} nextDesign={nextDesign} config={study.config} />
        <Footer {...FOOTER_COPY.designs} />
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1. Case Study Hero Section */}
      <section className="pt-24 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6] mb-5 sm:mb-6">
          <Link href="/" className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors min-h-[44px] flex items-center">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
          <Link href="/designs" className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors min-h-[44px] flex items-center">
            Designs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
          <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">{design.title}</span>
        </div>

        {/* Headline & Description */}
        <div className="space-y-5 max-w-4xl">
          <div className="flex items-center gap-4 sm:gap-5">
            {design.logoSrc && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E5EA] dark:border-white/10 bg-white dark:bg-[#161618] p-1 shadow-2xs shrink-0">
                <Image
                  src={design.logoSrc}
                  alt={`${design.title} Brand Logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                />
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
              {design.title}
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {design.tagline}
          </p>

          {(design.githubUrl || design.figmaUrl || design.liveUrl) && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {design.figmaUrl && (
                <Button href={design.figmaUrl} icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
                  Inspect in Figma
                </Button>
              )}
              {design.liveUrl && (
                <Button variant="secondary" href={design.liveUrl} icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
                  {design.liveLabel ?? "Visit live site"}
                </Button>
              )}
              {design.githubUrl && (
                <Button variant="secondary" href={design.githubUrl} icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
                  View repository on GitHub
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-10 mt-10 border-t border-[#E5E5EA] dark:border-[#2C2C2E]">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Organization
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{design.organization}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Role
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{design.role}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Timeframe
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{design.timeframe}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Tools &amp; Platform
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{design.tool}</p>
          </div>
        </div>
      </section>

      {/* 2. Full-Bleed 16:10 / 16:9 Hero Mockup Presentation */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full mb-12 sm:mb-16">
        <div className={`${design.heroLayout === "phone" ? "aspect-[4/3]" : "aspect-[16/9]"} sm:aspect-[16/10] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#E5E5EA] dark:border-[#2C2C2E] bg-white dark:bg-[#121214] apple-card-shadow transition-colors`}>
          {design.heroLayout === "phone" ? (
            <DesignPhoneStage
              src={design.imageSrc}
              alt={`${design.title} app screen`}
              color={DESIGN_ACCENT[design.id] ?? "#0071E3"}
              className="w-full h-full"
            />
          ) : (
            <ProjectImage
              src={design.imageSrc}
              alt={design.title}
              placeholderLabel={design.placeholderLabel}
              ratioText={design.placeholderRatio}
              type="screenshot"
              className="w-full h-full"
            />
          )}
        </div>
      </section>

      {/* 2b. Moving Screen Preview Ribbon (Void App) */}
      {design.screens && design.screens.length > 0 && (
        <section className="max-w-6xl mx-auto w-full mb-20 sm:mb-28 px-6 sm:px-8">
          <DesignScreensMarquee
            screens={design.screens}
            meta={[
              { label: "Tools", value: design.tool },
              { label: "Platform", value: design.platform },
            ]}
            title="Screen flow"
            subtitle="Select a screen to inspect it."
          />
        </section>
      )}

      {/* 3. Problem Statement & UX Context */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA] dark:bg-[#0E0E11] border-y border-[#E5E5EA] dark:border-[#2C2C2E] transition-colors">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
              UX Context
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              The problem.
            </h2>
            <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              {design.background.problemStatement}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-white/[0.08] space-y-3 apple-card-shadow">
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Project Context</h3>
              <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed font-normal">
                {design.background.context}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-white/[0.08] space-y-4 apple-card-shadow">
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Design &amp; Workflow Challenges</h3>
              <ul className="space-y-2.5">
                {design.background.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF] mt-2 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dual-Role Features Matrix (If available) */}
      {design.roleFeatures && (
        <section className="py-20 sm:py-28 px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
              Dual-Role Workflows
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              Tailored views for every stakeholder.
            </h2>
            <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              Optimized for distinct permissions, actions, and milestones across student teams and faculty coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {design.roleFeatures.map((roleFeat) => (
              <div
                key={roleFeat.role}
                className="p-8 rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-6 apple-card-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF]" />
                  <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                    {roleFeat.role}
                  </h3>
                </div>

                <div className="space-y-4">
                  {roleFeat.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-white/[0.08] space-y-1">
                      <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Design Architecture & Component Cards */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
            Design Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Structure and interaction.
          </h2>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            {design.architecture.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {design.architecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3 apple-card-shadow"
            >
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                {comp.title}
              </h3>
              <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Key Design Features Grid */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0E0E11] border-y border-[#E5E5EA] dark:border-[#2C2C2E] transition-colors">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              Key features.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {design.keyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-white/[0.08] space-y-3 apple-card-shadow"
              >
                {feature.badge && (
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#0071E3] dark:text-[#2997FF] border border-[#E5E5EA] dark:border-white/10">
                    {feature.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tooling & Specification Stack */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
            Specifications &amp; Tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Tools and deliverables.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {design.techStack.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Usability & Quantitative Outcomes */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0E0E11] border-t border-[#E5E5EA] dark:border-[#2C2C2E] transition-colors">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#86868B]">
              Measurable Outcomes
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
              Impact across users.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {design.results.map((res) => (
              <div
                key={res.label}
                className="p-8 rounded-3xl bg-white dark:bg-[#161618] border border-[#E5E5EA] dark:border-white/[0.08] space-y-2 apple-card-shadow"
              >
                <p className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero tabular-nums">
                  {res.metric}
                </p>
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] pt-1">
                  {res.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Next Design Navigation Banner (Seamless) */}
      <section className="pt-10 sm:pt-14 pb-20 bg-white dark:bg-black transition-colors">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <Link
            href={`/designs/${nextDesign.id}`}
            className="group block space-y-4 transition-colors"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
              Next Design
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors leading-[1.1]">
                  {nextDesign.title}
                  <ChevronRight
                    aria-hidden="true"
                    className="inline-block w-7 h-7 sm:w-9 sm:h-9 ml-1 align-[-0.1em] text-[#6E6E73] dark:text-[#8E8E93] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </h3>
                <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  {nextDesign.subtitle}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 10. Contact Footer */}
      <Footer {...FOOTER_COPY.designs} />
    </main>
  );
}
