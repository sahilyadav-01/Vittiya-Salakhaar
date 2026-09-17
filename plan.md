all file react 
# Implementation Plan: Vittiya Salakhaar Comprehensive 5-Page Platform

Transform `index.html` into a complete, state-of-the-art, responsive web application implementing all 5 specified pages, rich financial calculators, interactive health-check assessments, knowledge hub, transparent pricing modules, and consultation booking.

---

## User Review Required

> [!IMPORTANT]
> The implementation will retain the lightweight zero-dependency architecture (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript), ensuring fast load times, offline capability, smooth client-side page routing (`#home`, `#services`, `#tools`, `#learn`, `#about`), and zero build-step overhead.

> [!NOTE]
> All financial calculators (Income Tax New vs Old Regime, SIP, EMI, GST, Lumpsum, CAGR, XIRR, Retirement, Net Worth, Emergency Fund, Inflation, Savings Goal) will have fully interactive live calculation engines with input sliders, formatted Indian currency (`₹ xx,xx,xxx`), and dynamic SVG/CSS chart breakdowns.

---

## Architecture & Structure

The platform is structured into 5 dedicated pages with a cohesive navigation system, active states, mobile hamburger drawer, and persistent footer:

1. **Page 1: HOME**
   - **Hero Section**: "Understand. Calculate. Plan. Grow." with interactive financial health snapshot card, stats, and dual CTA.
   - **What Do You Need Today?**: 3 core interactive cards: 📚 Learn (Vittiya Gyaan), 🧮 Calculate (Financial Tools), 💼 Get Expert Support (Services).
   - **Popular Financial Tools Teaser**: 8 cards (Income Tax, SIP, EMI, GST, CAGR, XIRR, Retirement, Net Worth) with 1-click launcher.
   - **Vittiya Gyaan Teaser**: 6 featured topics with tags and click-to-read previews.
   - **Our Professional Services Teaser**: 6 service cards with detailed deliverables and consultation links.
   - **Financial Health Check Teaser**: Interactive preview banner with score estimator.
   - **Business Financial Health Check Teaser**: Business metrics health banner.
   - **Why Vittiya Salakhaar?**: 5 value propositions (Practical, Transparent, Digital, Professional, Long-Term).
   - **Final CTA Banner**: "Your Finance. Your Tax. Your Growth." with dual buttons.

2. **Page 2: SERVICES**
   - **Hero**: "Finance & Tax Services — Professional Support for Every Stage of Your Financial Journey".
   - **6 In-depth Service Suites**:
     1. *Income Tax*: ITR filing, tax computation, tax planning, capital gains, TDS reconciliation, notice assistance, NRI tax, etc.
     2. *GST*: Registration, GSTR-1, GSTR-3B, reconciliation, ITC review, e-invoice, e-way bill, annual compliance, notices.
     3. *Accounting & Bookkeeping*: Bookkeeping, ledger, bank reconciliation, AP/AR, vendor reconciliation, monthly closing, P&L, balance sheet, MIS.
     4. *Payroll*: Salary processing, payslips, payroll reports, employee data, salary TDS, reconciliation.
     5. *Business Registration & Compliance*: Proprietorship, Partnership, LLP, Pvt Ltd, MSME/Udyam, PAN/TAN, ROC/MCA.
     6. *Finance & Business Advisory*: Budgeting, cash flow, profitability, cost analysis, working capital, forecasting, virtual CFO.
   - **Who We Serve**: 5 audience cards (Individuals, Freelancers, Startups, MSMEs, Growing Businesses).
   - **How It Works**: 5-step interactive workflow (01 Tell Us -> 02 Understand -> 03 Recommend -> 04 Execute -> 05 Support).

3. **Page 3: FINANCIAL TOOLS (Vittiya Tools)**
   - **Categorized Tabbed Interface**: All, Tax, Investment, Loan, Personal Finance.
   - **Active Interactive Calculators**:
     - *Income Tax Calculator (FY 2024-25 / 2025-26)*: Side-by-side comparison between Old Regime and New Regime (standard deduction, 87A rebate).
     - *SIP Calculator*: Monthly deposit, return rate, duration -> Total invested, estimated wealth gain, maturity corpus with live pie chart.
     - *Lumpsum Calculator*: One-time investment compounding calculator.
     - *EMI Calculator*: Loan amount, interest rate, tenure -> Monthly EMI, Total interest, Total payment + Amortisation preview.
     - *GST Calculator*: Amount, GST slab (5%, 12%, 18%, 28%), Exclusive vs Inclusive.
     - *CAGR Calculator*: Initial value, final value, tenure in years.
     - *XIRR / Cashflow Calculator*: Multi-cashflow annualized return model.
     - *Compound Interest Calculator*: Compounding frequency (monthly, quarterly, annually).
     - *Retirement Corpus Calculator*: Current age, retirement age, monthly expense, inflation, post-retirement return.
     - *Net Worth Calculator*: Assets vs Liabilities with live net worth meter.
     - *Emergency Fund Calculator*: Monthly essential expenses * target months (3-12 months).
     - *Inflation & Purchasing Power Calculator*: Future equivalent cost calculator.
     - *Savings Goal Calculator*: Target goal, time horizon -> Required monthly saving.
   - **Interactive In-Page Assessments**:
     - *Personal Financial Health Check Quiz*: 5 quick interactive questions -> Instant 0-100 Score, Health tier (Critical, Fair, Good, Excellent), and custom recommendations.
     - *Business Financial Health Check Tool*: Revenue, Gross margin, Net margin, Debtor days -> Instant diagnostic breakdown.
   - **Statutory Information & Disclaimer**.

