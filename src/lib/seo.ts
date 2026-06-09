import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaArgs {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function pageMeta({ title, description, path }: PageMetaArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === "/" ? `${SITE.name} — ${SITE.tagline}` : `${title} — ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: `${SITE.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.svg"],
    },
  };
}

/** Organization + LocalBusiness JSON-LD (site-wide). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${SITE.url}/og.svg`,
    priceRange: "£££",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    areaServed: "United Kingdom",
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
    knowsAbout: [
      "Architectural lighting design",
      "Lighting automation",
      "KNX",
      "Lutron",
      "Tunable white lighting",
      "Motorized shading",
      "Home automation",
    ],
  };
}

export function serviceJsonLd(args: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    serviceType: args.name,
    url: `${SITE.url}${args.path}`,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: "United Kingdom",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
