"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Certifications = () => {
  const certifications = [
    {
      image: "/images/IRVE-640w.avif",
      title: "IRVE",
      description: "Infrastructure de Recharge pour Véhicules Électriques",
    },
    {
      image: "/images/logo-qualiPV-RGE_chabanat-1024x707.avif",
      title: "QualiPV RGE",
      description: "Qualification Photovoltaïque Reconnu Garant de l'Environnement",
    },
    {
      image: "/images/telechargement-removebg-preview.avif",
      title: "Certification",
      description: "Certification professionnelle reconnue",
    },
    {
      image: "/images/Capture_d_ecran_2024-02-20_a_14.52.27.avif",
      title: "Qualification",
      description: "Qualification professionnelle",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Nos Certifications
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Des qualifications et certifications qui garantissent la qualité de
            nos prestations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {cert.title}
              </h3>
              <p className="text-gray-300">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
