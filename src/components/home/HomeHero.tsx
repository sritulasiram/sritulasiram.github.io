import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import RoleReveal from "./RoleReveal";
import { HERO_DATA } from "@/data/content";
import { INK, GRAY } from "./homeShared";

/** One animated line of type: fades up out of a slight blur, `d` ms after load (see `.hx` in globals.css). */
function Line({ d, block, children }: { d: number; block?: boolean; children: ReactNode }) {
  return (
    <span className="hx" style={{ "--d": d, ...(block ? { display: "block" } : null) } as CSSProperties}>
      {children}
    </span>
  );
}

/*
 * The choreography (ms after load). The portrait and both text blocks start together as one motion, the identity (left) and the role (right)
 * converging on the portrait, white headline words first with the gray ones 80ms behind, buttons last.
 */
const T = {
  iam: 150, sri: 200, tulasi: 260, ram: 260, tag1: 380, tag2: 430,
  company: 200, support: 250, engineer: 310, summary: 420, location: 480, buttons: 560,
};

/**
 * Home 2's hero: the same three-part composition as Home 1 (name left, portrait centre, role right),
 * set in the Home 2 style: a light-gray band (true black in dark mode, so the spotlit portrait
 * blends in with no visible edge), sentence-case two-tone type, and a portrait that stands on the
 * bottom edge.
 */
export default function HomeHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white dark:bg-black">
      {/* Soft studio light behind the portrait (light mode only: the dark portrait carries its own spotlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[12%] h-[70%] w-[min(900px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95),transparent_65%)] dark:hidden hero-halo"
      />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 gap-y-6 px-6 pb-28 pt-20 sm:px-10 sm:pt-28 lg:min-h-[92vh] lg:grid-cols-[1fr_minmax(0,460px)_1fr] lg:gap-x-6 lg:pt-24 xl:px-14">
        {/* Identity: left on desktop */}
        <div className="hg-id text-center lg:self-center lg:text-left">
          <p className={`text-lg font-semibold tracking-apple-tight sm:text-xl ${INK}`}>
            <Line d={T.iam}>I am</Line>
          </p>
          <h1 className="mt-2 max-lg:whitespace-nowrap text-[11.5vw] font-semibold leading-[1] tracking-apple-hero sm:text-7xl xl:text-8xl">
            <span className={`lg:block ${INK}`}>
              <Line d={T.sri}>Sri</Line>{" "}
            </span>
            <span className="text-[#86868B] dark:text-[#6E6E73] lg:block">
              <Line d={T.tulasi}>Tulasi</Line>{" "}
            </span>
            <span className="text-[#86868B] dark:text-[#6E6E73] lg:block">
              <Line d={T.ram}>Ram</Line>
            </span>
          </h1>
          <p className={`mt-5 text-lg leading-snug tracking-apple-subhead sm:text-xl ${GRAY}`}>
            <span className="block">
              <Line d={T.tag1}>Engineering precision.</Line>
            </span>
            <span className="block">
              <Line d={T.tag2}>Design intuition.</Line>
            </span>
          </p>
        </div>

        {/* Portrait: stands on the bottom edge, rising as the name lands */}
        <div
          className="hero-photo relative mx-auto -mt-12 h-[420px] w-full max-w-[460px] sm:h-[560px] lg:-mt-24 lg:h-auto lg:self-stretch"
          
        >
          <div className="absolute inset-0 dark:hidden">
            <Image
              src={HERO_DATA.portraitPlaceholder.imageSrc}
              alt={`Portrait of ${HERO_DATA.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-contain object-bottom"
            />
          </div>
          <div className="absolute inset-0 hidden mix-blend-screen dark:block [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent_97%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent_97%)] [-webkit-mask-composite:source-in]">
            <Image
              src={HERO_DATA.portraitPlaceholder.darkImageSrc}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Role: right on desktop */}
        <div
          id="hero-role"
          className="hg-role text-center max-lg:mt-8 lg:self-center lg:text-right"
        >
          <p className={`text-lg font-semibold tracking-apple-tight sm:text-xl ${INK}`}>
            <Line d={T.company}>Cytron Technologies</Line>
          </p>
          <p className="mt-2 text-[11.5vw] font-semibold leading-[1] tracking-apple-hero sm:text-7xl xl:text-8xl">
            <span className={`lg:block ${INK}`}>
              <Line d={T.support}>Support</Line>{" "}
            </span>
            <span className="text-[#86868B] dark:text-[#6E6E73] lg:block">
              <Line d={T.engineer}>Engineer</Line>
            </span>
          </p>
          <p className={`mx-auto mt-5 max-w-sm text-base leading-relaxed sm:text-lg lg:ml-auto lg:mr-0 ${GRAY}`}>
            <Line d={T.summary} block>{HERO_DATA.positioning}</Line>
          </p>
          <p className={`mt-4 inline-flex items-center gap-1.5 text-sm ${GRAY}`}>
            <Line d={T.location}>
              <MapPin className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px" aria-hidden="true" />
              {HERO_DATA.location}
            </Line>
          </p>
        </div>
      </div>

      {/* Actions rest on the portrait's faded base, the last thing to arrive */}
      <div className="hg-role absolute inset-x-0 bottom-8 z-10 px-6">
        <div className="hx flex flex-row items-center justify-center gap-3" style={{ "--d": T.buttons, display: "flex" } as CSSProperties}>
          <Button href="#projects" accent={["#1D1D1F", "#F0F0F2"]} icon={<ChevronDown className="h-4 w-4" aria-hidden="true" />}>
            Explore
          </Button>
          <Button variant="secondary" href="/about" prefetch={false} icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            About me
          </Button>
        </div>
      </div>
      <RoleReveal />
    </section>
  );
}
