"use client";

// ✅ AJOUTÉ SEO/SEC : actions client isolées pour la page 404 (metadata sur le parent serveur)

import { ArrowLeft } from "lucide-react";

export default function NotFoundActions() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-dark-700 font-semibold rounded-lg transition-all"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Page précédente
    </button>
  );
}
