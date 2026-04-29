"use client";

// ✅ AJOUTÉ SEO/SEC : limite d’erreur UI (boundary client Next.js)

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <main className="text-center max-w-md">
        <h1 className="text-2xl font-heading font-bold text-dark-900 mb-4">
          Une erreur est survenue
        </h1>
        <p className="text-dark-600 mb-6">
          Nous avons rencontré un problème. Veuillez réessayer dans un instant.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg"
        >
          Réessayer
        </button>
      </main>
    </div>
  );
}
