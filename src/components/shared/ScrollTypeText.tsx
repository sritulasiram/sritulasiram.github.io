"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

interface Segment {
  text: string;
  className?: string;
  /** Makes the segment a link. It is still typed like the rest, and read out as `label`. */
  href?: string;
  label?: string;
}

// A long passage still finishes in about this long, however many characters it has.
const MAX_DURATION_MS = 3500;
const WORDS_DURATION_MS = 2200;
const MAX_CHAR_MS = 32;

interface WordData {
  text: string;
  start: number;
  className?: string;
  segment: number;
}

/** One word (with its trailing space). Memoised, so only the word being typed re-renders. */
const Word = memo(function Word({
  text,
  className,
  visible,
  caret,
  fade,
}: {
  text: string;
  className?: string;
  /** How many characters of this word are showing. */
  visible: number;
  caret: boolean;
  /** Reveal the whole word at once, rising and fading in, instead of typing it. */
  fade: boolean;
}) {
  if (fade) {
    // The trailing space sits outside the animated box, so it collapses at a line end and right-aligned
    // text lines up flush with the edge.
    const word = text.trimEnd();
    return (
      <>
        <span
          aria-hidden="true"
          data-stt-hidden={visible > 0 ? undefined : ""}
          className={`${className ?? ""} inline-block whitespace-pre transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            visible > 0 ? "translate-y-0 opacity-100" : "translate-y-[0.35em] opacity-0"
          }`}
        >
          {word}
        </span>
        {text.slice(word.length)}
      </>
    );
  }
  const chars = Array.from(text);
  return (
    <span aria-hidden="true" className={className}>
      {chars.map((char, i) => (
        <span key={i} data-stt-hidden={i < visible ? undefined : ""} className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${i < visible ? "opacity-100" : "opacity-0"}`}>
          {char}
          {caret && i === visible - 1 && (
            <span className="relative inline-block h-[1em] w-0 align-[-0.15em]">
              <span className="absolute inset-y-[0.06em] left-[0.04em] w-[0.06em] animate-pulse rounded-full bg-[var(--pa)]" />
            </span>
          )}
        </span>
      ))}
    </span>
  );
});

/**
 * Types its text out (or lets the words rise in) once, on its own, the first time it scrolls into view. Characters that haven't
 * been typed yet keep their space (invisible), so nothing reflows. Without JavaScript, or for
 * reduced-motion visitors, the full text is shown.
 */
export default function ScrollTypeText({
  segments,
  className = "",
  mode = "type",
  onComplete,
  onProgress,
}: {
  segments: Segment[];
  className?: string;
  /** "type" types it out letter by letter. "words" lets the words rise in one after another. */
  mode?: "type" | "words";
  /** Called once, when the last character has appeared. Not called for reduced-motion visitors, who see the text at once. */
  onComplete?: () => void;
  /** Called as the text appears, with how many characters are showing so far. */
  onProgress?: (count: number) => void;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onProgressRef.current = onProgress;
  });

  const { bySegment, total } = useMemo(() => {
    const bySegment: WordData[][] = segments.map(() => []);
    let total = 0;
    segments.forEach((segment, si) => {
      for (const match of segment.text.match(/\S+\s*/g) ?? []) {
        bySegment[si].push({ text: match, start: total, className: segment.className, segment: si });
        total += Array.from(match).length;
      }
    });
    return { bySegment, total };
  }, [segments]);

  // Starts hidden, on the server too, so the full text never flashes before it types. null = show
  // everything (reduced motion); without JavaScript a <noscript> rule reveals it.
  const [shown, setShown] = useState<number | null>(0);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only check; the server render must start from the initial state
      setShown(null);
      return;
    }

    let frame = 0;
    let caretTimer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      const step = mode === "words" ? WORDS_DURATION_MS / total : Math.min(MAX_CHAR_MS, MAX_DURATION_MS / total);
      const begin = performance.now();
      let last = 0;
      const tick = (now: number) => {
        const n = Math.min(total, Math.floor((now - begin) / step));
        if (n !== last) {
          last = n;
          setShown(n);
          onProgressRef.current?.(n);
        }
        if (n >= total) {
          onCompleteRef.current?.();
          caretTimer = setTimeout(() => setCaretOn(false), 1400);
          return;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      if (caretTimer) clearTimeout(caretTimer);
    };
  }, [total, mode]);

  const count = shown ?? total;
  const hasLinks = segments.some((s) => s.href);

  return (
    <p ref={ref} className={className} aria-label={hasLinks ? undefined : segments.map((s) => s.text).join("")}>
      <noscript>
        <style>{"[data-stt-hidden]{opacity:1!important}"}</style>
      </noscript>
      {segments.map((segment, si) => {
        const visual = bySegment[si].map((word, i) => {
          const length = Array.from(word.text).length;
          const visible = Math.min(length, Math.max(0, count - word.start));
          // The cursor sits in whichever word the typing has reached.
          const caret = shown !== null && caretOn && count > word.start && count - word.start <= length;
          return <Word key={i} text={word.text} className={word.className} visible={visible} caret={caret && mode === "type"} fade={mode === "words"} />;
        });
        // Without links the whole paragraph is labelled once. With links, each piece is read out in order:
        // links by their label, the rest as plain text.
        return segment.href ? (
          <a key={si} href={segment.href} aria-label={segment.label ?? segment.text.trim()} className="rounded-xs hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
            {visual}
          </a>
        ) : hasLinks ? (
          <span key={si}>
            <span className="sr-only">{segment.text}</span>
            {visual}
          </span>
        ) : (
          <span key={si}>{visual}</span>
        );
      })}
    </p>
  );
}
