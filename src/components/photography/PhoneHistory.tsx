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
const STEP_SVH = 60;

const COUNT_MS = 450;

/** Where a device is while you scroll between two: it rests at each one, then glides across the middle of the step. */
function easePosition(pos: number) {
  const base = Math.floor(pos);
  const t = Math.min(1, Math.max(0, (pos - base - 0.2) / 0.6));
  return base + t * t * (3 - 2 * t);
}

/** Position and fade of one phone for its distance (in devices) from the one centre stage. */
function phoneStyle(offset: number) {
  const d = Math.abs(offset);
  return {
    opacity: Math.max(0, 1 - d * 1.1),
    transform: `translate3d(${offset * 45}%, 0, 0) scale(${1 - Math.min(1, d) * 0.14})`,
  };
}

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#6E6E73] dark:text-[#A1A1A6]";

/**
 * The big year. It stays in one place and counts from whatever it shows now to the new year, like an odometer,
 * so the timeline seems to travel from one device to the next. Scrolling back counts down.
 */
function CountingYear({ to, label, className }: { to: number; label?: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shown = useRef(to);
  // The counter writes its own text from here on, so React must not rewrite it when the props change.
  const [first] = useState(() => label ?? String(to));

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
      const t = Math.min(1, Math.max(0, (now - begin) / COUNT_MS));
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
      {first}
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
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [yearIdx, setYearIdx] = useState(0);
  const lastPos = useRef(0);
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
      // The phones follow the scroll continuously; only the words and year wait for a device to be centred.
      const pos = easePosition(progress * (count - 1));
      phoneRefs.current.forEach((node, i) => {
        if (!node) return;
        const st = phoneStyle(i - pos);
        node.style.opacity = String(st.opacity);
        node.style.transform = st.transform;
      });
      // The words dissolve with the same scroll, so text and phone hand over together.
      const fade = (node: HTMLElement | null, offset: number) => {
        if (!node) return;
        node.style.opacity = String(Math.max(0, 1 - Math.abs(offset) * 1.9));
        node.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, offset)) * 14}px, 0)`;
      };
      origins.forEach((_, i) => {
        fade(tagRefs.current[i], i - pos);
        fade(bodyRefs.current[i], i - pos);
      });
      const clamp = (n: number) => Math.min(count - 1, Math.max(0, n));
      setActive(clamp(Math.round(pos)));
      // The year starts counting early so it lands as the phone does. It moves on once 30% past a device and
      // back once 25% past the one below. A gap between the two points stops it flickering between years.
      let k = lastPos.current;
      while (k < count - 1 && pos >= k + 0.3) k++;
      while (k > 0 && pos <= k - 1 + 0.25) k--;
      lastPos.current = k;
      setYearIdx(k);
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
  }, [count, origins]);

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
              return (
                <div
                  key={o.name}
                  ref={(node) => {
                    phoneRefs.current[i] = node;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={phoneStyle(i)}
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
                  ref={(node) => {
                    tagRefs.current[i] = node;
                  }}
                  aria-hidden={i === active ? undefined : "true"}
                  className={`absolute inset-x-0 top-0 text-sm font-semibold uppercase tracking-widest ${GRAY}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {o.tag}
                </p>
              ))}
            </div>
            <CountingYear
              to={Number.isNaN(Number(origins[yearIdx].year)) ? new Date().getFullYear() : Number(origins[yearIdx].year)}
              label={Number.isNaN(Number(origins[yearIdx].year)) ? origins[yearIdx].year : undefined}
              className="mt-1 text-6xl font-semibold leading-none tabular-nums tracking-apple-hero text-[#86868B] sm:text-8xl md:text-9xl dark:text-[#6E6E73]"
            />

            <div className="relative mt-3 min-h-[15rem] sm:mt-4 sm:min-h-[14rem]">
              {origins.map((o, i) => (
                <div
                  key={o.name}
                  ref={(node) => {
                    bodyRefs.current[i] = node;
                  }}
                  aria-hidden={i === active ? undefined : "true"}
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
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
