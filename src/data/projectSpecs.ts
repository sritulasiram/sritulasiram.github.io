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
};

export const SHOWCASE_PROJECT_IDS = Object.keys(PROJECT_SPECS);

export const isShowcaseProject = (id: string) => id in PROJECT_SPECS;
