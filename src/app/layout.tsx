import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MoodProvider, NO_FLASH_SCRIPT } from "@/lib/theme";
import { SITE } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Keypad } from "@/components/Keypad";
import { JsonLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "architectural lighting design",
    "lighting automation",
    "KNX",
    "Lutron",
    "tunable white",
    "lighting control",
    "motorized shading",
    "smart home automation",
    "luxury lighting designer London",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="atmosphere" aria-hidden="true" />
        <MoodProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Keypad />
        </MoodProvider>
        <div className="grain" aria-hidden="true" />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
