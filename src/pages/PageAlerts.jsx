import Icon from '../components/Icon.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { eventoEstado, tareaEstado, fmtFechaCorta, relativoCorto } from '../store/selectors.js';

export default function PageAlerts({ onCase }) {
  const { state } = useStore();
  const findCaso = (id) => state.casos.find((c) => c.id === id);

  const eventosVencidos = state.eventos.filter((e) => eventoEstado(e) === 'vencido');
  const eventosProximos = state.eventos.filter((e) => eventoEstado(e) === 'proximo');
  const tareasAtrasadas = state.tareas.filter((t) => tareaEstado(t) === 'atrasada');

  const groups = [
    { id: 'vencidos', title: 'Eventos vencidos', kind: 'danger', icon: 'alert',
      items: eventosVencidos.map((e) => ({ id: e.id, titulo: e.titulo, casoId: e.casoId, fechaISO: e.fechaISO, hora: e.hora })) },
    { id: 'proximos', title: 'Eventos próximos (7 días)', kind: 'warn', icon: 'clock',
      items: eventosProximos.map((e) => ({ id: e.id, titulo: e.titulo, casoId: e.casoId, fechaISO: e.fechaISO, hora: e.hora })) },
    { id: 'atrasadas', title: 'Tareas atrasadas', kind: 'danger', icon: 'check-square',
      items: tareasAtrasadas.map((t) => ({ id: t.id, titulo: t.titulo, casoId: t.casoId, fechaISO: t.fechaISO, hora: t.hora })) },
  ];

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Alertas</h1>
          <p className="page-subtitle">Resumen centralizado para no perder fechas críticas</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm"><Icon name="settings" size={14}/> Configurar alertas</button>
          <button className="btn btn-secondary btn-sm">Marcar todas como leídas</button>
        </div>
      </div>

      <div className="alerts-grid">
        {groups.map((g) => (
          <div className="card alerts-card" key={g.id}>
            <div className="card-head">
              <div className="row" style={{ gap: 10 }}>
                <div className={`stat-icon ${g.kind === 'danger' ? 'red' : 'amber'}`} style={{ width: 32, height: 32, borderRadius: 8 }}>
                  <Icon name={g.icon} size={15}/>
                </div>
                <h3 className="card-title">{g.title}</h3>
              </div>
              <span className="alert-count">{g.items.length}</span>
            </div>
            <div className="alerts-list">
              {g.items.length === 0 && (
                <div className="muted" style={{ padding: 18, fontSize: 13 }}>No hay alertas en este grupo.</div>
              )}
              {g.items.map((it) => {
                const c = findCaso(it.casoId);
                return (
                  <div className="alert-item" key={it.id} onClick={() => onCase(it.casoId)}>
                    <div className="alert-item-row">
                      <div className="alert-title">{it.titulo}</div>
                      <div className="alert-when">{fmtFechaCorta(it.fechaISO)}{it.hora ? ` · ${it.hora}` : ''}</div>
                    </div>
                    <div className="alert-case">Caso: {c ? c.titulo : it.casoId}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 18 }}/>
      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Centro de notificaciones</h3>
          <button className="btn btn-ghost btn-sm">Marcar todas como leídas</button>
        </div>
        <div className="alerts-list">
          {state.notificaciones.map((a) => (
            <div className="alert-item" key={a.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--c-divider)' }}>
              <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                <div
                  className={`stat-icon ${a.kind === 'danger' ? 'red' : a.kind === 'warn' ? 'amber' : 'blue'}`}
                  style={{ width: 32, height: 32, borderRadius: 8, flex: 'none' }}
                >
                  <Icon name={a.kind === 'danger' ? 'alert' : a.kind === 'warn' ? 'clock' : 'msg'} size={15}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="alert-item-row">
                    <div className="alert-title">{a.titulo}</div>
                    <div className="alert-when">{a.when}</div>
                  </div>
                  <div className="alert-case">{a.sub}</div>
                </div>
                <span className="pill-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-accent)', marginTop: 8 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
