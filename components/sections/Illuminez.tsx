"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Illuminez = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/iluminez.webp"
              alt="Illuminez votre demeure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-600" />
              <span className="text-primary-600 font-semibold">Excellence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-6">
              Illuminez votre demeure grâce à notre expertise
            </h2>
            <p className="text-lg text-dark-600 mb-6 leading-relaxed">
              Chaque projet est traité avec le plus grand soin, depuis la
              conception initiale jusqu'à la réalisation finale.
            </p>
            <p className="text-lg text-dark-600 mb-8 leading-relaxed">
              Nous nous engageons à utiliser des matériaux de première qualité,
              à suivre les normes de sécurité les plus strictes et à mettre en
              œuvre les meilleures pratiques de l'industrie pour garantir des
              résultats durables et fiables.
            </p>
            <Link
              href="/realisations"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Voir nos réalisations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Illuminez;
