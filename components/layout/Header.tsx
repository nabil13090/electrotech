"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/a-propos", label: "À propos" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/nos-clients", label: "Nos Clients" },
    { href: "/devis", label: "Devis" },
    { href: "/contact", label: "Contact" },
  ];

  // Sur la page d'accueil : transparent avec texte blanc, ou blanc après scroll
  // Sur les autres pages : toujours blanc avec texte noir
  const headerBg = isHomePage 
    ? (isScrolled ? "bg-white shadow-lg" : "bg-transparent")
    : "bg-white shadow-md";
  
  const textColor = isHomePage && !isScrolled 
    ? "text-white" 
    : "text-dark-700";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} ${
        isScrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-32 h-20 md:w-40 md:h-24">
                <Image
                  src="/images/logo.png"
                  alt="Electrotech"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${textColor} hover:text-primary-600 font-bold transition-colors relative group`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA Button & Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:0491871108"
              className={`flex items-center space-x-2 ${textColor} hover:text-primary-600 transition-colors`}
            >
              <Phone className="w-5 h-5" />
              <span className="font-bold">04 91 87 11 08</span>
            </a>
            <Link
              href="/devis"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-dark-700 hover:text-primary-600 font-bold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a
                  href="tel:0491871108"
                  className="flex items-center space-x-2 text-dark-700 hover:text-primary-600"
                >
                  <Phone className="w-5 h-5" />
                  <span>04 91 87 11 08</span>
                </a>
                <Link
                  href="/devis"
                  className="block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Devis Gratuit
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
