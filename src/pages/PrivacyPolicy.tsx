import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PolicyPageProps {
  onNavigate?: (page: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PolicyPageProps) {
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
          <h1 className="text-4xl font-bold text-slate-900">Politique de Confidentialité</h1>
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
              Montema ("nous", "notre" ou "nos") respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations.
            </p>
          </section>

          {/* Data we collect */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Les Données que nous Collectons</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Informations que vous nous fournissez:</h3>
                <ul className="space-y-2 text-slate-700 ml-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Nom et prénom</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Numéro de téléphone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Contenu des messages envoyés via le formulaire</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Informations collectées automatiquement:</h3>
                <p className="text-slate-700 mb-2">
                  Notre hébergeur collecte automatiquement des logs serveurs standard pour des raisons de sécurité et de maintenance :
                </p>
                <ul className="space-y-2 text-slate-700 ml-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Adresse IP (anonymisée ou conservée temporairement)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Type de navigateur et système d'exploitation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Heure et date de connexion</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How we use data */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Comment nous Utilisons vos Données</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nous utilisons les informations collectées pour:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Fournir et maintenir nos services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Améliorer et optimiser nos services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Communiquer avec vous</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Analyser l'utilisation du site</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Détecter et prévenir les fraudes</span>
              </li>
            </ul>
          </section>

          {/* Data security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sécurité des Données</h2>
            <p className="text-slate-700 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune transmission de données sur Internet ou système de stockage électronique n'est entièrement sécurisé. Nous ne pouvons pas garantir une sécurité absolue.
            </p>
          </section>

          {/* Your rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Vos Droits</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez les droits suivants:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Droit d'accès:</strong> Vous pouvez demander l'accès à vos données personnelles</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Droit de rectification:</strong> Vous pouvez demander la correction de données inexactes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Droit à l'oubli:</strong> Vous pouvez demander la suppression de vos données</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Droit à la portabilité:</strong> Vous pouvez demander une copie de vos données</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Droit d'opposition:</strong> Vous pouvez vous opposer au traitement de vos données</span>
              </li>
            </ul>
          </section>

          {/* Third parties */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Partage avec des Tiers</h2>
            <p className="text-slate-700 leading-relaxed">
              Nous pouvons partager vos données personnelles avec des tiers à titre de prestataires de services qui nous aident à exploiter notre site web et à mener nos activités, sous réserve qu'ils acceptent de maintenir la confidentialité de vos informations. Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-slate-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact & Droits RGPD</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Pour exercer vos droits ou pour toute question concernant votre vie privée, veuillez nous contacter via notre page de contact ou :
            </p>
            <div className="text-slate-700 space-y-2">
              <p><strong>Email:</strong> contact@montema.fr</p>
              <p><strong>Adresse:</strong> 12 Rue de l'Artisanat, 76100 Rouen</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}