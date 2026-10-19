import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectThemeStyle } from "@/data/projectTheme";
import Footer from "@/components/layout/Footer";
import ProjectLocalNav from "@/components/projects/ProjectLocalNav";
import ProjectTechSpecs from "@/components/projects/ProjectTechSpecs";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { PROJECT_SPECS, SHOWCASE_PROJECT_IDS } from "@/data/projectSpecs";
import { PROJECTS_DATA } from "@/data/content";

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
    description: `Technical specifications for ${project.title}.`,
    alternates: { canonical: `/projects/${id}/specs` },
  };
}

export default async function ProjectSpecsPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];
  const groups = PROJECT_SPECS[id];
  if (!project || !groups) notFound();

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === id);
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length] || PROJECTS_DATA[0];

  return (
    <main id="main-content" tabIndex={-1} style={projectThemeStyle(id)} className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col pt-12 selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      <ProjectLocalNav projectId={id} title={project.title} githubUrl={project.githubUrl} />
      <ProjectTechSpecs
        projectId={id}
        title={project.title}
        tagline={project.tagline}
        groups={groups}
        nextProject={nextProject}
      />
      <Footer />
    </main>
  );
}
