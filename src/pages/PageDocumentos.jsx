import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { DOCUMENTOS } from './mockExtra.js';

export default function PageDocumentos({ onCase }) {
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');
  const tipos = ['Demanda','Contrato','Pericia','Escrito','Poder','Notificación'];

  const list = DOCUMENTOS.filter((d) => {
    if (tab !== 'todos' && d.tipo.toLowerCase() !== tab) return false;
    if (q && !(`${d.nombre} ${d.caso}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Documentos</h1>
          <p className="page-subtitle">Repositorio centralizado de escritos, contratos y piezas digitales</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="upload" size={14}/> Subir documento</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nuevo desde plantilla</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Total documentos', v: '342', i: 'doc',  c: 'navy' },
          { l: 'Firmados este mes', v: '32', i: 'check-square', c: 'green' },
          { l: 'Pendientes de firma', v: '8',  i: 'clock', c: 'amber' },
          { l: 'Subidos hoy', v: '6', i: 'upload', c: 'blue' },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-value">{s.v}</div>
            </div>
            <div className={`stat-icon ${s.c}`}><Icon name={s.i} size={18}/></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="filter-input">
            <Icon name="search" size={14}/>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o caso…"/>
          </div>
          <button className="btn btn-secondary btn-sm">Caso <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Autor <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Fecha <Icon name="chevron-down" size={12}/></button>
          <div style={{ flex: 1 }}/>
          <span className="muted" style={{ fontSize: 12.5 }}>{list.length} de {DOCUMENTOS.length}</span>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'todos' ? 'active' : ''}`} onClick={() => setTab('todos')}>
            Todos <span className="tab-count">{DOCUMENTOS.length}</span>
          </button>
          {tipos.map((t) => {
            const id = t.toLowerCase();
            const n = DOCUMENTOS.filter((d) => d.tipo === t).length;
            return (
              <button key={id} className={`tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
                {t} <span className="tab-count">{n}</span>
              </button>
            );
          })}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Caso</th>
              <th>Autor</th>
              <th>Tamaño</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
              <tr key={d.id} className="row-link" onClick={() => onCase(d.casoId)}>
                <td>
                  <div className="case-cell">
                    <div className="file-icon">
                      <Icon name={d.nombre.endsWith('.docx') ? 'doc' : 'file'} size={16}/>
                    </div>
                    <div>
                      <div className="case-title">{d.nombre}</div>
                      <div className="muted mono" style={{ fontSize: 11.5 }}>{d.casoId}</div>
                    </div>
                  </div>
                </td>
                <td><span className="pill muted"><span className="pill-dot"/>{d.tipo}</span></td>
                <td style={{ fontSize: 13 }}>{d.caso}</td>
                <td>
                  <div className="row" style={{ gap: 8 }}>
                    <Avatar name={d.autor} idx={d.idx} size="sm"/>
                    <span style={{ fontSize: 13 }}>{d.autor}</span>
                  </div>
                </td>
                <td className="mono muted" style={{ fontSize: 12.5 }}>{d.tamano}</td>
                <td className="muted" style={{ fontSize: 13 }}>{d.fecha}</td>
                <td>
                  {d.firmado
                    ? <span className="pill success"><span className="pill-dot"/>Firmado</span>
                    : <span className="pill warn"><span className="pill-dot"/>Pendiente</span>}
                </td>
                <td>
                  <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                    <button className="menu-btn" title="Descargar" onClick={(e) => e.stopPropagation()}>
                      <Icon name="download" size={14}/>
                    </button>
                    <button className="menu-btn" onClick={(e) => e.stopPropagation()}>
                      <Icon name="more" size={15}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
