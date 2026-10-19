import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const WORD = 0.035;
const ANSWER_AT = 2.5; // seconds before the second sentence starts to arrive
const SRC_AT = 1.0; // first source gets boxed as its own tab
const SRC_STEP = 0.4;
const CLASH_AT = 2.0;
const OK_AT = 3.5; // first "OK" lands, like a boot log
const OK_STEP = 0.35;
const BUILD_AT = 4.8;

export type BootKind = "src" | "clash" | "ok" | "build";
export type BootMark = { phrase: string; kind: BootKind };

/**
 * A problem statement told like a boot. The first sentence's scattered sources are boxed as separate
 * browser tabs one after another and the disagreement is flagged in red; the second sentence then
 * arrives, and each thing it gathers gets an "OK" like a line of boot log, ending on a "boots" tag for
 * the one tested build. The final state is the static page; the motion only runs when it is allowed
 * (see globals.css).
 */
export default function BootLogStatement({
  problem,
  answer,
  problemMarks,
  answerMarks,
  className = "",
}: {
  problem: string;
  answer: string;
  problemMarks: BootMark[];
  answerMarks: BootMark[];
  className?: string;
}) {
  let wi = 0;
  const words = (text: string, start: number) =>
    text.split(/(\s+)/).map((word, i) => {
      if (/^\s+$/.test(word)) return word;
      const d = start + wi++ * WORD;
      return (
        <span key={i} className="bl-word inline-block" style={{ ["--d" as string]: `${d.toFixed(2)}s` }}>
          {word}
        </span>
      );
    });

  const render = (text: string, marks: BootMark[], start: number) => {
    const found = marks
      .map((m) => ({ ...m, at: text.indexOf(m.phrase) }))
      .filter((m) => m.at >= 0)
      .sort((a, b) => a.at - b.at);
    const out: React.ReactNode[] = [];
    let cursor = 0;
    let srcN = 0;
    let okN = 0;
    found.forEach((m, i) => {
      if (m.at > cursor) out.push(<span key={`t${i}`}>{words(text.slice(cursor, m.at), start)}</span>);
      let at = 0;
      if (m.kind === "src") at = SRC_AT + srcN++ * SRC_STEP;
      else if (m.kind === "clash") at = CLASH_AT;
      else if (m.kind === "ok") at = OK_AT + okN++ * OK_STEP;
      else at = BUILD_AT;
      out.push(
        <span key={`m${i}`} className={`bl-mark bl-${m.kind} relative`} style={{ ["--r" as string]: `${at.toFixed(2)}s` }}>
          {words(m.phrase, start)}
          {(m.kind === "ok" || m.kind === "build") && (
            <span className="bl-tag" aria-hidden="true">
              {m.kind === "ok" ? "OK" : "✓ boots"}
            </span>
          )}
        </span>,
      );
      cursor = m.at + m.phrase.length;
    });
    if (cursor < text.length) out.push(<span key="end">{words(text.slice(cursor), start)}</span>);
    return out;
  };

  const first = render(problem, problemMarks, 0.05);
  const second = render(answer, answerMarks, ANSWER_AT);

  return (
    <PlayOnView className={`bootlog-stmt ${className}`}>
      <noscript>
        <style>{".bootlog-stmt .bl-word{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={GRAY}>
          {first}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {second}
        </span>
      </p>
    </PlayOnView>
  );
}
