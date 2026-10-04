"use client";

import Image from "next/image";

export default function CameraOpticsKitBento() {
  return (
    <section
      id="shot-on-iphone"
      aria-label="Shot on iPhone 16 Pro Mobile Photography"
      className="mt-24 sm:mt-32 space-y-12 sm:space-y-16 text-left"
    >
      {/* Editorial Hero: Story & Device */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.06]">
            Every Shot
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">Captured on iPhone 16 Pro.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1">
            No heavy camera bags, no tripod rigs, and no lens swaps in the field.
          </p>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-56 sm:w-64 md:w-72 aspect-square drop-shadow-2xl transition-transform duration-500 ease-out hover:scale-105">
            <Image
              src="/images/iphone-16-pro-desert-titanium.png"
              alt="iPhone 16 Pro Desert Titanium Pro camera system"
              fill
              sizes="(max-width: 640px) 220px, 280px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Optical Spectrum: Apple-style Focal Length Strip (Static Spec Display) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-4 sm:py-6">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            0.5<span className="text-xl sm:text-2xl text-[#86868B] dark:text-[#6E6E73]">x</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            13 mm Ultra Wide
          </p>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            48MP · ƒ/2.2 · 120° FOV
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            1<span className="text-xl sm:text-2xl text-[#86868B] dark:text-[#6E6E73]">x</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            24 mm Fusion
          </p>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            48MP · ƒ/1.78 · 2nd-gen OIS
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            2<span className="text-xl sm:text-2xl text-[#86868B] dark:text-[#6E6E73]">x</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            48 mm Telephoto
          </p>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            12MP · ƒ/1.78 · Quad-pixel
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            5<span className="text-xl sm:text-2xl text-[#86868B] dark:text-[#6E6E73]">x</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
            120 mm Telephoto
          </p>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93]">
            12MP · ƒ/2.8 · Tetraprism
          </p>
        </div>
      </div>

      {/* 3 Editorial Craft Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Always in Hand
          </h3>
          <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The best camera is the one you carry. Coastal sunset flares and spontaneous beach fire performances happen in seconds — requiring immediate readiness without unpacking heavy camera bags.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            48MP Apple ProRAW
          </h3>
          <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Uncompressed 14-bit DNG capture preserves subtle highlight roll-offs across sea reflections and deep shadows in night markets, delivering professional dynamic range straight from a phone sensor.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Handheld Stability
          </h3>
          <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Second-generation sensor-shift OIS combined with LiDAR depth autofocus locks in sharp low-light exposures entirely handheld — no tripod required.
          </p>
        </div>
      </div>

      {/* Creative Tools & Apps Used */}
      <div className="pt-8 sm:pt-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] block">
            Field Workflow
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
            Apps used in the field
          </h3>
          <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            From instant candid frames to cinema-grade manual exposures, each application is selected for its specialized optical pipeline and sensor control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Field Capture Apps */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Field Capture
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                Stills &amp; ProRAW
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-ios-camera.png"
                      alt="iOS Camera App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      iOS Camera
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Default 48MP Apple ProRAW pipeline, instant lock-screen readiness, and zero-shutter-lag capture.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-indigo.png"
                      alt="Project Indigo App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Project Indigo
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Fine analog tone curves, atmospheric highlight roll-off, and subtle organic film rendition.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-vsco.png"
                      alt="VSCO Capture App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      VSCO Capture
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Tactile manual focus and ISO control paired with curated film emulations and grain profiles.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Darkroom & Post-Production */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Darkroom &amp; Post
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                RAW Grading &amp; Curves
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-photos.png"
                      alt="Apple Photos Editor App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Apple Photos Editor
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Native Apple ProRAW development, Photographic Styles calibration, and instant nondestructive optical tuning.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-lightroom.png"
                      alt="Adobe Lightroom App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Adobe Lightroom
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      14-bit DNG ProRAW development, fine tone curve grading, highlight roll-off control, and local precision masking.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-photoshop.png"
                      alt="Adobe Photoshop App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Adobe Photoshop
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Pixel-level master retouching, multi-layer color blending, frequency separation, and fine clean-up.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Heritage & Foundation: Apple-style Lineage Showcase */}
      <div className="pt-12 sm:pt-16 space-y-10 sm:space-y-12">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#6E6E73] block">
            Origins &amp; Heritage
          </span>
          <h3 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-tight">
            Where the foundation was built.
          </h3>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            Before capturing on iPhone 16 Pro, years of handheld instincts, composition, and light control were forged across Samsung’s iconic Galaxy Note series.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-4 items-start">
          {/* Note Edge */}
          <div className="group flex flex-col items-center text-center space-y-6">
            {/* Device Hero Render */}
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-44 h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_35px_rgba(255,255,255,0.06)]">
                <Image
                  src="/images/samsung-note-edge.png"
                  alt="Samsung Galaxy Note Edge with S-Pen"
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Typographic Specs & Story */}
            <div className="space-y-2 w-full max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#6E6E73] block">
                2014 · The Spark
              </span>
              <h4 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Galaxy Note Edge
              </h4>
              <p className="text-xs font-medium text-[#86868B] dark:text-[#8E8E93] tracking-wide">
                16MP · ƒ/2.2 · Smart OIS
              </p>
              <p className="text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed pt-1">
                Where mobile framing first took root. Dedicated curved edge shutter controls opened the door to spontaneous handheld street perspectives.
              </p>
            </div>
          </div>

          {/* Note 8 */}
          <div className="group flex flex-col items-center text-center space-y-6">
            {/* Device Hero Render */}
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-40 h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_35px_rgba(255,255,255,0.06)]">
                <Image
                  src="/images/samsung-note-8.png"
                  alt="Samsung Galaxy Note 8 with S-Pen"
                  fill
                  sizes="(max-width: 768px) 180px, 220px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Typographic Specs & Story */}
            <div className="space-y-2 w-full max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#6E6E73] block">
                2017 · Dual Optics
              </span>
              <h4 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Galaxy Note 8
              </h4>
              <p className="text-xs font-medium text-[#86868B] dark:text-[#8E8E93] tracking-wide">
                Dual 12MP · ƒ/1.7 + ƒ/2.4 · 2x Optical
              </p>
              <p className="text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed pt-1">
                The first dual-camera leap with dedicated 2x telephoto optics. Built the foundation for focal compression, subject isolation, and architectural symmetry.
              </p>
            </div>
          </div>

          {/* Note 20 Ultra */}
          <div className="group flex flex-col items-center text-center space-y-6">
            {/* Device Hero Render */}
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
              <div className="relative w-52 h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_35px_rgba(255,255,255,0.06)]">
                <Image
                  src="/images/samsung-note-20-ultra.png"
                  alt="Samsung Galaxy Note 20 Ultra Mystic Bronze with S-Pen"
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Typographic Specs & Story */}
            <div className="space-y-2 w-full max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#6E6E73] block">
                2020 · Pro Sensor Peak
              </span>
              <h4 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Galaxy Note 20 Ultra
              </h4>
              <p className="text-xs font-medium text-[#86868B] dark:text-[#8E8E93] tracking-wide">
                108MP · 5x Optical Periscope · Laser AF
              </p>
              <p className="text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed pt-1">
                Massive 108MP sensor paired with 5x folded telephoto reach. Mastered manual exposure control, low-light raw capture, and distant wildlife isolation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
