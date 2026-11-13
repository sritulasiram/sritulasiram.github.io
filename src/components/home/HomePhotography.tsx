import Reveal from "@/components/shared/Reveal";
import { InstagramIcon, PhotosIcon } from "@/components/about/BrandIcons";
import Button from "@/components/ui/Button";
import { PHOTO_ALBUMS } from "@/data/content";
import HomePhotoGallery from "./HomePhotoGallery";
import { EYEBROW, LEAD_GRAY, SECTION_LEAD } from "@/components/shared/typeScale";
import { Headline, WRAP_WIDE } from "./homeShared";

const MOBILE_BUTTON = "max-sm:min-w-0 max-sm:flex-1 max-sm:justify-center max-sm:whitespace-nowrap max-sm:!px-3 max-sm:!text-[0.8125rem]";

export default function HomePhotography() {
  return (
    <section id="photography" aria-label="Photography" className="scroll-mt-14 py-24 sm:py-32 overflow-hidden">
      <div className={`${WRAP_WIDE} text-center`}>
        <Reveal>
          <p className={`${EYEBROW} text-[var(--pa)]`}>Shot on iPhone 16 Pro</p>
          <Headline gray="Photography." ink="Chasing the light." className="mt-2" />
          <p className={`mx-auto mt-4 max-w-2xl ${SECTION_LEAD} ${LEAD_GRAY}`}>{PHOTO_ALBUMS[0].description}</p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 sm:mt-14">
        <HomePhotoGallery />
      </Reveal>

      <div className={`${WRAP_WIDE} mt-10 sm:mt-12`}>
        <div className="flex items-center justify-center gap-2 sm:flex-wrap sm:gap-3">
          <Button variant="secondary" href="/photography" iconBefore icon={<PhotosIcon className="h-5 w-5" />} className={MOBILE_BUTTON}>
            View the gallery
          </Button>
          <Button
            href="https://instagram.com/iamsritulasiram"
            accent={["#1D1D1F", "#F5F5F7"]}
            iconBefore
            icon={<InstagramIcon className="h-4 w-4" />}
            className={MOBILE_BUTTON}
          >
            @iamsritulasiram
          </Button>
        </div>
      </div>
    </section>
  );
}
