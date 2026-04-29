/**
 * ✅ AJOUTÉ SEO/SEC : JSON-LD (Organization + WebSite) et helpers schema.org
 */

const defaultSite = "https://electrotech-sud.fr";

export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
    defaultSite
  );
}

export function organizationSchema(sameAs: string[] = []) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Electrotech",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/images/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs,
  };
}

export function websiteSchema() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: "Electrotech",
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "fr-FR",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function articleSchema(args: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  urlPath: string;
}) {
  const base = getSiteUrl();
  const path = args.urlPath.startsWith("/") ? args.urlPath : `/${args.urlPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}${path}` },
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "fr-FR",
  };
}

// ✅ AJOUTÉ SEO/SEC : helper FAQPage pour pages avec FAQ
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default function JsonLd() {
  const org = organizationSchema();
  const web = websiteSchema();

  // ✅ SEO : Schema LocalBusiness (rich snippets Google: étoiles, tel, horaires)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "@id": "https://electrotech-sud.fr/#business",
    name: "Electrotech",
    description:
      "Électricien certifié à Marseille depuis 1984. Installation électrique, dépannage, panneaux solaires, borne de recharge IRVE, climatisation.",
    url: "https://electrotech-sud.fr",
    telephone: "+33491871108",
    email: "contact@electrotech13.fr",
    foundingDate: "1984",
    priceRange: "€€",
    image: "https://electrotech-sud.fr/images/logo.png",
    logo: {
      "@type": "ImageObject",
      url: "https://electrotech-sud.fr/images/logo.png",
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "58 Traverse des Marronniers",
      addressLocality: "Marseille",
      postalCode: "13012",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.3075765,
      longitude: 5.4754702,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "Urgences uniquement",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "542",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Marseille" },
      { "@type": "City", name: "Aix-en-Provence" },
      { "@type": "City", name: "Aubagne" },
      { "@type": "City", name: "Cassis" },
      { "@type": "City", name: "La Ciotat" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services électriques",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Installation Électrique CFO/CFA",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dépannage électrique 24h",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Installation Panneaux Solaires",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Borne de Recharge IRVE",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Climatisation réversible",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Alarme & Vidéosurveillance",
          },
        },
      ],
    },
    sameAs: ["https://www.google.fr/maps/place/Electrotech/@43.3075804,5.4728953"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // ✅ AJOUTÉ SEO/SEC : Organization
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        // ✅ AJOUTÉ SEO/SEC : WebSite
        dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }}
      />
      <script
        type="application/ld+json"
        // ✅ SEO : injection LocalBusiness/ ElectricalContractor
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
