import { Metadata } from "next";
import { Award, Users, Clock, CheckCircle, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "À Propos - Electrotech Marseille | 40 ans d'expérience",
  description: "Découvrez l'histoire d'Electrotech, électricien à Marseille depuis 1984. Plus de 40 ans d'expérience au service de vos projets électriques.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Sécurité",
      description:
        "Toutes nos installations sont conformes aux normes européennes",
    },
    {
      icon: Zap,
      title: "Fiabilité",
      description:
        "Travaux réalisés par des experts pour des prestations rapides et efficaces",
    },
    {
      icon: Users,
      title: "Satisfaction Client",
      description:
        "Plus de 500 clients satisfaits avec une note moyenne de 5.0/5",
    },
    {
      icon: Award,
      title: "Qualité",
      description:
        "Bureau d'études intégré pour des solutions électriques sur mesure",
    },
  ];

  const milestones = [
    { year: "1984", event: "Fondation d'Electrotech" },
    { year: "2000+", event: "Plus de 500 projets réalisés" },
    { year: "2024", event: "40 ans d'expérience" },
    { year: "Aujourd'hui", event: "Leader à Marseille" },
  ];

  return (
    <div className="pt-48 md:pt-52 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 scroll-mt-32">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-6">
            Qui Sommes-Nous ?
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-dark-600 mb-6 leading-relaxed">
              Depuis sa fondation en 1984 par un homme passionné et déterminé,
              Electrotech s'est imposée comme un leader dans le domaine de
              l'électricité.
            </p>
            <p className="text-lg text-dark-600 leading-relaxed">
              Avec plus de 40 ans d'expérience, l'entreprise a su établir une
              réputation solide en mettant l'accent sur la satisfaction client et
              la qualité des services.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-heading font-bold text-dark-900 mb-6">
              Notre Histoire
            </h2>
            <p className="text-lg text-dark-600 mb-6 leading-relaxed">
              Grâce à son propre bureau d'études, Electrotech propose des
              solutions électriques sur mesure pour une clientèle diversifiée,
              allant des résidences aux installations industrielles.
            </p>
            <p className="text-lg text-dark-600 mb-6 leading-relaxed">
              Guidée par l'engagement envers l'excellence et l'innovation,
              l'entreprise continue de repousser les limites et de laisser sa
              marque dans l'industrie électrique, offrant un avenir brillant
              pour ceux qu'elle sert.
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 sm:p-6 text-center border border-primary-200"
            >
              <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-600 mb-2">
                {milestone.year}
              </div>
              <div className="text-sm sm:text-base text-dark-700 font-medium">
                {milestone.event}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-dark-900 mb-12 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-xl p-6"
              >
                <value.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-dark-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-dark-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-heading font-bold mb-8">
            Nos Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Shield className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold mb-2">
                Qualif Elec
              </h3>
              <p className="text-gray-300">
                Qualification professionnelle reconnue
              </p>
            </div>
            <div>
              <Award className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold mb-2">ISO 9001</h3>
              <p className="text-gray-300">Certification qualité</p>
            </div>
            <div>
              <CheckCircle className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold mb-2">
                Normes Européennes
              </h3>
              <p className="text-gray-300">Conformité garantie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
