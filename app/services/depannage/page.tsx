import { Metadata } from "next";
import { Wrench } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Dépannage & Rénovation Électrique - Electrotech Marseille",
  description: "Intervention rapide en moins de 24h pour tous vos dépannages électriques. Rénovation, remplacement d'équipements, diagnostic.",
};

export default function DepannagePage() {
  return (
    <ServiceDetailTemplate
      title="Dépannage & Rénovation"
      subtitle="Intervention rapide pour vos pannes, rénovations et mises en sécurité électriques."
      bannerImage="/images/depannage-renovation.png"
      icon={<Wrench className="w-8 h-8" />}
      services={[
        "Dépannage d'urgence 24/7",
        "Rénovation électrique complète",
        "Remplacement d'équipements défectueux",
        "Diagnostic complet de l'installation",
        "Mise en sécurité de l'installation",
        "Remplacement de tableau électrique",
        "Rénovation de l'éclairage",
        "Mise aux normes",
      ]}
      highlights={[
        {
          title: "Réactivité",
          description:
            "Intervention rapide pour limiter l'arrêt de votre activité ou l'inconfort à domicile.",
        },
        {
          title: "Diagnostic précis",
          description:
            "Nous identifions la cause réelle du problème avant toute réparation pour éviter les récidives.",
        },
        {
          title: "Solutions durables",
          description:
            "Nos réparations et rénovations sont pensées pour la fiabilité et la sécurité sur le long terme.",
        },
      ]}
      gallery={[
        { src: "/images/depannage-renovation.png", alt: "Intervention dépannage électrique" },
        { src: "/images/installationelectrique.png", alt: "Rénovation intérieure électrique" },
      ]}
      ctaTitle="Besoin d'un dépannage électrique ?"
      ctaText="Contactez-nous pour une intervention rapide et un diagnostic fiable."
    />
  );
}
