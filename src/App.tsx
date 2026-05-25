import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Particles from './components/effects/Particles';
import MouseGlow from './components/effects/MouseGlow';
import AIAssistant from './components/ui/AIAssistant';
import WhatsAppBubble from './components/ui/WhatsAppBubble';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import WeddingPage from './pages/services/WeddingPage';
import BirthdayPage from './pages/services/BirthdayPage';
import CorporatePage from './pages/services/CorporatePage';
import ConcertPage from './pages/services/ConcertPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Particles />
      <MouseGlow />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wedding-engagement" element={<WeddingPage />} />
          <Route path="/birthday-celebrations" element={<BirthdayPage />} />
          <Route path="/corporate-expo-events" element={<CorporatePage />} />
          <Route path="/concert-entertainment" element={<ConcertPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <AIAssistant />
      <WhatsAppBubble />
      <Footer />
    </Router>
  );
}

export default App;

