import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0F1C] via-[#1a1f2e] to-[#0A0F1C]">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
