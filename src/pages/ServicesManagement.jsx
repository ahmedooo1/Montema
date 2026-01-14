import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image_url: '',
    order_position: 0
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      description: '',
      icon: 'Package',
      image_url: '',
      order_position: services.length + 1
    });
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      icon: '',
      image_url: '',
      order_position: 0
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload/upload', {
        method: 'POST',
        body: uploadFormData
      });

      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, image_url: data.imageUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editingId
        ? `http://localhost:3001/api/services/${editingId}`
        : 'http://localhost:3001/api/services';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchServices();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Chargement des services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Services</h1>
          <p className="text-gray-400">Gérez les services affichés sur votre site</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Ajouter un service
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">
            {isAdding ? 'Nouveau Service' : 'Modifier le Service'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icône (Lucide name)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                placeholder="Package, Layout, etc."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
              
              {/* Preview de l'image */}
              {formData.image_url && (
                <div className="mb-4">
                  <img
                    src={formData.image_url.startsWith('http') ? formData.image_url : `http://localhost:3001${formData.image_url}`}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-white/10"
                  />
                </div>
              )}

              <div className="flex gap-3 items-end">
                {/* Upload d'image */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Uploader depuis votre appareil</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="service-image-upload"
                    />
                    <label
                      htmlFor="service-image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {uploading ? (
                        <span>Upload en cours...</span>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Choisir une image
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* OU saisie manuelle URL */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ou entrer une URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
              <input
                type="number"
                value={formData.order_position}
                onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C] px-4 py-2 rounded-lg font-semibold hover:opacity-90"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Icône: {service.icon}</span>
              <span>Position: {service.order_position}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
