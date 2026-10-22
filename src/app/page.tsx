import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/home/HomeHero";
import HomeSystems from "@/components/home/HomeSystems";
import HomeNumbers from "@/components/home/HomeNumbers";
import HomeDesigns from "@/components/home/HomeDesigns";
import IntroScroller from "@/components/home/IntroScroller";
import HomePhotography from "@/components/home/HomePhotography";
import { accentStyle } from "@/data/projectTheme";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={accentStyle(["#0066CC", "#2997FF"])}
      className="project-theme min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col"
    >
      <HomeHero />

      <IntroScroller />

      <HomeSystems />
      <HomeNumbers />
      <HomeDesigns />
      <HomePhotography />
      <Footer />
    </main>
  );
}
