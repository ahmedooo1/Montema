import { AlertCircle, Settings } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { useNavigate } from 'react-router-dom';

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptNecessary } = useCookieConsent();
  const navigate = useNavigate();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-800 text-white border-t border-slate-700 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Gestion des Cookies</h3>
                <p className="text-sm text-slate-300 mb-3">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. Nous utilisons des cookies nécessaires pour le fonctionnement du site, ainsi que des cookies d'analyse et de marketing pour améliorer nos services.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => navigate('/politique-cookies')}
                    className="text-sm text-blue-400 hover:text-blue-300 underline text-left"
                  >
                    Politique de cookies
                  </button>
                  <span className="text-slate-500">•</span>
                  <button
                    onClick={() => navigate('/politique-confidentialite')}
                    className="text-sm text-blue-400 hover:text-blue-300 underline text-left"
                  >
                    Politique de confidentialité
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={acceptNecessary}
              className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors text-sm whitespace-nowrap"
            >
              Refuser tout
            </button>
            <button
              onClick={() => navigate('/parametres-cookies')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors text-sm whitespace-nowrap"
            >
              <Settings className="w-4 h-4" />
              Personnaliser
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm whitespace-nowrap"
            >
              Accepter tout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
