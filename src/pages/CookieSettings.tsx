import { useState } from 'react';
import { ChevronRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCookieConsent } from '../hooks/useCookieConsent';

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
}

export default function CookieSettings({ onNavigate }: SettingsPageProps) {
  const navigate = useNavigate();
  const { consent, updateConsent, acceptAll, acceptNecessary } = useCookieConsent();
  const [savedMessage, setSavedMessage] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  const handleBack = () => {
    navigate('/');
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleSave = () => {
    updateConsent({
      analytics,
      marketing,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
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
          <h1 className="text-4xl font-bold text-slate-900">Paramètres des Cookies</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Success Message */}
          {savedMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              ✓ Vos préférences ont été mises à jour avec succès
            </div>
          )}

          {/* Cookie Categories */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Gérer vos Préférences</h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Cookies Nécessaires</h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-not-allowed opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Cookies d'Analyse</h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Nous aident à comprendre comment vous utilisez notre site et à l'améliorer.
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Cookies de Marketing</h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Utilisés pour suivre votre activité et vous afficher des contenus pertinents.
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
            <button
              onClick={acceptNecessary}
              className="px-6 py-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-colors"
            >
              Refuser tout
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium transition-colors"
            >
              Accepter tout
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors ml-auto"
            >
              <Save className="w-5 h-5" />
              Enregistrer les préférences
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
