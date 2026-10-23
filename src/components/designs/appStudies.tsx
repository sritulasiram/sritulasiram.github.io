import { BookOpen, CalendarCheck, FileUp, Users, ClipboardCheck, Coins, Hash, LifeBuoy, Library, MessageCircle, Pencil, ScanLine, ShoppingBag, Truck, Wallet } from "lucide-react";
import PlayOnView from "@/components/shared/PlayOnView";
import type { AppStudyConfig } from "./AppCaseStudy";

const KOPIE = "/images/designs/kopiesatu";
const VOID_DIR = "/images/designs/void";
const SAGE_DIR = "/images/designs/sage";
const RELIFE_DIR = "/images/designs/recycle-ai";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";

const VOID_CHECKLIST = `${VOID_DIR}/app-checklist.jpg`;
const VOID_PROJECT = `${VOID_DIR}/app-project.jpg`;
const VOID_CLASSES = `${VOID_DIR}/app-classes.jpg`;
const VOID_SESSIONS = `${VOID_DIR}/app-sessions.jpg`;
const VOID_REVIEW = `${VOID_DIR}/app-review.jpg`;
const VOID_DOWNLOADS = `${VOID_DIR}/app-downloads.jpg`;
const VOID_UPLOAD = `${VOID_DIR}/app-upload.jpg`;
const VOID_PROJECT_LIGHT = `${VOID_DIR}/app-project-light.jpg`;
const VOID_THEMES = `${VOID_DIR}/app-themes.jpg`;

