import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { HERO_DATA } from "@/data/content";
import { INK, GRAY } from "./homeShared";

const delay = (s: number): CSSProperties => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Home 2's hero: the same three-part composition as Home 1 (name left, portrait centre, role right),
 * set in the Home 2 style: a light-gray band (true black in dark mode, so the spotlit portrait
 * blends in with no visible edge), sentence-case two-tone type, and a portrait that stands on the
 * bottom edge.
 */
export default function HomeHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white dark:bg-black">
      {/* Soft studio light behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[12%] h-[70%] w-[min(900px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)]"
      />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 gap-y-6 px-6 pb-28 pt-28 sm:px-10 lg:min-h-[92vh] lg:grid-cols-[1fr_minmax(0,460px)_1fr] lg:gap-x-6 lg:pt-24 xl:px-14">
        {/* Identity: left on desktop */}
        <div className="text-center lg:self-center lg:text-left">
          <p className={`story-rise text-lg font-semibold tracking-apple-tight sm:text-xl ${INK}`} style={delay(0)}>
            I am
          </p>
          <h1 className="mt-2 text-6xl font-semibold leading-[1] tracking-apple-hero sm:text-7xl xl:text-8xl">
            <span className={`story-rise lg:block ${INK}`} style={delay(0.08)}>
              Sri{" "}
            </span>
            <span className="story-rise text-[#86868B] dark:text-[#6E6E73] lg:block" style={delay(0.16)}>
              Tulasi{" "}
            </span>
            <span className="story-rise text-[#86868B] dark:text-[#6E6E73] lg:block" style={delay(0.24)}>
              Ram
            </span>
          </h1>
          <p
            className={`story-rise mt-5 text-lg leading-snug tracking-apple-subhead sm:text-xl ${GRAY}`}
            style={delay(0.4)}
          >
            Engineering precision.
            <br />
            Design intuition.
          </p>
        </div>

        {/* Portrait: stands on the bottom edge */}
        <div
          className="story-phone relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[560px] lg:-mt-24 lg:h-auto lg:self-stretch"
          style={delay(0.3)}
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
        <div className="text-center lg:self-center lg:text-right">
          <p className={`story-rise text-lg font-semibold tracking-apple-tight sm:text-xl ${INK}`} style={delay(0.04)}>
            Cytron Technologies
          </p>
          <p className="mt-2 text-6xl font-semibold leading-[1] tracking-apple-hero sm:text-7xl xl:text-8xl">
            <span className={`story-rise lg:block ${INK}`} style={delay(0.12)}>
              Support{" "}
            </span>
            <span className="story-rise text-[#86868B] dark:text-[#6E6E73] lg:block" style={delay(0.2)}>
              Engineer
            </span>
          </p>
          <p
            className={`story-rise mx-auto mt-5 max-w-sm text-base leading-relaxed sm:text-lg lg:ml-auto lg:mr-0 ${GRAY}`}
            style={delay(0.4)}
          >
            {HERO_DATA.positioning}
          </p>
          <p
            className={`story-rise mt-4 inline-flex items-center gap-1.5 text-sm ${GRAY}`}
            style={delay(0.48)}
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {HERO_DATA.location}
          </p>
        </div>
      </div>

      {/* Actions rest on the portrait's faded base */}
      <div
        className="story-rise absolute inset-x-0 bottom-8 z-10 flex flex-row items-center justify-center gap-3 px-6"
        style={delay(0.62)}
      >
        <Button href="#projects" accent={["#1D1D1F", "#F0F0F2"]} icon={<ChevronDown className="h-4 w-4" aria-hidden="true" />}>
          Explore
        </Button>
        <Button variant="secondary" href="/about" prefetch={false} icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
          About me
        </Button>
      </div>
    </section>
  );
}
