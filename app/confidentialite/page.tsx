import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Electrotech Marseille",
  description: "Politique de confidentialité et protection des données personnelles d'Electrotech.",
};

export default function ConfidentialitePage() {
  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-dark-600">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                1. Collecte des données
              </h2>
              <p className="text-dark-600 mb-4">
                Electrotech collecte les données personnelles que vous nous fournissez
                volontairement lorsque vous utilisez nos services, notamment lors de
                la demande de devis ou de contact.
              </p>
              <p className="text-dark-600">
                Les données collectées peuvent inclure : nom, prénom, adresse email,
                numéro de téléphone, adresse postale, et toute autre information que
                vous choisissez de nous communiquer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                2. Utilisation des données
              </h2>
              <p className="text-dark-600 mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc list-inside text-dark-600 space-y-2 mb-4">
                <li>Répondre à vos demandes de devis et de contact</li>
                <li>Vous fournir nos services d'électricité</li>
                <li>Améliorer nos services et votre expérience</li>
                <li>Vous contacter concernant nos services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                3. Protection des données
              </h2>
              <p className="text-dark-600 mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées pour
                protéger vos données personnelles contre tout accès non autorisé,
                altération, divulgation ou destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                4. Partage des données
              </h2>
              <p className="text-dark-600 mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles
                à des tiers. Vos données peuvent être partagées uniquement dans les
                cas suivants :
              </p>
              <ul className="list-disc list-inside text-dark-600 space-y-2 mb-4">
                <li>Avec votre consentement explicite</li>
                <li>Pour respecter une obligation légale</li>
                <li>Avec nos prestataires de services de confiance (sous contrat de confidentialité)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                5. Vos droits
              </h2>
              <p className="text-dark-600 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-dark-600 space-y-2 mb-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p className="text-dark-600">
                Pour exercer ces droits, contactez-nous à :{" "}
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
                6. Cookies
              </h2>
              <p className="text-dark-600">
                Notre site utilise des cookies pour améliorer votre expérience de
                navigation. Vous pouvez configurer votre navigateur pour refuser les
                cookies, mais cela peut affecter certaines fonctionnalités du site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                7. Contact
              </h2>
              <p className="text-dark-600 mb-4">
                Pour toute question concernant cette politique de confidentialité,
                vous pouvez nous contacter :
              </p>
              <div className="text-dark-600">
                <p>
                  <strong>Electrotech</strong>
                </p>
                <p>58 Trav. des Marronniers</p>
                <p>13012 Marseille, France</p>
                <p>
                  Email :{" "}
                  <a
                    href="mailto:contact@electrotech13.fr"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    contact@electrotech13.fr
                  </a>
                </p>
                <p>Téléphone : 04 91 87 11 08</p>
              </div>
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
