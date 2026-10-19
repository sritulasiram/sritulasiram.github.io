import { Lock, LockOpen } from "lucide-react";
import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const ANSWER_AT = 0.8;
const WORD = 0.035;

export type UnlockKind = "rgb" | "profile" | "rpm" | "battery";
export type UnlockMark = { phrase: string; kind: UnlockKind };

// When each phrase's lock opens, in seconds. The effect on the phrase plays from then.
const OPEN_AT: Record<UnlockKind, number> = { rgb: 1.0, profile: 2.8, rpm: 5.2, battery: 5.5 };
const PROFILES = ["Standard", "Vivid", "Eye Care", "Cinema", "FPS", "RTS / RPG"];

/**
 * A problem statement about features locked behind Windows, where the locked words do the showing.
 * "Lighting" flows through the colours of an RGB wave; "display modes" cycles through the colour
 * profiles, naming each in a small tag; "fans" and "battery limits" count up a live readout. Each
 * padlock opens as its word comes alive. The final state is the static sentence with every lock open;
 * the motion only runs when it is allowed (see globals.css).
 */
export default function UnlockStatement({
  problem,
  answer,
  marks,
  className = "",
}: {
  problem: string;
  answer: string;
  marks: UnlockMark[];
  className?: string;
}) {
  const found = marks
    .map((m) => ({ ...m, at: problem.indexOf(m.phrase) }))
    .filter((m) => m.at >= 0)
    .sort((a, b) => a.at - b.at);
  const parts: { text: string; mark?: UnlockMark }[] = [];
  let cursor = 0;
  for (const m of found) {
    if (m.at > cursor) parts.push({ text: problem.slice(cursor, m.at) });
    parts.push({ text: m.phrase, mark: m });
    cursor = m.at + m.phrase.length;
  }
  if (cursor < problem.length) parts.push({ text: problem.slice(cursor) });

  let wi = 0;
  const answerWords = answer.split(/(\s+)/).map((word, i) => {
    if (/^\s+$/.test(word)) return word;
    const d = ANSWER_AT + wi++ * WORD;
    return (
      <span key={i} className="un-word inline-block" style={{ ["--d" as string]: `${d.toFixed(2)}s` }}>
        {word}
      </span>
    );
  });

  const tag = (kind: UnlockKind) => {
    switch (kind) {
      case "rgb":
        return <span className="un-tag-text">Rainbow wave</span>;
      case "profile":
        return (
          <span className="un-names">
            {PROFILES.map((name, i) => (
              <span key={name} className="un-name" style={{ ["--i" as string]: i }}>
                {name}
              </span>
            ))}
          </span>
        );
      case "rpm":
        return <span className="un-count un-count-rpm" />;
      case "battery":
        return <span className="un-count un-count-bat" />;
    }
  };

  return (
    <PlayOnView className={`unlock-stmt ${className}`}>
      <noscript>
        <style>{".unlock-stmt .un-fade,.unlock-stmt .un-word{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        <span aria-hidden="true" className={`un-fade ${GRAY}`}>
          {parts.map((part, i) =>
            part.mark ? (
              <span
                key={i}
                className={`un-phrase un-phrase-${part.mark.kind} relative inline-block`}
                style={{ ["--u" as string]: `${OPEN_AT[part.mark.kind].toFixed(2)}s` }}
              >
                {part.text}
                <span className="un-lock relative ml-[0.12em] inline-block h-[0.5em] w-[0.5em] align-baseline">
                  <Lock className="un-locked absolute inset-0 h-full w-full" strokeWidth={2.4} />
                  <LockOpen className="un-open absolute inset-0 h-full w-full" strokeWidth={2.4} />
                </span>
                <span className={`un-tag un-tag-${part.mark.kind}`}>{tag(part.mark.kind)}</span>
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}{" "}
        </span>
        <span aria-hidden="true" className={INK}>
          {answerWords}
        </span>
      </p>
    </PlayOnView>
  );
}
