import CountUp from "@/components/shared/CountUp";
import Reveal from "@/components/shared/Reveal";
import { ABOUT_DATA } from "@/data/content";
import { Headline, GRAY, INK, WRAP_WIDE } from "./homeShared";

export default function HomeNumbers() {
  return (
    <section aria-label="In numbers" className="py-24 sm:py-32">
      <div className={WRAP_WIDE}>
        <Reveal>
          <Headline gray="The work," ink="in numbers." />
        </Reveal>
        <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {(ABOUT_DATA.stats ?? []).map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <dd className={`text-6xl sm:text-7xl font-semibold tracking-apple-hero tabular-nums ${INK}`}>
                <CountUp value={stat.value} />
              </dd>
              <dt className={`mt-2 text-base font-semibold ${INK}`}>{stat.label}</dt>
              <dd className={`mt-1 text-sm leading-relaxed ${GRAY}`}>{stat.subtext}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
