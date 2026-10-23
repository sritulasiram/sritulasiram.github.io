import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";
import Navigation from "@/components/layout/Navigation";
import { CONTACT_DATA } from "@/data/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "Sri Tulasi Ram",
    template: "%s",
  },
  description:
    "Personal portfolio of Sri Tulasi Ram, Support Engineer at Cytron Technologies. Solving technical problems, refining internal systems, and building tools for robotics, electronics, and Raspberry Pi ecosystems.",
  keywords: [
    "Sri Tulasi Ram",
    "Sri Tulasi Ram Rajalingam",
    "sritulasiram",
    "sritulasiram.my",
    "Cytron Technologies",
    "Support Engineer",
    "Penang Malaysia",
    "Raspberry Pi Design Partner",
    "RMA Management System",
    "Hardware Diagnostics",
    "Engineering",
    "UI/UX Design",
    "Photography",
  ],
  authors: [{ name: "Sri Tulasi Ram", url: "https://sritulasiram.my" }],
  creator: "Sri Tulasi Ram",
  metadataBase: new URL("https://sritulasiram.my"),
  openGraph: {
    title: "Sri Tulasi Ram",
    description:
      "Support Engineer at Cytron Technologies. Solving technical problems, refining internal operations, and crafting digital tools.",
    url: "https://sritulasiram.my",
    siteName: "Sri Tulasi Ram",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/portraits/sri-portrait.webp",
        width: 1200,
        height: 630,
        alt: "Sri Tulasi Ram - Support Engineer at Cytron Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Tulasi Ram",
    description:
      "Support Engineer at Cytron Technologies. Solving technical problems, refining internal operations, and crafting digital tools.",
    images: ["/images/portraits/sri-portrait.webp"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sri Tulasi Ram",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sritulasiram.my/#person",
      "name": "Sri Tulasi Ram",
      "alternateName": [
        "Sri Tulasi Ram Rajalingam",
        "Tulasi Ram",
        "sritulasiram"
      ],
      "jobTitle": "Support Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Cytron Technologies",
        "url": "https://www.cytron.io"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Universiti Tun Hussein Onn Malaysia",
          "alternateName": "UTHM"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Politeknik Ungku Omar",
          "alternateName": "PUO"
        }
      ],
      "url": "https://sritulasiram.my",
      "image": "https://sritulasiram.my/images/portraits/sri-portrait.webp",
      "email": `mailto:${CONTACT_DATA.email}`,
      "sameAs": [
        "https://www.linkedin.com/in/sritulasiram",
        "https://github.com/sritulasiram",
        "https://instagram.com/iamsritulasiram"
      ],
      "knowsAbout": [
        "Hardware Diagnostics",
        "Raspberry Pi Ecosystems",
        "Embedded Systems",
        "Robotics & Electronics",
        "UI/UX Design",
        "Full-Stack Web Development",
        "Apple Human Interface Guidelines"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://sritulasiram.my/#website",
      "url": "https://sritulasiram.my",
      "name": "Sri Tulasi Ram",
      "alternateName": "Sri Tulasi Ram Portfolio",
      "description": "Personal portfolio of Sri Tulasi Ram, Support Engineer at Cytron Technologies.",
      "publisher": {
        "@id": "https://sritulasiram.my/#person"
      },
      "inLanguage": "en-US"
    }
  ]
};

/**
 * Build with NEXT_PUBLIC_MAINTENANCE_MODE=true to publish the whole site as the "upgrading" screen.
 * It is a build-time switch because the site is exported as static files.
 */
const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script
          key="theme-script"
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = document.documentElement;
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (!stored && prefersDark);
                  if (isDark) {
                    d.classList.add('dark');
                    d.style.colorScheme = 'dark';
                    d.style.backgroundColor = '#000000';
                  } else {
                    d.classList.remove('dark');
                    d.style.colorScheme = 'light';
                    d.style.backgroundColor = '#ffffff';
                  }
                  var color = isDark ? '#000000' : '#ffffff';
                  var metas = document.querySelectorAll('meta[name="theme-color"]');
                  for (var i = 0; i < metas.length; i++) {
                    metas[i].setAttribute('content', color);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#F5F5F7] font-sans selection:bg-[#0071e3]/15 selection:text-[#1d1d1f]"
      >
        <script
          key="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1D1D1F] focus:shadow-lg dark:focus:bg-[#1C1C1E] dark:focus:text-white focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          Skip to content
        </a>
        {MAINTENANCE_MODE ? (
          <MaintenanceScreen variant="upgrade" />
        ) : (
          <>
            <Navigation />
            <div className="animate-page-enter min-h-screen flex flex-col">
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
}
