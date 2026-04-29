import { Metadata } from "next";
import { Battery } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Borne de Recharge Véhicule Électrique - Electrotech Marseille",
  description: "Installation de bornes de recharge pour véhicules électriques. Borne domestique et professionnelle, installation complète, mise en service.",
};

export default function BornesRechargePage() {
  return (
    <ServiceDetailTemplate
      title="Borne de Recharge"
      subtitle="Installation de bornes de recharge adaptées à votre véhicule, vos usages et votre puissance disponible."
      bannerImage="/images/bornederecharge.png"
      icon={<Battery className="w-8 h-8" />}
      services={[
        "Borne de recharge domestique",
        "Borne de recharge professionnelle",
        "Installation complète",
        "Mise en service et configuration",
        "Borne connectée et intelligente",
        "Conformité IRVE",
        "Maintenance et SAV",
        "Aides et subventions",
      ]}
      highlights={[
        {
          title: "Certification IRVE",
          description:
            "Nos installations sont réalisées selon les exigences techniques et réglementaires IRVE.",
        },
        {
          title: "Dimensionnement adapté",
          description:
            "Nous proposons la bonne puissance et le bon matériel selon vos habitudes de recharge.",
        },
        {
          title: "Accompagnement aides",
          description:
            "Nous vous guidons dans les dispositifs d'aide disponibles pour réduire le coût d'installation.",
        },
      ]}
      gallery={[
        { src: "/images/bornederecharge.png", alt: "Installation borne de recharge murale" },
        { src: "/images/installationelectrique.png", alt: "Raccordement électrique borne de recharge" },
      ]}
      ctaTitle="Besoin d'une borne de recharge ?"
      ctaText="Demandez votre devis gratuit pour votre installation IRVE."
    />
  );
}
