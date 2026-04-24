import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { TaskStatePill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { tareaEstado, fmtFechaCorta } from '../store/selectors.js';

export default function PageTasks({ onCase, onNew }) {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('todas');
  const findCaso = (id) => state.casos.find((c) => c.id === id);

  const all = state.tareas.map((t) => ({ ...t, estadoCalc: tareaEstado(t) }));
  const counts = {
    todas: all.length,
    atrasada: all.filter((t) => t.estadoCalc === 'atrasada').length,
    proxima: all.filter((t) => t.estadoCalc === 'proxima').length,
    pendiente: all.filter((t) => t.estadoCalc === 'pendiente').length,
    completada: all.filter((t) => t.estadoCalc === 'completada').length,
  };
  const list = tab === 'todas' ? all : all.filter((t) => t.estadoCalc === tab);
  const tabs = [
    { id: 'todas', label: 'Todas' },
    { id: 'atrasada', label: 'Atrasadas' },
    { id: 'proxima', label: 'Próximas' },
    { id: 'pendiente', label: 'Pendientes' },
    { id: 'completada', label: 'Completadas' },
  ];

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Tareas</h1>
          <p className="page-subtitle">Próximos pasos y entregables de tu cartera</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="filter" size={14}/> Filtros</button>
          <button className="btn btn-primary" onClick={() => onNew('tarea')}>
            <Icon name="plus" size={15}/> Nueva tarea
          </button>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          {tabs.map((t) => (
            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label} <span className="tab-count">{counts[t.id]}</span>
            </button>
          ))}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Tarea</th>
              <th>Caso</th>
              <th>Responsable</th>
              <th>Fecha límite</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => {
              const caso = findCaso(t.casoId);
              return (
                <tr key={t.id} className="row-link" onClick={() => onCase(t.casoId)}>
                  <td style={{ width: 40 }}>
                    <div
                      className={`check ${t.completada ? 'checked' : ''}`}
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TAREA_TOGGLE', payload: { id: t.id } }); }}
                    >
                      <Icon name="check" size={11}/>
                    </div>
                  </td>
                  <td>
                    <div style={{ textDecoration: t.completada ? 'line-through' : 'none', color: t.completada ? 'var(--c-text-3)' : 'var(--c-text)', fontWeight: 500 }}>
                      {t.titulo}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{caso ? caso.titulo : t.casoId}</div>
                    <div className="muted mono" style={{ fontSize: 11.5 }}>{t.casoId}</div>
                  </td>
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <Avatar name={t.responsable} idx={t.avatarIdx} size="sm"/>
                      <span style={{ fontSize: 13 }}>{t.responsable}</span>
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: 13 }}>{fmtFechaCorta(t.fechaISO)}{t.hora ? ` · ${t.hora}` : ''}</td>
                  <td><TaskStatePill state={t.estadoCalc}/></td>
                  <td><button className="menu-btn"><Icon name="more" size={15}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
