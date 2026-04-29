"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ClientsConfiance = () => {
  // Sélection de logos clients pour la page d'accueil
  const featuredClients = [
    "Airbus-Logo.avif",
    "EDF-Electricite-de-France-Logo.avif",
    "ENGIE_logotype_2018.avif",
    "Vinci-Construction-Logo-300x300-1.webp",
    "Bouygues_Construction_logo_svg.avif",
    "sncf_2005.avif",
    "Ikea_logo_svg.avif",
    "1280px-Assistance_publique_-_Hopitaux_de_Marseille_logo_2020_svg.avif",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
            Ils nous ont fait confiance, pourquoi pas vous ?
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Des entreprises renommées nous font confiance pour leurs projets
            électriques
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          {featuredClients.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-24"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/images/confiance/${logo}`}
                  alt={logo.replace(/\.(avif|webp)$/i, "").replace(/_/g, " ")}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/nos-clients"
            className="inline-flex items-center px-6 py-3 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Voir tous nos clients
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsConfiance;
