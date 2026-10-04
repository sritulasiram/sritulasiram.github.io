import type { CaseStudy } from "@/types";

export type { CaseStudy };

export const PROJECT_DETAILS: Record<string, CaseStudy> = {
  "warranty-rma": {
    id: "warranty-rma",
    title: "Warranty & RMA Management System",
    eyebrow: "Cytron Technologies · Internal Support Operations",
    tagline: "Full-stack repair operations platform integrating thermal barcode printing, batch supplier RMA manifests, and Cloudflare Zero Trust telemetry.",
    heroMetric: "v2.46.1",
    heroMetricLabel: "Production System (WAL Mode)",
    imageSrc: "/images/project-rma.webp",
    placeholderLabel: "Replace: project-rma.webp",
    placeholderRatio: "16:10 Full Dashboard Screenshot (1920×1200)",
    timeframe: "Active Internal Production System",
    role: "Support Engineer & Systems Developer",
    organization: "Cytron Technologies",
    background: {
      problemStatement:
        "Handling customer warranty claims, technician diagnostic triage, supplier RMA claims, and physical hardware printing across hundreds of electronics products was historically managed through fragmented ticketing tools and manual spreadsheets.",
      context:
        "As Malaysia's leading robotics and electronics provider and official Raspberry Pi Design Partner, Cytron required an industrial, highly reliable internal platform to manage multi-item repair intake, batch vendor returns, thermal barcode labeling, and real-time cloud spreadsheet synchronization.",
      challenges: [
        "Tracking multi-item hardware units with disparate warranties and post-warranty service tiers under single customer orders",
        "Reconciling vendor-bound RMA shipments across multiple supplier invoices without lost documentation",
        "Eliminating manual label transcription errors through direct thermal printer hardware integration",
        "Providing secure remote access for workshop technicians and duty managers without open incoming firewall ports",
      ],
    },
    architecture: {
      summary:
        "Built with Python and Flask utilizing modular Blueprint architecture, an optimized SQLite WAL-mode database with strict foreign keys, pluggable local/cloud storage backends, and low-level hardware daemon services for thermal label printing and Raspberry Pi I2C OLED telemetry.",
      components: [
        {
          title: "Modular Intake Terminal & Live Barcode Twin",
          description:
            "Two-card intake terminal with real-time WYSIWYG Code128 barcode twin preview, grouping multiple items under a single Customer Order ID with linear state tracking.",
        },
        {
          title: "Supplier RMA Registry & Batch Bundling",
          description:
            "Multi-invoice RMA consolidation engine enabling 1-click push from repair records into vendor-bound batches, document vaults (PDF/PNG/JPG), and automated shipment manifest generation.",
        },
        {
          title: "Hardware Printing & Telemetry Services",
          description:
            "Direct CUPS/raw device driver integration for 60×40mm thermal barcode printers, USB barcode scanners, and an autonomous Raspberry Pi 128×64 I2C OLED telemetry daemon.",
        },
        {
          title: "Pluggable Cloud Storage & Automated Sync",
          description:
            "Abstracted storage layer supporting Local Filesystem, Google Drive, and GCS backends, featuring real-time automated Google Sheets and Drive two-way sync scripts.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Two-Card Intake & Lifecycle Engine",
        description:
          "Split-card terminal for fast intake logging with linear state progression: PENDING ➔ DIAGNOSING ➔ REPAIRING ➔ TESTING ➔ COMPLETED ➔ CANCELLED.",
        badge: "Workshop Core",
      },
      {
        title: "Supplier RMA Manifest Generator",
        description:
          "Groups claim items by supplier invoice with interactive drag/move capabilities and printable shipment packing slips with Code128 barcodes.",
        badge: "Vendor Logistics",
      },
      {
        title: "Thermal Label Twin",
        description:
          "Native thermal label generation on 60×40mm media with human-readable tracking identifiers and automated barcode printing.",
        badge: "Hardware Integration",
      },
      {
        title: "Operations Pulse Deck & SLA Tracking",
        description:
          "4-card real-time KPI monitor tracking Today's Intakes, Active in Pipeline, Average SLA Turnaround (business days), and on-duty technicians.",
        badge: "Analytics",
      },
      {
        title: "Cloudflare Zero Trust Tunnel",
        description:
          "Integrated cloudflared tunnel manager delivering encrypted HTTPS remote access for floor technicians without port forwarding.",
        badge: "Networking & Security",
      },
      {
        title: "Telegram Bot & Technician Alerts",
        description:
          "Automated real-time notifications for status changes, SLA threshold triggers, and interactive repair ticket lookup directly in Telegram.",
        badge: "Automation",
      },
    ],
    techStack: [
      { category: "Backend Architecture", items: ["Python 3", "Flask (Blueprints)", "SQLite (WAL Mode)", "Gunicorn", "systemd Daemons"] },
      { category: "Hardware & Peripherals", items: ["Thermal Barcode Printer", "I2C OLED 128×64 (SSD1306/SH1106)", "USB Barcode Scanners", "Code128 Barcodes"] },
      { category: "Cloud, Sync & Security", items: ["Cloudflare Zero Trust", "Telegram Bot API", "Google Drive & Sheets API", "Google Cloud Storage", "Pytest (148 tests)"] },
    ],
    results: [
      {
        metric: "148",
        label: "Automated Tests",
        description: "Comprehensive pytest test suite covering storage backends, blueprints, auth, and versioning.",
      },
      {
        metric: "100%",
        label: "Hardware Traceability",
        description: "Every RMA unit, diagnostic report, and supplier manifest linked by scannable Code128 barcodes.",
      },
      {
        metric: "2.46.1",
        label: "Production Release",
        description: "Actively deployed internal system powering Cytron's regional support operations.",
      },
    ],
    screens: [
      {
        id: "intake-terminal",
        title: "Two-Card Intake Terminal",
        description: "Split-card terminal for rapid intake logging with real-time WYSIWYG Code128 barcode twin preview, grouping multiple items under a single Customer Order ID with linear state tracking.",
        imageSrc: "/images/project-rma.webp",
      },
      {
        id: "pulse-deck",
        title: "Operations Pulse Deck",
        description: "4-card real-time KPI monitor tracking live bench tickets, active duty technicians, intake rates, and SLA turnaround thresholds across active workshop shifts.",
        imageSrc: "/images/project-rma.webp",
      },
      {
        id: "label-generator",
        title: "Thermal Barcode Label Twin",
        description: "Direct CUPS/raw driver integration printing high-contrast 60×40mm thermal adhesive labels with tracking identifiers, eliminating manual label transcription errors.",
        imageSrc: "/images/project-rma.webp",
      },
      {
        id: "supplier-rma",
        title: "Supplier RMA Manifest Engine",
        description: "Multi-invoice vendor consolidation engine grouping repair units by original purchase invoices with automated printable shipment packing slips and Code128 barcodes.",
        imageSrc: "/images/project-rma.webp",
      },
      {
        id: "telegram-bot",
        title: "Telegram Alert Telemetry",
        description: "Automated webhook integration pushing status triggers, SLA escalation warnings, and interactive ticket lookups directly to duty technicians' mobile devices.",
        imageSrc: "/images/project-rma.webp",
      },
    ],
  },
  "raspberry-pi-diagnostics": {
    id: "raspberry-pi-diagnostics",
    title: "Raspberry Pi Diagnostic Suite",
    eyebrow: "Cytron Technologies · Enterprise Hardware QA & RMA Platform",
    tagline: "Automated multi-vector hardware validation and tamper-evident cryptographic test reports in under 60 seconds.",
    heroMetric: "< 60s",
    heroMetricLabel: "19-Vector Automated Triage",
    imageSrc: "/images/pi-diagnostic.webp",
    placeholderLabel: "pi-diagnostic.webp",
    placeholderRatio: "16:10 Diagnostic Dashboard (1920×1200)",
    timeframe: "Production Workbench Platform",
    role: "Support Engineer",
    organization: "Cytron Technologies",
    background: {
      problemStatement:
        "Hardware bench technicians previously ran isolated terminal scripts (vcgencmd, i2cdetect, iperf, fdisk) to diagnose returned or faulty boards, taking 15–20 minutes per unit with recurring risks of electrical dead-shorts.",
      context:
        "The release of Raspberry Pi 5 introduced the custom RP1 southbridge, breaking legacy GPIO libraries (RPi.GPIO, early gpiozero) on Linux Kernel 6.6+ (Bookworm). As an official Raspberry Pi Design Partner, Cytron needed an industrial workbench executing 19 automated diagnostic vectors in under 60 seconds with standardized, tamper-evident audit records.",
      challenges: [
        "15–20 minute manual inspection bottleneck per single-board computer across compute, storage, and I/O",
        "RP1 southbridge architecture fragmentation breaking legacy GPIO drivers on Debian Bookworm (Kernel 6.6+)",
        "Electrical safety risks: standard output-drive GPIO tests risked causing dead-shorts on damaged boards or shorted rails",
        "Lack of standardized, tamper-evident warranty test reports with clear pass/fail parametric thresholds",
      ],
    },
    architecture: {
      summary:
        "A high-performance three-tier embedded validation platform connecting a lightweight Vanilla JS SPA presentation engine, a concurrency-mutexed Flask backend with in-memory TTL caching, and low-level kernel drivers interfacing directly with the RP1 southbridge.",
      components: [
        {
          title: "Presentation Layer (Vanilla JS SPA Engine)",
          description:
            "Zero-dependency single-page architecture with GPU layer compositing (translateZ) delivering 60fps telemetry dials and an automated test report print engine under a 45MB RAM footprint.",
        },
        {
          title: "Core Workbench (Flask & Mutex Engine)",
          description:
            "Thread-safe diagnostic daemon with hardware concurrency locks, SQLite B-Tree indexing, and 15-second in-memory TTL query caching to eliminate MicroSD flash memory wear.",
        },
        {
          title: "Multi-Generation Hardware Prober (RP1 lgpio)",
          description:
            "Dynamic kernel chip auto-discovery (/dev/gpiochip4, 0, 1) for the RP1 southbridge via lgpio, with automatic fallback to gpiozero and RPi.GPIO on legacy Pi 4/3/Zero models.",
        },
        {
          title: "Parametric Diagnostic Sweep Engine",
          description:
            "Executes 19 automated vectors categorized into Compute/Thermals, PMIC ADC Rail Telemetry (4.75V–5.25V), Storage Direct I/O, and Peripheral RF (USB 3.0, Gigabit, MIPI, ALSA).",
        },
      ],
    },
    keyFeatures: [
      {
        title: "19-Vector Automated Diagnostic Engine",
        description: "Executes automated multi-subsystem sweeps across compute cores, PMIC rails, storage, and transceivers in under 60 seconds.",
        badge: "Core Engine",
      },
      {
        title: "Forensic Non-Destructive High-Z Probing",
        description: "Claims user GPIO lines as passive inputs with zero voltage injection (SET_PULL_NONE), eliminating dead-short risks on damaged boards.",
        badge: "Electrical Safety",
      },
      {
        title: "Multi-Generation RP1 Southbridge Abstraction",
        description: "Dynamic kernel auto-discovery interfacing with Pi 5 RP1 southbridge via lgpio with seamless fallback for legacy boards.",
        badge: "Kernel Drivers",
      },
      {
        title: "Tamper-Evident Test Verification Reports",
        description: "Generates structured 2-page hardware test reports with UUT serial tracking, technician signatures, and SHA-256 audit digests.",
        badge: "Hardware QA",
      },
      {
        title: "MicroSD Churn & Flash Endurance Protection",
        description: "B-Tree database indexing with in-memory 15s TTL caching eliminates continuous flash write wear on bench test fixtures.",
        badge: "Reliability",
      },
      {
        title: "Hardware GPU Layer Compositing",
        description: "GPU-accelerated CSS rendering offloaded to VideoCore / Mesa V3D ensures silky 60fps animations over remote VNC connections.",
        badge: "Performance",
      },
    ],
    techStack: [
      { category: "Languages & Core", items: ["Python 3", "JavaScript (ES6+)", "Modern CSS3", "HTML5", "Bash"] },
      { category: "Frameworks & Drivers", items: ["Flask", "lgpio (RP1)", "gpiozero", "RPi.GPIO", "psutil", "pyudev", "SQLite3"] },
      { category: "Hardware & Protocols", items: ["Raspberry Pi 5 (RP1)", "Pi 4/3/Zero", "I2C", "SPI", "UART", "PCIe", "MIPI D-PHY", "USB 3.0", "Gigabit PHY", "Bluetooth 5.0"] },
      { category: "Embedded Linux & QA", items: ["Raspberry Pi OS (Bookworm)", "Linux Kernel 6.6+", "Systemd", "vcgencmd", "Parametric Sweeps", "SHA-256 Audit Hashing"] },
    ],
    results: [
      {
        metric: "95%",
        label: "Triage Time Reduction",
        description: "Cut hardware bench inspection time from ~20 minutes down to under 60 seconds per unit.",
      },
      {
        metric: "100%",
        label: "Electrical Safety",
        description: "Zero component burnout achieved across thousands of production test cycles via passive High-Z probing.",
      },
      {
        metric: "< 45MB",
        label: "RAM Footprint",
        description: "Ultra-low memory utilization on embedded ARM targets via zero-dependency custom SPA engine.",
      },
    ],
    screens: [
      {
        id: "triage-console",
        title: "Automated Triage Sweeps",
        description: "Real-time diagnostic terminal executing comprehensive compute stress, thermal tracking, PMIC rail integrity, and GPIO loopback sweeps in under 60 seconds.",
        imageSrc: "/images/pi-diagnostic.webp",
      },
      {
        id: "silicon-telemetry",
        title: "Thermal & PMIC Telemetry",
        description: "Live silicon temperature tracking, CPU clock frequency throttling detection, and voltage rail stability validation across Raspberry Pi 5 and 4 boards.",
        imageSrc: "/images/pi-diagnostic.webp",
      },
      {
        id: "tamper-evident-cert",
        title: "SHA-256 Validation Certificate",
        description: "Automated generation of tamper-evident inspection certificates with cryptographic checksums, hardware serial verification, and printable customer reports.",
        imageSrc: "/images/pi-diagnostic.webp",
      },
    ],
  },
  "iot-fertiliser-mixing": {
    id: "iot-fertiliser-mixing",
    title: "IoT-Based Fertiliser Mixing for Precision Farming",
    eyebrow: "International Journal of Integrated Engineering (IJIE) · Published Research",
    tagline: "ESP32 firmware for automated hydroponic fertiliser dispensing, 30-point median-filtered TDS sensing, and real-time Blynk cloud telemetry.",
    heroMetric: "IJIE 2026",
    heroMetricLabel: "Peer-Reviewed Publication (Vol. 18 No. 1)",
    imageSrc: "/images/project-fertiliser-mixing.webp",
    placeholderLabel: "Replace: project-fertiliser-mixing.webp",
    placeholderRatio: "16:10 Hardware & IoT Dashboard (1920×1200)",
    timeframe: "Published Vol. 18(1), pp. 186–201, 2026",
    role: "First Author & Firmware Engineer",
    organization: "Universiti Tun Hussein Onn Malaysia (UTHM)",
    publicationUrl: "https://penerbit.uthm.edu.my/ojs/index.php/ijie/article/view/24386",
    githubUrl: "https://github.com/sritulasiram/iot-fertiliser-mixing-esp32",
    background: {
      problemStatement:
        "Precision hydroponic farming requires strict control over nutrient concentration and pH balance. Manual chemical mixing is prone to human error, labor-intensive, and causes irregular crop growth.",
      context:
        "Published in the International Journal of Integrated Engineering (IJIE), this research evaluated a production-grade ESP32 firmware prototype developed to automate nutrient formulation, dual-pump liquid dispensing, and real-time telemetry monitoring via the Blynk IoT cloud platform.",
      challenges: [
        "Eliminating WiFi radio interference on ADC readings by isolating all analog sensors to ADC1 (GPIO 32–39)",
        "Designing a non-blocking state machine architecture to prevent Watchdog Timer (WDT) resets while dispensing",
        "Filtering raw ADC electrical noise from TDS submersible electrodes using a 30-point running median buffer",
        "Synchronizing interrupt-driven flow feedback (ISRs) across dual independent pump-solenoid circuits",
      ],
    },
    architecture: {
      summary:
        "Built with C++ on the Arduino ESP32 framework featuring a non-blocking state machine, dedicated ADC1 silicon sensor isolation, atomic interrupt-driven flow metering, and bidirectional Blynk IoT cloud synchronization.",
      components: [
        {
          title: "30-Point Median-Filtered TDS Pipeline",
          description:
            "Submersible TDS electrode sampling on ADC1 (VP / GPIO 36) with circular buffer median filtering to eliminate electrical noise and maintain 99.6% measurement precision.",
        },
        {
          title: "Non-Blocking Dispense State Machine",
          description:
            "WDT-safe state engine executing asynchronous pump-solenoid ticks, preserving WiFi heartbeat and preventing connection drops during liquid delivery.",
        },
        {
          title: "Atomic ISR Flow Metering & Dual Actuation",
          description:
            "Hardware interrupt routines on GPIO 18/19 capturing pulse counts with atomic reads, shutting off individual pumps dynamically when target milliliters are reached.",
        },
        {
          title: "Blynk Virtual Pin Telemetry Bridge",
          description:
            "Bidirectional cloud bridge mapping volume inputs (V1), dispensed metrics (V2), real-time TDS ppm (V3), and color-coded water level LEDs (V4/V5).",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Dual-Pump & Solenoid Dispensing",
        description:
          "Two independent pump-solenoid circuits (GPIO 16/17 & 22/23) with closed-loop flow feedback.",
        badge: "Actuation",
      },
      {
        title: "ADC1 Silicon Noise Isolation",
        description:
          "Exclusively maps analog sensors to ADC1 (GPIO 32–39), avoiding ADC2 silicon corruption from the ESP32 WiFi radio.",
        badge: "Hardware Architecture",
      },
      {
        title: "30-Point Median Filtered TDS",
        description:
          "Real-time ppm readings with running circular buffer median filter and calibrated temperature tuning.",
        badge: "Precision Sensing",
      },
      {
        title: "Virtual Pin Telemetry (V1–V5)",
        description:
          "Live numeric inputs, value displays, and color-coded status LEDs streamed over WiFi to the Blynk mobile app.",
        badge: "Cloud IoT",
      },
      {
        title: "Dual Water Level Sensing",
        description:
          "Color-coded Low (≤700), Medium (≤1200), and High reservoir telemetry on GPIO 34 and 35.",
        badge: "Telemetry",
      },
      {
        title: "Peer-Reviewed IJIE Journal Publication",
        description:
          "Published in the International Journal of Integrated Engineering (IJIE), Vol. 18(1), pp. 186–201, 2026.",
        badge: "Academic Research",
      },
    ],
    techStack: [
      { category: "Embedded Firmware & Core", items: ["ESP32 SoC", "C / C++ (Arduino Framework)", "Non-Blocking State Machine", "Hardware Interrupts (ISRs)", "Watchdog Timer (WDT)"] },
      { category: "Sensors & Actuators", items: ["Analog TDS Sensor (ADC1)", "Pulse Flow Sensors (YF-S201)", "Dual 12V Peristaltic Pumps", "12V Solenoid Valves", "Dual Water Level Sensors"] },
      { category: "IoT Cloud & Communication", items: ["Blynk IoT Platform", "Virtual Pin Protocols", "WiFi 802.11 b/g/n", "MIT License", "IJIE Journal Peer Review"] },
    ],
    results: [
      {
        metric: "99.6%",
        label: "TDS Precision",
        description: "30-point median filter demonstrated 99.6% measurement accuracy across standard 100–1,000 ppm range.",
      },
      {
        metric: "> 94%",
        label: "Dosing Accuracy",
        description: "Interrupt-driven flow sensor calibration maintained >94% dosage precision across 250–1,000 ml dispenses.",
      },
      {
        metric: "Vol. 18(1)",
        label: "IJIE Journal",
        description: "Published research paper: pp. 186–201, International Journal of Integrated Engineering (2026).",
      },
    ],
  },
  "opencore-efi-hackintosh": {
    id: "opencore-efi-hackintosh",
    title: "OpenCore EFI Hackintosh Build",
    eyebrow: "macOS Firmware Engineering · Low-Level Systems R&D",
    tagline: "Production-grade OpenCore UEFI bootloader configuration, ACPI AML bytecode power-gating, and custom kernel extension harmonization for ASUS ROG Strix gaming hardware on macOS Sonoma, Sequoia, and Tahoe.",
    heroMetric: "17 Working",
    heroMetricLabel: "Hardware Components Confirmed",
    imageSrc: "/images/project-opencore-uefi.png",
    placeholderLabel: "project-opencore-uefi.png",
    placeholderRatio: "16:10 Telemetry & Architecture Dashboard (1920×1200)",
    timeframe: "Open Source Firmware Engineering",
    role: "Firmware & Systems Engineer",
    organization: "Independent Systems R&D",
    githubUrl: "https://github.com/sritulasiram/ASUS-ROG-Strix-GL503GE-Hackintosh",
    githubLabel: "View the repo on GitHub",
    background: {
      problemStatement:
        "Building a reliable, daily-driver Hackintosh on a high-performance gaming laptop has historically been plagued by severe community fragmentation. Critical ACPI patches, kernel quirks, and UEFI configs are dispersed across unvetted forum threads, outdated blog posts, and buried GitHub repositories. Simultaneously, low-level drivers and kexts are maintained in silos without centralized coordination, leading to frequent kernel panics, broken sleep/wake states, non-functioning multi-touch trackpads, and severe idle battery drain and heat from unsupported discrete GPUs on muxless laptops.",
      context:
        "The objective was to synthesize this fragmented landscape into a deterministic, production-grade OpenCore EFI distribution for the ASUS ROG Strix GL503GE laptop (Intel Core i7-8750H, Intel UHD Graphics 630). By decompiling raw DSDTs and writing modular ACPI SSDT tables, the project established verified hardware compatibility, native CPU frequency scaling, dGPU power-gating, and reliable S3 sleep/wake across macOS Sonoma (14.x), Sequoia (15.x), and Tahoe (16.x).",
      challenges: [
        "Power-gating the unsupported discrete NVIDIA GeForce GTX 1050 Ti Mobile via SSDT-Disable_GPU_PEG0.aml to save battery power and prevent heat",
        "Achieving reliable S3 sleep and wake via SSDT-GPRW and fix_sleep_pmset.sh to eliminate wake crashes and instant waking",
        "Configuring native Intel UHD Graphics 630 framebuffer patching and backlight PWM control across macOS Sonoma, Sequoia, and Tahoe",
        "Resolving I2C HID multi-touch controller pin interrupts via SSDT-GPI0 patching for smooth native Apple trackpad gestures",
        "Restoring full physical F1–F12 keyboard function keys via setup_function_keys.sh automation",
        "Maintaining compliant 15-port XHCI USB mapping to ensure instant wake without rogue controller reset loops",
      ],
    },
    architecture: {
      summary:
        "A deterministic UEFI bootloader architecture utilizing OpenCore 1.0.7, custom-compiled ACPI AML SSDT tables, MacBookPro16,4 SMBIOS profiling, and targeted kernel extension injection tested against BIOS version 319.",
      components: [
        {
          title: "UEFI Boot Stage & NVRAM Runtime",
          description:
            "OpenCore 1.0.7 boot environment configuring memory map quirks, UEFI runtime drivers, deliberate Secure Boot disablement per BIOS guide, and native 300-series NVRAM persistence (SSDT-PMC).",
        },
        {
          title: "ACPI Bytecode & dGPU Power-Gating",
          description:
            "Custom SSDT-Disable_GPU_PEG0.aml bytecode executing _OFF routing on _SB.PCI0.PEG0.PEGP to electrically power down the discrete NVIDIA GeForce GTX 1050 Ti Mobile, preventing heat and extending battery life.",
        },
        {
          title: "Dynamic CPU Power Management (SSDT-PLUG)",
          description:
            "Injects plugin-type 1 into CPU0 to activate native macOS X86PlatformPlugin frequency scaling, allowing all 6 cores and 12 threads of the i7-8750H to step dynamically.",
        },
        {
          title: "S3 Sleep/Wake & PMSET Stabilization",
          description:
            "Combines SSDT-GPRW to resolve instant-wake USB triggers with the fix_sleep_pmset.sh script to enforce clean S3 sleep, lid-close detection, and instant resume.",
        },
        {
          title: "GPIO Pinning & I2C HID Trackpad",
          description:
            "SSDT-GPI0 enables native VoodooI2C GPIO pin interrupt routing, delivering full native Apple 1-to-4 finger multi-touch gestures, smooth scrolling, and palm rejection.",
        },
        {
          title: "Keyboard Hotkeys & Function Keys",
          description:
            "Restores physical F1–F12 legends and media hotkeys via setup_function_keys.sh, while delegating 4-zone Aura RGB lighting control to the native companion ROG Gaming Center macOS application.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "NVIDIA dGPU Power-Gating",
        description:
          "Disables the unsupported discrete NVIDIA GeForce GTX 1050 Ti Mobile via SSDT-Disable_GPU_PEG0.aml to save battery power and prevent chassis heat buildup.",
        badge: "ACPI Firmware",
      },
      {
        title: "Native Apple Trackpad Gestures",
        description:
          "VoodooI2C and VoodooI2CHID integration with custom GPIO pin routing delivers full native 1-to-4 finger Apple multi-touch gesture support.",
        badge: "I2C Bus HID",
      },
      {
        title: "Reliable S3 Sleep & Wake",
        description:
          "Full sleep, lid-close, and wake functionality configured via SSDT-GPRW and fix_sleep_pmset.sh to eliminate sleep wake-loop issues.",
        badge: "Power & Sleep",
      },
      {
        title: "macOS Sonoma, Sequoia & Tahoe Support",
        description:
          "Thoroughly tested and verified across three major macOS generations (14.x Sonoma, 15.x Sequoia, and 16.x Tahoe) on BIOS version 319.",
        badge: "OS Compatibility",
      },
      {
        title: "Keyboard Function Keys Automation",
        description:
          "F1–F12 function key mappings configured via setup_function_keys.sh, with chassis RGB lighting integrated through companion macOS software.",
        badge: "Input System",
      },
    ],
    techStack: [
      {
        category: "Bootloader & Firmware",
        items: [
          "OpenCore 1.0.7",
          "UEFI 2.7+",
          "SMBIOS (MacBookPro16,4)",
          "NVRAM (SSDT-PMC)",
          "Secure Boot (Disabled)",
          "BIOS Tested (v319)",
        ],
      },
      {
        category: "ACPI Patches (SSDTs)",
        items: [
          "SSDT-Disable_GPU_PEG0",
          "SSDT-GPRW",
          "SSDT-PLUG",
          "SSDT-GPI0",
          "SSDT-PNLF",
          "SSDT-EC",
          "SSDT-USBX",
          "SSDT-ALSD",
        ],
      },
      {
        category: "Kernel Extensions (Kexts)",
        items: [
          "Lilu",
          "VirtualSMC",
          "AsusSMC",
          "WhateverGreen (-igfxblt)",
          "AppleALC (layout-id: 14)",
          "VoodooI2C / VoodooI2CHID",
          "AirportItlwm",
          "RealtekRTL8111",
          "NVMeFix",
          "Sinetek-rtsx (Testing)",
        ],
      },
      {
        category: "Target Hardware & Status",
        items: [
          "ASUS ROG Strix GL503GE",
          "Intel Core i7-8750H (6C/12T)",
          "Intel UHD Graphics 630 (Working)",
          "GTX 1050 Ti Mobile (Disabled)",
          "Realtek ALC295 (Working)",
          "Realtek RTS5229 (Testing)",
          "16GB DDR4 2666MHz",
        ],
      },
    ],
    results: [
      {
        metric: "17",
        label: "Hardware Components Working",
        description:
          "CPU, iGPU, RAM, storage, audio, ethernet, Wi-Fi, Bluetooth, trackpad, keyboard, webcam, battery, display, HDMI, and sleep/wake all confirmed functional.",
      },
      {
        metric: "3",
        label: "macOS Versions Supported",
        description: "Tested and working on macOS Sonoma, Sequoia, and Tahoe.",
      },
      {
        metric: "S3",
        label: "Sleep & Wake",
        description:
          "Full sleep, lid-close, and wake functionality — a common Hackintosh pain point, working reliably here.",
      },
    ],
    screens: [
      {
        id: "screen-opencore-firmware",
        title: "UEFI Telemetry & Power Gating",
        description:
          "OpenCore 1.0.7 environment managing ACPI table overrides, dGPU power-gating, and compliant 15-port XHCI USB topology.",
        imageSrc: "/images/project-opencore-uefi.png",
        badge: "OpenCore EFI",
      },
    ],
  },
  "rog-gaming-center": {
    id: "rog-gaming-center",
    title: "ROG Gaming Center macOS App",
    eyebrow: "Native macOS Systems Architecture · Swift & SwiftUI",
    tagline: "Zero-runtime native macOS hardware control suite interfacing directly with IOKit USB HID microcontrollers, AppleSMC kernel telemetry registers, and CoreGraphics display transfer tables.",
    heroMetric: "v1.0-beta",
    heroMetricLabel: "Zero Third-Party Runtimes",
    imageSrc: "/images/rog-gaming-center-preview.png",
    placeholderLabel: "rog-gaming-center-preview.png",
    placeholderRatio: "16:10 Native SwiftUI Dashboard (1920×1200)",
    timeframe: "Open Source Systems Software",
    role: "Lead Systems & macOS Developer",
    organization: "Independent Systems R&D",
    githubUrl: "https://github.com/sritulasiram/rog-gaming-center-hackintosh",
    githubLabel: "View the repo on GitHub",
    background: {
      problemStatement:
        "On high-performance gaming laptops converted to macOS, all proprietary hardware management—such as 4-zone Aura RGB keyboard lighting, blower fan curve profiles, GameVisual display color calibration, and battery charging thresholds—remains locked inside Windows-only vendor utilities. Existing community workarounds often rely on bloated Electron wrappers or insecure root daemons that waste battery and add background latency. Without a native macOS driver, users have zero hardware control over their chassis lights, thermals, and battery health.",
      context:
        "To solve this without sacrificing macOS efficiency, ROG Gaming Center was engineered as a pure Swift 5.9 and SwiftUI desktop application. It communicates directly with onboard ROG/TUF USB HID microcontrollers (VID 0x0B05) via user-space IOKit, reads silicon die temperatures straight from AppleSMC kernel registers (TC0P), dynamically adjusts display gamma LUT curves via CoreGraphics, and intercepts physical chassis hotkeys via macOS EventTap—all with zero external runtimes and no root daemons.",
      challenges: [
        "Reverse-engineering undocumented 17-byte USB HID feature report protocols across multiple ROG and TUF keyboard controller product IDs",
        "Preventing USB microcontroller communication lockups through serialized FIFO queues with 10ms latching delays",
        "Querying AppleSMC kernel registers directly for real-time CPU die temperature (TC0P) and fan RPM without root privileges",
        "Directly manipulating CoreGraphics gamma lookup tables (CGSetDisplayTransferByTable) with failsafe auto-restoration upon quit or sleep",
        "Intercepting physical Fn key combinations and the dedicated ROG launcher key via macOS EventTap and IOHIDManager with 250ms debouncing",
        "Eliminating background daemon footprint by running entirely in user space without requiring root privileges, kext modifications, or custom sleep/wake daemons",
      ],
    },
    architecture: {
      summary:
        "A pure Swift systems architecture built with SwiftUI, IOKit HID Manager, AppleSMC C bridge, CoreGraphics display APIs, and an active CGEventTap input listener.",
      components: [
        {
          title: "Native Swift UI & Reactive State Engine",
          description:
            "A three-column Apple HIG responsive dashboard built with SwiftUI, featuring live hardware gauges, real-time Mach host CPU sparklines, and unified hardware profile management.",
        },
        {
          title: "Direct User-Space IOKit HID Driver",
          description:
            "Interfaces with onboard ASUS ROG/TUF USB microcontrollers (VID 0x0B05), transmitting 17-byte feature reports over a serialized GCD queue with 10ms delays and automatic sleep-wake reconnection.",
        },
        {
          title: "Kernel Telemetry & AppleSMC Subsystem",
          description:
            "Reads live silicon die temperatures directly from AppleSMC register TC0P, reads dual fan RPM, and communicates with AsusSMC sysctl to enforce 60%, 80%, or 100% battery charge thresholds.",
        },
        {
          title: "CoreGraphics GameVisual Calibration Engine",
          description:
            "Directly calculates and uploads 256-sample red/green/blue gamma curves via CGSetDisplayTransferByTable for 6 distinct visual modes (Vivid, Cinema, Eye Care, FPS, RTS/RPG, Default).",
        },
        {
          title: "Global EventTap & ROG Key Interceptor",
          description:
            "Captures physical keyboard Fn events and intercepts raw USB HID input reports (UsagePage 0xFF31, Usage 0x0038) to trigger the application from the physical ROG chassis key.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Pure Swift & SwiftUI Architecture",
        description:
          "Written entirely in Swift and SwiftUI with zero external runtimes (no Python, Node.js, Electron, libusb, or bridging headers), running natively in user space.",
        badge: "Swift 5.9",
      },
      {
        title: "Direct IOKit Aura RGB Control",
        description:
          "Controls 4 distinct keyboard lighting zones with static, breathing, strobing, and color cycle modes using serialized 17-byte USB feature reports.",
        badge: "IOKit HID",
      },
      {
        title: "AppleSMC Silicon Thermal Telemetry",
        description:
          "Direct AppleSMC TC0P silicon die temperature readouts, thermal headroom calculation, dual fan RPM, and AsusSMC battery threshold sysctl (60%/80%/100%).",
        badge: "Kernel Telemetry",
      },
      {
        title: "ROG GameVisual Display Calibration",
        description:
          "Applies calibrated gamma curves directly to active display transfer tables via CGSetDisplayTransferByTable, with automatic restoration upon quit or sleep.",
        badge: "CoreGraphics",
      },
      {
        title: "Hardware Fn & Dedicated ROG Key Launcher",
        description:
          "Captures physical keyboard Fn legends via macOS EventTap and intercepts raw USB HID reports from the dedicated ROG key with 250ms debouncing.",
        badge: "HID & Hotkeys",
      },
      {
        title: "Standalone rogauracore CLI Tool",
        description:
          "Bundles a standalone command-line executable for programmatic RGB lighting control in bash/zsh shell scripts and workflow automations.",
        badge: "CLI Utility",
      },
    ],
    techStack: [
      {
        category: "macOS Systems Programming",
        items: [
          "Swift 5.9+",
          "SwiftUI",
          "IOKit HID Manager",
          "AppleSMC Kernel C-Bridge",
          "CoreGraphics Display LUT",
          "macOS EventTap API",
          "Mach Host Statistics",
        ],
      },
      {
        category: "Hardware Controllers",
        items: [
          "IOKit HID (VID: 0x0B05 · Multiple ROG/TUF PIDs)",
          "AppleSMC (TC0P Silicon Die)",
          "AsusSMC Sysctl Driver",
          "Built-in 120Hz IPS Display",
        ],
      },
      {
        category: "Tooling & Architecture",
        items: ["Xcode 15", "SPM (Swift Package Manager)", "rogauracore CLI", "Apple HIG Visual Tokens"],
      },
    ],
    results: [
      {
        metric: "4",
        label: "Hardware Features Controlled",
        description:
          "RGB keyboard lighting, live thermal/battery telemetry, GameVisual display calibration, and physical Fn hotkeys — all from one native app.",
      },
      {
        metric: "Beta",
        label: "Active Development",
        description:
          "v1.0.0-beta, actively refined across ROG/TUF models and Hackintosh configurations.",
      },
      {
        metric: "0",
        label: "Third-Party Runtimes",
        description:
          "Written entirely in Swift and SwiftUI — no Python, Node.js, Electron, or bridging headers.",
      },
    ],
    screens: [
      {
        id: "screen-rog-center-dash",
        title: "Native Systems Stage",
        description:
          "Pure Swift 3-column dashboard reading live AppleSMC TC0P silicon thermals (64°C, 36% headroom), dual fan speed (2,448 RPM), 97% battery health, and 12.4W live power draw.",
        imageSrc: "/images/rog-gaming-center-preview.png",
        badge: "SwiftUI App",
      },
    ],
  },
};

// Backward-compatible aliases
PROJECT_DETAILS["cytron-rma"] = PROJECT_DETAILS["warranty-rma"];
PROJECT_DETAILS["opencore-efi-gl503ge"] = PROJECT_DETAILS["opencore-efi-hackintosh"];
PROJECT_DETAILS["asus-rog-hackintosh"] = PROJECT_DETAILS["opencore-efi-hackintosh"];
PROJECT_DETAILS["hackintosh-gl503ge"] = PROJECT_DETAILS["opencore-efi-hackintosh"];

