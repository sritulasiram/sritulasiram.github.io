import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const FIRST_AT = 0.7; // seconds before the first sentence's phrases react
const ANSWER_AT = 2.2; // seconds before the second sentence arrives
const WORD = 0.035;
const GHOST_AT = 3.6; // seconds before the missing records fade out
const GHOST_STEP = 0.4;

export type RecordGapMark = { phrase: string; kind: "hand" | "danger" | "ghost" };

/**
 * A problem statement about work with no paper trail. The first sentence says every test was done by
 * hand: "by hand" is underlined, and the short circuit risk shakes and is underlined in red. The
 * second sentence says none of it was recorded: "no database" and "no history" fade to a ghost, and a
 * "0 records" pill sits at the end, empty. The final state is the static page; the motion only runs
 * when it is allowed (see globals.css).
 */
export default function RecordGapStatement({
  problem,
  answer,
  marks,
  badge,
  className = "",
}: {
  problem: string;
  answer: string;
  marks: RecordGapMark[];
  /** The empty pill at the end, such as "0 records". */
  badge: string;
  className?: string;
}) {
  const split = (text: string) => {
    const found = marks
      .map((m) => ({ ...m, at: text.indexOf(m.phrase) }))
      .filter((m) => m.at >= 0)
      .sort((a, b) => a.at - b.at);
    const parts: { text: string; mark?: RecordGapMark & { n: number } }[] = [];
    let cursor = 0;
    found.forEach((m, n) => {
      if (m.at > cursor) parts.push({ text: text.slice(cursor, m.at) });
      parts.push({ text: m.phrase, mark: { ...m, n } });
      cursor = m.at + m.phrase.length;
    });
    if (cursor < text.length) parts.push({ text: text.slice(cursor) });
    return parts;
  };

  let wi = 0;
  const words = (text: string, start: number) =>
    text.split(/(\s+)/).map((word, i) => {
      if (/^\s+$/.test(word)) return word;
      const d = start + wi++ * WORD;
      return (
        <span key={i} className="rg-word inline-block" style={{ ["--d" as string]: `${d.toFixed(2)}s` }}>
          {word}
        </span>
      );
    });

  const render = (text: string, start: number, ghostBase: number) =>
    split(text).map((part, i) =>
      part.mark ? (
        <span
          key={i}
          className={`rg-mark rg-${part.mark.kind}`}
          style={{
            ["--r" as string]: `${(part.mark.kind === "ghost" ? ghostBase + part.mark.n * GHOST_STEP : FIRST_AT + part.mark.n * 0.5).toFixed(2)}s`,
          }}
        >
          {words(part.text, start)}
        </span>
      ) : (
        <span key={i}>{words(part.text, start)}</span>
      ),
    );

  const first = render(problem, 0.05, 0);
  const second = render(answer, ANSWER_AT, GHOST_AT);
  const badgeAt = GHOST_AT + 0.4;

  return (
    <PlayOnView className={`recgap-stmt ${className}`}>
      <noscript>
        <style>{".recgap-stmt .rg-word,.recgap-stmt .rg-badge{opacity:1!important;transform:none!important;scale:1!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer} ${badge}`}>
        <span aria-hidden="true" className={GRAY}>
          {first}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {second}{" "}
        </span>
        <span
          aria-hidden="true"
          className="rg-badge relative -top-[0.08em] inline-block rounded-full border border-dashed border-current px-[0.55em] py-[0.12em] align-middle font-mono text-[0.42em] font-semibold tabular-nums leading-none text-[#68686D] dark:text-[#A1A1A6]"
          style={{ ["--d" as string]: `${badgeAt.toFixed(2)}s` }}
        >
          {badge}
        </span>
      </p>
    </PlayOnView>
  );
}
