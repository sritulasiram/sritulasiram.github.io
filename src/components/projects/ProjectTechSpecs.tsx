import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  Cloud,
  Code2,
  Cpu,
  FileCheck,
  FileText,
  Gauge,
  Layers,
  MessageSquareText,
  PackageCheck,
  Printer,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  Timer,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import type { ProjectSpecGroup } from "@/data/projectSpecs";
import type { ProjectItem } from "@/types";

interface Props {
  projectId: string;
  title: string;
  tagline: string;
  groups: ProjectSpecGroup[];
  nextProject: ProjectItem;
}

const GROUP_ICONS: Record<string, LucideIcon> = {
  Retrieval: Search,
  Answers: MessageSquareText,
  Documents: FileText,
  "Privacy & Quality": ShieldCheck,
  Software: Code2,
  Platform: Server,
  "Repair Workflow": Workflow,
  SLA: Timer,
  "Supplier RMA": PackageCheck,
  Protection: ShieldAlert,
  Hardware: Printer,
  Assistant: Bot,
  "Storage & Access": Cloud,
  Quality: BadgeCheck,
  Diagnostics: Activity,
  "Power Audit": Zap,
  "Electrical Safety": ShieldCheck,
  Compatibility: Layers,
  Reports: FileCheck,
  Reliability: Gauge,
};

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ProjectTechSpecs({ projectId, title, tagline, groups, nextProject }: Props) {
  return (
    <div>
      <section className="pt-10 sm:pt-14 pb-10 sm:pb-14 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title={title} />
        <p className="text-sm font-semibold text-[var(--pa)]">{title}</p>
        <h1 className="mt-1 text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.04]">
          Tech Specs
        </h1>
        <p className="mt-5 max-w-2xl text-lg sm:text-xl text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed tracking-apple-subhead">
          {tagline}
        </p>

        <nav aria-label="Jump to a section" className="mt-8 flex flex-wrap gap-2">
          {groups.map((group) => {
            const Icon = GROUP_ICONS[group.title] ?? Cpu;
            return (
              <a
                key={group.title}
                href={`#${slug(group.title)}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[var(--pa-soft)] px-3.5 text-[13px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors hover:bg-[color-mix(in_srgb,var(--pa)_22%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Icon className="h-3.5 w-3.5 text-[var(--pa)]" aria-hidden="true" />
                {group.title}
              </a>
            );
          })}
        </nav>
      </section>

      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full" aria-label="Specifications">
        {groups.map((group) => {
          const Icon = GROUP_ICONS[group.title] ?? Cpu;
          return (
            <div
              key={group.title}
              id={slug(group.title)}
              className="scroll-mt-24 grid grid-cols-1 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-5 md:gap-12 py-9 sm:py-12 border-t border-[#D2D2D7] dark:border-[#424245]"
            >
              <div className="md:sticky md:top-24 self-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--pa-soft)]">
                  <Icon className="h-5 w-5 text-[var(--pa)]" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight">
                  {group.title}
                </h2>
              </div>

              <dl className="space-y-1">
                {group.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[10.5rem_minmax(0,1fr)] gap-1 sm:gap-6 py-3.5">
                    <dt className="text-[13px] font-semibold text-[#6E6E73] dark:text-[#86868B] sm:pt-1">{row.label}</dt>
                    <dd className="text-base sm:text-[17px] text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.55]">
                      {Array.isArray(row.value) ? (
                        <ul className="flex flex-wrap gap-2">
                          {row.value.map((item) => (
                            <li
                              key={item}
                              className="rounded-full bg-[var(--pa-soft)] px-3 py-1 text-sm font-medium leading-snug"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </section>

      <section className="px-6 sm:px-8 max-w-5xl mx-auto w-full pt-6 pb-20 border-t border-[#D2D2D7] dark:border-[#424245] mt-0">
        <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            href={`/projects/${projectId}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--pa)] hover:underline"
          >
            Back to Overview
          </Link>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group inline-flex items-center gap-2 text-sm text-[#6E6E73] dark:text-[#A1A1A6]"
          >
            <span>
              Next project:{" "}
              <span className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[var(--pa)] transition-colors">
                {nextProject.title}
              </span>
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
