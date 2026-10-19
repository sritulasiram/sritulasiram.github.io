/**
 * The 40-pin header drawn the way it sits on the board: even pins on the top row, odd pins on
 * the bottom row. Pin 7 is shown as the isolated fault the suite can report.
 */
type PinType = "gpio" | "power" | "gnd" | "id";

const POWER = new Set([1, 2, 4, 17]);
const GND = new Set([6, 9, 14, 20, 25, 30, 34, 39]);
const ID = new Set([27, 28]);
const FAULT_PIN = 7;

const typeOf = (pin: number): PinType =>
  POWER.has(pin) ? "power" : GND.has(pin) ? "gnd" : ID.has(pin) ? "id" : "gpio";

const COLOR: Record<PinType, string> = {
  gpio: "bg-emerald-500",
  power: "bg-amber-500",
  gnd: "bg-zinc-400 dark:bg-zinc-600",
  id: "bg-sky-500",
};

const topRow = Array.from({ length: 20 }, (_, i) => (i + 1) * 2);
const bottomRow = Array.from({ length: 20 }, (_, i) => i * 2 + 1);

function Pin({ pin }: { pin: number }) {
  const fault = pin === FAULT_PIN;
  return (
    <span
      className={`aspect-square rounded-full ${
        fault ? "bg-rose-600 dark:bg-[#FF375F] animate-pulse motion-reduce:animate-none ring-4 ring-rose-600/20" : COLOR[typeOf(pin)]
      }`}
    />
  );
}

export default function PiPinMap() {
  return (
    <div className="space-y-5">
      <div
        role="img"
        aria-label="The Raspberry Pi 40-pin header, with one example pin, pin 7, flagged as stuck low."
        className="rounded-2xl bg-white dark:bg-[#232326] p-4 sm:p-5 shadow-xs"
      >
        <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
          {topRow.map((pin) => (
            <Pin key={pin} pin={pin} />
          ))}
          {bottomRow.map((pin) => (
            <Pin key={pin} pin={pin} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
        {[
          ["bg-emerald-500", "GPIO"],
          ["bg-amber-500", "3.3 V / 5 V"],
          ["bg-zinc-400 dark:bg-zinc-600", "Ground"],
          ["bg-rose-600 dark:bg-[#FF375F]", "Fault"],
        ].map(([cls, label]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${cls}`} />
            {label}
          </span>
        ))}
      </div>

      <p className="text-sm text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
        <span className="font-semibold">Example, pin 7 (GPIO 4):</span> stuck low.
        <span className="block text-[#6E6E73] dark:text-[#A1A1A6]">
          Reported pin by pin, not as a generic “GPIO error”, so a technician sees exactly which line failed.
        </span>
      </p>
    </div>
  );
}
