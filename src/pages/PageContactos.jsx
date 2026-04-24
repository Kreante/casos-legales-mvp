import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { CONTACTOS } from './mockExtra.js';

export default function PageContactos() {
  const [tab, setTab] = useState('todos');
  const [q, setQ] = useState('');

  const list = CONTACTOS.filter((c) => {
    if (tab !== 'todos' && c.tipo.toLowerCase() !== tab) return false;
    if (q && !(`${c.nombre} ${c.empresa} ${c.email}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
  const counts = {
    todos: CONTACTOS.length,
    cliente: CONTACTOS.filter((c) => c.tipo === 'Cliente').length,
    contraparte: CONTACTOS.filter((c) => c.tipo === 'Contraparte').length,
    perito: CONTACTOS.filter((c) => c.tipo === 'Perito').length,
  };
  const tabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'cliente', label: 'Clientes' },
    { id: 'contraparte', label: 'Contrapartes' },
    { id: 'perito', label: 'Peritos' },
  ];

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Contactos</h1>
          <p className="page-subtitle">Clientes, contrapartes y peritos vinculados a tus casos</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="upload" size={14}/> Importar</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nuevo contacto</button>
        </div>
      </div>
      <div className="card">
        <div className="filter-bar">
          <div className="filter-input">
            <Icon name="search" size={14}/>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar contactos…"/>
          </div>
          <button className="btn btn-secondary btn-sm">Tipo <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Empresa <Icon name="chevron-down" size={12}/></button>
          <div style={{ flex: 1 }}/>
          <span className="muted" style={{ fontSize: 12.5 }}>{list.length} de {CONTACTOS.length}</span>
        </div>
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
              <th>Contacto</th>
              <th>Tipo</th>
              <th>Empresa</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th style={{ textAlign: 'right' }}>Casos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="row-link">
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <Avatar name={c.nombre} idx={c.idx}/>
                    <div className="case-title">{c.nombre}</div>
                  </div>
                </td>
                <td>
                  <span className={`pill ${c.tipo === 'Cliente' ? 'accent' : c.tipo === 'Contraparte' ? 'danger' : 'info'}`}>
                    <span className="pill-dot"/>{c.tipo}
                  </span>
                </td>
                <td>{c.empresa}</td>
                <td className="muted" style={{ fontSize: 13 }}>{c.email}</td>
                <td className="mono" style={{ fontSize: 12.5 }}>{c.tel}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{c.casos}</td>
                <td>
                  <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                    <button className="menu-btn" title="Llamar"><Icon name="phone" size={14}/></button>
                    <button className="menu-btn" title="Email"><Icon name="mail" size={14}/></button>
                    <button className="menu-btn"><Icon name="more" size={15}/></button>
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
