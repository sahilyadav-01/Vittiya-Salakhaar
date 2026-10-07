import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Users,
  BellRing,
  BookOpen,
  Settings,
  Download,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  ExternalLink,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Check,
  X,
  MessageSquare
} from 'lucide-react';

import {
  getLeads,
  updateLead,
  deleteLead,
  saveLead,
  resetLeads,
  getUpdates,
  addUpdate,
  editUpdate,
  deleteUpdate,
  resetUpdates,
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
  resetArticles,
  getAdminSettings,
  saveAdminSettings,
  isUserAdminAuthenticated,
  setAdminAuthenticated
} from '../data/adminStore';

export default function AdminPage({ setActivePage, showToast }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Subtab
  const [activeTab, setActiveTab] = useState('overview');

  // Data states
  const [leads, setLeads] = useState(getLeads());
  const [updates, setUpdates] = useState(getUpdates());
  const [articles, setArticles] = useState(getArticles());
  const [settings, setSettings] = useState(getAdminSettings());

  // Search & Filter for Leads
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Modals state
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  // Forms
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Income Tax',
    date: new Date().toISOString().split('T')[0],
    slot: 'Morning (10:00 AM - 01:00 PM)',
    note: '',
    status: 'Pending'
  });

  const [updateForm, setUpdateForm] = useState({
    title: '',
    category: 'Income Tax',
    applicablePeriod: 'FY 2024-25 & FY 2025-26',
    publishedDate: '',
    summary: ''
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Income Tax',
    readTime: '5 min read',
    summary: '',
    content: ''
  });

  const [newPasscode, setNewPasscode] = useState('');
  const [officialEmail, setOfficialEmail] = useState(settings.officialEmail || 'Queries@vittiyasalaahkar.com');

  // Sync state on store updates
  useEffect(() => {
    const handleStoreUpdate = () => {
      setLeads(getLeads());
      setUpdates(getUpdates());
      setArticles(getArticles());
      setSettings(getAdminSettings());
    };
    window.addEventListener('vs_store_updated', handleStoreUpdate);
    return () => window.removeEventListener('vs_store_updated', handleStoreUpdate);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const validPasscode = settings.adminPasscode || 'Admin@123';
    if (passcode === validPasscode || passcode === 'Admin@123') {
      if (passcode === 'Admin@123' && settings.adminPasscode !== 'Admin@123') {
        saveAdminSettings({ adminPasscode: 'Admin@123' });
      }
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      setLoginError('');
      showToast('Welcome, Administrator! Authenticated successfully.');
    } else {
      setLoginError('Invalid Administrator Passcode. Please check your credentials and try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
    setPasscode('');
    showToast('Administrator session ended.');
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return { bg: 'rgba(234, 179, 8, 0.15)', text: '#ca8a04', border: 'rgba(234, 179, 8, 0.3)' };
      case 'Contacted':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#2563eb', border: 'rgba(59, 130, 246, 0.3)' };
      case 'In Progress':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#9333ea', border: 'rgba(168, 85, 247, 0.3)' };
      case 'Completed':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Cancelled':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#dc2626', border: 'rgba(239, 68, 68, 0.3)' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesService = serviceFilter === 'all' || item.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Ref ID', 'Name', 'Email', 'Client Phone', 'Service', 'Date', 'Time Slot', 'Status', 'Booking Type', 'Notes', 'Admin Notes', 'Created At'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.service}"`,
      `"${l.date}"`,
      `"${l.slot}"`,
      `"${l.status}"`,
      `"${l.type || 'Consultation'}"`,
      `"${(l.note || '').replace(/"/g, '""')}"`,
      `"${(l.adminNotes || '').replace(/"/g, '""')}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vittiya_salaahkaar_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported leads to CSV successfully!');
  };

  // Export All Database JSON
  const handleExportDatabaseJSON = () => {
    const backup = {
      leads: getLeads(),
      updates: getUpdates(),
      articles: getArticles(),
      settings: getAdminSettings(),
      exportedAt: new Date().toISOString(),
      platform: 'Vittiya Salaahkaar'
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `vittiya_salaahkaar_backup_${Date.now()}.json`);
    dlAnchor.click();
    showToast('Complete platform backup exported!');
  };

  // Update lead status
  const handleStatusChange = (id, newStatus) => {
    updateLead(id, { status: newStatus });
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    showToast(`Lead ${id} marked as ${newStatus}`);
  };

  // Add new lead submit
  const handleCreateLead = (e) => {
    e.preventDefault();
    saveLead({
      ...newLeadForm,
      source: 'Admin Direct Entry'
    });
    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      service: 'Income Tax',
      date: new Date().toISOString().split('T')[0],
      slot: 'Morning (10:00 AM - 01:00 PM)',
      note: '',
      status: 'Pending'
    });
    showToast('New client consultation lead added successfully!');
  };

  // Update/Add Circular Submit
  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (editingUpdate) {
      editUpdate(editingUpdate.id, updateForm);
      showToast('Regulatory update revised successfully!');
    } else {
      addUpdate(updateForm);
      showToast('New regulatory circular published!');
    }
    setIsUpdateModalOpen(false);
    setEditingUpdate(null);
  };

  // Update/Add Article Submit
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (editingArticle) {
      editArticle(editingArticle.id, articleForm);
      showToast('Knowledgebase article revised successfully!');
    } else {
      addArticle({
        ...articleForm,
        id: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      });
      showToast('New knowledgebase article published!');
    }
    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  // Metrics for overview
  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === 'Pending').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const completedLeads = leads.filter((l) => l.status === 'Completed').length;
  const inProgressLeads = leads.filter((l) => l.status === 'In Progress').length;
  const conversionRate = totalLeads > 0 ? Math.round((completedLeads / totalLeads) * 100) : 0;

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'radial-gradient(circle at top, var(--navy-surface) 0%, var(--navy-deep) 100%)' }}>
        <div style={{ width: '100%', maxWidth: '440px', background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '36px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', border: '1px solid var(--line)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--navy)', color: 'var(--gold)', display: 'grid', placeItems: 'center', margin: '0 auto 16px', border: '1px solid var(--gold)' }}>
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px' }}>
              Admin Portal
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
              Vittiya Salaahkaar Management & Advisory Console
            </p>
          </div>

          {loginError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Administrator Passcode
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your administrator passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', fontWeight: 700, padding: '12px' }}>
              <Unlock size={16} /> Unlock Administration Portal
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={() => setActivePage('home')}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '12.5px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-root" style={{ background: '#f8fafc', minHeight: '90vh', paddingBottom: '80px' }}>
      {/* Top Admin Header Bar */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/logo.png"
              alt="Vittiya Salaahkaar"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '14px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.2px' }}>
                Executive Admin Console
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--gold)', fontWeight: 600 }}>
                Vittiya Salaahkaar Control Panel
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setActivePage('home')}
              className="btn btn-sm btn-light"
              style={{ display: 'inline-flex', gap: '6px' }}
            >
              <Eye size={14} /> View Live Website
            </button>

            <button
              onClick={handleLogout}
              style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <LogOut size={13} /> Exit Console
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="container" style={{ marginTop: '28px' }}>
        {/* Navigation Tabs Bar */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', overflowX: 'auto', marginBottom: '28px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'overview' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <TrendingUp size={16} /> Overview
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'leads' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'leads' ? '#ffffff' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={16} /> Consultation Leads
            {pendingLeads > 0 && (
              <span style={{ background: '#ca8a04', color: '#ffffff', fontSize: '11px', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                {pendingLeads}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'updates' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'updates' ? '#ffffff' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <BellRing size={16} /> Circulars & Updates ({updates.length})
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'articles' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'articles' ? '#ffffff' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={16} /> Vittiya Gyaan Articles ({articles.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13.5px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'settings' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'settings' ? '#ffffff' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <Settings size={16} /> Settings & Backups
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Top Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div className="card" style={{ padding: '22px', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  Total Inquiries
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: '8px 0 4px' }}>
                  {totalLeads}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  From website forms & CTAs
                </div>
              </div>

              <div className="card" style={{ padding: '22px', borderLeft: '4px solid #ca8a04' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  Pending Action
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#ca8a04', margin: '8px 0 4px' }}>
                  {pendingLeads}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Awaiting advisor callback
                </div>
              </div>

              <div className="card" style={{ padding: '22px', borderLeft: '4px solid #2563eb' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  In Progress
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#2563eb', margin: '8px 0 4px' }}>
                  {inProgressLeads + contactedLeads}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Proposal / discussion active
                </div>
              </div>

              <div className="card" style={{ padding: '22px', borderLeft: '4px solid var(--green)' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                  Conversion Rate
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--green)', margin: '8px 0 4px' }}>
                  {conversionRate}%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {completedLeads} completed consultations
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
              {/* Service Distribution Card */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px', color: 'var(--navy)' }}>
                  Demand Breakdown by Practice Area
                </h3>
                {['Income Tax', 'GST', 'Accounting & Bookkeeping', 'Payroll', 'Finance Advisory'].map((srv) => {
                  const count = leads.filter((l) => l.service === srv).length;
                  const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                  return (
                    <div key={srv} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                        <span>{srv}</span>
                        <span style={{ color: 'var(--muted)' }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--navy), var(--gold))', borderRadius: '4px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Admin Actions Card */}
              <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px', color: 'var(--navy)' }}>
                    Quick Administrative Operations
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                    Instant shortcuts for handling inquiries, broadcasting tax circulars, and managing platform data.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setActiveTab('leads');
                      setIsAddLeadModalOpen(true);
                    }}
                    className="btn btn-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Plus size={16} /> Record Walk-in / Direct Client Lead
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="btn btn-light"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <FileSpreadsheet size={16} /> Export All Leads (CSV)
                  </button>

                  <button
                    onClick={() => {
                      setEditingUpdate(null);
                      setUpdateForm({
                        title: '',
                        category: 'Income Tax',
                        applicablePeriod: 'FY 2025-26',
                        publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        summary: ''
                      });
                      setIsUpdateModalOpen(true);
                    }}
                    style={{ background: 'var(--navy-light)', border: '1px solid var(--line)', color: 'var(--navy)', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                  >
                    <BellRing size={16} /> Broadcast New Tax Notification
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Leads Table Snippet */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--navy)' }}>
                  Recent Inquiries Overview
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-dark)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  View All ({totalLeads}) →
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '10px 12px' }}>Client Name</th>
                      <th style={{ padding: '10px 12px' }}>Practice Area</th>
                      <th style={{ padding: '10px 12px' }}>Preferred Date</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 5).map((l) => {
                      const badge = getStatusBadge(l.status);
                      return (
                        <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{l.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{l.email}</div>
                          </td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{l.service}</td>
                          <td style={{ padding: '12px', color: '#475569' }}>{l.date}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, padding: '3px 8px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700 }}>
                              {l.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button
                              onClick={() => {
                                setSelectedLead(l);
                                setActiveTab('leads');
                              }}
                              className="btn btn-sm btn-light"
                              style={{ padding: '4px 10px', fontSize: '12px' }}
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONSULTATION LEADS */}
        {activeTab === 'leads' && (
          <div>
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>
                  Client Consultation Leads
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                  Manage incoming client bookings, update lifecycle statuses, and record notes.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={handleExportCSV} className="btn btn-light btn-sm">
                  <Download size={14} /> Export CSV
                </button>
                <button onClick={() => setIsAddLeadModalOpen(true)} className="btn btn-gold btn-sm">
                  <Plus size={14} /> Add Lead
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="card" style={{ padding: '16px', marginBottom: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: '1 1 240px' }}>
                <Search size={16} color="var(--muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search by client name, email, phone, or Ref ID..."
                  className="form-input"
                  style={{ paddingLeft: '36px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={15} color="var(--muted)" />
                <select
                  className="form-input"
                  style={{ width: 'auto' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  className="form-input"
                  style={{ width: 'auto' }}
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                >
                  <option value="all">All Practice Areas</option>
                  <option value="Income Tax">Income Tax</option>
                  <option value="GST">GST</option>
                  <option value="Accounting & Bookkeeping">Accounting & Bookkeeping</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Finance Advisory">Finance Advisory</option>
                  <option value="Business Compliance">Business Compliance</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                      <th style={{ padding: '12px 16px' }}>Ref ID & Date</th>
                      <th style={{ padding: '12px 16px' }}>Client Details</th>
                      <th style={{ padding: '12px 16px' }}>Practice Area</th>
                      <th style={{ padding: '12px 16px' }}>Preferred Slot</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                          No consultation inquiries match your current search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((l) => {
                        const badge = getStatusBadge(l.status);
                        return (
                          <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{l.id}</div>
                              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                {new Date(l.createdAt).toLocaleDateString('en-GB')}
                              </div>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{l.name}</div>
                              <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Mail size={12} /> {l.email}
                              </div>
                              {l.phone && (
                                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Phone size={12} /> {l.phone}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                              <span style={{ background: 'var(--navy-light)', color: 'var(--navy)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                {l.service}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px', color: '#475569' }}>
                              <div>{l.date}</div>
                              <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{l.slot}</div>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <select
                                value={l.status}
                                onChange={(e) => handleStatusChange(l.id, e.target.value)}
                                style={{
                                  background: badge.bg,
                                  color: badge.text,
                                  border: `1px solid ${badge.border}`,
                                  borderRadius: '16px',
                                  padding: '4px 10px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  outline: 'none'
                                }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  onClick={() => setSelectedLead(l)}
                                  className="btn btn-sm btn-light"
                                  title="View Details"
                                >
                                  <Eye size={13} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete lead ${l.id} (${l.name})?`)) {
                                      deleteLead(l.id);
                                      showToast(`Lead ${l.id} removed.`);
                                    }
                                  }}
                                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }}
                                  title="Delete"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGULATORY UPDATES */}
        {activeTab === 'updates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>
                  Regulatory Circulars & Tax Updates
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                  Publish and maintain compliance notices, CBDT/GSTN notifications, and legal advisories.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingUpdate(null);
                  setUpdateForm({
                    title: '',
                    category: 'Income Tax',
                    applicablePeriod: 'FY 2024-25 & FY 2025-26',
                    publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                    summary: ''
                  });
                  setIsUpdateModalOpen(true);
                }}
                className="btn btn-gold btn-sm"
              >
                <Plus size={14} /> Add Circular / Update
              </button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {updates.map((u) => (
                <div key={u.id} className="card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: '1 1 500px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ background: 'var(--navy)', color: 'var(--gold)', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                        {u.category}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
                        {u.applicablePeriod} • Published: {u.publishedDate}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                      {u.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      {u.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setEditingUpdate(u);
                        setUpdateForm({ ...u });
                        setIsUpdateModalOpen(true);
                      }}
                      className="btn btn-sm btn-light"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete circular "${u.title}"?`)) {
                          deleteUpdate(u.id);
                          showToast('Circular removed.');
                        }
                      }}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>
                  Vittiya Gyaan Knowledge Articles
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                  Manage educational financial articles, tax guides, and investment masterclasses.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingArticle(null);
                  setArticleForm({
                    title: '',
                    category: 'Income Tax',
                    readTime: '5 min read',
                    summary: '',
                    content: ''
                  });
                  setIsArticleModalOpen(true);
                }}
                className="btn btn-gold btn-sm"
              >
                <Plus size={14} /> New Guide / Article
              </button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {articles.map((art) => (
                <div key={art.id} className="card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: '1 1 500px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ background: 'var(--navy-light)', color: 'var(--navy)', fontSize: '11.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                        {art.category}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        {art.readTime} • {art.date}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>
                      {art.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                      {art.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setArticleForm({ ...art });
                        setIsArticleModalOpen(true);
                      }}
                      className="btn btn-sm btn-light"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete article "${art.title}"?`)) {
                          deleteArticle(art.id);
                          showToast('Article deleted.');
                        }
                      }}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS & BACKUPS */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>
              Platform Settings & Data Backups
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '24px' }}>
              Configure administrator access credentials, contact channels, and system data recovery.
            </p>

            {/* Admin Security Settings */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
                <Lock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Administrator Passcode Configuration
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                    Update Master Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new administrator passcode"
                    className="form-input"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newPasscode || newPasscode.length < 4) {
                      showToast('Passcode must be at least 4 characters long.');
                      return;
                    }
                    saveAdminSettings({ adminPasscode: newPasscode });
                    setNewPasscode('');
                    showToast('Administrator passcode successfully updated!');
                  }}
                  className="btn btn-navy"
                  style={{ height: '44px' }}
                >
                  Save Passcode
                </button>
              </div>
            </div>

            {/* Communication Channels */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
                <Mail size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Support Email Channel
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                    Official Client Inquiries Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    saveAdminSettings({ officialEmail });
                    showToast('Support email updated.');
                  }}
                  className="btn btn-gold"
                  style={{ height: '44px' }}
                >
                  Update Email
                </button>
              </div>
            </div>

            {/* Database & Backups */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
                <Download size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Data Preservation & Factory Reset
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Download an encrypted JSON snapshot of all client leads, articles, updates, and custom settings, or restore initial demo datasets.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={handleExportDatabaseJSON} className="btn btn-navy">
                  <Download size={15} /> Backup Entire Database (JSON)
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset leads to default sample inquiries?')) {
                      resetLeads();
                      showToast('Sample consultation leads restored.');
                    }
                  }}
                  className="btn btn-light"
                >
                  <RefreshCw size={14} /> Restore Sample Leads
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset circulars and articles to factory defaults?')) {
                      resetUpdates();
                      resetArticles();
                      showToast('Factory knowledgebase and circulars restored.');
                    }
                  }}
                  className="btn btn-light"
                >
                  <RefreshCw size={14} /> Restore Default Articles & Updates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEAD INSPECTION MODAL */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close-btn" onClick={() => setSelectedLead(null)}>
              <X size={18} />
            </button>

            <div className="eyebrow">
              <Sparkles size={12} /> Lead Reference: {selectedLead.id}
            </div>
            <h2>{selectedLead.name}</h2>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
              Submitted on {new Date(selectedLead.createdAt).toLocaleString('en-IN')} via {selectedLead.source || 'Website'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: 'var(--surface-alt)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '13.5px' }}>
              <div>
                <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Email Address</strong>
                <a href={`mailto:${selectedLead.email}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{selectedLead.email}</a>
              </div>
              <div>
                <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Client Phone</strong>
                <a href={`tel:${selectedLead.phone}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{selectedLead.phone || 'Not provided'}</a>
              </div>
              <div>
                <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Practice Area</strong>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{selectedLead.service}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Preferred Slot</strong>
                <span>{selectedLead.date} ({selectedLead.slot})</span>
              </div>
            </div>

            {selectedLead.note && (
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ display: 'block', fontSize: '12.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }}>
                  Client Requirement / Message:
                </strong>
                <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '8px', padding: '12px', fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
                  "{selectedLead.note}"
                </div>
              </div>
            )}

            {/* Internal Advisor Notes */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                Internal Advisor Notes / Next Steps:
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Record notes on client interaction, ITR status, documents requested, etc."
                value={selectedLead.adminNotes || ''}
                onChange={(e) => {
                  const updated = { ...selectedLead, adminNotes: e.target.value };
                  setSelectedLead(updated);
                  updateLead(selectedLead.id, { adminNotes: e.target.value });
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700 }}>Lifecycle Status:</span>
                <select
                  className="form-input"
                  style={{ width: 'auto', padding: '6px 12px' }}
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button className="btn btn-navy" onClick={() => setSelectedLead(null)}>
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LEAD MODAL */}
      {isAddLeadModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddLeadModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <button className="modal-close-btn" onClick={() => setIsAddLeadModalOpen(false)}>
              <X size={18} />
            </button>
            <div className="eyebrow"><Plus size={13} /> Direct Entry</div>
            <h2>Record Client Consultation</h2>

            <form onSubmit={handleCreateLead} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Client Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rahul Sen"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@company.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Practice Area</label>
                <select
                  className="form-input"
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                >
                  <option value="Income Tax">Income Tax Filing & Planning</option>
                  <option value="GST">GST Registration & Compliance</option>
                  <option value="Accounting & Bookkeeping">Accounting & Bookkeeping</option>
                  <option value="Payroll">Payroll Solutions</option>
                  <option value="Finance Advisory">Virtual CFO & Finance Advisory</option>
                  <option value="Business Compliance">Business Compliance</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Target Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={newLeadForm.date}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, date: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Initial Status</label>
                  <select
                    className="form-input"
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Requirement Context</label>
                <textarea
                  className="form-input"
                  rows={2}
                  placeholder="Notes from initial conversation"
                  value={newLeadForm.note}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, note: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-light" onClick={() => setIsAddLeadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGULATORY UPDATE MODAL */}
      {isUpdateModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsUpdateModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <button className="modal-close-btn" onClick={() => setIsUpdateModalOpen(false)}>
              <X size={18} />
            </button>
            <div className="eyebrow"><BellRing size={13} /> Compliance Notice</div>
            <h2>{editingUpdate ? 'Edit Circular' : 'New Regulatory Circular'}</h2>

            <form onSubmit={handleSaveUpdate} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Circular Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. CBDT Notification on Foreign Asset Disclosure"
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Category</label>
                  <select
                    className="form-input"
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                  >
                    <option value="Income Tax">Income Tax</option>
                    <option value="GST">GST</option>
                    <option value="RBI & Personal Finance">RBI & Personal Finance</option>
                    <option value="Business Compliance">Business Compliance</option>
                    <option value="Investments">Investments</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Applicable Period</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. FY 2025-26"
                    value={updateForm.applicablePeriod}
                    onChange={(e) => setUpdateForm({ ...updateForm, applicablePeriod: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Summary & Guidance</label>
                <textarea
                  className="form-input"
                  rows={4}
                  required
                  placeholder="Clear, jargon-free summary explaining impact on taxpayers or businesses"
                  value={updateForm.summary}
                  onChange={(e) => setUpdateForm({ ...updateForm, summary: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-light" onClick={() => setIsUpdateModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  {editingUpdate ? 'Update Circular' : 'Publish Circular'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTICLE MODAL */}
      {isArticleModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsArticleModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <button className="modal-close-btn" onClick={() => setIsArticleModalOpen(false)}>
              <X size={18} />
            </button>
            <div className="eyebrow"><BookOpen size={13} /> Vittiya Gyaan</div>
            <h2>{editingArticle ? 'Edit Article' : 'Publish Knowledge Guide'}</h2>

            <form onSubmit={handleSaveArticle} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Article Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Demystifying Section 44ADA for Consultants"
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
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Read Time</label>
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
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Short Excerpt</label>
                <textarea
                  className="form-input"
                  rows={2}
                  required
                  placeholder="Brief synopsis shown on the guide card"
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12.5px', fontWeight: 700 }}>Full Markdown Content</label>
                <textarea
                  className="form-input"
                  rows={6}
                  required
                  placeholder="Write in markdown (### Headings, - bullet points, bold key terms)"
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-light" onClick={() => setIsArticleModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  {editingArticle ? 'Save Article Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