4. **Page 4: LEARN (Vittiya Gyaan)**
   - **Topic Explorer**: Filterable tabs (Income Tax, GST, Investments, Personal Finance, Business Finance, Accounting).
   - **Comprehensive Article Hub**: 12+ full readable guides with modal reading experience (Old vs New Regime, SIP vs CAGR vs XIRR, Emergency Funds, Cashflow vs Profit, GST Reconciliation, P&L Reading, Form 16/26AS, etc.).
   - **Searchable Financial Dictionary (A-Z)**:
     - Grouped alphabetical index (A—C, D—H, I—M, P—Z).
     - Live search filter for terms like Advance Tax, AIS, Asset, Balance Sheet, CAGR, Capital Gain, Cash Flow, Compound Interest, Depreciation, EBITDA, Emergency Fund, Equity, GST, Gross Margin, ITR, Inflation, Input Tax Credit, IRR, Mutual Fund, Net Worth, P&L, SIP, TDS, XIRR, Working Capital.
   - **Latest Financial Updates Section**: Categorized regulatory & market updates with Published Date, Last Updated Date, and Applicable Period.
   - **Educational Content Disclaimer**.

5. **Page 5: ABOUT, PRICING & CONTACT**
   - **About Vittiya Salakhaar**: Vision, mission, and philosophy ("Knowledge + Technology + Professional Support").
   - **Our Three Pillars**: Detailed cards for Vittiya Gyaan, Vittiya Tools, and Vittiya Services.
   - **Transparent Pricing Architecture**:
     - *Individual Tax*: ITR Basic (From ₹999), ITR Plus (From ₹1,999), Tax Planning (From ₹2,999).
     - *GST*: GST Starter (From ₹1,499/mo), GST Business (From ₹2,999/mo), GST Plus (From ₹4,999/mo).
     - *Accounting*: Bookkeeping Basic (From ₹2,499/mo), Accounting Pro (From ₹4,999/mo), Finance Support (From ₹9,999/mo).
     - *Payroll*: Payroll Starter (From ₹1,999/mo), Payroll Pro (From ₹3,999/mo).
     - *Business Finance*: Finance Essential (From ₹14,999/mo), Finance Growth (From ₹24,999/mo), Finance Business Plus (From ₹39,999/mo).
     - *Custom Enterprise Quote Banner*.
     - *Transparent Pricing Note & Disclaimer*.
   - **Contact & Enquiry Form**:
     - Fields: Full Name, Email Address, Mobile Number, Requirement Selector (Income Tax, GST, Accounting, Payroll, Business Compliance, Finance Advisory, Financial Tools, Other), Detailed Message.
     - Real-time client-side validation, submit handler with elegant feedback modal/toast.
   - **Book a Consultation Flow**:
     - Quick booking modal with service choice, date & time slot selection, and confirmation receipt.

6. **Unified Header & Footer**:
   - Header: Modern brand mark, navigation items with active indicator, mobile drawer menu button, and prominent "Book Consultation" CTA.
   - Footer: Full corporate footer matching exact specifications: 4 columns, legal links, copyright 2026, and comprehensive disclaimer.

---

## Proposed Changes

### Core File

#### [MODIFY] [index.html](file:///c:/Users/sahil%20yadav/Desktop/Vittiya-Salakhaar/index.html)
- Upgrade stylesheet with modern CSS variables, typography (Inter / Plus Jakarta Sans via Google Fonts), glassmorphism, responsive grid system, badge styling, interactive tabs, form controls, charts, and modal dialogs.
- Implement HTML markup for all 5 pages strictly adhering to the user's provided specification and text.
- Implement vanilla JS engine:
  - Page routing (`showPage`) with URL hash syncing (`#home`, `#services`, `#tools`, `#learn`, `#about`).
  - Interactive multi-calculator switcher and live math engines.
  - Interactive Financial Health Check scoring algorithm.
  - Interactive Business Health Check scoring algorithm.
  - Interactive Financial Dictionary search/filter.
  - Interactive Article reader modal with full guide contents.
  - Consultation booking modal with instant confirmation.
  - Contact enquiry validation and toast feedback.

---

## Verification Plan

### Automated / Browser Verification
- Load the web app in the browser using the `browser_subagent` to visually test and verify:
  1. Home page rendering, hero card charts, navigation to all 5 pages.
  2. Services page: Check all 6 service sections, deliverables, audience cards, and 5-step workflow.
  3. Financial Tools page: Test SIP calculator, Income Tax calculator, EMI calculator, and GST calculator calculations and interactive sliders.
  4. Test Financial Health Check quiz: answer questions, calculate score, verify recommendation output.
  5. Learn page: Test category filtering, article modal reader, dictionary search.
  6. About & Pricing page: Test pricing cards, contact form submission, and consultation booking modal.
  7. Mobile responsive layout and hamburger menu test.
