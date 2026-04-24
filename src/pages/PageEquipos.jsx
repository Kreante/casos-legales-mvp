import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PageEquipos({ onNew }) {
  const { state, dispatch } = useStore();
  const del = (id, nombre) => {
    if (window.confirm(`¿Eliminar equipo "${nombre}"?`)) dispatch({ type: 'EQUIPO_DELETE', payload: { id } });
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Equipos</h1>
          <p className="page-subtitle">Áreas de práctica y asignación de cartera</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNew('equipo')}>
          <Icon name="plus" size={15}/> Nuevo equipo
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
        {state.equipos.map((eq) => (
          <div className="card" key={eq.id} style={{ padding: 22 }}>
            <div className="between" style={{ marginBottom: 18 }}>
              <div className="row" style={{ gap: 12 }}>
                <div className="stat-icon" style={{ width: 42, height: 42, borderRadius: 8 }}>
                  <Icon name="users" size={18}/>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{eq.nombre}</div>
                  <div className="muted" style={{ fontSize: 12.5 }}>{eq.miembros} miembros · {eq.casos} casos</div>
                </div>
              </div>
              <RowMenu items={[{ label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(eq.id, eq.nombre) }]}/>
            </div>
            <div className="kv-grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
              <div>
                <div className="kv-label">Líder</div>
                <div className="row" style={{ gap: 8, marginTop: 6 }}>
                  <Avatar name={eq.lider} idx={eq.lid} size="sm"/>{eq.lider}
                </div>
              </div>
              <div>
                <div className="kv-label">Carga de trabajo</div>
                <div style={{ height: 8, borderRadius: 4, background: 'var(--c-surface-2)', marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, eq.casos * 5)}%`, height: '100%', background: 'var(--c-accent)' }}/>
                </div>
              </div>
            </div>
            <div className="row" style={{ gap: 6, marginTop: 18 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onNew('detalle-equipo', { id: eq.id, initialTab: 'miembros' })}
              >
                Ver miembros
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onNew('detalle-equipo', { id: eq.id, initialTab: 'casos' })}
              >
                Casos asignados
              </button>
            </div>
          </div>
        ))}
        {state.equipos.length === 0 && (
          <div className="muted" style={{ padding: 24, textAlign: 'center' }}>Sin equipos creados.</div>
        )}
      </div>
    </div>
  );
}
