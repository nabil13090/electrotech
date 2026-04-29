import type { Metadata } from "next";

// ✅ [SEO | STATIC] : metadata dédiée à la section réalisations
export const metadata: Metadata = {
  title: "Nos réalisations électriques",
  description:
    "Découvrez les réalisations Electrotech : installations électriques, tableaux, climatisations et systèmes de sécurité à Marseille.",
  alternates: { canonical: "/realisations/" },
  openGraph: {
    title: "Nos réalisations électriques",
    description:
      "Galerie de chantiers Electrotech pour particuliers et professionnels à Marseille.",
    url: "/realisations/",
  },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
