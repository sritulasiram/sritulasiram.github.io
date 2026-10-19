import Link from "next/link";
import { ArrowRight, GitCompareArrows, ListChecks, Rocket, type LucideIcon } from "lucide-react";
import type { ProjectItem } from "@/types";

/** "Keep exploring" tiles at the foot of a product page, in the style of Apple's Explore more row. */
export default function ExploreMore({
  projectId,
  nextProject,
}: {
  projectId: string;
  nextProject: ProjectItem;
}) {
  const tiles: { href: string; icon: LucideIcon; kicker: string; title: string; body: string }[] = [
    {
      href: `/projects/${projectId}/specs`,
      icon: ListChecks,
      kicker: "Tech Specs",
      title: "Want the details?",
      body: "Every setting, limit and component, grouped and searchable by section.",
    },
    {
      href: `/projects/${projectId}/compare`,
      icon: GitCompareArrows,
      kicker: "Compare",
      title: "How does it stack up?",
      body: "See this project next to the other two, side by side.",
    },
    {
      href: `/projects/${nextProject.id}`,
      icon: Rocket,
      kicker: "Next project",
      title: nextProject.title,
      body: nextProject.subtitle,
    },
  ];

  return (
    <section aria-label="Keep exploring" className="max-w-5xl mx-auto w-full px-6 sm:px-8 py-20 sm:py-28">
      <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero">
        Keep exploring.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiles.map(({ href, icon: Icon, kicker, title, body }) => (
          <Link
            key={href}
            href={href}
            className="group flex min-h-[260px] flex-col rounded-[28px] bg-[var(--pa-tint)] p-7 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--pa-soft)]">
              <Icon className="h-5 w-5 text-[var(--pa)]" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--pa)]">{kicker}</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight">
              {title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">{body}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-[var(--pa)]">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
