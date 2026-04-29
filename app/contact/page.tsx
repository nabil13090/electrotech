import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Electrotech Marseille",
  description: "Contactez Electrotech, électricien à Marseille. Téléphone : 04 91 87 11 08. Adresse : 58 Trav. des Marronniers, 13012 Marseille.",
};

export default function ContactPage() {
  return (
    <div className="pt-48 md:pt-52 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-mt-32">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-dark-600">
            Notre équipe est à votre disposition pour répondre à toutes vos
            questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-dark-900 mb-6">
                Informations de Contact
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-900 mb-1">
                      Téléphone
                    </h3>
                    <a
                      href="tel:0491871108"
                      className="text-primary-600 hover:text-primary-700 text-lg"
                    >
                      04 91 87 11 08
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-900 mb-1">Email</h3>
                    <a
                      href="mailto:contact@electrotech13.fr"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      contact@electrotech13.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-900 mb-1">
                      Adresse
                    </h3>
                    <p className="text-dark-600">
                      58 Trav. des Marronniers
                      <br />
                      13012 Marseille, France
                    </p>
                    <a
                      href="https://maps.google.com?daddr=58+traverse+des+marronniers+13012+Marseille"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 mt-2 inline-block"
                    >
                      Voir sur la carte →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-900 mb-1">
                      Horaires
                    </h3>
                    <p className="text-dark-600">
                      <strong>Lun - Ven:</strong> 7h30 - 18h
                      <br />
                      <strong>Sam - Dim:</strong> Urgences uniquement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-heading font-bold text-dark-900 mb-4">
                Localisation
              </h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.123456789!2d5.4754702!3d43.3075765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9be83ada77d65%3A0x1392d9e8f02d1b51!2sElectrotech!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
