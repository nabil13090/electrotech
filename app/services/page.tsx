import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Nos Services - Electrotech Marseille",
  description: "Découvrez tous nos services électriques : installation, dépannage, rénovation, climatisation, alarmes, panneaux solaires, bornes de recharge.",
};

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/images/Métiers_du_bâtiment_et_vidéo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/65 via-dark-800/50 to-dark-900/65" />
        <div className="relative z-10 h-full container mx-auto px-4 flex items-center justify-center text-center pt-20">
          <div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Nos Services</h1>
            <p className="text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Des solutions électriques complètes pour tous vos besoins, de l'installation à la maintenance
            </p>
          </div>
        </div>
      </section>

      <Services />

      <div className="container mx-auto px-4 pb-20 -mt-6 text-center">
        <Link
          href="/devis"
          className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          Demander un devis gratuit
          <ArrowRight className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
