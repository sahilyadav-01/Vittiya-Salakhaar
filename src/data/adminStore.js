import { updatesData as initialUpdates } from './updatesData';
import { articlesData as initialArticles } from './articlesData';

const LEADS_STORAGE_KEY = 'vs_admin_leads_v1';
const UPDATES_STORAGE_KEY = 'vs_admin_updates_v1';
const ARTICLES_STORAGE_KEY = 'vs_admin_articles_v1';
const SETTINGS_STORAGE_KEY = 'vs_admin_settings_v1';
const AUTH_STORAGE_KEY = 'vs_admin_auth_v1';

// Seed initial consultation leads
const defaultLeads = [
  {
    id: 'VS-849201',
    name: 'Amitabh Sharma',
    email: 'amitabh.sharma@techcorp.in',
    phone: '+91 98201 44521',
    service: 'Income Tax',
    date: '2026-10-08',
    slot: 'Morning (10:00 AM - 01:00 PM)',
    note: 'Consultation required for capital gains calculation on ESOP liquidation and dual salary regime selection.',
    status: 'Pending',
    createdAt: '2026-10-06T10:15:00.000Z',
    type: 'Consultation Booking',
    source: 'Website Header CTA',
    adminNotes: 'Assigned to Senior Tax Advisor. Need FY25-26 Form 16 and AIS summary.'
  },
  {
    id: 'VS-738210',
    name: 'Priyanka Sen',
    email: 'priyanka@designcreatives.studio',
    phone: '+91 97112 88402',
    service: 'GST',
    date: '2026-10-09',
    slot: 'Afternoon (02:00 PM - 05:00 PM)',
    note: 'Export of design services to US clients. Need guidance on LUT filing and zero-rated GST invoicing.',
    status: 'Contacted',
    createdAt: '2026-10-05T14:30:00.000Z',
    type: 'Consultation Booking',
    source: 'GST Service Suite',
    adminNotes: 'Contacted via email. LUT documentation checklist sent. Follow up on Thursday.'
  },
  {
    id: 'VS-629104',
    name: 'Rajesh Mehra',
    email: 'rajesh@mehraenterprises.com',
    phone: '+91 94140 22319',
    service: 'Accounting & Bookkeeping',
    date: '2026-10-10',
    slot: 'Evening (05:00 PM - 08:00 PM)',
    note: 'Monthly bookkeeping and MIS reporting for private limited manufacturing company (turnover ₹4.2 Cr).',
    status: 'In Progress',
    createdAt: '2026-10-04T09:00:00.000Z',
    type: 'Contact Enquiry',
    source: 'About & Pricing Form',
    adminNotes: 'Initial proposal sent for Growth Accounting Plan @ ₹14,999/mo. Awaiting board approval.'
  },
  {
    id: 'VS-519283',
    name: 'Dr. Anand Verma',
    email: 'dr.anandverma@apollohealth.org',
    phone: '+91 98993 11820',
    service: 'Finance Advisory',
    date: '2026-10-07',
    slot: 'Morning (10:00 AM - 01:00 PM)',
    note: 'Virtual CFO advisory for setting up multi-specialty diagnostics clinic and debt syndication.',
    status: 'Completed',
    createdAt: '2026-10-02T16:45:00.000Z',
    type: 'Consultation Booking',
    source: 'Floating Widget',
    adminNotes: 'Strategy session conducted. Cash flow model delivered. Advisory retainer agreement signed.'
  },
  {
    id: 'VS-409182',
    name: 'Neha Chawla',
    email: 'neha.c@bluedigital.co',
    phone: '+91 99100 55412',
    service: 'Payroll',
    date: '2026-10-12',
    slot: 'Morning (10:00 AM - 01:00 PM)',
    note: 'Payroll setup for 35 remote team members including PF, ESIC, and Professional Tax compliance.',
    status: 'Pending',
    createdAt: '2026-10-07T08:20:00.000Z',
    type: 'Consultation Booking',
    source: 'Services Page',
    adminNotes: ''
  }
];

const defaultSettings = {
  adminPasscode: 'Admin@123',
  officialEmail: 'Queries@vittiyasalaahkar.com',
  workingHours: 'Mon – Sat: 9:30 AM – 7:00 PM IST',
  statutoryDisclaimer: 'All financial guidance and tax filings are subject to statutory compliance under Indian laws.'
};

// Safe JSON parser
function safeParse(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    // Dispatch custom event for reactive tab updates
    window.dispatchEvent(new CustomEvent('vs_store_updated', { detail: { key } }));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
}

