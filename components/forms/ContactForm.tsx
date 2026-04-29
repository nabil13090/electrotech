"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .optional()
    .or(z.literal("")),
  sujet: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // En production (export statique + hosting PHP), utiliser l'endpoint PHP.
      // En dev, on peut fallback sur l'API Next.
      const apiUrl =
        process.env.NODE_ENV === "production" ? "/api/contact.php" : "/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Format "ref" + compat legacy côté PHP
          name: data.nom,
          email: data.email,
          phone: data.telephone || "",
          subject: data.sujet,
          message: data.message,
          // champs legacy (au cas où)
          nom: data.nom,
          telephone: data.telephone || "",
          sujet: data.sujet,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Erreur lors de l'envoi du message");
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-xl"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-heading font-bold text-dark-900 mb-2">
          Message envoyé !
        </h3>
        <p className="text-dark-600 mb-6">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-heading font-bold text-dark-900 mb-6">
        Envoyez-nous un message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Nom complet *
          </label>
          <input
            {...register("nom")}
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.nom
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Téléphone (optionnel)
          </label>
          <input
            {...register("telephone")}
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Sujet *
          </label>
          <input
            {...register("sujet")}
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.sujet
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.sujet && (
            <p className="mt-1 text-sm text-red-600">{errors.sujet.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Message *
          </label>
          <textarea
            {...register("message")}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Envoyer le message</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
