import Footer from "@/components/Footer";
import ProjectsHeroStage from "@/components/ProjectsHeroStage";
import ProjectsDirectory from "@/components/ProjectsDirectory";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1. Page Header & Apple MacBook Pro Staging Hero Preview */}
      <ProjectsHeroStage />

      {/* 2. Detailed Systems Showcase & Architecture Directory */}
      <div className="pb-16 sm:pb-24">
        <ProjectsDirectory />
      </div>

      {/* 3. Bottom Contact Banner */}
      <Footer />
    </main>
  );
}
