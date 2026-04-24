import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { RiskPill, StatusPill, EventStatePill, TaskStatePill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { eventoEstado, tareaEstado, casoRiesgo, fmtFechaCorta, fmtFechaHora } from '../store/selectors.js';

export default function PageCaseDetail({ caseId, onCase, onNew }) {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('resumen');

  const c = state.casos.find((x) => x.id === caseId) || state.casos[0];
  if (!c) return <div className="card" style={{ padding: 32 }}>No hay casos.</div>;

  const tareas = state.tareas.filter((t) => t.casoId === c.id);
  const eventos = state.eventos.filter((e) => e.casoId === c.id);
  const riesgo = casoRiesgo(c.id, state.eventos, state.tareas);

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'eventos', label: `Eventos · ${eventos.length}` },
    { id: 'tareas',  label: `Tareas · ${tareas.length}` },
    { id: 'documentos', label: 'Documentos' },
    { id: 'comunicacion', label: 'Comunicación' },
    { id: 'historial', label: 'Historial' },
  ];

  return (
    <div>
      <div className="page-head" style={{ alignItems: 'center' }}>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onCase(null, 'casos')}>
            <Icon name="chevron-left" size={14}/> Volver
          </button>
          <span className="muted" style={{ fontSize: 13 }}>
            Casos / <span className="mono">{c.id}</span>
          </span>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm"><Icon name="mail" size={14}/> Compartir</button>
          <button className="btn btn-secondary btn-sm"><Icon name="settings" size={14}/> Editar caso</button>
          <button className="btn btn-ghost btn-sm btn-icon"><Icon name="more" size={16}/></button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="card case-list-card">
          <div className="card-head" style={{ padding: '14px 16px' }}>
            <h3 className="card-title">Mis casos</h3>
            <button className="btn btn-primary btn-sm" onClick={() => onNew('caso')}>
              <Icon name="plus" size={13}/> Nuevo
            </button>
          </div>
          <div className="filter-input" style={{ margin: '10px 14px', maxWidth: 'none' }}>
            <Icon name="search" size={14}/>
            <input placeholder="Buscar casos…"/>
          </div>
          <div className="case-list">
            {state.casos.map((x) => (
              <div
                key={x.id}
                className={`case-list-item ${x.id === c.id ? 'active' : ''}`}
                onClick={() => onCase(x.id)}
              >
                <div className="ci-icon">{x.id.split('/')[0].slice(-2)}</div>
                <div className="ci-body">
                  <div className="ci-title-row">
                    <div className="ci-title">{x.titulo}</div>
                    <div className="ci-date">{fmtFechaCorta(x.ultActuISO)}</div>
                  </div>
                  <div className="ci-client">{x.cliente}</div>
                  <div className="ci-pills">
                    <StatusPill value={x.estado}/>
                    <RiskPill level={casoRiesgo(x.id, state.eventos, state.tareas)}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="detail-head">
            <h2 className="detail-title">{c.caratulado}</h2>
            <div className="detail-meta">
              <span><Icon name="users" size={14}/> {c.cliente}</span>
              <span><Icon name="briefcase" size={14}/> {c.clienteRazon}</span>
              <span className="mono" style={{ fontSize: 12.5 }}>{c.id}</span>
              <StatusPill value={c.estado}/>
              <RiskPill level={riesgo}/>
            </div>
          </div>

          <div className="detail-tabs">
            {tabs.map((t) => (
              <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>

          <div className="section-card">
            <div className="sc-head">
              <h4 className="sc-title">Información básica</h4>
            </div>
            <div className="kv-grid">
              <div><div className="kv-label">Fuero</div><div className="kv-value">{c.fuero}</div></div>
              <div><div className="kv-label">Tipo de caso</div><div className="kv-value">{c.tipo}</div></div>
              <div><div className="kv-label">Fecha de apertura</div><div className="kv-value">{c.apertura}</div></div>
              <div><div className="kv-label">Tribunal</div><div className="kv-value">{c.tribunal}</div></div>
              <div><div className="kv-label">N° de expediente</div><div className="kv-value mono">{c.expediente}</div></div>
              <div><div className="kv-label">Monto reclamado</div><div className="kv-value">{c.monto}</div></div>
              <div>
                <div className="kv-label">Abogado responsable</div>
                <div className="kv-value row" style={{ gap: 8 }}>
                  <Avatar name={c.abogado} idx={c.avatarIdx} size="sm"/>{c.abogado}
                </div>
              </div>
              <div><div className="kv-label">Descripción</div><div className="kv-value">{c.desc}</div></div>
            </div>
          </div>

          <div className="section-card">
            <div className="sc-head">
              <h4 className="sc-title">Eventos y plazos</h4>
              <button className="btn btn-secondary btn-sm" onClick={() => onNew('evento', c.id)}>
                <Icon name="plus" size={13}/> Crear evento
              </button>
            </div>
            {eventos.length === 0 && (
              <div className="muted" style={{ fontSize: 13, padding: '8px 0' }}>
                No hay eventos para este caso. Creá el primero.
              </div>
            )}
            {eventos.map((e) => {
              const estado = eventoEstado(e);
              const tone = estado === 'completado' ? 'success' : estado === 'vencido' ? 'danger' : estado === 'proximo' ? 'warn' : 'info';
              const iconName = estado === 'completado' ? 'check' : estado === 'vencido' ? 'alert' : estado === 'proximo' ? 'clock' : 'gavel';
              return (
                <div className="evt-row" key={e.id}>
                  <div className={`evt-icon ${tone}`}><Icon name={iconName} size={14}/></div>
                  <div className="evt-body">
                    <div className="evt-title">{e.titulo}</div>
                    <div className="evt-sub">{e.tipo} · {c.titulo}</div>
                  </div>
                  <div className="evt-date">{fmtFechaCorta(e.fechaISO)}{e.hora ? ` · ${e.hora}` : ''}</div>
                  <EventStatePill state={estado}/>
                  <button
                    className="menu-btn"
                    onClick={() => dispatch({ type: 'EVENTO_TOGGLE', payload: { id: e.id } })}
                    title={e.completado ? 'Desmarcar' : 'Marcar completado'}
                  >
                    <Icon name={e.completado ? 'x' : 'check'} size={15}/>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="section-card">
            <div className="sc-head">
              <h4 className="sc-title">Tareas / próximos pasos</h4>
              <button className="btn btn-secondary btn-sm" onClick={() => onNew('tarea', c.id)}>
                <Icon name="plus" size={13}/> Crear tarea
              </button>
            </div>
            {tareas.length === 0 && (
              <div className="muted" style={{ fontSize: 13, padding: '8px 0' }}>
                No hay tareas asociadas. Sumá la primera.
              </div>
            )}
            {tareas.map((t) => {
              const estado = tareaEstado(t);
              return (
                <div className={`tk-row ${t.completada ? 'tk-completed' : ''}`} key={t.id}>
                  <div
                    className={`check ${t.completada ? 'checked' : ''}`}
                    onClick={() => dispatch({ type: 'TAREA_TOGGLE', payload: { id: t.id } })}
                  >
                    <Icon name="check" size={11}/>
                  </div>
                  <div className="tk-body">
                    <div className="tk-title">{t.titulo}</div>
                    <div className="tk-sub">Responsable: {t.responsable}</div>
                  </div>
                  <div className="tk-date">{fmtFechaCorta(t.fechaISO)}{t.hora ? ` · ${t.hora}` : ''}</div>
                  <TaskStatePill state={estado}/>
                  <Avatar name={t.responsable} idx={t.avatarIdx} size="sm"/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
