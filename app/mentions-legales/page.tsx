import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales - Electrotech Marseille",
  description: "Mentions légales et informations sur Electrotech, électricien à Marseille.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Mentions Légales
            </h1>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                1. Éditeur du site
              </h2>
              <div className="text-dark-600">
                <p className="mb-2">
                  <strong>Raison sociale :</strong> Electrotech
                </p>
                <p className="mb-2">
                  <strong>Adresse :</strong> 58 Trav. des Marronniers, 13012
                  Marseille, France
                </p>
                <p className="mb-2">
                  <strong>Téléphone :</strong> 04 91 87 11 08
                </p>
                <p className="mb-2">
                  <strong>Email :</strong>{" "}
                  <a
                    href="mailto:contact@electrotech13.fr"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    contact@electrotech13.fr
                  </a>
                </p>
                <p>
                  <strong>Activité :</strong> Électricien professionnel
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                2. Directeur de publication
              </h2>
              <p className="text-dark-600">
                Le directeur de publication est le représentant légal de
                l'entreprise Electrotech.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                3. Hébergement
              </h2>
              <p className="text-dark-600">
                Ce site est hébergé par Vercel Inc. ou Netlify Inc. selon le
                choix de déploiement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="text-dark-600 mb-4">
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés,
                y compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
              <p className="text-dark-600">
                La reproduction de tout ou partie de ce site sur un support
                électronique quel qu'il soit est formellement interdite sauf
                autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                5. Protection des données personnelles
              </h2>
              <p className="text-dark-600 mb-4">
                Conformément à la loi "Informatique et Libertés" du 6 janvier
                1978 modifiée et au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d'un droit d'accès, de
                rectification, de suppression et d'opposition aux données
                personnelles vous concernant.
              </p>
              <p className="text-dark-600">
                Pour exercer ce droit, adressez-vous à :{" "}
                <a
                  href="mailto:contact@electrotech13.fr"
                  className="text-primary-600 hover:text-primary-700"
                >
                  contact@electrotech13.fr
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                6. Responsabilité
              </h2>
              <p className="text-dark-600">
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes. Si vous constatez une lacune, erreur ou ce qui parait
                être un dysfonctionnement, merci de bien vouloir le signaler par
                email à{" "}
                <a
                  href="mailto:contact@electrotech13.fr"
                  className="text-primary-600 hover:text-primary-700"
                >
                  contact@electrotech13.fr
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                7. Liens hypertextes
              </h2>
              <p className="text-dark-600">
                Les liens hypertextes mis en place dans le cadre du présent
                site en direction d'autres ressources présentes sur le réseau
                Internet ne sauraient engager la responsabilité d'Electrotech.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
