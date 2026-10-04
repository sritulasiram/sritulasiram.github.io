"use client";

import { useState, useEffect } from "react";
import { Mail, Check, ArrowUpRight } from "lucide-react";
import { CONTACT_DATA } from "@/data/content";
import { cn } from "@/lib/cn";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps = {}) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    }
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <footer id="contact" className={cn("pb-16 sm:pb-20 pt-16 sm:pt-20 bg-white dark:bg-black transition-colors duration-300 relative", className)}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Primary Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight mb-4 sm:mb-6">
          {CONTACT_DATA.heading}
        </h2>

        {/* One-Line Closing Statement with Balanced Break */}
        <p className="text-base sm:text-lg md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-xl mx-auto mb-10 leading-relaxed font-normal text-balance">
          Have a technical inquiry, a project to discuss,
          <br className="hidden sm:inline" /> or just want to say hello?
        </p>

        {/* Primary Action Buttons: Seamless Twin Dark Pills */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 justify-center mb-16">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-[15px] font-medium text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-[#F5F5F7] shadow-xs hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer select-none"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50 duration-200" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-white/85 dark:text-black/85" />
                <span>{CONTACT_DATA.email}</span>
                <ArrowUpRight className="w-4 h-4 text-white/60 dark:text-black/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>

          <a
            href="https://www.linkedin.com/in/sritulasiram"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-[15px] font-medium text-white bg-[#0A66C2] hover:bg-[#004182] shadow-xs hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
            </svg>
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Apple-Style Minimalist Footer Baseline */}
        <div className="pt-8 sm:pt-10 border-t border-[#E5E5EA] dark:border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] sm:text-[13px] text-[#6E6E73] dark:text-[#8E8E93]">
          {/* Left: Domain & Location */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">{CONTACT_DATA.domain}</span>
            <span className="text-[#D2D2D7] dark:text-[#555558]">·</span>
            <span>{CONTACT_DATA.location}</span>
          </div>

          {/* Center: Social Channels */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="https://instagram.com/iamsritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors duration-200"
            >
              Instagram
            </a>
            <span className="text-[#D2D2D7] dark:text-[#555558]">·</span>
            <a
              href="https://github.com/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
          </div>

          {/* Right: Copyright */}
          <p className="text-[#6E6E73] dark:text-[#8E8E93] tracking-tight">
            © {new Date().getFullYear()} Sri Tulasi Ram
          </p>
        </div>
      </div>
    </footer>
  );
}
