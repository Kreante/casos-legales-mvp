import Modal from './Modal.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { StatusPill, RiskPill } from '../components/Pills.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { casoRiesgo, tareaEstado } from '../store/selectors.js';

export default function ModalDetalleUsuario({ onClose, id, onCase }) {
  const { state, dispatch } = useStore();
  const u = state.usuarios.find((x) => x.id === id);
  if (!u) return null;

  const casosAsignados = state.casos.filter((c) => c.abogado === u.nombre);
  const tareasAsignadas = state.tareas.filter((t) => t.responsable === u.nombre && !t.completada);
  const tareasAtrasadas = tareasAsignadas.filter((t) => tareaEstado(t) === 'atrasada').length;

  const toggleEstado = () => dispatch({ type: 'USUARIO_TOGGLE_ESTADO', payload: { id } });
  const del = () => {
    if (window.confirm(`¿Eliminar usuario "${u.nombre}"?`)) {
      dispatch({ type: 'USUARIO_DELETE', payload: { id } });
      onClose();
    }
  };

  const footer = (
    <>
      <button className="btn btn-secondary" onClick={del}><Icon name="trash" size={14}/> Eliminar</button>
      <div style={{ flex: 1 }}/>
      <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
      <button className="btn btn-primary" onClick={toggleEstado}>
        {u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
      </button>
    </>
  );

  return (
    <Modal title={u.nombre} subtitle={u.email} icon="user" onClose={onClose} footer={footer} width={680}>
      <div className="row" style={{ gap: 14, alignItems: 'center', marginBottom: 18 }}>
        <Avatar name={u.nombre} idx={u.idx}/>
        <div className="row" style={{ gap: 8 }}>
          <span className={`pill ${u.rol === 'Admin' ? 'accent' : u.rol === 'Paralegal' ? 'info' : 'muted'}`}>
            <span className="pill-dot"/>{u.rol}
          </span>
          <span className={`pill ${u.estado === 'Activo' ? 'success' : 'muted'}`}>
            <span className="pill-dot"/>{u.estado}
          </span>
        </div>
      </div>

      <div className="kv-grid">
        <div><div className="kv-label">Email</div><div className="kv-value">{u.email}</div></div>
        <div><div className="kv-label">Equipo</div><div className="kv-value">{u.equipo}</div></div>
        <div><div className="kv-label">Última actividad</div><div className="kv-value">{u.ult}</div></div>
        <div><div className="kv-label">Casos asignados</div><div className="kv-value">{casosAsignados.length}</div></div>
        <div><div className="kv-label">Tareas activas</div><div className="kv-value">{tareasAsignadas.length}</div></div>
        <div>
          <div className="kv-label">Atrasadas</div>
          <div className="kv-value" style={{ color: tareasAtrasadas > 0 ? 'var(--c-danger-text)' : undefined }}>
            {tareasAtrasadas}
          </div>
        </div>
      </div>

      <div className="section-card" style={{ borderBottom: 'none', marginTop: 18 }}>
        <div className="sc-head"><h4 className="sc-title">Casos asignados · {casosAsignados.length}</h4></div>
        {casosAsignados.length === 0 && (
          <div className="muted" style={{ padding: 12, fontSize: 13 }}>Sin casos asignados.</div>
        )}
        {casosAsignados.map((c) => (
          <div
            key={c.id}
            className="between"
            style={{ padding: '10px 0', borderTop: '1px solid var(--c-divider)', cursor: 'pointer' }}
            onClick={() => { onClose(); onCase?.(c.id); }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{c.titulo}</div>
              <div className="muted mono" style={{ fontSize: 11.5 }}>{c.id}</div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <StatusPill value={c.estado}/>
              <RiskPill level={casoRiesgo(c.id, state.eventos, state.tareas)}/>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
