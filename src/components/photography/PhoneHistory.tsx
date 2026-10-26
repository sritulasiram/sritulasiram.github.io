"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

export interface Origin {
  year: string;
  tag: string;
  name: string;
  spec: string;
  story: string;
  image: string;
  alt: string;
  /** Evens out how big a device looks next to the others. Defaults to 1. */
  scale?: number;
}

/** How far you scroll, in screen heights, to move from one phone to the next. */
const STEP_SVH = 42;

const COUNT_MS = 800;

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#6E6E73] dark:text-[#A1A1A6]";

/**
 * The big year. It stays in one place and counts from whatever it shows now to the new year, like an odometer,
 * so the timeline seems to travel from one device to the next. Scrolling back counts down.
 */
function CountingYear({ to, label, className }: { to: number; label?: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shown = useRef(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = shown.current;
    // Already showing it: nothing to count (a label such as "Now" stands in for the number once counted).
    if (from === to && !label) return;
    if (from === to && el.textContent === label) return;
    let frame = 0;
    let hold: ReturnType<typeof setTimeout> | undefined;
    let done: ReturnType<typeof setTimeout> | undefined;
    const begin = performance.now();

    // The number has caught up with today. It rests for a beat, then its digits roll up and away one after
    // another while the letters of the word roll up into their place.
    const morph = () => {
      const chars = (text: string, inbound: boolean) => {
        const box = document.createElement("span");
        box.setAttribute("aria-hidden", "true");
        box.style.cssText = inbound ? "position:absolute;left:0;top:0;white-space:pre" : "display:inline-block;white-space:pre";
        return Array.from(text).map((c, i) => {
          const ch = document.createElement("span");
          ch.textContent = c;
          ch.style.display = "inline-block";
          if (inbound) ch.style.opacity = "0";
          box.appendChild(ch);
          return { box, ch, i };
        });
      };
      const out = chars(el.textContent ?? "", false);
      const inn = chars(label ?? "", true);
      el.style.position = "relative";
      el.textContent = "";
      el.append(out[0]?.box ?? "", inn[0]?.box ?? "");
      out.forEach(({ ch, i }) =>
        ch.animate(
          [{ transform: "translateY(0)", opacity: 1, filter: "blur(0)" }, { transform: "translateY(-0.45em)", opacity: 0, filter: "blur(8px)" }],
          { duration: 450, delay: i * 50, easing: "cubic-bezier(0.5, 0, 0.75, 0)", fill: "forwards" },
        ),
      );
      inn.forEach(({ ch, i }) =>
        ch.animate(
          [{ transform: "translateY(0.45em)", opacity: 0, filter: "blur(8px)" }, { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }],
          { duration: 750, delay: 220 + i * 70, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
        ),
      );
      done = setTimeout(() => {
        el.textContent = label ?? "";
        el.style.position = "";
      }, 220 + inn.length * 70 + 800);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / COUNT_MS);
      shown.current = Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      el.textContent = String(shown.current);
      if (t < 1) frame = requestAnimationFrame(tick);
      else if (label) hold = setTimeout(morph, 350);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (hold) clearTimeout(hold);
      if (done) clearTimeout(done);
      el.style.position = "";
    };
  }, [to, label]);

  return (
    <p ref={ref} aria-label={label ?? String(to)} className={className}>
      {label ?? to}
    </p>
  );
}

/**
 * The cameras, one at a time. The section pins to the screen and scrolling steps through the
 * phones: the year, name and story change, and the phone slides out as the next slides in. The years along
 * the bottom show where you are and jump to a phone when pressed. Reduced-motion visitors get the phones
 * stacked as ordinary content.
 */
