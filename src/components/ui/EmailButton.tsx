"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, X } from "lucide-react";
import { GmailIcon, OutlookIcon, YahooIcon } from "@/components/about/BrandIcons";
import Button, { PILL_QUIET } from "@/components/ui/Button";
import { CONTACT_DATA } from "@/data/content";
import { cn } from "@/lib/cn";

/*
 * The one email button. Clicking it turns the button itself into a row of choices, in place:
 * the device's mail app, a webmail compose window, or copy the address.
 */
const to = encodeURIComponent(CONTACT_DATA.email);
const CHOICES: { label: string; href: string; external: boolean; Icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Mail app", href: `mailto:${CONTACT_DATA.email}`, external: false, Icon: Mail },
  { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`, external: true, Icon: GmailIcon },
  { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}`, external: true, Icon: OutlookIcon },
  { label: "Yahoo", href: `https://compose.mail.yahoo.com/?to=${to}`, external: true, Icon: YahooIcon },
];

const CHIP = cn(PILL_QUIET, "cursor-pointer");
const CHIP_IN = "motion-safe:animate-[emailChipIn_450ms_cubic-bezier(0.16,1,0.3,1)_both]";
const CHIP_OUT = "motion-safe:animate-[emailChipOut_220ms_cubic-bezier(0.4,0,1,1)_both]";
const OUT_MS = 220 + 5 * 30;

export default function EmailButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<number>(0);

  const closeTimer = useRef<number>(0);

  useEffect(
    () => () => {
      window.clearTimeout(copyTimer.current);
      window.clearTimeout(closeTimer.current);
    },
    [],
  );

  // The chips fall away in reverse order, then the button comes back.
  const close = () => {
    if (closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      return;
    }
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, OUT_MS);
  };

  useEffect(() => {
    if (!open) return;
    root.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chip = (i: number) => ({
    className: cn(CHIP, closing ? CHIP_OUT : CHIP_IN),
    style: { animationDelay: `${closing ? (CHOICES.length + 1 - i) * 30 : i * 55}ms` },
  });

  const copy = () => {
    navigator.clipboard?.writeText(CONTACT_DATA.email).then(
      () => {
        setCopied(true);
        copyTimer.current = window.setTimeout(() => {
          setCopied(false);
          close();
        }, 1400);
      },
      close,
    );
  };

  return (
    <div ref={root} className={cn("flex min-h-11 justify-center", className)}>
      {open ? (
        <div role="group" aria-label={`Write to ${CONTACT_DATA.email} with`} className="flex flex-wrap items-center justify-center gap-2">
          {CHOICES.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              {...chip(i)}
              onClick={close}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <c.Icon className="h-4 w-4" />
              {c.label}
            </a>
          ))}
          <button type="button" onClick={copy} {...chip(CHOICES.length)} aria-live="polite">
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={close}
            {...chip(CHOICES.length + 1)}
            className={cn(chip(CHOICES.length + 1).className, "w-11 px-0")}
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className={CHIP_IN}>
        <Button
          onClick={() => setOpen(true)}
          accent={["#1D1D1F", "#F5F5F7"]}
          iconBefore
          icon={<Mail className="h-4 w-4" aria-hidden="true" />}
          ariaLabel={`Email ${CONTACT_DATA.email}`}
        >
          {CONTACT_DATA.email}
        </Button>
        </div>
      )}
    </div>
  );
}
