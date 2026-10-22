import PlayOnView from "@/components/shared/PlayOnView";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

/**
 * A problem statement that arrives at the pace of a slow breath: each word drifts in out of a soft
 * blur, one after another, with nothing sudden. The final state is the static page; the motion only
 * runs when it is allowed.
 */
export default function BreatheStatement({
  problem,
  answer,
  className = "",
}: {
  problem: string;
  answer: string;
  className?: string;
}) {
  let index = 0;
  const words = (text: string, tone: string) => (
    <span aria-hidden="true" className={tone}>
      {text.split(/(\s+)/).map((word, i) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span key={i} className="br-word inline-block" style={{ ["--d" as string]: `${(0.1 + index++ * 0.085).toFixed(2)}s` }}>
            {word}
          </span>
        ),
      )}
    </span>
  );

  return (
    <PlayOnView className={`breathe-stmt ${className}`}>
      <noscript>
        <style>{".breathe-stmt .br-word{opacity:1!important;filter:none!important;transform:none!important}"}</style>
      </noscript>
      <p aria-label={`${problem} ${answer}`}>
        {words(problem, GRAY)} {words(answer, INK)}
      </p>
    </PlayOnView>
  );
}
