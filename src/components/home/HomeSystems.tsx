import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { PROJECTS_DATA } from "@/data/content";
import { Headline, TextLink, INK, GRAY, WRAP_WIDE } from "./homeShared";

const FEATURED = ["warranty-rma", "raspberry-pi-diagnostics", "iot-fertiliser-mixing"];

export default function HomeSystems() {
  const projects = FEATURED.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section id="projects" aria-label="Engineering" className="scroll-mt-14 py-24 sm:py-32">
      <div className={WRAP_WIDE}>
        <Reveal>
          <Headline gray="Systems." ink="Built to be relied on." />
          <p className={`mt-4 max-w-2xl text-lg sm:text-xl leading-relaxed ${GRAY}`}>
            Internal tools, hardware diagnostics and research, from the support desk at Cytron to the field.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const wide = i === 0;
            return (
              <Reveal key={project.id} delay={i * 80} className={wide ? "md:col-span-2" : ""}>
                <Link
                  href={`/projects/${project.id}`}
                  className={`group relative flex h-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pa)] ${
                    wide ? "min-h-[460px] flex-col md:flex-row md:min-h-[520px]" : "min-h-[480px] flex-col"
                  }`}
                >
                  <div className={`p-8 sm:p-10 ${wide ? "md:w-[42%] md:self-center" : ""}`}>
                    <p className={`text-sm font-medium ${GRAY}`}>{project.subtitle}</p>
                    <h3 className={`mt-2 text-3xl sm:text-4xl font-semibold tracking-apple-hero leading-[1.1] ${INK}`}>
                      {project.title}
                    </h3>
                    <p className={`mt-4 max-w-md text-base leading-relaxed ${GRAY}`}>{project.outcome}</p>
                    <span className="mt-5 inline-flex items-center text-base font-medium text-[var(--pa)] group-hover:underline">
                      {project.ctaLabel}
                    </span>
                  </div>

                  {/* The screenshot bleeds off the tile's corner */}
                  <div
                    className={`relative mt-auto overflow-hidden rounded-tl-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 ${
                      wide
                        ? "ml-8 h-[260px] md:ml-0 md:mt-16 md:h-auto md:flex-1 md:rounded-tr-none"
                        : "ml-8 h-[260px] sm:h-[280px]"
                    }`}
                  >
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes={wide ? "(max-width: 768px) 90vw, 560px" : "(max-width: 768px) 90vw, 520px"}
                      className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <TextLink href="/projects">View all projects</TextLink>
        </div>
      </div>
    </section>
  );
}
