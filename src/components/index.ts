// Layout & Shell
export { default as Navigation } from "./layout/Navigation";
export { default as Footer } from "./layout/Footer";
export { default as ThemeToggle } from "./layout/ThemeToggle";

// Shared UI & Display Primitives
export { default as ProjectImage } from "./ui/ProjectImage";
export { default as CaseStudyBreadcrumb } from "./shared/CaseStudyBreadcrumb";
export { default as AppleCarouselController } from "./ui/AppleCarouselController";
export { default as ProjectCtaIcon } from "./shared/ProjectCtaIcon";
export { default as TelemetryBentoGrid } from "./projects/visuals/TelemetryBentoGrid";
export { default as ProjectScreenWalkthrough } from "./shared/ProjectScreenWalkthrough";
export { default as DesignScreensMarquee } from "./designs/DesignScreensMarquee";

// Photography Components
export { default as PhotographyGallery } from "./photography/PhotographyGallery";
export { default as PhotoPreviewModal } from "./photography/PhotoPreviewModal";

// Hardware & Device Mockups
export * from "./mockups";

// Design System Showcase Components
export { default as DesignHeroStage } from "./designs/DesignHeroStage";
export { default as DesignFoundationsKit } from "./designs/DesignFoundationsKit";
export { default as DesignWorkGrid } from "./designs/DesignWorkGrid";

// Projects Showcase Components
export * from "./projects";
