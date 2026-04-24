import Icon from './Icon.jsx';
import Avatar from './Avatar.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { tareaEstado, eventoEstado } from '../store/selectors.js';

export default function Sidebar({ current, onNav, user }) {
  const { state } = useStore();

  const casosActivos = state.casos.filter((c) => c.estado !== 'Cerrado').length;
  const tareasPend = state.tareas.filter((t) => !t.completada).length;
  const recordatorios =
    state.eventos.filter((e) => ['vencido','proximo'].includes(eventoEstado(e))).length +
    state.tareas.filter((t) => tareaEstado(t) === 'atrasada').length;

  const items = [
    { section: null, items: [{ id: 'home', label: 'Inicio', icon: 'home' }] },
    { section: 'Operativo', items: [
      { id: 'casos',      label: 'Casos',      icon: 'briefcase',    badge: String(casosActivos) },
      { id: 'tareas',     label: 'Tareas',     icon: 'check-square', badge: String(tareasPend) },
      { id: 'calendario', label: 'Calendario', icon: 'calendar' },
      { id: 'contactos',  label: 'Contactos',  icon: 'users' },
      { id: 'documentos', label: 'Documentos', icon: 'doc' },
      { id: 'alertas',    label: 'Alertas',    icon: 'bell',    badge: recordatorios > 0 ? String(recordatorios) : null },
    ]},
    { section: 'Gestión', items: [
      { id: 'reportes',     label: 'Reportes',      icon: 'chart' },
      { id: 'facturacion',  label: 'Facturación',   icon: 'dollar' },
      { id: 'plantillas',   label: 'Plantillas',    icon: 'doc' },
      { id: 'recordatorios',label: 'Recordatorios', icon: 'bell', badge: (() => { const n = state.recordatorios?.filter((r) => !r.leido).length || 0; return n > 0 ? String(n) : null; })() },
    ]},
    { section: 'Configuración', items: [
      { id: 'equipos',  label: 'Equipos',       icon: 'users' },
      { id: 'usuarios', label: 'Usuarios',      icon: 'user' },
      { id: 'config',   label: 'Configuración', icon: 'settings' },
    ]},
  ];

  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-logo"><Icon name="scale" size={20}/></div>
        <div className="sb-brand-text">
          <div className="sb-brand-name">Casos Legales</div>
          <div className="sb-brand-sub">Gestión integral</div>
        </div>
      </div>
      <nav className="sb-nav">
        {items.map((grp, gi) => (
          <div key={gi}>
            {grp.section && <div className="sb-section-label">{grp.section}</div>}
            {grp.items.map((it) => (
              <button
                key={it.id}
                className={`sb-item ${current === it.id ? 'active' : ''}`}
                onClick={() => onNav(it.id)}
              >
                <Icon name={it.icon} size={17} className="sb-icon"/>
                <span className="sb-item-label">{it.label}</span>
                {it.badge && <span className="sb-item-badge">{it.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-user">
        <Avatar name={user.name} idx={user.avatarIdx}/>
        <div className="sb-user-info">
          <div className="sb-user-name">{user.name}</div>
          <div className="sb-user-role">{user.role}</div>
        </div>
        <Icon name="chevron-down" size={14} className="sb-user-caret"/>
      </div>
    </aside>
  );
}
