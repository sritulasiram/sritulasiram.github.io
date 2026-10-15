
import {
  Cpu,
  Activity,
  Droplets,
  Zap,
  Cloud,
  Gauge,
  Layers,
  FlaskConical,
  Wifi,
} from "lucide-react";

export default function TelemetryBentoGrid() {
  return (
    <div className="relative w-full h-full bg-[#0E0E11] select-none overflow-hidden font-sans flex flex-col justify-between p-2 sm:p-2.5 gap-1.5 sm:gap-2">
      {/* ========================================================= */}
      {/* ROW 1: Asymmetrical 3 Cards (4 cols + 5 cols + 3 cols)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 1. TDS Precision Metric (4 cols) */}
        <div className="col-span-4 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              TDS Precision
            </span>
            <Activity className="w-3 h-3 text-[#00D084]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#00D084] leading-tight tabular-nums">
              99.60%
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              Sensor Accuracy
            </p>
          </div>
        </div>

        {/* 2. ESP32 Silicon Chip (5 cols - Wide Feature Card) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00D084] leading-none">
              <Cpu className="w-3 h-3" />
              <span>MCU</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-neutral-400 leading-none">
              <Wifi className="w-2.5 h-2.5 text-[#00D084]" />
              <span>2.4G</span>
            </div>
          </div>
          <div>
            <h5 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight">
              ESP32 Dual-Core
            </h5>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
              240MHz · Wi-Fi + BLE
            </p>
          </div>
        </div>

        {/* 3. Speed Metric (3 cols - Compact Card) */}
        <div className="col-span-3 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Speed
            </span>
            <Zap className="w-3 h-3 text-[#00D084]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white leading-tight tabular-nums">
              &lt; 22s
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              Per 1L Batch
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 2: Asymmetrical 3 Cards (3 cols + 5 cols + 4 cols)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 4. Mixing Ratio (3 cols - Compact Card) */}
        <div className="col-span-3 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Ratio
            </span>
            <Droplets className="w-3 h-3 text-[#00D084]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#00D084] leading-tight tabular-nums">
              1:1
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              A &amp; B Mix
            </p>
          </div>
        </div>

        {/* 5. Blynk Cloud Telemetry (5 cols - Wide Feature Card) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#00D084] leading-none">
              <Cloud className="w-3 h-3" />
              <span>Blynk Cloud</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 leading-none">Sync</span>
          </div>
          <div>
            <h5 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight">
              iOS &amp; Android App
            </h5>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
              Live Mobile Telemetry
            </p>
          </div>
        </div>

        {/* 6. Flow Sensor Accuracy (4 cols) */}
        <div className="col-span-4 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Flow Accuracy
            </span>
            <Gauge className="w-3 h-3 text-[#00D084]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#00D084] leading-tight tabular-nums">
              97.54%
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              Dosage Calibration
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 3: Asymmetrical 2 Cards (7 cols + 5 cols)              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 7. Dosing Hardware (7 cols - Large Feature Card) */}
        <div className="col-span-7 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex items-center justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] shrink-0">
              <FlaskConical className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#00D084] leading-none truncate">
                Dosing Actuation
              </p>
              <p className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight mt-0.5 truncate">
                12V Peristaltic Pumps
              </p>
            </div>
          </div>
          <span className="text-[9.5px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 hidden sm:inline-block shrink-0 ml-1">
            Anti-Backflow
          </span>
        </div>

        {/* 8. Dynamic Operating Range (5 cols) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex items-center justify-between border border-[#27272A] shadow-2xs hover:border-[#00D084]/40 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#00D084]/10 border border-[#00D084]/20 text-[#00D084] shrink-0">
              <Layers className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none truncate">
                Operating Range
              </p>
              <p className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight mt-0.5 truncate tabular-nums">
                1,000 ppm · 96%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
