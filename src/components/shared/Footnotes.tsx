/** Superscript marker that links to a footnote, in the style of Apple's claim footnotes. */
export function Fn({ n, size = "text-[0.4em]" }: { n: number; size?: string }) {
  return (
    <sup className={`ml-0.5 align-super ${size} font-semibold leading-none`}>
      <a
        href={`#fn-${n}`}
        aria-label={`Footnote ${n}`}
        className="rounded-xs hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
      >
        {n}
      </a>
    </sup>
  );
}

export function Footnotes({ items }: { items: string[] }) {
  return (
    <section
      aria-label="Footnotes"
      className="max-w-5xl mx-auto w-full px-6 sm:px-8 pb-16 pt-6"
    >
      <ol className="space-y-2 border-t border-[#D2D2D7] dark:border-[#424245] pt-6 text-xs leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">
        {items.map((text, i) => (
          <li key={i} id={`fn-${i + 1}`} className="scroll-mt-24 flex gap-2">
            <span className="shrink-0 tabular-nums">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
