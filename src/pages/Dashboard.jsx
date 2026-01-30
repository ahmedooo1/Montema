import { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Chargement des statistiques...</div>;
  }

  const statCards = [
    {
      title: 'Services',
      value: stats?.services || 0,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Réalisations',
      value: stats?.gallery || 0,
      icon: ImageIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Contacts',
      value: stats?.totalContacts || 0,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Nouveaux Messages',
      value: stats?.newContacts || 0,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de votre site Montema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Bienvenue dans votre espace d'administration</h2>
        <div className="space-y-3 text-gray-300">
          <p>• Gérez vos services et réalisations</p>
          <p>• Consultez et répondez aux demandes de contact</p>
          <p>• Mettez à jour le contenu de votre site en temps réel</p>
        </div>
      </div>
    </div>
  );
}
