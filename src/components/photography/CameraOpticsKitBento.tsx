import Reveal from "@/components/shared/Reveal";
import AppGrid, { type AppGridGroup } from "@/components/shared/AppGrid";
import PhoneHistory from "@/components/photography/PhoneHistory";
import LensNumber from "@/components/photography/LensNumber";
import FocusText from "@/components/photography/FocusText";
import { SECTION_TITLE } from "@/components/shared/typeScale";

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#6E6E73] dark:text-[#A1A1A6]";

const LENSES = [
  { zoom: "0.5", name: "13 mm Ultra Wide", spec: "48MP · ƒ/2.2 · 120° FOV" },
  { zoom: "1", name: "24 mm Fusion", spec: "48MP · ƒ/1.78 · 2nd-gen OIS" },
  { zoom: "2", name: "48 mm Telephoto", spec: "12MP · ƒ/1.78 · Quad-pixel" },
  { zoom: "5", name: "120 mm Telephoto", spec: "12MP · ƒ/2.8 · Tetraprism" },
];

const PRINCIPLES = [
  {
    title: "Always in hand.",
    body: "The best camera is the one you carry. Coastal sunset flares and spontaneous beach fire performances happen in seconds, with no camera bag to unpack.",
  },
  {
    title: "48MP Apple ProRAW.",
    body: "ProRAW keeps subtle highlight roll-offs across sea reflections and deep shadows in night markets, with wide dynamic range from a phone sensor.",
  },
  {
    title: "Handheld stability.",
    body: "Second-generation sensor-shift OIS and LiDAR depth autofocus lock in sharp low-light exposures entirely handheld, with no tripod.",
  },
];

const PHOTO_APPS: AppGridGroup[] = [
  {
    title: "Capture",
    items: [
      { name: "iOS Camera", iconSrc: "/images/apps/app-ios-camera.png", description: "48MP ProRAW, ready straight from the Lock Screen." },
      { name: "Project Indigo", iconSrc: "/images/apps/app-indigo.png", description: "Multi-frame RAW with a natural, lightly processed look." },
      { name: "No Fusion", iconSrc: "/images/apps/app-nofusion.jpg", description: "Natural photos without heavy sharpening, plus RAW and film looks." },
      { name: "VSCO Capture", iconSrc: "/images/apps/app-vsco.png", description: "Manual focus and ISO, with film-style looks and grain." },
    ],
  },
  {
    title: "Edit",
    items: [
      { name: "Apple Photos", iconSrc: "/images/apps/app-photos.png", description: "Quick, non-destructive edits and Photographic Styles." },
      { name: "Photomator", iconSrc: "/images/apps/app-photomator.jpg", description: "ProRAW editing with smart, machine-learning adjustments." },
      { name: "Adobe Lightroom", iconSrc: "/images/apps/app-lightroom.png", description: "Developing ProRAW: tone curves, highlights and local masks." },
      { name: "Adobe Photoshop", iconSrc: "/images/apps/app-photoshop.png", description: "Retouching, colour blending and clean-up." },
    ],
  },
];

