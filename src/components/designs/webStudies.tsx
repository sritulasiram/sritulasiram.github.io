import { BadgeCheck, Building2, MapPin, Stethoscope } from "lucide-react";
import type { WebStudyConfig } from "./WebCaseStudy";

const PMC_DIR = "/images/designs/pmc-clinic";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";

const PMC: WebStudyConfig = {
  headline: ["Your health", "is their priority."],
  hero: { src: `${PMC_DIR}/page-home.jpg`, alt: "The Perak Medical Centre home page: Your Health Is Our Priority" },
  flowTitle: ["Six pages.", "One clinic group."],
  flowSubtitle: "From the home page to every branch.",
  chapters: [
    {
      gray: "A headline, a sentence,",
      ink: "one action.",
      body: "Careers, Clients, Services and Contact all open the same way: a two-line headline, one supporting sentence and a single button beside a spot illustration. Visitors learn the pattern on the first page and read every other page faster.",
      shot: { src: `${PMC_DIR}/page-careers.jpg`, alt: "The Careers page: Define Your Future With Us", width: 1600, height: 1034 },
    },
    {
      gray: "Six services.",
      ink: "Six equal cards.",
      body: "Primary care, health screening, physiotherapy, wound care, podiatric services and modern equipment each get a card of the same size, so no service looks more important than another and the whole offer fits in one view.",
      shot: { src: `${PMC_DIR}/detail-services.jpg`, alt: "Services page with six equal service cards", width: 1600, height: 833 },
    },
    {
      gray: "Trust,",
      ink: "shown not claimed.",
      body: "Every doctor appears with their qualifications and where they trained, on a lavender band that sets the section apart. The About page also lists the bodies that authorise and certify the clinics.",
      shot: { src: `${PMC_DIR}/detail-doctors.jpg`, alt: "About page: Our Best Doctors with their qualifications", width: 1600, height: 777 },
    },
    {
      gray: "Find the nearest branch,",
      ink: "at a glance.",
      body: "The Contact page shows the main clinic on a map, then a card for each of the six branches with a photo of the frontage, the address and a phone number, so a visitor can recognise the building when they arrive.",
      shot: { src: `${PMC_DIR}/detail-branches.jpg`, alt: "Contact page: six branch cards with photos, addresses and phone numbers", width: 1600, height: 1350 },
    },
    {
      gray: "The same site,",
      ink: "in your pocket.",
      body: "On a phone the layout becomes one column: the headline and illustration stack, contact details become a list, and the six page links move into a menu behind a single button, with Contact Us and the phone number still in reach.",
      phones: [
        { src: `${PMC_DIR}/mobile-home.jpg`, alt: "Home page on a phone" },
        { src: `${PMC_DIR}/mobile-services.jpg`, alt: "Services page on a phone" },
        { src: `${PMC_DIR}/mobile-menu.jpg`, alt: "The open mobile menu" },
      ],
    },
  ],
  visual: {
    gray: "One navy.",
    ink: "A calm, familiar palette.",
    swatches: [
      { name: "PMC Navy", hex: "#102695", note: "Headings, links, buttons and illustrations", fg: "#FFFFFF" },
      { name: "Lavender", hex: "#CACFE5", note: "Highlight bands, such as doctors", fg: "#102695" },
      { name: "Paper", hex: "#F9F9F9", note: "Page background", fg: "#102695" },
      { name: "Ink", hex: "#3F3D56", note: "Body text", fg: "#FFFFFF" },
    ],
    sample: (
      <div className="rounded-2xl bg-[#F9F9F9] p-8 h-full flex flex-col justify-between gap-8 min-h-[320px] ring-1 ring-black/5 dark:ring-white/10">
        <p className={`text-xs font-semibold ${GRAY}`}>Components</p>
        <div className="space-y-4">
          <p className="text-3xl font-semibold leading-tight text-[#102695]">
            Our Services
            <br />
            Define PMC
          </p>
          <div className="flex h-11 w-40 items-center justify-center rounded-full bg-[#102695] text-sm font-medium text-white">Contact Us</div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#102695]">Primary Care</p>
            <p className="mt-1 text-xs text-[#3F3D56]">PMC provides primary care services to support everyday health needs.</p>
          </div>
          <div className="rounded-xl bg-[#CACFE5] p-4">
            <p className="text-sm font-semibold text-[#102695]">Our Best Doctors</p>
          </div>
        </div>
      </div>
    ),
  },
  statement: { kind: "highlight", phrases: ["what do you offer", "who will treat me", "where do I go"] },
  featureIcons: [Stethoscope, BadgeCheck, Building2, MapPin],
  resultsHeadline: "A whole website, designed.",
};

export const WEB_STUDIES: Record<string, { config: WebStudyConfig; accent: [string, string] }> = {
  "pmc-clinic": { config: PMC, accent: ["#102695", "#8FA0F5"] },
};
