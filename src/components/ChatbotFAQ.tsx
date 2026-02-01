import { useState, useEffect } from 'react'
import { MessageCircle, X, Sparkles, Send } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
  relatedQuestions: number[]
}

interface Message {
  id: number
  type: 'bot' | 'user'
  text: string
  isTyping?: boolean
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Quels services proposez-vous ?",
    answer: "Nous proposons des services de menuiserie haut de gamme : cuisines sur mesure, dressings, meubles TV, ainsi que plomberie, électricité et peinture. Tous nos projets sont personnalisés selon vos besoins.",
    relatedQuestions: [2, 3, 6]
  },
  {
    id: 2,
    question: "Combien coûte une cuisine sur mesure ?",
    answer: "Le prix varie selon la taille, les matériaux et les finitions. Nous offrons un devis gratuit personnalisé. Généralement, nos cuisines commencent à partir de 5000€ pour un projet complet.",
    relatedQuestions: [3, 5, 7]
  },
  {
    id: 3,
    question: "Comment obtenir un devis ?",
    answer: "C'est simple ! Remplissez notre formulaire de contact en bas de page ou appelez-nous. Nous planifierons une visite gratuite pour étudier votre projet et vous fournir un devis détaillé.",
    relatedQuestions: [2, 4, 8]
  },
  {
    id: 4,
    question: "Quel est le délai de réalisation ?",
    answer: "Cela dépend du projet, mais généralement : cuisine 3-4 semaines, dressing 2 semaines, meuble TV 1 semaine. Nous respectons toujours les délais convenus.",
    relatedQuestions: [7, 8, 1]
  },
  {
    id: 5,
    question: "Quelle est la qualité des matériaux ?",
    answer: "Nous utilisons uniquement des matériaux premium certifiés : bois massif, panneaux haute qualité, quincaillerie européenne. Garantie 10 ans sur tous nos travaux !",
    relatedQuestions: [8, 2, 1]
  },
  {
    id: 6,
    question: "Puis-je voir vos réalisations ?",
    answer: "Absolument ! Consultez notre galerie 'Réalisations' sur le site. Vous y trouverez des photos de nos projets récents : cuisines, dressings, et plus encore.",
    relatedQuestions: [1, 3, 5]
  },
  {
    id: 7,
    question: "Comment se déroule le projet ?",
    answer: "Étapes simples : 1) Rendez-vous & prise de mesures, 2) Conception & devis gratuit, 3) Validation, 4) Fabrication, 5) Installation professionnelle, 6) Finitions et nettoyage.",
    relatedQuestions: [3, 4, 8]
  },
  {
    id: 8,
    question: "Offrez-vous une garantie ?",
    answer: "Oui ! Garantie 10 ans sur nos travaux de menuiserie, 2 ans sur la plomberie/électricité. Service après-vente disponible pour tout ajustement nécessaire.",
    relatedQuestions: [5, 4, 2]
  }
]


