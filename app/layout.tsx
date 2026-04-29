import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://electrotech-sud.fr";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Electrotech";

const siteDescription =
  "Électricien de confiance à Marseille depuis 1984. Installation, dépannage, rénovation électrique, climatisation, alarmes. Devis gratuit en 24h. ⭐ 5.0/5 (542 avis Google)";

// ✅ AJOUTÉ SEO/SEC : métadonnées globales enrichies (Open Graph, Twitter, robots)
export const metadata: Metadata = {
  title: {
    default: `${siteName} — Électricien professionnel à Marseille`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords:
    "électricien Marseille, dépannage électrique, installation électrique, rénovation électrique, climatisation Marseille, alarme vidéosurveillance, panneaux solaires, borne de recharge",
  authors: [{ name: siteName, url: siteUrl }],
  category: "business",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `${siteName} — Électricien professionnel à Marseille`,
    description:
      "Électricien de confiance à Marseille depuis 1984. Installation, dépannage, rénovation électrique. Devis gratuit en 24h.",
    url: siteUrl,
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Électricien Marseille`,
    description:
      "Installation, dépannage et rénovation électrique. Devis sous 24h.",
    images: [`${siteUrl}/images/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: { "fr-FR": siteUrl },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// ✅ AJOUTÉ SEO/SEC : viewport / theme-color PWA-friendly
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      {/*
        ✅ AJOUTÉ SEO/SEC : pas de <head> manuel ici — Next App Router gère les balises
        via `metadata` ; `next/font/google` injecte déjà preconnect vers fonts.gstatic.com.
      */}
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <JsonLd />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
