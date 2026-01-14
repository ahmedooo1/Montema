import { useEffect, useState } from 'react'
import {
  Hammer,
  Bed,
  Layout,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Star,
  ArrowRight,
  CheckCircle2,
  Box,
  House,
  Drill
} from 'lucide-react'
import './App.css'

// Interface pour les services
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  order_position: number;
}

// Interface pour les réalisations
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  media_type?: string;
  order_position: number;
}

// Mapping des icônes Lucide
const iconMap: { [key: string]: any } = {
  Layout: Layout,
  Bed: Bed,
  Box: Box,
  Hammer: Hammer,
  Package: Box,
  Home: House,
  Drill: Drill,
}

const navLinks = [
  { name: 'Accueil', href: '' },
  { name: 'Services', href: 'services' },
  { name: 'Réalisations', href: 'realisations' },
  { name: 'Contact', href: 'contact' },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  
  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    project: 'Cuisine sur mesure',
    message: ''
  })
  const [submittingContact, setSubmittingContact] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Récupérer les services depuis l'API
  useEffect(() => {
    fetchServices()
  }, [])

  // Récupérer les réalisations depuis l'API
  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoadingServices(false)
    }
  }

  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/gallery')
      const data = await response.json()
      setGallery(data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoadingGallery(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingContact(true)
    setContactSuccess(false)

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })

      if (response.ok) {
        setContactSuccess(true)
        setContactForm({
          name: '',
          phone: '',
          project: 'Cuisine sur mesure',
          message: ''
        })
        setTimeout(() => setContactSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting contact:', error)
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setSubmittingContact(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsMenuOpen(false)
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-amber-700 p-1.5 rounded-lg">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-2xl font-bold tracking-tighter ${
                !scrolled ? 'text-white' : 'text-stone-900'
              }`}
            >
              MONTAMA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  !scrolled ? 'text-white/90' : 'text-stone-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-amber-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/10"
            >
              Devis Gratuit
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className={scrolled ? 'text-stone-900' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-stone-900' : 'text-white'} />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-bold text-stone-800"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Devis Gratuit
          </button>
        </div>
      )}

      <header className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2000"
            alt="Atelier de menuiserie"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/55 to-stone-900/10 z-0" />

        <div className="blur-orb blur-orb-amber -left-20 -top-10" />
        <div className="blur-orb blur-orb-amber-2 right-[-10%] top-14" />
        <div className="blur-orb blur-orb-ink left-1/3 bottom-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-amber-700/20 backdrop-blur-sm border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Menuiserie & Agencement
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              L'art du bois <br />
              <span className="text-amber-500">façonné pour vous.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed">
              Montama transforme vos intérieurs avec des créations sur-mesure : cuisines, dressings, bibliothèques
              et montage de mobilier de haute qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('realisations')}
                className="bg-amber-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-800 transition-all text-lg group"
              >
                Voir nos réalisations
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-lg"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </header>

      <section className="bg-white py-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Années d'expérience", val: '12+' },
            { label: 'Projets terminés', val: '450+' },
            { label: 'Clients satisfaits', val: '100%' },
            { label: 'Garantie décennale', val: 'Oui' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel text-center py-6 px-4 rounded-2xl">
              <p className="text-3xl font-bold text-stone-900 mb-1">{stat.val}</p>
              <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-700 tracking-[0.2em] uppercase mb-3">Nos Services</h2>
            <p className="text-3xl md:text-4xl font-bold text-stone-900">Un savoir-faire complet</p>
          </div>

          {loadingServices ? (
            <div className="text-center py-12">
              <p className="text-stone-500">Chargement des services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Box
                return (
                  <div
                    key={service.id}
                    className="group card-surface rounded-2xl overflow-hidden border border-stone-200 transition-all hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image_url.startsWith('http') ? service.image_url : `http://localhost:3001${service.image_url}`}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-8">
                      <div className="text-amber-700 mb-4">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section id="realisations" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase mb-3">Portfolio</h2>
              <p className="text-3xl md:text-4xl font-bold">Dernières Réalisations</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
              {['Tous', 'Cuisines', 'Dressings', 'Meubles'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
                    activeFilter === cat
                      ? 'bg-amber-700 border-amber-700 text-white'
                      : 'border-stone-700 text-stone-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingGallery ? (
              <div className="col-span-full text-center py-12">
                <p className="text-stone-400">Chargement des réalisations...</p>
              </div>
            ) : gallery.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-stone-400">Aucune réalisation disponible pour le moment.</p>
              </div>
            ) : (
              gallery
                .filter((item) => activeFilter === 'Tous' || item.category === activeFilter)
                .map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                  {item.media_type === 'video' ? (
                    <video
                      src={item.image_url.startsWith('http') ? item.image_url : `http://localhost:3001${item.image_url}`}
                      className="w-full h-full object-cover"
                      controls
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.image_url.startsWith('http') ? item.image_url : `http://localhost:3001${item.image_url}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 pointer-events-none">
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    {item.media_type === 'video' && (
                      <span className="text-xs text-gray-300 mt-1">📹 Vidéo</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-stone-50 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <House className="w-64 h-64" />
            </div>

            <div className="max-w-3xl relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-medium text-stone-800 leading-snug mb-8 italic">
                "Nous avons fait appel à Montama pour la réalisation complète de notre cuisine et d'une bibliothèque
                sur-mesure. Le résultat dépasse nos attentes. Précision, ponctualité et une finition impeccable."
              </p>
              <div>
                <p className="font-bold text-xl text-stone-900">Jean-Pierre L.</p>
                <p className="text-stone-500">Propriétaire particulier à Lyon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-sm font-bold text-amber-700 tracking-[0.2em] uppercase mb-3">Contact</h2>
              <p className="text-4xl font-bold text-stone-900 mb-8">Commençons votre projet aujourd'hui</p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 text-amber-700">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">Appelez-nous</p>
                    <p className="text-xl font-bold text-stone-900">+33 6 12 34 56 78</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 text-amber-700">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-xl font-bold text-stone-900">contact@montama.fr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 text-amber-700">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">Atelier</p>
                    <p className="text-xl font-bold text-stone-900">12 Rue de l'Artisanat, 69000 Lyon</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
              {contactSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-medium">
                  ✓ Message envoyé avec succès ! Nous vous recontacterons rapidement.
                </div>
              )}
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="name">
                      Nom complet
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      placeholder="Marc Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="phone">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      placeholder="06..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="project">
                    Type de projet
                  </label>
                  <select
                    id="project"
                    value={contactForm.project}
                    onChange={(e) => setContactForm({ ...contactForm, project: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none"
                  >
                    <option>Cuisine sur mesure</option>
                    <option>Dressing / Placard</option>
                    <option>Bibliothèque</option>
                    <option>Montage de meubles</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all h-32"
                    placeholder="Décrivez votre projet..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submittingContact}
                  className="w-full bg-amber-700 text-white font-bold py-4 rounded-xl hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingContact ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Hammer className="w-8 h-8 text-amber-500" />
                <span className="text-3xl font-bold tracking-tighter">MONTAMA</span>
              </div>
              <p className="text-stone-400 max-w-sm mb-6">
                Menuiserie d'excellence à Lyon. Nous transformons vos idées en bois véritable pour créer des espaces de
                vie uniques et fonctionnels.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer text-stone-400 hover:text-white"
                  >
                    Insta
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-4 text-stone-400">
                <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">Cuisines</li>
                <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">Dressings</li>
                <li onClick={() => scrollToSection('realisations')} className="hover:text-amber-500 cursor-pointer transition-colors">Meubles TV</li>
                <li onClick={() => scrollToSection('services')} className="hover:text-amber-500 cursor-pointer transition-colors">Bureaux</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Informations</h4>
              <ul className="space-y-4 text-stone-400">
                <li onClick={() => scrollToSection('')} className="hover:text-amber-500 cursor-pointer transition-colors">À propos</li>
                <li onClick={() => scrollToSection('realisations')} className="hover:text-amber-500 cursor-pointer transition-colors">Réalisations</li>
                <li onClick={() => scrollToSection('')} className="hover:text-amber-500 cursor-pointer transition-colors">Mentions légales</li>
                <li onClick={() => scrollToSection('contact')} className="hover:text-amber-500 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-500 text-sm">© 2024 Montama Menuiserie. Tous droits réservés.</p>
            <div className="flex gap-8 text-stone-500 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Artisan Qualifié
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Garantie 10 ans
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
