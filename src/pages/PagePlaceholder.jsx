import Icon from '../components/Icon.jsx';

export default function PagePlaceholder({ title, subtitle }) {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="card" style={{ padding: 60, textAlign: 'center' }}>
        <div
          style={{
            margin: '0 auto 18px',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'var(--c-surface-2)',
            border: '1px solid var(--c-border)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--c-text-3)',
          }}
        >
          <Icon name="briefcase" size={24}/>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>Próximamente</div>
        <div className="muted" style={{ fontSize: 13.5, maxWidth: 380, margin: '0 auto' }}>
          Esta sección está fuera del alcance del MVP. La integramos en próximas iteraciones.
        </div>
      </div>
    </div>
  );
}
