import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Check, X as XIcon } from 'lucide-react';

export default function ContactsManagement() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contact');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'read':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'replied':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'read':
        return 'Lu';
      case 'replied':
        return 'Répondu';
      default:
        return status;
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === filter);

  if (loading) {
    return <div className="text-white">Chargement des contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Gestion des Contacts</h1>
        <p className="text-gray-400">Consultez et gérez les demandes de contact reçues</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Tous ({contacts.length})
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'new'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Nouveaux ({contacts.filter(c => c.status === 'new').length})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'read'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Lus ({contacts.filter(c => c.status === 'read').length})
        </button>
        <button
          onClick={() => setFilter('replied')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'replied'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Répondus ({contacts.filter(c => c.status === 'replied').length})
        </button>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl text-center text-gray-400">
            Aucun contact à afficher
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(contact.status)}`}>
                      {getStatusLabel(contact.status)}
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-sm">Type: {contact.project_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-sm">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex gap-2">
                  {contact.status !== 'read' && (
                    <button
                      onClick={() => updateStatus(contact.id, 'read')}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      title="Marquer comme lu"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  {contact.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(contact.id, 'replied')}
                      className="p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
                      title="Marquer comme répondu"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm font-semibold text-gray-400 mb-2">Message :</p>
                <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
