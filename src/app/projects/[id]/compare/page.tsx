import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectThemeStyle } from "@/data/projectTheme";
import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import ProjectLocalNav from "@/components/projects/ProjectLocalNav";
import ProjectCompare from "@/components/projects/ProjectCompare";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { PROJECT_SPECS, SHOWCASE_PROJECT_IDS } from "@/data/projectSpecs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SHOWCASE_PROJECT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];
  if (!project || !PROJECT_SPECS[id]) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: `${project.title} compared with Cytron's other internal tools.`,
    alternates: { canonical: `/projects/${id}/compare` },
  };
}

export default async function ProjectComparePage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];
  if (!project || !PROJECT_SPECS[id]) notFound();

  return (
    <main id="main-content" tabIndex={-1} style={projectThemeStyle(id)} className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col pt-12 selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      <ProjectLocalNav projectId={id} title={project.title} githubUrl={project.githubUrl} />
      <ProjectCompare projectId={id} title={project.title} />
      <Footer {...FOOTER_COPY.projects} />
    </main>
  );
}
