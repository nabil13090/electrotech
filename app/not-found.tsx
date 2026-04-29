import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import NotFoundActions from "@/components/not-found/NotFoundActions";

// ✅ AJOUTÉ SEO/SEC : métadonnées 404 (noindex)
export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-48 md:pt-52">
      <div className="text-center px-4">
        <h1 className="text-9xl font-heading font-bold text-primary-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-900 mb-4">
          Page non trouvée
        </h2>
        <p className="text-lg text-dark-600 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l&apos;accueil
          </Link>
          <NotFoundActions />
        </div>
      </div>
    </div>
  );
}
