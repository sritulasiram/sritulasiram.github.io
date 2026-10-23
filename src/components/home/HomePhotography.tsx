import Reveal from "@/components/shared/Reveal";
import { InstagramIcon, PhotosIcon } from "@/components/about/BrandIcons";
import Button from "@/components/ui/Button";
import { PHOTO_ALBUMS } from "@/data/content";
import HomePhotoRibbon from "./HomePhotoRibbon";
import { Headline, GRAY, WRAP_WIDE } from "./homeShared";

export default function HomePhotography() {
  return (
    <section id="photography" aria-label="Photography" className="scroll-mt-14 py-24 sm:py-32 overflow-hidden">
      <div className={WRAP_WIDE}>
        <Reveal>
          <Headline gray="Photography." ink="Chasing the light." />
          <p className={`mt-4 max-w-2xl text-lg sm:text-xl leading-relaxed ${GRAY}`}>{PHOTO_ALBUMS[0].description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="secondary" href="/photography" iconBefore icon={<PhotosIcon className="h-5 w-5" />}>
              View the gallery
            </Button>
            <Button
              href="https://instagram.com/iamsritulasiram"
              accent={["#1D1D1F", "#F5F5F7"]}
              iconBefore
              icon={<InstagramIcon className="h-4 w-4" />}
            >
              @iamsritulasiram
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 sm:mt-14">
        <HomePhotoRibbon />
      </Reveal>
    </section>
  );
}
