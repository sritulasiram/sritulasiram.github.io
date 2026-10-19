"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely
    console.error("Runtime route error caught:", error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-20 text-center select-none bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300">
      <div className="max-w-md w-full space-y-6">
        {/* Subtle Alert Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-400/10 border border-red-500/20 dark:border-red-400/20 text-red-600 dark:text-red-400 text-xs font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>System Interruption</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            Something went wrong.
          </h1>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            An unexpected error occurred while loading this view. You can attempt to reload the component or return to the homepage.
          </p>
        </div>

        {error.digest && (
          <div className="py-2 px-3 rounded-lg bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.08] inline-block font-mono text-[11px] text-[#86868B] dark:text-[#8E8E93]">
            Error Digest: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary Action: Reset & Try Again */}
          <Button onClick={() => reset()} iconBefore icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />} className="w-full sm:w-auto">
            Try again
          </Button>

          {/* Secondary Action: Return Home */}
          <Button variant="secondary" href="/" iconBefore icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />} className="w-full sm:w-auto">
            Return home
          </Button>
        </div>

        <div className="pt-4 text-xs text-[#86868B] dark:text-[#8E8E93]">
          Suspect scheduled downtime?{" "}
          <Link
            href="/maintenance"
            className="text-[#0071E3] dark:text-[#2997FF] hover:underline font-medium"
          >
            Check System Maintenance
          </Link>
        </div>
      </div>
    </main>
  );
}
