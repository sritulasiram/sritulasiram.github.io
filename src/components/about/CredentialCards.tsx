"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import ImageLightbox from "@/components/shared/ImageLightbox";

export interface Credential {
  title: string;
  body: string;
  status: string;
  details: { label: string; value: string }[];
  logoSrc?: string;
  logoDarkSrc?: string;
  certificateSrc?: string;
}

export default function CredentialCards({ items }: { items: Credential[] }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="flex flex-col rounded-[28px] bg-[#F5F5F7] dark:bg-[#1C1C1E] p-7">
            <div className="flex h-12 items-center">
              {item.logoSrc ? (
                <>
                  <Image
                    src={item.logoSrc}
                    alt={`${item.body} logo`}
                    width={120}
                    height={48}
                    className={`h-11 w-auto max-w-[170px] object-contain ${item.logoDarkSrc ? "dark:hidden" : ""}`}
                  />
                  {item.logoDarkSrc && (
                    <Image
                      src={item.logoDarkSrc}
                      alt=""
                      aria-hidden="true"
                      width={120}
                      height={48}
                      className="hidden h-11 w-auto max-w-[170px] object-contain dark:block"
                    />
                  )}
                </>
              ) : (
                <BadgeCheck className="h-8 w-8 text-[var(--pa)]" aria-hidden="true" />
              )}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-snug">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-[#68686D] dark:text-[#A1A1A6]">{item.body}</p>

            <dl className="mt-6 space-y-2 border-t border-black/[0.07] dark:border-white/10 pt-5 text-sm">
              {item.details.map((d) => (
                <div key={d.label} className="flex justify-between gap-4">
                  <dt className="text-[#68686D] dark:text-[#A1A1A6]">{d.label}</dt>
                  <dd className="text-right font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex items-center justify-between gap-3 pt-6">
              <span className="rounded-full bg-[var(--pa-soft)] px-3 py-1 text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {item.status}
              </span>
              {item.certificateSrc && (
                <button
                  type="button"
                  onClick={() => setZoom({ src: item.certificateSrc!, alt: `${item.title} certificate` })}
                  className="text-sm font-medium text-[var(--pa)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)] rounded-xs"
                >
                  View certificate
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {zoom && <ImageLightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </>
  );
}
