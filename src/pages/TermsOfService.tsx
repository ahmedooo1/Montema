import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TermsPageProps {
  onNavigate?: (page: string) => void;
}

export default function TermsOfService({ onNavigate }: TermsPageProps) {
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
          <h1 className="text-4xl font-bold text-slate-900">Conditions d'Utilisation</h1>
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
              Ces conditions d'utilisation ("Conditions") gouvernent votre utilisation du site web de Montema ("Site"). En accédant au Site, vous acceptez de respecter ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Site.
            </p>
          </section>

          {/* License */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Licence d'Utilisation</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Montema vous accorde une licence limitée, non-exclusive et non-transférable pour accéder et utiliser le Site à titre personnel et non commercial. Vous ne pouvez pas:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Reproduire, dupliquer ou copier du contenu du Site</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Vendre, louer ou accorder une licence sur le Site</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Modifier ou créer des travaux dérivés basés sur le Site</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Utiliser le Site à des fins commerciales ou publicitaires</span>
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Responsabilités de l'Utilisateur</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              En utilisant le Site, vous acceptez de:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Fournir des informations exactes et à jour</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ne pas utiliser le Site de manière illégitime ou illégale</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Respecter les droits d'autrui</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ne pas télécharger de virus ou de code malveillant</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ne pas interférer avec le fonctionnement normal du Site</span>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Propriété Intellectuelle</h2>
            <p className="text-slate-700 leading-relaxed">
              Tout le contenu du Site, y compris mais non limité aux textes, images, logos, vidéos et graphiques, est la propriété de Montema ou de ses fournisseurs de contenu et est protégé par les lois internationales sur les droits d'auteur. Tout usage non autorisé du contenu est interdit.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation de Responsabilité</h2>
            <p className="text-slate-700 leading-relaxed">
              Le Site est fourni "tel quel" sans aucune garantie. Montema ne sera pas responsable des dommages indirects, spéciaux, consécutifs ou punitifs résultant de votre utilisation du Site, même si nous avons été avisés de la possibilité de tels dommages.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Dénégation de Garantie</h2>
            <p className="text-slate-700 leading-relaxed">
              Le Site et tout son contenu sont fournis "en l'état". Montema ne fait aucune déclaration ou garantie de quelque nature que ce soit, expresse ou implicite, quant à l'exactitude, l'exhaustivité, la qualité ou l'absence d'erreurs du contenu du Site.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications des Conditions</h2>
            <p className="text-slate-700 leading-relaxed">
              Montema se réserve le droit de modifier ces Conditions à tout moment. Les modifications entrent en vigueur immédiatement après leur publication sur le Site. Votre utilisation continue du Site après la publication des modifications constitue votre acceptation des Conditions modifiées.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-slate-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Si vous avez des questions concernant ces Conditions, veuillez nous contacter:
            </p>
            <div className="text-slate-700 space-y-2">
              <p><strong>Email:</strong> legal@montema.com</p>
              <p><strong>Téléphone:</strong> +33 (0) 1 23 45 67 89</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
