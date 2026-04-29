import { Metadata } from "next";
import { Zap } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Installation Électrique CFO/CFA - Electrotech Marseille",
  description: "Installation électrique complète CFO/CFA pour vos projets neufs ou rénovation. Tableau électrique, éclairage, mise aux normes.",
};

export default function InstallationPage() {
  return (
    <ServiceDetailTemplate
      title="Installation Électrique CFO/CFA"
      subtitle="Installation complète CFO/CFA pour vos projets neufs ou rénovation, avec conformité stricte aux normes en vigueur."
      bannerImage="/images/installationelectrique.png"
      icon={<Zap className="w-8 h-8" />}
      services={[
        "Installation complète neuve",
        "Mise aux normes électriques",
        "Tableau électrique et disjoncteurs",
        "Éclairage intérieur et extérieur",
        "Prises et interrupteurs",
        "Ventilation et VMC",
        "Chauffage électrique",
        "Domotique et automatismes",
      ]}
      highlights={[
        {
          title: "Conformité aux normes",
          description:
            "Toutes nos installations respectent la norme NF C 15-100 et les obligations réglementaires.",
        },
        {
          title: "Expertise terrain",
          description:
            "Plus de 40 ans d'expérience en installation électrique résidentielle et professionnelle.",
        },
        {
          title: "Bureau d'études intégré",
          description:
            "Nous dimensionnons vos installations pour la performance, la sécurité et l'évolutivité.",
        },
      ]}
      gallery={[
        { src: "/images/installationelectrique.png", alt: "Réalisation installation électrique" },
        { src: "/images/depannage-renovation.png", alt: "Tableau électrique et rénovation" },
      ]}
      ctaTitle="Besoin d'une installation électrique ?"
      ctaText="Demandez votre devis gratuit et sans engagement."
    />
  );
}
