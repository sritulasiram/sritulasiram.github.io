import Image from "next/image";

interface ToolItem {
  name: string;
  role: string;
  iconSrc: string;
  description: string;
}

const DESIGN_TOOLS: ToolItem[] = [
  {
    name: "Figma",
    role: "Interface Design & Systems",
    iconSrc: "/images/apps/app-figma.png",
    description: "Interface design, components and design systems.",
  },
  {
    name: "Adobe XD",
    role: "Prototypes & Screen Flows",
    iconSrc: "/images/apps/app-xd.png",
    description: "Interactive prototypes and screen flows. Used for Void.",
  },
  {
    name: "Adobe Photoshop",
    role: "Image Editing",
    iconSrc: "/images/apps/app-photoshop.png",
    description: "Image editing and asset rendering.",
  },
  {
    name: "Canva",
    role: "Quick Graphics",
    iconSrc: "/images/apps/app-canva.png",
    description: "Quick slide decks and social graphics.",
  },
];

export default function DesignWorkflowKit() {
  return (
    <section
      id="workflow"
      aria-label="Design tools"
      className="scroll-mt-20 py-16 sm:py-24 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="max-w-3xl text-3xl sm:text-5xl font-semibold tracking-apple-tight leading-[1.05] text-[#1D1D1F] dark:text-[#F5F5F7] text-balance">
          Tools &amp; design suite.{" "}
          <span className="text-[#6E6E73] dark:text-[#A1A1A6]">The apps I design, prototype and produce assets with.</span>
        </h2>

        <ul className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {DESIGN_TOOLS.map((tool) => (
            <li
              key={tool.name}
              className="group flex flex-col rounded-[28px] bg-[#F5F5F7] dark:bg-[#1C1C1E] p-8 sm:p-10 min-h-[280px] transition-transform duration-300 ease-out motion-safe:hover:scale-[1.01] md:[&:last-child:nth-child(odd)]:col-span-2"
            >
              <div className="relative w-16 h-16 rounded-[22%] overflow-hidden shadow-md bg-white dark:bg-[#2C2C2E] shrink-0">
                <Image src={tool.iconSrc} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="mt-auto pt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                  {tool.role}
                </p>
                <h3 className="mt-2 text-2xl sm:text-[28px] font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {tool.name}
                </h3>
                <p className="mt-2 max-w-md text-[17px] leading-[1.42] text-[#6E6E73] dark:text-[#A1A1A6]">
                  {tool.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
