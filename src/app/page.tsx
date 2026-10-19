import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ScrollTypeText from "@/components/shared/ScrollTypeText";
import HomeHero from "@/components/home/HomeHero";
import HomeSystems from "@/components/home/HomeSystems";
import HomeNumbers from "@/components/home/HomeNumbers";
import HomeDesigns from "@/components/home/HomeDesigns";
import HomePhotography from "@/components/home/HomePhotography";
import { GRAY, INK, WRAP } from "@/components/home/homeShared";
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

      <section aria-label="Introduction" className={`${WRAP} py-28 sm:py-40`}>
        <ScrollTypeText
          className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-apple-hero max-w-4xl"
          segments={[
            {
              text: "I'm a Support Engineer at Cytron Technologies, where hardware problems land every day. ",
              className: GRAY,
            },
            {
              text: "I build the internal tools that solve them faster, and design the interfaces that make them effortless.",
              className: INK,
            },
          ]}
        />
      </section>

      <HomeSystems />
      <HomeNumbers />
      <HomeDesigns />
      <HomePhotography />
      <Footer />
    </main>
  );
}
