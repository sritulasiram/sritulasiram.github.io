import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const STEP = 0.5; // seconds between one viewfinder locking on and the next
const FIRST = 0.9; // seconds before the first one locks

/**
 * A problem statement read through a camera viewfinder. The problem sentence fades in, a focus frame
 * locks onto each named chore in turn, and then the answer snaps from blurred to sharp, word by word,
 * like an autofocus landing. The final state is the static page; the motion only runs when allowed.
 */
export default function FocusStatement({
  problem,
  focus,
  answer,
  className = "",
}: {
  problem: string;
  /** Phrases inside `problem` to put in the viewfinder, in reading order. */
  focus: string[];
  answer: string;
  className?: string;
}) {
  const parts: { text: string; framed: boolean }[] = [];
  let rest = problem;
  for (const phrase of focus) {
    const at = rest.indexOf(phrase);
    if (at < 0) continue;
    if (at > 0) parts.push({ text: rest.slice(0, at), framed: false });
    parts.push({ text: phrase, framed: true });
    rest = rest.slice(at + phrase.length);
  }
  if (rest) parts.push({ text: rest, framed: false });

  const framedCount = parts.filter((p) => p.framed).length;
  const answerStart = FIRST + framedCount * STEP + 0.2;
  let frameIndex = 0;

  return (
    <PlayOnView className={`scan-stmt ${className}`}>
      <noscript>
        <style>{".scan-stmt .sc-fade,.scan-stmt .sc-word{opacity:1!important;filter:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={`sc-fade ${GRAY}`}>
          {parts.map((part, i) =>
            part.framed ? (
              <span
                key={i}
                className="sc-chore scan-corners relative mx-[0.14em] inline-block whitespace-nowrap"
                style={{ ["--i" as string]: frameIndex++ }}
              >
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {answer.split(/(\s+)/).map((word, i) =>
            /^\s+$/.test(word) ? (
              word
            ) : (
              <span
                key={i}
                className="sc-word inline-block"
                style={{ ["--d" as string]: `${(answerStart + i * 0.03).toFixed(2)}s` }}
              >
                {word}
              </span>
            ),
          )}
        </span>
      </p>
    </PlayOnView>
  );
}
