import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PageUsuarios({ onNew }) {
  const { state, dispatch } = useStore();
  const del = (id, nombre) => {
    if (window.confirm(`¿Eliminar usuario "${nombre}"?`)) dispatch({ type: 'USUARIO_DELETE', payload: { id } });
  };
  const openDetail = (id) => onNew('detalle-usuario', { id });

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Usuarios</h1>
          <p className="page-subtitle">Gestión de cuentas, roles y permisos del estudio</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => onNew('usuario')}>
            <Icon name="mail" size={14}/> Invitar
          </button>
          <button className="btn btn-primary" onClick={() => onNew('usuario')}>
            <Icon name="plus" size={15}/> Nuevo usuario
          </button>
        </div>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Usuario</th><th>Rol</th><th>Equipo</th><th>Estado</th><th>Última actividad</th><th></th>
            </tr>
          </thead>
          <tbody>
            {state.usuarios.map((u) => (
              <tr key={u.id} className="row-link" onClick={() => openDetail(u.id)}>
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <Avatar name={u.nombre} idx={u.idx}/>
                    <div>
                      <div className="case-title">{u.nombre}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`pill ${u.rol === 'Admin' ? 'accent' : u.rol === 'Paralegal' ? 'info' : 'muted'}`}>
                    <span className="pill-dot"/>{u.rol}
                  </span>
                </td>
                <td>{u.equipo}</td>
                <td>
                  <span className={`pill ${u.estado === 'Activo' ? 'success' : 'muted'}`}>
                    <span className="pill-dot"/>{u.estado}
                  </span>
                </td>
                <td className="muted" style={{ fontSize: 12.5 }}>{u.ult}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                    <RowMenu
                      items={[
                        { label: 'Ver perfil', icon: 'user', onClick: () => openDetail(u.id) },
                        {
                          label: u.estado === 'Activo' ? 'Desactivar' : 'Activar',
                          icon: 'check',
                          onClick: () => dispatch({ type: 'USUARIO_TOGGLE_ESTADO', payload: { id: u.id } }),
                        },
                        { label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(u.id, u.nombre) },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {state.usuarios.length === 0 && (
              <tr><td colSpan={6} className="muted" style={{ padding: 24, textAlign: 'center' }}>Sin usuarios.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
