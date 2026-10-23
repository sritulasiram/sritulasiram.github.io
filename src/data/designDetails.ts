import { DesignItem, DesignCaseStudy } from "@/types";

export const DESIGNS_DATA: DesignItem[] = [
  {
    id: "sage",
    category: "Digital Health & Teletherapy",
    categoryKey: "health-ai",
    shortTitle: "Sage",
    title: "Sage — Student Counselling Companion",
    subtitle: "A Safe Space to Talk, Check In and Book a Counsellor",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A calm mobile companion for student wellbeing. Students can talk to Sage Assist, take short self-check scales, browse a self-care library, meet the counsellors and book a session. Crisis help is always one tap away, and it is the only place the interface turns warm.",
    highlights: [
      "Gentle Check-ins: Depression, Anxiety, Stress and Self-Esteem scales of about five minutes, with a summary that says it is not a diagnosis",
      "Calm by Default: Soft mist-green screens, serif headlines and rounded cards, with coral and plum kept for crisis and urgent help",
      "Talk or Book: A private chat with Sage Assist, and individual or group counselling with counsellor profiles",
      "Self-Care Library: Practice ideas, tips and a curated list of apps grouped by topic",
    ],
    imageSrc: "/images/designs/sage/screen-home.jpg",
    placeholderLabel: "sage-home.jpg (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "recycle-ai",
    category: "AI & Computer Vision",
    categoryKey: "health-ai",
    shortTitle: "ReLife",
    title: "ReLife — Reuse, Resell, Recycle with AI",
    subtitle: "A Second-Hand Marketplace Where a Photo Becomes a Listing",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A mobile marketplace for second-hand and recyclable goods. Sellers point the camera at an item, the AI identifies the material, and the listing form is already filled in. Buyers browse by category, pay with a card, DuitNow or online banking, and can redeem points at checkout.",
    highlights: [
      "Scan to List: The camera identifies the item and its material, then opens a listing form with the photo and category ready",
      "Photo-Led Marketplace: Search, category chips and a two-column grid of product cards on the home screen",
      "Points at Checkout: A redeem-points toggle with the balance shown beside it, and a paid boost that raises a profile",
      "Trust Built In: Seller ratings, product and sold counts, in-app chat, and a rating prompt after payment",
    ],
    imageSrc: "/images/designs/recycle-ai/screen-home.jpg",
    placeholderLabel: "relife-home.jpg (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "kopiesatu",
    category: "Consumer Mobile Commerce & F&B",
    categoryKey: "mobile",
    shortTitle: "KopieSatu",
    title: "KopieSatu — Coffee Self-Order App",
    subtitle: "Menu, Customise, Pay at Cashier and Pickup in Seven Screens",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A self-order mobile app for a local coffee chain. Customers browse a photo-led menu, customise a drink in a bottom sheet, review the cart, confirm payment at the cashier and collect with a pickup number, all within a three-tab layout.",
    highlights: [
      "Photo-Led Menu: Category rail and a two-column grid of large drink images for quick scanning",
      "Bottom-Sheet Customiser: Size, quantity and Order Now or Add To Cart placed in the thumb zone",
      "Pay at Cashier Flow: A single-purpose confirmation screen with the total front and centre",
      "Live Order Status: Crafting countdown and a large pickup number, with count badges on the tab bar",
    ],
    imageSrc: "/images/designs/kopiesatu/screen-menu.png",
    placeholderLabel: "kopiesatu-menu.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "pmc-clinic",
    category: "Healthcare & Patient Portal",
    categoryKey: "web",
    shortTitle: "Perak Medical Centre",
    title: "Perak Medical Centre — Clinic Group Website",
    subtitle: "Six Pages for Patients, Partners and Job Seekers",
    tool: "Figma",
    platform: "Website (Desktop & Mobile)",
    overview:
      "A website for Perak Medical Centre (Klinik PMC), a group of clinics in Ipoh and across Perak. Six pages cover what the clinics offer, who the doctors are, the companies and insurers they work with, careers, and every branch with its address and phone number.",
    highlights: [
      "One Pattern per Page: A two-line headline, one supporting sentence and one button beside a spot illustration",
      "Trust, Shown: Doctors with their qualifications, authorisations and certifications, and the companies and insurers the group works with",
      "Services at a Glance: Six equal cards for primary care, screening, physiotherapy, wound care, podiatry and equipment",
      "Every Branch, Listed: A map plus six branch cards, each with a photo of the frontage, the address and a phone number",
    ],
    imageSrc: "/images/designs/pmc-clinic/page-home.jpg",
    placeholderLabel: "pmc-clinic-home.jpg (Figma Showcase)",
    placeholderRatio: "Website Home Page (Figma)",
  },
  {
    id: "void",
    category: "Workflow Architecture & Brand Identity",
    categoryKey: "mobile",
    shortTitle: "Void",
    title: "Void",
    subtitle: "Online Student's Project Management System",
    tool: "Adobe XD · Adobe Photoshop",
    platform: "Android & iOS Mobile App",
    overview:
      "A mobile application (Android first, with iOS to follow) and brand identity system engineered to streamline final year project coordination for students, supervisors, and coordinators at the Mechanical Engineering Department, Polytechnic Ungku Omar — eliminating paper bottlenecks, scattered messaging, and lost milestone documentation.",
    highlights: [
      "Brand Identity & Visual Design: Custom dark-mode branding, official logo, and presentation collateral designed in Adobe Photoshop",
      "Dual-Role UX Architecture: Tailored viewports for Students (form submission, supervisor chat, milestone tracker) and Coordinators (class creation, session scheduling, broadcast notifications)",
      "Digital Form & Submission Pipeline: Direct in-app document upload/download hub replacing manual paper forms and disparate messaging channels",
      "Full Interactive Adobe XD Suite: Multi-screen interactive prototype with custom components, micro-animations, and screen flows",
    ],
    imageSrc: "/images/designs/void/app-project.jpg",
    placeholderLabel: "Void App UI Design Showcase",
    placeholderRatio: "16:9 Adobe XD UI Presentation (2560×1440)",
    githubUrl: "https://github.com/sritulasiram/Void-App",
  },
];

