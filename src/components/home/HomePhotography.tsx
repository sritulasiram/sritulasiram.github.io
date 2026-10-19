import Reveal from "@/components/shared/Reveal";
import { PHOTO_ALBUMS } from "@/data/content";
import HomePhotoRibbon from "./HomePhotoRibbon";
import { Headline, TextLink, GRAY, WRAP_WIDE } from "./homeShared";

export default function HomePhotography() {
  return (
    <section id="photography" aria-label="Photography" className="scroll-mt-14 py-24 sm:py-32 overflow-hidden">
      <div className={WRAP_WIDE}>
        <Reveal>
          <Headline gray="Photography." ink="Chasing the light." />
          <p className={`mt-4 max-w-2xl text-lg sm:text-xl leading-relaxed ${GRAY}`}>{PHOTO_ALBUMS[0].description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-8">
            <TextLink href="/photography">View the gallery</TextLink>
            <TextLink href="https://instagram.com/iamsritulasiram">@iamsritulasiram on Instagram</TextLink>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 sm:mt-14">
        <HomePhotoRibbon />
      </Reveal>
    </section>
  );
}
