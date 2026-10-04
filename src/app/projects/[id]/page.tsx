import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import WarrantyRmaCaseStudy from "@/components/case-studies/WarrantyRmaCaseStudy";
import IotFertiliserCaseStudy from "@/components/case-studies/IotFertiliserCaseStudy";
import RaspberryPiDiagnosticCaseStudy from "@/components/case-studies/RaspberryPiDiagnosticCaseStudy";
import OpenCoreEfiCaseStudy from "@/components/case-studies/OpenCoreEfiCaseStudy";
import RogGamingCenterCaseStudy from "@/components/case-studies/RogGamingCenterCaseStudy";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { PROJECTS_DATA } from "@/data/content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    ...PROJECTS_DATA.map((project) => ({ id: project.id })),
    { id: "cytron-rma" },
    { id: "opencore-efi-hackintosh" },
    { id: "rog-gaming-center" },
    { id: "opencore-efi-gl503ge" },
  ];
}

const VALID_PROJECT_IDS = [
  "warranty-rma",
  "cytron-rma",
  "raspberry-pi-diagnostics",
  "iot-fertiliser-mixing",
  "opencore-efi-hackintosh",
  "rog-gaming-center",
  "opencore-efi-gl503ge",
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];

  if (!VALID_PROJECT_IDS.includes(id) || !project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECT_DETAILS[id];

  if (!VALID_PROJECT_IDS.includes(id) || !project) {
    notFound();
  }

  // Find next project for circular navigation
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === id);
  const nextProject =
    PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length] || PROJECTS_DATA[0];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* Tailored Case Study Layout Based on Content */}
      {(id === "warranty-rma" || id === "cytron-rma") && (
        <WarrantyRmaCaseStudy project={project} nextProject={nextProject} />
      )}

      {id === "iot-fertiliser-mixing" && (
        <IotFertiliserCaseStudy project={project} nextProject={nextProject} />
      )}

      {id === "raspberry-pi-diagnostics" && (
        <RaspberryPiDiagnosticCaseStudy project={project} nextProject={nextProject} />
      )}

      {(id === "opencore-efi-hackintosh" || id === "opencore-efi-gl503ge") && (
        <OpenCoreEfiCaseStudy project={project} />
      )}

      {id === "rog-gaming-center" && (
        <RogGamingCenterCaseStudy project={project} />
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

