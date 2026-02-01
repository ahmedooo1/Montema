import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Drill,
  Users,
  Award,
  Target,
  Lightbulb,
  ClipboardCheck,
  Truck,
  ThumbsUp,
  HelpCircle,
  ChevronDown,
  ZoomIn,
  Instagram,
  Facebook
} from 'lucide-react'
import './App.css'
import Footer from './components/Footer'
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

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

function App({ onNavigate }: LandingPageProps) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  
  const ITEMS_PER_PAGE = 6
  
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
      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Agrandissement"
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
              MONTEMA
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
              Montema transforme vos intérieurs avec des créations sur-mesure : cuisines, dressings, bibliothèques
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

      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-amber-700 tracking-[0.2em] uppercase mb-3">À Propos</h2>
              <p className="text-3xl md:text-4xl font-bold text-stone-900 mb-8">L'excellence artisanale depuis 2012</p>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montema est née de la passion de créer des espaces de vie uniques et fonctionnels. 
                Avec plus de 12 ans d'expérience dans la menuiserie sur-mesure, nous mettons notre 
                savoir-faire au service de vos projets les plus ambitieux.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                De la conception à la pose, chaque projet est traité avec le plus grand soin. 
                Nous travaillons avec des matériaux nobles et utilisons des techniques traditionnelles 
                alliées aux technologies modernes pour garantir une qualité irréprochable.
              </p>
              <div className="flex items-start gap-4 bg-amber-50 p-6 rounded-2xl border border-amber-200">
                <div className="bg-amber-700 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 mb-1 text-lg">Garantie décennale</p>
                  <p className="text-stone-600">Tous nos travaux sont couverts par une assurance complète pour votre tranquillité d'esprit</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=800"
                alt="Artisan menuisier au travail"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-700 text-white p-8 rounded-2xl shadow-xl max-w-xs">
                <p className="text-4xl font-bold mb-2">450+</p>
                <p className="text-amber-100">Projets réalisés avec succès</p>
              </div>
            </div>
          </div>
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-700 tracking-[0.2em] uppercase mb-3">Notre Processus</h2>
            <p className="text-3xl md:text-4xl font-bold text-stone-900">Comment nous travaillons</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            
            {[
              {
                icon: Target,
                title: '1. Consultation',
                desc: 'Échange sur vos besoins, prise de mesures et conseils personnalisés'
              },
              {
                icon: Lightbulb,
                title: '2. Conception',
                desc: 'Création de plans et choix des matériaux adaptés à votre projet'
              },
              {
                icon: Hammer,
                title: '3. Fabrication',
                desc: 'Réalisation artisanale avec un suivi rigoureux'
              },
              {
                icon: Truck,
                title: '4. Installation',
                desc: 'Pose professionnelle et finitions impeccables chez vous'
              }
            ].map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative text-center">
                  <div className="mx-auto w-20 h-20 bg-amber-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-700/30 relative z-10">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 bg-amber-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/10"
            >
              Démarrer mon projet
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
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
                  onClick={() => {
                    setActiveFilter(cat)
                    setCurrentPage(1)
                  }}
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
            ) : (() => {
              const filteredGallery = gallery.filter((item) => activeFilter === 'Tous' || item.category === activeFilter)
              const totalPages = Math.ceil(filteredGallery.length / ITEMS_PER_PAGE)
              const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
              const paginatedItems = filteredGallery.slice(startIndex, startIndex + ITEMS_PER_PAGE)
              
              return (
                <>
                  {paginatedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (item.media_type !== 'video') {
                          setLightboxImage(item.image_url.startsWith('http') ? item.image_url : `http://localhost:3001${item.image_url}`)
                          setLightboxOpen(true)
                        }
                      }}
                    >
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
                        {item.media_type === 'video' ? (
                          <span className="text-xs text-gray-300 mt-1">📹 Vidéo</span>
                        ) : (
                          <span className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                            <ZoomIn className="w-3 h-3" /> Cliquer pour agrandir
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {totalPages > 1 && (
                    <div className="col-span-full flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-stone-400 disabled:hover:border-stone-700 transition-all"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                              currentPage === page
                                ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30'
                                : 'border border-stone-700 text-stone-400 hover:text-white hover:border-amber-500'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-stone-400 disabled:hover:border-stone-700 transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )
            })()}
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
                "Nous avons fait appel à Montema pour la réalisation complète de notre cuisine et d'une bibliothèque
                sur-mesure. Le résultat dépasse nos attentes. Précision, ponctualité et une finition impeccable."
              </p>
              <div>
                <p className="font-bold text-xl text-stone-900">Jean-Pierre L.</p>
                <p className="text-stone-500">Propriétaire particulier à Rouen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
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
                    <p className="text-xl font-bold text-stone-900">contact@montema.fr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 text-amber-700">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">Atelier</p>
                    <p className="text-xl font-bold text-stone-900">12 Rue de l'Artisanat, 76100 Rouen</p>
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

      <Footer onNavigate={onNavigate} scrollToSection={scrollToSection} />
    </div>
  )
}

export default App
