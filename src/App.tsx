import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ServicesManagement from './pages/ServicesManagement';
import GalleryManagement from './pages/GalleryManagement';
import ContactsManagement from './pages/ContactsManagement';
import LandingPage from './LandingPage';

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          {/* Public Route - Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
