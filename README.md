# Sri Tulasi Ram — Engineering & Design Portfolio

> Personal portfolio and engineering case studies showcasing hardware validation systems, internal operations automation, and published IoT research.

**Live Domain**: [sritulasiram.my](https://sritulasiram.my)  
**Location**: Penang, Malaysia  
**Role**: Support Engineer at Cytron Technologies (Official Raspberry Pi Design Partner)

---

## 🌟 Featured Engineering Projects

1. **Cytron Warranty & RMA Management System**
   * *Domain*: Internal Support Operations & Case Management
   * *Stack*: Next.js, TypeScript, Node.js API, PostgreSQL
   * *Outcome*: 40% reduction in customer turnaround time with automated serial lifecycle tracking and diagnostics checklists.

2. **Cytron Raspberry Pi Diagnostic Suite**
   * *Domain*: Embedded Linux, Hardware QA & Automated RMA Triage
   * *Stack*: Python (Flask), RP1 lgpio, SQLite3 (TTL Cache), Vanilla JS SPA, Linux Kernel 6.6+
   * *Outcome*: 19 automated diagnostic vectors executed in under 60 seconds (95% triage reduction) with ISO/IEC 17025 SHA-256 cryptographic audit certificates.

3. **IoT-Based Fertiliser Mixing for Precision Farming**
   * *Domain*: Precision Agriculture & Cloud IoT
   * *Stack*: ESP32, Embedded C++, Blynk Cloud, Analog TDS & Flow Sensors
   * *Outcome*: 99.6% TDS sensor accuracy and published peer-reviewed research in the *International Journal of Integrated Engineering (IJIE · UTHM)*.

---

## 🏗️ Architecture & File Structure

```
├── public/
│   ├── favicon.ico
│   └── images/                     # Optimized WebP assets (projects & portrait)
│       ├── project-rma.webp
│       ├── project-rpi-diag.webp
│       ├── project-fertiliser-mixing.webp
│       └── sri-portrait.webp
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (Metadata, Google Fonts, Analytics)
│   │   ├── page.tsx                # Home page (Hero, Selected Work, About, Photography)
│   │   ├── globals.css             # Apple-inspired CSS design system & typography
│   │   ├── about/page.tsx          # Full About & Accreditation page
│   │   ├── designs/                # UI/UX Design gallery & deep dives
│   │   │   ├── page.tsx            # Design prototypes showcase
│   │   │   ├── [id]/page.tsx       # Dynamic design case study
│   │   │   └── notes/[slug]/       # Design systems & ergonomics articles
│   │   ├── photography/page.tsx    # Curated photography gallery
│   │   └── projects/               # Projects Hub & Dynamic Case Studies
│   │       ├── page.tsx            # Project showcase & specification matrix
│   │       └── [id]/page.tsx       # In-depth editorial case study page
│   ├── components/                 # Modular, reusable UI components
│   │   ├── Hero.tsx                # Hero section with GSAP stagger entrance
│   │   ├── Navigation.tsx          # Frosted glass navigation with VisionOS blur
│   │   ├── SelectedWork.tsx        # Sticky-scroll interactive project showcase
│   │   ├── ProjectImage.tsx        # Responsive image frame with progressive fallback
│   │   ├── TelemetryBentoGrid.tsx  # IoT Fertiliser interactive telemetry grid
│   │   ├── DesignScreensMarquee.tsx # Interactive device screenshot flow marquee
│   │   ├── PhotographyStrip.tsx    # Infinite/responsive photography strip
│   │   ├── AboutTeaser.tsx         # Executive About preview
│   │   └── Footer.tsx              # Seamless contact footer & connect links
│   ├── data/                       # Content & Case Study Data Sources
│   │   ├── index.ts                # Unified barrel export
│   │   ├── content.ts              # Global content (Hero, Nav, Projects, About)
│   │   ├── projectDetails.ts       # Deep-dive engineering case study content
│   │   ├── designDetails.ts        # UI/UX design case study content
│   │   └── designNotes.ts          # Design theory & guidelines notes
│   └── types/                      # Centralized TypeScript interfaces
│       └── index.ts                # Strong typing for projects, case studies, & UI
```

---

## ⚡ Development & Build Scripts

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Typecheck and build production bundle
npm run build

# Start production server
npm start
```
