import React, { useState } from 'react';
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
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function HomePage({ setActivePage, openConsultation, onLaunchTool }) {
  const [heroTab, setHeroTab] = useState('personal'); // 'personal' or 'business'

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchToolDirectly = (toolId) => {
    if (onLaunchTool) {
      onLaunchTool(toolId);
    } else {
      handleNavigate('tools');
    }
  };

  const popularTools = [
    {
      id: "tax",
      title: "Income Tax Calculator",
      desc: "Compare New vs Old Tax Regime with updated slabs & ₹75k Standard Deduction.",
      tag: "Tax Slabs",
      icon: <Calculator size={20} color="var(--blue)" />
    },
    {
      id: "sip",
      title: "SIP Calculator",
      desc: "Estimate the power of compounding on your monthly mutual fund investments.",
      tag: "Compounding",
      icon: <TrendingUp size={20} color="var(--gold-dark)" />
    },
    {
      id: "emi",
      title: "EMI Calculator",
      desc: "Calculate monthly loan installments, total interest, and amortisation breakdown.",
      tag: "Loans",
      icon: <Percent size={20} color="#8b5cf6" />
    },
    {
      id: "gst",
      title: "GST Calculator",
      desc: "Split inclusive and exclusive amounts across 5%, 12%, 18%, and 28% slabs.",
      tag: "Indirect Tax",
      icon: <Receipt size={20} color="var(--green)" />
    },
    {
      id: "cagr",
      title: "CAGR Calculator",
      desc: "Calculate the smoothed annualised rate of return for your multi-year investments.",
      tag: "Growth Rate",
      icon: <TrendingUp size={20} color="var(--gold-dark)" />
    },
    {
      id: "xirr",
      title: "XIRR Calculator",
      desc: "Estimate annualized returns for irregular cash inflows and staggered investments.",
      tag: "Cash Flows",
      icon: <Activity size={20} color="#06b6d4" />
    },
    {
      id: "retirement",
      title: "Retirement Calculator",
      desc: "Calculate your target nest egg factoring in inflation and post-retirement returns.",
      tag: "Life Goals",
      icon: <Clock size={20} color="#f97316" />
    },
    {
      id: "networth",
      title: "Net Worth Calculator",
      desc: "Map your complete balance sheet: liquid, invested and real assets minus debt.",
      tag: "Balance Sheet",
      icon: <PieChart size={20} color="var(--navy)" />
    }
  ];

  const gyaanTopics = [
    {
      title: "Income Tax",
      desc: "ITR regimes, deductions, TDS reconciliation, capital gains and tax audits.",
      icon: "₹",
      badge: "12 Guides"
    },
    {
      title: "Investments",
      desc: "SIP, mutual funds, CAGR, XIRR, compounding formulas and risk management.",
      icon: "↗",
      badge: "10 Guides"
    },
    {
      title: "Personal Finance",
      desc: "Zero-based budgeting, debt snowball, emergency funds and retirement planning.",
      icon: "🛡",
      badge: "10 Guides"
    },
    {
      title: "GST",
      desc: "GST registration, GSTR-1, GSTR-3B, GSTR-2B ITC matching, and notice replies.",
      icon: "🧾",
      badge: "10 Guides"
    },
    {
      title: "Business Finance",
      desc: "P&L, 13-week cash flow runway, working capital cycle, and unit economics.",
      icon: "📊",
      badge: "12 Guides"
    },
    {
      title: "Accounting",
      desc: "Double-entry bookkeeping, balance sheet analysis, bank reconciliations and MIS.",
      icon: "⚖",
      badge: "10 Guides"
    }
  ];

  const serviceHighlights = [
    {
      title: "Income Tax",
      tagline: "Tax Compliance Made Simple",
      desc: "ITR filing, tax computation, strategic tax planning, capital gains and notice assistance.",
      icon: <FileText size={22} color="var(--blue)" />,
      badge: "Personal & Business"
    },
    {
      title: "GST",
      tagline: "Stay Compliant. Stay Organised.",
      desc: "Registration, monthly GSTR-1/3B, ITC reconciliation, e-invoicing and notice support.",
      icon: <Receipt size={22} color="var(--gold-dark)" />,
      badge: "Indirect Tax"
    },
    {
      title: "Accounting",
      tagline: "Know Where Your Business Stands",
      desc: "Bookkeeping, bank reconciliations, vendor/customer ledgers, monthly closing and MIS.",
      icon: <Scale size={22} color="var(--green)" />,
      badge: "Core Operations"
    },
    {
      title: "Payroll",
      tagline: "Payroll Without Monthly Headaches",
      desc: "Salary structuring, payslips, PF/ESIC deductions, salary TDS and Form 16 issuance.",
      icon: <Users size={22} color="#8b5cf6" />,
      badge: "HR & Compliance"
    },
    {
      title: "Business Compliance",
      tagline: "Start Right. Stay Compliant.",
      desc: "Entity incorporation (Pvt Ltd, LLP, MSME), PAN/TAN, GST, and ROC compliance.",
      icon: <CheckCircle2 size={22} color="#06b6d4" />,
      badge: "Corporate Law"
    },
    {
      title: "Finance Advisory",
      tagline: "Turn Financial Data Into Decisions",
      desc: "Budgeting, rolling cash flow, MIS dashboards, profitability and virtual CFO support.",
      icon: <TrendingUp size={22} color="#f97316" />,
      badge: "Virtual CFO"
    }
  ];

  const whyUsPoints = [
    {
      num: "01",
      title: "Practical",
      desc: "We explain complex financial laws and computations in simple, understandable terms."
    },
    {
      num: "02",
      title: "Transparent",
      desc: "Clear upfront processes, transparent fee structures, and zero hidden charges."
    },
    {
      num: "03",
      title: "Digital",
      desc: "Built around a modern, seamless digital workflow with automated tools and digital delivery."
    },
    {
      num: "04",
      title: "Professional",
      desc: "Dedicated consultants committed to rigorous accuracy, confidentiality and legal integrity."
    },
    {
      num: "05",
      title: "Long-Term",
      desc: "Our objective is to become your trusted year-round financial partner, not just a filing service."
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
            <h1>
              Your Digital Finance Companion for <span className="text-gradient">Tax, Finance</span> & Business
            </h1>
            <p className="lead">
              Simple financial tools, practical financial knowledge and professional finance, tax and accounting support — all in one place.
            </p>

            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => handleNavigate('tools')}>
                <Calculator size={16} /> Explore Financial Tools
              </button>
              <button className="btn btn-light" onClick={() => handleNavigate('services')}>
                Get Professional Support <ArrowRight size={15} />
              </button>
            </div>

            <div className="hero-badge-row">
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> 100% Free Calculators
              </div>
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> Jargon-Free Knowledge
              </div>
              <div className="hero-badge">
                <CheckCircle2 size={16} className="hero-badge-icon" /> Confidential Advisory
              </div>
            </div>
          </div>

          {/* Hero Financial Health Card with Switcher */}
          <div className="hero-snapshot-card">
            <div className="snapshot-top">
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button
                    onClick={() => setHeroTab('personal')}
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: heroTab === 'personal' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                      color: heroTab === 'personal' ? 'var(--navy-deep)' : '#cbd5e1'
                    }}
                  >
                    Personal View
                  </button>
                  <button
                    onClick={() => setHeroTab('business')}
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: heroTab === 'business' ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                      color: heroTab === 'business' ? 'var(--navy-deep)' : '#cbd5e1'
                    }}
                  >
                    Business View
                  </button>
                </div>
                <div className="snapshot-score">
                  {heroTab === 'personal' ? '88/100' : '92/100'}
                  <span className="snapshot-grade-badge">
                    {heroTab === 'personal' ? 'Healthy' : 'Optimal'}
                  </span>
                </div>
              </div>
              <div className="snapshot-year">FY 2025-26</div>
            </div>

            {heroTab === 'personal' ? (
              <>
                <div className="snapshot-chart-wrap">
                  <div className="snapshot-bars">
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '55%' }} />
                      <span className="bar-label">SAV</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '75%' }} />
                      <span className="bar-label">INV</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual secondary" style={{ height: '22%' }} />
                      <span className="bar-label">DEBT</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '85%' }} />
                      <span className="bar-label">EMRG</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '65%' }} />
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
                    <strong>31.2%</strong>
                  </div>
                  <div className="snapshot-metric">
                    <small>Debt-to-Income</small>
                    <strong>18% (Low)</strong>
                  </div>
                  <div className="snapshot-metric">
                    <small>Emergency Fund</small>
                    <strong>6.5 Months</strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="snapshot-chart-wrap">
                  <div className="snapshot-bars">
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '82%' }} />
                      <span className="bar-label">REV</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '48%' }} />
                      <span className="bar-label">GROSS</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '28%' }} />
                      <span className="bar-label">NET</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual secondary" style={{ height: '35%' }} />
                      <span className="bar-label">DSO</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '70%' }} />
                      <span className="bar-label">RUNWAY</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar-visual" style={{ height: '88%' }} />
                      <span className="bar-label">HEALTH</span>
                    </div>
                  </div>
                </div>

                <div className="snapshot-metrics-grid">
                  <div className="snapshot-metric">
                    <small>Gross Margin</small>
                    <strong>42.5%</strong>
                  </div>
                  <div className="snapshot-metric">
                    <small>Debtor Days</small>
                    <strong>34 Days (Sound)</strong>
                  </div>
                  <div className="snapshot-metric">
                    <small>Cash Flow</small>
                    <strong>Positive</strong>
                  </div>
                </div>
              </>
            )}

            <button
              className="btn btn-outline-gold btn-sm"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => handleLaunchToolDirectly(heroTab === 'personal' ? 'health-check' : 'biz-health')}
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
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px', lineHeight: 1.6 }}>
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
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px', lineHeight: 1.6 }}>
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
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', minHeight: '65px', lineHeight: 1.6 }}>
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
            {popularTools.map((tool) => (
              <div
                key={tool.id}
                className="card"
                style={{ textAlign: 'left', padding: '24px', cursor: 'pointer' }}
                onClick={() => handleLaunchToolDirectly(tool.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="service-badge">{tool.tag}</span>
                  <div style={{ color: 'var(--navy)' }}>{tool.icon}</div>
                </div>
                <h4 style={{ fontSize: '17px', color: 'var(--navy)', marginBottom: '8px' }}>{tool.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', minHeight: '40px', lineHeight: 1.5 }}>{tool.desc}</p>
                <div style={{ marginTop: '14px', fontSize: '12.5px', fontWeight: 800, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Calculate Now <ChevronRight size={14} />
                </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--cream)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '18px',
                    fontWeight: 900,
                    color: 'var(--navy)'
                  }}>
                    {topic.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>{topic.badge}</span>
                </div>
                <h3>{topic.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', minHeight: '44px', lineHeight: 1.5 }}>{topic.desc}</p>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div className="card-icon" style={{ width: '44px', height: '44px', marginBottom: 0 }}>
                    {svc.icon}
                  </div>
                  <span className="service-badge" style={{ margin: 0 }}>{svc.badge}</span>
                </div>
                <h3>{svc.title}</h3>
                <div style={{ fontSize: '12.5px', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '8px' }}>
                  {svc.tagline}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', minHeight: '44px', lineHeight: 1.5 }}>{svc.desc}</p>
                <button
                  className="btn btn-sm btn-light"
                  style={{ marginTop: '18px', width: '100%', justifyContent: 'space-between' }}
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
            <div className="card" style={{ background: 'linear-gradient(145deg, #ffffff 0%, var(--cream) 100%)', border: '1.5px solid var(--line-strong)' }}>
              <div className="eyebrow">Personal Assessment</div>
              <h2>How Financially Healthy Are You?</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginBottom: '20px', lineHeight: 1.6 }}>
                Understand your financial position using our simple financial health assessment.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '26px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--ink-secondary)'
              }}>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Income</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Expenses</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Savings</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Investments</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Debt</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Emergency Fund</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Net Worth</span>
              </div>
              <button className="btn btn-gold" onClick={() => handleLaunchToolDirectly('health-check')}>
                Check Your Financial Health →
              </button>
            </div>

            {/* Business Financial Health Check */}
            <div className="card" style={{ background: 'linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)', border: '1.5px solid var(--line-strong)' }}>
              <div className="eyebrow" style={{ color: 'var(--blue)', background: 'var(--blue-light)', borderColor: 'rgba(37,99,235,0.2)' }}>
                Business Diagnostic
              </div>
              <h2>Understand Your Business Numbers</h2>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginBottom: '20px', lineHeight: 1.6 }}>
                A profitable business can still face cash-flow problems. Evaluate key indicators such as:
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '26px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--ink-secondary)'
              }}>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Revenue</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Gross Margin</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Net Margin</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Cash Flow</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Receivables</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Payables</span>
                <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>Working Capital</span>
              </div>
              <button className="btn btn-primary" onClick={() => handleLaunchToolDirectly('biz-health')}>
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
            {whyUsPoints.map((item) => (
              <div key={item.num} className="card" style={{ textAlign: 'left' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--navy)',
                  color: 'var(--gold)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '15px',
                  marginBottom: '16px',
                  border: '1px solid var(--gold)'
                }}>
                  {item.num}
                </div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
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
          <p className="lead" style={{ margin: '0 auto 34px' }}>
            Whether you want to learn something, calculate something or get professional help, start with Vittiya Salakhaar.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => handleNavigate('tools')}>
              <Calculator size={16} /> Explore Financial Tools
            </button>
            <button className="btn btn-light" onClick={() => openConsultation('Home Final CTA')}>
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
