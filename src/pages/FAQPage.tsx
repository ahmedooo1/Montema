import { useState } from 'react'
import {
  Hammer,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone
} from 'lucide-react'

interface FAQPageProps {
  onNavigate: (page: string) => void;
  scrollToSection: (section: string) => void;
}

function FAQPage({ onNavigate, scrollToSection }: FAQPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Le devis est-il gratuit ?',
      a: 'Oui, le premier rendez-vous et le devis sont entièrement gratuits et sans engagement. Nous nous déplaçons chez vous pour prendre les mesures et comprendre vos besoins.'
    },
    {
      q: 'Quels matériaux utilisez-vous ?',
      a: 'Nous travaillons avec des matériaux nobles : bois massif (chêne, noyer, hêtre), contreplaqué haute qualité, MDF laqué, stratifié haut de gamme. Tous nos matériaux sont sélectionnés pour leur durabilité et leur esthétique.'
    },
    {
      q: 'Le devis est-il gratuit ?',
      a: 'Oui, le premier rendez-vous et le devis sont entièrement gratuits et sans engagement. Nous nous déplaçons chez vous pour prendre les mesures et comprendre vos besoins.'
    },
    {
      q: 'Intervenez-vous dans toute la région lyonnaise ?',
      a: 'Nous intervenons principalement sur Lyon et sa périphérie (30km). Pour des projets plus éloignés, contactez-nous pour étudier la faisabilité.'
    },
    {
      q: 'Quelle garantie offrez-vous ?',
      a: 'Tous nos travaux sont couverts par une garantie décennale. De plus, nous proposons une garantie de 2 ans sur les pièces et la main-d\'œuvre pour votre tranquillité d\'esprit.'
    },
    {
      q: 'Puis-je fournir mes propres meubles pour le montage ?',
      a: 'Absolument ! Nous proposons un service de montage pour tous types de meubles : IKEA, cuisines en kit, meubles de marque... Notre expertise garantit un montage professionnel et soigné.'
    },
    {
      q: 'Comment se passe le paiement ?',
      a: 'Nous demandons un acompte de 30% à la commande, 40% au début des travaux et le solde à la fin de l\'installation. Nous acceptons les paiements par virement, chèque ou espèces.'
    },
    {
      q: 'Proposez-vous des solutions écologiques ?',
      a: 'Absolument ! Nous proposons des bois certifiés FSC, des peintures et vernis écologiques sans COV, et nous privilégions les circuits courts pour nos approvisionnements.'
    },
    {
      q: 'Comment se déroule un projet avec vous ?',
      a: 'Après le premier rendez-vous gratuit, nous établissons un devis détaillé. Une fois accepté, nous commençons la fabrication en atelier. Nous vous tenons informé régulièrement de l\'avancement et planifions l\'installation selon vos disponibilités.'
    },
    {
      q: 'Puis-je voir vos réalisations avant de commander ?',
      a: 'Bien sûr ! Nous avons un showroom avec plusieurs exemples de réalisations. Vous pouvez aussi consulter notre portfolio en ligne ou nous demander les coordonnées de clients satisfaits.'
    },
    {
      q: 'Faites-vous de la rénovation de meubles anciens ?',
      a: 'Oui, nous proposons un service de restauration et rénovation de meubles anciens. Nous pouvons redonner vie à vos pièces familiales tout en préservant leur caractère.'
    }
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="bg-amber-700 p-1.5 rounded-lg">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-stone-900">
              MONTAMA
            </span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-amber-700/10 border border-amber-700/20 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Questions Fréquentes
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Tout ce que vous devez savoir sur nos services
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Retrouvez ici les réponses aux questions les plus fréquemment posées sur nos services de menuiserie sur-mesure,
            nos délais, nos garanties et notre processus de travail.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center hover:bg-stone-50 transition-colors text-left"
                >
                  <span className="font-bold text-stone-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-700 flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-8 pb-6 text-stone-600 leading-relaxed border-t border-stone-100 pt-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-stone-300 text-lg">
              Notre équipe est là pour vous répondre et vous accompagner dans votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-700 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-stone-300 mb-1">Appelez-nous</p>
                  <p className="text-xl font-bold">+33 6 12 34 56 78</p>
                </div>
              </div>
              <p className="text-stone-300 text-sm">
                Disponible du lundi au vendredi, de 9h à 18h
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-700 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-stone-300 mb-1">Envoyez-nous un email</p>
                  <p className="text-xl font-bold">contact@montema.fr</p>
                </div>
              </div>
              <p className="text-stone-300 text-sm">
                Réponse sous 24h ouvrées
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                onNavigate('home')
                setTimeout(() => scrollToSection('contact'), 100)
              }}
              className="inline-flex items-center gap-2 bg-amber-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/30"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hammer className="w-6 h-6 text-amber-500" />
            <span className="text-2xl font-bold tracking-tighter">MONTAMA</span>
          </div>
          <p className="text-stone-400 text-sm">
            © 2024 Montema Menuiserie. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default FAQPage