const VOID: AppStudyConfig = {
  headline: ["Final year,", "organised."],
  hero: {
    left: { src: VOID_CHECKLIST, alt: "Uploads checklist" },
    center: { src: VOID_PROJECT, alt: "Student home with project and crew" },
    right: { src: VOID_CLASSES, alt: "Coordinator classes with progress rings" },
  },
  flowTitle: ["Fourteen screens.", "Two roles."],
  flowSubtitle: "From sign-up to supervisor review.",
  chapters: [
    {
      gray: "Two roles.",
      ink: "One app.",
      body: "Everyone signs in the same way, then lands somewhere different. A student sees their project and crew. A coordinator sees sessions, classes and groups, each with its own progress.",
      phones: [
        { src: VOID_PROJECT, alt: "Student home" },
        { src: VOID_SESSIONS, alt: "Coordinator sessions" },
        { src: VOID_REVIEW, alt: "Group review with submission status" },
      ],
    },
    {
      gray: "Paper forms.",
      ink: "Now a checklist.",
      body: "The official forms are one download away. Each one is uploaded from a bottom sheet and ticked off with a date, so students and supervisors can see what is still pending.",
      phones: [
        { src: VOID_DOWNLOADS, alt: "Form downloads" },
        { src: VOID_CHECKLIST, alt: "Submission checklist" },
        { src: VOID_UPLOAD, alt: "Upload bottom sheet" },
      ],
    },
    {
      gray: "Dark first.",
      ink: "Light when you want.",
      body: "Void is designed dark, on a calm charcoal canvas. Settings offer System default, Light or Dark, and the main screens have a light version to match.",
      phones: [
        { src: VOID_PROJECT, alt: "Student home, dark theme" },
        { src: VOID_PROJECT_LIGHT, alt: "Student home, light theme" },
        { src: VOID_THEMES, alt: "Theme settings" },
      ],
    },
  ],
  visual: {
    gray: "Built dark.",
    ink: "Five colours, each with a job.",
    swatches: [
      { name: "Charcoal", hex: "#202125", note: "Screen background", fg: "#FFFFFF" },
      { name: "Surface", hex: "#2C2D31", note: "Cards and panels", fg: "#FFFFFF" },
      { name: "Void Blue", hex: "#14318F", note: "Primary actions", fg: "#FFFFFF" },
      { name: "Go Green", hex: "#04E013", note: "Progress rings", fg: "#0B2A0E" },
      { name: "Alert Red", hex: "#BA2727", note: "Delete", fg: "#FFFFFF" },
    ],
    sample: (
      <PlayOnView className="void-demo h-full">
        <div className="rounded-2xl bg-[#202125] p-8 h-full flex flex-col justify-between gap-8 min-h-[320px] ring-1 ring-black/5 dark:ring-white/10">
          <p className="text-xs font-semibold text-[#A1A1A6]">Components</p>
          <div className="space-y-3">
            <div className="flex h-12 items-center justify-center rounded-full bg-[#14318F] text-sm font-semibold tracking-wide text-white">LOGIN</div>
            <div className="flex items-center justify-between rounded-2xl bg-[#2C2D31] px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">DEM 5A</p>
                <p className="text-xs text-[#A1A1A6]">10 Groups</p>
              </div>
              <span
                className="void-ring flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-semibold"
                style={{ ["--to" as string]: 85 }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2C2D31]">85%</span>
              </span>
            </div>
            {["P1 A Form", "P1 B Form", "P1 C Form"].map((form, i) => (
              <div key={form} className="flex items-center justify-between rounded-2xl bg-[#2C2D31] px-4 py-3 text-white">
                <p className="text-sm font-semibold">{form}</p>
                <span
                  className="void-tick flex h-7 w-7 items-center justify-center rounded-full border border-white/70 text-xs"
                  style={{ ["--i" as string]: i }}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      </PlayOnView>
    ),
  },
  statement: { kind: "strike", phrases: ["paper forms", "scattered messages", "announcements that reach people late"] },
  featureIcons: [FileUp, Users, MessageCircle, BookOpen],
  resultsHeadline: "A whole system, designed.",
};

const KOPIESATU: AppStudyConfig = {
  headline: ["Coffee, ordered.", "Ready when you are."],
  hero: {
    left: { src: `${KOPIE}/screen-customize.png`, alt: "Drink detail bottom sheet" },
    center: { src: `${KOPIE}/screen-menu.png`, alt: "Menu screen with category rail and drink grid" },
    right: { src: `${KOPIE}/screen-cart.png`, alt: "Cart screen" },
  },
  flowTitle: ["Seven screens.", "One flow."],
  flowSubtitle: "From the menu to the counter.",
  chapters: [
    {
      gray: "A basket that changes.",
      ink: "A receipt that doesn’t.",
      body: "Cart lines carry steppers because they’re still editable. Once the order is placed, the same rows return in Orders with a quantity badge instead, so a finished order never looks like something you can change.",
      phones: [
        { src: `${KOPIE}/screen-cart.png`, alt: "Cart screen with steppers on every line" },
        { src: `${KOPIE}/screen-orders.png`, alt: "Orders screen with a quantity badge on every line" },
      ],
    },
    {
      gray: "One idea per screen.",
      ink: "One figure to read.",
      body: "Paying, waiting and collecting each get a single illustration, a single headline and one large figure: the total, the countdown, the pickup number. Nothing else competes for attention at the counter.",
      phones: [
        { src: `${KOPIE}/screen-pay.png`, alt: "Pay at cashier screen showing the total" },
        { src: `${KOPIE}/screen-brewing.png`, alt: "Crafting screen showing a countdown" },
        { src: `${KOPIE}/screen-ready.png`, alt: "Order ready screen showing the pickup number" },
      ],
    },
  ],
  visual: {
    gray: "One colour. One typeface.",
    ink: "Nothing to unlearn.",
    swatches: [
      { name: "Brand Navy", hex: "#221F5A", note: "Text, icons, primary buttons", fg: "#FFFFFF" },
      { name: "Alert Red", hex: "#C0291E", note: "Count badges only", fg: "#FFFFFF" },
      { name: "Surface White", hex: "#FFFFFF", note: "Screens and cards", fg: "#221F5A" },
      { name: "Quiet Gray", hex: "#6B6B70", note: "Prices and secondary text", fg: "#FFFFFF" },
    ],
    sample: (
      <PlayOnView className="kopie-demo h-full">
        <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 dark:bg-[#1C1C1E]">
          <p className={`text-xs font-semibold ${GRAY}`}>Add to cart</p>
          <span
            className="kp-cup pointer-events-none absolute z-10 text-4xl"
            style={{ left: "70%", top: "18%", transform: "translate(-50%, -50%)" }}
            aria-hidden="true"
          >
            ☕
          </span>
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold text-[#221F5A] dark:text-[#F5F5F7]">Cappuccino</p>
                <p className={`text-base ${GRAY}`}>RM 10.90</p>
              </div>
              <div className="kp-press flex h-12 items-center rounded-full bg-[#221F5A] px-5 text-sm font-semibold text-white">
                Add To Cart
              </div>
            </div>
            <div className="flex items-end justify-around rounded-2xl bg-[#F5F5F7] px-4 py-3 text-xs font-medium text-[#221F5A] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]">
              <span>Menu</span>
              <span className="relative">
                Cart
                <span className="kp-badge absolute -right-4 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#C0291E] text-[10px] font-semibold text-white">
                  3
                </span>
              </span>
              <span>Orders</span>
            </div>
          </div>
        </div>
      </PlayOnView>
    ),
  },
  statement: { kind: "ticket", phrases: ["queueing", "shouting names", "guessing when a drink will be ready"], badge: "#128" },
  featureIcons: [ShoppingBag, Pencil, Wallet, Hash],
  resultsHeadline: "Designed end to end.",
};

const SAGE: AppStudyConfig = {
  headline: ["A safe space", "to talk."],
  hero: {
    left: { src: `${SAGE_DIR}/screen-assessment.jpg`, alt: "Assessment screen with four check-in scales" },
    center: { src: `${SAGE_DIR}/screen-home.jpg`, alt: "Home screen with four cards and crisis help" },
    right: { src: `${SAGE_DIR}/screen-chat.jpg`, alt: "Chat with Sage Assist" },
  },
  flowTitle: ["Eleven screens.", "One calm flow."],
  flowSubtitle: "From saying hello to booking a counsellor.",
  chapters: [
    {
      gray: "Check in.",
      ink: "Not a diagnosis.",
      body: "Four short scales ask one question per screen, with a progress bar and four plain answers. The summary is gentle and says so: this isn’t a diagnosis. It ends with three next steps instead of a score.",
      phones: [
        { src: `${SAGE_DIR}/screen-assessment.jpg`, alt: "Choose a check-in scale" },
        { src: `${SAGE_DIR}/screen-question.jpg`, alt: "Anxiety scale, question 2 of 7" },
        { src: `${SAGE_DIR}/screen-result.jpg`, alt: "Summary with next steps" },
      ],
    },
    {
      gray: "Calm by default.",
      ink: "Loud only for crisis.",
      body: "Almost everything is soft green. Coral and plum appear only on the home screen’s crisis and urgent-help cards, the emergency actions, and the crisis warning before booking, so they can’t be missed when they matter.",
      phones: [
        { src: `${SAGE_DIR}/screen-home.jpg`, alt: "Home with crisis and urgent help cards" },
        { src: `${SAGE_DIR}/screen-crisis.jpg`, alt: "You’re not alone: signs and emergency actions" },
        { src: `${SAGE_DIR}/screen-before-booking.jpg`, alt: "Before booking a session, with a crisis warning" },
      ],
    },
    {
      gray: "Talk right now.",
      ink: "Or meet someone.",
      body: "Sage Assist is there at any hour for a private conversation. When a student is ready for a person, they can book an individual or group session and read each counsellor’s profile first.",
      phones: [
        { src: `${SAGE_DIR}/screen-chat.jpg`, alt: "Chat with Sage Assist" },
        { src: `${SAGE_DIR}/screen-booking.jpg`, alt: "Book your appointment" },
        { src: `${SAGE_DIR}/screen-counsellors.jpg`, alt: "Meet our counsellors" },
      ],
    },
  ],
  visual: {
    gray: "Soft green. Warm only for help.",
    ink: "Every colour has a job.",
    swatches: [
      { name: "Mist", hex: "#DCEBDE", note: "Screen background", fg: "#2D6645" },
      { name: "Sage Green", hex: "#31C456", note: "Primary buttons, active tab", fg: "#0F2A1A" },
      { name: "Forest", hex: "#2D6645", note: "Headlines and Book Now", fg: "#FFFFFF" },
      { name: "Coral", hex: "#D1624C", note: "Crisis help only", fg: "#FFFFFF" },
      { name: "Plum", hex: "#4B3462", note: "Urgent help card", fg: "#FFFFFF" },
    ],
    sample: (
      <div className="rounded-2xl bg-[#DCEBDE] p-8 h-full flex flex-col gap-8 min-h-[320px] ring-1 ring-black/5 dark:ring-white/10">
        <p className="text-xs font-semibold text-[#2D6645]">Components</p>
        <div className="my-auto space-y-3">
          <p className="font-serif text-4xl font-semibold text-[#2D6645]">Sage</p>
          <div className="flex h-12 items-center justify-center rounded-full bg-[#31C456] text-sm font-semibold text-white">Get Started</div>
          <div className="flex items-center gap-3 rounded-xl border border-[#2D6645] bg-white/60 px-4 py-3 text-sm font-semibold text-[#2D6645]">
            <span className="h-4 w-4 rounded-full border-4 border-[#2D6645]" aria-hidden="true" />
            Sometimes
          </div>
          <div className="rounded-xl bg-[#D1624C] px-4 py-3 text-sm font-semibold text-white">In crisis right now?</div>
          <div className="rounded-xl bg-[#4B3462] px-4 py-3 text-sm font-semibold text-white">Need urgent help?</div>
        </div>
      </div>
    ),
  },
  statement: { kind: "breathe" },
  heroGlow: true,
  featureIcons: [ClipboardCheck, LifeBuoy, CalendarCheck, Library],
  resultsHeadline: "A whole support app, designed.",
};

const RELIFE: AppStudyConfig = {
  headline: ["Snap it.", "Sell it."],
  hero: {
    left: { src: `${RELIFE_DIR}/screen-home.jpg`, alt: "Home screen with search, categories and product grid" },
    center: { src: `${RELIFE_DIR}/screen-camera.jpg`, alt: "AI scanner viewfinder" },
    right: { src: `${RELIFE_DIR}/screen-listing.jpg`, alt: "Add to Listing form" },
  },
  flowTitle: ["Twelve screens.", "One marketplace."],
  flowSubtitle: "From sign-in to a boosted profile.",
  chapters: [
    {
      gray: "Point. Scan.",
      ink: "Listed.",
      body: "The scanner names the item and its material, tells you whether it’s recyclable, and opens a listing with the photo and category already filled in. Selling starts with one photo instead of a blank form.",
      phones: [
        { src: `${RELIFE_DIR}/screen-camera.jpg`, alt: "AI scanner viewfinder" },
        { src: `${RELIFE_DIR}/screen-result.jpg`, alt: "Scan result: It’s Recyclable" },
        { src: `${RELIFE_DIR}/screen-listing.jpg`, alt: "Add to Listing form with the category filled in" },
      ],
    },
    {
      gray: "Pay with money.",
      ink: "Or with points.",
      body: "Basket, checkout and profile boost share one pattern: a summary card with the total and a round action button. A Redeem Points toggle, with the balance beside it, sits in the same place every time.",
      phones: [
        { src: `${RELIFE_DIR}/screen-basket.png`, alt: "Basket with a swipe-to-delete action" },
        { src: `${RELIFE_DIR}/screen-checkout.png`, alt: "Check Out with payment methods and Redeem Points" },
        { src: `${RELIFE_DIR}/screen-boost.png`, alt: "Boost Profile payment screen" },
      ],
    },
    {
      gray: "Know who you’re",
      ink: "trading with.",
      body: "A seller profile shows rating, products and items sold above their listings. Chat is one tap from any product, and the account page keeps listings, orders to receive and history in one tabbed view.",
      phones: [
        { src: `${RELIFE_DIR}/screen-seller.jpg`, alt: "Seller profile with rating and listings" },
        { src: `${RELIFE_DIR}/screen-chat.png`, alt: "Chat conversation with a seller" },
        { src: `${RELIFE_DIR}/screen-account.jpg`, alt: "Account page with Listings tab" },
      ],
    },
  ],
  visual: {
    gray: "Five earth tones.",
    ink: "One calm palette.",
    swatches: [
      { name: "Cream", hex: "#F0EAD2", note: "Screen background", fg: "#6C584C" },
      { name: "Mist", hex: "#DDE5B6", note: "Cards and list rows", fg: "#6C584C" },
      { name: "Sage", hex: "#ADC178", note: "Primary actions", fg: "#2F3A18" },
      { name: "Clay", hex: "#A98467", note: "Avatars and chat bubbles", fg: "#FFFFFF" },
      { name: "Bark", hex: "#6C584C", note: "Text, chips, secondary buttons", fg: "#FFFFFF" },
    ],
    sample: (
      <PlayOnView className="relife-demo h-full">
        <div className="rounded-2xl bg-[#F0EAD2] p-8 h-full flex flex-col justify-between gap-6 min-h-[320px] ring-1 ring-black/5 dark:ring-white/10">
          <p className="text-xs font-semibold text-[#6C584C]">Scan to list</p>
          <div className="space-y-3">
            <div className="relative flex h-32 items-center justify-center rounded-2xl bg-[#6C584C]">
              <span
                className="scan-corners relative inline-block h-20 w-20 text-[40px]"
                style={{ ["--scan-color" as string]: "#ADC178" }}
                aria-hidden="true"
              />
              <span className="rl-tag absolute bottom-3 rounded-full bg-[#ADC178] px-3 py-1 text-xs font-semibold text-white">
                Glass bottle · Recyclable ✓
              </span>
            </div>
            {[
              ["Category", "Glass"],
              ["Price", "RM 12.45"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className="rl-row flex items-center justify-between rounded-xl bg-[#DDE5B6] px-4 py-3 text-sm text-[#6C584C]"
                style={{ ["--i" as string]: i }}
              >
                <span className="font-medium">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
            <div
              className="rl-row flex h-11 items-center justify-center rounded-full bg-[#ADC178] text-sm font-semibold text-white"
              style={{ ["--i" as string]: 2 }}
            >
              Done
            </div>
          </div>
        </div>
      </PlayOnView>
    ),
  },
  statement: { kind: "focus", phrases: ["take photos", "pick a category", "write a description"] },
  featureIcons: [ScanLine, Coins, Truck, MessageCircle],
  resultsHeadline: "A whole marketplace, designed.",
};

export const APP_STUDIES: Record<string, { config: AppStudyConfig; accent: [string, string] }> = {
  kopiesatu: { config: KOPIESATU, accent: ["#3A3AB8", "#A5A3F5"] },
  void: { config: VOID, accent: ["#2B4FE0", "#8FA6FF"] },
  sage: { config: SAGE, accent: ["#16803C", "#6FD58A"] },
  "recycle-ai": { config: RELIFE, accent: ["#8B5E3C", "#D4A57E"] },
};
