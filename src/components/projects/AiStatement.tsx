import { Check, Sparkles } from "lucide-react";
import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

const SKELETON_MS = 1.6; // seconds the placeholder lines shimmer before the answer starts
const WORD = 0.045; // seconds between streamed words
const SKELETON_LINES = [100, 92, 100, 84, 96, 58];

/**
 * A problem statement told like an AI assistant answering. While it "thinks", shimmering skeleton
 * lines hold the place of the text, with a Thinking label and bouncing dots. Then the answer streams
 * in word by word, a numbered citation lands at the end of each sentence, and the label settles on
 * "Answered from 2 sources". The final state is the static page; the motion only runs when allowed.
 */
export default function AiStatement({
  problem,
  answer,
  className = "",
}: {
  /** First sentence, in gray. */
  problem: string;
  /** Second sentence, in full ink. */
  answer: string;
  className?: string;
}) {
  const total = problem.split(/\s+/).length + answer.split(/\s+/).length;
  const doneAt = SKELETON_MS + 0.1 + total * WORD;
  let wordIndex = 0;
  const streamed = (text: string, tone: string, citation: number) => {
    const words = text.split(/(\s+)/);
    return (
      <span aria-hidden="true" className={tone}>
        {words.map((word, i) => {
          if (/^\s+$/.test(word)) return word;
          const d = SKELETON_MS + 0.1 + wordIndex++ * WORD;
          return (
            <span key={i} className="ai-word inline-block" style={{ ["--d" as string]: `${d.toFixed(2)}s` }}>
              {word}
            </span>
          );
        })}
        <span
          className="ai-cite ml-1.5 inline-flex h-6 w-6 -translate-y-[0.5em] items-center justify-center rounded-full border border-[var(--pa)] align-baseline text-[13px] font-semibold leading-none text-[var(--pa)] sm:h-8 sm:w-8 sm:text-[16px] md:-translate-y-[0.65em]"
          style={{ ["--c" as string]: citation, ["--done" as string]: `${doneAt.toFixed(2)}s` }}
        >
          {citation}
        </span>
      </span>
    );
  };

  return (
    <PlayOnView className={`ai-stmt ${className}`}>
      <noscript>
        <style>{".ai-stmt .ai-word,.ai-stmt .ai-cite{opacity:1!important;filter:none!important;scale:1!important}.ai-stmt .ai-skel{display:none!important}"}</style>
      </noscript>

      {/* Status line: Thinking with dots, then Answered. Type settings reset from the headline. */}
      <div
        className="relative mb-6 h-6 text-sm font-medium leading-6 tracking-normal"
        style={{ ["--done" as string]: `${doneAt.toFixed(2)}s` }}
      >
        <span className="ai-thinking absolute left-0 top-0 inline-flex items-center gap-2 text-[var(--pa)]" aria-hidden="true">
          <Sparkles className="h-4 w-4" />
          Thinking
          <span className="inline-flex gap-1">
            <i className="ai-dot h-1.5 w-1.5 rounded-full bg-current" style={{ ["--i" as string]: 0 }} />
            <i className="ai-dot h-1.5 w-1.5 rounded-full bg-current" style={{ ["--i" as string]: 1 }} />
            <i className="ai-dot h-1.5 w-1.5 rounded-full bg-current" style={{ ["--i" as string]: 2 }} />
          </span>
        </span>
        <span className={`ai-answered absolute left-0 top-0 inline-flex items-center gap-2 ${GRAY}`}>
          <Check className="h-4 w-4 text-[var(--pa)]" aria-hidden="true" />
          Answered from 2 sources
        </span>
      </div>

      <div className="relative">
        {/* Placeholder lines that hold the text's place while it "thinks" */}
        <div aria-hidden="true" className="ai-skel pointer-events-none absolute inset-x-0 top-0">
          {SKELETON_LINES.map((w, i) => (
            <div key={i} className="ai-bar mb-[0.62em] h-[0.5em] rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p aria-label={`${problem} ${answer}`}>
          {streamed(problem, GRAY, 1)} {streamed(answer, INK, 2)}
        </p>
      </div>
    </PlayOnView>
  );
}
