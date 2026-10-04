import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import PhotographyGallery from "@/components/PhotographyGallery";
import CameraOpticsKitBento from "@/components/CameraOpticsKitBento";
import { PHOTOGRAPHY_DATA } from "@/data/content";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Curated photography frames by Sri Tulasi Ram. Exploring light, architecture, and street perspectives in Penang and beyond.",
};

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-black/10 dark:selection:bg-white/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 pb-16 flex-1 w-full text-center">
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
            Photography
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">Perspective and light</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
            Curated frames capturing coastal atmosphere, architectural geometry, and fleeting moments.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com/iamsritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#2C2C2E] transition-colors shadow-2xs"
            >
              <InstagramIcon className="w-4 h-4 text-[#6E6E73] dark:text-[#8E8E93]" />
              <span>Follow @iamsritulasiram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#shot-on-iphone"
              className="inline-flex items-center gap-1 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] transition-colors"
            >
              <span>Shot on iPhone 16 Pro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Photography Grid with Album Filter Tabs & Lightbox */}
        <PhotographyGallery photos={PHOTOGRAPHY_DATA} />

        {/* Shot on iPhone 16 Pro Optical System Showcase */}
        <CameraOpticsKitBento />
      </div>

      <Footer />
    </main>
  );
}
