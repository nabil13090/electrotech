"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Users, Clock, CheckCircle } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Clock, value: "40+", label: "Années d'expérience" },
    { icon: Users, value: "500+", label: "Clients satisfaits" },
    { icon: Award, value: "5.0", label: "Note moyenne Google" },
    { icon: CheckCircle, value: "100%", label: "Conformité normes" },
  ];

  const values = [
    "Satisfaction client garantie",
    "Qualité des services",
    "Solutions électriques sur mesure",
    "Bureau d'études intégré",
    "Conformité aux normes européennes",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4 sm:mb-6">
              Qui Sommes-Nous ?
            </h2>
            <p className="text-base sm:text-lg text-dark-600 mb-4 sm:mb-6 leading-relaxed">
              Depuis sa fondation en 1984 par un homme passionné et déterminé,
              Electrotech s'est imposée comme un leader dans le domaine de
              l'électricité. Avec plus de 40 ans d'expérience, l'entreprise a
              su établir une réputation solide en mettant l'accent sur la
              satisfaction client et la qualité des services.
            </p>
            <p className="text-base sm:text-lg text-dark-600 mb-4 sm:mb-6 leading-relaxed">
              Grâce à son propre bureau d'études, Electrotech propose des
              solutions électriques sur mesure pour une clientèle diversifiée,
              allant des résidences aux installations industrielles. Guidée par
              l'engagement envers l'excellence et l'innovation, l'entreprise
              continue de repousser les limites et de laisser sa marque dans
              l'industrie électrique.
            </p>

            {/* Values List */}
            <ul className="space-y-3 mb-8">
              {values.map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <span className="text-dark-700">{value}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href="/a-propos"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              En savoir plus
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-4 sm:p-6 text-center border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600 mx-auto mb-3 sm:mb-4" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-dark-600 font-medium text-xs sm:text-sm leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
