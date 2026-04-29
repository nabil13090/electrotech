import { Metadata } from "next";
import { Wind } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Climatisation - Electrotech Marseille",
  description: "Installation et maintenance de systèmes de climatisation réversible. Pompe à chaleur, installation gainable, maintenance préventive.",
};

export default function ClimatisationPage() {
  return (
    <ServiceDetailTemplate
      title="Climatisation"
      subtitle="Installation et maintenance de systèmes de climatisation réversible pour un confort toute l'année."
      bannerImage="/images/climatisation.png"
      icon={<Wind className="w-8 h-8" />}
      services={[
        "Climatisation réversible",
        "Pompe à chaleur air/air",
        "Pompe à chaleur air/eau",
        "Installation gainable",
        "Climatisation split",
        "Maintenance préventive",
        "Dépannage climatisation",
        "Mise en service et réglage",
      ]}
      highlights={[
        {
          title: "Confort toute l'année",
          description:
            "Climatisation en été et chauffage en hiver avec un système unique et performant.",
        },
        {
          title: "Économies d'énergie",
          description:
            "Les solutions modernes permettent d'optimiser la consommation et de réduire votre facture.",
        },
        {
          title: "Intégration soignée",
          description:
            "Pose discrète et finition propre, en rénovation comme en neuf.",
        },
      ]}
      gallery={[
        { src: "/images/climatisation.png", alt: "Installation climatisation intérieure" },
        { src: "/images/depannage-renovation.png", alt: "Maintenance climatisation extérieure" },
      ]}
      ctaTitle="Besoin d'une climatisation ?"
      ctaText="Demandez votre devis gratuit pour votre projet de climatisation."
    />
  );
}
