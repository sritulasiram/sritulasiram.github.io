<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design

For UI/UX design and component styling, follow the patterns on Apple's current product pages (apple.com): neutral white and light-gray section bands, one dark band, large two-tone headlines, and colour reserved for interactive and key elements. The old `apple-design` skill was removed because it is out of date.

Project pages (`/projects/[id]`) take their accent from `src/data/projectTheme.ts`. Use the `--pa*` CSS variables (see `globals.css`) instead of hard-coded hex values, and keep body text at 4.5:1 contrast or better in light and dark mode.

## Page Title & Metadata Conventions

- **Homepage Tab**: `Sri Tulasi Ram` only.
- **Subpage Tabs**: NEVER append the author's name (`— Sri Tulasi Ram`) or extra categorical suffixes (e.g., `· Case Study`, `· UI/UX Design`) to subpage titles. Keep them standalone, clean, and simple: `About`, `Projects`, `Designs`, `Photography`, `[Project Title]`, `[Design Title]`.
- **Next.js Metadata Templates**: In root `layout.tsx` and nested layouts, keep `template: "%s"` so child page titles render directly without duplicating names or adding suffixes.
