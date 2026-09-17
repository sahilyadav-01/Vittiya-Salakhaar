import React from 'react';
import {
  Calculator,
  BookOpen,
  Briefcase,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  PieChart,
  Percent,
  Receipt,
  Scale,
  Users,
  Compass,
  Activity,
  Layers
} from 'lucide-react';

export default function HomePage({ setActivePage, openConsultation }) {
  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularTools = [
    {
      title: "Income Tax Calculator",
      desc: "Estimate your income-tax liability based on the information entered.",
      tag: "Tax",
      targetCalc: "tax"
    },
    {
      title: "SIP Calculator",
      desc: "Estimate the potential future value of your monthly investments.",
      tag: "Investment",
      targetCalc: "sip"
    },
    {
      title: "EMI Calculator",
      desc: "Calculate your monthly loan payment and total interest.",
      tag: "Loans",
      targetCalc: "emi"
    },
    {
      title: "GST Calculator",
      desc: "Calculate GST-inclusive and GST-exclusive amounts.",
      tag: "Tax",
      targetCalc: "gst"
    },
    {
      title: "CAGR Calculator",
      desc: "Calculate the annualised growth rate of an investment.",
      tag: "Investment",
      targetCalc: "cagr"
    },
    {
      title: "XIRR Calculator",
      desc: "Calculate annualised returns when investments occur at different dates.",
      tag: "Investment",
      targetCalc: "xirr"
    },
    {
      title: "Retirement Calculator",
      desc: "Estimate the retirement corpus required based on your assumptions.",
      tag: "Personal Finance",
      targetCalc: "retirement"
    },
    {
      title: "Net Worth Calculator",
      desc: "Understand your assets, liabilities and estimated net worth.",
      tag: "Personal Finance",
      targetCalc: "networth"
    }
  ];

  const gyaanTopics = [
    {
      title: "Income Tax",
      desc: "ITR, tax regimes, deductions, TDS, capital gains and tax updates.",
      icon: "₹"
    },
    {
      title: "Investments",
      desc: "SIP, mutual funds, CAGR, XIRR, compounding and risk.",
      icon: "↗"
    },
    {
      title: "Personal Finance",
      desc: "Budgeting, savings, debt, emergency funds, insurance and retirement.",
      icon: "🛡"
    },
    {
      title: "GST",
      desc: "GST registration, returns, ITC, reconciliation and compliance.",
      icon: "🧾"
    },
    {
      title: "Business Finance",
      desc: "P&L, cash flow, working capital, profitability and budgeting.",
      icon: "📊"
    },
    {
      title: "Accounting",
      desc: "Bookkeeping, financial statements, reconciliation and MIS.",
      icon: "⚖"
    }
  ];

  const serviceHighlights = [
    {
      title: "Income Tax",
      desc: "ITR filing, tax computation, tax planning, capital gains and notice assistance.",
      icon: <FileText size={22} color="var(--blue)" />
    },
    {
      title: "GST",
      desc: "Registration, return filing, reconciliation, ITC review and compliance.",
      icon: <Receipt size={22} color="var(--gold-dark)" />
    },
    {
      title: "Accounting",
      desc: "Bookkeeping, reconciliation, payables, receivables and financial reporting.",
      icon: <Scale size={22} color="var(--green)" />
    },
    {
      title: "Payroll",
      desc: "Salary processing, payslips, payroll reports and related support.",
      icon: <Users size={22} color="#8b5cf6" />
    },
    {
      title: "Business Compliance",
      desc: "Business registration, MSME, PAN/TAN and applicable compliance support.",
      icon: <CheckCircle2 size={22} color="#06b6d4" />
    },
    {
      title: "Finance Advisory",
      desc: "Budgeting, cash flow, MIS, profitability analysis and financial planning.",
      icon: <TrendingUp size={22} color="#f97316" />
    }
  ];

  const whyUsPoints = [
    {
      title: "Practical",
      desc: "We explain financial matters in simple and understandable language."
    },
    {
      title: "Transparent",
      desc: "Clear processes and transparent professional fees."
    },
    {
      title: "Digital",
      desc: "Tools, content and services designed around a convenient digital experience."
    },
    {
      title: "Professional",
      desc: "Focused on accuracy, confidentiality and responsible financial support."
    },
    {
      title: "Long-Term",
      desc: "Our objective is to become a trusted financial partner, not just a filing service."
    }
  ];

  return (
    <div className="home-page-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} /> Understand. Calculate. Plan. Grow.
            </div>
            <h1>Your Digital Finance Companion for Tax, Finance & Business</h1>
            <p className="lead">
              Simple financial tools, practical financial knowledge and professional finance, tax and accounting support — all in one place.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => handleNavigate('tools')}>
                Explore Financial Tools <ArrowRight size={16} />
              </button>
              <button className="btn btn-light" onClick={() => handleNavigate('services')}>
                Get Professional Support
              </button>
            </div>

            <div className="hero-badge-row">
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> 100% Free Tools
              </div>
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> Jargon-Free Knowledge
              </div>
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> Confidential & Certified
              </div>
            </div>
          </div>

          {/* Hero Financial Health Card */}
          <div className="hero-snapshot-card">
            <div className="snapshot-top">
              <div>
                <span className="snapshot-title">Financial Health Snapshot</span>
                <div className="snapshot-score">
                  86/100
                  <span className="snapshot-grade-badge">Optimal</span>
                </div>
              </div>
              <div className="snapshot-year">FY 2025-26</div>
            </div>

            <div className="snapshot-chart-wrap">
              <div className="snapshot-bars">
                <div className="bar-col">
                  <div className="bar-visual" style={{ height: '45%' }} />
                  <span className="bar-label">SAV</span>
                </div>
                <div className="bar-col">
                  <div className="bar-visual" style={{ height: '65%' }} />
                  <span className="bar-label">INV</span>
                </div>
                <div className="bar-col">
                  <div className="bar-visual secondary" style={{ height: '28%' }} />
                  <span className="bar-label">DEBT</span>
                </div>
                <div className="bar-col">
                  <div className="bar-visual" style={{ height: '82%' }} />
                  <span className="bar-label">EMRG</span>
                </div>
                <div className="bar-col">
                  <div className="bar-visual" style={{ height: '70%' }} />
                  <span className="bar-label">TAX</span>
                </div>
                <div className="bar-col">
                  <div className="bar-visual" style={{ height: '90%' }} />
                  <span className="bar-label">CORP</span>
                </div>
              </div>
            </div>

            <div className="snapshot-metrics-grid">
              <div className="snapshot-metric">
                <small>Savings Ratio</small>
                <strong>28.4%</strong>
              </div>
              <div className="snapshot-metric">
                <small>Debt-to-Income</small>
                <strong>24% (Low)</strong>
              </div>
              <div className="snapshot-metric">
                <small>Emergency Fund</small>
                <strong>6.2 Months</strong>
              </div>
            </div>

            <button
              className="btn btn-outline-gold btn-sm"
              style={{ width: '100%', marginTop: '18px' }}
              onClick={() => handleNavigate('tools')}
            >
              Test Your Own Financial Position →
            </button>
          </div>
        </div>
      </section>

      {/* WHAT DO YOU NEED TODAY? */}
      <section className="section">
        <div className="container center-text">
          <div className="eyebrow">One Platform. Three Ways To Start.</div>
          <h2>What do you need today?</h2>
          <p className="lead">
            Choose whether you want to master the concepts, calculate your numbers, or engage professional support.
          </p>

          <div className="grid-3">
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon gold">
                <BookOpen size={26} />
              </div>
              <h3>📚 Learn</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px' }}>
                Understand Income Tax, GST, investments, accounting, personal finance and business finance through simple articles and practical guides.
              </p>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: '20px', width: '100%', justifyContent: 'space-between' }}
                onClick={() => handleNavigate('learn')}
              >
                <span>Explore Vittiya Gyaan</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon blue">
                <Calculator size={26} />
              </div>
              <h3>🧮 Calculate</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px' }}>
                Use our free financial calculators to estimate tax, EMI, SIP returns, CAGR, GST, retirement needs and more.
              </p>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: '20px', width: '100%', justifyContent: 'space-between' }}
                onClick={() => handleNavigate('tools')}
              >
                <span>Explore Financial Tools</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-icon green">
                <Briefcase size={26} />
              </div>
              <h3>💼 Get Expert Support</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px' }}>
                Get professional support for Income Tax, GST, accounting, payroll, compliance and business finance.
              </p>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: '20px', width: '100%', justifyContent: 'space-between' }}
                onClick={() => handleNavigate('services')}
              >
                <span>Explore Services</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAL TOOLS TEASER */}
      <section className="section section-alt">
        <div className="container center-text">
          <div className="eyebrow">Financial Tools</div>
          <h2>Calculate Before You Decide</h2>
          <p className="lead">
            Use simple calculators to understand your numbers and plan better.
          </p>

          <div className="grid-4">
            {popularTools.map((tool, idx) => (
              <div
                key={idx}
                className="card"
                style={{ textAlign: 'left', padding: '24px', cursor: 'pointer' }}
                onClick={() => handleNavigate('tools')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="service-badge">{tool.tag}</span>
                  <ArrowRight size={14} color="var(--muted)" />
                </div>
                <h4 style={{ fontSize: '17px', color: 'var(--navy)', marginBottom: '8px' }}>{tool.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{tool.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button className="btn btn-primary" onClick={() => handleNavigate('tools')}>
              View All Financial Tools →
            </button>
          </div>
        </div>
      </section>

      {/* VITTIYA GYAAN TEASER */}
      <section className="section">
        <div className="container center-text">
          <div className="eyebrow">Vittiya Gyaan</div>
          <h2>Financial Knowledge Made Simple</h2>
          <p className="lead" style={{ maxWidth: '650px' }}>
            Money, tax and business finance can be complicated. We explain important financial concepts in simple language so you can understand the numbers behind your decisions.
          </p>

          <div className="grid-3" style={{ marginTop: '40px' }}>
            {gyaanTopics.map((topic, idx) => (
              <div
                key={idx}
                className="card"
                style={{ textAlign: 'left', cursor: 'pointer' }}
                onClick={() => handleNavigate('learn')}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--cream)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '18px',
                  fontWeight: 900,
                  color: 'var(--navy)',
                  marginBottom: '14px'
                }}>
                  {topic.icon}
                </div>
                <h3>{topic.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{topic.desc}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--blue)' }}>
                  Read Topics →
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button className="btn btn-light" onClick={() => handleNavigate('learn')}>
              Read & Learn →
            </button>
          </div>
        </div>
      </section>

      {/* OUR PROFESSIONAL SERVICES TEASER */}
      <section className="section section-alt">
        <div className="container center-text">
          <div className="eyebrow">Our Professional Services</div>
          <h2>More Than Compliance</h2>
          <p className="lead">
            We help individuals and businesses manage their financial requirements throughout the year.
          </p>

          <div className="grid-3" style={{ marginTop: '40px' }}>
            {serviceHighlights.map((svc, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '14px' }}>{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', minHeight: '44px' }}>{svc.desc}</p>
                <button
                  className="btn btn-sm btn-light"
                  style={{ marginTop: '16px', width: '100%', justifyContent: 'space-between' }}
                  onClick={() => handleNavigate('services')}
                >
                  <span>Explore Service</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button className="btn btn-primary" onClick={() => handleNavigate('services')}>
              Explore All Services →
            </button>
          </div>
        </div>
      </section>

      {/* FINANCIAL HEALTH CHECKS DUAL BANNER */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {/* Personal Financial Health Check */}
            <div className="card" style={{ background: 'linear-gradient(145deg, #ffffff 0%, var(--cream) 100%)' }}>
              <div className="eyebrow">Financial Health Check</div>
              <h2>How Financially Healthy Are You?</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginBottom: '20px' }}>
                Understand your financial position using our simple financial health assessment.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ink-secondary)'
              }}>
                <span className="badge-item">Income</span> •
                <span className="badge-item">Expenses</span> •
                <span className="badge-item">Savings</span> •
                <span className="badge-item">Investments</span> •
                <span className="badge-item">Debt</span> •
                <span className="badge-item">Emergency Fund</span> •
                <span className="badge-item">Net Worth</span>
              </div>
              <button className="btn btn-gold" onClick={() => handleNavigate('tools')}>
                Check Your Financial Health →
              </button>
            </div>

            {/* Business Financial Health Check */}
            <div className="card" style={{ background: 'linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)' }}>Business Financial Health Check</div>
              <h2>Understand Your Business Numbers</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginBottom: '20px' }}>
                A profitable business can still face cash-flow problems. Evaluate key indicators such as:
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ink-secondary)'
              }}>
                <span>Revenue</span> |
                <span>Gross Margin</span> |
                <span>Net Margin</span> |
                <span>Cash Flow</span> |
                <span>Receivables</span> |
                <span>Payables</span> |
                <span>Working Capital</span>
              </div>
              <button className="btn btn-primary" onClick={() => handleNavigate('tools')}>
                Check Your Business Health →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VITTIYA SALAKHAAR? */}
      <section className="section section-alt">
        <div className="container center-text">
          <div className="eyebrow">Our Philosophy</div>
          <h2>Why Vittiya Salakhaar?</h2>
          <p className="lead">
            Built on integrity, transparency, and a long-term commitment to your financial peace of mind.
          </p>

          <div className="grid-3" style={{ marginTop: '40px' }}>
            {whyUsPoints.map((item, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'left' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--gold-light)',
                  color: 'var(--gold-dark)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                  marginBottom: '14px'
                }}>
                  0{idx + 1}
                </div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section-dark">
        <div className="container center-text">
          <div className="eyebrow eyebrow-dark">Start With Confidence</div>
          <h2>Your Finance. Your Tax. Your Growth.</h2>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            Whether you want to learn something, calculate something or get professional help, start with Vittiya Salakhaar.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => handleNavigate('tools')}>
              Explore Financial Tools
            </button>
            <button className="btn btn-light" onClick={openConsultation}>
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
