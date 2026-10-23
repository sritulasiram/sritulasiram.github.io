import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import InstagramIcon from "@/components/photography/InstagramIcon";
import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import SectionNav from "@/components/layout/SectionNav";
import PhotographyIntroMorph from "@/components/photography/PhotographyIntroMorph";
import PhotographyGallery from "@/components/photography/PhotographyGallery";
import PhotographyHighlights from "@/components/photography/PhotographyHighlights";
import CameraOpticsKitBento from "@/components/photography/CameraOpticsKitBento";
import { PHOTOGRAPHY_DATA } from "@/data/content";
import { HIGHLIGHT_PHOTOS } from "@/data/photoHighlights";

export const metadata: Metadata = {
  title: "Photography",
  alternates: { canonical: "/photography" },
  description:
    "Curated photography frames by Sri Tulasi Ram. Exploring light, architecture, and street perspectives in Penang and beyond.",
};

// The camera takes the Highlights frames and they land on the shelf below.
const INTRO_PHOTOS = HIGHLIGHT_PHOTOS;

const PHOTO_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "gallery", label: "Gallery" },
  { id: "shot-on-iphone", label: "Shot on iPhone" },
  { id: "origins", label: "Origins" },
];

export default function PhotographyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-black/10 dark:selection:bg-white/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* lg+ with motion: scroll-driven Camera intro. Otherwise the static header below. */}
      <div className="hidden lg:motion-safe:block">
        <PhotographyIntroMorph photos={INTRO_PHOTOS} />
      </div>

      <div id="overview" className="relative z-10 bg-white dark:bg-black max-w-6xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 lg:motion-safe:hidden w-full text-center">
        <div className="lg:motion-safe:hidden">
        {/* Back Link Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
          <ol className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-2 -my-2 min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
            </li>
            <li>
              <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold" aria-current="page">
                Photography
              </span>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Photography
            <span className="mt-3 block text-[0.36em] font-medium leading-[1.15] tracking-apple-tight text-[#6E6E73] dark:text-[#8E8E93] text-balance">Perspective and light</span>
          </h1>
          <div className="pt-3 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
            <Button
              variant="secondary"
              href="https://instagram.com/iamsritulasiram"
              icon={<InstagramIcon className="h-4 w-4" />}
              iconBefore
              className="border-black bg-black text-white hover:bg-[#1D1D1F] dark:border-white dark:bg-white dark:text-black dark:hover:bg-[#E8E8ED]"
            >
              iamsritulasiram
            </Button>
            <Button variant="link" href="#shot-on-iphone" className="text-[#1D1D1F]! dark:text-[#F5F5F7]!">
              Shot on iPhone 16 Pro
            </Button>
          </div>
        </div>

        </div>
      </div>

      <div className="lg:motion-safe:hidden">
        <PhotographyHighlights photos={HIGHLIGHT_PHOTOS} />
      </div>

      <div className="relative z-10 bg-white dark:bg-black max-w-6xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-16 flex-1 w-full text-center">
        {/* Photography Grid with Album Filter Tabs & Lightbox */}
        <PhotographyGallery photos={PHOTOGRAPHY_DATA} />

        {/* Shot on iPhone 16 Pro Optical System Showcase */}
        <CameraOpticsKitBento />
      </div>

      <SectionNav sections={PHOTO_SECTIONS} ariaLabel="Photography page chapters" />

      <Footer {...FOOTER_COPY.photography} />
    </main>
  );
}
