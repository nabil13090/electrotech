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
  title: "Électricien à Marseille — Electrotech",
  description:
    "Electrotech, électricien à Marseille : installation, dépannage, rénovation électrique, climatisation et sécurité pour particuliers et professionnels.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Électricien à Marseille — Electrotech",
    description:
      "Interventions électriques rapides et fiables à Marseille depuis 1984.",
    url: "/",
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
