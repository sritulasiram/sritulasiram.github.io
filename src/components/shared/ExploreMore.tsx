import { PROJECTS_DATA } from "@/data/content";
import { hasCompare } from "@/data/projectCompare";
import { isShowcaseProject } from "@/data/projectSpecs";
import { projectThemeStyle } from "@/data/projectTheme";
import type { ProjectItem } from "@/types";
import NextUp, { type NextUpLink } from "./NextUp";

/** The end of a project's overview page: links to its Tech Specs and Compare pages, then the next project. */
export default function ExploreMore({
  projectId,
  nextProject,
  nextKicker = "Next project",
}: {
  projectId: string;
  nextProject: ProjectItem;
  /** Label above the next-project tile, such as "The companion app". */
  nextKicker?: string;
}) {
  const title = PROJECTS_DATA.find((p) => p.id === projectId)?.title;
  // Tech Specs exists for the showcase projects, and Compare only for the three internal tools.
  const links: NextUpLink[] = [
    ...(isShowcaseProject(projectId) ? [{ label: "Tech Specs", href: `/projects/${projectId}/specs` }] : []),
    ...(hasCompare(projectId) ? [{ label: "Compare", href: `/projects/${projectId}/compare` }] : []),
    { label: "All projects", href: "/projects" },
  ];

  return (
    <NextUp
      context={title ? `More on ${title}.` : "Keep exploring."}
      links={links}
      next={{
        kicker: nextKicker,
        title: nextProject.title,
        body: nextProject.outcome,
        href: `/projects/${nextProject.id}`,
        imageSrc: nextProject.imageSrc,
        accent: projectThemeStyle(nextProject.id),
      }}
    />
  );
}
