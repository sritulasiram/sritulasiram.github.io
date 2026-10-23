"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** BibTeX block with a copy button. */
export default function CopyCitation({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#232326] p-5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-[#68686D] dark:text-[#A1A1A6]">BibTeX</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#F5F5F7] dark:bg-[#323236] px-3.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors hover:bg-[#E8E8ED] dark:hover:bg-[#3A3A3E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[var(--pa)]" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto text-xs leading-relaxed font-mono text-[#68686D] dark:text-[#A1A1A6]">{text}</pre>
    </div>
  );
}
