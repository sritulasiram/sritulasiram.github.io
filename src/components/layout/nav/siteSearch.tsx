import { Fragment } from "react";
import { SEARCH_ITEMS, type SearchItem } from "@/data/searchData";

/**
 * Alternative spellings and names a visitor might type. Each token of a query also matches its
 * aliases, so "fertilizer" finds the British "fertiliser" and "cv" finds the career section.
 */
const ALIASES: Record<string, string[]> = {
  fertilizer: ["fertiliser"],
  fertilizers: ["fertiliser"],
  color: ["colour"],
  colour: ["color"],
  harbor: ["harbour"],
  harbour: ["harbor"],
  gray: ["grey"],
  grey: ["gray"],
  mac: ["macos"],
  osx: ["macos"],
  cv: ["career", "experience"],
  resume: ["career", "experience"],
  job: ["career", "experience"],
  work: ["career", "projects"],
  email: ["contact"],
  mail: ["contact"],
  hire: ["contact"],
  bot: ["chatbot", "assistant"],
  llm: ["rag", "assistant"],
  ml: ["ai"],
  ui: ["design", "interface"],
  ux: ["design", "interface"],
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Splits a query into lowercase words. */
export const queryTokens = (query: string) =>
  query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

/**
 * A token matches at the start of a word, so "sage" no longer matches "message". One- and
 * two-letter tokens must be a whole word, so "pi" matches "Raspberry Pi" but not "pipelines".
 */
const wordMatcher = (token: string) => {
  const body = escapeRegex(token);
  return new RegExp(`(^|[^a-z0-9])${body}${token.length <= 2 ? "([^a-z0-9]|$)" : ""}`);
};

// How much a match in each field is worth when ranking
const WEIGHT = { title: 100, tags: 60, subtitle: 40, category: 20, description: 10 } as const;

function scoreToken(item: SearchItem, token: string): number {
  // A plural also matches its singular ("diagnostics" finds "Diagnostic")
  const singular = token.length > 3 && token.endsWith("s") ? token.slice(0, -1) : null;
  const typed = [token, ...(singular ? [singular] : [])];
  // Aliases only count in titles and tags, so "resume" can't match stray description text
  const aliases = ALIASES[token] ?? [];
  const title = item.title.toLowerCase();
  let best = 0;

  for (const option of [...typed, ...aliases]) {
    const isAlias = aliases.includes(option);
    const match = wordMatcher(option);
    if (match.test(title)) best = Math.max(best, WEIGHT.title + (title.startsWith(option) ? 40 : 0));
    else if (item.tags.some((tag) => match.test(tag.toLowerCase()))) best = Math.max(best, WEIGHT.tags);
    else if (isAlias) continue;
    else if (match.test(item.subtitle.toLowerCase())) best = Math.max(best, WEIGHT.subtitle);
    else if (match.test(item.category.toLowerCase())) best = Math.max(best, WEIGHT.category);
    else if (match.test(item.description.toLowerCase())) best = Math.max(best, WEIGHT.description);
  }
  return best;
}

/**
 * Every word of the query must match somewhere in an item. Results are ranked: exact and
 * leading title matches first, then tags, subtitle, category and description.
 */
export function searchSite(query: string): SearchItem[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  const whole = tokens.join(" ");

  const ranked: { item: SearchItem; score: number; order: number }[] = [];
  SEARCH_ITEMS.forEach((item, order) => {
    let score = 0;
    for (const token of tokens) {
      const tokenScore = scoreToken(item, token);
      if (tokenScore === 0) return; // a word with no match anywhere rules the item out
      score += tokenScore;
    }
    const title = item.title.toLowerCase();
    if (title === whole) score += 300;
    else if (title.startsWith(whole)) score += 120;
    ranked.push({ item, score, order });
  });

  return ranked.sort((a, b) => b.score - a.score || a.order - b.order).map((entry) => entry.item);
}

/**
 * Opens a search result: external links in a new tab, `/#id` links by scrolling the current page
 * (every page ends with the contact block), everything else through the router.
 */
export function openSearchItem(item: SearchItem, push: (url: string) => void) {
  if (/^https?:\/\//.test(item.url)) {
    window.open(item.url, "_blank", "noopener,noreferrer");
    return;
  }
  if (item.url.startsWith("/#")) {
    const target = document.querySelector(item.url.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }
  push(item.url);
}

/** Subtly emphasises every query word in a search result. */
export function HighlightText({ text, query }: { text: string; query: string }) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return <span>{text}</span>;

  // Longest first so "design" wins over "de"; the capture group puts matches at odd indexes
  const pattern = tokens
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={index} className="bg-transparent text-[#0071E3] dark:text-[#2997FF] font-semibold">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
