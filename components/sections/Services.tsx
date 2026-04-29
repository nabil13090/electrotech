"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Wrench,
  Wind,
  Shield,
  Sun,
  Battery,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Installation Électrique",
      description: "Installation complète CFO/CFA pour vos projets neufs ou rénovation",
      href: "/services/installation",
      image: "/images/installationelectrique.png",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Wrench,
      title: "Dépannage & Rénovation",
      description: "Intervention rapide en moins de 24h pour tous vos dépannages électriques",
      href: "/services/depannage",
      image: "/images/depannage-renovation.png",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Wind,
      title: "Climatisation",
      description: "Installation et maintenance de systèmes de climatisation réversible",
      href: "/services/climatisation",
      image: "/images/climatisation.png",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      icon: Shield,
      title: "Alarme & Vidéosurveillance",
      description: "Systèmes de sécurité et vidéosurveillance pour protéger vos biens",
      href: "/services/alarme",
      image: "/images/alarme.png",
      color: "from-red-400 to-red-600",
    },
    {
      icon: Sun,
      title: "Panneaux Solaires",
      description: "Installation de panneaux photovoltaïques pour l'autoconsommation",
      href: "/services/panneaux-solaires",
      image: "/images/panneauxsolaire.png",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Battery,
      title: "Borne de Recharge",
      description: "Installation de bornes de recharge pour véhicules électriques",
      href: "/services/bornes-recharge",
      image: "/images/bornederecharge.png",
      color: "from-green-400 to-green-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Des solutions électriques complètes pour tous vos besoins, de
            l'installation à la maintenance
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-300"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group min-w-0 bg-white"
          >
            <Link
              href={service.href}
              className="block relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                aria-hidden
              />
              <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
                <div className="inline-flex items-center gap-3 bg-white/95 rounded-xl px-3 py-2 shadow-md ring-1 ring-black/5">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-sm`}
                  >
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-heading font-bold text-dark-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-dark-700 text-xs sm:text-sm leading-snug line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute left-4 bottom-4">
                <span className="inline-flex items-center bg-white/95 rounded-full px-4 py-2 text-primary-700 font-semibold text-sm shadow-md ring-1 ring-black/5 group-hover:translate-x-1 transition-transform duration-300">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