const ORIGINS = [
  {
    year: "2009",
    tag: "The beginning",
    name: "Olympus µ 700",
    spec: "7.1MP · ƒ/3.4–5.7 · 3x Optical Zoom",
    story:
      "Where my photography began. A pocket compact with an all-weather body and a 3x zoom, it taught me to frame a shot long before I knew anything about settings.",
    image: "/images/devices/olympus-mu-700.png",
    alt: "Olympus µ 700 compact digital camera in black",
    // A wide image fills the stage's width while the phones are limited by their height, so at full size it was far
    // bigger than a real 91 mm compact looks beside a 115 mm iPhone 3GS. 0.6 was true to scale but felt too small on its
    // own step; 0.72 keeps it clearly smaller than the phones while giving it presence.
    scale: 0.72,
  },
  {
    year: "2013",
    tag: "Always in my pocket",
    name: "iPhone 3GS",
    spec: "3MP · ƒ/2.8 · Autofocus",
    story:
      "My first smartphone, and the first time a camera was always in my pocket. Tap to focus and a camera that was always with me turned everyday moments into photos.",
    image: "/images/devices/iphone-3gs.png",
    alt: "iPhone 3GS in black, front and back",
    scale: 0.85,
  },
  {
    year: "2015",
    tag: "Learning to see",
    name: "Galaxy J1",
    spec: "5MP · Autofocus · LED Flash",
    story:
      "My first step into Android. A modest camera, but enough to keep me shooting everyday scenes and wanting more from the next phone.",
    image: "/images/devices/samsung-galaxy-j1.png",
    alt: "Samsung Galaxy J1 in white",
  },
  {
    year: "2017",
    tag: "Getting serious",
    name: "Galaxy Note Edge",
    spec: "16MP · ƒ/2.2 · Smart OIS",
    story:
      "Where phone photography got serious, with a 16MP sensor and optical stabilisation. The curved edge screen carried camera settings beside the viewfinder, opening the door to spontaneous handheld street perspectives.",
    image: "/images/devices/samsung-note-edge.png",
    alt: "Samsung Galaxy Note Edge with S-Pen",
  },
  {
    year: "2019",
    tag: "Dual optics",
    name: "Galaxy Note 8",
    spec: "Dual 12MP · ƒ/1.7 + ƒ/2.4 · 2x Optical",
    story:
      "The first dual-camera leap, with dedicated 2x telephoto optics. It built the foundation for focal compression, subject isolation and architectural symmetry.",
    image: "/images/devices/samsung-note-8.png",
    alt: "Samsung Galaxy Note 8 with S-Pen",
  },
  {
    year: "2021",
    tag: "Long reach",
    name: "Galaxy Note 20 Ultra",
    spec: "108MP · 5x Optical Periscope · Laser AF",
    story:
      "A 108MP sensor with 5x folded telephoto reach. Where I learned manual exposure control, low-light RAW capture and isolating distant wildlife.",
    image: "/images/devices/samsung-note-20-ultra.png",
    alt: "Samsung Galaxy Note 20 Ultra Mystic Bronze with S-Pen",
  },
  {
    year: "Now",
    tag: "Shot on iPhone 16 Pro",
    name: "iPhone 16 Pro",
    spec: "48MP Fusion · 5x Telephoto · ProRAW",
    story: "Every frame, in my pocket. No heavy camera bags, no tripod rigs and no lens swaps in the field.",
    image: "/images/devices/iphone-16-pro-desert-titanium.png",
    alt: "iPhone 16 Pro in Desert Titanium, showing its Pro camera system",
  },
];

export default function CameraOpticsKitBento() {
  return (
    <>
      {/* Origins first: the first camera and the phones that followed, one at a time as you scroll, leading up to the iPhone below */}
      <div id="origins" className="scroll-mt-24 mt-24 text-left sm:mt-32">
        <PhoneHistory
          origins={ORIGINS}
          heading={
            <h2 className={`max-w-3xl ${SECTION_TITLE}`}>
              <span className={INK}>A journey in cameras.</span>{" "}
              <span className="text-[#6E6E73] dark:text-[#A1A1A6]">From a pocket compact to a studio in my pocket.</span>
            </h2>
          }
        />
      </div>

      <section
      id="shot-on-iphone"
      aria-label="Shot on iPhone 16 Pro mobile photography"
      className="scroll-mt-24 mt-24 sm:mt-32 text-left"
    >
      {/* Focal lengths */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {LENSES.map((lens, i) => (
          <Reveal key={lens.name} delay={i * 80} rootMargin="0px 0px -30% 0px">
            <dt className={`text-6xl font-semibold tabular-nums tracking-apple-hero sm:text-7xl ${INK}`}>
              <LensNumber value={Number(lens.zoom)} suffixClassName="text-3xl text-[#86868B] dark:text-[#6E6E73] sm:text-4xl" />
            </dt>
            <dd className={`mt-2 text-base font-semibold ${INK}`}>{lens.name}</dd>
            <dd className={`mt-1 text-sm ${GRAY}`}>{lens.spec}</dd>
          </Reveal>
        ))}
      </dl>

      {/* Why a phone */}
      <ul className="mt-20 grid grid-cols-1 gap-10 sm:mt-28 md:grid-cols-3 md:gap-12">
        {PRINCIPLES.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 90} rootMargin="0px 0px -25% 0px">
              <FocusText text={item.title} delay={i * 90} className={`text-2xl font-semibold leading-tight tracking-apple-tight sm:text-3xl ${INK}`} />
              <p className={`mt-3 text-base leading-relaxed ${GRAY}`}>{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      </section>

      {/* Apps: its own section so the side nav can jump to it and mark it while you read it. */}
      <section id="apps" aria-label="Apps in the field" className="scroll-mt-24 mt-24 sm:mt-32 text-left">
        <Reveal>
          <h2 className={`max-w-3xl ${SECTION_TITLE}`}>
            <span className={INK}>Apps in the field.</span>{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">From instant candids to fully manual exposures.</span>
          </h2>
        </Reveal>

        <AppGrid groups={PHOTO_APPS} className="mt-12 sm:mt-16" />
      </section>
    </>
  );
}
