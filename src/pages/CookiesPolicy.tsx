import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PolicyPageProps {
  onNavigate?: (page: string) => void;
}

export default function CookiesPolicy({ onNavigate }: PolicyPageProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour
          </button>
          <h1 className="text-4xl font-bold text-slate-900">Politique de Cookies</h1>
          <p className="text-slate-600 mt-2">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              Montema ("nous", "notre" ou "nos") utilise des cookies sur notre site web. Vous devez lire cette politique de cookies pour comprendre notre utilisation de cookies et les choix qu'il vous est possible de faire concernant ceux-ci.
            </p>
          </section>

          {/* What are cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Un cookie est un petit fichier texte qui est stocké sur votre appareil (ordinateur, téléphone, tablette) lorsque vous visitez notre site web. Les cookies nous permettent de:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Reconnaître votre appareil lors de visites ultérieures</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mémoriser vos préférences et vos paramètres</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Comprendre comment vous utilisez notre site</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Améliorer notre site en fonction de vos besoins</span>
              </li>
            </ul>
          </section>

          {/* Types of cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies que nous utilisons</h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Cookies Techniques / Nécessaires</h3>
                <p className="text-slate-700 mb-3">
                  Nous utilisons exclusivement des cookies techniques (ou stockage local) indispensables au bon fonctionnement du site. Ils permettent de :
                </p>
                <ul className="list-disc ml-5 text-slate-700 mb-2">
                  <li>Mémoriser votre choix concernant les cookies (acceptation ou refus).</li>
                  <li>Sécuriser l'accès à l'espace administrateur (si vous êtes connecté en tant que gestionnaire).</li>
                </ul>
                <p className="text-sm text-slate-600 italic">
                  Ces cookies ne stockent aucune donnée personnelle identifiable et ne sont pas utilisés à des fins publicitaires.
                </p>
              </div>
            </div>
            
            <p className="mt-6 text-slate-700">
              <strong>Note importante :</strong> À ce jour, ce site n'utilise <u>aucun</u> cookie publicitaire, ni aucun traceur d'analyse d'audience (type Google Analytics ou Facebook Pixel). Votre navigation reste donc privée.
            </p>
          </section>

          {/* Your choices */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Vos Choix</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vous avez le contrôle total sur les cookies que vous souhaitez accepter. Lors de votre première visite, vous pouvez :
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Accepter l'ensemble des cookies en cliquant sur "Accepter"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Refuser les cookies non-nécessaires en cliquant sur "Refuser"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Effacer les cookies à tout moment dans les paramètres de votre navigateur</span>
              </li>
            </ul>
          </section>

          {/* Browser settings */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Paramètres du Navigateur</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              La plupart des navigateurs web permettent de contrôler les cookies via leurs paramètres. Pour plus d'informations sur la gestion des cookies dans votre navigateur, veuillez consulter:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <a href="https://support.google.com/accounts/answer/61416" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Chrome
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <a href="https://support.mozilla.org/fr/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Firefox
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Safari
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <a href="https://support.microsoft.com/en-us/windows/windows-10-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Edge
                </a>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-slate-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-700 leading-relaxed">
              Si vous avez des questions concernant notre utilisation de cookies ou cette politique, n'hésitez pas à nous contacter via notre
              <a href="/" className="text-blue-600 hover:underline mx-1">page de contact</a>
              ou par email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
