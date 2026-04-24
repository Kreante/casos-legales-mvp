import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PagePlantillas({ onNew }) {
  const { state, dispatch } = useStore();
  const [cat, setCat] = useState('todas');
  const cats = ['todas', 'Laboral', 'Comercial', 'Civil', 'Familia', 'General'];

  const list = state.plantillas.filter((p) => cat === 'todas' || p.cat === cat);
  const counts = Object.fromEntries(
    cats.map((c) => [c, c === 'todas' ? state.plantillas.length : state.plantillas.filter((p) => p.cat === c).length])
  );

  const del = (id, nombre) => {
    if (window.confirm(`¿Eliminar plantilla "${nombre}"?`)) dispatch({ type: 'PLANTILLA_DELETE', payload: { id } });
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Plantillas</h1>
          <p className="page-subtitle">Modelos y formularios listos para reutilizar</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="upload" size={14}/> Importar</button>
          <button className="btn btn-primary" onClick={() => onNew('plantilla')}>
            <Icon name="plus" size={15}/> Nueva plantilla
          </button>
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
            <div
              key={p.id}
              className="card"
              style={{ padding: 16, boxShadow: 'none', cursor: 'pointer' }}
              onClick={() => onNew('detalle-plantilla', { id: p.id })}
            >
              <div className="between" style={{ marginBottom: 10 }}>
                <div className="row" style={{ gap: 10 }}>
                  <div className="stat-icon blue" style={{ width: 38, height: 38, borderRadius: 8 }}>
                    <Icon name="doc" size={17}/>
                  </div>
                  <span className="pill muted"><span className="pill-dot"/>{p.cat}</span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <RowMenu
                    items={[
                      { label: 'Ver detalle', icon: 'file', onClick: () => onNew('detalle-plantilla', { id: p.id }) },
                      { label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(p.id, p.nombre) },
                    ]}
                  />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)', marginBottom: 6, lineHeight: 1.3 }}>
                {p.nombre}
              </div>
              <div className="muted" style={{ fontSize: 12, marginBottom: 14 }}>Actualizado · {p.actu}</div>
              <div className="between" style={{ fontSize: 12, color: 'var(--c-text-3)' }}>
                <span><Icon name="check" size={11}/> {p.uso} usos</span>
                <button
                  className="link-btn"
                  style={{ padding: 0 }}
                  onClick={(e) => { e.stopPropagation(); onNew('detalle-plantilla', { id: p.id }); }}
                >
                  Usar plantilla →
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="muted" style={{ padding: 24, textAlign: 'center', gridColumn: '1 / -1' }}>Sin plantillas.</div>
          )}
        </div>
      </div>
    </div>
  );
}
