import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, ShieldCheck } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, initialService = 'Income Tax' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    slot: 'Morning (10:00 AM - 01:00 PM)',
    note: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {step === 1 ? (
          <div>
            <div className="eyebrow">
              <Calendar size={13} /> Schedule A Discussion
            </div>
            <h2>Book a Consultation</h2>
            <p className="lead" style={{ fontSize: '15px', marginBottom: '24px' }}>
              Connect with our finance & tax specialists to evaluate your requirements and get practical guidance.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                  What do you need help with?
                </label>
                <select
                  className="form-input"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                >
                  <option value="Income Tax">Income Tax Filing & Planning</option>
                  <option value="GST">GST Registration & Compliance</option>
                  <option value="Accounting & Bookkeeping">Accounting & Bookkeeping</option>
                  <option value="Payroll">Payroll Processing</option>
                  <option value="Business Compliance">Business Registration & ROC Compliance</option>
                  <option value="Finance Advisory">Finance & Business Advisory (Virtual CFO)</option>
                  <option value="Financial Tools">Financial Tools & Calculations</option>
                  <option value="Other">Other Requirement</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                    Time Slot
                  </label>
                  <select
                    className="form-input"
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    required
                  >
                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (2 PM - 5 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-group">
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sahil Yadav"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 700 }}>
                  Brief Note (Optional)
                </label>
                <textarea
                  className="form-input"
                  rows={2}
                  placeholder="Share any specific context or question"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--muted)' }}>
                  <ShieldCheck size={16} color="var(--green)" /> Confidential & Direct
                </div>
                <button type="submit" className="btn btn-gold">
                  Confirm Consultation Slot →
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2>Consultation Requested!</h2>
            <p className="lead" style={{ margin: '12px auto 24px', fontSize: '15px' }}>
              Thank you, <strong>{formData.name}</strong>. Our finance advisor will contact you on <strong>{formData.phone}</strong> for your <strong>{formData.service}</strong> consultation scheduled for <strong>{formData.date}</strong> ({formData.slot}).
            </p>
            <div style={{ background: 'var(--surface-alt)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', textAlign: 'left', fontSize: '13.5px' }}>
              <div><strong>Reference ID:</strong> VS-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div style={{ marginTop: '6px' }}><strong>Service:</strong> {formData.service}</div>
              <div style={{ marginTop: '6px' }}><strong>Email Confirmation:</strong> Sent to {formData.email}</div>
            </div>
            <button className="btn btn-primary" onClick={handleReset}>
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
