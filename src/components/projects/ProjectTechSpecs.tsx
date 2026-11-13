import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import NextUp from "@/components/shared/NextUp";
import { hasCompare } from "@/data/projectCompare";
import { projectThemeStyle } from "@/data/projectTheme";
import type { ProjectSpecGroup, ProjectSpecHighlight, ProjectSpecRow } from "@/data/projectSpecs";
import type { ProjectItem } from "@/types";
import { LEAD_GRAY, PAGE_TITLE, SUBSECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";
import SpecsJumpBar from "./SpecsJumpBar";
import { specIcon, specSlug } from "./specIcons";

interface Props {
  projectId: string;
  title: string;
  groups: ProjectSpecGroup[];
  highlights?: ProjectSpecHighlight[];
  nextProject: ProjectItem;
}

const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
const HAIRLINE = "border-[#D2D2D7] dark:border-[#424245]";
/** Lists longer than this read better as a line of text than as a wall of pills. */
const MAX_CHIPS = 6;

/** Long text or long lists get the full width of the grid instead of half. */
const isWide = (row: ProjectSpecRow) =>
  Array.isArray(row.value) ? row.value.length > MAX_CHIPS - 2 || row.value.join("").length > 60 : row.value.length > 90;

function SpecValue({ value }: { value: ProjectSpecRow["value"] }) {
  if (!Array.isArray(value)) return <>{value}</>;
  if (value.length > MAX_CHIPS) {
    return (
      <ul className="flex flex-wrap gap-x-2">
        {value.map((item, i) => (
          <li key={item}>
            {item}
            {i < value.length - 1 && (
              <span className="ml-2 text-[#86868B]" aria-hidden="true">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="flex flex-wrap gap-1.5">
      {value.map((item) => (
        <li key={item} className="rounded-full bg-[var(--pa-soft)] px-3 py-1 text-sm font-medium leading-snug">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Splits a figure so the number can be set large and anything around it small, the way Apple sets "27 hrs":
 * "v2.52.1" → v | 2.52.1, "5 days" → 5 | " days", ">94%" → > | 94 | %, "300+" → 300 | +.
 */
function splitFigure(value: string) {
  const match = /^([^\d]*)(\d[\d.,]*)(.*)$/.exec(value);
  if (!match) return { prefix: "", number: value, unit: "" };
  return { prefix: match[1], number: match[2], unit: match[3] };
}

/**
 * A project's Tech Specs page, laid out like Apple's: a short centred header with the headline figures, a sticky row
 * of section chips, then each group of specs in a two-column grid under a hairline.
 */
export default function ProjectTechSpecs({ projectId, title, groups, highlights, nextProject }: Props) {
  const specCount = groups.reduce((n, g) => n + g.rows.length, 0);
  const compare = hasCompare(projectId);

  return (
    <div>
      {/* Header: the breadcrumb already names the project, so nothing above the title repeats it. */}
      <section className={`${WRAP} pt-8 sm:pt-12 pb-10 sm:pb-12 text-center`}>
        <CaseStudyBreadcrumb title={title} current="Tech Specs" titleHref={`/projects/${projectId}`} centered />
        <h1 className={`${PAGE_TITLE} ${TITLE_INK}`}>Tech Specs</h1>
        <p className={`mt-4 text-base sm:text-lg ${LEAD_GRAY}`}>
          {specCount} specifications across {groups.length} groups
        </p>

        {highlights && highlights.length > 0 && (
          <dl className={`mt-12 sm:mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0 lg:divide-x ${HAIRLINE}`}>
            {highlights.map((h) => {
              const { prefix, number, unit } = splitFigure(h.value);
              return (
                <div key={h.label} className={`flex flex-col items-center px-3 sm:px-5 ${HAIRLINE}`}>
                  {/* The label comes first for screen readers; the figure is shown above it. */}
                  <dt className={`order-2 mt-3 max-w-[13rem] text-sm sm:text-[15px] leading-snug text-balance ${LEAD_GRAY}`}>
                    {h.label}
                  </dt>
                  <dd className={`order-1 whitespace-nowrap text-5xl sm:text-6xl font-semibold leading-none tracking-apple-hero tabular-nums ${TITLE_INK}`}>
                    {prefix && <span className="text-[0.5em] tracking-apple-tight">{prefix}</span>}
                    {number}
                    {unit && (
                      <span className={`text-[0.5em] tracking-apple-tight ${unit.startsWith(" ") ? "ml-[0.3em]" : ""}`}>
                        {unit.trim()}
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </section>

      <SpecsJumpBar titles={groups.map((g) => g.title)} specsId="specs" />

      {/* Spec groups */}
      <div id="specs" className={WRAP} aria-label="Specifications" role="region">
        {groups.map((group, gi) => {
          const Icon = specIcon(group.title);
          const id = specSlug(group.title);
          return (
            <section
              key={group.title}
              id={id}
              aria-labelledby={`${id}-title`}
              className={`scroll-mt-[120px] grid grid-cols-1 gap-6 py-10 sm:py-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 ${
                gi === 0 ? "" : `border-t ${HAIRLINE}`
              }`}
            >
              <div className="flex items-center gap-3 self-start md:sticky md:top-[132px] md:block">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--pa-soft)]">
                  <Icon className="h-5 w-5 text-[var(--pa)]" aria-hidden="true" />
                </span>
                <h2 id={`${id}-title`} className={`md:mt-4 ${SUBSECTION_TITLE} ${TITLE_INK}`}>
                  {group.title}
                </h2>
              </div>

              <dl className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
                {group.rows.map((row) => (
                  <div key={row.label} className={isWide(row) ? "sm:col-span-2" : ""}>
                    <dt className={`text-sm font-semibold ${LEAD_GRAY}`}>{row.label}</dt>
                    <dd className={`mt-1.5 text-[17px] leading-[1.5] ${TITLE_INK}`}>
                      <SpecValue value={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>

      {/* Where next: the same ending as every project and design page. */}
      <NextUp
        id="keep-exploring"
        context={`More on ${title}.`}
        links={[
          { label: "Overview", href: `/projects/${projectId}` },
          ...(compare ? [{ label: "Compare", href: `/projects/${projectId}/compare` }] : []),
        ]}
        next={{
          kicker: "Next project",
          title: nextProject.title,
          body: nextProject.outcome,
          href: `/projects/${nextProject.id}`,
          imageSrc: nextProject.imageSrc,
          accent: projectThemeStyle(nextProject.id),
        }}
      />
    </div>
  );
}
