import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { RiskPill, StatusPill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { tareaEstado, eventoEstado, casoRiesgo, fmtFechaCorta, fmtFechaHora } from '../store/selectors.js';

export default function PageHome({ onCase, onNew, onNav, user }) {
  const { state } = useStore();
  const { casos, tareas, eventos } = state;

  const casosActivos = casos.filter((c) => c.estado !== 'Cerrado').length;
  const tareasPend = tareas.filter((t) => !t.completada).length;
  const ahora = new Date();
  const audienciasMes = eventos.filter((e) => {
    const d = new Date(e.fechaISO);
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear() && e.tipo === 'Audiencia';
  }).length;
  const eventosCompletadosMes = eventos.filter((e) => {
    const d = new Date(e.fechaISO);
    return e.completado && d.getMonth() === ahora.getMonth();
  }).length;

  const stats = [
    { label: 'Casos activos',      value: String(casosActivos),  trend: { dir: 'up', pct: '8%',  vs: 'vs. periodo anterior' }, icon: 'briefcase',    iconClass: 'navy' },
    { label: 'Tareas pendientes',  value: String(tareasPend),    trend: { dir: 'up', pct: '12%', vs: 'vs. periodo anterior' }, icon: 'check-square', iconClass: 'blue' },
    { label: 'Audiencias este mes',value: String(audienciasMes), trend: { dir: 'up', pct: '7%',  vs: 'vs. periodo anterior' }, icon: 'gavel',        iconClass: 'amber' },
    { label: 'Eventos completados',value: String(eventosCompletadosMes), trend: { dir: 'up', pct: '15%', vs: 'vs. periodo anterior' }, icon: 'doc',  iconClass: 'green' },
    { label: 'Casos cerrados',     value: String(casos.filter((c) => c.estado === 'Cerrado').length), trend: { dir: 'up', pct: '9%',  vs: 'vs. periodo anterior' }, icon: 'check', iconClass: '' },
  ];

  const tareasConEstado = tareas.map((t) => ({ ...t, estadoCalc: tareaEstado(t) }));
  const tasksByState = (s) => tareasConEstado.filter((t) => t.estadoCalc === s);
  const taskCols = [
    { state: 'atrasada',   label: 'Atrasada' },
    { state: 'proxima',    label: 'Próxima' },
    { state: 'pendiente',  label: 'Pendiente' },
    { state: 'completada', label: 'Completada' },
  ];

  const eventosConEstado = eventos.map((e) => ({ ...e, estadoCalc: eventoEstado(e) }));
  const eventsGrouped = ['vencido','proximo','pendiente','completado'].map((g) => ({
    state: g,
    label: { vencido: 'Vencido', proximo: 'Próximo', pendiente: 'Pendiente', completado: 'Completado' }[g],
    items: eventosConEstado.filter((e) => e.estadoCalc === g),
  }));

  const casosOrdenados = [...casos].sort((a, b) => new Date(b.ultActuISO) - new Date(a.ultActuISO));

  const findCaso = (id) => casos.find((c) => c.id === id);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="hero-greeting">Hola, <em>{user.firstName}</em></h1>
          <p className="page-subtitle">Aquí tienes el resumen operativo de hoy.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => onNav('calendario')}>
            <Icon name="calendar" size={15}/> Ver calendario
          </button>
          <button className="btn btn-primary" onClick={() => onNew('caso')}>
            <Icon name="plus" size={15}/> Nuevo caso
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-trend ${s.trend.dir === 'down' ? 'down' : ''}`}>
                <Icon name={s.trend.dir === 'up' ? 'arrow-up' : 'arrow-down'} size={12}/>
                <strong>{s.trend.pct}</strong> {s.trend.vs}
              </div>
            </div>
            <div className={`stat-icon ${s.iconClass}`}><Icon name={s.icon} size={18}/></div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div className="card">
            <div className="card-head">
              <h3 className="card-title">Tareas</h3>
              <div className="row" style={{ gap: 6 }}>
                <button className="btn btn-secondary btn-sm">
                  <Icon name="users" size={13}/> Todos los equipos <Icon name="chevron-down" size={12}/>
                </button>
                <button className="btn btn-ghost btn-sm btn-icon"><Icon name="more" size={15}/></button>
              </div>
            </div>
            <div className="dash-tasks">
              {taskCols.map((col) => {
                const items = tasksByState(col.state);
                return (
                  <div className="task-col" data-state={col.state} key={col.state}>
                    <div className="task-col-head">
                      {col.label}
                      <span className="task-col-count">{items.length}</span>
                    </div>
                    {items.slice(0, 5).map((t) => {
                      const c = findCaso(t.casoId);
                      return (
                        <div
                          className={`task-card ${t.completada ? 'completed' : ''}`}
                          key={t.id}
                          onClick={() => onCase(t.casoId)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="task-row">
                            <div className="task-title">{t.titulo}</div>
                            <div className="task-date">{fmtFechaCorta(t.fechaISO)}{t.hora ? ` · ${t.hora}` : ''}</div>
                          </div>
                          <div className="task-meta">Caso: {c ? c.titulo : t.casoId}</div>
                        </div>
                      );
                    })}
                    {items.length > 5 && (
                      <div className="task-col-foot">
                        <button className="link-btn" onClick={() => onNav('tareas')}>Ver todas ({items.length})</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <h3 className="card-title">Casos recientes</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => onCase(null, 'casos')}>
                Ver todos los casos <Icon name="arrow-right" size={13}/>
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Caso</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Riesgo</th>
                  <th>Abogado responsable</th>
                  <th>Última actualización</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {casosOrdenados.slice(0, 6).map((c) => (
                  <tr className="row-link" key={c.id} onClick={() => onCase(c.id)}>
                    <td>
                      <div className="case-cell">
                        <div className="file-icon"><Icon name="file" size={16}/></div>
                        <div>
                          <div className="case-id">{c.id}</div>
                          <div className="case-title">{c.titulo}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {c.cliente}
                      <div className="muted" style={{ fontSize: 11.5 }}>{c.clienteRazon}</div>
                    </td>
                    <td><StatusPill value={c.estado}/></td>
                    <td><RiskPill level={casoRiesgo(c.id, eventos, tareas)}/></td>
                    <td>
                      <div className="row" style={{ gap: 8 }}>
                        <Avatar name={c.abogado} idx={c.avatarIdx} size="sm"/>
                        <span style={{ fontSize: 13 }}>{c.abogado}</span>
                      </div>
                    </td>
                    <td className="muted" style={{ fontSize: 12.5 }}>{fmtFechaHora(c.ultActuISO)}</td>
                    <td><button className="menu-btn"><Icon name="more" size={15}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card events-rail">
          <div className="card-head">
            <h3 className="card-title">Próximos eventos y plazos</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('calendario')}>Ver calendario</button>
          </div>
          {eventsGrouped.map((grp) => (
            <div className="alert-group" data-grp={grp.state} key={grp.state}>
              <div className="alert-group-head">
                <div className="grp-label"><span className="pill-dot"/>{grp.label}</div>
                <span className="alert-count">{grp.items.length}</span>
              </div>
              {grp.items.slice(0, 3).map((e) => {
                const c = findCaso(e.casoId);
                return (
                  <div className="alert-item" key={e.id} onClick={() => onCase(e.casoId)}>
                    <div className="alert-item-row">
                      <div className="alert-title">{e.titulo}</div>
                      <div className="alert-when">{fmtFechaCorta(e.fechaISO)}{e.hora ? ` · ${e.hora}` : ''}</div>
                    </div>
                    <div className="alert-case">Caso: {c ? c.titulo : e.casoId}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
