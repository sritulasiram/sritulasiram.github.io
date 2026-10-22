import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

// Seconds. The four steps of the manual routine land on the needle's four swings.
const FIRST_BEAT = 0.7;
const BEAT = 0.5;
const ANSWER_AT = 2.9;

/**
 * A problem statement with a gauge under it. The manual routine ("add, check, adjust, repeat") is
 * underlined step by step while a needle overshoots the target and swings back, again and again;
 * then the answer arrives, the needle settles, and each thing the prototype does is ticked off.
 * The final state is the static page; the motion only runs when it is allowed (see globals.css).
 */
export default function GaugeStatement({
  problem,
  steps,
  answer,
  ticks,
  className = "",
}: {
  problem: string;
  /** Phrases inside `problem` that are the repeated routine, in reading order. */
  steps: string[];
  answer: string;
  /** Words inside `answer` that get a tick after them. */
  ticks: string[];
  className?: string;
}) {
  const parts: { text: string; step?: number }[] = [];
  let rest = problem;
  steps.forEach((phrase, n) => {
    const at = rest.indexOf(phrase);
    if (at < 0) return;
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ text: phrase, step: n });
    rest = rest.slice(at + phrase.length);
  });
  if (rest) parts.push({ text: rest });

  const words = answer.split(/(\s+)/);
  const wordCount = words.filter((w) => !/^\s+$/.test(w)).length;
  const ticksAt = ANSWER_AT + wordCount * 0.03 + 0.4;
  let wi = 0;
  let tickIndex = 0;

  return (
    <PlayOnView className={`gauge-stmt ${className}`}>
      <noscript>
        <style>{".gauge-stmt .gs-word,.gauge-stmt .gs-tick{opacity:1!important;transform:none!important;scale:1!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={GRAY}>
          {parts.map((part, i) =>
            part.step !== undefined ? (
              <span key={i} className="gs-step" style={{ ["--d" as string]: `${(FIRST_BEAT + part.step * BEAT).toFixed(2)}s` }}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {words.map((word, i) => {
            if (/^\s+$/.test(word)) return word;
            const delay = (ANSWER_AT + wi++ * 0.03).toFixed(2);
            const core = word.replace(/[^\p{L}\p{N}]+$/u, "");
            const punct = word.slice(core.length);
            const isTick = ticks.some((t) => core.toLowerCase() === t.toLowerCase());
            return (
              <span key={i} className="whitespace-nowrap">
                <span className="gs-word inline-block" style={{ ["--d" as string]: `${delay}s` }}>
                  {core}
                </span>
                {isTick && (
                  <span
                    className="gs-tick ml-1 inline-flex h-5 w-5 -translate-y-[0.4em] items-center justify-center rounded-full bg-[var(--pa)] align-baseline text-[11px] font-semibold leading-none text-white sm:h-7 sm:w-7 sm:text-[15px] dark:text-black"
                    style={{ ["--d" as string]: `${(ticksAt + tickIndex++ * 0.28).toFixed(2)}s` }}
                  >
                    ✓
                  </span>
                )}
                {punct && (
                  <span className="gs-word inline-block" style={{ ["--d" as string]: `${delay}s` }}>
                    {punct}
                  </span>
                )}
              </span>
            );
          })}
        </span>
      </p>

      {/* The gauge: the needle overshoots the target, swings back, and settles. */}
      <div className="mt-12 max-w-lg text-base font-medium leading-normal tracking-normal" role="img" aria-label="A gauge whose needle swings past the target and settles on it">
        <div className="relative h-2.5 rounded-full bg-black/10 dark:bg-white/15">
          <div className="absolute inset-y-[-4px] left-[42%] w-[16%] rounded-full bg-[var(--pa)]/25 ring-1 ring-[var(--pa)]/40" />
          <div className="gs-needle absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--pa)] shadow-md ring-4 ring-white dark:ring-black" />
        </div>
        <div className={`mt-4 flex justify-between text-sm font-medium ${GRAY}`}>
          <span>Too weak</span>
          <span>Target</span>
          <span>Too strong</span>
        </div>
      </div>
    </PlayOnView>
  );
}
