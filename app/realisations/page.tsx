"use client";

import { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "exterieurs",
    title: "LES EXTÉRIEURS",
    images: [
      "exterieur1.webp",
      "exterieur2.webp",
      "exterieur3.webp",
      "exterieur4.webp",
      "exterieur5.webp",
      "exterieur6.webp",
      "exterieur7.webp",
    ],
  },
  {
    id: "interieurs",
    title: "LES INTÉRIEURS",
    images: [
      "interieur.webp",
      "interieur1.webp",
      "interieur2.webp",
      "interieur3.webp",
      "interieur4.webp",
      "interieur5.webp",
      "interieur6.webp",
      "interieur7.webp",
      "interieur8.webp",
    ],
  },
  {
    id: "tableaux",
    title: "LES TABLEAUX ÉLECTRIQUES",
    images: [
      "tableauelectrique1.webp",
      "tableauelectrique2.webp",
      "tableauelectrique3.webp",
      "tableauelectrique4.webp",
      "tableauelectrique5.webp",
      "tableauelectrique6.webp",
    ],
  },
  {
    id: "clims",
    title: "LES CLIMS",
    images: [
      "clim1.webp",
      "clim2.webp",
      "clim3.webp",
      "clim4.webp",
      "clim5.webp",
    ],
  },
  {
    id: "commerces",
    title: "LES COMMERCES",
    images: [
      "commerce1.webp",
      "commerce2.webp",
      "commerce3.webp",
      "commerce4.webp",
      "commerce5.webp",
      "commerce6.webp",
      "commerce7.webp",
      "commerce8.webp",
      "commerce9.webp",
      "commerce10.webp",
      "commerce11.webp",
      "commerce12.webp",
      "commerce13.webp",
      "commerce14.webp",
    ],
  },
  {
    id: "alarmes",
    title: "LES ALARMES & CAMÉRAS",
    images: [
      "alarme1.webp",
      "alarme2.jpg",
      "alarme3.webp",
      "alarme4.jpg",
      "alarme5.webp",
    ],
  },
];

export default function RealisationsPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{
    category: string;
    index: number;
  } | null>(null);

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  const nextImage = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    setSelectedImageIndex((prev) => {
      if (!prev || prev.category !== categoryId) {
        return { category: categoryId, index: 0 };
      }
      return {
        category: categoryId,
        index: (prev.index + 1) % category.images.length,
      };
    });
  };

  const prevImage = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    setSelectedImageIndex((prev) => {
      if (!prev || prev.category !== categoryId) {
        return { category: categoryId, index: category.images.length - 1 };
      }
      return {
        category: categoryId,
        index: (prev.index - 1 + category.images.length) % category.images.length,
      };
    });
  };

  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 scroll-mt-32" id="realisations-header">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4"
          >
            NOS RÉALISATIONS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-dark-600 max-w-3xl mx-auto"
          >
            Nous sommes fiers de partager avec vous un aperçu de nos réalisations.
            Notre professionnalisme et notre savoir-faire caractérisent chacun de
            nos projets, que ce soit des résidences, des commerces, des installations
            industrielles ou des centrales au sol.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedImageIndex(null);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-white text-dark-700 hover:bg-primary-50 hover:text-primary-600 shadow-md"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Carousel for Selected Category */}
        {currentCategory && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentCategory.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
                    onClick={() =>
                      setSelectedImageIndex({
                        category: selectedCategory,
                        index,
                      })
                    }
                  >
                    <Image
                      src={`/images/nos realisations/${image}`}
                      alt={`${currentCategory.title} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImageIndex && currentCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative w-full h-[80vh] rounded-xl overflow-hidden">
                  <Image
                    src={`/images/nos realisations/${
                      currentCategory.images[selectedImageIndex.index]
                    }`}
                    alt={`${currentCategory.title} - Image ${
                      selectedImageIndex.index + 1
                    }`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                {/* Navigation */}
                {currentCategory.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(selectedImageIndex.category);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(selectedImageIndex.category);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                      {selectedImageIndex.index + 1} /{" "}
                      {currentCategory.images.length}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-dark-600 mb-6">
            Vous souhaitez voir votre projet dans cette galerie ?
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Demander un devis gratuit
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
