import { useState, useMemo } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { RiskPill, StatusPill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { casoRiesgo, fmtFechaHora } from '../store/selectors.js';

export default function PageCases({ onCase, onNew }) {
  const { state } = useStore();
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');
  const { casos, eventos, tareas } = state;

  const list = useMemo(() => {
    return [...casos]
      .sort((a, b) => new Date(b.ultActuISO) - new Date(a.ultActuISO))
      .filter((c) => {
        if (tab === 'activos' && c.estado === 'Cerrado') return false;
        if (tab === 'cerrados' && c.estado !== 'Cerrado') return false;
        if (q && !(`${c.titulo} ${c.cliente} ${c.id}`.toLowerCase().includes(q.toLowerCase()))) return false;
        return true;
      });
  }, [casos, tab, q]);

  const counts = {
    todos: casos.length,
    activos: casos.filter((c) => c.estado !== 'Cerrado').length,
    cerrados: casos.filter((c) => c.estado === 'Cerrado').length,
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Casos</h1>
          <p className="page-subtitle">Gestión completa de tus expedientes y carpetas</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="filter" size={14}/> Filtros</button>
          <button className="btn btn-primary" onClick={() => onNew('caso')}>
            <Icon name="plus" size={15}/> Nuevo caso
          </button>
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="filter-input">
            <Icon name="search" size={14}/>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre, cliente o expediente…"/>
          </div>
          <button className="btn btn-secondary btn-sm"><Icon name="filter" size={13}/> Fuero <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Estado <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Riesgo <Icon name="chevron-down" size={12}/></button>
          <div style={{ flex: 1 }}/>
          <span className="muted" style={{ fontSize: 12.5 }}>Mostrando {list.length} de {casos.length}</span>
        </div>

        <div className="tabs">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'activos', label: 'Activos' },
            { id: 'cerrados', label: 'Cerrados' },
          ].map((t) => (
            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label} <span className="tab-count">{counts[t.id]}</span>
            </button>
          ))}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Caso</th>
              <th>Cliente</th>
              <th>Fuero</th>
              <th>Estado</th>
              <th>Riesgo</th>
              <th>Abogado</th>
              <th>Última actualización</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
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
                <td className="muted" style={{ fontSize: 13 }}>{c.fuero}</td>
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
  );
}
