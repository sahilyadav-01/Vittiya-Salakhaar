import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle2 size={18} color="var(--gold)" />
        <span>{message}</span>
      </div>
    </div>
  );
}
