import { AlertCircle } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { useNavigate } from 'react-router-dom';

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptNecessary } = useCookieConsent();
  const navigate = useNavigate();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl rounded-2xl p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Cookies</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Nous utilisons des cookies pour améliorer votre expérience.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button
                onClick={() => navigate('/politique-cookies')}
                className="text-xs text-slate-400 hover:text-blue-300 underline"
              >
                Politique
              </button>
              <button
                onClick={() => navigate('/politique-confidentialite')}
                className="text-xs text-slate-400 hover:text-blue-300 underline"
              >
                Confidentialité
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={acceptNecessary}
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors text-sm border border-slate-600"
          >
            Refuser
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
