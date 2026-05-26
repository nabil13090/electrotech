import QuoteForm from "@/components/forms/QuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande de Devis Gratuit - Electrotech Marseille",
  description: "Demandez votre devis gratuit pour vos travaux électriques à Marseille. Réponse sous 24h. Installation, dépannage, rénovation, climatisation.",
};

export default function DevisPage() {
  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Demande de Devis Gratuit
            </h1>
            <p className="text-xl text-dark-600">
              Remplissez le formulaire ci-dessous et recevez votre devis
              personnalisé sous 24h
            </p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
