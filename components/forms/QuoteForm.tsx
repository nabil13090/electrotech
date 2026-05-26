"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const quoteSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .regex(/^[0-9+\s-]+$/, "Format de téléphone invalide"),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  codePostal: z
    .string()
    .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  ville: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  typePrestation: z.string().min(1, "Veuillez sélectionner un type de prestation"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  budget: z.string().optional(),
  urgence: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      const apiUrl =
        process.env.NODE_ENV === "production" ? "/api/quote.php" : "/api/quote";

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Erreur lors de l'envoi du formulaire");
      }

      setIsSuccess(true);
      reset();
      setUploadedFile(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB max
      setUploadedFile(file);
    } else {
      alert("Le fichier doit faire moins de 5MB");
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-12 text-center shadow-xl"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-heading font-bold text-dark-900 mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-lg text-dark-600 mb-6">
          Nous avons bien reçu votre demande de devis. Notre équipe vous
          contactera dans les plus brefs délais (sous 24h).
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
        >
          Faire une nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom et Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Nom *
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
              Prénom *
            </label>
            <input
              {...register("prenom")}
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.prenom
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
            />
            {errors.prenom && (
              <p className="mt-1 text-sm text-red-600">
                {errors.prenom.message}
              </p>
            )}
          </div>
        </div>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Téléphone *
            </label>
            <input
              {...register("telephone")}
              type="tel"
              placeholder="04 91 87 11 08"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.telephone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
            />
            {errors.telephone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.telephone.message}
              </p>
            )}
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Adresse complète *
          </label>
          <input
            {...register("adresse")}
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.adresse
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.adresse && (
            <p className="mt-1 text-sm text-red-600">{errors.adresse.message}</p>
          )}
        </div>

        {/* Code Postal et Ville */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Code Postal *
            </label>
            <input
              {...register("codePostal")}
              type="text"
              maxLength={5}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.codePostal
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
            />
            {errors.codePostal && (
              <p className="mt-1 text-sm text-red-600">
                {errors.codePostal.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Ville *
            </label>
            <input
              {...register("ville")}
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.ville
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500"
              }`}
            />
            {errors.ville && (
              <p className="mt-1 text-sm text-red-600">{errors.ville.message}</p>
            )}
          </div>
        </div>

        {/* Type de Prestation */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Type de prestation *
          </label>
          <select
            {...register("typePrestation")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.typePrestation
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          >
            <option value="">Sélectionnez une prestation</option>
            <option value="installation">Installation Électrique</option>
            <option value="depannage">Dépannage & Rénovation</option>
            <option value="climatisation">Climatisation</option>
            <option value="alarme">Alarme & Vidéosurveillance</option>
            <option value="panneaux-solaires">Panneaux Solaires</option>
            <option value="borne-recharge">Borne de Recharge</option>
            <option value="autre">Autre</option>
          </select>
          {errors.typePrestation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.typePrestation.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Description du projet *
          </label>
          <textarea
            {...register("description")}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-primary-500"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Budget et Urgence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Budget estimé (optionnel)
            </label>
            <select
              {...register("budget")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sélectionnez un budget</option>
              <option value="<1000">Moins de 1 000 €</option>
              <option value="1000-5000">1 000 € - 5 000 €</option>
              <option value="5000-10000">5 000 € - 10 000 €</option>
              <option value="10000-25000">10 000 € - 25 000 €</option>
              <option value=">25000">Plus de 25 000 €</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Urgence (optionnel)
            </label>
            <select
              {...register("urgence")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sélectionnez une urgence</option>
              <option value="immediate">Immédiate (dépannage)</option>
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois-ci</option>
              <option value="planifie">Projet planifié</option>
            </select>
          </div>
        </div>

        {/* Upload File */}
        <div>
          <label className="block text-sm font-semibold text-dark-700 mb-2">
            Photo du projet (optionnel, max 5MB)
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
                <Upload className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-gray-600">
                  {uploadedFile ? uploadedFile.name : "Cliquez pour télécharger"}
                </span>
              </div>
            </label>
            {uploadedFile && (
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
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
              <span>Envoyer la demande de devis</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-500 text-center">
          * Champs obligatoires. Vos données sont traitées de manière
          confidentielle.
        </p>
      </form>
    </motion.div>
  );
};

export default QuoteForm;
