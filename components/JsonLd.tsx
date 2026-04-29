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
    </>
  );
}
