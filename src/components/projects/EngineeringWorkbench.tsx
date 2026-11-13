import AppGrid, { type AppGridGroup } from "@/components/shared/AppGrid";
import Reveal from "@/components/shared/Reveal";
import { SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

const WORKBENCH: AppGridGroup[] = [
  {
    title: "Editors & toolchains",
    items: [
      {
        name: "Visual Studio Code",
        iconSrc: "/images/apps/app-vscode.png",
        description: "Python services, shell scripts and this site’s Next.js code.",
      },
      {
        name: "Antigravity",
        iconSrc: "/images/apps/app-antigravity.png",
        description: "An AI pair programmer for refactoring, planning and checking changes.",
      },
      {
        name: "Xcode",
        iconSrc: "/images/apps/app-xcode.png",
        description: "Native macOS apps in Swift and SwiftUI, like ROG Gaming Center.",
      },
      {
        name: "Arduino IDE",
        iconSrc: "/images/apps/app-arduino.svg",
        description: "ESP32 firmware in C and C++, like the IoT fertiliser controller.",
        emblem: true,
      },
    ],
  },
  {
    title: "AI models & platforms",
    items: [
      {
        name: "Claude",
        glyph: { src: "/images/apps/app-claude.svg", paint: "#D97757" },
        description: "Development help and quick prototypes.",
      },
      {
        name: "Gemini",
        iconSrc: "/images/apps/app-gemini.png",
        emblem: true,
        description: "Brainstorming, generative visuals, and the models in my HR and Warranty assistants.",
      },
      {
        name: "OpenRouter",
        glyph: { src: "/images/apps/app-openrouter.svg", paint: "#1D1D1F" },
        description: "One API for many AI models, used in the HR assistant.",
      },
      {
        name: "Ollama",
        glyph: { src: "/images/apps/app-ollama.svg", paint: "#1D1D1F" },
        description: "A local playground for running open models offline.",
      },
    ],
  },
];

/** The tools behind the projects, in two labelled groups. */
export default function EngineeringWorkbench() {
  return (
    <section
      id="workbench"
      aria-label="Engineering Workbench"
      className="scroll-mt-20 py-16 sm:py-24 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <Reveal>
          <h2 className={`max-w-3xl ${SECTION_TITLE} ${TITLE_INK}`}>
            Tools &amp; development suite.{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">The editors, toolchains and AI assistants I build with.</span>
          </h2>
        </Reveal>
        <AppGrid groups={WORKBENCH} className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
