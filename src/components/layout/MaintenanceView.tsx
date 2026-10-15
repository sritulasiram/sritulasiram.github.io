"use client";

export default function MaintenanceView() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7]">
      <header className="px-6 py-4">
        <span className="font-semibold text-neutral-900 dark:text-white">
          Sri Tulasi Ram
        </span>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="block text-neutral-900 dark:text-white">
            Refining the details.
          </span>
          <span className="block text-neutral-400 dark:text-neutral-500">
            Back in a moment.
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-neutral-500 dark:text-neutral-400">
          Making some improvements for a better experience.
        </p>

        <div className="mt-24 sm:mt-32 md:mt-36 text-sm text-neutral-500 dark:text-neutral-400">
          <p>Need to reach me in the meantime?</p>
          <p className="mt-3 flex items-center justify-center gap-3 text-neutral-600 dark:text-neutral-400">
            <a
              href="mailto:sritulasiram@yahoo.com"
              className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            <a
              href="https://www.linkedin.com/in/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-neutral-300 dark:text-neutral-600">·</span>
            <a
              href="https://instagram.com/iamsritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Instagram
            </a>
          </p>
        </div>
      </section>

      <footer className="py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
        © 2026 Sri Tulasi Ram
      </footer>
    </main>
  );
}
