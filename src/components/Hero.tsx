
import { HERO_DATA } from "@/data/content";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] lg:min-h-[86vh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* Dynamic Stage Ambience: Radiates outward from portrait */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Light appearance radiant warm studio glow (subtle, clean) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%] max-w-[900px] h-[580px] bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,_rgba(254,215,170,0.16),_rgba(251,191,36,0.04),_transparent_70%)] blur-3xl opacity-100 dark:opacity-0 transition-opacity duration-300 ease-out" />
        
        {/* Dark appearance: Overhead theatrical spotlight beam extending down into Sri's portrait */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[640px] h-[720px] bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,_rgba(255,255,255,0.14),_rgba(251,191,36,0.05)_45%,_transparent_75%)] blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

        {/* Dark appearance radiant titanium ambient flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%] max-w-[900px] h-[580px] bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,_rgba(217,119,6,0.22),_rgba(180,83,9,0.08),_transparent_70%)] blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-300 ease-out" />

        {/* Dark appearance: Theatrical radial vignette: darkness radiates outward from portrait center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_22%,_rgba(0,0,0,0.55)_60%,_#000000_96%)] opacity-0 dark:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />
      </div>

      {/* Main Editorial Composition Stage: Vertically Centered */}
      <div className="relative w-full flex-1 flex flex-col justify-center my-auto min-h-[460px] sm:min-h-[500px] lg:min-h-[560px]">
        {/* Center Column: Portrait Stage with Seamless Full-Height Spotlight */}
        <div
          id="hero-portrait-stage"
          className="hero-anim-portrait absolute inset-x-0 mx-auto top-0 sm:top-2 lg:-top-20 bottom-2 sm:bottom-4 lg:bottom-0 dark:-inset-x-5 dark:sm:-inset-x-8 dark:lg:inset-x-0 dark:-top-12 dark:sm:-top-16 dark:lg:-top-20 dark:bottom-6 dark:sm:bottom-8 dark:lg:bottom-0 z-10 flex items-center lg:items-end justify-center w-full dark:w-auto lg:dark:w-full max-w-[450px] sm:max-w-[490px] lg:max-w-[380px] dark:max-w-none dark:lg:max-w-[380px] xl:max-w-[420px] 2xl:max-w-[460px] select-none pointer-events-none"
        >
          {/* Light Appearance Portrait (Clean cutout without artificial white blur or bottom fade mask) */}
          <div className="absolute inset-0 w-full h-full scale-[1.12] sm:scale-105 lg:scale-100 origin-center dark:hidden pointer-events-none">
            <Image
              src={HERO_DATA.portraitPlaceholder.imageSrc}
              alt="Portrait of Sri Tulasi Ram"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
              className="object-contain object-center lg:object-bottom"
            />
          </div>

          {/* Dark Appearance Spotlight Portrait (Seamless Overhead Spotlight from Top of Viewport) */}
          {HERO_DATA.portraitPlaceholder.darkImageSrc && (
            <div className="absolute inset-0 w-full h-full hidden dark:block mix-blend-screen pointer-events-none [mask-image:linear-gradient(to_bottom,black_65%,rgba(0,0,0,0.8)_78%,transparent_90%)] lg:[mask-image:radial-gradient(ellipse_92%_90%_at_50%_10%,black_65%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_65%,rgba(0,0,0,0.8)_78%,transparent_90%)] lg:[-webkit-mask-image:radial-gradient(ellipse_92%_90%_at_50%_10%,black_65%,transparent_98%)]">
              <Image
                src={HERO_DATA.portraitPlaceholder.darkImageSrc}
                alt="Portrait of Sri Tulasi Ram"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                className="object-cover object-center lg:object-top"
              />
            </div>
          )}
        </div>

        {/* Foreground Content: Overlaying the portrait stage on mobile, 3-column horizon on desktop */}
        <div className="relative z-20 w-full flex-1 flex flex-col justify-between lg:grid lg:grid-cols-12 lg:items-center gap-6 lg:gap-6 pointer-events-none">
          
          {/* Identity Block: Top on mobile, Left on desktop */}
          <div
            className="lg:col-span-5 lg:col-start-1 flex flex-col justify-center text-center lg:text-left space-y-1.5 sm:space-y-2 lg:space-y-3 pt-1 lg:pt-0 pointer-events-auto"
          >
            <p
              className="hero-anim-eyebrow text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#1D1D1F] dark:text-white transition-colors duration-300 ease-out"
            >
              I AM
            </p>

            <h1
              className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.5rem] 2xl:text-[4.15rem] font-bold tracking-tighter leading-[0.95] lg:leading-[0.92] uppercase select-none flex flex-wrap lg:flex-col justify-center lg:justify-start items-center lg:items-start gap-x-2 sm:gap-x-2.5 lg:gap-x-0"
            >
              <span className="inline-block lg:block overflow-hidden">
                <span className="hero-name-word hero-anim-word-1 block apple-headline-tier1">SRI</span>
              </span>
              <span className="inline-block lg:block overflow-hidden">
                <span className="hero-name-word hero-anim-word-2 block apple-headline-tier2">TULASI</span>
              </span>
              <span className="inline-block lg:block overflow-hidden">
                <span className="hero-name-word hero-anim-word-3 block apple-headline-tier3">RAM</span>
              </span>
            </h1>

            <p
              className="hero-anim-tag text-xs sm:text-sm lg:text-[15px] font-medium tracking-tight pt-0.5 apple-tagline-gradient inline-block"
            >
              Engineering precision. Design intuition.
            </p>
          </div>

          {/* Role & Specialization Block: Bottom on mobile, Right on desktop */}
          <div
            className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9 flex flex-col justify-center text-center lg:text-right lg:items-end space-y-1.5 sm:space-y-2 lg:space-y-3 pb-1 lg:pb-0 pointer-events-auto"
          >
            <p
              className="hero-anim-company text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#1D1D1F] dark:text-white transition-colors duration-300 ease-out"
            >
              Cytron Technologies
            </p>

            <p
              className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.5rem] 2xl:text-[4.15rem] font-bold tracking-tighter leading-[0.95] lg:leading-[0.92] uppercase select-none flex flex-wrap lg:flex-col justify-center lg:justify-end items-center lg:items-end gap-x-2 sm:gap-x-2.5 lg:gap-x-0"
            >
              <span className="inline-block lg:block overflow-hidden">
                <span className="hero-role-line hero-anim-role-1 block apple-headline-gradient">SUPPORT</span>
              </span>
              <span className="inline-block lg:block overflow-hidden">
                <span className="hero-role-line hero-anim-role-2 block apple-headline-gradient-dim">ENGINEER</span>
              </span>
            </p>

            <p
              className="hero-anim-desc text-sm md:text-[15px] text-[#515154] dark:text-[#D1D1D6] leading-relaxed max-w-xs sm:max-w-sm mx-auto lg:ml-auto pt-0.5 transition-colors duration-300 ease-out"
            >
              {HERO_DATA.positioning}
            </p>
          </div>
        </div>
      </div>

      {/* Action CTAs Centered at Bottom: Side by Side on all screens */}
      <div
        className="hero-anim-cta relative z-20 pt-4 sm:pt-6 lg:pt-8 flex flex-row items-center justify-center gap-2.5 sm:gap-3.5"
      >
        <Link
          href="#projects"
          className="apple-btn-primary group text-[13px] sm:text-sm px-4 sm:px-5"
        >
          <span>Explore</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-0.5" />
        </Link>

        <Link
          href="/about"
          prefetch={false}
          className="apple-btn-secondary group text-[13px] sm:text-sm px-4 sm:px-5"
        >
          <span>About Me</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
