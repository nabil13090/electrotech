"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Delphine BARRET",
      date: "Février 2024",
      rating: 5,
      text: "Très professionnelle qui a le soucis de ses clients et du travail bien fait. Merci à vous pour votre gentillesse, votre professionnalisme et le rapport qualité prix!! La confiance s'est établie et d'autres interventions sont à venir.",
    },
    {
      name: "Caroline TANRET",
      date: "Février 2024",
      rating: 5,
      text: "Dépannage rapide dans le cadre d'un contrat d'assistance EDF. Il a su trouver l'origine de la panne de nos chauffe eaux rapidement et nous a donné de bons conseils. Nous n'hésiterons pas à faire appel à Electrotech pour de futurs projets!",
    },
    {
      name: "Véronique BORRELI",
      date: "Janvier 2024",
      rating: 5,
      text: "Je recommande à 200%! Encore merci pour votre professionnalisme et votre sens de la perfection du travail bien fait. Problème électrique résolu dans mon appartement.",
    },
    {
      name: "Pierre LE FOCH",
      date: "Décembre 2023",
      rating: 5,
      text: "Pose d'une climatisation gainable réversible. Un gros chantier fait dans les règles de l'art. Réactivité immédiate de Mr Abbou au moindre petit souci. Je recommande donc vivement Electrotech.",
    },
    {
      name: "Isabelle GAUTIER",
      date: "Novembre 2023",
      rating: 5,
      text: "Je remercie toute l'équipe d'Electrotech pour avoir relevé le défi de mon chantier, pour leur sérieux et leur professionnalisme. Les conditions du chantier n'étaient pas faciles, et pourtant ils ont su tenir dans la durée et être réactifs. Un grand Bravo!",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
            La satisfaction de nos clients est notre plus grande réussite
          </h2>
          <p className="text-xl text-dark-600">
            Découvrez ce que nos clients disent de nos services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <Quote className="w-12 h-12 text-primary-400 mb-6" />
            <div className="flex items-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-lg text-dark-700 mb-6 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-dark-900">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-dark-600">
                  {testimonials[currentIndex].date}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              aria-label="Témoignage précédent"
            >
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary-600 w-8"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              aria-label="Témoignage suivant"
            >
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.fr/maps/place/Electrotech/@43.3075804,5.4728953,17z/data=!4m18!1m9!3m8!1s0x12c9be83ada77d65:0x1392d9e8f02d1b51!2sElectrotech!8m2!3d43.3075765!4d5.4754702!9m1!1b1!16s%2Fg%2F1tdlr4zr!3m7!1s0x12c9be83ada77d65:0x1392d9e8f02d1b51!8m2!3d43.3075765!4d5.4754702!9m1!1b1!16s%2Fg%2F1tdlr4zr?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Voir plus de 542 avis Google
            <Star className="ml-2 w-5 h-5 fill-yellow-400 text-yellow-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
