import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// Menú ••• con acciones { label, icon, onClick, danger? }
export default function RowMenu({ items, size = 15 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="menu-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
      >
        <Icon name="more" size={size}/>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute', right: 0, top: 34, zIndex: 30,
            background: 'var(--c-surface)', border: '1px solid var(--c-border)',
            borderRadius: 10, boxShadow: 'var(--sh-2, 0 8px 24px rgba(0,0,0,.12))',
            minWidth: 180, padding: 6, display: 'flex', flexDirection: 'column', gap: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((it, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setOpen(false); it.onClick?.(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', fontSize: 13, borderRadius: 6,
                border: 0, background: 'transparent', cursor: 'pointer',
                color: it.danger ? 'var(--c-danger-text)' : 'var(--c-text)',
                textAlign: 'left', width: '100%',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--c-surface-low)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {it.icon && <Icon name={it.icon} size={14}/>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
