"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Installation Électrique", href: "/services/installation" },
      { label: "Dépannage & Rénovation", href: "/services/depannage" },
      { label: "Climatisation", href: "/services/climatisation" },
      { label: "Alarme & Vidéosurveillance", href: "/services/alarme" },
      { label: "Panneaux Solaires", href: "/services/panneaux-solaires" },
      { label: "Borne de Recharge", href: "/services/bornes-recharge" },
    ],
    entreprise: [
      { label: "À propos", href: "/a-propos" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Nos Clients", href: "/nos-clients" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Mentions Légales", href: "/mentions-legales" },
      { label: "Politique de Confidentialité", href: "/confidentialite" },
      { label: "CGV", href: "/cgv" },
    ],
  };

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <div className="relative w-40 h-24 md:w-48 md:h-28">
                <Image
                  src="/images/logo.png"
                  alt="Electrotech"
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Électricien de confiance à Marseille depuis 1984. Plus de 40 ans
              d'expérience au service de vos projets électriques.
            </p>
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">5.0</span>
              <span className="text-gray-400">(542 avis Google)</span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-heading font-semibold mb-4">
              Nos Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Entreprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-heading font-semibold mb-4">
              Entreprise
            </h4>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-heading font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  58 Trav. des Marronniers
                  <br />
                  13012 Marseille, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:0491871108"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  04 91 87 11 08
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Lun - Ven: 7h30 - 18h
                  <br />
                  Sam - Dim: Urgences uniquement
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} ELECTROTECH. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
