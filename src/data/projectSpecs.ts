export interface ProjectSpecRow {
  label: string;
  value: string | string[];
}

export interface ProjectSpecGroup {
  title: string;
  rows: ProjectSpecRow[];
}

/** Projects presented as a product page: Overview + Tech Specs. */
export const PROJECT_SPECS: Record<string, ProjectSpecGroup[]> = {
  "cytron-hr-assistive-intelligence": [
    {
      title: "Retrieval",
      rows: [
        { label: "Vector index", value: "ChromaDB, one collection per embedding model" },
        { label: "Chunking", value: "Split by document structure; list items and tables are never cut; short sections merged" },
        { label: "Re-indexing", value: "Content-hash chunk ids, so only changed text is embedded again" },
        { label: "Relevance gate", value: "0.60 similarity cut-off plus a 0.15 retrieval margin, both adjustable" },
        { label: "Calibration", value: "For gemini-embedding-2: on-topic questions score above 0.70; off-topic fall to 0.48–0.59" },
      ],
    },
    {
      title: "Answers",
      rows: [
        { label: "Providers", value: ["Google Gemini", "OpenAI"] },
        { label: "Interchangeable for", value: "Both embeddings and answers" },
        { label: "Delivery", value: "Streamed token by token over server-sent events, with fallback models" },
        { label: "Citations", value: "Numbered, and only the cited excerpts are returned as sources" },
        { label: "Out-of-scope questions", value: "Fixed “not found” reply that points to HR; 0 model calls" },
      ],
    },
    {
      title: "Documents",
      rows: [
        { label: "Formats", value: ["DOCX", "PDF", "TXT", "Markdown"] },
        { label: "Maximum size", value: "20 MB per file" },
        { label: "DOCX parsing", value: "Native OpenXML reader that includes floating text boxes and tables" },
      ],
    },
    {
      title: "Privacy & Quality",
      rows: [
        { label: "Private chats", value: "No messages stored" },
        { label: "Usage analytics", value: "Never record question text" },
        { label: "Evaluation", value: "Saved test questions score retrieval after every change" },
        { label: "Insights", value: "Unanswered questions and answers rated down" },
      ],
    },
    {
      title: "Software",
      rows: [
        { label: "Backend", value: ["Python", "FastAPI", "SQLite"] },
        { label: "Serving", value: "Single process for the API and the compiled React interface" },
        { label: "Interface", value: ["React 18", "Vite", "Tailwind CSS", "Markdown rendering", "Citation viewer"] },
      ],
    },
  ],

  "warranty-rma": [
    {
      title: "Platform",
      rows: [
        { label: "Release", value: "v2.52.1" },
        { label: "Backend", value: ["Python 3", "Flask 3.1 (8 blueprints)", "Gunicorn", "systemd services"] },
        { label: "Database", value: "SQLite in WAL mode with foreign keys and a 30-second busy timeout" },
        { label: "Interface", value: "Server-rendered Flask templates with a custom design system" },
      ],
    },
    {
      title: "Repair Workflow",
      rows: [
        { label: "Statuses", value: "PENDING, DIAGNOSING, REPAIRING, TESTING, WAITING_PARTS, SUPPLIER RMA, COMPLETED, COLLECTED, CANCELLED (configurable)" },
        { label: "Intake", value: "Several units under one Customer Order ID, with product suggestions and a live label preview" },
        { label: "Service tiers", value: ["Manufacturing Warranty", "Post-Warranty Repair"] },
        { label: "Billing", value: "Itemised parts, labour, diagnostic fees, discounts and tax on a printable service form" },
        { label: "Audit", value: "Every status change is timestamped in a status history" },
      ],
    },
    {
      title: "SLA",
      rows: [
        { label: "Target", value: "5 business days by default" },
        { label: "Warning", value: "From day 4 by default" },
        { label: "Weekends", value: "Excluded by default" },
        { label: "Exempt", value: "Post-warranty repairs, and cases at a closed or SUPPLIER RMA status" },
        { label: "Time zone", value: "Configurable, Asia/Kuala_Lumpur by default" },
      ],
    },
    {
      title: "Supplier RMA",
      rows: [
        { label: "Batches", value: "Several units bundled into a vendor-bound package, grouped by supplier invoice" },
        { label: "Documents", value: "Credit notes, invoices and photos as PDF, PNG or JPG, checked by file signature" },
        { label: "Manifest", value: "Printable shipment manifest organised by invoice" },
        { label: "Resolution", value: "Credited, replaced or approved results flow back to the repair record" },
      ],
    },
    {
      title: "Protection",
      rows: [
        { label: "Watchlist flags", value: ["LOST_PARCEL", "SPONSORSHIP", "RESTRICTED", "REPLACED", "SUSPICIOUS"] },
        { label: "Policies", value: "Soft warning (dismissible) or hard block (supervisor credential override)" },
        { label: "Replacements", value: "Defective serial linked to the new one, flagged automatically, with warranty coverage inherited" },
      ],
    },
    {
      title: "Hardware",
      rows: [
        { label: "Label printer", value: "GP-1324D thermal printer, 60×40 mm labels, over CUPS or a raw USB device" },
        { label: "Barcodes", value: "Code128 with human-readable identifiers; USB scanners supported" },
        { label: "Status display", value: "128×64 I2C OLED (SSD1306 / SH1106) showing IP, load and tunnel link" },
        { label: "Kiosk", value: "Optional 3.5-inch TFT dashboard and fullscreen kiosk mode on a Raspberry Pi" },
      ],
    },
    {
      title: "Assistant",
      rows: [
        { label: "Interface", value: "Telegram, in allow-listed chats only" },
        { label: "Model", value: "Google Gemini with function calling" },
        { label: "Tools", value: "24, all read-only" },
        { label: "Limits", value: "20 requests per hour per user, 3 seconds apart" },
        { label: "Briefings", value: "Morning stand-up and evening wrap-up, plus intake, RMA and completion alerts" },
      ],
    },
    {
      title: "Storage & Access",
      rows: [
        { label: "Storage backends", value: ["Local filesystem", "Google Drive", "Google Cloud Storage"] },
        { label: "Spreadsheets", value: "Repair records, replacements and RMA claims synced to Google Sheets" },
        { label: "Remote access", value: "Cloudflare Tunnel over HTTPS, no port forwarding" },
        { label: "Roles", value: ["Admin", "Manager", "Technician"] },
        { label: "Sign-in protection", value: "Account lockout after 5 failed attempts for 15 minutes by default, plus CSRF protection" },
      ],
    },
    {
      title: "Quality",
      rows: [
        { label: "Automated tests", value: "300+ (pytest), covering storage providers, routes, authentication, versioning, hardware configuration and the assistant" },
        { label: "Documentation", value: "API, database, hardware, analytics, security, operator workflows and design guides" },
      ],
    },
  ],

  "raspberry-pi-diagnostics": [
    {
      title: "Diagnostics",
      rows: [
        { label: "Test vectors", value: "19 automated" },
        { label: "Run plan", value: "4 phases: Platform & Ports, Radio & Network, Storage, Compute & Power" },
        { label: "Platform & ports", value: ["Bootloader", "Interfaces", "PCIe", "USB", "HDMI", "CSI/DSI", "Camera", "GPIO", "UART", "Keyboard"] },
        { label: "Radio & network", value: ["Ethernet", "Wi-Fi", "Bluetooth"] },
        { label: "Storage", value: "Partition and mount health, filesystem check, SD read/write speed" },
        { label: "Compute & power", value: "CPU temperature, memory, and a power audit that runs alone" },
        { label: "Results", value: "Passed, warning, failed, or info for optional hardware that isn’t present" },
      ],
    },
    {
      title: "Power Audit",
      rows: [
        { label: "Stress test", value: "2-second all-core load while core voltage is sampled" },
        { label: "Under-voltage", value: "Fails the test" },
        { label: "Throttling", value: "Raises a warning" },
        { label: "Pi 5 supply", value: "Warns when the power supply reports less than 5 A" },
      ],
    },
    {
      title: "Electrical Safety",
      rows: [
        { label: "GPIO probing", value: "Pins read with internal pull-ups (SET_PULL_UP); no external wiring or probes" },
        { label: "Line release", value: "Each line freed (gpio_free) inside try…finally" },
        { label: "Fault reporting", value: "Pin-by-pin results with a stuck or failed pin isolated on the report" },
      ],
    },
    {
      title: "Compatibility",
      rows: [
        { label: "Raspberry Pi 5 / 500", value: "RP1 via lgpio, GPIO chip found automatically (/dev/gpiochip4, 0, 1)" },
        { label: "Pi 4, 400, 3, Zero 2 W", value: "gpiozero, with lgpio or RPi.GPIO as fallbacks" },
        { label: "Older boards", value: "Pi 2, 1, Zero and Zero W run in passive mode" },
        { label: "Operating system", value: "Raspberry Pi OS 64-bit (Debian 12 Bookworm / 13 Trixie)" },
      ],
    },
    {
      title: "Reports",
      rows: [
        { label: "Format", value: "2-page RMA manifest and certificate, printable or saved as PDF" },
        { label: "Reference ID", value: "DOC-RMA-YYYYMMDD-NNNN, from the test session" },
        { label: "Contents", value: "Unit-under-test spec sheet, per-test criteria and results, verdict, technician sign-off" },
        { label: "Integrity", value: "HMAC-SHA256 seal over the full record; it changes if stored results are edited" },
      ],
    },
    {
      title: "Reliability",
      rows: [
        { label: "Per-test ceiling", value: "180 seconds; a hung test is reported as failed" },
        { label: "Hardware access", value: "Bus-touching tests are serialised by a lock" },
        { label: "Records", value: "SQLite in WAL mode with a daily 90-day prune timer" },
        { label: "Throttle readings", value: "Cached for 15 seconds" },
        { label: "Interface", value: "Self-hosted fonts, icons and charts, so it works offline" },
      ],
    },
    {
      title: "Software",
      rows: [
        { label: "Languages", value: ["Python 3.9–3.12", "JavaScript (ES6+)", "CSS3", "HTML5", "Bash"] },
        { label: "Backend", value: ["Flask 3.1", "Gunicorn 23 (1 worker, 8 threads)", "SQLite (WAL)", "psutil", "lgpio", "gpiozero", "pyserial", "spidev"] },
        { label: "Frontend", value: "Dependency-free vanilla JavaScript that polls the API" },
        { label: "Service", value: "systemd service with a least-privilege sudoers rule for power actions" },
      ],
    },
  ],
  "opencore-efi-hackintosh": [
    {
      title: "Target Machine",
      rows: [
        { label: "Laptop", value: "ASUS ROG Strix GL503GE" },
        { label: "Processor", value: "Intel Core i7-8750H (6 cores, 12 threads)" },
        { label: "Graphics", value: "Intel UHD Graphics 630 drives the display; the NVIDIA GTX 1050 Ti Mobile is powered down" },
        { label: "Memory", value: "16 GB DDR4 2666 MHz" },
        { label: "BIOS tested", value: "Version 319" },
      ],
    },
    {
      title: "Boot",
      rows: [
        { label: "Bootloader", value: "OpenCore 1.0.8" },
        { label: "Firmware", value: "UEFI 2.7+, with Secure Boot disabled as the BIOS guide requires" },
        { label: "SMBIOS", value: "MacBookPro16,4" },
        { label: "NVRAM", value: "Native 300-series NVRAM through SSDT-PMC" },
      ],
    },
    {
      title: "macOS Support",
      rows: [
        { label: "Versions tested", value: ["Sonoma 14.x", "Sequoia 15.x", "Tahoe 26.x"] },
        { label: "Working components", value: "17 confirmed, including CPU, graphics, audio, networking, trackpad, keyboard, webcam, battery, display, HDMI and sleep/wake" },
        { label: "Testing", value: "Card reader (Realtek RTS5229) through Sinetek-rtsx" },
      ],
    },
    {
      title: "ACPI Patches",
      rows: [
        { label: "Discrete GPU", value: "SSDT-Disable_GPU_PEG0 runs _OFF on _SB.PCI0.PEG0.PEGP to power the NVIDIA card down" },
        { label: "CPU power", value: "SSDT-PLUG enables native frequency scaling across all 6 cores and 12 threads" },
        { label: "Sleep", value: "SSDT-GPRW stops USB devices waking the machine instantly" },
        { label: "Trackpad", value: "SSDT-GPI0 routes the GPIO pin interrupts the I2C trackpad needs" },
        { label: "Other tables", value: ["SSDT-PNLF", "SSDT-EC", "SSDT-USBX", "SSDT-ALSD", "SSDT-PMC"] },
      ],
    },
    {
      title: "Kernel Extensions",
      rows: [
        { label: "Core", value: ["Lilu", "VirtualSMC", "AsusSMC", "NVMeFix"] },
        { label: "Graphics and audio", value: ["WhateverGreen (-igfxblt)", "AppleALC (layout-id 14)"] },
        { label: "Input", value: ["VoodooI2C", "VoodooI2CHID"] },
        { label: "Networking", value: ["AirportItlwm", "RealtekRTL8111"] },
      ],
    },
    {
      title: "Power and Input",
      rows: [
        { label: "Sleep and wake", value: "Clean S3 sleep and lid-close detection through fix_sleep_pmset.sh" },
        { label: "USB", value: "Compliant 15-port XHCI map, so there are no controller reset loops" },
        { label: "Trackpad", value: "Native 1 to 4 finger gestures, smooth scrolling and palm rejection" },
        { label: "Function keys", value: "Physical F1 to F12 legends and media hotkeys through setup_function_keys.sh" },
        { label: "Keyboard lighting", value: "4-zone Aura RGB is handled by the companion ROG Gaming Center app" },
      ],
    },
  ],
  "iot-fertiliser-mixing": [
    {
      title: "Publication",
      rows: [
        { label: "Journal", value: "International Journal of Integrated Engineering (IJIE), Vol. 18, No. 1, pp. 186–201, 2026" },
        { label: "DOI", value: "10.30880/ijie.2026.18.01.014" },
        { label: "Role", value: "First author and firmware engineer" },
        { label: "Institution", value: "Universiti Tun Hussein Onn Malaysia (UTHM)" },
      ],
    },
    {
      title: "Controller",
      rows: [
        { label: "Microcontroller", value: "ESP32" },
        { label: "Firmware", value: "C and C++ on the Arduino ESP32 core (2.0.0 or later)" },
        { label: "Control loop", value: "Non-blocking state machine that keeps the watchdog and WiFi heartbeat alive during dispensing" },
        { label: "Connectivity", value: "WiFi 802.11 b/g/n" },
      ],
    },
    {
      title: "Sensing",
      rows: [
        { label: "TDS electrode", value: "Submersible, read on ADC1 (GPIO 36)" },
        { label: "TDS filtering", value: "30-sample circular buffer with a median filter, then 3rd-order polynomial conversion to ppm" },
        { label: "Water level", value: "Two reservoir probes on GPIO 34 and 35: Low (700 or less), Medium (701 to 1200), High (above 1200)" },
        { label: "ADC isolation", value: "All analog sensors on ADC1, because ADC2 is corrupted by the WiFi radio" },
      ],
    },
    {
      title: "Dispensing",
      rows: [
        { label: "Pumps", value: "Dual pump and solenoid circuits (GPIO 16/17 and 22/23)" },
        { label: "Flow metering", value: "Pulse flow meters on GPIO 18 and 19, read in IRAM interrupt routines with atomic guards" },
        { label: "Calibration", value: "5.25 and 5.50 ml per pulse, one for each pump" },
        { label: "Cutoff", value: "Each pump shuts off independently, with no volumetric overshoot" },
      ],
    },
    {
      title: "Cloud",
      rows: [
        { label: "Platform", value: "Blynk IoT (1.3.0 or later)" },
        { label: "V1", value: "Volume input" },
        { label: "V2", value: "Dispensed volume" },
        { label: "V3", value: "Live TDS in ppm" },
        { label: "V4 and V5", value: "Colour-coded water status LEDs" },
      ],
    },
    {
      title: "Results",
      rows: [
        { label: "TDS precision", value: "99.6% mean accuracy against a calibrated meter, across four standard solutions from about 230 to 900 ppm" },
        { label: "Dosing accuracy", value: "More than 94% across 250 to 1,000 ml dispenses" },
        { label: "Licence", value: "MIT" },
      ],
    },
  ],

  "rog-gaming-center": [
    {
      title: "App",
      rows: [
        { label: "Version", value: "1.0.0-beta" },
        { label: "Languages", value: ["Swift 5.9", "SwiftUI"] },
        { label: "Runtimes", value: "None. No Python, Node.js, Electron, libusb or bridging headers" },
        { label: "Privileges", value: "User space only: no root daemon, kext changes or sleep and wake daemon" },
        { label: "Build", value: ["Xcode 15", "Swift Package Manager"] },
      ],
    },
    {
      title: "Keyboard Lighting",
      rows: [
        { label: "Zones", value: "4-zone Aura RGB" },
        { label: "Effects", value: ["Static", "Breathing", "Color Cycle", "Rainbow", "Strobing"] },
        { label: "Protocol", value: "17-byte USB HID feature reports over a serialised queue with 10 ms delays" },
        { label: "Controllers", value: "ASUS ROG and TUF microcontrollers (VID 0x0B05), across several product IDs" },
        { label: "Command line", value: "rogauracore, a bundled tool for shell scripts" },
      ],
    },
    {
      title: "Telemetry",
      rows: [
        { label: "CPU temperature", value: "AppleSMC register TC0P, with thermal headroom worked out from it" },
        { label: "Fans", value: "Dual fan RPM" },
        { label: "CPU load", value: "Mach host statistics, shown as a live sparkline" },
        { label: "Battery limit", value: "60%, 80% or 100% charge threshold through the AsusSMC sysctl" },
      ],
    },
    {
      title: "GameVisual",
      rows: [
        { label: "Profiles", value: ["Default", "Vivid", "Cinema", "Eye Care", "FPS", "RTS / RPG"] },
        { label: "Method", value: "256-sample red, green and blue gamma curves through CGSetDisplayTransferByTable" },
        { label: "Safety", value: "The original table is restored on quit or sleep" },
      ],
    },
    {
      title: "Hotkeys",
      rows: [
        { label: "Function keys", value: "Fn legends captured through a macOS event tap" },
        { label: "ROG key", value: "Raw HID input reports (usage page 0xFF31, usage 0x0038) open the app" },
        { label: "Debounce", value: "250 ms" },
      ],
    },
  ],
};

export const SHOWCASE_PROJECT_IDS = Object.keys(PROJECT_SPECS);

export const isShowcaseProject = (id: string) => id in PROJECT_SPECS;
