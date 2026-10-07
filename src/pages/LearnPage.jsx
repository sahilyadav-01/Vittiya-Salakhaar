import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Share2,
  FileText,
  Tag,
  Plus,
  Edit3,
  Trash2,
  Shield,
  Lock,
  Unlock,
  X,
  AlertCircle
} from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
  getUpdates,
  isUserAdminAuthenticated,
  setAdminAuthenticated,
  getAdminSettings
} from '../data/adminStore';

export default function LearnPage({ onSelectArticle, showToast }) {
  const [selectedTopicCat, setSelectedTopicCat] = useState('All');
  const [dictSearch, setDictSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [articlesList, setArticlesList] = useState(getArticles());
  const [updatesList, setUpdatesList] = useState(getUpdates());

  // Admin and modal states
  const [isAdmin, setIsAdmin] = useState(isUserAdminAuthenticated());
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [authError, setAuthError] = useState('');

  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Income Tax',
    readTime: '5 min read',
    date: 'Updated recently',
    summary: '',
    content: ''
  });

  useEffect(() => {
    const handleStoreUpdate = () => {
      setArticlesList(getArticles());
      setUpdatesList(getUpdates());
      setIsAdmin(isUserAdminAuthenticated());
    };
    window.addEventListener('vs_store_updated', handleStoreUpdate);
    return () => window.removeEventListener('vs_store_updated', handleStoreUpdate);
  }, []);

  const handleOpenAddArticle = () => {
    if (isUserAdminAuthenticated()) {
      setEditingArticle(null);
      setArticleForm({
        title: '',
        category: selectedTopicCat === 'All' ? 'Income Tax' : selectedTopicCat,
        readTime: '5 min read',
        date: `Updated ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`,
        summary: '',
        content: ''
      });
      setIsArticleModalOpen(true);
    } else {
      setAuthError('');
      setPasscodeAttempt('');
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const settings = getAdminSettings();
    const validPasscode = settings.adminPasscode || 'admin123';
    if (passcodeAttempt === validPasscode) {
      setAdminAuthenticated(true);
      setIsAdmin(true);
      setIsAuthModalOpen(false);
      showToast('Admin mode unlocked! You can now manage articles.');
      setEditingArticle(null);
      setArticleForm({
        title: '',
        category: selectedTopicCat === 'All' ? 'Income Tax' : selectedTopicCat,
        readTime: '5 min read',
        date: `Updated ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`,
        summary: '',
        content: ''
      });
      setIsArticleModalOpen(true);
    } else {
      setAuthError('Invalid administrator passcode. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setIsAdmin(false);
    showToast('Administrator session ended.');
  };

  const handleEditArticle = (art) => {
    setEditingArticle(art);
    setArticleForm({
      title: art.title || '',
      category: art.category || 'Income Tax',
      readTime: art.readTime || '5 min read',
      date: art.date || 'Updated recently',
      summary: art.summary || '',
      content: art.content || ''
    });
    setIsArticleModalOpen(true);
  };

  const handleDeleteArticle = (art) => {
    if (window.confirm(`Are you sure you want to delete article "${art.title}"?`)) {
      deleteArticle(art.id);
      showToast('Article deleted successfully.');
    }
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      showToast('Please enter an article title.');
      return;
    }
    if (editingArticle) {
      editArticle(editingArticle.id, articleForm);
      showToast('Article updated successfully.');
    } else {
      addArticle(articleForm);
      showToast('New article published to Vittiya Gyaan!');
    }
    setIsArticleModalOpen(false);
  };

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
    ? articlesList
    : articlesList.filter(a => a.category === selectedTopicCat);

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
          {/* Admin Editorial Mode Banner */}
          {isAdmin && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.05) 0%, rgba(202, 138, 4, 0.08) 100%)',
              border: '1px solid rgba(202, 138, 4, 0.35)',
              borderRadius: '10px',
              padding: '12px 18px',
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--navy)' }}>
                <Shield size={18} color="var(--gold-dark)" />
                <span><strong>Administrator Mode Active:</strong> You can publish new guides or edit/delete existing articles directly.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleOpenAddArticle}
                  className="btn btn-gold btn-sm"
                  style={{ fontSize: '12.5px', padding: '6px 14px' }}
                >
                  <Plus size={14} /> Add Article
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="btn btn-light btn-sm"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  <Lock size={12} /> Exit Admin
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="eyebrow">Featured Deep-Dives</div>
              <h2 style={{ marginBottom: '8px' }}>Practical Guides & Frameworks</h2>
              <p className="lead" style={{ margin: 0, fontSize: '15px' }}>
                Written by experienced tax consultants and corporate accountants to demystify Indian financial systems.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handleOpenAddArticle}
                className="btn btn-gold btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
              >
                <Plus size={15} />
                <span>{isAdmin ? 'Add Article' : 'Add Article (Admin)'}</span>
              </button>
            </div>
          </div>

          <div className="grid-3">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card" style={{ position: 'relative' }}>
                {/* Admin quick actions overlay */}
                {isAdmin && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    borderRadius: '6px',
                    padding: '3px 6px',
                    border: '1px solid var(--line)'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditArticle(article);
                      }}
                      title="Edit Article"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 5px', color: 'var(--navy)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11.5px', fontWeight: 700 }}
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <span style={{ color: 'var(--line)', margin: '0 2px' }}>|</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArticle(article);
                      }}
                      title="Delete Article"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '3px 5px', color: '#dc2626', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11.5px', fontWeight: 700 }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

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
            {updatesList.map((update) => (
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
            Financial, tax and investment content published on Vittiya Salaahkaar is intended for general educational and informational purposes. Tax laws, regulations and financial products may change. Readers should consider their individual circumstances and obtain appropriate professional advice where necessary.
          </div>
        </div>
      </section>

      {/* ADMIN PASSCODE AUTHENTICATION MODAL */}
      {isAuthModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <button className="modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>
              <X size={18} />
            </button>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--navy)', color: 'var(--gold)', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px' }}>
                Administrator Authorization
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                Enter your administrator passcode to add or manage articles.
              </p>
            </div>

            {authError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={15} />
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Passcode
                </label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter administrator passcode"
                  value={passcodeAttempt}
                  onChange={(e) => setPasscodeAttempt(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn btn-light" style={{ flex: 1 }} onClick={() => setIsAuthModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
                  <Unlock size={15} /> Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT ARTICLE MODAL */}
      {isArticleModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsArticleModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <button className="modal-close-btn" onClick={() => setIsArticleModalOpen(false)}>
              <X size={18} />
            </button>
            <div className="eyebrow"><BookOpen size={13} /> Vittiya Gyaan Editorial</div>
            <h2 style={{ marginBottom: '16px' }}>{editingArticle ? 'Edit Article / Guide' : 'Publish New Financial Guide'}</h2>

            <form onSubmit={handleSaveArticle}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Article Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Navigating Tax Audits under Section 44AB"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Category</label>
                  <select
                    className="form-input"
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                  >
                    <option value="Income Tax">Income Tax</option>
                    <option value="GST">GST</option>
                    <option value="Investments">Investments</option>
                    <option value="Personal Finance">Personal Finance</option>
                    <option value="Business Finance">Business Finance</option>
                    <option value="Accounting">Accounting</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Estimated Read Time</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 5 min read"
                    value={articleForm.readTime}
                    onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Reference / Tag Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Updated FY 2025-26"
                  value={articleForm.date}
                  onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Short Summary / Excerpt *</label>
                <textarea
                  className="form-input"
                  rows={2}
                  required
                  placeholder="Brief synopsis displayed on the guide card to help readers understand the topic"
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>
                  Full Article Content (Markdown)
                </label>
                <textarea
                  className="form-input"
                  rows={6}
                  placeholder="Write article in markdown format. Use ### for subheadings, - for bullet points, and code blocks with ``` if needed."
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                />
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '4px' }}>
                  Tip: Separate paragraphs with blank lines. Use <code>### Section Header</code> for headers and <code>- Bullet item</code> for lists.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-light" onClick={() => setIsArticleModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  {editingArticle ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
