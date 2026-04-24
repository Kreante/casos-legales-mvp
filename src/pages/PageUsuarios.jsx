import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';
import { USUARIOS } from './mockExtra.js';

export default function PageUsuarios() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Usuarios</h1>
          <p className="page-subtitle">Gestión de cuentas, roles y permisos del estudio</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="mail" size={14}/> Invitar</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nuevo usuario</button>
        </div>
      </div>
      <div className="card">
        <div className="filter-bar">
          <div className="filter-input">
            <Icon name="search" size={14}/>
            <input placeholder="Buscar usuarios…"/>
          </div>
          <button className="btn btn-secondary btn-sm">Rol <Icon name="chevron-down" size={12}/></button>
          <button className="btn btn-secondary btn-sm">Equipo <Icon name="chevron-down" size={12}/></button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Usuario</th><th>Rol</th><th>Equipo</th><th>Estado</th><th>Última actividad</th><th></th>
            </tr>
          </thead>
          <tbody>
            {USUARIOS.map((u) => (
              <tr key={u.id} className="row-link">
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
                <td>
                  <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                    <button className="menu-btn" title="Editar"><Icon name="pencil" size={14}/></button>
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
