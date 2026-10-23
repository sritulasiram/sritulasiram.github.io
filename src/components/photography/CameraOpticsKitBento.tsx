import Image from "next/image";
import Reveal from "@/components/shared/Reveal";

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#6E6E73] dark:text-[#A1A1A6]";
const TILE = "rounded-[28px] bg-[#F5F5F7] dark:bg-[#1C1C1E]";

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

interface App {
  name: string;
  icon: string;
  description: string;
}

const FIELD_APPS: App[] = [
  { name: "iOS Camera", icon: "/images/apps/app-ios-camera.png", description: "ProRAW up to 48MP, instant lock-screen launch, and zero shutter lag." },
  { name: "Project Indigo", icon: "/images/apps/app-indigo.png", description: "Multi-frame RAW capture with a natural, lightly processed look." },
  { name: "VSCO Capture", icon: "/images/apps/app-vsco.png", description: "Tactile manual focus and ISO control, with curated film emulations and grain." },
];

const POST_APPS: App[] = [
  { name: "Apple Photos", icon: "/images/apps/app-photos.png", description: "Non-destructive edits to ProRAW and HEIF, with Photographic Styles." },
  { name: "Adobe Lightroom", icon: "/images/apps/app-lightroom.png", description: "ProRAW development, tone curves, highlight roll-off and local masking." },
  { name: "Adobe Photoshop", icon: "/images/apps/app-photoshop.png", description: "Pixel-level retouching, colour blending, frequency separation and clean-up." },
];

const ORIGINS = [
  {
    year: "2014",
    tag: "The spark",
    name: "Galaxy Note Edge",
    spec: "16MP · ƒ/2.2 · Smart OIS",
    story:
      "Where mobile framing first took root. The curved edge screen carried camera settings beside the viewfinder, opening the door to spontaneous handheld street perspectives.",
    image: "/images/devices/samsung-note-edge.png",
    alt: "Samsung Galaxy Note Edge with S-Pen",
  },
  {
    year: "2017",
    tag: "Dual optics",
    name: "Galaxy Note 8",
    spec: "Dual 12MP · ƒ/1.7 + ƒ/2.4 · 2x Optical",
    story:
      "The first dual-camera leap, with dedicated 2x telephoto optics. It built the foundation for focal compression, subject isolation and architectural symmetry.",
    image: "/images/devices/samsung-note-8.png",
    alt: "Samsung Galaxy Note 8 with S-Pen",
  },
  {
    year: "2020",
    tag: "Long reach",
    name: "Galaxy Note 20 Ultra",
    spec: "108MP · 5x Optical Periscope · Laser AF",
    story:
      "A 108MP sensor with 5x folded telephoto reach. Where I learned manual exposure control, low-light RAW capture and isolating distant wildlife.",
    image: "/images/devices/samsung-note-20-ultra.png",
    alt: "Samsung Galaxy Note 20 Ultra Mystic Bronze with S-Pen",
  },
];