const ChatbotFAQ = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [suggestedQuestions, setSuggestedQuestions] = useState<FAQItem[]>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message de bienvenue
      setTimeout(() => {
        const welcomeMsg: Message = {
          id: 0,
          type: 'bot',
          text: "👋 Bonjour ! Je suis l'assistant Montema. Choisissez une question ci-dessous pour en savoir plus sur nos services.",
          isTyping: false
        }
        setMessages([welcomeMsg])
        // Afficher les premières suggestions
        setSuggestedQuestions([faqData[0], faqData[2], faqData[5]])
      }, 300)
    }
  }, [isOpen])

  const typeMessage = (text: string, callback: () => void) => {
    setIsTyping(true)
    let index = 0
    const tempId = Date.now()
    
    const typingMsg: Message = {
      id: tempId,
      type: 'bot',
      text: '',
      isTyping: true
    }
    
    setMessages(prev => [...prev, typingMsg])

    const interval = setInterval(() => {
      if (index < text.length) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempId 
              ? { ...msg, text: text.substring(0, index + 1) }
              : msg
          )
        )
        index++
      } else {
        clearInterval(interval)
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempId 
              ? { ...msg, isTyping: false }
              : msg
          )
        )
        setIsTyping(false)
        callback()
      }
    }, 20)
  }

  const handleQuestionClick = (faq: FAQItem) => {
    // Ajouter la question de l'utilisateur
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: faq.question
    }
    setMessages(prev => [...prev, userMsg])
    setSuggestedQuestions([])

    // Réponse du bot avec effet de frappe
    setTimeout(() => {
      typeMessage(faq.answer, () => {
        // Afficher les questions liées
        const related = faq.relatedQuestions.map(id => faqData.find(f => f.id === id)!).filter(Boolean)
        setSuggestedQuestions(related)
      })
    }, 500)
  }

  const resetChat = () => {
    setMessages([])
    setSuggestedQuestions([])
    setIsTyping(false)
    // Réinitialiser avec le message de bienvenue
    setTimeout(() => {
      const welcomeMsg: Message = {
        id: 0,
        type: 'bot',
        text: "👋 Bonjour ! Je suis l'assistant Montema. Choisissez une question ci-dessous pour en savoir plus sur nos services.",
        isTyping: false
      }
      setMessages([welcomeMsg])
      setSuggestedQuestions([faqData[0], faqData[2], faqData[5]])
    }, 300)
  }

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-full p-3 md:p-4 shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 animate-bounce"
          aria-label="Ouvrir le chatbot"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            ?
          </span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden md:group-hover:block">
            <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-4 whitespace-nowrap shadow-xl">
              Des questions ? 💬
              <div className="absolute top-full right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Chatbot Window */}
      <div
        className={`fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="bg-white md:rounded-2xl shadow-2xl w-full h-full md:w-96 md:h-[600px] flex flex-col overflow-hidden md:border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white p-4 md:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 animate-pulse">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">Assistant Montema</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  En ligne
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                {msg.type === 'bot' && (
                  <div className="flex items-start gap-1.5 md:gap-2 max-w-[85%] md:max-w-[80%]">
                    <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-full p-1.5 md:p-2 flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 md:p-4 shadow-sm">
                      <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                        {msg.text}
                        {msg.isTyping && <span className="inline-block w-1 h-4 bg-amber-600 ml-1 animate-pulse"></span>}
                      </p>
                    </div>
                  </div>
                )}
                
                {msg.type === 'user' && (
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl rounded-tr-none p-3 md:p-4 shadow-md max-w-[85%] md:max-w-[80%]">
                    <p className="text-xs md:text-sm leading-relaxed">{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-white max-h-[45%] overflow-y-auto">
            {suggestedQuestions.length > 0 && !isTyping && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium mb-2 md:mb-3">💡 Questions suggérées :</p>
                {suggestedQuestions.map((faq, index) => (
                  <button
                    key={faq.id}
                    onClick={() => handleQuestionClick(faq)}
                    className="w-full text-left p-2.5 md:p-3 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl text-xs md:text-sm text-gray-700 transition-all duration-200 border border-amber-200 hover:border-amber-400 hover:shadow-md"
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <span className="font-medium">→ {faq.question}</span>
                  </button>
                ))}
              </div>
            )}
            
            {messages.length > 1 && !isTyping && suggestedQuestions.length === 0 && (
              <button
                onClick={resetChat}
                className="w-full p-2.5 md:p-3 bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-xl text-xs md:text-sm font-medium hover:shadow-lg transition-all"
              >
                🔄 Nouvelle conversation
              </button>
            )}
            
            {/* Footer Info */}
            <p className="text-xs text-center text-gray-500 mt-2 md:mt-3">
              Besoin d'aide ? 
              <a 
                href="#contact" 
                className="text-amber-700 font-semibold hover:underline ml-1"
                onClick={() => setIsOpen(false)}
              >
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default ChatbotFAQ
