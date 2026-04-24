import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PageDocumentos({ onCase, onNew }) {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');
  const tipos = ['Demanda','Contrato','Pericia','Escrito','Poder','Notificación'];

  const casoTitulo = (id) => state.casos.find((c) => c.id === id)?.titulo || id || '—';

  const list = state.documentos.filter((d) => {
    if (tab !== 'todos' && d.tipo.toLowerCase() !== tab) return false;
    const hay = `${d.nombre} ${casoTitulo(d.casoId)}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    return true;
  });

  const firmadosMes = state.documentos.filter((d) => d.firmado).length;
  const pendientes = state.documentos.filter((d) => !d.firmado).length;

  const del = (id, nombre) => {
    if (window.confirm(`¿Eliminar documento "${nombre}"?`)) dispatch({ type: 'DOCUMENTO_DELETE', payload: { id } });
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Documentos</h1>
          <p className="page-subtitle">Repositorio centralizado de escritos, contratos y piezas digitales</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => onNew('documento')}>
            <Icon name="upload" size={14}/> Subir documento
          </button>
          <button className="btn btn-primary" onClick={() => onNew('documento')}>
            <Icon name="plus" size={15}/> Nuevo desde plantilla
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Total documentos', v: String(state.documentos.length), i: 'doc',  c: 'navy' },
          { l: 'Firmados',          v: String(firmadosMes), i: 'check-square', c: 'green' },
          { l: 'Pendientes de firma', v: String(pendientes),  i: 'clock', c: 'amber' },
          { l: 'Último subido', v: state.documentos[0]?.fecha || '—', i: 'upload', c: 'blue' },
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
          <div style={{ flex: 1 }}/>
          <span className="muted" style={{ fontSize: 12.5 }}>{list.length} de {state.documentos.length}</span>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'todos' ? 'active' : ''}`} onClick={() => setTab('todos')}>
            Todos <span className="tab-count">{state.documentos.length}</span>
          </button>
          {tipos.map((t) => {
            const id = t.toLowerCase();
            const n = state.documentos.filter((d) => d.tipo === t).length;
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
              <th>Documento</th><th>Tipo</th><th>Caso</th><th>Autor</th>
              <th>Tamaño</th><th>Fecha</th><th>Estado</th><th></th>
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
                <td style={{ fontSize: 13 }}>{casoTitulo(d.casoId)}</td>
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
                    <RowMenu
                      items={[
                        {
                          label: d.firmado ? 'Marcar como pendiente' : 'Marcar como firmado',
                          icon: 'check',
                          onClick: () => dispatch({ type: 'DOCUMENTO_TOGGLE_FIRMA', payload: { id: d.id } }),
                        },
                        { label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(d.id, d.nombre) },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={8} className="muted" style={{ padding: 24, textAlign: 'center' }}>Sin documentos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
