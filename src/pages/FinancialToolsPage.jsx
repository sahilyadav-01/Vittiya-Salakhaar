import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  Percent,
  Receipt,
  Clock,
  ShieldAlert,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  PieChart,
  DollarSign,
  Briefcase
} from 'lucide-react';

export default function FinancialToolsPage({ openConsultation, initialTab = 'all' }) {
  const [activeCategory, setActiveCategory] = useState(initialTab);
  const [activeToolId, setActiveToolId] = useState('sip');

  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState(15000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // Lumpsum State
  const [lumpPrincipal, setLumpPrincipal] = useState(100000);
  const [lumpRate, setLumpRate] = useState(12);
  const [lumpYears, setLumpYears] = useState(5);

  // EMI State
  const [emiLoan, setEmiLoan] = useState(2500000);
  const [emiRate, setEmiRate] = useState(8.75);
  const [emiTenure, setEmiTenure] = useState(20);

  // Income Tax State
  const [taxSalary, setTaxSalary] = useState(1200000);
  const [taxOldDeductions, setTaxOldDeductions] = useState(200000); // 80C, 80D, etc.

  // GST State
  const [gstAmount, setGstAmount] = useState(50000);
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState('exclusive'); // exclusive or inclusive

  // CAGR State
  const [cagrStart, setCagrStart] = useState(100000);
  const [cagrEnd, setCagrEnd] = useState(250000);
  const [cagrYears, setCagrYears] = useState(5);

  // Retirement State
  const [retCurrentAge, setRetCurrentAge] = useState(30);
  const [retRetireAge, setRetRetireAge] = useState(60);
  const [retExpense, setRetExpense] = useState(50000);
  const [retInflation, setRetInflation] = useState(6);
  const [retReturn, setRetReturn] = useState(10);

  // Net Worth State
  const [nwLiquid, setNwLiquid] = useState(400000);
  const [nwInvest, setNwInvest] = useState(1800000);
  const [nwRealEstate, setNwRealEstate] = useState(4500000);
  const [nwGoldOther, setNwGoldOther] = useState(300000);
  const [nwHomeLoan, setNwHomeLoan] = useState(2800000);
  const [nwOtherDebt, setNwOtherDebt] = useState(200000);

  // Emergency Fund State
  const [emMonthlyExp, setEmMonthlyExp] = useState(45000);
  const [emMonths, setEmMonths] = useState(6);

  // Inflation State
  const [infCurrent, setInfCurrent] = useState(100000);
  const [infRate, setInfRate] = useState(6.5);
  const [infYears, setInfYears] = useState(15);

  // Savings Goal State
  const [goalAmount, setGoalAmount] = useState(2000000);
  const [goalYears, setGoalYears] = useState(7);
  const [goalReturn, setGoalReturn] = useState(11);

  // Personal Financial Health Check Quiz State
  const [quizAnswers, setQuizAnswers] = useState({
    savingsRate: null,
    debtRatio: null,
    emergencyFund: null,
    insurance: null,
    retirementInvest: null
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Business Financial Health Check State
  const [bizRevenue, setBizRevenue] = useState(12000000);
  const [bizGrossMargin, setBizGrossMargin] = useState(35);
  const [bizNetMargin, setBizNetMargin] = useState(12);
  const [bizDebtorDays, setBizDebtorDays] = useState(45);
  const [bizCashFlowStatus, setBizCashFlowStatus] = useState('positive');

  // Format INR Currency
  const formatINR = (val) => {
    if (isNaN(val) || val === null || val === undefined) return '₹0';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // --- CALCULATIONS ---

  // 1. SIP
  const sipCalculation = useMemo(() => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const totalInvested = sipMonthly * months;
    let futureValue = 0;
    if (monthlyRate > 0) {
      futureValue = sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      futureValue = totalInvested;
    }
    const estimatedReturns = Math.max(0, futureValue - totalInvested);
    const investedRatio = Math.round((totalInvested / futureValue) * 100) || 50;
    return { totalInvested, estimatedReturns, futureValue, investedRatio };
  }, [sipMonthly, sipRate, sipYears]);

  // 2. Lumpsum
  const lumpsumCalculation = useMemo(() => {
    const r = lumpRate / 100;
    const futureValue = lumpPrincipal * Math.pow(1 + r, lumpYears);
    const returns = futureValue - lumpPrincipal;
    return { principal: lumpPrincipal, returns, futureValue };
  }, [lumpPrincipal, lumpRate, lumpYears]);

  // 3. EMI
  const emiCalculation = useMemo(() => {
    const p = emiLoan;
    const r = emiRate / 12 / 100;
    const n = emiTenure * 12;
    if (r === 0 || n === 0) return { emi: 0, totalPayment: p, totalInterest: 0 };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) };
  }, [emiLoan, emiRate, emiTenure]);

  // 4. Income Tax (Old vs New Regime FY 2024-25 / FY 2025-26)
  const taxCalculation = useMemo(() => {
    // New Regime: Standard deduction = ₹75,000
    const newStdDed = 75000;
    const newTaxable = Math.max(0, taxSalary - newStdDed);
    let newTax = 0;

    if (newTaxable <= 300000) {
      newTax = 0;
    } else if (newTaxable <= 700000) {
      newTax = (newTaxable - 300000) * 0.05;
    } else if (newTaxable <= 1000000) {
      newTax = 20000 + (newTaxable - 700000) * 0.10;
    } else if (newTaxable <= 1200000) {
      newTax = 20000 + 30000 + (newTaxable - 1000000) * 0.15;
    } else if (newTaxable <= 1500000) {
      newTax = 20000 + 30000 + 30000 + (newTaxable - 1200000) * 0.20;
    } else {
      newTax = 20000 + 30000 + 30000 + 60000 + (newTaxable - 1500000) * 0.30;
    }

    // Section 87A rebate for New Regime: If taxable income <= ₹7,00,000, tax is NIL
    if (newTaxable <= 700000) {
      newTax = 0;
    }
    const newCess = newTax * 0.04;
    const totalNewTax = newTax + newCess;

    // Old Regime: Standard deduction = ₹50,000 + entered deductions
    const oldStdDed = 50000;
    const oldTaxable = Math.max(0, taxSalary - oldStdDed - taxOldDeductions);
    let oldTax = 0;

    if (oldTaxable <= 250000) {
      oldTax = 0;
    } else if (oldTaxable <= 500000) {
      oldTax = (oldTaxable - 250000) * 0.05;
    } else if (oldTaxable <= 1000000) {
      oldTax = 12500 + (oldTaxable - 500000) * 0.20;
    } else {
      oldTax = 12500 + 100000 + (oldTaxable - 1000000) * 0.30;
    }

    // Section 87A rebate for Old Regime: If taxable income <= ₹5,00,000, tax is NIL
    if (oldTaxable <= 500000) {
      oldTax = 0;
    }
    const oldCess = oldTax * 0.04;
    const totalOldTax = oldTax + oldCess;

    const diff = Math.abs(totalOldTax - totalNewTax);
    const recommended = totalNewTax <= totalOldTax ? 'New Tax Regime' : 'Old Tax Regime';

    return {
      newTaxable,
      totalNewTax: Math.round(totalNewTax),
      oldTaxable,
      totalOldTax: Math.round(totalOldTax),
      diff: Math.round(diff),
      recommended
    };
  }, [taxSalary, taxOldDeductions]);

  // 5. GST
  const gstCalculation = useMemo(() => {
    let taxable = 0;
    let gst = 0;
    let total = 0;
    if (gstType === 'exclusive') {
      taxable = gstAmount;
      gst = (taxable * gstRate) / 100;
      total = taxable + gst;
    } else {
      total = gstAmount;
      taxable = (total * 100) / (100 + gstRate);
      gst = total - taxable;
    }
    const cgst = gst / 2;
    const sgst = gst / 2;
    return { taxable: Math.round(taxable), gst: Math.round(gst), cgst: Math.round(cgst), sgst: Math.round(sgst), total: Math.round(total) };
  }, [gstAmount, gstRate, gstType]);

  // 6. CAGR
  const cagrCalculation = useMemo(() => {
    if (cagrStart <= 0 || cagrEnd <= 0 || cagrYears <= 0) return 0;
    const rate = Math.pow(cagrEnd / cagrStart, 1 / cagrYears) - 1;
    return (rate * 100).toFixed(2);
  }, [cagrStart, cagrEnd, cagrYears]);

  // 7. Retirement
  const retirementCalculation = useMemo(() => {
    const yearsToRetire = Math.max(1, retRetireAge - retCurrentAge);
    const futureMonthlyExpense = retExpense * Math.pow(1 + retInflation / 100, yearsToRetire);
    const futureAnnualExpense = futureMonthlyExpense * 12;
    // Estimated corpus needed based on 25 years in retirement with real return
    const realReturn = (retReturn - retInflation) / 100;
    const corpusMultiplier = realReturn > 0 ? (1 - Math.pow(1 + realReturn, -25)) / realReturn : 25;
    const targetCorpus = futureAnnualExpense * corpusMultiplier;
    return { futureMonthlyExpense: Math.round(futureMonthlyExpense), targetCorpus: Math.round(targetCorpus), yearsToRetire };
  }, [retCurrentAge, retRetireAge, retExpense, retInflation, retReturn]);

  // 8. Net Worth
  const netWorthCalculation = useMemo(() => {
    const totalAssets = nwLiquid + nwInvest + nwRealEstate + nwGoldOther;
    const totalLiabilities = nwHomeLoan + nwOtherDebt;
    const netWorth = totalAssets - totalLiabilities;
    return { totalAssets, totalLiabilities, netWorth };
  }, [nwLiquid, nwInvest, nwRealEstate, nwGoldOther, nwHomeLoan, nwOtherDebt]);

  // 9. Emergency Fund
  const emergencyFundTarget = emMonthlyExp * emMonths;

  // 10. Inflation
  const futureInflationCost = infCurrent * Math.pow(1 + infRate / 100, infYears);

  // 11. Savings Goal
  const savingsGoalMonthly = useMemo(() => {
    const r = goalReturn / 12 / 100;
    const n = goalYears * 12;
    if (r === 0) return goalAmount / n;
    return goalAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }, [goalAmount, goalYears, goalReturn]);

  // Quiz Score Evaluation
  const quizScore = useMemo(() => {
    let score = 0;
    if (quizAnswers.savingsRate === 'high') score += 25;
    else if (quizAnswers.savingsRate === 'medium') score += 15;
    else if (quizAnswers.savingsRate === 'low') score += 5;

    if (quizAnswers.debtRatio === 'low') score += 20;
    else if (quizAnswers.debtRatio === 'medium') score += 10;

    if (quizAnswers.emergencyFund === 'adequate') score += 25;
    else if (quizAnswers.emergencyFund === 'partial') score += 12;

    if (quizAnswers.insurance === 'yes') score += 15;

    if (quizAnswers.retirementInvest === 'yes') score += 15;
    else if (quizAnswers.retirementInvest === 'started') score += 8;

    return Math.min(100, score);
  }, [quizAnswers]);

  const quizTier = useMemo(() => {
    if (quizScore >= 80) return { label: 'Excellent Financial Health', color: 'var(--green)', advice: 'Outstanding discipline. Focus on advanced tax harvesting, estate planning, and asset rebalancing.' };
    if (quizScore >= 60) return { label: 'Good Financial Foundation', color: 'var(--blue)', advice: 'Strong progress. Consider increasing your emergency buffer to 6 months and optimizing your tax regime.' };
    if (quizScore >= 40) return { label: 'Moderate — Needs Attention', color: 'var(--gold-dark)', advice: 'Focus on aggressive debt reduction and building a dedicated 3-month emergency reserve before market risk.' };
    return { label: 'Critical Financial Exposure', color: '#ef4444', advice: 'High vulnerability to unexpected financial shocks. Priority: cut high-interest loans and create a baseline budget.' };
  }, [quizScore]);

  // Business Health Score
  const bizHealthAnalysis = useMemo(() => {
    const grossProfit = (bizRevenue * bizGrossMargin) / 100;
    const netProfit = (bizRevenue * bizNetMargin) / 100;
    const isGoodDSO = bizDebtorDays <= 45;
    const isHealthyCash = bizCashFlowStatus === 'positive';

    let healthScore = 0;
    if (bizGrossMargin >= 30) healthScore += 25;
    if (bizNetMargin >= 10) healthScore += 25;
    if (isGoodDSO) healthScore += 25;
    if (isHealthyCash) healthScore += 25;

    return { grossProfit, netProfit, healthScore, isGoodDSO, isHealthyCash };
  }, [bizRevenue, bizGrossMargin, bizNetMargin, bizDebtorDays, bizCashFlowStatus]);

  const allTools = [
    { id: 'sip', title: 'SIP Calculator', cat: 'investment', icon: <TrendingUp size={18} /> },
    { id: 'tax', title: 'Income Tax Calculator', cat: 'tax', icon: <Calculator size={18} /> },
    { id: 'emi', title: 'EMI Calculator', cat: 'loans', icon: <Percent size={18} /> },
    { id: 'gst', title: 'GST Calculator', cat: 'tax', icon: <Receipt size={18} /> },
    { id: 'lumpsum', title: 'Lumpsum Calculator', cat: 'investment', icon: <DollarSign size={18} /> },
    { id: 'cagr', title: 'CAGR Calculator', cat: 'investment', icon: <TrendingUp size={18} /> },
    { id: 'retirement', title: 'Retirement Calculator', cat: 'personal', icon: <Clock size={18} /> },
    { id: 'networth', title: 'Net Worth Calculator', cat: 'personal', icon: <PieChart size={18} /> },
    { id: 'emergency', title: 'Emergency Fund', cat: 'personal', icon: <ShieldAlert size={18} /> },
    { id: 'inflation', title: 'Inflation Calculator', cat: 'personal', icon: <TrendingUp size={18} /> },
    { id: 'goal', title: 'Savings Goal Calculator', cat: 'personal', icon: <CheckCircle2 size={18} /> },
    { id: 'health-check', title: 'Personal Health Check', cat: 'health', icon: <Sparkles size={18} /> },
    { id: 'biz-health', title: 'Business Health Check', cat: 'health', icon: <Briefcase size={18} /> }
  ];

  const filteredTools = allTools.filter(t => activeCategory === 'all' || t.cat === activeCategory);

  return (
    <div className="financial-tools-page">
      {/* Tools Hero */}
      <section className="hero" style={{ padding: '75px 0 55px' }}>
        <div className="container center-text">
          <div className="eyebrow">
            <Calculator size={14} /> Vittiya Tools
          </div>
          <h1>Free Financial Calculators</h1>
          <p className="lead" style={{ margin: '0 auto 28px' }}>
            Learn the numbers. Calculate the numbers. Plan better. Use our financial calculators to estimate, compare and understand important financial decisions.
          </p>

          {/* Category Filter Tabs */}
          <div className="calc-tabs-bar">
            <button
              className={`calc-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Tools (13)
            </button>
            <button
              className={`calc-tab ${activeCategory === 'tax' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tax')}
            >
              Tax Calculators
            </button>
            <button
              className={`calc-tab ${activeCategory === 'investment' ? 'active' : ''}`}
              onClick={() => setActiveCategory('investment')}
            >
              Investment Calculators
            </button>
            <button
              className={`calc-tab ${activeCategory === 'loans' ? 'active' : ''}`}
              onClick={() => setActiveCategory('loans')}
            >
              Loan Calculators
            </button>
            <button
              className={`calc-tab ${activeCategory === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveCategory('personal')}
            >
              Personal Finance
            </button>
            <button
              className={`calc-tab ${activeCategory === 'health' ? 'active' : ''}`}
              onClick={() => setActiveCategory('health')}
            >
              Health Check Assessments
            </button>
          </div>
        </div>
      </section>

      {/* Active Calculator Main Area */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="container">
          {/* Quick Selector Pills */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: activeToolId === tool.id ? 'var(--navy)' : '#ffffff',
                  color: activeToolId === tool.id ? '#ffffff' : 'var(--ink-secondary)',
                  border: '1px solid var(--line)'
                }}
              >
                {tool.icon}
                <span>{tool.title}</span>
              </button>
            ))}
          </div>

          {/* 1. SIP CALCULATOR */}
          {activeToolId === 'sip' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Wealth Building</span>
                  <h2>SIP Calculator (Systematic Investment Plan)</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Estimate the potential future value of your regular monthly investments with power of compounding.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  {/* Monthly Investment */}
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Monthly Investment</label>
                      <span className="form-val-display">{formatINR(sipMonthly)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="200000"
                      step="500"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                    />
                  </div>

                  {/* Expected Return Rate */}
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Expected Annual Return Rate (p.a.)</label>
                      <span className="form-val-display">{sipRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                    />
                  </div>

                  {/* Investment Period */}
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Investment Period</label>
                      <span className="form-val-display">{sipYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="1"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                    />
                  </div>

                  <div className="statutory-notice">
                    <strong>Compounding Note: </strong> Small monthly additions over a long tenure result in returns heavily eclipsing your principal capital.
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Estimated Total Corpus</span>
                    <div className="result-stat-big">{formatINR(sipCalculation.futureValue)}</div>

                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill invested" style={{ width: `${sipCalculation.investedRatio}%` }} />
                      <div className="progress-bar-fill returns" style={{ width: `${100 - sipCalculation.investedRatio}%` }} />
                    </div>

                    <div className="result-row">
                      <span>Total Amount Invested:</span>
                      <strong>{formatINR(sipCalculation.totalInvested)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Estimated Wealth Gain:</span>
                      <strong style={{ color: 'var(--gold)' }}>+{formatINR(sipCalculation.estimatedReturns)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Monthly Contribution:</span>
                      <strong>{formatINR(sipMonthly)} / mo</strong>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('SIP & Mutual Funds')}>
                      Consult on Mutual Fund Portfolio →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. INCOME TAX CALCULATOR */}
          {activeToolId === 'tax' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">FY 2024-25 & FY 2025-26</span>
                  <h2>Income Tax Calculator (Old vs New Regime)</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Compare your tax liability under both regimes with updated slabs, Standard Deduction (₹75k vs ₹50k), and Section 87A rebate.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Annual Gross Salary / Total Income</label>
                      <span className="form-val-display">{formatINR(taxSalary)}</span>
                    </div>
                    <input
                      type="range"
                      min="300000"
                      max="5000000"
                      step="25000"
                      value={taxSalary}
                      onChange={(e) => setTaxSalary(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Deductions under Old Regime (80C, 80D, HRA, Home Loan)</label>
                      <span className="form-val-display">{formatINR(taxOldDeductions)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="600000"
                      step="10000"
                      value={taxOldDeductions}
                      onChange={(e) => setTaxOldDeductions(Number(e.target.value))}
                    />
                    <small style={{ color: 'var(--muted)', display: 'block', marginTop: '6px' }}>
                      Standard deduction (₹50k Old / ₹75k New) is auto-applied.
                    </small>
                  </div>

                  <div style={{ background: 'var(--surface-alt)', border: '1px solid var(--line)', padding: '16px', borderRadius: 'var(--radius-md)', marginTop: '20px' }}>
                    <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Regime Recommendation</h4>
                    <p style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
                      Based on your numbers, <strong>{taxCalculation.recommended}</strong> saves you approximately <strong>{formatINR(taxCalculation.diff)}</strong> in tax!
                    </p>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                      <div className="result-stat-card">
                        <span className="result-stat-label">New Regime Tax</span>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
                          {formatINR(taxCalculation.totalNewTax)}
                        </div>
                        <small style={{ color: '#cbd5e1' }}>Std Ded: ₹75,000</small>
                      </div>

                      <div className="result-stat-card">
                        <span className="result-stat-label">Old Regime Tax</span>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
                          {formatINR(taxCalculation.totalOldTax)}
                        </div>
                        <small style={{ color: '#cbd5e1' }}>Std Ded: ₹50,000</small>
                      </div>
                    </div>

                    <div className="result-row">
                      <span>Gross Annual Income:</span>
                      <strong>{formatINR(taxSalary)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Tax Savings With Better Regime:</span>
                      <strong style={{ color: 'var(--gold)' }}>{formatINR(taxCalculation.diff)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Cess Applied:</span>
                      <strong>4% Health & Education</strong>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Income Tax')}>
                      Get Expert ITR Filing Support →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. EMI CALCULATOR */}
          {activeToolId === 'emi' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Borrowing & Loans</span>
                  <h2>Loan EMI & Interest Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Calculate monthly installment, total interest liability, and complete repayment schedule.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Loan Amount</label>
                      <span className="form-val-display">{formatINR(emiLoan)}</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="20000000"
                      step="50000"
                      value={emiLoan}
                      onChange={(e) => setEmiLoan(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Interest Rate (% p.a.)</label>
                      <span className="form-val-display">{emiRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.1"
                      value={emiRate}
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Loan Tenure</label>
                      <span className="form-val-display">{emiTenure} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={emiTenure}
                      onChange={(e) => setEmiTenure(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Monthly EMI Payable</span>
                    <div className="result-stat-big">{formatINR(emiCalculation.emi)}</div>

                    <div className="result-row">
                      <span>Principal Loan Amount:</span>
                      <strong>{formatINR(emiLoan)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Total Interest Payable:</span>
                      <strong style={{ color: 'var(--gold)' }}>{formatINR(emiCalculation.totalInterest)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Total Amount Payable (P + I):</span>
                      <strong>{formatINR(emiCalculation.totalPayment)}</strong>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-light" style={{ width: '100%' }} onClick={() => openConsultation('Loan & Debt Review')}>
                      Review Loan Structure & Tax Benefits →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. GST CALCULATOR */}
          {activeToolId === 'gst' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Indirect Tax</span>
                  <h2>GST Calculator (Inclusive / Exclusive)</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Accurately split CGST, SGST, taxable base and total price across standard GST slabs.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Amount (₹)</label>
                      <span className="form-val-display">{formatINR(gstAmount)}</span>
                    </div>
                    <input
                      type="number"
                      className="form-input"
                      value={gstAmount}
                      onChange={(e) => setGstAmount(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Calculation Mode
                    </label>
                    <div className="radio-group">
                      <div
                        className={`radio-pill ${gstType === 'exclusive' ? 'active' : ''}`}
                        onClick={() => setGstType('exclusive')}
                      >
                        GST Exclusive (Add GST)
                      </div>
                      <div
                        className={`radio-pill ${gstType === 'inclusive' ? 'active' : ''}`}
                        onClick={() => setGstType('inclusive')}
                      >
                        GST Inclusive (Extract GST)
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Applicable GST Slab
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[5, 12, 18, 28].map((rate) => (
                        <button
                          key={rate}
                          className={`btn ${gstRate === rate ? 'btn-primary' : 'btn-light'}`}
                          style={{ padding: '10px' }}
                          onClick={() => setGstRate(rate)}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Total Invoice Value</span>
                    <div className="result-stat-big">{formatINR(gstCalculation.total)}</div>

                    <div className="result-row">
                      <span>Net Taxable Amount:</span>
                      <strong>{formatINR(gstCalculation.taxable)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Total GST ({gstRate}%):</span>
                      <strong style={{ color: 'var(--gold)' }}>{formatINR(gstCalculation.gst)}</strong>
                    </div>
                    <div className="result-row">
                      <span>CGST ({gstRate / 2}%):</span>
                      <strong>{formatINR(gstCalculation.cgst)}</strong>
                    </div>
                    <div className="result-row">
                      <span>SGST ({gstRate / 2}%):</span>
                      <strong>{formatINR(gstCalculation.sgst)}</strong>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('GST Filing')}>
                      Get GST Filing & ITC Reconciliation →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. LUMPSUM CALCULATOR */}
          {activeToolId === 'lumpsum' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Single Investment</span>
                  <h2>Lumpsum Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Estimate the potential future value of a one-time lump-sum investment over time.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Total Investment</label>
                      <span className="form-val-display">{formatINR(lumpPrincipal)}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="5000000"
                      step="5000"
                      value={lumpPrincipal}
                      onChange={(e) => setLumpPrincipal(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Expected Return Rate (p.a.)</label>
                      <span className="form-val-display">{lumpRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.5"
                      value={lumpRate}
                      onChange={(e) => setLumpRate(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Investment Tenure</label>
                      <span className="form-val-display">{lumpYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={lumpYears}
                      onChange={(e) => setLumpYears(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Estimated Maturity Value</span>
                    <div className="result-stat-big">{formatINR(lumpsumCalculation.futureValue)}</div>
                    <div className="result-row">
                      <span>Invested Capital:</span>
                      <strong>{formatINR(lumpsumCalculation.principal)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Estimated Wealth Gain:</span>
                      <strong style={{ color: 'var(--gold)' }}>+{formatINR(lumpsumCalculation.returns)}</strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Portfolio Planning')}>
                      Discuss Portfolio Allocation →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. CAGR CALCULATOR */}
          {activeToolId === 'cagr' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Growth Rate</span>
                  <h2>CAGR Calculator (Compound Annual Growth Rate)</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Calculate the annualized rate of return between an initial and ending investment value.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Initial Investment Value</label>
                      <span className="form-val-display">{formatINR(cagrStart)}</span>
                    </div>
                    <input
                      type="number"
                      className="form-input"
                      value={cagrStart}
                      onChange={(e) => setCagrStart(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Final Investment Value</label>
                      <span className="form-val-display">{formatINR(cagrEnd)}</span>
                    </div>
                    <input
                      type="number"
                      className="form-input"
                      value={cagrEnd}
                      onChange={(e) => setCagrEnd(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Tenure in Years</label>
                      <span className="form-val-display">{cagrYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={cagrYears}
                      onChange={(e) => setCagrYears(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Annualized Compound Return</span>
                    <div className="result-stat-big">{cagrCalculation}%</div>
                    <div className="result-row">
                      <span>Total Gain:</span>
                      <strong>{formatINR(cagrEnd - cagrStart)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Absolute Return:</span>
                      <strong>{(((cagrEnd - cagrStart) / cagrStart) * 100).toFixed(1)}%</strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Investment Advisory')}>
                      Review Capital Gains Tax on Returns →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. RETIREMENT CALCULATOR */}
          {activeToolId === 'retirement' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Long-Term Security</span>
                  <h2>Retirement Corpus Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Estimate the total retirement nest egg required based on inflation and living costs.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-group">
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Current Age</label>
                      <input
                        type="number"
                        className="form-input"
                        value={retCurrentAge}
                        onChange={(e) => setRetCurrentAge(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Desired Retirement Age</label>
                      <input
                        type="number"
                        className="form-input"
                        value={retRetireAge}
                        onChange={(e) => setRetRetireAge(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Current Monthly Living Expenses</label>
                      <span className="form-val-display">{formatINR(retExpense)}</span>
                    </div>
                    <input
                      type="range"
                      min="20000"
                      max="300000"
                      step="5000"
                      value={retExpense}
                      onChange={(e) => setRetExpense(Number(e.target.value))}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Inflation Assumption</label>
                      <input
                        type="number"
                        className="form-input"
                        value={retInflation}
                        onChange={(e) => setRetInflation(Number(e.target.value))}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Post-Retirement Return (%)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={retReturn}
                        onChange={(e) => setRetReturn(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Target Retirement Corpus</span>
                    <div className="result-stat-big">{formatINR(retirementCalculation.targetCorpus)}</div>
                    <div className="result-row">
                      <span>Years Until Retirement:</span>
                      <strong>{retirementCalculation.yearsToRetire} Years</strong>
                    </div>
                    <div className="result-row">
                      <span>Future Monthly Expense at Age {retRetireAge}:</span>
                      <strong style={{ color: 'var(--gold)' }}>{formatINR(retirementCalculation.futureMonthlyExpense)}</strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Retirement Planning')}>
                      Build Your Custom Retirement Plan →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. NET WORTH CALCULATOR */}
          {activeToolId === 'networth' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Balance Sheet</span>
                  <h2>Net Worth Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Calculate your true financial standing: Total Assets minus Total Liabilities.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <h4 style={{ fontSize: '15px', color: 'var(--navy)', marginBottom: '12px' }}>Your Assets</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Cash & Bank Savings (₹)</label>
                      <input type="number" className="form-input" value={nwLiquid} onChange={(e) => setNwLiquid(Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Investments (MF, Stocks) (₹)</label>
                      <input type="number" className="form-input" value={nwInvest} onChange={(e) => setNwInvest(Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Real Estate (₹)</label>
                      <input type="number" className="form-input" value={nwRealEstate} onChange={(e) => setNwRealEstate(Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Gold & Vehicles (₹)</label>
                      <input type="number" className="form-input" value={nwGoldOther} onChange={(e) => setNwGoldOther(Number(e.target.value))} />
                    </div>
                  </div>

                  <h4 style={{ fontSize: '15px', color: 'var(--navy)', marginBottom: '12px' }}>Your Liabilities (Debts)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Home Loan Outstanding (₹)</label>
                      <input type="number" className="form-input" value={nwHomeLoan} onChange={(e) => setNwHomeLoan(Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700 }}>Personal / Car / Card Debt (₹)</label>
                      <input type="number" className="form-input" value={nwOtherDebt} onChange={(e) => setNwOtherDebt(Number(e.target.value))} />
                    </div>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Estimated Total Net Worth</span>
                    <div className="result-stat-big">{formatINR(netWorthCalculation.netWorth)}</div>
                    <div className="result-row">
                      <span>Total Assets:</span>
                      <strong style={{ color: '#60a5fa' }}>{formatINR(netWorthCalculation.totalAssets)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Total Liabilities:</span>
                      <strong style={{ color: '#f87171' }}>{formatINR(netWorthCalculation.totalLiabilities)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Debt-to-Asset Ratio:</span>
                      <strong>
                        {((netWorthCalculation.totalLiabilities / (netWorthCalculation.totalAssets || 1)) * 100).toFixed(1)}%
                      </strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Financial Health')}>
                      Plan Wealth Accumulation Strategy →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. EMERGENCY FUND CALCULATOR */}
          {activeToolId === 'emergency' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Safety Net</span>
                  <h2>Emergency Fund Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Calculate the liquid buffer needed to insulate against income disruption or crises.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Monthly Essential Expenses</label>
                      <span className="form-val-display">{formatINR(emMonthlyExp)}</span>
                    </div>
                    <input
                      type="range"
                      min="15000"
                      max="250000"
                      step="5000"
                      value={emMonthlyExp}
                      onChange={(e) => setEmMonthlyExp(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13.5px', fontWeight: 700 }}>
                      Safety Buffer Months
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[3, 6, 9, 12].map((m) => (
                        <button
                          key={m}
                          className={`btn ${emMonths === m ? 'btn-primary' : 'btn-light'}`}
                          onClick={() => setEmMonths(m)}
                        >
                          {m} Months
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Target Emergency Reserve</span>
                    <div className="result-stat-big">{formatINR(emergencyFundTarget)}</div>
                    <div className="result-row">
                      <span>Monthly Mandatory Spend:</span>
                      <strong>{formatINR(emMonthlyExp)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Safety Cushion:</span>
                      <strong>{emMonths} Months</strong>
                    </div>
                    <div className="result-row">
                      <span>Recommended Parking:</span>
                      <strong style={{ color: 'var(--gold)' }}>Sweep FD / Liquid Funds</strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Personal Finance')}>
                      Plan Your Cash Cushion →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. INFLATION CALCULATOR */}
          {activeToolId === 'inflation' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Purchasing Power</span>
                  <h2>Inflation Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    See how purchasing power changes over time and how much things will cost in the future.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Current Cost / Expense</label>
                      <span className="form-val-display">{formatINR(infCurrent)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={infCurrent}
                      onChange={(e) => setInfCurrent(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Expected Inflation Rate (p.a.)</label>
                      <span className="form-val-display">{infRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.5"
                      value={infRate}
                      onChange={(e) => setInfRate(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Time Horizon</label>
                      <span className="form-val-display">{infYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={infYears}
                      onChange={(e) => setInfYears(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Future Equivalent Cost</span>
                    <div className="result-stat-big">{formatINR(futureInflationCost)}</div>
                    <div className="result-row">
                      <span>Purchasing Power Decline:</span>
                      <strong style={{ color: '#f87171' }}>
                        -{(100 - (infCurrent / futureInflationCost) * 100).toFixed(1)}%
                      </strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Investment Advisory')}>
                      Beat Inflation With Equity Investments →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 11. SAVINGS GOAL CALCULATOR */}
          {activeToolId === 'goal' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Target Planning</span>
                  <h2>Savings Goal Calculator</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Calculate how much you need to save each month to reach a specific financial goal.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Target Goal Amount</label>
                      <span className="form-val-display">{formatINR(goalAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="20000000"
                      step="100000"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Time to Achieve (Years)</label>
                      <span className="form-val-display">{goalYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={goalYears}
                      onChange={(e) => setGoalYears(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Expected Return (% p.a.)</label>
                      <span className="form-val-display">{goalReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="18"
                      step="0.5"
                      value={goalReturn}
                      onChange={(e) => setGoalReturn(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Required Monthly Savings</span>
                    <div className="result-stat-big">{formatINR(savingsGoalMonthly)}</div>
                    <div className="result-row">
                      <span>Target Milestone:</span>
                      <strong>{formatINR(goalAmount)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Timeline:</span>
                      <strong>{goalYears} Years ({goalYears * 12} Installments)</strong>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Goal Planning')}>
                      Start Systematically Today →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12. PERSONAL FINANCIAL HEALTH CHECK QUIZ */}
          {activeToolId === 'health-check' && (
            <div className="quiz-container">
              <div className="center-text" style={{ marginBottom: '32px' }}>
                <div className="eyebrow">Interactive Diagnostic</div>
                <h2>Personal Financial Health Check</h2>
                <p className="lead" style={{ margin: '0 auto', fontSize: '15px' }}>
                  Answer 5 quick questions about your money habits to receive an instant educational health score and tailored recommendations.
                </p>
              </div>

              {!quizSubmitted ? (
                <div>
                  {/* Q1 */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>1. What percentage of your monthly in-hand income do you save or invest?</h4>
                    <button
                      className={`quiz-option-btn ${quizAnswers.savingsRate === 'high' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, savingsRate: 'high' })}
                    >
                      <span>More than 30% of income</span>
                      <span>⭐ Optimal</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.savingsRate === 'medium' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, savingsRate: 'medium' })}
                    >
                      <span>Between 15% and 30% of income</span>
                      <span>Moderate</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.savingsRate === 'low' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, savingsRate: 'low' })}
                    >
                      <span>Less than 15% or living month-to-month</span>
                      <span>Low</span>
                    </button>
                  </div>

                  {/* Q2 */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>2. How much of your monthly income goes toward debt repayment (EMIs & credit cards)?</h4>
                    <button
                      className={`quiz-option-btn ${quizAnswers.debtRatio === 'low' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, debtRatio: 'low' })}
                    >
                      <span>Under 25% of income or debt-free</span>
                      <span>⭐ Healthy</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.debtRatio === 'medium' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, debtRatio: 'medium' })}
                    >
                      <span>Between 25% and 50%</span>
                      <span>Moderate Burden</span>
                    </button>
                  </div>

                  {/* Q3 */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>3. How many months of essential living expenses do you have in an emergency fund?</h4>
                    <button
                      className={`quiz-option-btn ${quizAnswers.emergencyFund === 'adequate' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, emergencyFund: 'adequate' })}
                    >
                      <span>6 or more months in liquid cash / FDs</span>
                      <span>⭐ Safe</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.emergencyFund === 'partial' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, emergencyFund: 'partial' })}
                    >
                      <span>1 to 3 months</span>
                      <span>Partial</span>
                    </button>
                  </div>

                  {/* Q4 */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>4. Do you have independent Health Insurance and Term Life Insurance?</h4>
                    <button
                      className={`quiz-option-btn ${quizAnswers.insurance === 'yes' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, insurance: 'yes' })}
                    >
                      <span>Yes, fully covered independently of employer</span>
                      <span>⭐ Protected</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.insurance === 'no' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, insurance: 'no' })}
                    >
                      <span>Only corporate coverage or no policy</span>
                      <span>Exposed</span>
                    </button>
                  </div>

                  {/* Q5 */}
                  <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '15px', marginBottom: '10px' }}>5. Have you started investing systematically for retirement (EPF, NPS, SIPs)?</h4>
                    <button
                      className={`quiz-option-btn ${quizAnswers.retirementInvest === 'yes' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, retirementInvest: 'yes' })}
                    >
                      <span>Yes, consistent ongoing monthly allocation</span>
                      <span>⭐ On Track</span>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.retirementInvest === 'started' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, retirementInvest: 'started' })}
                    >
                      <span>Just getting started or irregular</span>
                      <span>Developing</span>
                    </button>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setQuizSubmitted(true)}
                  >
                    Calculate My Financial Health Score →
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--cream)',
                    border: '4px solid var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 20px',
                    fontSize: '32px',
                    fontWeight: 900,
                    color: 'var(--navy)'
                  }}>
                    {quizScore}
                  </div>

                  <h3 style={{ color: quizTier.color, fontSize: '24px' }}>{quizTier.label}</h3>
                  <p className="lead" style={{ margin: '12px auto 28px', fontSize: '15px', maxWidth: '600px' }}>
                    {quizTier.advice}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="btn btn-light" onClick={() => setQuizSubmitted(false)}>
                      <RotateCcw size={15} /> Retake Assessment
                    </button>
                    <button className="btn btn-gold" onClick={() => openConsultation('Financial Health Review')}>
                      Discuss With An Advisor →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 13. BUSINESS FINANCIAL HEALTH CHECK */}
          {activeToolId === 'biz-health' && (
            <div className="calculator-box">
              <div className="calc-header">
                <div>
                  <span className="service-badge">Operational Diagnosis</span>
                  <h2>Business Financial Health Check</h2>
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                    Evaluate your revenue, margins, debtor collection cycle, and working capital stability.
                  </p>
                </div>
              </div>

              <div className="calc-body">
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Annual Turnover / Revenue</label>
                      <span className="form-val-display">{formatINR(bizRevenue)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="100000000"
                      step="500000"
                      value={bizRevenue}
                      onChange={(e) => setBizRevenue(Number(e.target.value))}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Gross Margin (%)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={bizGrossMargin}
                        onChange={(e) => setBizGrossMargin(Number(e.target.value))}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '13px', fontWeight: 700 }}>Net Margin (%)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={bizNetMargin}
                        onChange={(e) => setBizNetMargin(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-label-row">
                      <label>Average Debtor Days (DSO - Days to receive payment)</label>
                      <span className="form-val-display">{bizDebtorDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      value={bizDebtorDays}
                      onChange={(e) => setBizDebtorDays(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Operating Cash Flow Status
                    </label>
                    <div className="radio-group">
                      <div
                        className={`radio-pill ${bizCashFlowStatus === 'positive' ? 'active' : ''}`}
                        onClick={() => setBizCashFlowStatus('positive')}
                      >
                        Positive (Cash Inflows {'>'} Outflows)
                      </div>
                      <div
                        className={`radio-pill ${bizCashFlowStatus === 'strained' ? 'active' : ''}`}
                        onClick={() => setBizCashFlowStatus('strained')}
                      >
                        Strained / Negative
                      </div>
                    </div>
                  </div>
                </div>

                <div className="calc-results-pane">
                  <div>
                    <span className="result-stat-label">Business Operational Health</span>
                    <div className="result-stat-big">{bizHealthAnalysis.healthScore}/100</div>

                    <div className="result-row">
                      <span>Annual Gross Profit:</span>
                      <strong>{formatINR(bizHealthAnalysis.grossProfit)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Annual Net Profit (PAT):</span>
                      <strong style={{ color: 'var(--gold)' }}>{formatINR(bizHealthAnalysis.netProfit)}</strong>
                    </div>
                    <div className="result-row">
                      <span>Working Capital Risk:</span>
                      <strong>{bizHealthAnalysis.isGoodDSO ? 'Low Risk' : 'Elevated (High DSO)'}</strong>
                    </div>
                    <div className="result-row">
                      <span>Liquidity Rating:</span>
                      <strong>{bizHealthAnalysis.isHealthyCash ? 'Sound' : 'Requires Cash Runway Audit'}</strong>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => openConsultation('Virtual CFO & Business Review')}>
                      Book Virtual CFO Diagnostic Session →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* IMPORTANT INFORMATION DISCLAIMER */}
          <div className="statutory-notice" style={{ marginTop: '50px' }}>
            <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
              Important Statutory Notice:
            </strong>
            Our calculators are intended for general informational and educational purposes. Results are estimates based on the information and assumptions entered by the user and should not be considered personalised financial, investment, tax or legal advice. Actual results may differ based on specific tax slab updates, market volatility, and statutory provisions.
          </div>
        </div>
      </section>
    </div>
  );
}
