import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { LayoutDashboard, Package, Image, Mail, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/services', icon: Package, label: 'Services' },
    { path: '/admin/gallery', icon: Image, label: 'Galerie' },
    { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1a1f2e] to-[#0A0F1C]">
      {/* Background effects */}
      <div className="blur-orb blur-orb-1"></div>
      <div className="blur-orb blur-orb-2"></div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#1a1f2e]/95 backdrop-blur-xl border-r border-white/10 flex-col p-6 z-50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Montama Admin</h1>
          <p className="text-sm text-gray-400 mt-1">{admin?.username}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0A0F1C]'
                    : 'text-gray-300 hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#1a1f2e]/95 backdrop-blur-xl border-b border-white/10 p-4 z-50 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Montama Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-2"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#1a1f2e]/95 backdrop-blur-xl border-r border-white/10 flex flex-col p-6">
            <div className="mb-8 mt-16">
              <p className="text-sm text-gray-400">{admin?.username}</p>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#0A0F1C]'
                        : 'text-gray-300 hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-64 pt-20 md:pt-8 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
