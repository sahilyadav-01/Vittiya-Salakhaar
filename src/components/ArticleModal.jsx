import React from 'react';
import { X, Clock, BookOpen, Share2 } from 'lucide-react';

export default function ArticleModal({ article, onClose, onShare }) {
  if (!article) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ width: 'min(760px, 95vw)' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close article">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="article-badge">{article.category}</span>
          <span style={{ fontSize: '12.5px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {article.readTime}
          </span>
          <span style={{ fontSize: '12.5px', color: 'var(--gold-dark)', fontWeight: 700 }}>
            {article.date}
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', marginBottom: '16px', lineHeight: 1.25 }}>
          {article.title}
        </h2>

        <div style={{
          background: 'var(--cream)',
          borderLeft: '4px solid var(--gold)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14.5px',
          color: 'var(--ink-secondary)',
          marginBottom: '28px',
          lineHeight: 1.6
        }}>
          <strong>Summary: </strong> {article.summary}
        </div>

        <div className="article-body-content" style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--ink-secondary)' }}>
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} style={{ marginTop: '24px', marginBottom: '10px', color: 'var(--navy)', fontSize: '19px' }}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={idx} style={{
                  background: 'var(--navy)',
                  color: '#e2e8f0',
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  overflowX: 'auto',
                  fontSize: '13px',
                  margin: '18px 0',
                  fontFamily: 'monospace'
                }}>
                  {paragraph.replace(/```/g, '').trim()}
                </pre>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
              return (
                <div key={idx} style={{ margin: '12px 0', paddingLeft: '8px' }}>
                  {paragraph.split('\n').map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>•</span>
                      <span>{item.replace(/^[-*]|\d+\.\s*/, '').trim()}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return <p key={idx} style={{ marginBottom: '16px' }}>{paragraph}</p>;
          })}
        </div>

        <div style={{
          borderTop: '1px solid var(--line)',
          marginTop: '32px',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
            Educational guidance published by Vittiya Salakhaar Research Team.
          </div>
          <button
            className="btn btn-light btn-sm"
            onClick={() => onShare(article.title)}
            style={{ display: 'inline-flex', gap: '6px' }}
          >
            <Share2 size={14} /> Share Article
          </button>
        </div>
      </div>
    </div>
  );
}