export default function PhoneHistory({ origins, heading }: { origins: Origin[]; heading?: ReactNode }) {
  const count = origins.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only check; the server render must start from the initial state
      setFlat(true);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  if (flat) {
    return (
      <div>
        {heading}
      <ol className="mt-12 flex flex-col gap-16 sm:mt-16">
        {origins.map((o) => (
          <li key={o.name} className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-widest ${GRAY}`}>{o.tag}</p>
              <p className={`mt-2 text-7xl font-semibold tabular-nums tracking-apple-hero ${INK}`}>{o.year}</p>
              <h3 className={`mt-4 text-2xl font-semibold tracking-apple-tight ${INK}`}>{o.name}</h3>
              <p className={`mt-1 text-sm font-medium ${GRAY}`}>{o.spec}</p>
              <p className={`mt-4 max-w-md text-lg leading-relaxed ${GRAY}`}>{o.story}</p>
            </div>
            <div className="relative mx-auto h-80 w-full max-w-xs">
              <Image src={o.image} alt={o.alt} draggable={false} fill sizes="320px" className="select-none object-contain" />
            </div>
          </li>
        ))}
      </ol>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      // The pinned stage is a full screen tall with its content centred, so once it lets go there is blank space
      // below the last device. The negative bottom margin pulls the next section up into it.
      className="relative overflow-x-clip"
      style={{ height: `calc(100svh + ${(count - 1) * STEP_SVH}svh)`, marginBottom: "-22svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-start gap-5 pt-16 pb-4 sm:gap-8 md:justify-center md:gap-28 md:pt-24 md:pb-8">
        {/* The title stays up while the devices change below it. */}
        {heading && <div className="mx-auto w-full max-w-4xl shrink-0">{heading}</div>}
        <div className="mx-auto grid w-full max-w-4xl flex-1 grid-rows-[minmax(0,1fr)_auto] items-center gap-6 md:h-[26rem] md:flex-none md:grid-cols-2 md:grid-rows-1 md:gap-8">
          {/* The phones: the current one centre stage, the others waiting to either side. */}
          <div className="pointer-events-none relative order-1 h-full max-h-[11rem] min-h-0 sm:max-h-[16rem] select-none self-center md:order-2 md:max-h-[24rem]" aria-hidden="true">
            {origins.map((o, i) => {
              const offset = i - active;
              return (
                <div
                  key={o.name}
                  className="absolute inset-0"
                  style={{
                    opacity: offset === 0 ? 1 : 0,
                    transform: `translateX(${offset * 28}%) scale(${offset === 0 ? 1 : 0.86})`,
                    transition: "opacity 600ms ease, transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="absolute inset-0" style={{ transform: o.scale ? `scale(${o.scale})` : undefined }}>
                    <Image
                      src={o.image}
                      alt=""
                      draggable={false}
                      fill
                      sizes="(max-width: 768px) 70vw, 420px"
                      className="object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.18)] dark:drop-shadow-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* The words. Everything has a fixed place, so only the text itself changes: the year counts, the rest swaps. */}
          <div className="order-2 md:order-1">
            <div className="relative h-5">
              {origins.map((o, i) => (
                <p
                  key={o.name}
                  aria-hidden={i === active ? undefined : "true"}
                  className={`absolute inset-x-0 top-0 text-sm font-semibold uppercase tracking-widest transition-opacity duration-300 ${GRAY}`}
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  {o.tag}
                </p>
              ))}
            </div>
            <CountingYear
              to={Number.isNaN(Number(origins[active].year)) ? new Date().getFullYear() : Number(origins[active].year)}
              label={Number.isNaN(Number(origins[active].year)) ? origins[active].year : undefined}
              className="mt-1 text-6xl font-semibold leading-none tabular-nums tracking-apple-hero text-[#86868B] sm:text-8xl md:text-9xl dark:text-[#6E6E73]"
            />

            <div className="relative mt-3 min-h-[15rem] sm:mt-4 sm:min-h-[14rem]">
              {origins.map((o, i) => (
                <div
                  key={o.name}
                  aria-hidden={i === active ? undefined : "true"}
                  className="absolute inset-x-0 top-0 transition-opacity duration-300"
                  style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
                >
                  <h3 className={`text-2xl font-semibold tracking-apple-tight sm:text-3xl ${INK}`}>{o.name}</h3>
                  <p className={`mt-1 text-sm font-medium ${GRAY}`}>{o.spec}</p>
                  <p className={`mt-4 max-w-md text-base leading-relaxed sm:text-lg ${GRAY}`}>{o.story}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
