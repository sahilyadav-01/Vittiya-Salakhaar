import React from 'react';

export default function Footer({ setActivePage, openConsultation }) {
  const handleNav = (id) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col with Official Logo */}
          <div className="footer-col">
            <div className="footer-logo-box">
              <img
                src="/logo.png"
                alt="Vittiya Salaahkaar - Finance, Tax, Advisory"
                className="footer-logo-img"
              />
            </div>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#94a3b8', maxWidth: '300px' }}>
              Your Digital Finance Companion for Tax, Finance & Business.
            </p>
            <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gold)', fontWeight: 700 }}>
              Learn. Calculate. Plan. Get Expert Support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Services</a></li>
              <li><a href="#tools" onClick={(e) => { e.preventDefault(); handleNav('tools'); }}>Financial Tools</a></li>
              <li><a href="#learn" onClick={(e) => { e.preventDefault(); handleNav('learn'); }}>Vittiya Gyaan</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>Pricing</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About Us</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>Contact</a></li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="footer-col">
            <h4>Practice Areas</h4>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Income Tax</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>GST Compliance</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Accounting & Bookkeeping</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Payroll Solutions</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Business Compliance</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>Finance Advisory</a></li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="footer-col">
            <h4>Legal & Governance</h4>
            <ul>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); handleNav('privacy'); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); handleNav('terms'); }}>Terms of Service</a></li>
              <li><a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleNav('disclaimer'); }}>Statutory Disclaimer</a></li>
              <li><a href="#refund" onClick={(e) => { e.preventDefault(); handleNav('refund'); }}>Refund & Cancellation</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gold)', fontWeight: 700, display: 'block' }}>
                  Official Email
                </span>
                <a
                  href="mailto:Queries@vittiyasalaahkar.com"
                  style={{ color: '#ffffff', fontSize: '13px', wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}
                >
                  ✉️ Queries@vittiyasalaahkar.com
                </a>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px', lineHeight: 1.4 }}>
                🕒 Mon – Sat: 9:30 AM – 7:00 PM IST
              </div>
              <div style={{ marginTop: '4px' }}>
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => openConsultation('Footer Contact')}
                  style={{ fontSize: '12px', padding: '7px 14px', width: '100%', justifyContent: 'center' }}
                >
                  Book Online Advisory
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Statutory Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>Important Disclaimer</strong>
          Information available on this website, including articles, calculators and other resources, is intended for general informational and educational purposes and should not be treated as personalised tax, investment, legal or financial advice. Users should verify information applicable to their individual circumstances and seek appropriate professional advice where required.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© 2026 Vittiya Salaahkaar. All Rights Reserved.</span>
          <div className="footer-bottom-links" style={{ display: 'inline-flex', gap: '14px', alignItems: 'center' }}>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNav('privacy'); }} style={{ color: '#94a3b8', fontSize: '13px' }}>Privacy Policy</a>
            <span style={{ color: '#475569' }}>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); handleNav('terms'); }} style={{ color: '#94a3b8', fontSize: '13px' }}>Terms of Service</a>
            <span style={{ color: '#475569' }}>•</span>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleNav('disclaimer'); }} style={{ color: '#94a3b8', fontSize: '13px' }}>Disclaimer</a>
          </div>
          <span className="footer-tagline-text">Empowering Indian Taxpayers, Freelancers, Startups & MSMEs.</span>
        </div>
      </div>
    </footer>
  );
}
