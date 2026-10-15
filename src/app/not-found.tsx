import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-20 text-center select-none bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300">
      <div className="max-w-md w-full space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93]">
          404 Error
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            Page not found.
          </h1>
          <p className="text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved to another location.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#E8E8ED] dark:hover:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.08] font-semibold text-sm transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
