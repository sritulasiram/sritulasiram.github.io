"use client";

import {
  Navigation,
  Radio,
  Cpu,
  Zap,
  ShieldAlert,
  Bell,
  HeartPulse,
} from "lucide-react";

export default function Esp32TrackerBentoGrid() {
  return (
    <div className="relative w-full h-full bg-[#0E0E11] select-none overflow-hidden font-sans flex flex-col justify-between p-2 sm:p-2.5 gap-1.5 sm:gap-2 rounded-[inherit]">
      {/* ========================================================= */}
      {/* ROW 1: Asymmetrical 3 Cards (4 cols + 5 cols + 3 cols)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 1. Pulse Sensor ADC (4 cols) */}
        <div className="col-span-4 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#FF3B30]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Pulse ADC
            </span>
            <HeartPulse className="w-3 h-3 text-[#FF453A]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#FF453A] leading-tight tabular-nums">
              GPIO 36
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              Analog Optical Sensor
            </p>
          </div>
        </div>

        {/* 2. ESP32 Silicon Controller (5 cols) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#FF9F0A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#FF9F0A] leading-none">
              <Cpu className="w-3 h-3" />
              <span>MCU Core</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 leading-none">FreeRTOS</span>
          </div>
          <div>
            <h5 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight">
              ESP32 38-Pin
            </h5>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
              Non-Blocking Event Loop
            </p>
          </div>
        </div>

        {/* 3. SOS Trigger (3 cols) */}
        <div className="col-span-3 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#FF453A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Trigger
            </span>
            <ShieldAlert className="w-3 h-3 text-[#FF453A]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white leading-tight tabular-nums">
              &gt; 90 BPM
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              Auto Threshold
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 2: Asymmetrical 3 Cards (5 cols + 4 cols + 3 cols)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 4. GPS Receiver (5 cols) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#0A84FF]/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#0A84FF] leading-none">
              <Navigation className="w-3 h-3" />
              <span>NEO-6M GPS</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 leading-none">9600 Baud</span>
          </div>
          <div>
            <h5 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-white tracking-tight leading-tight">
              SoftwareSerial
            </h5>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
              RX:14 · TX:15 Fix Lock
            </p>
          </div>
        </div>

        {/* 5. GSM Alert Module (4 cols) */}
        <div className="col-span-4 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#30D158]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              GSM Network
            </span>
            <Radio className="w-3 h-3 text-[#30D158]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#30D158] leading-tight tabular-nums">
              SIM800L
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              UART2 (RX:16, TX:17)
            </p>
          </div>
        </div>

        {/* 6. Power Isolation (3 cols) */}
        <div className="col-span-3 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#27272A] shadow-2xs hover:border-[#FFD60A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 leading-none">
              Rail
            </span>
            <Zap className="w-3 h-3 text-[#FFD60A]" />
          </div>
          <div>
            <div className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#FFD60A] leading-tight tabular-nums">
              2A Peak
            </div>
            <p className="text-[9.5px] sm:text-[10px] text-neutral-400 tracking-normal leading-none mt-0.5">
              3.7V–4.2V Isolated
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ROW 3: Asymmetrical 2 Cards (7 cols + 5 cols)              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {/* 7. SMS Broadcast Pipeline (7 cols) */}
        <div className="col-span-7 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex items-center justify-between border border-[#27272A] shadow-2xs hover:border-[#0A84FF]/40 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/20 text-[#0A84FF] shrink-0">
              <Bell className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[10px] uppercase font-semibold text-neutral-400 block leading-none">
                Emergency Dispatch
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white truncate block mt-0.5 leading-tight">
                Automated Lat/Lng + BPM SMS Payload
              </span>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#0A84FF] px-1.5 py-0.5 rounded bg-[#0A84FF]/10 border border-[#0A84FF]/20 shrink-0 ml-1">
            Active
          </span>
        </div>

        {/* 8. Manual SOS Button (5 cols) */}
        <div className="col-span-5 bg-[#18181B] text-white rounded-xl p-2 sm:p-2.5 flex items-center justify-between border border-[#27272A] shadow-2xs hover:border-[#FF453A]/40 transition-colors">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-2 h-2 rounded-full bg-[#FF453A] motion-safe:animate-ping shrink-0" />
            <div className="min-w-0">
              <span className="text-[9.5px] sm:text-[10px] uppercase font-semibold text-neutral-400 block leading-none">
                Tactile Switch
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white truncate block mt-0.5 leading-tight">
                GPIO 4 Debounced
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
            SOS
          </span>
        </div>
      </div>
    </div>
  );
}
