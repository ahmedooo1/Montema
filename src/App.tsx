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
import FAQPage from './pages/FAQPage';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieSettings from './pages/CookieSettings';
import CookieBanner from './components/CookieBanner';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <BrowserRouter>
      <AdminProvider>
        <CookieBanner />
        <Routes>
          {/* Public Route - Landing Page */}
          <Route 
            path="/" 
            element={
              currentPage === 'home' ? (
                <LandingPage onNavigate={handleNavigate} />
              ) : (
                <FAQPage onNavigate={handleNavigate} scrollToSection={scrollToSection} />
              )
            } 
          />

          {/* Policy Pages */}
          <Route 
            path="/politique-cookies" 
            element={<CookiesPolicy onNavigate={handleNavigate} />} 
          />
          <Route 
            path="/politique-confidentialite" 
            element={<PrivacyPolicy onNavigate={handleNavigate} />} 
          />
          <Route 
            path="/conditions-utilisation" 
            element={<TermsOfService onNavigate={handleNavigate} />} 
          />
          <Route 
            path="/parametres-cookies" 
            element={<CookieSettings onNavigate={handleNavigate} />} 
          />

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
