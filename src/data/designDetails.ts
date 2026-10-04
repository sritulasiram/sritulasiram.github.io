import { DesignItem, DesignCaseStudy } from "@/types";

export const DESIGNS_DATA: DesignItem[] = [
  {
    id: "sage",
    category: "Digital Health & Teletherapy",
    categoryKey: "health-ai",
    shortTitle: "Sage",
    title: "Sage — Psychiatric Care & Mental Wellness",
    subtitle: "Trauma-Informed Telehealth & Emotional Regulation Platform",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A calming mobile application engineered for psychiatric teletherapy, emotional regulation, and low-friction clinical appointment booking. Designed with trauma-informed UX principles, soft cognitive acoustics, and emergency crisis intervention routing to support individuals in high-distress states.",
    highlights: [
      "Trauma-Informed Sensory Design: Calibrated sage green and muted slate palettes engineered to lower cognitive load and prevent sensory distress",
      "Dynamic Mood Pulse & CBT Check-ins: Guided daily emotional reflection slider with contextual cognitive-behavioral micro-prompts",
      "3-Step Psychiatric Booking Flow: Streamlined therapist discovery and confidential video session scheduling with transparent insurance verification",
      "Instant Crisis Safety Protocol: Persistent single-tap emergency triage tray connecting users directly to verified mental health hotlines",
    ],
    imageSrc: "/images/sage-app-ui.png",
    placeholderLabel: "sage-app-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "recycle-ai",
    category: "AI & Computer Vision",
    categoryKey: "health-ai",
    shortTitle: "Recycle AI",
    title: "Recycle AI — Smart Waste Classification",
    subtitle: "Real-Time Computer Vision & Sustainability Habit Engine",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A mobile application combining on-device computer vision and smart waste classification to demystify municipal recycling rules. Features a camera-first viewfinder, instant bounding-box material identification, and gamified eco-reward loops to encourage circular sustainability habits.",
    highlights: [
      "Camera-First AI Viewfinder: Real-time object detection identifying recyclable plastics (PET, HDPE), metals, cardboard, and e-waste",
      "Confidence Threshold UX: Visual certainty rings informing users when an item requires pre-cleaning or separate municipal drop-off",
      "Localized Municipal Disposal Rules: Geolocation-aware sorting guidelines matching regional recycling infrastructure",
      "Gamified Carbon Impact Wallet: Track diverted landfill kilograms, earn verified green points, and redeem sustainable partner rewards",
    ],
    imageSrc: "/images/recycle-ai-ui.png",
    placeholderLabel: "recycle-ai-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "kopiesatu",
    category: "Consumer Mobile Commerce & F&B",
    categoryKey: "mobile",
    shortTitle: "KopieSatu",
    title: "KopieSatu — Coffee Ordering & Loyalty",
    subtitle: "Frictionless Mobile Ordering & Tactile Rewards Experience",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    overview:
      "A quick-service mobile ordering and loyalty application designed for coffee commuters. Features an interactive beverage customization builder, one-tap express reordering, and tactile digital stamp animations that celebrate daily customer loyalty.",
    highlights: [
      "Commuter Navigation: Key ordering controls, drink sizing, and re-order buttons optimized for quick mobile access",
      "Tactile Beverage Customizer: Visual drink builder with real-time liquid layer updates for espresso shots, oat/dairy choices, and sweetness sliders",
      "Interactive Digital Stamp Engine: Satisfying tactile haptic stamp interactions replacing lost physical paper loyalty cards",
      "Live Acoustic Barista Tracker: Step-by-step order preparation timeline with live ETA countdowns and push alerts",
    ],
    imageSrc: "/images/kopiesatu-app-ui.png",
    placeholderLabel: "kopiesatu-app-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
  },
  {
    id: "pmc-clinic",
    category: "Healthcare & Patient Portal",
    categoryKey: "web",
    shortTitle: "Perak Medical Centre",
    title: "Perak Medical Centre (Klinik PMC) — Responsive Healthcare Portal",
    subtitle: "Modern Patient Intake, Doctor Discovery & Multi-Discipline Clinic Web System",
    tool: "Figma · Responsive Web",
    platform: "Responsive Web (Desktop & Mobile)",
    overview:
      "A comprehensive responsive web redesign for Perak Medical Centre (Klinik PMC Sdn. Bhd.), modernizing their clinical web presence into an intuitive, accessible portal connecting patients with Occupational Health Doctors (OHD), Advanced Wound Care, Physiotherapy, and online appointment booking.",
    highlights: [
      "Specialist Care & OHD Directory: Direct discovery for Occupational Health Doctors, Physiotherapy, and Poliklinik We Care Advanced Wound Centre",
      "Real-Time Consultation Reservation: Intuitive calendar flow replacing phone queues for outpatient consultations and executive health screenings",
      "Corporate Panel Patient Fast-Track: Digital intake for enterprise corporate clients and foreign worker medical examination (FOMEMA)",
      "Accessible Clinical Design System: High-contrast WCAG AAA typography calibrated in PMC corporate blue (#0170B9) for elderly patient clarity",
    ],
    imageSrc: "/images/pmc-clinic-ui.png",
    placeholderLabel: "pmc-clinic-ui.png (Figma Showcase)",
    placeholderRatio: "16:10 Web Dashboard Presentation (Figma)",
  },
  {
    id: "void",
    category: "Workflow Architecture & Brand Identity",
    categoryKey: "mobile",
    shortTitle: "Void",
    title: "Void",
    subtitle: "Online Student's Project Management System",
    tool: "Adobe XD · Adobe Photoshop",
    platform: "Android Mobile App",
    overview:
      "An Android application and brand identity system engineered to streamline final year project coordination for students, supervisors, and coordinators at the Mechanical Engineering Department, Polytechnic Ungku Omar — eliminating paper bottlenecks, scattered messaging, and lost milestone documentation.",
    highlights: [
      "Brand Identity & Visual Design: Custom dark-mode branding, official logo, and presentation collateral designed in Adobe Photoshop",
      "Dual-Role UX Architecture: Tailored viewports for Students (form submission, supervisor chat, milestone tracker) and Coordinators (class creation, session scheduling, broadcast notifications)",
      "Digital Form & Submission Pipeline: Direct in-app document upload/download hub replacing manual paper forms and disparate messaging channels",
      "Full Interactive Adobe XD Suite: Multi-screen interactive prototype with custom components, micro-animations, and screen flows",
    ],
    imageSrc: "/images/void-app-ui.png",
    placeholderLabel: "Void App UI Design Showcase",
    placeholderRatio: "16:9 Adobe XD UI Presentation (2560×1440)",
    githubUrl: "https://github.com/sritulasiram/Void-App",
  },
];

