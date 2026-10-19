"use client";

import { memo, useEffect, useRef, useState } from "react";

interface Segment {
  text: string;
  className?: string;
}

// A long passage still finishes in about this long, however many characters it has.
const MAX_DURATION_MS = 3500;
const MAX_CHAR_MS = 32;

interface WordData {
  text: string;
  start: number;
  className?: string;
}

/** One word (with its trailing space). Memoised, so only the word being typed re-renders. */
const Word = memo(function Word({
  text,
  className,
  visible,
  caret,
}: {
  text: string;
  className?: string;
  /** How many characters of this word are showing. */
  visible: number;
  caret: boolean;
}) {
  const chars = Array.from(text);
  return (
    <span aria-hidden="true" className={className}>
      {chars.map((char, i) => (
        <span key={i} data-stt-hidden={i < visible ? undefined : ""} className={i < visible ? undefined : "opacity-0"}>
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
 * Types its text out once, on its own, the first time it scrolls into view. Characters that haven't
 * been typed yet keep their space (invisible), so nothing reflows. Without JavaScript, or for
 * reduced-motion visitors, the full text is shown.
 */
export default function ScrollTypeText({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  const words: WordData[] = [];
  let total = 0;
  for (const segment of segments) {
    for (const match of segment.text.match(/\S+\s*/g) ?? []) {
      words.push({ text: match, start: total, className: segment.className });
      total += Array.from(match).length;
    }
  }

  // Starts hidden, on the server too, so the full text never flashes before it types. null = show
  // everything (reduced motion); without JavaScript a <noscript> rule reveals it.
  const [shown, setShown] = useState<number | null>(0);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(null);
      return;
    }

    let timer: ReturnType<typeof setInterval> | undefined;
    let caretTimer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      const step = Math.min(MAX_CHAR_MS, MAX_DURATION_MS / total);
      const begin = performance.now();
      timer = setInterval(() => {
        const n = Math.min(total, Math.floor((performance.now() - begin) / step));
        setShown(n);
        if (n >= total) {
          clearInterval(timer);
          caretTimer = setTimeout(() => setCaretOn(false), 1400);
        }
      }, 16);
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
      if (timer) clearInterval(timer);
      if (caretTimer) clearTimeout(caretTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const count = shown ?? total;

  return (
    <p ref={ref} aria-label={segments.map((s) => s.text).join("")} className={className}>
      <noscript>
        <style>{"[data-stt-hidden]{opacity:1!important}"}</style>
      </noscript>
      {words.map((word, i) => {
        const length = Array.from(word.text).length;
        const visible = Math.min(length, Math.max(0, count - word.start));
        // The cursor sits in whichever word the typing has reached.
        const caret = shown !== null && caretOn && count > word.start && count - word.start <= length;
        return <Word key={i} text={word.text} className={word.className} visible={visible} caret={caret} />;
      })}
    </p>
  );
}
