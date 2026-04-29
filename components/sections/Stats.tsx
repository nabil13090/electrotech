"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Users } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Shield,
      title: "Sécurité",
      description:
        "Toutes nos installations sont conformes aux normes européennes et vous garantissent une sécurité optimale",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Zap,
      title: "Fiabilité",
      description:
        "Nos travaux sont réalisés par des experts afin de vous offrir des prestations rapides et efficaces",
      color: "from-yellow-500 to-yellow-700",
    },
    {
      icon: Clock,
      title: "Accessibilité",
      description:
        "Notre équipe est joignable par téléphone ou par mail pour toute demande d'informations",
      color: "from-green-500 to-green-700",
    },
    {
      icon: Users,
      title: "Expertise",
      description:
        "40 ans d'expérience et un bureau d'études intégré pour des solutions sur mesure",
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <section className="py-20 bg-[#eef0f2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-5 tracking-tight">
            Nos Engagements
          </h2>
          <p className="text-xl md:text-2xl text-dark-700 font-medium leading-snug">
            Qualité, expertise et satisfaction client au cœur de nos valeurs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="text-center bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`w-[4.5rem] h-[4.5rem] mx-auto mb-6 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
              >
                <stat.icon className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-lg font-heading font-bold text-dark-900 mb-3">
                {stat.title}
              </h3>
              <p className="text-dark-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
