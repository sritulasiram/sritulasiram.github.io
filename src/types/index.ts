export type ProjectCategory = "Engineering" | "Design";

export interface ProjectItem {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  outcome: string;
  imageSrc: string;
  placeholderLabel: string;
  placeholderRatio: string;
  techStack: string[];
  overview: string;
  highlights: string[];
  publicationUrl?: string;
  githubUrl?: string;
  githubLabel?: string;
  secondaryGithubUrl?: string;
  secondaryGithubLabel?: string;
  ctaLabel?: string;
}

export interface ArchitectureComponent {
  title: string;
  description: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  badge?: string;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface MetricResult {
  metric: string;
  label: string;
  description: string;
}

export interface CaseStudyBackground {
  problemStatement: string;
  context: string;
  challenges: string[];
}

export interface CaseStudyArchitecture {
  summary: string;
  components: ArchitectureComponent[];
}

export interface ProjectScreen {
  id: string;
  title: string; // Bold opening phrase e.g. "Use your go-to apps" or "Modular Intake Terminal"
  description: string; // Concise explanation of that page
  imageSrc: string; // Screenshot path
  placeholderLabel?: string;
  ratioText?: string;
  badge?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  heroMetric: string;
  heroMetricLabel: string;
  imageSrc: string;
  placeholderLabel: string;
  placeholderRatio: string;
  timeframe: string;
  role: string;
  organization: string;
  background: CaseStudyBackground;
  architecture: CaseStudyArchitecture;
  keyFeatures: KeyFeature[];
  techStack: TechStackGroup[];
  results: MetricResult[];
  publicationUrl?: string;
  githubUrl?: string;
  githubLabel?: string;
  secondaryGithubUrl?: string;
  secondaryGithubLabel?: string;
  screens?: ProjectScreen[];
}

export interface DesignRoleFeature {
  role: string;
  items: { name: string; desc: string }[];
}

export interface DesignItem {
  id: string;
  category: string;
  title: string;
  shortTitle?: string;
  categoryKey?: "mobile" | "web" | "health-ai";
  subtitle: string;
  tool: string;
  platform: string;
  overview: string;
  highlights: string[];
  imageSrc: string;
  placeholderLabel: string;
  placeholderRatio: string;
  githubUrl?: string;
  figmaUrl?: string;
}

export interface DesignScreen {
  id: string;
  number: string;
  title: string;
  role: string;
  description: string;
  imageSrc: string;
}

export interface DesignCaseStudy {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  heroMetric: string;
  heroMetricLabel: string;
  imageSrc: string;
  logoSrc?: string;
  /** "phone": imageSrc is a portrait app screen, shown in a phone frame. Default "landscape". */
  heroLayout?: "phone" | "landscape";
  /** Optional multi-screen flow, shown as a gallery under the hero. */
  screens?: DesignScreen[];
  /** YouTube videos, shown under the screen flow. `id` is the part after youtu.be/. */
  videos?: { id: string; title: string }[];
  placeholderLabel: string;
  placeholderRatio: string;
  timeframe: string;
  role: string;
  organization: string;
  tool: string;
  platform: string;
  background: CaseStudyBackground;
  architecture: CaseStudyArchitecture;
  roleFeatures?: DesignRoleFeature[];
  keyFeatures: KeyFeature[];
  techStack: TechStackGroup[];
  results: MetricResult[];
  githubUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
}

export type PhotoAlbumId = "all" | "coastal" | "urban" | "nature";

export interface PhotoAlbum {
  id: PhotoAlbumId;
  label: string;
  description: string;
}

export interface PhotoExifSpec {
  camera: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  filmStock: string;
  metering: string;
  lighting: string;
  darkroomNote: string;
}

export interface PhotoItem {
  id: string;
  imageSrc: string;
  placeholderLabel: string;
  aspectRatio: string;
  altText: string;
  title?: string;
  location?: string;
  description?: string;
  spotlightTitle?: string;
  spotlightSubtitle?: string;
  album?: Exclude<PhotoAlbumId, "all">;
  camera?: string;
  settings?: string;
  focalLengthTag?: "13mm" | "24mm" | "48mm" | "120mm";
  featured?: boolean;
}

export interface HeroData {
  name: string;
  role: string;
  location: string;
  positioning: string;
  companyContext: string;
  portraitPlaceholder: {
    imageSrc: string;
    darkImageSrc?: string;
    label: string;
    ratio: string;
    note: string;
  };
}

export interface PillarItem {
  title: string;
  description: string;
  icon: string;
}

export interface AccreditationInfo {
  body: string;
  title: string;
  discipline: string;
  registrationNo: string;
  status: string;
  logoSrc?: string;
}

export interface FirstAidCertification {
  body: string;
  nativeBody?: string;
  englishBody?: string;
  title: string;
  course: string;
  serialNo: string;
  issued: string;
  expires: string;
  status: string;
  branch: string;
  logoSrc: string;
  logoDarkSrc?: string;
  certificateSrc?: string;
}

export interface FlutterCertification {
  body: string;
  title: string;
  course: string;
  serialNo: string;
  issuedRange: string;
  status: string;
  partners: string[];
  logoSrc: string;
  logoDarkSrc?: string;
  certificateSrc?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface PhilosophyPrinciple {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  items: { name: string; note?: string }[];
}

export interface JourneyMilestone {
  period: string;
  role: string;
  organization: string;
  faculty?: string;
  location?: string;
  badge?: string;
  logoSrc?: string;
  logoAlt?: string;
  description: string;
  highlights: string[];
  tags: string[];
  link?: { label: string; href: string };
}

export interface SetupCategory {
  category: string;
  icon: string;
  items: { name: string; description: string }[];
}

export interface QuickStat {
  value: string;
  label: string;
  subtext: string;
}

export interface Achievement {
  metric: string;
  label: string;
  context: string;
  source?: string;
  imageSrc?: string;
  imageAlt?: string;
  pill?: string;
}

export interface FeaturedItem {
  title: string;
  description: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  issued?: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
  status: "active" | "expired" | "placeholder";
}

export interface Language {
  name: string;
  nativeName?: string;
  code?: string;
  proficiency: "Native" | "Professional" | "Conversational" | "Elementary";
  detail?: string;
}

export interface AboutData {
  primaryParagraph: string;
  secondaryParagraph: string;
  extendedBio?: string[];
  stats?: QuickStat[];
  achievements?: Achievement[];
  featured?: FeaturedItem[];
  certifications?: Certification[];
  languages?: Language[];
  principles?: PhilosophyPrinciple[];
  skillCategories?: SkillCategory[];
  experience?: JourneyMilestone[];
  education?: JourneyMilestone[];
  journey?: JourneyMilestone[];
  setup?: SetupCategory[];
  pillars: PillarItem[];
  accreditation: AccreditationInfo;
  firstAid?: FirstAidCertification;
  flutterCert?: FlutterCertification;
  links: SocialLink[];
}

export interface ContactData {
  email: string;
  domain: string;
  location: string;
  heading: string;
  subheading: string;
}
