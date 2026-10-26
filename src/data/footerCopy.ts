/** Closing lines for the Footer, one set per section so no two sections end the same way. */
export const FOOTER_COPY = {
  projects: {
    heading: "Let’s make a system|a reality.",
    subheading: "I believe an idea is only art until it’s built. Bring me yours.",
  },
  designs: {
    heading: "Great design is a symphony.|Let’s compose one.",
    subheading: "I care about every detail. Nothing extra, nothing missing. Let’s tune yours.",
  },
  // The last page of the site, so its closing looks back on everything the visitor has seen.
  about: {
    heading: "Let’s build something|inevitable.",
    subheading: "You’ve seen the systems, the design, the world through my lens. Now I’d love to see yours. Let’s make it a reality.",
  },
  photography: {
    heading: "Nature never|repeats a moment.",
    subheading: "Every shot I take is a surprise. What’s your story?",
  },
} as const;
