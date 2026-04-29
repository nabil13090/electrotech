"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contactez-nous dès aujourd'hui pour un devis gratuit et sans
              engagement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.a
              href="tel:0491871108"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 hover:bg-white/20 transition-all shadow-lg"
            >
              <Phone className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1 text-sm">Téléphone</div>
              <div className="text-white/90 font-medium">04 91 87 11 08</div>
            </motion.a>

            <motion.a
              href="mailto:contact@electrotech13.fr"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 hover:bg-white/20 transition-all shadow-lg"
            >
              <Mail className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1 text-sm">Email</div>
              <div className="text-white/90 text-sm font-medium">
                contact@electrotech13.fr
              </div>
            </motion.a>

            <motion.a
              href="https://maps.google.com?daddr=58+traverse+des+marronniers+13012+Marseille"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 hover:bg-white/20 transition-all shadow-lg"
            >
              <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1 text-sm">Adresse</div>
              <div className="text-white/90 text-sm font-medium">
                58 Trav. des Marronniers
                <br />
                13012 Marseille
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <Link
              href="/devis"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 font-bold rounded-lg transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
            >
              Demander un devis gratuit
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
