import { useNavigate } from 'react-router-dom';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate('home');
    }
    navigate(path);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Montema</h3>
            <p className="text-sm text-slate-400">
              Services de qualité pour votre entreprise
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <a href="/#services" className="text-sm hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#gallery" className="text-sm hover:text-white transition-colors">
                  Galerie
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate('/politique-confidentialite')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Politique de Confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/politique-cookies')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Politique de Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('/parametres-cookies')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Paramètres des Cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@montema.com" className="hover:text-white transition-colors">
                  contact@montema.com
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  +33 (0) 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Montema. Tous droits réservés.
            </p>
            <p className="text-sm text-slate-400 mt-4 md:mt-0">
              Conçu avec attention au détail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
