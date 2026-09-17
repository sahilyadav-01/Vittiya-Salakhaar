import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Calculator,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { pricingData } from '../data/servicesData';

export default function AboutPricingPage({ openConsultation, showToast }) {
  const [activePricingTab, setActivePricingTab] = useState('tax');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: 'Income Tax',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Enquiry received! Our advisor will connect with you within 24 business hours.');
  };

  const getPricingList = () => {
    switch (activePricingTab) {
      case 'tax': return pricingData.tax;
      case 'gst': return pricingData.gst;
      case 'accounting': return pricingData.accounting;
      case 'payroll': return pricingData.payroll;
      case 'business': return pricingData.business;
      default: return pricingData.tax;
    }
  };

  return (
    <div className="about-pricing-page-container">
      {/* About Hero */}
      <section className="hero" style={{ padding: '75px 0 60px' }}>
        <div className="container center-text">
          <div className="eyebrow">
            <Sparkles size={14} /> About Vittiya Salakhaar
          </div>
          <h1>Your Digital Finance Companion</h1>
          <p className="lead" style={{ margin: '0 auto 28px' }}>
            Vittiya Salakhaar is a finance, taxation, accounting and financial knowledge platform designed to help individuals and businesses understand and manage their financial requirements.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--surface-alt)',
            border: '1px solid var(--line)',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '14.5px',
            fontWeight: 700,
            color: 'var(--navy)'
          }}>
            <span>Knowledge</span>
            <span style={{ color: 'var(--gold-dark)' }}>+</span>
            <span>Technology</span>
            <span style={{ color: 'var(--gold-dark)' }}>+</span>
            <span>Professional Support</span>
          </div>

          <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--muted)', maxWidth: '640px', margin: '20px auto 0' }}>
            We believe people should have access to understandable financial information and simple tools before making important financial decisions.
          </p>
        </div>
      </section>

      {/* OUR THREE PILLARS */}
      <section className="section">
        <div className="container center-text">
          <div className="eyebrow">The Foundation</div>
          <h2>Our Three Pillars</h2>
          <p className="lead" style={{ margin: '0 auto' }}>
            Three interconnected pillars delivering complete clarity and confidence across your financial life.
          </p>

          <div className="grid-3" style={{ marginTop: '40px' }}>
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon gold">
                <BookOpen size={26} />
              </div>
              <span className="service-badge">Learn</span>
              <h3 style={{ marginTop: '10px' }}>Vittiya Gyaan</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
                Financial articles, guides, explainers and updates written without jargon to help you comprehend the tax laws and numbers behind decisions.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon blue">
                <Calculator size={26} />
              </div>
              <span className="service-badge" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>Calculate</span>
              <h3 style={{ marginTop: '10px' }}>Vittiya Tools</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
                Financial, tax, investment and loan calculators designed to provide clear, reliable estimates before you commit capital or choose a tax regime.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon green">
                <Briefcase size={26} />
              </div>
              <span className="service-badge" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>Get Help</span>
              <h3 style={{ marginTop: '10px' }}>Vittiya Services</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
                Professional tax, accounting, GST, payroll and finance support delivered by certified consultants who treat you as a long-term partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="section section-alt" id="pricing">
        <div className="container center-text">
          <div className="eyebrow">Indicative Professional Fees</div>
          <h2>Simple & Transparent Pricing</h2>
          <p className="lead" style={{ margin: '0 auto 36px' }}>
            Transparent starting fees tailored to your exact operational scale and compliance requirements.
          </p>

          {/* Pricing Tabs */}
          <div className="pricing-category-tabs">
            <button
              className={`calc-tab ${activePricingTab === 'tax' ? 'active' : ''}`}
              onClick={() => setActivePricingTab('tax')}
            >
              Individual Tax
            </button>
            <button
              className={`calc-tab ${activePricingTab === 'gst' ? 'active' : ''}`}
              onClick={() => setActivePricingTab('gst')}
            >
              GST Services
            </button>
            <button
              className={`calc-tab ${activePricingTab === 'accounting' ? 'active' : ''}`}
              onClick={() => setActivePricingTab('accounting')}
            >
              Accounting & Bookkeeping
            </button>
            <button
              className={`calc-tab ${activePricingTab === 'payroll' ? 'active' : ''}`}
              onClick={() => setActivePricingTab('payroll')}
            >
              Payroll
            </button>
            <button
              className={`calc-tab ${activePricingTab === 'business' ? 'active' : ''}`}
              onClick={() => setActivePricingTab('business')}
            >
              Business Finance & Advisory
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {getPricingList().map((tier, idx) => (
              <div key={idx} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <div className="popular-pill">RECOMMENDED</div>}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '22px', margin: 0 }}>{tier.name}</h3>
                    {tier.badge && <span className="service-badge">{tier.badge}</span>}
                  </div>

                  <div className="price-box">
                    <span className="price-amount">{tier.price}</span>
                    <span className="price-period"> / {tier.period}</span>
                  </div>

                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', minHeight: '44px', lineHeight: 1.5 }}>
                    {tier.desc}
                  </p>

                  <ul className="pricing-features-list">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle2 size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button
                    className={`btn ${tier.popular ? 'btn-gold' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                    onClick={() => openConsultation(`${tier.name} (${tier.price})`)}
                  >
                    <span>Get Started →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Enterprise Banner */}
          <div className="card" style={{ marginTop: '36px', textAlign: 'center', background: '#ffffff', border: '1.5px dashed var(--line-strong)' }}>
            <h3 style={{ fontSize: '19px' }}>Need a customized package for larger enterprises?</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '6px auto 16px', maxWidth: '600px' }}>
              Custom packages available for multi-branch companies, large-scale transaction volumes, or complex corporate restructuring.
            </p>
            <button className="btn btn-light" onClick={() => openConsultation('Custom Enterprise Package')}>
              Get a Custom Quote →
            </button>
          </div>

          {/* Pricing Note */}
          <div className="statutory-notice" style={{ textAlign: 'left', marginTop: '32px' }}>
            <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
              Pricing Terms & Conditions Note:
            </strong>
            Prices are indicative starting prices and may vary based on the nature, complexity, transaction volume and scope of work. Government fees, statutory charges, third-party charges and applicable taxes (GST) may be additional. Services are subject to applicable laws, regulations and professional requirements.
          </div>
        </div>
      </section>

      {/* CONTACT & ENQUIRY FORM */}
      <section className="section" id="contact">
        <div className="container">
          <div className="center-text" style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Connect With Us</div>
            <h2>Let's Talk About Your Requirement</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Whether you want to calculate something, learn about a financial topic or get professional support, we would be happy to hear from you.
            </p>
          </div>

          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            {!isSubmitted ? (
              <form onSubmit={handleContactSubmit} className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sahil Yadav"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="sahil@example.com"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      What do you need help with?
                    </label>
                    <select
                      className="form-input"
                      value={contactForm.requirement}
                      onChange={(e) => setContactForm({ ...contactForm, requirement: e.target.value })}
                    >
                      <option value="Income Tax">Income Tax</option>
                      <option value="GST">GST</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Payroll">Payroll</option>
                      <option value="Business Compliance">Business Compliance</option>
                      <option value="Finance Advisory">Finance Advisory</option>
                      <option value="Financial Tools">Financial Tools</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                    Tell us about your requirement
                  </label>
                  <textarea
                    rows={4}
                    className="form-input"
                    placeholder="Briefly describe your situation, transactions, or financial goals..."
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--muted)' }}>
                    <ShieldCheck size={16} color="var(--green)" /> Confidentiality Guaranteed
                  </div>
                  <button type="submit" className="btn btn-gold">
                    <Send size={15} /> Submit Enquiry
                  </button>
                </div>
              </form>
            ) : (
              <div className="card center-text" style={{ padding: '48px 30px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--green-light)',
                  color: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h2>Enquiry Successfully Submitted!</h2>
                <p className="lead" style={{ margin: '12px auto 24px', fontSize: '15px' }}>
                  Thank you, <strong>{contactForm.name}</strong>. Our team has received your enquiry regarding <strong>{contactForm.requirement}</strong> and will reach out to you at <strong>{contactForm.email}</strong> or <strong>{contactForm.phone}</strong> promptly.
                </p>
                <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                  Send Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BOOK A CONSULTATION DIRECT BANNER */}
      <section className="section section-dark">
        <div className="container center-text">
          <div className="eyebrow eyebrow-dark">Direct Expert Access</div>
          <h2>Need professional help right away?</h2>
          <p className="lead" style={{ margin: '0 auto 30px' }}>
            Book a dedicated consultation session with our senior finance and tax advisors.
          </p>
          <button className="btn btn-gold" onClick={() => openConsultation('Priority Consultation')}>
            <PhoneCall size={16} /> Book a Consultation →
          </button>
        </div>
      </section>
    </div>
  );
}
