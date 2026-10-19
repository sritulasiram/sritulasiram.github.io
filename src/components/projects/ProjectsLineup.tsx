import ProjectsHeroStage from "./ProjectsHeroStage";
import ProjectsShowcaseMorph from "./ProjectsShowcaseMorph";
import ProjectsDirectory from "./ProjectsDirectory";

/**
 * Hero + top three projects, followed by the full list.
 *
 * lg+ with motion: scroll-driven morph (three laptops turn into the lineup).
 * Otherwise: the static carousel hero.
 */
export default function ProjectsLineup() {
  return (
    <>
      <div className="hidden lg:motion-safe:block">
        <ProjectsShowcaseMorph />
      </div>
      <div className="lg:motion-safe:hidden">
        <ProjectsHeroStage />
        {/* Subnav target for "Selected" when the morph is not shown */}
        <span data-section="lineup" aria-hidden="true" className="block h-px" />
      </div>

      <ProjectsDirectory />
    </>
  );
}
