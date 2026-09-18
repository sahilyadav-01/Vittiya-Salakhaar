import React, { useState } from 'react';
import { Menu, X, ArrowRight, PhoneCall, Phone, Mail, ShieldCheck, Sparkles } from 'lucide-react';

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
    <>
      {/* Top Announcement Bar with Helpline & Email */}
      <div className="announcement-bar">
        <span className="announcement-badge">Helpline</span>
        <a href="tel:+917042686395" style={{ color: '#ffffff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Phone size={12} color="var(--gold)" /> +91 70426 86395
        </a>
        <span style={{ opacity: 0.4, margin: '0 8px' }}>|</span>
        <a href="mailto:Queries@vittiyasalaahkar.com" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Mail size={12} /> Queries@vittiyasalaahkar.com
        </a>
        <span style={{ opacity: 0.4, margin: '0 8px' }}>•</span>
        <span>FY 2025-26 Tax Slabs & ₹75k Std Deduction Active</span>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          {/* Brand Logo with Official Image */}
          <a
            href="#home"
            className="logo-link"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            aria-label="Vittiya Salakhaar Home"
          >
            <img
              src="/logo.png"
              alt="Vittiya Salakhaar - Finance, Tax, Advisory"
              className="header-logo-img"
            />
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
              className="btn btn-gold btn-sm"
              onClick={() => openConsultation('Header CTA')}
              style={{ display: 'inline-flex' }}
            >
              <PhoneCall size={14} />
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
            <img
              src="/logo.png"
              alt="Vittiya Salakhaar"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
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
            <div style={{ background: 'var(--navy-light)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="tel:+917042686395" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <Phone size={14} color="var(--gold)" /> +91 70426 86395
              </a>
              <a href="mailto:Queries@vittiyasalaahkar.com" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', wordBreak: 'break-all' }}>
                <Mail size={14} /> Queries@vittiyasalaahkar.com
              </a>
            </div>

            <button
              className="btn btn-gold"
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultation('Mobile Drawer CTA');
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
    </>
  );
}
