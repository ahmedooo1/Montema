import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';

export default function GalleryManagement() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cuisines',
    image_url: '',
    media_type: 'image',
    order_position: 0
  });
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('Tous');

  const categories = ['Cuisines', 'Dressings', 'Meubles'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/gallery');
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      category: 'Cuisines',
      image_url: '',
      media_type: 'image',
      order_position: gallery.length + 1
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: '',
      category: 'Cuisines',
      image_url: '',
      media_type: 'image',
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
        ? `http://localhost:3001/api/gallery/${editingId}`
        : 'http://localhost:3001/api/gallery';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchGallery();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/gallery/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchGallery();
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  const filteredGallery = filter === 'Tous' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  if (loading) {
    return <div className="text-white">Chargement de la galerie...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion de la Galerie</h1>
          <p className="text-gray-400">Gérez les réalisations affichées sur votre site</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Ajouter une réalisation
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">
            {isAdding ? 'Nouvelle Réalisation' : 'Modifier la Réalisation'}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type de média</label>
              <select
                value={formData.media_type}
                onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {formData.media_type === 'video' ? 'Vidéo' : 'Image'}
              </label>
              
              {/* Preview de l'image ou vidéo */}
              {formData.image_url && (
                <div className="mb-4">
                  {formData.media_type === 'video' ? (
                    <video
                      src={formData.image_url.startsWith('http') ? formData.image_url : `http://localhost:3001${formData.image_url}`}
                      controls
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-white/10"
                    />
                  ) : (
                    <img
                      src={formData.image_url.startsWith('http') ? formData.image_url : `http://localhost:3001${formData.image_url}`}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-white/10"
                    />
                  )}
                </div>
              )}

              <div className="flex gap-3 items-end">
                {/* Upload d'image/vidéo */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Uploader depuis votre appareil</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept={formData.media_type === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleImageUpload}
                      className="hidden"
                      id="gallery-image-upload"
                    />
                    <label
                      htmlFor="gallery-image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {uploading ? (
                        <span>Upload en cours...</span>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Choisir {formData.media_type === 'video' ? 'une vidéo' : 'une image'}
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

      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setFilter('Tous')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filter === 'Tous'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Tous ({gallery.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-[#0A0F1C]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {cat} ({gallery.filter(item => item.category === cat).length})
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div key={item.id} className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
              {item.media_type === 'video' ? (
                <video
                  src={item.image_url.startsWith('http') ? item.image_url : `http://localhost:3001${item.image_url}`}
                  className="w-full h-full object-cover"
                  controls
                  muted
                />
              ) : (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#D4AF37]">{item.category}</span>
                <div className="flex items-center gap-2">
                  {item.media_type === 'video' && (
                    <span className="text-xs text-gray-400">📹</span>
                  )}
                  <span className="text-gray-500">Position: {item.order_position}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
