import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const STEP = 0.4; // seconds between one order number and the next
const FIRST = 0.7;

/**
 * A problem statement told like an order: the pains in the queue each get a number, the answer rises
 * in, and a pickup-number badge pops at the end. The final state is the static page; the motion only
 * runs when it is allowed.
 */
export default function TicketStatement({
  problem,
  numbered,
  answer,
  badge,
  className = "",
}: {
  problem: string;
  /** Phrases inside `problem` that get an order number, in reading order. */
  numbered: string[];
  answer: string;
  /** Pill shown at the very end, like a pickup number. */
  badge: string;
  className?: string;
}) {
  const parts: { text: string; n?: number }[] = [];
  let rest = problem;
  numbered.forEach((phrase, n) => {
    const at = rest.indexOf(phrase);
    if (at < 0) return;
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ text: phrase, n: n + 1 });
    rest = rest.slice(at + phrase.length);
  });
  if (rest) parts.push({ text: rest });

  const count = parts.filter((p) => p.n).length;
  const answerStart = FIRST + count * STEP + 0.1;
  const words = answer.split(/(\s+)/);
  const wordCount = words.filter((w) => !/^\s+$/.test(w)).length;
  const badgeAt = answerStart + wordCount * 0.03 + 0.3;
  let wi = 0;

  return (
    <PlayOnView className={`ticket-stmt ${className}`}>
      <noscript>
        <style>{".ticket-stmt .tk-fade,.ticket-stmt .tk-word,.ticket-stmt .tk-pop{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer} ${badge}`}>
        <span aria-hidden="true" className={`tk-fade ${GRAY}`}>
          {parts.map((part, i) =>
            part.n ? (
              <span key={i}>
                {part.text.replace(/\S+$/, "")}
                {/* The last word and its number never split across lines. */}
                <span className="whitespace-nowrap">
                  {part.text.match(/\S+$/)?.[0]}
                  <span
                    className="tk-pop ml-1.5 inline-flex h-6 w-6 -translate-y-[0.5em] items-center justify-center rounded-full bg-[var(--pa)] align-baseline text-[14px] font-semibold leading-none text-white sm:h-8 sm:w-8 sm:text-[18px] md:-translate-y-[0.65em] dark:text-black"
                    style={{ ["--d" as string]: `${(FIRST + (part.n - 1) * STEP).toFixed(2)}s` }}
                  >
                    {part.n}
                  </span>
                </span>
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {words.map((word, i) => {
            if (/^\s+$/.test(word)) return word;
            const isLast = ++wi === wordCount;
            const word_ = (
              <span className="tk-word inline-block" style={{ ["--d" as string]: `${(answerStart + (wi - 1) * 0.03).toFixed(2)}s` }}>
                {word}
              </span>
            );
            return isLast ? (
              <span key={i} className="whitespace-nowrap">
                {word_}{" "}
                <span
                  className="tk-pop inline-block -translate-y-[0.06em] rounded-full bg-[var(--pa)] px-[0.4em] py-[0.02em] text-[0.62em] font-semibold tabular-nums text-white dark:text-black"
                  style={{ ["--d" as string]: `${badgeAt.toFixed(2)}s` }}
                >
                  {badge}
                </span>
              </span>
            ) : (
              <span key={i}>{word_}</span>
            );
          })}
        </span>
      </p>
    </PlayOnView>
  );
}
