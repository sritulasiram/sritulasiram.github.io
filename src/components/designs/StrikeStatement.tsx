import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const STEP = 0.45; // seconds between one line being struck through and the next
const FIRST = 0.9; // seconds before the first line is struck

/**
 * A problem statement that gets crossed out. The problem sentence fades in, each named problem is
 * struck through in the page accent one after another, and then the answer rises in word by word.
 * The final state is the static page; the motion only runs when it is allowed (see globals.css).
 */
export default function StrikeStatement({
  problem,
  strike,
  answer,
  marker = "line",
  className = "",
}: {
  problem: string;
  /** Phrases inside `problem` to cross out, in reading order. */
  strike: string[];
  answer: string;
  /** "line" strikes each phrase through; "highlight" sweeps a marker behind it. */
  marker?: "line" | "highlight";
  className?: string;
}) {
  // Split the problem sentence into plain text and the phrases to strike.
  const parts: { text: string; struck: boolean }[] = [];
  let rest = problem;
  for (const phrase of strike) {
    const at = rest.indexOf(phrase);
    if (at < 0) continue;
    if (at > 0) parts.push({ text: rest.slice(0, at), struck: false });
    parts.push({ text: phrase, struck: true });
    rest = rest.slice(at + phrase.length);
  }
  if (rest) parts.push({ text: rest, struck: false });

  const strikeCount = parts.filter((p) => p.struck).length;
  const answerStart = FIRST + strikeCount * STEP + 0.15;
  let strikeIndex = 0;

  return (
    <PlayOnView className={`strike-stmt ${marker === "highlight" ? "strike-stmt--hl" : ""} ${className}`}>
      <noscript>
        <style>{".strike-stmt .ss-fade,.strike-stmt .ss-word{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={`ss-fade ${GRAY}`}>
          {parts.map((part, i) =>
            part.struck ? (
              <span key={i} className="ss-line" style={{ ["--i" as string]: strikeIndex++ }}>
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
                className="ss-word inline-block"
                style={{ ["--d" as string]: `${(answerStart + i * 0.02).toFixed(2)}s` }}
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
