# Sri Tulasi Ram — Engineering & Design Portfolio

> Personal portfolio and interactive case studies showcasing embedded engineering platforms, internal automation systems, published IoT research, UI/UX design architectures, and optical photography.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

* **Live Domain**: [sritulasiram.my](https://sritulasiram.my)
* **GitHub Repository**: [github.com/sritulasiram/sritulasiram.github.io](https://github.com/sritulasiram/sritulasiram.github.io)
* **Location**: Penang, Malaysia
* **Role**: Support Engineer at [Cytron Technologies](https://www.cytron.io) (Official Raspberry Pi Approved Design Partner)

---

## 🌟 Overview & Key Highlights

This repository contains the source code for **Sri Tulasi Ram's personal engineering and design portfolio**, built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. 

Designed with Apple Human Interface Guidelines (HIG) aesthetic precision, the site features:
* **Tactile Interactions & Fluid Layouts**: Fluid responsive physics, VisionOS/macOS-inspired translucent frosted materials, and subtle micro-interactions.
* **Apple Spotlight Search (⌘K / `/`)**: Global instant search indexing projects, design prototypes, technical articles, and direct navigation targets with fuzzy text highlighting and keyboard navigation.
* **Dual Color Themes**: Native system theme detection, light/dark mode persistence via CSS variables, and zero flash of unstyled content (FOUC).
* **Automated EXIF Extraction Pipeline**: Custom Node.js optical extractor reading camera model, focal length, aperture, shutter speed, ISO, and timestamp directly from high-resolution photographs into static JSON.
* **Accessible & Standard-Compliant**: WAI-ARIA 1.2 Combobox patterns, full keyboard navigability, 44×44 pt touch targets, and WCAG AA contrast.

---

## 🛠️ Featured Engineering Projects

| Project | Focus Area | Technology Stack | Impact & Outcome |
| :--- | :--- | :--- | :--- |
| **[Cytron Warranty & RMA Management System](https://sritulasiram.my/projects/warranty-rma)** | Internal Support Operations & ERP Triage | Next.js, TypeScript, PostgreSQL, Node.js API | **40% reduction** in customer turnaround time; automated serial lifecycle tracking and diagnostics checklists. |
| **[Cytron Raspberry Pi Diagnostic Suite](https://sritulasiram.my/projects/raspberry-pi-diagnostics)** | Automated Hardware QA & Board Triage | Python (Flask), RP1 `lgpio`, SQLite3, Vanilla JS SPA, Linux Kernel 6.6+ | **19 automated diagnostic vectors** executed in <60s (**95% triage reduction**); ISO/IEC 17025 SHA-256 cryptographic audit certificates. |
| **[IoT-Based Fertiliser Mixing for Precision Farming](https://sritulasiram.my/projects/iot-fertiliser-mixing)** | Precision Agriculture & Industrial IoT | ESP32, Embedded C++, Blynk Cloud, Analog TDS & Flow Sensors | **99.6% TDS sensor accuracy**; peer-reviewed research published in the *International Journal of Integrated Engineering (IJIE · UTHM)*. |
| **[OpenCore EFI Hackintosh Architecture](https://sritulasiram.my/projects/opencore-efi-hackintosh)** | UEFI Firmware & ACPI Patching | OpenCore, ACPI (SSDTs), AppleALC, WhateverGreen, Lilu | Native macOS Sonoma/Sequoia stability, fully mapped USB topology, and hardware NVRAM sleep/wake support on PC hardware. |
| **[ROG Gaming Center macOS App](https://sritulasiram.my/projects/rog-gaming-center)** | Desktop System Utilities | Swift, AppKit, IOKit, smc-wrapper | Real-time CPU/GPU thermal telemetry, dynamic fan profile curves, and native menu bar ergonomics for ASUS ROG laptops on macOS. |

---

## 🎨 Featured UI/UX Design Case Studies

| Case Study | Domain | Platform | Description |
| :--- | :--- | :--- | :--- |
| **[Sage](https://sritulasiram.my/designs/sage)** | Mental Wellness & Teletherapy | iOS / Figma | Trauma-informed digital health companion with botanical mood tracking, grounding exercises, and immediate emergency crisis routing. |
| **[Recycle AI](https://sritulasiram.my/designs/recycle-ai)** | Circular Economy & Computer Vision | Mobile / Figma | Waste sorting platform leveraging computer vision classification, localized recycling streams, and circular marketplace incentives. |
| **[KopieSatu](https://sritulasiram.my/designs/kopiesatu)** | Quick-Service Mobile Commerce | iOS / Figma | Tactical mobile coffee ordering and loyalty app with category horizontal rails, dual-column product cards, and frictionless checkout. |
| **[Perak Medical Centre](https://sritulasiram.my/designs/pmc-clinic)** | Healthcare Intake & Specialist Directory | Responsive Web / Figma | Accessible patient intake portal with multi-language triage routing, doctor availability scheduling, and clinical department navigation. |
| **[Void](https://sritulasiram.my/designs/void)** | Polytechnic Project Management | Mobile App / Figma | Academic collaboration platform featuring milestone tracking, team submission workflows, and faculty review dashboards. |

---

## 📷 Photography & Optics Pipeline

The photography section showcases curated visual work spanning landscape horizons, urban nightscapes, architecture, and avian wildlife.

Photos are dynamically indexed with metadata extracted directly from EXIF tags using [`scripts/read-photo-metadata.mjs`](scripts/read-photo-metadata.mjs):
```bash
npm run sync:photos
```
Extracted telemetry includes:
- Camera Body (e.g., iPhone 16 Pro, Samsung Galaxy Note20 Ultra, Samsung Galaxy Note Edge)
- Focal Length & 35mm Equivalent (e.g., 24mm, 120mm 5× optical telephoto)
- Exposure Parameters: Aperture ($f$/1.78, $f$/2.8), Shutter Speed (1/2400s, 1/4s), ISO Sensitivity
- Capture Timestamps & Optical Dimensions

---

## 📂 Architecture & Directory Structure

```
├── public/
│   ├── _headers                    # Security & caching headers
│   ├── favicon.ico
│   └── images/                     # Optimized WebP assets, screenshots & photography
│       ├── apps/                   # Tool & technology vector icons
│       ├── projects/               # Engineering diagrams & hardware schematics
│       └── ...
├── scripts/
│   └── read-photo-metadata.mjs     # Node.js optical EXIF metadata extraction script
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (Metadata, Google Fonts, Theme Provider)
│   │   ├── page.tsx                # Homepage (Hero, Selected Work, Designs Teaser, About, Photography)
│   │   ├── globals.css             # Tailwind CSS v4 design tokens, Apple typography
│   │   ├── template.tsx            # Smooth page transition wrappers
│   │   ├── robots.ts               # Automated search engine robots.txt
│   │   ├── sitemap.ts              # Dynamic XML sitemap generator
│   │   ├── about/page.tsx          # Full About, career timeline & engineering credentials
│   │   ├── designs/                # UI/UX Showcase & Deep Dives
│   │   │   ├── page.tsx            # Design showcase hero & systems overview
│   │   │   └── [id]/page.tsx       # Dynamic design case study page
│   │   ├── photography/page.tsx    # Curated photography gallery with EXIF inspector
│   │   └── projects/               # Engineering Projects Hub
│   │       ├── page.tsx            # Project directory & specifications matrix
│   │       └── [id]/page.tsx       # Engineering case study deep dives
│   ├── components/                 # Reusable UI component modules
│   │   ├── Navigation.tsx          # Frosted glass navbar with Spotlight search & mega dropdowns
│   │   ├── SearchModal.tsx         # Spotlight modal search (⌘K / keyboard navigation)
│   │   ├── ThemeToggle.tsx         # Animated light/dark theme switch
│   │   ├── Hero.tsx                # Typographic hero section with call-to-actions
│   │   ├── SelectedWork.tsx        # Engineering showcase cards
│   │   ├── DesignsTeaser.tsx       # Interactive mobile mockup carousel
│   │   ├── AboutTeaser.tsx         # Hardware engineering pillars & support ops
│   │   ├── PhotographyStrip.tsx    # Horizontal photo preview reel
│   │   ├── Footer.tsx              # Colophon, direct links, and contact CTA
│   │   ├── case-studies/           # Modular project case study layouts
│   │   └── mockups/                # Device frames (iPhone 16 Pro, MacBook Pro)
│   ├── data/                       # Content models & structured data
│   │   ├── content.ts              # Global copy, biography, and credentials
│   │   ├── projectDetails.ts       # Detailed engineering project writeups
│   │   ├── designDetails.ts        # UI/UX design case study data
│   │   ├── searchData.ts           # Centralized Spotlight search index & quick links
│   │   └── photo-metadata.json     # Auto-generated EXIF photography dataset
│   ├── lib/
│   │   └── cn.ts                   # Tailwind class merge utility
│   └── types/
│       └── index.ts                # TypeScript interfaces and type definitions
├── eslint.config.mjs               # ESLint 9 configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Project dependencies & build scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── vercel.json                     # Vercel deployment & security headers
```

---

## ⚡ Development & Scripts

### Prerequisites
* **Node.js**: v20+ (recommended v24 LTS)
* **npm**: v10+

### Setup & Run
```bash
# 1. Clone repository & switch to dev branch
git clone https://github.com/sritulasiram/sritulasiram.github.io.git
cd sritulasiram.github.io
git checkout dev

# 2. Install dependencies
npm install

# 3. (Optional) Re-extract EXIF data from photos in public/images
npm run sync:photos

# 4. Start local development server
npm run dev

# 5. Typecheck & lint
npx tsc --noEmit
npm run lint

# 6. Build production bundle
npm run build
```

---

## 📄 License & Attribution

Designed and developed by **[Sri Tulasi Ram](https://sritulasiram.my)**.  
Open-sourced under the [MIT License](LICENSE).
