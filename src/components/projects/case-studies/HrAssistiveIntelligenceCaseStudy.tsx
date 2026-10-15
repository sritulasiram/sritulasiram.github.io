"use client";

import Link from "next/link";
import {
  Building2,
  UserCheck,
  FlaskConical,
  Layers,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
import CaseStudyBreadcrumb from "@/components/CaseStudyBreadcrumb";
import HrAssistiveMacbook from "@/components/projects/HrAssistiveMacbook";
import type { CaseStudy, ProjectItem } from "@/types";

interface Props {
  project: CaseStudy;
  nextProject: ProjectItem;
}

const EYEBROW = "text-xs uppercase tracking-wider font-semibold text-[#0F8B8D] dark:text-[#40CBE0]";
const CARD =
  "p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] transition-colors";

export default function HrAssistiveIntelligenceCaseStudy({ project, nextProject }: Props) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero */}
      <section className="pt-24 sm:pt-28 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title={project.title} />

        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#0F8B8D]/10 text-[#0F8B8D] dark:text-[#40CBE0] border border-[#0F8B8D]/20">
            <MessagesSquare className="w-3 h-3" />
            <span>{project.eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
            {project.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Organization
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.organization}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Role
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.role}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" /> Status
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{project.timeframe}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B] font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Approach
            </p>
            <p className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">Retrieval-augmented generation</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 w-full max-w-3xl mx-auto">
          <HrAssistiveMacbook priority className="w-full h-auto drop-shadow-2xl" />
        </div>
      </section>

      {/* 2. Problem */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="space-y-3 max-w-3xl">
          <p className={EYEBROW}>01 · Problem Statement</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Answers people can trust, or no answer at all.
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            {project.background.problemStatement}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${CARD} p-7 rounded-3xl space-y-3 apple-card-shadow`}>
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Design Principle
            </h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              {project.background.context}
            </p>
          </div>

          <div className={`${CARD} p-7 rounded-3xl space-y-3 apple-card-shadow`}>
            <h3 className="text-xs font-semibold text-[#6E6E73] dark:text-[#86868B] uppercase tracking-wider">
              Engineering Challenges
            </h3>
            <ul className="space-y-2.5">
              {project.background.challenges.map((challenge, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D] dark:bg-[#40CBE0] mt-2 shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Architecture */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className={EYEBROW}>02 · System Architecture</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            From question to cited answer
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            {project.architecture.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {project.architecture.components.map((comp, idx) => (
            <div key={idx} className={`${CARD} space-y-2.5`}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0F8B8D]/10 text-[#0F8B8D] dark:text-[#40CBE0] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{comp.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pl-8">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Capabilities */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className={EYEBROW}>03 · Core Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Grounded, measurable, and easy to maintain
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {project.keyFeatures.map((feat, idx) => (
            <div key={idx} className={`${CARD} space-y-2`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{feat.title}</h3>
                {feat.badge && (
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#0F8B8D]/10 text-[#0F8B8D] dark:text-[#40CBE0] shrink-0">
                    {feat.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Design guarantees */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className={EYEBROW}>04 · Design Guarantees</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            What the system is built to guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl">
            The assistant is in pilot, so these are properties of the design rather than adoption figures.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.results.map((result, idx) => (
            <div key={idx} className={`${CARD} p-5 space-y-1.5 rounded-2xl`}>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white tabular-nums">
                {result.metric}
              </div>
              <p className="text-xs font-semibold text-[#0F8B8D] dark:text-[#40CBE0]">{result.label}</p>
              <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] leading-normal">{result.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Tech stack */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#6E6E73] dark:text-[#86868B]">
            05 · Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Backend, retrieval &amp; interface
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.techStack.map((group, idx) => (
            <div key={idx} className={`${CARD} space-y-3`}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#242426] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#3A3A3C]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Next project */}
      {nextProject && (
        <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pb-16">
          <Link
            href={`/projects/${nextProject.id}`}
            className="group block p-8 sm:p-10 rounded-3xl bg-[#FAFAFA] dark:bg-[#161618] border border-[#E5E5EA] dark:border-[#2C2C2E] hover:border-[#0071E3]/40 dark:hover:border-[#0071E3]/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#86868B]">
                  Next Project
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] max-w-xl">{nextProject.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] shrink-0 pt-2 sm:pt-0">
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