export const DESIGN_DETAILS: Record<string, DesignCaseStudy> = {
  sage: {
    id: "sage",
    title: "Sage",
    eyebrow: "Student Wellbeing · Counselling Companion",
    tagline:
      "A safe space to talk, whenever you need it. Check in, read, chat or book a counsellor, all in one calm app.",
    heroMetric: "4",
    heroMetricLabel: "Self-check scales, about five minutes each",
    imageSrc: "/images/designs/sage/screen-home.jpg",
    heroLayout: "phone",
    screens: [
      {
        id: "welcome",
        number: "01",
        title: "Welcome",
        role: "Arrive",
        description: "The Sage mascot, one sentence (a safe space to talk, whenever you need it) and a single Get Started button.",
        imageSrc: "/images/designs/sage/screen-welcome.jpg",
      },
      {
        id: "home",
        number: "02",
        title: "Home",
        role: "Choose",
        description: "Sage greets you, then four calm choices: Let’s Talk, Assessment, Self-Care Library and FAQ. Crisis help waits below in coral and plum.",
        imageSrc: "/images/designs/sage/screen-home.jpg",
      },
      {
        id: "assessment",
        number: "03",
        title: "Assessment",
        role: "Check in",
        description: "Four short scales (Depression, Anxiety, Stress and Self-Esteem) of about five minutes each, with a privacy note at the top.",
        imageSrc: "/images/designs/sage/screen-assessment.jpg",
      },
      {
        id: "result",
        number: "04",
        title: "Your Summary",
        role: "Reflect",
        description: "A gentle summary on a slider that says outright it isn’t a diagnosis, then three next steps: self-care, a counsellor, or a booking.",
        imageSrc: "/images/designs/sage/screen-result.jpg",
      },
      {
        id: "selfcare",
        number: "05",
        title: "Self-Care Library",
        role: "Learn",
        description: "What self-care is, ideas to practise as photo cards, simple tips, and a library of approved apps.",
        imageSrc: "/images/designs/sage/screen-selfcare.jpg",
      },
      {
        id: "chat",
        number: "06",
        title: "Sage Assist",
        role: "Talk",
        description: "A private chat that opens with a reassurance note, a typing indicator, and a green send button.",
        imageSrc: "/images/designs/sage/screen-chat.jpg",
      },
      {
        id: "crisis",
        number: "07",
        title: "You’re Not Alone",
        role: "Crisis",
        description: "Plain-language signs, a myth-versus-fact card and an emergency action card in coral.",
        imageSrc: "/images/designs/sage/screen-crisis.jpg",
      },
      {
        id: "booking",
        number: "08",
        title: "Book Your Appointment",
        role: "Book",
        description: "Individual or group counselling, each with a photo, a one-line description and a Book Now button.",
        imageSrc: "/images/designs/sage/screen-booking.jpg",
      },
      {
        id: "counsellors",
        number: "09",
        title: "Meet Our Counsellors",
        role: "Meet",
        description: "Photo cards with names and registration, so a student knows who they will be speaking to.",
        imageSrc: "/images/designs/sage/screen-counsellors.jpg",
      },
      {
        id: "faq",
        number: "10",
        title: "FAQs",
        role: "Ask",
        description: "General, Appointments and Facilities tabs with expandable answers and a search bar.",
        imageSrc: "/images/designs/sage/screen-faq.jpg",
      },
      {
        id: "more",
        number: "11",
        title: "More to Explore",
        role: "Read",
        description: "Longer articles: Signs of Distress, Protecting Personal Safety & Wellbeing, and How to Talk to Someone Who Is Suicidal.",
        imageSrc: "/images/designs/sage/screen-more.jpg",
      },
    ],
    placeholderLabel: "sage-home.jpg (Figma Showcase)",
    placeholderRatio: "Mobile App Screen (Figma)",
    timeframe: "2025 – 2026",
    role: "Mobile UI/UX Designer",
    organization: "Student Counselling Support",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Asking for help is the hardest step. A stressed student shouldn’t have to face a clinical form, a long menu or a loud interface to take it.",
      context:
        "Sage keeps the first step small: say hello, take a short check-in, or just talk. Booking a counsellor and crisis support are there when needed, never in the way.",
      challenges: [
        "Keeping every screen low-stimulation for someone who may already be overwhelmed",
        "Making the check-ins feel supportive rather than clinical, and clear that a result is not a diagnosis",
        "Putting crisis help within reach without turning the whole app into an alarm",
        "Presenting a lot of reference content (articles, FAQs, signs of distress) without a wall of text",
      ],
    },
    architecture: {
      summary:
        "A soft mist-green canvas, serif headlines for warmth, rounded cards for calm, and a five-item tab bar. Warm colours are reserved for crisis and urgent help.",
      components: [
        {
          title: "Sage, the Companion",
          description:
            "A small mascot greets students on the welcome and home screens, so the first message feels personal, not institutional.",
        },
        {
          title: "Card Navigation",
          description:
            "Home offers four large, icon-led cards with one line each, so the next step is obvious.",
        },
        {
          title: "Warm-Colour Rule",
          description:
            "Coral and plum appear only for crisis and urgent help, so when they show up they stand out.",
        },
        {
          title: "Floating Tab Bar",
          description:
            "Home, Bookings, Talk, Counsellors and More sit in a rounded floating bar, with the active tab highlighted in green.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Gentle Check-ins",
        description: "Short scales with one question per screen, a progress bar, and a private, non-diagnostic summary.",
        badge: "Assessment",
      },
      {
        title: "Crisis Support in Reach",
        description: "A coral card on the home screen leads to plain-language guidance and emergency actions.",
        badge: "Safety",
      },
      {
        title: "Counsellors and Booking",
        description: "Choose individual or group sessions, read counsellor profiles, and check what to expect before booking.",
        badge: "Care",
      },
      {
        title: "Self-Care Library",
        description: "Practice ideas, tips and suggested apps filtered by topic, from mindfulness to anxiety.",
        badge: "Resources",
      },
    ],
    techStack: [
      { category: "Mobile UI Design", items: ["Figma", "Auto-Layout", "Components & Variants", "Prototyping"] },
      { category: "Calm Interface", items: ["Low-Contrast Mist Canvas", "Serif Headlines", "Rounded Cards", "Soft Shadows"] },
      { category: "Safety Patterns", items: ["Crisis Cards", "Emergency Actions", "Non-Diagnostic Language"] },
      { category: "Content Design", items: ["Short Check-ins", "Expandable FAQs", "Article Templates"] },
    ],
    results: [
      {
        metric: "70+",
        label: "Screens Designed",
        description: "Check-in questions, self-care, chat, booking, counsellor profiles, FAQs and articles.",
      },
      {
        metric: "5",
        label: "Tab-Bar Destinations",
        description: "Home, Bookings, Talk, Counsellors and More, always one tap away.",
      },
      {
        metric: "4",
        label: "Check-in Scales",
        description: "Depression, Anxiety, Stress and Self-Esteem, each about five minutes.",
      },
    ],
  },
  "recycle-ai": {
    id: "recycle-ai",
    title: "ReLife",
    eyebrow: "Marketplace · AI Scanning",
    tagline:
      "A second-hand marketplace where the camera does the typing. Point it at an item, and the listing is ready to post.",
    heroMetric: "12",
    heroMetricLabel: "Screens from sign-in to boost",
    imageSrc: "/images/designs/recycle-ai/screen-home.jpg",
    heroLayout: "phone",
    screens: [
      {
        id: "start",
        number: "01",
        title: "Welcome",
        role: "Onboard",
        description: "The logo, the promise (reuse, resell, recycle with AI) and two clear choices: Sign In or Create account.",
        imageSrc: "/images/designs/recycle-ai/screen-start.png",
      },
      {
        id: "home",
        number: "02",
        title: "Home",
        role: "Browse",
        description: "Search at the top, category chips and a For You banner above a two-column grid of product cards.",
        imageSrc: "/images/designs/recycle-ai/screen-home.jpg",
      },
      {
        id: "product",
        number: "03",
        title: "Product",
        role: "Decide",
        description: "A full-bleed photo, material and pickup tags, the seller’s rating, and a price button with a chat shortcut beside it.",
        imageSrc: "/images/designs/recycle-ai/screen-product.jpg",
      },
      {
        id: "basket",
        number: "04",
        title: "Basket",
        role: "Review",
        description: "Items in the basket with a swipe-to-delete action, and the total pinned at the bottom.",
        imageSrc: "/images/designs/recycle-ai/screen-basket.png",
      },
      {
        id: "checkout",
        number: "05",
        title: "Check Out",
        role: "Pay",
        description: "Pick a payment method, tick Redeem Points to use your balance, and the total updates beside the pay button.",
        imageSrc: "/images/designs/recycle-ai/screen-checkout.png",
      },
      {
        id: "scan-sheet",
        number: "06",
        title: "Add Photo",
        role: "Sell",
        description: "The centre tab opens a sheet over the home screen: pick from the Gallery or open the Camera.",
        imageSrc: "/images/designs/recycle-ai/screen-scan-sheet.jpg",
      },
      {
        id: "camera",
        number: "07",
        title: "AI Scanner",
        role: "Scan",
        description: "A clean viewfinder with a focus frame, an AI indicator, flash and camera flip, and a large shutter.",
        imageSrc: "/images/designs/recycle-ai/screen-camera.jpg",
      },
      {
        id: "result",
        number: "08",
        title: "Scanned Results",
        role: "Identify",
        description: "The verdict in large type (It’s Recyclable), the photo, a material tag and one action: Add to Listing.",
        imageSrc: "/images/designs/recycle-ai/screen-result.jpg",
      },
      {
        id: "listing",
        number: "09",
        title: "Add to Listing",
        role: "List",
        description: "Photo, Pickup or Delivery, Price or Free, a searchable category and a description, ready to post with Done.",
        imageSrc: "/images/designs/recycle-ai/screen-listing.jpg",
      },
      {
        id: "chat",
        number: "10",
        title: "Chat",
        role: "Talk",
        description: "Bubbles in the app’s own colours, a message field with a send button, and the seller’s name in the header.",
        imageSrc: "/images/designs/recycle-ai/screen-chat.png",
      },
      {
        id: "account",
        number: "11",
        title: "Account",
        role: "Manage",
        description: "Rating, products and sold at the top, then tabs for About, Listings, To Receive and History. Sold items wear a red tag.",
        imageSrc: "/images/designs/recycle-ai/screen-account.jpg",
      },
      {
        id: "boost",
        number: "12",
        title: "Boost Profile",
        role: "Grow",
        description: "The same payment pattern as checkout, reused for a one-month profile boost, with points redeemable too.",
        imageSrc: "/images/designs/recycle-ai/screen-boost.png",
      },
    ],
    placeholderLabel: "relife-home.jpg (Figma Showcase)",
    placeholderRatio: "Mobile App Screen (Figma)",
    timeframe: "2025",
    role: "Mobile UI/UX Designer",
    organization: "ReLife",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Listing a second-hand item is a chore: take photos, pick a category, write a description.",
      context:
        "ReLife puts an AI scanner in the middle of the tab bar, so selling takes one photo and a tap.",
      challenges: [
        "Making the scan-to-listing path feel shorter than filling in a form by hand",
        "Giving buyers and sellers one consistent visual language across browsing, selling, chat and payment",
        "Keeping the AI result clear: what the item is, whether it is recyclable, and what to do next",
        "Adding a points economy to checkout without slowing the payment flow",
      ],
    },
    architecture: {
      summary:
        "A warm, earthy palette of cream, sage and brown, rounded cards and pill buttons, and a five-item tab bar with the camera raised in the middle.",
      components: [
        {
          title: "Raised Camera Tab",
          description:
            "The scan action sits in the centre of the tab bar, so selling is always one tap away from any screen.",
        },
        {
          title: "Category Chips",
          description:
            "Plastic, Metal, Paper and more as pill chips that scroll sideways under the search field.",
        },
        {
          title: "Summary Footer",
          description:
            "Basket, checkout and boost share one footer card: a total on the left and a round action button on the right.",
        },
        {
          title: "Status Screens",
          description:
            "Congratulations, Payment Success and Boost Successful use one pattern: a check, a headline and a single Done button.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Scan to Listing",
        description: "The scanner identifies the item, then the listing form opens with the photo and category filled in.",
        badge: "AI",
      },
      {
        title: "Points and Boosts",
        description: "Redeem points at checkout, or pay to boost a profile for a month.",
        badge: "Rewards",
      },
      {
        title: "Pickup or Delivery",
        description: "Sellers choose how an item changes hands, and whether it carries a price or is free.",
        badge: "Marketplace",
      },
      {
        title: "Seller Profiles and Chat",
        description: "Ratings, product and sold counts, and in-app messages build trust before a trade.",
        badge: "Trust",
      },
    ],
    techStack: [
      { category: "Mobile UI Design", items: ["Figma", "Auto-Layout", "Components & Variants", "Prototyping"] },
      { category: "Brand & Colour", items: ["Earthy Five-Colour Palette", "Rounded Cards", "Pill Buttons"] },
      { category: "AI Experience", items: ["Camera Viewfinder", "Scan Result Screen", "Prefilled Listing"] },
      { category: "Commerce Flows", items: ["Basket & Checkout", "Points Redemption", "Profile Boost"] },
    ],
    results: [
      {
        metric: "30",
        label: "Screens Designed",
        description: "Every state across onboarding, shopping, scanning, chat and account.",
      },
      {
        metric: "5",
        label: "Tab-Bar Destinations",
        description: "Home, Basket, Scan, Chat and Account, always one tap away.",
      },
      {
        metric: "3",
        label: "Ways to Pay",
        description: "Debit or credit card, DuitNow and online banking, plus points.",
      },
    ],
  },
  kopiesatu: {
    id: "kopiesatu",
    title: "KopieSatu",
    eyebrow: "Self-Order Mobile App · Café Counter Pickup",
    tagline:
      "A self-order app for a local coffee chain: browse, customise, pay at the cashier and collect with a pickup number, in three tabs and a handful of taps.",
    heroMetric: "3 tabs",
    heroMetricLabel: "Menu, Cart and Orders. Nothing else to learn.",
    imageSrc: "/images/designs/kopiesatu/screen-menu.png",
    heroLayout: "phone",
    screens: [
      {
        id: "menu",
        number: "01",
        title: "Menu",
        role: "Browse",
        description: "A category rail on the left and a two-column grid of large drink photos, so the whole menu scans in a few thumb flicks.",
        imageSrc: "/images/designs/kopiesatu/screen-menu.png",
      },
      {
        id: "customize",
        number: "02",
        title: "Drink Detail",
        role: "Customise",
        description: "A bottom sheet over the menu: size chips, quantity stepper, and Order Now or Add To Cart in the thumb zone.",
        imageSrc: "/images/designs/kopiesatu/screen-customize.png",
      },
      {
        id: "cart",
        number: "03",
        title: "Cart",
        role: "Review",
        description: "Every line editable in place with size, price and a stepper, and the total pinned beside the primary action.",
        imageSrc: "/images/designs/kopiesatu/screen-cart.png",
      },
      {
        id: "pay",
        number: "04",
        title: "Pay at Cashier",
        role: "Confirm",
        description: "One instruction and one number. The order is confirmed at the counter, so the screen shows only what the customer needs to say.",
        imageSrc: "/images/designs/kopiesatu/screen-pay.png",
      },
      {
        id: "brewing",
        number: "05",
        title: "Crafting",
        role: "Wait",
        description: "A live countdown with a friendly illustration replaces the anxious lobby wait.",
        imageSrc: "/images/designs/kopiesatu/screen-brewing.png",
      },
      {
        id: "ready",
        number: "06",
        title: "Order Ready",
        role: "Collect",
        description: "A large pickup number to show the barista, with a check badge on the cup as the confirmation.",
        imageSrc: "/images/designs/kopiesatu/screen-ready.png",
      },
      {
        id: "orders",
        number: "07",
        title: "Your Orders",
        role: "History",
        description: "A read-only receipt of what was ordered. Quantity moves into a badge so the list can't be edited by mistake.",
        imageSrc: "/images/designs/kopiesatu/screen-orders.png",
      },
    ],
    placeholderLabel: "kopiesatu-menu.png (Figma Showcase)",
    placeholderRatio: "Mobile App Screen (Figma)",
    timeframe: "2024 – 2025",
    role: "Mobile UI/UX Designer",
    organization: "KopieSatu",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Ordering at a busy coffee counter means queueing, shouting names and guessing when a drink will be ready.",
      context:
        "KopieSatu lets customers order from their phone and pay at the cashier, then shows a countdown and a pickup number.",
      challenges: [
        "Keeping the full flow (menu, customise, cart, pay, wait, collect) to a few steps a customer can finish on one hand",
        "Making a long menu with many similar drinks easy to scan, using category icons and large product photography",
        "Showing the order's state (unpaid, brewing, ready) with a single idea per screen",
        "Keeping Cart and Orders clearly separate, so an editable basket never looks like a finished receipt",
      ],
    },
    architecture: {
      summary:
        "One deep-navy brand colour on white, Poppins throughout, and a persistent three-tab bar with live badges. Each screen is a single state with a single primary action.",
      components: [
        {
          title: "Category Rail",
          description:
            "A vertical icon-and-label rail keeps every category one tap away and leaves the grid its full width.",
        },
        {
          title: "Bottom-Sheet Customiser",
          description:
            "Size, quantity and both purchase actions sit in the lower half of the screen, within thumb reach.",
        },
        {
          title: "Tab Bar with Badges",
          description:
            "Cart and Orders carry count badges, so the state of an order is visible from any screen.",
        },
        {
          title: "State-per-Screen Status",
          description:
            "Pay, Crafting and Ready each get one illustration, one headline and one large figure (total, countdown, pickup number).",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Order Now or Add To Cart",
        description: "Two clear paths from the drink sheet: skip the cart for a single drink, or build a larger order.",
        badge: "Flow",
      },
      {
        title: "Edit in Cart, Read in Orders",
        description: "Steppers appear only where changes are allowed. The Orders list swaps them for a quantity badge.",
        badge: "Clarity",
      },
      {
        title: "Pay at Cashier",
        description: "A dedicated confirmation screen puts the total front and centre for the customer to say at the counter.",
        badge: "Commerce",
      },
      {
        title: "Pickup Number",
        description: "The ready screen leads with a very large number, readable at arm's length across a busy counter.",
        badge: "Legibility",
      },
    ],
    techStack: [
      { category: "Mobile UI Design", items: ["Figma", "Auto-Layout", "Components & Variants", "Prototyping"] },
      { category: "Layout", items: ["Bottom Sheets", "Thumb-Zone Placement", "Large Touch Targets"] },
      { category: "Brand & Type", items: ["Navy Brand Palette", "Poppins", "Product Photography", "Line Iconography"] },
      { category: "Flows", items: ["Menu to Cart", "Pay at Cashier", "Live Order Status"] },
    ],
    results: [
      {
        metric: "7",
        label: "Screens in the Flow",
        description: "From browsing the menu to collecting a drink, every step is designed and connected.",
      },
      {
        metric: "2",
        label: "Purchase Paths",
        description: "Order Now for a single drink, or Add To Cart to build up an order.",
      },
      {
        metric: "1-Thumb",
        label: "Ergonomic Layout",
        description: "Primary actions, steppers and tabs all sit in the lower half of the screen.",
      },
    ],
  },
  "pmc-clinic": {
    id: "pmc-clinic",
    title: "Perak Medical Centre",
    eyebrow: "Healthcare · Clinic Group Website",
    tagline:
      "A friendly, trustworthy website for a group of clinics in Ipoh and across Perak: services, doctors, partners and every branch in one place.",
    heroMetric: "6",
    heroMetricLabel: "Pages, each on desktop and mobile",
    imageSrc: "/images/designs/pmc-clinic/page-home.jpg",
    heroLayout: "landscape",
    screens: [
      {
        id: "home",
        number: "01",
        title: "Home",
        role: "Welcome",
        description: "“Your Health Is Our Priority” with a clear Contact Us button beside an illustration, then the heading for what the clinics are built on.",
        imageSrc: "/images/designs/pmc-clinic/page-home.jpg",
      },
      {
        id: "about",
        number: "02",
        title: "About Us",
        role: "Trust",
        description: "A full-width team photo opens the page, then “About Us”: who PMC is and what it stands for, with the clinic logo beside the text.",
        imageSrc: "/images/designs/pmc-clinic/page-about.jpg",
      },
      {
        id: "services",
        number: "03",
        title: "Services",
        role: "Offer",
        description: "“Our Services Define PMC” with a Contact Us button, then the first of six equal service cards, each with a title and a short description.",
        imageSrc: "/images/designs/pmc-clinic/page-services.jpg",
      },
      {
        id: "clients",
        number: "04",
        title: "Clients & Insurance",
        role: "Partners",
        description: "“Our Clients, Our Priority” with a Contact Us button, then the first row of company and organisation logos.",
        imageSrc: "/images/designs/pmc-clinic/page-clients.jpg",
      },
      {
        id: "careers",
        number: "05",
        title: "Careers",
        role: "Join",
        description: "“Define Your Future With Us” with an Apply Now button, then “Job Prospects at PMC”, starting with medical staff, each role with its own illustration.",
        imageSrc: "/images/designs/pmc-clinic/page-careers.jpg",
      },
      {
        id: "contact",
        number: "06",
        title: "Contact & Locations",
        role: "Visit",
        description: "“Book an Appointment With Us Today!”, then address, hotline and email in a row of icons, and the main clinic beside its map.",
        imageSrc: "/images/designs/pmc-clinic/page-contact.jpg",
      },
    ],
    placeholderLabel: "pmc-clinic-home.jpg (Figma Showcase)",
    placeholderRatio: "Website Home Page (Figma)",
    timeframe: "2024",
    role: "Lead Web UI/UX Designer & Information Architect",
    organization: "Perak Medical Centre (Klinik PMC Sdn. Bhd.)",
    tool: "Figma",
    platform: "Website (Desktop & Mobile)",
    liveUrl: "https://www.pmcgroup.com.my/",
    liveLabel: "Visit the live website",
    background: {
      problemStatement:
        "A clinic group's website has to answer three questions fast: what do you offer, who will treat me, and where do I go?",
      context:
        "Perak Medical Centre runs several clinics across Perak. The site gives patients, corporate and insurance partners, and job seekers each a clear page.",
      challenges: [
        "Presenting a wide range of services without overwhelming a first-time visitor",
        "Building trust with credentials: doctors, authorisations and certifications",
        "Showing a long list of partner companies and insurers clearly, by logo",
        "Helping people find the right branch, with its address and phone number",
      ],
    },
    architecture: {
      summary:
        "One deep navy on a soft off-white page, with a lavender band for emphasis, spot illustrations in the same navy, and a simple top bar with six links and a Contact Us button.",
      components: [
        {
          title: "Top Bar",
          description:
            "The logo, six page links and a Contact Us button stay in the same place on every page.",
        },
        {
          title: "Hero Pattern",
          description:
            "Each page opens with a two-line headline, one sentence and one action, beside an illustration.",
        },
        {
          title: "Credential Rows",
          description:
            "Circular doctor portraits with their qualifications, and rows of logos for authorisations, clients and insurers.",
        },
        {
          title: "Branch Cards",
          description:
            "Photo, address and phone for each branch, in one repeating card.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Services at a Glance",
        description: "Six equal cards cover primary care, screening, physiotherapy, wound care, podiatry and equipment.",
        badge: "Services",
      },
      {
        title: "Doctors and Credentials",
        description: "Each doctor is shown with their qualifications, alongside the bodies that authorise and certify the clinics.",
        badge: "Trust",
      },
      {
        title: "Clients and Insurance",
        description: "Companies, associates and insurers are shown as rows of logos on one page.",
        badge: "Partners",
      },
      {
        title: "Branch Locator",
        description: "A map and six branch cards, each with a photo of the frontage, the address and a phone number.",
        badge: "Visit",
      },
    ],
    techStack: [
      { category: "Web Design", items: ["Figma", "Auto-Layout", "Components", "Prototyping"] },
      { category: "Brand & Colour", items: ["Navy Brand Colour", "Lavender Accent Band", "Spot Illustrations"] },
      { category: "Information Architecture", items: ["Six-Page Sitemap", "Persistent Top Bar", "Audience Pages"] },
      { category: "Target Surface", items: ["Desktop Website", "Mobile Website (402×874)"] },
    ],
    results: [
      {
        metric: "6",
        label: "Pages Designed",
        description: "Home, About Us, Services, Clients & Insurance, Careers, and Contact & Locations.",
      },
      {
        metric: "6",
        label: "Branches Listed",
        description: "Each with a photo of the frontage, its address and a phone number.",
      },
      {
        metric: "3",
        label: "Partner Groups",
        description: "Companies and organisations, third-party associates, and insurers.",
      },
    ],
  },
  void: {
    id: "void",
    title: "Void",
    eyebrow: "Polytechnic Ungku Omar · Final Year Project (Group DEM5C-G6)",
    tagline:
      "Online Student's Project Management System: one app for forms, groups and chat across final-year projects, for students and coordinators.",
    heroMetric: "100+",
    heroMetricLabel: "Screens designed, in dark and light",
    imageSrc: "/images/designs/void/app-project.jpg",
    logoSrc: "/images/designs/void/logo.png",
    heroLayout: "phone",
    videos: [
      { id: "OPOrgHg-vf0", title: "Introducing Void: The Android App for Seamless Final Year Project Management" },
      { id: "PHpneWlUBbc", title: "Void: Typography Ad | Android Application for Final Year Documentation Management" },
    ],
    screens: [
      {
        id: "splash",
        number: "01",
        title: "Splash",
        role: "Launch",
        description: "The VD mark on a charcoal screen, with “Void, a New Beginning Company” at the foot.",
        imageSrc: "/images/designs/void/app-splash.jpg",
      },
      {
        id: "login",
        number: "02",
        title: "Login",
        role: "Sign in",
        description: "Welcome to Void: one blue Login button, Google and Apple sign-in, and a link to sign up.",
        imageSrc: "/images/designs/void/app-login.jpg",
      },
      {
        id: "register",
        number: "03",
        title: "Create Student Account",
        role: "Register",
        description: "Name, matric number, session, class and final-year project group, chosen from dropdowns.",
        imageSrc: "/images/designs/void/app-register.jpg",
      },
      {
        id: "project",
        number: "04",
        title: "My Project",
        role: "Student home",
        description: "The project title, group supervisor and crew with matric numbers on a single card.",
        imageSrc: "/images/designs/void/app-project.jpg",
      },
      {
        id: "sidebar",
        number: "05",
        title: "Navigation Drawer",
        role: "Navigate",
        description: "Home, Contacts, Chat, Notifications, Downloads, Uploads, Log Book, Settings, and Help & Feedback.",
        imageSrc: "/images/designs/void/app-sidebar.jpg",
      },
      {
        id: "checklist",
        number: "06",
        title: "Uploads",
        role: "Submit",
        description: "Every required form with a tick and date when done, or a plus when pending. Swipe a submitted form to delete it.",
        imageSrc: "/images/designs/void/app-checklist.jpg",
      },
      {
        id: "upload",
        number: "07",
        title: "Upload a Form",
        role: "Submit",
        description: "Pick a file and a form type, then Upload, from a bottom sheet that keeps the list visible behind it.",
        imageSrc: "/images/designs/void/app-upload.jpg",
      },
      {
        id: "logbook",
        number: "08",
        title: "Logbook",
        role: "Record",
        description: "Logbook entries as cards, each opening a weekly entry with a section for the student and one for the supervisor.",
        imageSrc: "/images/designs/void/app-logbook.jpg",
      },
      {
        id: "sessions",
        number: "09",
        title: "Sessions",
        role: "Coordinator home",
        description: "One card per final-year project session, with a floating button to create another.",
        imageSrc: "/images/designs/void/app-sessions.jpg",
      },
      {
        id: "classes",
        number: "10",
        title: "Classes",
        role: "Coordinator",
        description: "Each class shows its advisor, number of groups and a progress ring, with departments as tabs along the bottom.",
        imageSrc: "/images/designs/void/app-classes.jpg",
      },
      {
        id: "groups",
        number: "11",
        title: "Groups",
        role: "Coordinator",
        description: "Inside a class, Groups and Students tabs. Each group shows its project title, supervisor and progress.",
        imageSrc: "/images/designs/void/app-groups.jpg",
      },
      {
        id: "review",
        number: "12",
        title: "Group Review",
        role: "Review",
        description: "A group’s detail page: supervisor, crew, and every submission with its own status icon.",
        imageSrc: "/images/designs/void/app-review.jpg",
      },
      {
        id: "messenger",
        number: "13",
        title: "Messenger",
        role: "Talk",
        description: "Conversations with online status, unread counts and swipe actions, plus a Start Chat button.",
        imageSrc: "/images/designs/void/app-messenger.jpg",
      },
      {
        id: "notifications",
        number: "14",
        title: "Notifications",
        role: "Stay informed",
        description: "Class and group notifications as cards, with the source named at the top of each one.",
        imageSrc: "/images/designs/void/app-notifications.jpg",
      },
    ],
    placeholderLabel: "Void App UI Design Presentation",
    placeholderRatio: "Mobile App Screen",
    timeframe: "Final Year Project 2019",
    role: "Brand Identity, Lead UI/UX Designer & Mobile Architecture",
    organization: "Mechanical Engineering Dept, Polytechnic Ungku Omar",
    tool: "Adobe XD · Adobe Photoshop",
    platform: "Android & iOS Mobile App (Android first)",
    background: {
      problemStatement:
        "Final year projects run on paper forms, scattered messages and announcements that reach people late.",
      context:
        "Void puts forms, groups and chat in one app, so students and coordinators can see where every group stands.",
      challenges: [
        "Eliminating reliance on paper-based project submission forms and physical sign-offs",
        "Designing distinct workflows for students and coordinators within one consistent interface",
        "Enabling direct messaging between student teams, supervisors and coordinators",
        "Showing progress for many classes and groups at a glance",
      ],
    },
    architecture: {
      summary:
        "A dark-first interface on a charcoal canvas with a light theme for every screen, one navigation drawer for both roles, and a single blue for the actions that matter.",
      components: [
        {
          title: "One Drawer, Two Roles",
          description:
            "Students and coordinators share one navigation pattern, but land on different home screens: a project and crew for students, sessions and classes for coordinators.",
        },
        {
          title: "Progress Rings",
          description:
            "Classes and groups carry a green ring, so a coordinator can see which ones are behind without opening them.",
        },
        {
          title: "Swipe to Act",
          description:
            "Delete, mute and dismiss live behind a swipe, which keeps list rows clean until they are needed.",
        },
        {
          title: "Floating Action Button",
          description:
            "A single round blue button adds the next thing: a session, a form or a logbook entry.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Paperless Submissions",
        description: "Download the official forms, upload each one, and track what is done and what is pending, with dates.",
        badge: "Forms",
      },
      {
        title: "Two Roles, One App",
        description: "Students see their project, crew and submissions. Coordinators manage sessions, classes and groups.",
        badge: "Roles",
      },
      {
        title: "Chat and Notifications",
        description: "Direct and group chat with online status, plus class and group notifications.",
        badge: "Communication",
      },
      {
        title: "Weekly Logbook",
        description: "Each entry has a section for the student to complete before a meeting and one for the supervisor.",
        badge: "Logbook",
      },
    ],
    techStack: [
      { category: "Design & Prototyping", items: ["Adobe XD", "Interactive Prototyping", "Screen Transitions"] },
      { category: "Visual Assets & Branding", items: ["Adobe Photoshop", "Vector Icons", "Presentation Decks"] },
      { category: "Target Platform", items: ["Android (launch platform)", "iOS (planned)", "Material Design Guidelines", "Mobile Ergonomics"] },
      { category: "Architecture & Documentation", items: ["Role-Based Access", "Project Proposal PDFs", "Brochure Design"] },
    ],
    results: [
      {
        metric: "100+",
        label: "Screens Designed",
        description: "Sign-in, registration, projects, uploads, logbook, classes, groups, chat, notifications and settings.",
      },
      {
        metric: "2",
        label: "Roles",
        description: "Student and coordinator toolsets in a single app.",
      },
      {
        metric: "2",
        label: "Themes",
        description: "Dark first, with a light theme designed for the main screens.",
      },
    ],
    githubUrl: "https://github.com/sritulasiram/Void-App",
  },
};
