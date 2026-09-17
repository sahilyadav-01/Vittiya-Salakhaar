import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Share2,
  FileText,
  Tag
} from 'lucide-react';
import { articlesData } from '../data/articlesData';
import { dictionaryData } from '../data/dictionaryData';
import { updatesData } from '../data/updatesData';

export default function LearnPage({ onSelectArticle, showToast }) {
  const [selectedTopicCat, setSelectedTopicCat] = useState('All');
  const [dictSearch, setDictSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const topicCategories = [
    'All',
    'Income Tax',
    'GST',
    'Investments',
    'Personal Finance',
    'Business Finance',
    'Accounting'
  ];

  const filteredArticles = selectedTopicCat === 'All'
    ? articlesData
    : articlesData.filter(a => a.category === selectedTopicCat);

  // Grouped Dictionary Terms
  const filteredDict = dictionaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(dictSearch.toLowerCase()) ||
                          item.definition.toLowerCase().includes(dictSearch.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const allTopicsIndex = [
    {
      cat: "Income Tax",
      topics: [
        "Income Tax Basics", "ITR Filing Guide", "Old vs New Tax Regime", "Form 16 Explained",
        "Form 26AS Explained", "Annual Information Statement (AIS)", "TDS Explained",
        "Capital Gains Tax", "Tax Deductions", "Advance Tax", "Tax Planning", "Income Tax Notices"
      ]
    },
    {
      cat: "GST",
      topics: [
        "GST Basics", "GST Registration", "GSTR-1", "GSTR-3B", "Input Tax Credit",
        "GST Reconciliation", "E-Invoice", "E-Way Bill", "GST Annual Compliance", "Common GST Mistakes"
      ]
    },
    {
      cat: "Investments",
      topics: [
        "What is SIP?", "What is CAGR?", "What is XIRR?", "What is Compounding?",
        "Equity vs Debt", "Mutual Fund Basics", "Risk & Return", "Asset Allocation",
        "Inflation & Investments", "Long-Term Investing"
      ]
    },
    {
      cat: "Personal Finance",
      topics: [
        "How to Create a Budget", "Emergency Fund", "Saving vs Investing", "Debt Management",
        "Credit Score", "Net Worth", "Retirement Planning", "Insurance Basics",
        "Financial Goals", "Personal Financial Planning"
      ]
    },
    {
      cat: "Business Finance",
      topics: [
        "Profit & Loss Explained", "Cash Flow Explained", "Working Capital", "Gross Margin",
        "Net Margin", "EBITDA", "Break-even Analysis", "Budgeting", "Financial Forecasting",
        "MIS Reporting", "Receivables Management", "Business Profitability"
      ]
    },
    {
      cat: "Accounting",
      topics: [
        "What is Bookkeeping?", "Balance Sheet Explained", "Profit & Loss Explained",
        "Cash Flow Statement", "Bank Reconciliation", "Accounts Receivable",
        "Accounts Payable", "Depreciation", "Working Capital", "Financial Ratios"
      ]
    }
  ];

  return (
    <div className="learn-page-container">
      {/* Hero */}
      <section className="hero" style={{ padding: '75px 0 55px' }}>
        <div className="container center-text">
          <div className="eyebrow">
            <BookOpen size={14} /> Vittiya Gyaan
          </div>
          <h1>Financial Knowledge Made Simple</h1>
          <p className="lead" style={{ margin: '0 auto 28px' }}>
            Understand tax, investments, personal finance and business finance without unnecessary jargon.
            <br />
            <strong>Learn. Understand. Make Better Decisions.</strong>
          </p>

          {/* Category Filter Tabs */}
          <div className="calc-tabs-bar" style={{ margin: '20px 0 0' }}>
            {topicCategories.map((cat) => (
              <button
                key={cat}
                className={`calc-tab ${selectedTopicCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedTopicCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="section" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="center-text" style={{ marginBottom: '32px' }}>
            <div className="eyebrow">Featured Deep-Dives</div>
            <h2>Practical Guides & Frameworks</h2>
            <p className="lead" style={{ margin: '0 auto', fontSize: '15px' }}>
              Written by experienced tax consultants and corporate accountants to demystify Indian financial systems.
            </p>
          </div>

          <div className="grid-3">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-card-body">
                  <div className="article-meta">
                    <span className="article-badge">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '19px', marginTop: '10px', marginBottom: '10px' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {article.summary}
                  </p>
                </div>

                <div style={{ padding: '0 28px 24px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    onClick={() => onSelectArticle(article)}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE CURRICULUM EXPLORER */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-text" style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Topic Directory</div>
            <h2>Explore All Knowledge Modules</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Structured curriculum covering every critical area of personal and commercial finance in India.
            </p>
          </div>

          <div className="grid-3">
            {allTopicsIndex.map((section, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Tag size={16} color="var(--gold-dark)" />
                  <h3 style={{ fontSize: '18px', color: 'var(--navy)', margin: 0 }}>{section.cat}</h3>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--ink-secondary)' }}>
                  {section.topics.map((t, tIdx) => (
                    <li
                      key={tIdx}
                      style={{
                        padding: '4px 0',
                        borderBottom: '1px solid var(--line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onClick={() => showToast(`Opening topic: ${t}`)}
                    >
                      <span>{t}</span>
                      <ArrowRight size={12} color="var(--muted)" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCIAL DICTIONARY (A-Z) */}
      <section className="section">
        <div className="container">
          <div className="center-text">
            <div className="eyebrow">Financial Dictionary</div>
            <h2>Understand the Language of Finance</h2>
            <p className="lead" style={{ margin: '0 auto 24px' }}>
              A clear, practical reference for commonly used financial, accounting and tax terms.
            </p>

            {/* Dictionary Search Input */}
            <div className="dict-search-wrap">
              <Search className="dict-search-icon" size={18} />
              <input
                type="text"
                className="dict-search-input"
                placeholder="Search term (e.g. CAGR, Input Tax Credit, Advance Tax, EBITDA)..."
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
              />
            </div>

            {/* Alphabetical Group Filter */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
              {['All', 'A — C', 'D — H', 'I — M', 'P — Z'].map((grp) => (
                <button
                  key={grp}
                  className={`btn btn-sm ${selectedGroup === grp ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setSelectedGroup(grp)}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>

          <div className="dict-grid">
            {filteredDict.map((item, idx) => (
              <div key={idx} className="dict-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="service-badge" style={{ fontSize: '10px' }}>{item.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.group}</span>
                </div>
                <h4>{item.term}</h4>
                <p>{item.definition}</p>
              </div>
            ))}
          </div>

          {filteredDict.length === 0 && (
            <div className="center-text" style={{ padding: '40px', color: 'var(--muted)' }}>
              No terms found matching "{dictSearch}". Try searching for another financial term.
            </div>
          )}
        </div>
      </section>

      {/* LATEST FINANCIAL UPDATES */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-text" style={{ marginBottom: '36px' }}>
            <div className="eyebrow">Regulatory Telemetry</div>
            <h2>Latest Financial Updates</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Stay informed about important developments in Income Tax, GST, RBI policies, and business compliance.
            </p>
          </div>

          <div className="grid-3">
            {updatesData.map((update) => (
              <div key={update.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="service-badge">{update.category}</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{update.publishedDate}</span>
                  </div>
                  <h3 style={{ fontSize: '17px', color: 'var(--navy)', marginBottom: '8px' }}>{update.title}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {update.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', fontSize: '12px', color: 'var(--ink-secondary)' }}>
                  <div><strong>Applicable Period:</strong> {update.applicablePeriod}</div>
                  <div style={{ marginTop: '2px', color: 'var(--muted)' }}>Last Updated: {update.lastUpdatedDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL CONTENT DISCLAIMER */}
      <section className="section" style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div className="statutory-notice">
            <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
              Educational Content Disclaimer:
            </strong>
            Financial, tax and investment content published on Vittiya Salakhaar is intended for general educational and informational purposes. Tax laws, regulations and financial products may change. Readers should consider their individual circumstances and obtain appropriate professional advice where necessary.
          </div>
        </div>
      </section>
    </div>
  );
}
