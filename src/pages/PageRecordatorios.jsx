import Icon from '../components/Icon.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PageRecordatorios({ onCase, onNew }) {
  const { state, dispatch } = useStore();
  const { recordatorios } = state;

  const casoTitulo = (id) => state.casos.find((c) => c.id === id)?.titulo || '—';

  const pendientes = recordatorios.filter((r) => !r.leido).length;

  const del = (id, titulo) => {
    if (window.confirm(`¿Eliminar recordatorio "${titulo}"?`)) dispatch({ type: 'RECORDATORIO_DELETE', payload: { id } });
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Recordatorios</h1>
          <p className="page-subtitle">Avisos personales y de equipo · separados de plazos judiciales</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm"><Icon name="settings" size={14}/> Preferencias</button>
          <button className="btn btn-primary" onClick={() => onNew('recordatorio')}>
            <Icon name="plus" size={15}/> Nuevo recordatorio
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Recordatorios · {recordatorios.length} · Pendientes {pendientes}</h3>
        </div>
        <div>
          {recordatorios.map((r) => {
            const tone = r.leido ? 'info' : r.kind === 'danger' ? 'danger' : r.kind === 'warn' ? 'warn' : 'info';
            const pillLabel = r.leido ? 'Leído' : r.kind === 'danger' ? 'Urgente' : r.kind === 'warn' ? 'Próximo' : 'Programado';
            return (
              <div
                key={r.id}
                className="evt-row"
                style={{
                  padding: '14px 22px',
                  borderTop: '1px solid var(--c-divider)',
                  display: 'grid',
                  gridTemplateColumns: '4px 28px minmax(0,1fr) auto auto auto',
                  gap: 14,
                  opacity: r.leido ? 0.6 : 1,
                  cursor: r.casoId ? 'pointer' : 'default',
                }}
                onClick={() => r.casoId && onCase?.(r.casoId)}
              >
                <div className={`evt-bar ${tone}`}/>
                <div className={`evt-icon ${tone}`}><Icon name="bell" size={14}/></div>
                <div className="evt-body">
                  <div className="evt-title" style={{ textDecoration: r.leido ? 'line-through' : 'none' }}>{r.titulo}</div>
                  <div className="evt-sub">
                    {r.tipo}{r.casoId ? ` · ${casoTitulo(r.casoId)}` : ''}
                  </div>
                </div>
                <div className="evt-date">{r.fecha} · {r.hora}</div>
                <span className={`pill ${tone}`}><span className="pill-dot"/>{pillLabel}</span>
                <RowMenu
                  items={[
                    {
                      label: r.leido ? 'Marcar como pendiente' : 'Marcar como leído',
                      icon: 'check',
                      onClick: () => dispatch({ type: 'RECORDATORIO_TOGGLE_LEIDO', payload: { id: r.id } }),
                    },
                    { label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(r.id, r.titulo) },
                  ]}
                />
              </div>
            );
          })}
          {recordatorios.length === 0 && (
            <div className="muted" style={{ padding: 24, textAlign: 'center' }}>Sin recordatorios.</div>
          )}
        </div>
      </div>
    </div>
  );
}
