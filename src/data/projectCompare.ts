/** Facts shown in the Compare tab. Keep each one traceable to the project's code or docs. */
export interface CompareColumn {
  id: string;
  name: string;
}

export interface CompareRow {
  label: string;
  values: Record<string, string>;
}

export const COMPARE_COLUMNS: CompareColumn[] = [
  { id: "cytron-hr-assistive-intelligence", name: "HR Assistive Intelligence" },
  { id: "warranty-rma", name: "Warranty & RMA" },
  { id: "raspberry-pi-diagnostics", name: "Pi Diagnostic Suite" },
];

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: "What it does",
    values: {
      "cytron-hr-assistive-intelligence": "Answers employee HR questions from official documents, with a citation on every statement",
      "warranty-rma": "Runs repairs, supplier RMA and warranty replacements from intake to credit",
      "raspberry-pi-diagnostics": "Tests returned Raspberry Pi boards and issues a signed RMA certificate",
    },
  },
  {
    label: "Used by",
    values: {
      "cytron-hr-assistive-intelligence": "Cytron employees and HR",
      "warranty-rma": "Support engineers, bench technicians and managers",
      "raspberry-pi-diagnostics": "Warranty and RMA bench technicians",
    },
  },
  {
    label: "Status",
    values: {
      "cytron-hr-assistive-intelligence": "Internal pilot",
      "warranty-rma": "In production, v2.52.1",
      "raspberry-pi-diagnostics": "Production workbench",
    },
  },
  {
    label: "Backend",
    values: {
      "cytron-hr-assistive-intelligence": "Python, FastAPI",
      "warranty-rma": "Python, Flask (8 blueprints)",
      "raspberry-pi-diagnostics": "Python, Flask",
    },
  },
  {
    label: "Interface",
    values: {
      "cytron-hr-assistive-intelligence": "React 18, Vite, Tailwind CSS",
      "warranty-rma": "Server-rendered Flask templates",
      "raspberry-pi-diagnostics": "Dependency-free vanilla JavaScript",
    },
  },
  {
    label: "Data",
    values: {
      "cytron-hr-assistive-intelligence": "ChromaDB vector index and SQLite",
      "warranty-rma": "SQLite in WAL mode, Google Sheets and Drive sync",
      "raspberry-pi-diagnostics": "SQLite in WAL mode",
    },
  },
  {
    label: "AI",
    values: {
      "cytron-hr-assistive-intelligence": "Gemini or OpenAI, for answers and embeddings",
      "warranty-rma": "Gemini, in a Telegram assistant with 24 read-only tools",
      "raspberry-pi-diagnostics": "None",
    },
  },
  {
    label: "Hardware",
    values: {
      "cytron-hr-assistive-intelligence": "None",
      "warranty-rma": "GP-1324D label printer, barcode scanners, I2C OLED and TFT displays",
      "raspberry-pi-diagnostics": "Runs on the Raspberry Pi board under test",
    },
  },
  {
    label: "Deployment",
    values: {
      "cytron-hr-assistive-intelligence": "One process serving the API and the built interface",
      "warranty-rma": "Raspberry Pi with Gunicorn, systemd and a Cloudflare Tunnel",
      "raspberry-pi-diagnostics": "systemd service with Gunicorn: 1 worker, 8 threads",
    },
  },
  {
    label: "Main output",
    values: {
      "cytron-hr-assistive-intelligence": "A cited answer, or an honest “not found”",
      "warranty-rma": "Thermal labels, RMA manifests and synced records",
      "raspberry-pi-diagnostics": "A two-page certificate with an HMAC-SHA256 seal",
    },
  },
];

/** Compare is only for the three internal tools shown as its columns. */
export const hasCompare = (id: string) => COMPARE_COLUMNS.some((col) => col.id === id);
