import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ArticleModal from './components/ArticleModal';
import Toast from './components/Toast';
import { PhoneCall } from 'lucide-react';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import FinancialToolsPage from './pages/FinancialToolsPage';
import LearnPage from './pages/LearnPage';
import AboutPricingPage from './pages/AboutPricingPage';
import AdminPage from './pages/AdminPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeToolId, setActiveToolId] = useState('sip');
  const [legalTab, setLegalTab] = useState('privacy');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('Income Tax');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const legalSubTabs = ['privacy', 'terms', 'disclaimer', 'refund'];
      if (['home', 'services', 'tools', 'learn', 'about', 'admin', 'legal', ...legalSubTabs].includes(hash)) {
        if (legalSubTabs.includes(hash)) {
          setActivePage('legal');
          setLegalTab(hash);
        } else if (hash === 'legal') {
          setActivePage('legal');
        } else {
          setActivePage(hash);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (pageId, tab = null) => {
    const legalSubTabs = ['privacy', 'terms', 'disclaimer', 'refund'];
    if (legalSubTabs.includes(pageId)) {
      setActivePage('legal');
      setLegalTab(pageId);
      window.location.hash = pageId;
    } else if (pageId === 'legal') {
      setActivePage('legal');
      if (tab) setLegalTab(tab);
      window.location.hash = tab || legalTab || 'privacy';
    } else {
      setActivePage(pageId);
      window.location.hash = pageId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const launchToolFromHome = (toolId) => {
    setActiveToolId(toolId);
    navigateToPage('tools');
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
        openConsultation={() => openConsultation('Header CTA')}
      />

      {/* Main Page Body View */}
      <main>
        {activePage === 'home' && (
          <HomePage
            setActivePage={navigateToPage}
            openConsultation={openConsultation}
            onLaunchTool={launchToolFromHome}
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
            defaultToolId={activeToolId}
            showToast={showToast}
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

        {activePage === 'admin' && (
          <AdminPage
            setActivePage={navigateToPage}
            showToast={showToast}
          />
        )}

        {activePage === 'legal' && (
          <LegalPage
            initialTab={legalTab}
            openConsultation={openConsultation}
            showToast={showToast}
          />
        )}
      </main>

      {/* Floating Quick Action Widget (Hidden on Admin Portal) */}
      {activePage !== 'admin' && (
        <button
          className="floating-widget-btn"
          onClick={() => openConsultation('Floating Widget')}
          aria-label="Book Quick Consultation"
        >
          <PhoneCall size={16} />
          <span>Book Consultation</span>
        </button>
      )}

      {/* Global Persistent Footer */}
      <Footer
        setActivePage={navigateToPage}
        openConsultation={() => openConsultation('Footer CTA')}
      />

      {/* Modals & Toasts */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationService}
        navigateToPage={navigateToPage}
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
