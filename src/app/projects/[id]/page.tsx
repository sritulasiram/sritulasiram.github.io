import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectThemeStyle } from "@/data/projectTheme";
import Footer from "@/components/layout/Footer";
import WarrantyRmaCaseStudy from "@/components/projects/case-studies/WarrantyRmaCaseStudy";
import IotFertiliserCaseStudy from "@/components/projects/case-studies/IotFertiliserCaseStudy";
import RaspberryPiDiagnosticCaseStudy from "@/components/projects/case-studies/RaspberryPiDiagnosticCaseStudy";
import OpenCoreEfiCaseStudy from "@/components/projects/case-studies/OpenCoreEfiCaseStudy";
import RogGamingCenterCaseStudy from "@/components/projects/case-studies/RogGamingCenterCaseStudy";
import HrAssistiveIntelligenceCaseStudy from "@/components/projects/case-studies/HrAssistiveIntelligenceCaseStudy";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { PROJECTS_DATA } from "@/data/content";
import ProjectLocalNav from "@/components/projects/ProjectLocalNav";
import { isShowcaseProject } from "@/data/projectSpecs";

interface PageProps {
  params: Promise<{ id: string }>;
}

const PROJECT_ALIASES: Record<string, string> = {
  "cytron-rma": "warranty-rma",
  "opencore-efi-gl503ge": "opencore-efi-hackintosh",
  "opencore-efi": "opencore-efi-hackintosh",
};

function getProject(id: string) {
  const canonicalId = PROJECT_ALIASES[id] || id;
  return PROJECT_DETAILS[canonicalId];
}

export async function generateStaticParams() {
  const ids = Array.from(
    new Set([
      ...PROJECTS_DATA.map((p) => p.id),
      ...Object.keys(PROJECT_ALIASES),
    ])
  );
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${PROJECT_ALIASES[id] || id}` },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  // Find next project for circular navigation using canonical id
  const canonicalId = PROJECT_ALIASES[id] || id;
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === canonicalId);
  const nextProject =
    PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length] || PROJECTS_DATA[0];

  const showcase = isShowcaseProject(canonicalId);

  return (
    <main id="main-content" tabIndex={-1} style={showcase ? projectThemeStyle(canonicalId) : undefined} className={`${showcase ? "project-theme pt-12 " : ""}min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]`}>
      {showcase && (
        <ProjectLocalNav projectId={canonicalId} title={project.title} githubUrl={project.githubUrl} />
      )}

      {/* Tailored Case Study Layout Based on Content */}
      {canonicalId === "warranty-rma" && (
        <WarrantyRmaCaseStudy project={project} nextProject={nextProject} />
      )}

      {canonicalId === "iot-fertiliser-mixing" && (
        <IotFertiliserCaseStudy project={project} nextProject={nextProject} />
      )}

      {canonicalId === "raspberry-pi-diagnostics" && (
        <RaspberryPiDiagnosticCaseStudy project={project} nextProject={nextProject} />
      )}

      {canonicalId === "opencore-efi-hackintosh" && (
        <OpenCoreEfiCaseStudy project={project} />
      )}

      {canonicalId === "rog-gaming-center" && (
        <RogGamingCenterCaseStudy project={project} />
      )}

      {canonicalId === "cytron-hr-assistive-intelligence" && (
        <HrAssistiveIntelligenceCaseStudy project={project} nextProject={nextProject} />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

