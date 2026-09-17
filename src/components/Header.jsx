import React, { useState } from 'react';
import { Menu, X, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Header({ activePage, setActivePage, openConsultation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'tools', label: 'Financial Tools' },
    { id: 'learn', label: 'Vittiya Gyaan' },
    { id: 'about', label: 'About & Pricing' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        {/* Brand Logo */}
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <div className="logo-symbol">₹</div>
          <div className="logo-text">
            <span>FINANCE • TAX • ADVISORY</span>
            Vittiya Salakhaar
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Action CTAs */}
        <div className="header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={openConsultation}
            style={{ display: 'inline-flex' }}
          >
            <PhoneCall size={15} />
            Book Consultation
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="logo" style={{ fontSize: '18px' }}>
            <div className="logo-symbol" style={{ width: '36px', height: '36px', fontSize: '17px' }}>₹</div>
            <div className="logo-text">
              <span>FINANCE • TAX</span>
              Vittiya Salakhaar
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--muted)' }}>
            <X size={22} />
          </button>
        </div>

        <nav className="drawer-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activePage === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn btn-gold"
            onClick={() => {
              setMobileMenuOpen(false);
              openConsultation();
            }}
          >
            <PhoneCall size={16} /> Book Consultation
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)', justifyContent: 'center' }}>
            <ShieldCheck size={14} color="var(--green)" /> 100% Confidential & Secure
          </div>
        </div>
      </div>
    </header>
  );
}