function AppTile({ app }: { app: App }) {
  return (
    <li className={`${TILE} flex flex-col p-7 min-h-[240px] transition-transform duration-300 ease-out motion-safe:hover:scale-[1.01]`}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[22%] bg-white shadow-md dark:bg-[#2C2C2E]">
        <Image src={app.icon} alt="" fill sizes="56px" className="object-cover" />
      </div>
      <div className="mt-auto pt-8">
        <h4 className={`text-xl font-semibold tracking-apple-tight ${INK}`}>{app.name}</h4>
        <p className={`mt-2 text-[15px] leading-[1.45] ${GRAY}`}>{app.description}</p>
      </div>
    </li>
  );
}

export default function CameraOpticsKitBento() {
  return (
    <section
      id="shot-on-iphone"
      aria-label="Shot on iPhone 16 Pro mobile photography"
      className="scroll-mt-24 mt-24 sm:mt-32 text-left"
    >
      {/* The device */}
      <Reveal>
        <div className={`${TILE} grid grid-cols-1 items-center gap-6 overflow-hidden px-8 pt-12 sm:px-14 sm:pt-16 lg:grid-cols-2 lg:py-16`}>
          <div>
            <p className={`text-xl font-semibold tracking-apple-tight sm:text-2xl ${INK}`}>Shot on iPhone 16 Pro.</p>
            <h2 className={`mt-2 text-4xl font-semibold leading-[1.05] tracking-apple-hero sm:text-6xl ${INK}`}>
              Every frame,
              <span className="block text-[#86868B] dark:text-[#6E6E73]">in my pocket.</span>
            </h2>
            <p className={`mt-5 max-w-md text-lg leading-relaxed ${GRAY}`}>
              No heavy camera bags, no tripod rigs and no lens swaps in the field.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-[min(80%,380px)] drop-shadow-2xl">
            <Image
              src="/images/devices/iphone-16-pro-desert-titanium.png"
              alt="iPhone 16 Pro in Desert Titanium, showing its Pro camera system"
              fill
              sizes="(max-width: 1024px) 70vw, 380px"
              className="object-contain"
            />
          </div>
        </div>
      </Reveal>

      {/* Focal lengths */}
      <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 sm:mt-24">
        {LENSES.map((lens, i) => (
          <Reveal key={lens.name} delay={i * 80}>
            <dt className={`text-6xl font-semibold tabular-nums tracking-apple-hero sm:text-7xl ${INK}`}>
              {lens.zoom}
              <span className="text-3xl text-[#86868B] dark:text-[#6E6E73] sm:text-4xl">×</span>
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
            <Reveal delay={i * 90}>
              <h3 className={`text-2xl font-semibold leading-tight tracking-apple-tight sm:text-3xl ${INK}`}>{item.title}</h3>
              <p className={`mt-3 text-base leading-relaxed ${GRAY}`}>{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Apps */}
      <div className="mt-24 sm:mt-32">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-apple-tight text-balance sm:text-5xl">
            <span className={INK}>Apps in the field.</span>{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">From instant candids to fully manual exposures.</span>
          </h2>
        </Reveal>

        <h3 className={`mt-12 text-sm font-semibold uppercase tracking-widest sm:mt-16 ${GRAY}`}>Capture</h3>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {FIELD_APPS.map((app) => (
            <AppTile key={app.name} app={app} />
          ))}
        </ul>

        <h3 className={`mt-10 text-sm font-semibold uppercase tracking-widest ${GRAY}`}>Edit</h3>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {POST_APPS.map((app) => (
            <AppTile key={app.name} app={app} />
          ))}
        </ul>
      </div>

      {/* Origins: the three Galaxy Note phones, side by side like Apple's compare view */}
      <div id="origins" className="scroll-mt-24 mt-24 sm:mt-32">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-apple-tight text-balance sm:text-5xl">
            <span className={INK}>Where it started.</span>{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">
              Three Galaxy Notes. One way of seeing.
            </span>
          </h2>
        </Reveal>

        <ol className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar sm:-mx-8 sm:mt-16 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {ORIGINS.map((device, i) => (
            <li key={device.name} className="w-[82%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <Reveal delay={i * 100} className="h-full">
                <article className={`${TILE} group flex h-full flex-col overflow-hidden px-7 pt-8 pb-9`}>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">{device.tag}</p>
                  <p className={`mt-1 text-6xl font-semibold tabular-nums leading-none tracking-apple-hero ${INK}`}>{device.year}</p>

                  <div className="relative mx-auto my-8 h-72 w-full">
                    <Image
                      src={device.image}
                      alt={device.alt}
                      fill
                      sizes="(max-width: 768px) 70vw, 300px"
                      className="object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 dark:drop-shadow-none"
                    />
                  </div>

                  <h3 className={`text-2xl font-semibold tracking-apple-tight ${INK}`}>{device.name}</h3>
                  <p className={`mt-1 text-sm font-medium ${GRAY}`}>{device.spec}</p>
                  <p className={`mt-5 text-[15px] leading-relaxed ${GRAY}`}>{device.story}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
