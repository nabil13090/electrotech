import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ReactNode } from "react";

type ServiceDetailTemplateProps = {
  title: string;
  subtitle: string;
  bannerImage: string;
  icon: ReactNode;
  services: string[];
  highlights: { title: string; description: string }[];
  gallery: { src: string; alt: string }[];
  ctaTitle: string;
  ctaText: string;
};

export default function ServiceDetailTemplate({
  title,
  subtitle,
  bannerImage,
  icon,
  services,
  highlights,
  gallery,
  ctaTitle,
  ctaText,
}: ServiceDetailTemplateProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image src={bannerImage} alt={title} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/70 via-dark-800/55 to-dark-900/70" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col items-center justify-center text-center pt-20">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-5 text-white">
            {icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">{title}</h1>
          <p className="text-lg md:text-2xl text-gray-100 max-w-3xl">{subtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-heading font-bold text-dark-900 mb-6">Nos prestations</h2>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                    <span className="text-dark-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-heading font-bold text-dark-900 mb-6">Pourquoi nous choisir</h2>
              <div className="space-y-6">
                {highlights.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-xl font-heading font-bold text-dark-900 mb-2">{item.title}</h3>
                    <p className="text-dark-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-3xl font-heading font-bold text-dark-900 mb-6">Nos réalisations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.slice(0, 2).map((item) => (
                <div key={item.src} className="relative h-72 rounded-xl overflow-hidden shadow-md">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 text-center bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-heading font-bold text-dark-900 mb-4">{ctaTitle}</h3>
            <p className="text-dark-600 mb-6">{ctaText}</p>
            <Link
              href="/devis"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Demander un devis gratuit
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