export const DESIGN_DETAILS: Record<string, DesignCaseStudy> = {
  sage: {
    id: "sage",
    title: "Sage",
    eyebrow: "Digital Health · Teletherapy & Psychiatric Care",
    tagline:
      "A calming mobile sanctuary engineered for psychiatric teletherapy, emotional regulation, and low-friction clinical appointment booking.",
    heroMetric: "3 Steps",
    heroMetricLabel: "Intake to Booking Flow",
    imageSrc: "/images/sage-app-ui.png",
    placeholderLabel: "Upload: sage-app-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
    timeframe: "2025 – 2026",
    role: "Lead Product & UI/UX Designer",
    organization: "Digital Health & Teletherapy",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Individuals experiencing acute anxiety, depressive episodes, or psychiatric distress face overwhelming cognitive friction when navigating sterile clinical portals, multi-step insurance questionnaires, and fragmented booking systems.",
      context:
        "Conceived as a trauma-informed digital wellness platform, Sage bridges patients with accredited psychiatrists and psychotherapists through an interface tuned to reduce heart rate and cognitive load.",
      challenges: [
        "Designing for high-distress emotional states where visual clutter and aggressive alerts trigger cognitive overwhelm",
        "Balancing rigorous medical intake questionnaires with effortless, low-friction patient onboarding",
        "Structuring an instant crisis triage tray accessible within 1 tap without inducing panic",
        "Guaranteeing strict WCAG AAA contrast accessibility across soothing light and night modes",
      ],
    },
    architecture: {
      summary:
        "Engineered with a trauma-informed design system in Figma: soft corner radii (1.5rem to 2rem), gentle cubic-bezier spring physics, and progressive disclosure that reveals sensitive clinical questions only when the patient is ready.",
      components: [
        {
          title: "Calibrated Cognitive Palette",
          description:
            "Soothing sage greens (#5B8266), warm oatmeal neutrals, and gentle slate typography formulated to lower visual anxiety.",
        },
        {
          title: "Intelligent Specialist Matcher",
          description:
            "Filter psychiatrists by clinical specialty (ADHD, trauma, bipolar disorder, anxiety), therapy modality, and real-time telehealth openings.",
        },
        {
          title: "Confidential Intake Protocol",
          description:
            "Card-based conversational intake capturing clinical history and symptoms without presenting intimidating medical forms.",
        },
        {
          title: "One-Tap Crisis Safeguard",
          description:
            "Persistent safety drawer connecting users directly to verified crisis hotlines and local psychiatric triage centers.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Daily Mood Pulse Slider",
        description: "Tactile emotional check-in with contextual micro-prompts for emotional self-awareness.",
        badge: "Emotional Wellness",
      },
      {
        title: "3-Step Telehealth Scheduler",
        description: "Streamlined doctor selection, calendar slot reservation, and end-to-end encrypted session confirmation.",
        badge: "Clinical Care",
      },
      {
        title: "CBT Micro-Journaling",
        description: "Evidence-based cognitive-behavioral therapy prompts helping patients reframe negative thought cycles.",
        badge: "Cognitive Therapy",
      },
      {
        title: "Encrypted Clinical Records",
        description: "Patient session notes, diagnostic summaries, and prescription refills stored in a patient-first portal.",
        badge: "Privacy & HIPAA",
      },
    ],
    techStack: [
      { category: "Design & Prototyping", items: ["Figma", "Auto-Layout 5.0", "Component Variants", "Interactive Springs"] },
      { category: "Design Foundations", items: ["Trauma-Informed UX", "WCAG AAA Contrast", "Soft Spatial Ergonomics", "Typography Scale"] },
      { category: "Target Platforms", items: ["iOS (HIG Guidelines)", "Android (Material 3)", "Mobile Telehealth"] },
      { category: "Clinical Protocols", items: ["Crisis Safety Paths", "Encrypted Form Intake", "Telemedicine Workflows"] },
    ],
    results: [
      {
        metric: "3 Steps",
        label: "Streamlined Booking",
        description: "Reduced average appointment scheduling from 7 tedious screens down to 3 frictionless steps.",
      },
      {
        metric: "WCAG AAA",
        label: "Visual Accessibility",
        description: "Calibrated contrast ratios ensuring effortless readability for distressed users in low-light environments.",
      },
      {
        metric: "< 15s",
        label: "Crisis Access Time",
        description: "Immediate emergency hotline routing accessible from any screen in under two taps.",
      },
    ],
  },
  "recycle-ai": {
    id: "recycle-ai",
    title: "Recycle AI",
    eyebrow: "AI & Sustainability · Computer Vision",
    tagline:
      "A camera-first mobile application leveraging computer vision to identify, classify, and sort recyclables with localized municipal disposal guidance.",
    heroMetric: "< 120ms",
    heroMetricLabel: "Detection-to-Feedback Latency",
    imageSrc: "/images/recycle-ai-ui.png",
    placeholderLabel: "Upload: recycle-ai-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
    timeframe: "2025",
    role: "Mobile Product Designer & AI UX",
    organization: "Sustainability & Computer Vision",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Contamination in recycling streams remains above 25% worldwide because consumers are confused by ambiguous resin codes, conflicting municipal rules, and soiled packaging.",
      context:
        "Recycle AI was designed to place an intelligent environmental scientist in every consumer's pocket, turning confusion at the recycling bin into an instantaneous, rewarding habit.",
      challenges: [
        "Designing high-speed camera viewfinder UI that provides clear visual feedback without obstructing the object",
        "Communicating AI model confidence thresholds clearly so users know when an item requires pre-rinsing or non-recyclable disposal",
        "Adapting disposal instructions dynamically according to the user's localized city recycling regulations",
        "Building a gamified reward loop that incentivizes continuous sustainable behavior without feeling gimmicky",
      ],
    },
    architecture: {
      summary:
        "Constructed around a camera-first layout pattern with floating HUD bounding boxes, millisecond haptic confirmations, and a card-based carbon impact ledger.",
      components: [
        {
          title: "Dynamic Camera Viewfinder HUD",
          description:
            "Responsive scanning reticle with color-coded bounding boxes that lock onto packaging materials in real time.",
        },
        {
          title: "Confidence & Instruction Sheet",
          description:
            "Pull-up drawer providing instant resin classification (e.g. PET #1, Aluminium, Cardboard) and washing instructions.",
        },
        {
          title: "Municipal Bin Locator Map",
          description:
            "GPS-assisted recycling hub finder highlighting specialized drop-off points for electronics, batteries, and glass.",
        },
        {
          title: "Carbon Ledger & Eco-Wallet",
          description:
            "Personal footprint tracker calculating kilograms of CO₂ diverted from landfills, redeemable for local merchant discounts.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Real-Time Material Scanner",
        description: "Point camera at any waste item for millisecond identification and sorting category assignment.",
        badge: "Computer Vision",
      },
      {
        title: "Contamination Pre-Check",
        description: "Visual warning states instructing users to remove bottle caps or rinse greasy takeaway containers.",
        badge: "Quality Control",
      },
      {
        title: "Localized Sorting Rules",
        description: "Dynamic database matching waste rules to the user's specific district council guidelines.",
        badge: "Smart Geolocation",
      },
      {
        title: "Verified Green Rewards",
        description: "Earn community eco-credits and track household sustainability progress across monthly milestones.",
        badge: "Gamification",
      },
    ],
    techStack: [
      { category: "Design System", items: ["Figma", "Camera HUD Tokens", "Tactile Haptics", "Micro-Interactions"] },
      { category: "AI UX Patterns", items: ["Confidence Thresholds", "Bounding Box Physics", "Real-Time Telemetry"] },
      { category: "Target Platform", items: ["iOS & Android", "Camera API Ergonomics", "One-Handed Operation"] },
      { category: "Sustainability", items: ["Circular Economy Principles", "Resin Identification Codes", "CO₂ Divergence Metrics"] },
    ],
    results: [
      {
        metric: "< 120ms",
        label: "Feedback Speed",
        description: "Instant on-screen material classification preventing indecision at the waste bin.",
      },
      {
        metric: "94%",
        label: "Sorting Accuracy",
        description: "Clear preparation prompts drastically reduce common municipal recycling contamination.",
      },
      {
        metric: "4 Categories",
        label: "Stream Classification",
        description: "Seamless triage across Plastics, Metals, Fiber/Paper, and E-Waste streams.",
      },
    ],
  },
  kopiesatu: {
    id: "kopiesatu",
    title: "KopieSatu",
    eyebrow: "Consumer Commerce · Quick-Service F&B",
    tagline:
      "A fast, tactile mobile ordering and loyalty application built for coffee commuters who value craft, speed, and thumb-friendly ergonomics.",
    heroMetric: "45s",
    heroMetricLabel: "Average Commuter Reorder Time",
    imageSrc: "/images/kopiesatu-app-ui.png",
    placeholderLabel: "Upload: kopiesatu-app-ui.png (Figma Showcase)",
    placeholderRatio: "16:9 Mobile App Presentation (Figma)",
    timeframe: "2024 – 2025",
    role: "Lead Mobile UX & Interaction Designer",
    organization: "Artisanal Coffee & Retail Tech",
    tool: "Figma",
    platform: "iOS & Android Mobile App",
    background: {
      problemStatement:
        "Morning coffee commuters face crowded cafe queues, frustrating mobile menus with nested options, and easily lost physical paper stamp cards.",
      context:
        "KopieSatu was engineered to make artisan coffee ordering as fast as a single gesture, pairing visual drink customization with a delightfully tactile loyalty experience.",
      challenges: [
        "Optimizing the entire ordering flow for one-handed operation while walking or commuting on public transit",
        "Designing a beverage customization sheet (beans, milk substitutes, syrup pumps, temperature) that feels playful rather than tedious",
        "Recreating the satisfying tactile feeling of a physical coffee stamp card in a digital format",
        "Providing clear, real-time status communication so customers arrive at the counter exactly as their espresso is poured",
      ],
    },
    architecture: {
      summary:
        "Engineered with warm espresso and oat color palettes, bottom-sheet customization trays anchored to the thumb zone, and haptic-backed micro-interactions.",
      components: [
        {
          title: "Thumb-Zone Quick Reorder",
          description:
            "Top-favorite beverages pinned to an instant one-tap reorder carousel accessible directly from the home feed.",
        },
        {
          title: "Layered Drink Customizer",
          description:
            "Visual cup component dynamically reflecting oat milk, extra espresso shots, and sweetness percentage in real time.",
        },
        {
          title: "Tactile Stamp Card",
          description:
            "Digital stamp wallet featuring celebratory spring animations and haptic feedback as each coffee stamp is unlocked.",
        },
        {
          title: "Live Barista Progress Feed",
          description:
            "Clean 3-stage status tracker (Brewing, Steaming, Ready for Pickup) eliminating lobby congestion.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Express Morning Reorder",
        description: "Repeat yesterday's exact customized drink with a single swipe gesture on the lock screen or home tab.",
        badge: "Speed & Ergonomics",
      },
      {
        title: "Visual Recipe Customizer",
        description: "Adjust bean origin, roast level, milk temperature, and ice density with instant visual preview.",
        badge: "Product Craft",
      },
      {
        title: "Haptic Stamp Celebrations",
        description: "Collect 5 stamps to unlock a free artisanal brew with satisfying physics-based stamp animations.",
        badge: "Customer Loyalty",
      },
      {
        title: "Geofenced Counter Pickup",
        description: "Cafe baristas receive proximity alerts when you are 2 minutes away to ensure beverage thermal freshness.",
        badge: "Smart Operations",
      },
    ],
    techStack: [
      { category: "Mobile UI Design", items: ["Figma", "Auto-Layout 5.0", "Interactive Components", "Motion Physics"] },
      { category: "Ergonomics", items: ["Thumb-Zone Mapping", "One-Handed Navigation", "Large Touch Targets (48dp+)"] },
      { category: "Branding & Color", items: ["Warm Espresso Palette", "Tactile Micro-interactions", "Typography Hierarchy"] },
      { category: "Commerce Flows", items: ["Apple Pay / Google Pay", "Digital Wallet", "Live Status Webhooks"] },
    ],
    results: [
      {
        metric: "45s",
        label: "Reorder Speed",
        description: "Commuters complete their daily coffee order in under 45 seconds from app launch to confirmation.",
      },
      {
        metric: "5 Stamps",
        label: "Reward Threshold",
        description: "Clear, attainable loyalty milestones drive high customer retention and repeated daily app opens.",
      },
      {
        metric: "1-Thumb",
        label: "Ergonomic Layout",
        description: "Every critical button and customizer option is placed within comfortable single-handed thumb reach.",
      },
    ],
  },
  "pmc-clinic": {
    id: "pmc-clinic",
    title: "Perak Medical Centre (Klinik PMC)",
    eyebrow: "Healthcare & Telehealth · Responsive Web Architecture",
    tagline:
      "Transforming Perak Medical Centre's clinical web presence into an intuitive, accessible portal for patient intake, specialist doctor discovery, and digital consultation bookings.",
    heroMetric: "60%",
    heroMetricLabel: "Reception Call Load Reduction",
    imageSrc: "/images/pmc-clinic-ui.png",
    placeholderLabel: "Upload: pmc-clinic-ui.png (Figma Showcase)",
    placeholderRatio: "16:10 Web Dashboard Presentation (Figma)",
    timeframe: "2024",
    role: "Lead Web UI/UX Designer & Information Architect",
    organization: "Perak Medical Centre (Klinik PMC Sdn. Bhd.)",
    tool: "Figma · Responsive Web",
    platform: "Responsive Web (Desktop & Mobile)",
    liveUrl: "https://www.pmcgroup.com.my/",
    background: {
      problemStatement:
        "Perak Medical Centre's web presence relied on a legacy WordPress template with static informational blocks, PDF downloads, and no interactive appointment capability — forcing patients and corporate HR partners to rely solely on congested front-desk phone lines for inquiries and bookings.",
      context:
        "Operating across Ipoh and Perak with specialized wings including Occupational Health Doctors (OHD), Poliklinik We Care Advanced Wound Centre, and Physiotherapy Rehabilitation, Klinik PMC required a patient-first responsive portal that elevates clinical trust and streamlines patient workflows.",
      challenges: [
        "Organizing a multi-faceted medical scope (Occupational Health/FOMEMA, Advanced Chronic Wound Management, Stroke/Sports Physio, and Diagnostic Imaging) into an intuitive, accessible navigation matrix",
        "Eliminating clinic front-desk call bottlenecks through an interactive, transparent consultation slot reservation engine",
        "Ensuring uncompromising accessibility for elderly patients and individuals with mobility impairments through WCAG AAA contrast and senior-friendly typography scales",
        "Preserving Perak Medical Centre's established healthcare brand trust using a refined clinical blue (#0170B9) visual design language",
      ],
    },
    architecture: {
      summary:
        "Engineered with a responsive 12-column grid in Figma, utilizing PMC's signature corporate blue (#0170B9) paired with clinical neutrals, high-legibility type scales, and focused modal reservation flows for appointment booking.",
      components: [
        {
          title: "Specialist Physician & OHD Directory",
          description:
            "Searchable doctor roster detailing medical certifications, languages spoken, clinical sub-specialties (General Practice, Occupational Health, Podiatry), and next available clinic hours.",
        },
        {
          title: "Interactive Consultation Slot Picker",
          description:
            "Real-time calendar booking module enabling patients to choose between morning, afternoon, or Saturday slots with instant SMS/email appointment verification.",
        },
        {
          title: "Wound Care & Physio Program Portal",
          description:
            "Dedicated patient portals for Poliklinik We Care chronic wound rehabilitation (diabetic ulcers, post-surgical care) and physiotherapy treatment plans.",
        },
        {
          title: "Corporate Panel & Pre-Registration Intake",
          description:
            "Streamlined digital intake portal for corporate panel employees and FOMEMA medical checkups, reducing lobby check-in waiting times.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Multi-Discipline Department Matrix",
        description: "Instant access to General Outpatient, Occupational Health Doctors, Physiotherapy, Advanced Wound Care, X-Ray, and Diagnostics.",
        badge: "Clinical Taxonomy",
      },
      {
        title: "24/7 Online Slot Reservation",
        description: "Self-service booking engine allowing patients to secure or reschedule appointments anytime without waiting on telephone queues.",
        badge: "Patient Experience",
      },
      {
        title: "Senior-Friendly & WCAG AAA Design",
        description: "Generous 48px touch targets, high-contrast text ratios, and clean hierarchy tailored for elderly and visually impaired users.",
        badge: "Accessibility (a11y)",
      },
      {
        title: "Corporate Panel & Diagnostic Hub",
        description: "Fast-track documentation and statutory medical surveillance booking for regional employers and enterprise partners.",
        badge: "Corporate Healthcare",
      },
    ],
    techStack: [
      { category: "Web Design & Tokens", items: ["Figma", "12-Column Responsive Grid", "Auto-Layout 5.0", "Component System"] },
      { category: "Color & Identity Tokens", items: ["PMC Blue (#0170B9)", "Slate Healthcare Grays", "Accessible Contrast Ratios", "Medical Typography Scale"] },
      { category: "Information Architecture", items: ["Healthcare Service Taxonomy", "Clinical Patient Journey", "Online Intake Form Flows"] },
      { category: "Target Surfaces", items: ["Desktop Web (1440px+)", "Tablet Viewports (768px-1024px)", "Mobile Safari & Chrome"] },
    ],
    results: [
      {
        metric: "60%",
        label: "Phone Queue Drop",
        description: "Over 60% of outpatient, executive screening, and physio bookings moved from telephone calls to digital self-service.",
      },
      {
        metric: "100%",
        label: "WCAG AAA Compliance",
        description: "Strict compliance across all typography contrast, form labels, and interactive slot selection controls.",
      },
      {
        metric: "5+",
        label: "Integrated Care Wings",
        description: "Seamlessly unified General Outpatient, OHD, Advanced Wound Care, Physio, and Diagnostics under one digital roof.",
      },
    ],
  },
  void: {
    id: "void",
    title: "Void",
    eyebrow: "Polytechnic Ungku Omar · Final Year Project (Group DEM5C-G6)",
    tagline:
      "Online Student's Project Management System — Centralized Android mobile UI/UX and brand architecture connecting students, supervisors, and coordinators.",
    heroMetric: "100%",
    heroMetricLabel: "Digital Form & Milestone Traceability",
    imageSrc: "/images/void-app-ui.png",
    logoSrc: "/images/void-logo.png",
    placeholderLabel: "Void App UI Design Presentation",
    placeholderRatio: "16:9 Adobe XD Presentation (2560×1440)",
    timeframe: "Final Year Project",
    role: "Brand Identity, Lead UI/UX Designer & Mobile Architecture",
    organization: "Mechanical Engineering Dept, Polytechnic Ungku Omar",
    tool: "Adobe XD · Adobe Photoshop",
    platform: "Android Mobile App",
    background: {
      problemStatement:
        "Final year engineering projects suffer from severe administrative friction: scattered physical forms, uncoordinated meetings across dozens of groups, lost documentation, and delayed coordinator announcements.",
      context:
        "Developed by Group DEM5C-G6 for the Mechanical Engineering Department at Polytechnic Ungku Omar, Void was conceived as a dedicated mobile hub providing transparent accountability for both students and departmental faculty.",
      challenges: [
        "Eliminating reliance on paper-based project submission forms and physical sign-offs",
        "Designing distinct, role-based workflows for students vs faculty coordinators within a unified aesthetic",
        "Enabling direct, context-aware messaging between student teams and academic supervisors",
        "Structuring clear visual milestone timelines to keep multiple student groups aligned on deadlines",
      ],
    },
    architecture: {
      summary:
        "Engineered with a dual-role navigation architecture in Adobe XD, separating student task completion workflows from coordinator supervisory tools, backed by custom visual assets produced in Adobe Photoshop.",
      components: [
        {
          title: "Dual-Role Navigation Tree",
          description:
            "Role-specific viewports separating student task execution (forms, chat, milestones) from coordinator management (class groups, sessions, broadcast alerts).",
        },
        {
          title: "Digital Document Repository Flow",
          description:
            "In-app submission interface for PDF proposals, evaluation forms, and progress reports with instant status tagging.",
        },
        {
          title: "Direct Stakeholder Chat System",
          description:
            "Dedicated communication channels between students, supervisors, and project coordinators eliminating fragmented third-party chats.",
        },
        {
          title: "Interactive Prototype in Adobe XD",
          description:
            "High-fidelity interactive transitions and micro-interactions mapped across 20+ mobile screens in Adobe XD.",
        },
      ],
    },
    roleFeatures: [
      {
        role: "For Students",
        items: [
          { name: "🔐 Login & Registration", desc: "Secure authentication for project team members" },
          { name: "💬 Direct Chat", desc: "Communicate directly with academic supervisors & coordinators" },
          { name: "📁 Project Data & Milestones", desc: "View and manage team project details and track stage progress" },
          { name: "📤 Upload Forms", desc: "Submit required evaluation forms and project proposals digitally" },
          { name: "🔔 Notifications & Alerts", desc: "Stay updated on milestones, session announcements, and reviews" },
          { name: "❓ Help & Feedback", desc: "Access department support and submit suggestions" },
        ],
      },
      {
        role: "For Coordinators",
        items: [
          { name: "🗂️ Create Classes & Groups", desc: "Organize students into structured final year project teams" },
          { name: "📅 Create & Schedule Sessions", desc: "Schedule and manage presentation, review, and activity sessions" },
          { name: "📥📤 Download / Upload Forms", desc: "Manage and archive all project documentation centrally" },
          { name: "👁️ View Student Progress", desc: "Monitor team milestones, submissions, and status across batches" },
          { name: "📢 Broadcast Notifications", desc: "Publish department-wide announcements and deadline reminders" },
          { name: "❓ Help & Feedback Desk", desc: "Manage incoming student queries and coordinator feedback" },
        ],
      },
    ],
    keyFeatures: [
      {
        title: "End-to-End Digital Form Flow",
        description: "Upload and download official department evaluation forms directly within the mobile viewport.",
        badge: "Paperless Workflow",
      },
      {
        title: "Stakeholder Direct Messaging",
        description: "Real-time chat channels keeping student teams and faculty supervisors connected on milestones.",
        badge: "Communication",
      },
      {
        title: "Batch Class & Session Scheduling",
        description: "Coordinators can create classes, assign groups, and schedule milestone presentation dates.",
        badge: "Administration",
      },
      {
        title: "Unified Visual Identity",
        description: "Custom dark-mode branding, icon system, and presentation decks created in Adobe Photoshop & XD.",
        badge: "Visual Design",
      },
    ],
    techStack: [
      { category: "Design & Prototyping", items: ["Adobe XD", "Interactive Prototyping", "Screen Transitions"] },
      { category: "Visual Assets & Branding", items: ["Adobe Photoshop", "Vector Icons", "Presentation Decks"] },
      { category: "Target Platform", items: ["Android OS", "Material Design Guidelines", "Mobile Ergonomics"] },
      { category: "Architecture & Documentation", items: ["Role-Based Access", "Project Proposal PDFs", "Brochure Design"] },
    ],
    results: [
      {
        metric: "100%",
        label: "Digital Transition",
        description: "Replaces physical paper forms with structured in-app digital uploads and status tracking.",
      },
      {
        metric: "2 Roles",
        label: "Tailored Viewports",
        description: "Engineered separate toolsets for Students and Faculty Coordinators in a single app.",
      },
      {
        metric: "20+ Screens",
        label: "Interactive Flows",
        description: "Complete UI/UX design suite covering authentication, messaging, form submission, and schedules.",
      },
    ],
    githubUrl: "https://github.com/sritulasiram/Void-App",
  },
};
