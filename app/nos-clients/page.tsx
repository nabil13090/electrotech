import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nos Clients - Electrotech Marseille",
  description: "Découvrez les entreprises renommées qui nous font confiance pour leurs projets électriques à Marseille.",
};

// Liste des logos clients (on peut les charger dynamiquement)
const getClientLogos = () => {
  const logos = [
    "012.webp",
    "1_47a459bd-fcf3-4206-a3bc-4fc15db8a192.avif",
    "12560876-logo-nike-sur-fond-transparent-gratuit-vectoriel.avif",
    "1280px-Assistance_publique_-_Hopitaux_de_Marseille_logo_2020_svg.avif",
    "1630487959610.avif",
    "240838546_107157365026171_8540373582674714025_n.webp",
    "4.webp",
    "5_fdc94d73-9f6b-4e52-a35a-cc4beeba954c.webp",
    "6_d173e423-f8b3-4a9f-86ad-3c6a79fe50c9.webp",
    "8.avif",
    "Airbus-Logo.avif",
    "basicfit.avif",
    "Bouygues_Construction_logo_svg.avif",
    "Capture_d_ecran_2024-02-21_a_17.11.01.avif",
    "Design_sans_titre_8_4830824a-cc6a-41b7-86d9-7782ff678c0c.webp",
    "Design_sans_titre_8_d412d98a-7c5e-4ccd-bf71-66330ca7cc98.webp",
    "EDF-Electricite-de-France-Logo.avif",
    "Embleme-AXA.avif",
    "ENGIE_logotype_2018.avif",
    "Espace-Mode-logo-new_cfa21de5-837c-456b-b2dd-f65af24cb2e6.webp",
    "france3.avif",
    "franchise-Obrigado.avif",
    "Gendarmerie_nationale_logo_svg.avif",
    "groupe-logirem.webp",
    "Ikea_logo_svg.avif",
    "images.avif",
    "jeanneau.avif",
    "Kenzo-logo.webp",
    "LA_PAUSE_1.avif",
    "LA_PAUSE_2.avif",
    "Logo_Foncia.avif",
    "Logo-BPE-2018.webp",
    "logo-LA-SERENATA-logo-moyen.avif",
    "MH-LOGO-HD-1-1024x581.avif",
    "om.webp",
    "Paco-Rabanne-logo.webp",
    "petitnice.avif",
    "pitaya.webp",
    "rolex.webp",
    "sncf_2005.avif",
    "telechargement.avif",
    "Vinci-Construction-Logo-300x300-1.webp",
  ];

  return logos.map((logo) => ({
    src: `/images/confiance/${logo}`,
    alt: logo.replace(/\.(avif|webp)$/i, "").replace(/_/g, " "),
  }));
};

export default function NosClientsPage() {
  const clientLogos = getClientLogos();

  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-mt-32">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
            Nos Clients
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Chez Electrotech, nous sommes fiers de collaborer avec des
            entreprises renommées et des clients satisfaits à travers nos
            réalisations électriques exceptionnelles. Les logos que nous
            présentons ici représentent une sélection de clients pour qui nous
            avons réalisé des projets électriques sur mesure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center h-32 group"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-dark-600 mb-6">
            Vous souhaitez rejoindre nos clients satisfaits ?
          </p>
          <a
            href="/devis"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </div>
  );
}
