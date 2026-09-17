import React from 'react';
import { CheckCircle2, ArrowRight, PhoneCall, Sparkles, User, Laptop, Rocket, Building2, TrendingUp } from 'lucide-react';
import { servicesData, audienceList, processSteps } from '../data/servicesData';

export default function ServicesPage({ openConsultation }) {
  const getAudienceIcon = (iconName) => {
    switch (iconName) {
      case 'User': return <User size={24} color="var(--blue)" />;
      case 'Laptop': return <Laptop size={24} color="var(--gold-dark)" />;
      case 'Rocket': return <Rocket size={24} color="#8b5cf6" />;
      case 'Building2': return <Building2 size={24} color="var(--green)" />;
      case 'TrendingUp': return <TrendingUp size={24} color="#f97316" />;
      default: return <User size={24} />;
    }
  };

  return (
    <div className="services-page-container">
      {/* Services Hero */}
      <section className="hero" style={{ padding: '75px 0 65px' }}>
        <div className="container center-text">
          <div className="eyebrow">
            <Sparkles size={14} /> Comprehensive Professional Solutions
          </div>
          <h1>Finance & Tax Services</h1>
          <p className="lead" style={{ margin: '0 auto 28px' }}>
            Professional Support for Every Stage of Your Financial Journey. From personal tax filing to ongoing business finance management, Vittiya Salakhaar provides practical support designed around your requirements.
          </p>
          <button className="btn btn-gold" onClick={() => openConsultation('General Advisory')}>
            <PhoneCall size={16} /> Book an Initial Consultation
          </button>
        </div>
      </section>

      {/* 6 In-Depth Service Suites */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '32px' }}>
            {servicesData.map((service, idx) => (
              <div key={service.id} className="service-full-card">
                <div className="service-card-top">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="service-badge">{service.badge}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--muted)' }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '26px', marginTop: '6px' }}>{service.title}</h2>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-dark)', marginBottom: '10px' }}>
                    {service.tagline}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                    {service.description}
                  </p>

                  <ul className="service-item-list">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => openConsultation(service.title)}
                  >
                    <span>{service.ctaText} →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section section-alt">
        <div className="container center-text">
          <div className="eyebrow">Client Archetypes</div>
          <h2>Who We Serve</h2>
          <p className="lead">
            Tailored financial support calibrated to your exact operational scale and compliance complexity.
          </p>

          <div className="grid-3" style={{ marginTop: '40px' }}>
            {audienceList.map((aud, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'left' }}>
                <div className="card-icon blue">
                  {getAudienceIcon(aud.icon)}
                </div>
                <h3>{aud.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', minHeight: '60px' }}>{aud.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                  {aud.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '11.5px',
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--line)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        color: 'var(--ink-secondary)',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (5-STEP PROCESS) */}
      <section className="section">
        <div className="container center-text">
          <div className="eyebrow">Seamless Engagement</div>
          <h2>How It Works</h2>
          <p className="lead">
            A transparent 5-step lifecycle ensuring accuracy, confidentiality, and prompt delivery.
          </p>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.step} className="process-card">
                <div className="process-step-badge">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '50px' }}>
            <button className="btn btn-gold" onClick={() => openConsultation('Service Requirement')}>
              Start Your Service Requirement Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
