import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  RotateCcw,
  Search,
  Printer,
  Mail,
  PhoneCall,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Scale,
  Eye,
  Database,
  Building,
  HelpCircle
} from 'lucide-react';

export default function LegalPage({
  initialTab = 'privacy',
  openConsultation,
  showToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMatchCount(0);
      return;
    }
    const container = document.querySelector('.legal-document');
    if (!container) return;
    const text = container.innerText.toLowerCase();
    const q = searchQuery.toLowerCase();
    const safeRegex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = text.match(safeRegex);
    setMatchCount(matches ? matches.length : 0);
  }, [searchQuery, activeTab]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Find elements containing text
      const elements = Array.from(document.querySelectorAll('.legal-document h2, .legal-document h3, .legal-document p, .legal-document li'));
      const found = elements.find(el => el.innerText.toLowerCase().includes(searchQuery.toLowerCase()));
      if (found) {
        found.scrollIntoView({ behavior: 'smooth', block: 'center' });
        found.style.transition = 'background 0.5s ease';
        found.style.background = '#fef3c7';
        setTimeout(() => {
          found.style.background = 'transparent';
        }, 2000);
      }
    }
  };

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck size={18} />, badge: 'IT Act & DPDPA Compliant' },
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={18} />, badge: 'Standard Engagement' },
    { id: 'disclaimer', label: 'Statutory Disclaimer', icon: <AlertTriangle size={18} />, badge: 'Educational & Financial' },
    { id: 'refund', label: 'Refund & Cancellation', icon: <RotateCcw size={18} />, badge: 'Fair Policy' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (showToast) showToast('Link to this legal policy copied to clipboard!');
    }
  };

  return (
    <div className="legal-page-container">
      {/* Header Banner */}
      <section className="legal-hero">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <ShieldCheck size={14} /> Legal & Statutory Governance
          </div>
          <h1 className="legal-title">Privacy Policy & Terms of Service</h1>
          <p className="legal-subtitle">
            Transparent, legally binding guidelines and stringent security protocols safeguarding your personal data, financial records, and client advisory engagements at Vittiya Salaahkaar.
          </p>

          <div className="legal-meta-bar">
            <span><strong>Effective Date:</strong> January 1, 2026</span>
            <span className="dot-divider">•</span>
            <span><strong>Last Updated:</strong> March 2026</span>
            <span className="dot-divider">•</span>
            <span><strong>Jurisdiction:</strong> Republic of India</span>
            <span className="dot-divider">•</span>
            <span><strong>Version:</strong> 2.4</span>
          </div>

          <div className="legal-quick-actions">
            <button className="btn btn-outline btn-sm" onClick={handlePrint}>
              <Printer size={14} /> Print Document
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleCopyLink}>
              <ExternalLink size={14} /> Share / Copy Link
            </button>
            <a href="mailto:Queries@vittiyasalaahkar.com" className="btn btn-gold btn-sm">
              <Mail size={14} /> Queries@vittiyasalaahkar.com
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container" style={{ padding: '40px 20px 80px' }}>
        {/* Navigation Tabs */}
        <div className="legal-tabs-wrapper">
          <div className="legal-tabs-bar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`legal-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && <span className="tab-pill">{tab.badge}</span>}
              </button>
            ))}
          </div>

          {/* Quick Filter */}
          <div className="legal-search-box">
            <Search size={16} color="var(--muted)" />
            <input
              type="text"
              placeholder="Search clauses (press Enter to jump)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <span style={{ fontSize: '11.5px', color: matchCount > 0 ? 'var(--green)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                {matchCount} {matchCount === 1 ? 'result' : 'results'}
              </span>
            )}
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="legal-tab-content">
            <div className="legal-summary-callout">
              <div className="callout-icon">
                <Lock size={22} color="var(--gold)" />
              </div>
              <div className="callout-body">
                <h4>Privacy & Data Protection Guarantee at a Glance</h4>
                <p>
                  Vittiya Salaahkaar operates under a strict <strong>Zero Third-Party Commercial Exploitation</strong> principle. We never sell, rent, or lease your PAN, Aadhaar, bank records, financial statements, or email to third-party telemarketers, credit card issuers, or loan aggregators. All tax and accounting data is collected strictly to perform statutory filings, calculations, and advisory requested by you.
                </p>
              </div>
            </div>

            <article className="legal-document">
              <h2>1. Introduction & Statutory Scope</h2>
              <p>
                Welcome to <strong>Vittiya Salaahkaar</strong> ("we", "our", "us", or "Platform"). This Privacy Policy outlines our procedures regarding the collection, handling, storage, processing, and protection of Personal Data and Sensitive Personal Data or Information (SPDI) acquired through our website, web applications, financial calculators, advisory consultations, and professional service engagements.
              </p>
              <p>
                This policy has been drafted in adherence to:
              </p>
              <ul>
                <li>The <strong>Information Technology Act, 2000</strong> (including Amendments).</li>
                <li>The <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> (SPDI Rules).</li>
                <li>The <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and applicable statutory rules issued thereunder by the Ministry of Electronics and Information Technology (MeitY), Government of India.</li>
                <li>Professional confidentiality guidelines applicable to chartered accountancy, taxation, and financial advisory practices in India.</li>
              </ul>

              <h2>2. Information We Collect</h2>
              <p>
                Depending on the specific services you access on our Platform, we may collect and process the following categories of information:
              </p>

              <h3>2.1 Personal Identification & Contact Details</h3>
              <ul>
                <li><strong>Full Name, Mobile Number, and Email Address:</strong> Collected during consultation booking, contact enquiries, newsletter subscriptions, or portal registration.</li>
                <li><strong>Residential Status & Jurisdiction:</strong> Indian Resident, Non-Resident Indian (NRI), or Overseas Citizen of India (OCI) classification for tax eligibility.</li>
                <li><strong>Business Name, GSTIN, and Registered Address:</strong> For MSMEs, sole proprietorships, partnerships, and corporate clients engaging us for business accounting and compliance.</li>
              </ul>

              <h3>2.2 Sensitive Personal & Financial Information (Client Engagements)</h3>
              <p>
                When you formally engage Vittiya Salaahkaar for professional taxation, accounting, or advisory services, you may securely provide:
              </p>
              <ul>
                <li><strong>Permanent Account Number (PAN):</strong> Essential for statutory Income Tax Return (ITR) filings, TDS reconciliations, and Form 26AS / AIS / TIS verification.</li>
                <li><strong>Aadhaar Information:</strong> Redacted/masked in compliance with UIDAI regulations, utilized solely for statutory Aadhaar-PAN linking and ITR e-verification as mandated by Section 139AA of the Income Tax Act, 1961.</li>
                <li><strong>Income & Compensation Records:</strong> Form 16, salary certificates, gratuity payments, perquisites, allowances, and dividend slips.</li>
                <li><strong>Investment & Deduction Documentation:</strong> ELSS certificates, PPF receipts, LIC premium receipts, Health Insurance (Section 80D), NPS contribution receipts (Section 80CCD), Home Loan interest certificates (Section 24(b)), and HRA rent receipts.</li>
                <li><strong>Bank Account Details:</strong> Bank statement copies, IFSC codes, and account numbers required for processing statutory tax refunds directly to pre-validated bank accounts.</li>
                <li><strong>Capital Gains & Trading Statements:</strong> Annual P&L statements from stockbrokers, mutual fund capital gain reports, cryptocurrency transaction registers, and immovable property sale deeds.</li>
                <li><strong>Business Financial Books:</strong> Sales invoices, purchase bills, trial balance, ledgers, depreciation schedules, and payroll registers.</li>
              </ul>

              <h3>2.3 Financial Calculators & Interactive Tools (Client-Side Computation)</h3>
              <div className="legal-highlight-box">
                <CheckCircle2 size={18} color="var(--green)" />
                <div>
                  <strong>Local In-Browser Calculation Guarantee:</strong> Figures you enter into our financial calculators (such as SIP Calculator, Income Tax Old vs New Regime Comparator, EMI Calculator, HRA Calculator, NPS Calculator, or Capital Gains Estimator) are processed <em>client-side in your web browser</em>. We do not store, log, or associate your private computational figures with your personal identity unless you voluntarily choose to submit them via a consultation request.
                </div>
              </div>

              <h3>2.4 Technical & Device Analytics</h3>
              <p>
                We collect standard non-identifying technical data including your IP address, browser type, operating system, pages visited, and session duration to ensure site reliability, diagnose server performance, and prevent distributed denial-of-service (DDoS) threats.
              </p>

              <h2>3. Purpose & Legal Basis of Processing</h2>
              <p>
                We process your data strictly for legitimate business and statutory purposes, including:
              </p>
              <ol>
                <li><strong>Executing Tax & Compliance Filings:</strong> Preparing, computing, and uploading Income Tax Returns (ITR-1 through ITR-7), GST returns (GSTR-1, GSTR-3B, GSTR-9), TDS returns (24Q, 26Q), and MCA ROC filings pursuant to your explicit mandate.</li>
                <li><strong>Delivering Advisory & Virtual CFO Services:</strong> Generating financial health scorecards, MIS reports, working capital assessments, and cash flow projections.</li>
                <li><strong>Scheduling Advisory Consultations:</strong> Coordinating consultation calls, verifying availability, and sharing customized advisory summaries.</li>
                <li><strong>Statutory Due Dates & Regulatory Alerts:</strong> Notifying you of impending statutory deadlines (e.g. advance tax quarterly due dates, ITR filing deadlines, monthly GST due dates) when you have opted in.</li>
                <li><strong>Audit Trails & Statutory Record Keeping:</strong> Maintaining necessary records as mandated under Indian tax laws, the Companies Act 2013, and professional accounting standards.</li>
              </ol>

              <h2>4. Confidentiality & Non-Disclosure Principles</h2>
              <p>
                At Vittiya Salaahkaar, client confidentiality is a sacred professional duty. We operate under strict non-disclosure obligations:
              </p>
              <ul>
                <li><strong>No Commercial Monetization:</strong> We never sell, barter, rent, trade, or transfer your contact information or financial information to third-party advertisers, credit rating agencies, or loan aggregators.</li>
                <li><strong>Authorized Statutory Portals Only:</strong> Your filings and tax credentials are transmitted exclusively to official Government of India web portals (e.g., <code>incometax.gov.in</code>, <code>gst.gov.in</code>, <code>mca.gov.in</code>, <code>traces.gov.in</code>) over encrypted channels on your explicit written/electronic instruction.</li>
                <li><strong>Role-Based Staff Access:</strong> Only vetted financial analysts and chartered accounting professionals assigned to your specific file have access to your documents. All team members sign stringent non-disclosure agreements (NDAs).</li>
              </ul>

              <h2>5. Data Security & Storage Architecture</h2>
              <p>
                We implement industry-standard administrative, physical, and technical safeguards designed to ensure the integrity and confidentiality of your sensitive data:
              </p>
              <ul>
                <li><strong>Transport Layer Security:</strong> All web traffic is encrypted using 256-bit TLS (Transport Layer Security) 1.3 protocol.</li>
                <li><strong>Encrypted Storage:</strong> Confidential client files and workpapers are stored in encrypted cloud repositories with multi-factor authentication (MFA) and granular permission tiers.</li>
                <li><strong>Zero Password Logging:</strong> We never log or store government portal passwords in plain text. Clients may choose to e-verify returns directly using Aadhaar OTP, Net Banking, or Digital Signature Certificate (DSC).</li>
                <li><strong>Periodic Purging:</strong> Raw draft calculations and unneeded supplementary documents are securely purged following the statutory completion and e-verification of returns.</li>
              </ul>

              <h2>6. Your Statutory Rights under Indian Law</h2>
              <p>
                In compliance with the Digital Personal Data Protection Act, 2023 (DPDPA), you retain the following rights regarding your personal data:
              </p>
              <ul>
                <li><strong>Right to Access:</strong> You may request a summary of your personal data processed by us and the processing activities undertaken.</li>
                <li><strong>Right to Correction & Updating:</strong> You have the right to rectify inaccurate, incomplete, or outdated personal or financial details in your client record.</li>
                <li><strong>Right to Erasure:</strong> You may request the deletion of your personal data, subject to statutory retention periods mandated under Section 149 and Section 153 of the Income Tax Act, 1961, and the Companies Act, 2013.</li>
                <li><strong>Right to Withdraw Consent:</strong> You may withdraw your consent for optional communications, newsletters, or advisory alerts at any time by sending an email with the subject "Unsubscribe" to <code>Queries@vittiyasalaahkar.com</code>.</li>
                <li><strong>Right to Grievance Redressal:</strong> You have the right to register complaints regarding data processing with our designated Grievance Officer.</li>
              </ul>

              <h2>7. Cookies & Tracking Technologies</h2>
              <p>
                Our website utilizes only essential session cookies and anonymous performance cookies:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required to preserve your session state, calculator preferences, and ensure navigation stability.</li>
                <li><strong>No Cross-Site Ad Trackers:</strong> We do not deploy invasive cross-platform advertising pixels or profiling cookies.</li>
                <li><strong>Browser Control:</strong> You can configure your browser to decline cookies. Most platform features, including public articles and calculator tools, remain fully operational with cookies disabled.</li>
              </ul>

              <h2>8. Retention Period of Financial Data</h2>
              <p>
                As a professional financial and taxation practice, we retain records in accordance with Indian statutory requirements:
              </p>
              <ul>
                <li><strong>Income Tax Assessment Records:</strong> Retained for up to 6–10 Assessment Years as recommended under Income Tax Act reassessment statutes.</li>
                <li><strong>GST & Indirect Tax Records:</strong> Retained for a period of 72 months (6 years) from the due date of filing the annual return (GSTR-9) under Section 36 of the CGST Act.</li>
                <li><strong>Prospective Enquiries / Leads:</strong> Unconverted consultation requests and general enquiries are automatically scrubbed after 12 months unless re-engaged.</li>
              </ul>

              <h2>9. Grievance Officer & Data Protection Desk</h2>
              <p>
                In accordance with the Information Technology Act, 2000 and the Rules made thereunder, and the DPDPA 2023, the contact details of our Grievance Officer are provided below:
              </p>
              <div className="legal-contact-card">
                <div>
                  <div className="contact-card-title">Grievance & Data Protection Officer</div>
                  <div className="contact-card-org">Vittiya Salaahkaar Governance Desk</div>
                  <div className="contact-card-email">
                    <Mail size={16} /> <strong>Email:</strong> <a href="mailto:Queries@vittiyasalaahkar.com">Queries@vittiyasalaahkar.com</a>
                  </div>
                  <div className="contact-card-support">
                    <span>🕒 <strong>Operating Hours:</strong> Monday – Saturday: 9:30 AM – 7:00 PM IST</span>
                    <span style={{ display: 'block', marginTop: '4px' }}>⏱️ <strong>Statutory Redressal SLA:</strong> Within 48–72 business hours</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Tab 2: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="legal-tab-content">
            <div className="legal-summary-callout">
              <div className="callout-icon">
                <Scale size={22} color="var(--gold)" />
              </div>
              <div className="callout-body">
                <h4>Terms of Professional Engagement at a Glance</h4>
                <p>
                  By accessing Vittiya Salaahkaar or commissioning our advisory, taxation, accounting, or compliance services, you agree to these Terms of Service. Self-service calculators and articles provide educational estimates; formal professional filings and advice are governed by clear mutual engagement terms and accurate client disclosures.
                </p>
              </div>
            </div>

            <article className="legal-document">
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you (whether personally or on behalf of an entity, "User", "Client", or "you") and <strong>Vittiya Salaahkaar</strong> ("we", "our", "us", or "Platform"), concerning your access to and use of our website, applications, financial tools, and professional consultancy services.
              </p>
              <p>
                By browsing the website, utilizing our financial calculators, reading Vittiya Gyaan articles, scheduling a consultation, or engaging our tax and accounting services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with all of these Terms, you are expressly prohibited from using the platform.
              </p>

              <h2>2. Eligibility & Representation</h2>
              <p>
                By using this Platform, you represent and warrant that:
              </p>
              <ul>
                <li>You are at least 18 years of age and possess the legal capacity to enter into a binding contract under the Indian Contract Act, 1872.</li>
                <li>If you are acting on behalf of a company, partnership, LLP, trust, or proprietary business, you have the full legal authority to bind that entity to these Terms.</li>
                <li>All registration, contact, and billing information you submit is true, accurate, current, and complete.</li>
              </ul>

              <h2>3. Scope of Services: Informational vs Professional Engagements</h2>
              <p>
                Vittiya Salaahkaar provides services categorized into two distinct categories:
              </p>

              <h3>3.1 Informational Resources & Computational Tools (Public Tier)</h3>
              <ul>
                <li>Financial calculators (Income Tax Old vs New Regime, SIP, EMI, GST, Capital Gains, NPS, Retirement, HRA, etc.) and educational articles published under Vittiya Gyaan are designed to provide mathematical estimates and conceptual clarity.</li>
                <li><strong>No Solicitor-Client or Professional Fiduciary Privilege:</strong> Merely using a calculator or reading an article does not establish a formal advisor-client relationship or guarantee tax savings.</li>
                <li>Calculations are based on prevailing legislative provisions (e.g. Finance Act 2025/2026 provisions, standard deductions, and published tax slab notifications) and should be validated against your individual circumstances.</li>
              </ul>

              <h3>3.2 Formal Professional Engagements (Advisory & Compliance Tier)</h3>
              <ul>
                <li>Formal services include ITR Filing & Tax Planning, GST Registration & Monthly Return Compliance, Bookkeeping & Cloud Accounting, Payroll Processing, MCA Business Incorporations & ROC Filings, and Virtual CFO Strategic Advisory.</li>
                <li>A formal engagement begins upon written confirmation, submission of required KYC/financial source documents, and confirmation of applicable professional fees.</li>
                <li>Engagements are conducted with due professional diligence in accordance with the standards of the Institute of Chartered Accountants of India (ICAI) and prevailing statutory enactments.</li>
              </ul>

              <h2>4. Client Responsibilities & Truthful Disclosure Warranties</h2>
              <p>
                The accuracy and legal validity of any tax return, financial statement, or compliance filing depends entirely on the veracity of the source data provided by the Client:
              </p>
              <ul>
                <li><strong>Duty of Full Disclosure:</strong> The Client warrants that all financial records, invoices, bank statements, foreign asset disclosures, capital gains logs, and deduction proofs furnished to Vittiya Salaahkaar are genuine, authentic, and complete.</li>
                <li><strong>No Willful Concealment:</strong> The Client explicitly confirms that they have not omitted any taxable income, undisclosed bank accounts, offshore assets, or claimed fraudulent input tax credit (ITC).</li>
                <li><strong>Indemnification for Misrepresentation:</strong> Vittiya Salaahkaar shall not be held liable for any statutory penalties, prosecution, interest under Section 234A/B/C, scrutiny notices under Section 143(2) or 148, or GST demand notices resulting from false, fabricated, or omitted information supplied by the Client.</li>
                <li><strong>Timely Document Submission:</strong> Clients must submit requested documents at least 5 business days prior to statutory filing deadlines to avoid late fees or last-minute portal congestion.</li>
              </ul>

              <h2>5. Fees, Billing & Payment Terms</h2>
              <ul>
                <li><strong>Professional Fee Transparency:</strong> Fees for services are quoted upfront based on the service scope (as outlined on our About & Pricing page or individual engagement mandates).</li>
                <li><strong>Government Statutory Fees:</strong> Professional advisory fees do not include government-mandated statutory fees, such as:
                  <ul>
                    <li>Direct tax advance tax or self-assessment tax challans.</li>
                    <li>GST monthly tax liability or late fees under Section 47.</li>
                    <li>Ministry of Corporate Affairs (MCA) stamp duty, name reservation fees, or ROC filing fees.</li>
                    <li>Digital Signature Certificate (DSC) issuance charges by licensed Certifying Authorities.</li>
                  </ul>
                  Such statutory dues must be paid directly by the Client to the respective Government portal or disbursed through designated bank challans.
                </li>
                <li><strong>Invoicing:</strong> Tax invoices are issued in Indian National Rupees (INR) with applicable Goods and Services Tax (GST) charged in accordance with Indian tax laws.</li>
              </ul>

              <h2>6. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Platform, including all source code, algorithms, software design, financial calculators, articles, glossaries, graphic user interfaces, visual design, and the "Vittiya Salaahkaar" trademark, logo, and brand identity, are proprietary to Vittiya Salaahkaar and protected by Indian copyright, trademark, and intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access the tools and educational articles for your personal, non-commercial use or internal business evaluation. You may not scrape, reverse-engineer, replicate, redistribute, or frame our computational engines or proprietary content without prior written permission.
              </p>

              <h2>7. Limitation of Professional Liability</h2>
              <p>
                To the maximum extent permitted by applicable Indian law:
              </p>
              <ul>
                <li>Vittiya Salaahkaar, its advisors, directors, employees, or associates shall not be liable for any indirect, consequential, punitive, exemplary, or special damages, including lost profits, loss of business opportunities, or reputational loss.</li>
                <li>Our total aggregate liability arising out of or related to any professional service engagement, whether in contract, tort, negligence, or statutory duty, shall strictly be capped at the <strong>total professional fees actually paid by the Client</strong> for the specific engagement giving rise to the claim.</li>
                <li>We do not guarantee specific tax refunds, immunity from randomized statutory scrutiny selection by the Income Tax Department's faceless assessment algorithms, or specific investment yields.</li>
              </ul>

              <h2>8. Force Majeure</h2>
              <p>
                Neither party shall be held liable for failure or delay in performing statutory filing obligations where such failure results from events beyond reasonable control, including but not limited to Government portal downtime (e.g. Income Tax e-Filing portal or GSTN server crashes), nationwide telecom/internet disruptions, legislative retrospective amendments, acts of God, civil unrest, or statutory portal maintenance windows.
              </p>

              <h2>9. Termination of Engagement</h2>
              <p>
                Either party may terminate an advisory or compliance engagement upon 7 business days' written notice via email. Upon termination:
              </p>
              <ul>
                <li>The Client shall pay for all professional services rendered and verifiable work completed up to the date of termination.</li>
                <li>Vittiya Salaahkaar shall securely return all original source documentation and provide final acknowledgment receipts for any returns already filed.</li>
              </ul>

              <h2>10. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms of Service and any contractual or non-contractual disputes arising hereunder shall be governed by, and construed in accordance with, the <strong>laws of the Republic of India</strong>.
              </p>
              <p>
                In the event of any dispute, difference, or claim arising out of or in connection with these Terms, the parties shall first attempt to resolve the matter amicably through good-faith negotiations within 30 days. If unresolved, the dispute shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996, by a sole arbitrator mutually appointed by the parties. The seat and venue of arbitration shall be in India, and proceedings shall be conducted in English.
              </p>
            </article>
          </div>
        )}

        {/* Tab 3: Statutory Disclaimers */}
        {activeTab === 'disclaimer' && (
          <div className="legal-tab-content">
            <div className="legal-summary-callout">
              <div className="callout-icon">
                <AlertTriangle size={22} color="var(--gold)" />
              </div>
              <div className="callout-body">
                <h4>Statutory Disclaimer & Disclosure</h4>
                <p>
                  Important disclosures regarding the educational nature of our tools, tax calculations, market projections, and independent private advisory status.
                </p>
              </div>
            </div>

            <article className="legal-document">
              <h2>1. Informational & Educational Purposes Only</h2>
              <p>
                All content published on <strong>Vittiya Salaahkaar</strong>, including without limitation our interactive financial calculators, tax regime comparators, Vittiya Gyaan articles, financial dictionary definitions, step-by-step guides, and infographics, is published in good faith for general informational and educational guidance only.
              </p>
              <p>
                Nothing contained on this website constitutes, or should be construed as:
              </p>
              <ul>
                <li>Binding legal, judicial, or statutory advice.</li>
                <li>A formal tax audit certificate or guaranteed assessment ruling.</li>
                <li>A solicitation, endorsement, or offer to buy or sell any security, mutual fund scheme, insurance contract, or financial derivative product.</li>
              </ul>

              <h2>2. Calculation Estimates & Legislative Changes</h2>
              <p>
                Our financial tools are engineered with meticulous attention to current Indian statutory enactments, including the Finance Act 2025/2026, standard deductions (e.g. ₹75,000 under Section 16(ia) in the New Tax Regime), rebate limits under Section 87A, and progressive tax slabs.
              </p>
              <p>
                However, tax computations are inherently sensitive to specific individual facts, including residency status, marginal relief applicability, surcharge thresholds, health & education cess, and retrospective statutory amendments. Users are strongly advised to cross-verify figures with our professional advisors or their designated chartered accountant before committing financial resources or submitting statutory filings.
              </p>

              <h2>3. Market Risk & Investment Projections</h2>
              <p>
                Calculators modeling investment returns (e.g., SIP Calculator, Lumpsum Calculator, CAGR Calculator, Retirement Corpus Estimator, and Goal Planners) utilize standard mathematical compound interest and future value formulas.
              </p>
              <div className="legal-highlight-box">
                <AlertTriangle size={18} color="var(--gold)" />
                <div>
                  <strong>SEBI Statutory Warning:</strong> Mutual fund investments and securities markets are subject to market risks. Read all scheme-related documents carefully. Past performance of mutual funds, equities, or asset classes does not guarantee future results. Projected rates of return in our calculators are hypothetical inputs chosen by the user for scenario planning.
                </div>
              </div>

              <h2>4. Non-Affiliation with Government Authorities</h2>
              <p>
                Vittiya Salaahkaar is an independent private finance, accounting, and advisory platform. We are <strong>not</strong> an official wing, department, or instrumentality of the Income Tax Department of India, the Ministry of Finance, the Central Board of Direct Taxes (CBDT), the Goods and Services Tax Network (GSTN), or the Ministry of Corporate Affairs (MCA).
              </p>
              <p>
                Official government portals can be accessed directly at:
              </p>
              <ul>
                <li>Income Tax e-Filing Portal: <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer">www.incometax.gov.in</a></li>
                <li>GST Portal: <a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer">www.gst.gov.in</a></li>
                <li>Ministry of Corporate Affairs: <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer">www.mca.gov.in</a></li>
              </ul>
            </article>
          </div>
        )}

        {/* Tab 4: Refund & Cancellation */}
        {activeTab === 'refund' && (
          <div className="legal-tab-content">
            <div className="legal-summary-callout">
              <div className="callout-icon">
                <RotateCcw size={22} color="var(--gold)" />
              </div>
              <div className="callout-body">
                <h4>Fair & Transparent Refund Policy</h4>
                <p>
                  We strive for 100% client satisfaction and absolute clarity on professional service fees, cancellations, and refund eligibility.
                </p>
              </div>
            </div>

            <article className="legal-document">
              <h2>1. General Cancellation Principles</h2>
              <p>
                Professional taxation, accounting, and legal services involve dedicated allocations of professional time, computational resources, and statutory analysis. Our refund policy is framed to be fair, equitable, and transparent for all parties.
              </p>

              <h2>2. Refund Eligibility by Service Stage</h2>
              <div className="legal-table-wrapper">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Service Stage</th>
                      <th>Cancellation Request Timing</th>
                      <th>Refund Entitlement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Prior to File Review</strong></td>
                      <td>Within 2 hours of payment and before documents are verified by an advisor</td>
                      <td><span className="pill-success">100% Full Refund</span> (less nominal payment gateway charges of 2-3%)</td>
                    </tr>
                    <tr>
                      <td><strong>Work in Progress (Drafting)</strong></td>
                      <td>After document reconciliation / computation sheet has been prepared</td>
                      <td><span className="pill-warning">50% Partial Refund</span> (compensating professional hours already invested)</td>
                    </tr>
                    <tr>
                      <td><strong>Filing Completed / E-Verified</strong></td>
                      <td>After ITR / GST / ROC return has been uploaded or ITR-V generated</td>
                      <td><span className="pill-danger">No Refund</span> (statutory delivery completed)</td>
                    </tr>
                    <tr>
                      <td><strong>Consultation Calls</strong></td>
                      <td>Rescheduling or cancellation requested 4+ hours before the scheduled slot</td>
                      <td><span className="pill-success">Full Reschedule or 100% Refund</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>3. Non-Refundability of Statutory Government Charges</h2>
              <p>
                Any payments made towards Government challans, MCA statutory incorporation fees, stamp duties, GST challans, or Digital Signature Certificate (DSC) cryptographic tokens are disbursed directly to Government treasuries and certifying authorities. <strong>These statutory fees are completely non-refundable under any circumstances.</strong>
              </p>

              <h2>4. How to Request a Refund</h2>
              <p>
                To initiate a formal cancellation or refund request:
              </p>
              <ol>
                <li>Send an email to <strong><a href="mailto:Queries@vittiyasalaahkar.com">Queries@vittiyasalaahkar.com</a></strong> from the email address registered during your booking.</li>
                <li>Include your <strong>Booking Reference ID</strong>, Full Name, Contact Number, and Reason for Cancellation.</li>
                <li>Our billing and compliance team will review the file status and issue an official acknowledgment within <strong>24 business hours</strong>.</li>
                <li>Approved refunds are credited directly back to the original payment source (UPI, Net Banking, Credit/Debit Card) within <strong>5 to 7 business working days</strong> as per banking network timelines.</li>
              </ol>
            </article>
          </div>
        )}

        {/* Global Bottom Contact & Advisory Assistance Card */}
        <div className="legal-help-card">
          <div className="help-card-content">
            <div className="help-icon-box">
              <HelpCircle size={32} color="var(--gold)" />
            </div>
            <div>
              <h3>Have Questions About Our Legal Policies or Data Practices?</h3>
              <p>
                Our compliance desk is always available to clarify engagement terms, execute enterprise Non-Disclosure Agreements (NDAs), or assist with specific data privacy enquiries.
              </p>
            </div>
          </div>
          <div className="help-card-actions">
            <a href="mailto:Queries@vittiyasalaahkar.com" className="btn btn-outline" style={{ background: '#ffffff' }}>
              <Mail size={15} /> Email Compliance Desk
            </a>
            <button
              className="btn btn-gold"
              onClick={() => openConsultation && openConsultation('Legal Page Enquiry')}
            >
              <PhoneCall size={15} /> Book Advisory Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
