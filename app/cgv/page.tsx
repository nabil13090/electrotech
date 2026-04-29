import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente - Electrotech Marseille",
  description: "Conditions générales de vente des services d'Electrotech, électricien à Marseille.",
};

export default function CGVPage() {
  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-dark-600">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                1. Objet
              </h2>
              <p className="text-dark-600">
                Les présentes Conditions Générales de Vente (CGV) régissent les
                relations contractuelles entre Electrotech et ses clients pour
                la réalisation de prestations d'électricité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                2. Devis
              </h2>
              <p className="text-dark-600 mb-4">
                Tous nos devis sont gratuits et sans engagement. Ils sont valables
                pendant une durée de 30 jours à compter de leur émission, sauf
                mention contraire.
              </p>
              <p className="text-dark-600">
                Le devis devient un contrat dès lors qu'il est accepté et signé
                par le client.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                3. Réalisation des prestations
              </h2>
              <p className="text-dark-600 mb-4">
                Les prestations sont réalisées conformément aux normes en vigueur
                et aux règles de l'art. Toutes nos installations sont conformes
                aux normes européennes.
              </p>
              <p className="text-dark-600">
                Les délais de réalisation sont donnés à titre indicatif et peuvent
                être modifiés en cas de circonstances imprévisibles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                4. Tarifs
              </h2>
              <p className="text-dark-600">
                Les tarifs sont indiqués en euros, toutes taxes comprises (TTC).
                Ils sont valables pour la durée de validité du devis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                5. Paiement
              </h2>
              <p className="text-dark-600 mb-4">
                Le paiement s'effectue selon les modalités convenues dans le devis
                accepté. Les modes de paiement acceptés sont :
              </p>
              <ul className="list-disc list-inside text-dark-600 space-y-2 mb-4">
                <li>Chèque</li>
                <li>Virement bancaire</li>
                <li>Espèces (dans la limite légale)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                6. Garantie
              </h2>
              <p className="text-dark-600">
                Toutes nos prestations bénéficient d'une garantie conforme à la
                législation en vigueur. La garantie couvre les défauts de
                conformité et les vices cachés.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-4">
                7. Contact
              </h2>
              <div className="text-dark-600">
                <p className="mb-2">
                  <strong>Electrotech</strong>
                </p>
                <p className="mb-2">58 Trav. des Marronniers, 13012 Marseille</p>
                <p className="mb-2">Téléphone : 04 91 87 11 08</p>
                <p>
                  Email :{" "}
                  <a
                    href="mailto:contact@electrotech13.fr"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    contact@electrotech13.fr
                  </a>
                </p>
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
