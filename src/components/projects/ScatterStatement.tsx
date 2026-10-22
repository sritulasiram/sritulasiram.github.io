import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const SETTLE_AT = 0.15; // seconds before the scattered words start to come together
const ANSWER_AT = 1.5; // seconds before the second sentence starts to arrive
const WORD = 0.04; // seconds between words
const MARK_AT = 2.6; // seconds before the four loose ends take the accent colour
const MARK_STEP = 0.3;

// A stable pseudo-random number in [-1, 1] from a word's position, so the scatter never changes
// between server and browser.
const jitter = (n: number, salt: number) => Math.sin(n * 12.9898 + salt * 78.233) * 0.9999;

/**
 * A problem statement told as "everything lived in separate places, and then it didn't": the first
 * sentence's words start out scattered and tilted, as if on separate tools, then drift together; the
 * second sentence arrives already lined up, and the four things nothing used to link take the page
 * accent one after another. The final state is the static page; the motion only runs when it is
 * allowed (see globals.css).
 */
export default function ScatterStatement({
  problem,
  answer,
  marks,
  className = "",
}: {
  problem: string;
  answer: string;
  /** Phrases inside `answer` to colour in the accent, in reading order. */
  marks: string[];
  className?: string;
}) {
  let wi = 0;
  const scattered = problem.split(/(\s+)/).map((word, i) => {
    if (/^\s+$/.test(word)) return word;
    const n = wi++;
    return (
      <span
        key={i}
        className="sc2-word inline-block"
        style={{
          ["--x" as string]: `${(jitter(n, 1) * 1.6).toFixed(2)}em`,
          ["--y" as string]: `${(jitter(n, 2) * 1.1).toFixed(2)}em`,
          ["--r" as string]: `${(jitter(n, 3) * 14).toFixed(1)}deg`,
          ["--d" as string]: `${(SETTLE_AT + n * WORD).toFixed(2)}s`,
        }}
      >
        {word}
      </span>
    );
  });

  // Split the answer so the marked phrases can take the accent colour.
  const parts: { text: string; mark?: number }[] = [];
  let rest = answer;
  marks.forEach((phrase, i) => {
    const at = rest.indexOf(phrase);
    if (at < 0) return;
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ text: phrase, mark: i });
    rest = rest.slice(at + phrase.length);
  });
  if (rest) parts.push({ text: rest });

  let ai = 0;
  const aligned = (text: string, mark?: number) =>
    text.split(/(\s+)/).map((word, i) => {
      if (/^\s+$/.test(word)) return word;
      const d = ANSWER_AT + ai++ * WORD;
      return (
        <span
          key={i}
          className={`sc2-aligned inline-block ${mark !== undefined ? "sc2-mark" : ""}`}
          style={{
            ["--d" as string]: `${d.toFixed(2)}s`,
            ["--m" as string]: `${(MARK_AT + (mark ?? 0) * MARK_STEP).toFixed(2)}s`,
          }}
        >
          {word}
        </span>
      );
    });

  return (
    <PlayOnView className={`scatter-stmt ${className}`}>
      <noscript>
        <style>{".scatter-stmt .sc2-word,.scatter-stmt .sc2-aligned{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={GRAY}>
          {scattered}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {parts.map((part, i) => (
            <span key={i}>{aligned(part.text, part.mark)}</span>
          ))}
        </span>
      </p>
    </PlayOnView>
  );
}
