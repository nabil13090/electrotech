import { Metadata } from "next";
import { Shield } from "lucide-react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Alarme & Vidéosurveillance - Electrotech Marseille",
  description: "Systèmes de sécurité et vidéosurveillance pour protéger vos biens. Alarme intrusion, télésurveillance, contrôle d'accès.",
};

export default function AlarmePage() {
  return (
    <ServiceDetailTemplate
      title="Alarme & Vidéosurveillance"
      subtitle="Systèmes de sécurité et vidéosurveillance adaptés à vos locaux et à vos usages."
      bannerImage="/images/alarme.png"
      icon={<Shield className="w-8 h-8" />}
      services={[
        "Alarme intrusion complète",
        "Vidéosurveillance IP",
        "Télésurveillance 24/7",
        "Contrôle d'accès",
        "Détecteurs de mouvement",
        "Caméras intérieures et extérieures",
        "Centrale d'alarme connectée",
        "Maintenance et SAV",
      ]}
      highlights={[
        {
          title: "Solutions sur mesure",
          description:
            "Chaque installation est conçue selon la configuration des lieux et vos contraintes de sécurité.",
        },
        {
          title: "Technologies modernes",
          description:
            "Pilotage mobile, alertes en temps réel et caméras haute définition pour une surveillance efficace.",
        },
        {
          title: "Accompagnement complet",
          description:
            "Conseil, installation, paramétrage et maintenance pour garantir une protection durable.",
        },
      ]}
      gallery={[
        { src: "/images/alarme.png", alt: "Installation caméra de vidéosurveillance" },
        { src: "/images/alarme&videosurveillance.webp", alt: "Système alarme et contrôle d'accès" },
      ]}
      ctaTitle="Besoin d'un système de sécurité ?"
      ctaText="Protégez vos biens avec une solution d'alarme et vidéosurveillance sur mesure."
    />
  );
}
