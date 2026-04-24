import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { PLANTILLAS } from './mockExtra.js';

export default function PagePlantillas() {
  const [cat, setCat] = useState('todas');
  const cats = ['todas', 'Laboral', 'Comercial', 'Civil', 'Familia', 'General'];
  const list = PLANTILLAS.filter((p) => cat === 'todas' || p.cat === cat);
  const counts = Object.fromEntries(
    cats.map((c) => [c, c === 'todas' ? PLANTILLAS.length : PLANTILLAS.filter((p) => p.cat === c).length])
  );

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Plantillas</h1>
          <p className="page-subtitle">Modelos y formularios listos para reutilizar</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="upload" size={14}/> Importar</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nueva plantilla</button>
        </div>
      </div>
      <div className="card">
        <div className="tabs">
          {cats.map((c) => (
            <button key={c} className={`tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c === 'todas' ? 'Todas' : c} <span className="tab-count">{counts[c]}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {list.map((p) => (
            <div key={p.id} className="card" style={{ padding: 16, cursor: 'pointer', boxShadow: 'none' }}>
              <div className="row" style={{ gap: 10, marginBottom: 10 }}>
                <div className="stat-icon blue" style={{ width: 38, height: 38, borderRadius: 8 }}>
                  <Icon name="doc" size={17}/>
                </div>
                <span className="pill muted"><span className="pill-dot"/>{p.cat}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)', marginBottom: 6, lineHeight: 1.3 }}>
                {p.nombre}
              </div>
              <div className="muted" style={{ fontSize: 12, marginBottom: 14 }}>Actualizado · {p.actu}</div>
              <div className="between" style={{ fontSize: 12, color: 'var(--c-text-3)' }}>
                <span><Icon name="check" size={11}/> {p.uso} usos</span>
                <button className="link-btn" style={{ padding: 0 }}>Usar plantilla →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
