import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ArticleModal from './components/ArticleModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import FinancialToolsPage from './pages/FinancialToolsPage';
import LearnPage from './pages/LearnPage';
import AboutPricingPage from './pages/AboutPricingPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('Income Tax');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'tools', 'learn', 'about'].includes(hash)) {
        setActivePage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openConsultation = (serviceName = 'Income Tax') => {
    setConsultationService(typeof serviceName === 'string' ? serviceName : 'Income Tax');
    setIsConsultationOpen(true);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleShareArticle = (title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link to "${title}" copied to clipboard!`);
    } else {
      showToast('Article ready to share!');
    }
  };

  return (
    <div className="app-root">
      {/* Global Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={navigateToPage}
        openConsultation={() => openConsultation('General Advisory')}
      />

      {/* Main Page Body View */}
      <main>
        {activePage === 'home' && (
          <HomePage
            setActivePage={navigateToPage}
            openConsultation={openConsultation}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            openConsultation={openConsultation}
          />
        )}

        {activePage === 'tools' && (
          <FinancialToolsPage
            openConsultation={openConsultation}
          />
        )}

        {activePage === 'learn' && (
          <LearnPage
            onSelectArticle={(article) => setSelectedArticle(article)}
            showToast={showToast}
          />
        )}

        {activePage === 'about' && (
          <AboutPricingPage
            openConsultation={openConsultation}
            showToast={showToast}
          />
        )}
      </main>

      {/* Global Persistent Footer */}
      <Footer
        setActivePage={navigateToPage}
        openConsultation={() => openConsultation('General Advisory')}
      />

      {/* Modals & Toasts */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationService}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onShare={handleShareArticle}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
