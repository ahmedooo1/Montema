import { useNavigate } from 'react-router-dom'
import { Hammer, Mail, Instagram, Facebook } from 'lucide-react'

interface FooterProps {
  onNavigate: (page: string) => void
  scrollToSection: (section: string) => void
}

export default function Footer({ onNavigate, scrollToSection }: FooterProps) {
  const navigate = useNavigate()

  return (
    <footer className="bg-stone-950 text-white py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-6 h-6 text-amber-500" />
              <span className="text-2xl font-bold tracking-tighter">MONTEMA</span>
            </div>
            <p className="text-stone-400 text-sm text-center md:text-left mb-4">
              Menuiserie d'excellence à Rouen
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer text-stone-400 hover:text-white"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer text-stone-400 hover:text-white"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@montema.fr"
                className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer text-stone-400 hover:text-white"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Cuisines
              </li>
              <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Dressings
              </li>
              <li onClick={() => scrollToSection('realisations')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Meubles
              </li>
              <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Bureaux
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Naviguer</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li onClick={() => onNavigate('home')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Accueil
              </li>
              <li onClick={() => scrollToSection('realisations')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Galerie
              </li>
              <li onClick={() => scrollToSection('contact')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Légal</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li onClick={() => navigate('/politique-confidentialite')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Politique de Confidentialité
              </li>
              <li onClick={() => navigate('/politique-cookies')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Politique de Cookies
              </li>
              <li onClick={() => navigate('/parametres-cookies')} className="hover:text-amber-500 cursor-pointer transition-colors">
                Gérer les Cookies
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-stone-400 text-sm">© {new Date().getFullYear()} Montema Menuiserie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