// Leads API
export function getLeads() {
  const leads = safeParse(LEADS_STORAGE_KEY, null);
  if (!leads) {
    safeSet(LEADS_STORAGE_KEY, defaultLeads);
    return defaultLeads;
  }
  return leads;
}

export function saveLead(leadData) {
  const current = getLeads();
  const newLead = {
    id: leadData.id || `VS-${Math.floor(100000 + Math.random() * 900000)}`,
    name: leadData.name || 'Valued Client',
    email: leadData.email || '',
    phone: leadData.phone || '',
    service: leadData.service || leadData.requirement || 'General Advisory',
    date: leadData.date || new Date().toISOString().split('T')[0],
    slot: leadData.slot || 'Business Hours',
    note: leadData.note || leadData.message || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    type: leadData.type || 'Consultation Booking',
    source: leadData.source || 'Website Booking',
    adminNotes: ''
  };
  const updated = [newLead, ...current];
  safeSet(LEADS_STORAGE_KEY, updated);
  return newLead;
}

export function updateLead(id, changes) {
  const current = getLeads();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item
  );
  safeSet(LEADS_STORAGE_KEY, updated);
  return updated;
}

export function deleteLead(id) {
  const current = getLeads();
  const updated = current.filter((item) => item.id !== id);
  safeSet(LEADS_STORAGE_KEY, updated);
  return updated;
}

export function resetLeads() {
  safeSet(LEADS_STORAGE_KEY, defaultLeads);
  return defaultLeads;
}

// Updates / Circulars API
export function getUpdates() {
  const updates = safeParse(UPDATES_STORAGE_KEY, null);
  if (!updates) {
    safeSet(UPDATES_STORAGE_KEY, initialUpdates);
    return initialUpdates;
  }
  return updates;
}

export function addUpdate(update) {
  const current = getUpdates();
  const newUpdate = {
    ...update,
    id: update.id || `update-${Date.now()}`,
    publishedDate: update.publishedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    lastUpdatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  };
  const updated = [newUpdate, ...current];
  safeSet(UPDATES_STORAGE_KEY, updated);
  return newUpdate;
}

export function editUpdate(id, changes) {
  const current = getUpdates();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...changes, lastUpdatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : item
  );
  safeSet(UPDATES_STORAGE_KEY, updated);
  return updated;
}

export function deleteUpdate(id) {
  const current = getUpdates();
  const updated = current.filter((item) => item.id !== id);
  safeSet(UPDATES_STORAGE_KEY, updated);
  return updated;
}

export function resetUpdates() {
  safeSet(UPDATES_STORAGE_KEY, initialUpdates);
  return initialUpdates;
}

// Articles API
export function getArticles() {
  const articles = safeParse(ARTICLES_STORAGE_KEY, null);
  if (!articles) {
    safeSet(ARTICLES_STORAGE_KEY, initialArticles);
    return initialArticles;
  }
  return articles;
}

export function addArticle(article) {
  const current = getArticles();
  const newArticle = {
    ...article,
    id: article.id || `article-${Date.now()}`,
    date: article.date || 'Updated recently'
  };
  const updated = [newArticle, ...current];
  safeSet(ARTICLES_STORAGE_KEY, updated);
  return newArticle;
}

export function editArticle(id, changes) {
  const current = getArticles();
  const updated = current.map((item) => (item.id === id ? { ...item, ...changes } : item));
  safeSet(ARTICLES_STORAGE_KEY, updated);
  return updated;
}

export function deleteArticle(id) {
  const current = getArticles();
  const updated = current.filter((item) => item.id !== id);
  safeSet(ARTICLES_STORAGE_KEY, updated);
  return updated;
}

export function resetArticles() {
  safeSet(ARTICLES_STORAGE_KEY, initialArticles);
  return initialArticles;
}

// Settings API
export function getAdminSettings() {
  const settings = safeParse(SETTINGS_STORAGE_KEY, null);
  if (!settings) {
    safeSet(SETTINGS_STORAGE_KEY, defaultSettings);
    return defaultSettings;
  }
  // Automatically migrate legacy default passcode to Admin@123
  if (settings.adminPasscode === 'admin123') {
    settings.adminPasscode = 'Admin@123';
    safeSet(SETTINGS_STORAGE_KEY, settings);
  }
  return { ...defaultSettings, ...settings };
}

export function saveAdminSettings(changes) {
  const current = getAdminSettings();
  const updated = { ...current, ...changes };
  safeSet(SETTINGS_STORAGE_KEY, updated);
  return updated;
}

// Auth API
export function isUserAdminAuthenticated() {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authStatus) {
  try {
    if (authStatus) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Auth storage error:', e);
  }
}
