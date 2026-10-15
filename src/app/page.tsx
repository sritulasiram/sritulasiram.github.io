import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import DesignsTeaser from "@/components/DesignsTeaser";
import AboutTeaser from "@/components/AboutTeaser";
import PhotographyStrip from "@/components/PhotographyStrip";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col">

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Selected Work Section (Engineering Systems) */}
      <SelectedWork />

      {/* 3. Designs Showcase (UI/UX Case Studies) */}
      <DesignsTeaser />

      {/* 4. About Teaser (Support Ops & Engineering Pillars) */}
      <AboutTeaser />

      {/* 5. Photography Strip (Personal Creative Craft) */}
      <PhotographyStrip />

      {/* 6. Footer & Contact Section */}
      <Footer />
    </main>
  );
}
