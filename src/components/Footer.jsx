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
                alt="Vittiya Salakhaar - Finance, Tax, Advisory"
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
            <h4>Legal & Policies</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Vittiya Salakhaar is committed to 100% data confidentiality and statutory compliance under Indian IT regulations.'); }}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: All professional engagements are executed under mutual engagement letters.'); }}>Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Disclaimer: Informational tools and resources are estimates for educational purposes.'); }}>Disclaimer</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Refund Policy: Standard professional fee refund guidelines apply.'); }}>Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Statutory Disclaimer Box */}
        <div className="footer-disclaimer-box">
          <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>Important Disclaimer</strong>
          Information available on this website, including articles, calculators and other resources, is intended for general informational and educational purposes and should not be treated as personalised tax, investment, legal or financial advice. Users should verify information applicable to their individual circumstances and seek appropriate professional advice where required.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© 2026 Vittiya Salakhaar. All Rights Reserved.</span>
          <span className="footer-tagline-text">Empowering Indian Taxpayers, Freelancers, Startups & MSMEs.</span>
        </div>
      </div>
    </footer>
  );
}
