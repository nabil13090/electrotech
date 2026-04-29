import { Metadata } from "next";
import { Sun } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Panneaux Solaires Photovoltaïques - Electrotech Marseille",
  description: "Installation de panneaux photovoltaïques pour l'autoconsommation. Réduisez votre facture énergétique et produisez votre propre électricité.",
};

export default function PanneauxSolairesPage() {
  return (
    <ServiceDetailTemplate
      title="Panneaux Solaires"
      subtitle="Installation photovoltaïque pour autoconsommation, économies et valorisation durable de votre patrimoine."
      bannerImage="/images/panneauxsolaire.png"
      icon={<Sun className="w-8 h-8" />}
      services={[
        "Panneaux photovoltaïques",
        "Autoconsommation",
        "Revente d'électricité (EDF OA)",
        "Étude de faisabilité gratuite",
        "Installation complète",
        "Onduleur et monitoring",
        "Maintenance et entretien",
        "Aides et subventions",
      ]}
      highlights={[
        {
          title: "Économies importantes",
          description:
            "Réduisez durablement vos dépenses énergétiques grâce à une production locale et maîtrisée.",
        },
        {
          title: "Production valorisée",
          description:
            "Vous consommez votre énergie et pouvez revendre le surplus selon votre stratégie.",
        },
        {
          title: "Accompagnement global",
          description:
            "Étude, installation, mise en service et suivi des performances par une équipe experte.",
        },
      ]}
      gallery={[
        { src: "/images/panneauxsolaire.jpg", alt: "Installation panneaux solaires sur toiture" },
        { src: "/images/panneauxsolairechamps.jpg", alt: "Réalisation panneaux solaires en champ" },
      ]}
      ctaTitle="Intéressé par le solaire ?"
      ctaText="Demandez une étude de faisabilité gratuite pour votre projet photovoltaïque."
    />
  );
}
