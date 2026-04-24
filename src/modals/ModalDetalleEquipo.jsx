import { useState } from 'react';
import Modal from './Modal.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { StatusPill, RiskPill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { casoRiesgo } from '../store/selectors.js';

export default function ModalDetalleEquipo({ onClose, id, initialTab }) {
  const { state } = useStore();
  const eq = state.equipos.find((x) => x.id === id);
  const [tab, setTab] = useState(initialTab || 'miembros');
  if (!eq) return null;

  const miembros = state.usuarios.filter((u) => u.equipo === eq.nombre);
  const casos = state.casos.filter((c) => miembros.some((m) => m.nombre === c.abogado));

  return (
    <Modal title={eq.nombre} subtitle={`${eq.miembros} miembros · ${eq.casos} casos · Líder: ${eq.lider}`} icon="users" onClose={onClose} width={720}>
      <div className="detail-tabs" style={{ marginBottom: 14 }}>
        <button className={`tab ${tab === 'miembros' ? 'active' : ''}`} onClick={() => setTab('miembros')}>
          Miembros · {miembros.length}
        </button>
        <button className={`tab ${tab === 'casos' ? 'active' : ''}`} onClick={() => setTab('casos')}>
          Casos asignados · {casos.length}
        </button>
      </div>

      {tab === 'miembros' && (
        <>
          {miembros.length === 0 && (
            <div className="muted" style={{ padding: 18, fontSize: 13, textAlign: 'center' }}>
              Este equipo aún no tiene miembros vinculados. Agregalos desde Usuarios asignándoles este equipo.
            </div>
          )}
          {miembros.map((u) => (
            <div
              key={u.id}
              className="between"
              style={{ padding: '12px 0', borderTop: '1px solid var(--c-divider)' }}
            >
              <div className="row" style={{ gap: 10 }}>
                <Avatar name={u.nombre} idx={u.idx}/>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{u.nombre}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{u.email}</div>
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <span className={`pill ${u.rol === 'Admin' ? 'accent' : u.rol === 'Paralegal' ? 'info' : 'muted'}`}>
                  <span className="pill-dot"/>{u.rol}
                </span>
                <span className={`pill ${u.estado === 'Activo' ? 'success' : 'muted'}`}>
                  <span className="pill-dot"/>{u.estado}
                </span>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'casos' && (
        <>
          {casos.length === 0 && (
            <div className="muted" style={{ padding: 18, fontSize: 13, textAlign: 'center' }}>
              No hay casos asignados a miembros de este equipo.
            </div>
          )}
          {casos.map((c) => (
            <div
              key={c.id}
              className="between"
              style={{ padding: '12px 0', borderTop: '1px solid var(--c-divider)', gap: 12 }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.titulo}</div>
                <div className="muted mono" style={{ fontSize: 11.5 }}>{c.id}</div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Avatar name={c.abogado} idx={c.avatarIdx} size="sm"/>
                <StatusPill value={c.estado}/>
                <RiskPill level={casoRiesgo(c.id, state.eventos, state.tareas)}/>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="muted" style={{ fontSize: 12, marginTop: 16, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="help" size={13}/>
        Carga de trabajo aproximada: {Math.min(100, eq.casos * 5)}%
      </div>
    </Modal>
  );
}
