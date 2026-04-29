import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import ClientsConfiance from "@/components/sections/ClientsConfiance";
import Illuminez from "@/components/sections/Illuminez";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

// ✅ [SEO | STATIC] : metadata dédiée à la page d'accueil
export const metadata: Metadata = {
  // ✅ SEO : titre exact (rich CTR) + template
  title: {
    default: "Électricien Marseille 13 | Dépannage 24h | Electrotech",
    template: "%s | Electrotech Marseille",
  },
  // ✅ SEO : meta description complète + mot-clé local
  description:
    "Électricien certifié à Marseille depuis 1984. Dépannage en moins de 24h, installation électrique, panneaux solaires, borne de recharge. Devis gratuit. ☎ 04 91 87 11 08",
  alternates: { canonical: "/" },
  // ✅ SEO : Open Graph complet
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://electrotech-sud.fr",
    siteName: "Electrotech",
    title: "Électricien Marseille 13 | Dépannage 24h | Electrotech",
    description:
      "Électricien certifié à Marseille depuis 1984. Dépannage en moins de 24h, installation électrique, panneaux solaires, borne de recharge. Devis gratuit.",
    images: [
      {
        url: "https://electrotech-sud.fr/images/logo.png",
        width: 512,
        height: 512,
        alt: "Electrotech — Électricien Marseille",
      },
    ],
  },
  // ✅ SEO : Twitter Card complet
  twitter: {
    card: "summary",
    title: "Électricien Marseille 13 | Electrotech",
    description:
      "Dépannage électrique en moins de 24h à Marseille. Devis gratuit.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Certifications />
      <Services />
      <About />
      <ClientsConfiance />
      <Illuminez />
      <Testimonials />
      <Stats />
      <CTA />
    </>
  );
}
