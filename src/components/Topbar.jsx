import Icon from './Icon.jsx';

export default function Topbar({ onCollapse, onNew }) {
  return (
    <div className="topbar">
      <button className="tb-collapse" onClick={onCollapse} title="Contraer barra lateral">
        <Icon name="panel" size={17}/>
      </button>
      <div className="tb-search">
        <Icon name="search" size={16} className="tb-search-icon"/>
        <input placeholder="Buscar casos, clientes, expedientes…"/>
        <span className="tb-kbd">⌘K</span>
      </div>
      <div className="tb-spacer"/>
      <div className="tb-actions">
        <button className="tb-icon-btn" title="Notificaciones">
          <Icon name="bell" size={17}/>
          <span className="dot-badge"/>
        </button>
        <button className="tb-icon-btn" title="Mensajes"><Icon name="msg" size={17}/></button>
        <button className="tb-icon-btn" title="Ayuda"><Icon name="help" size={17}/></button>
        <button className="btn btn-primary" onClick={() => onNew('caso')}>
          <Icon name="plus" size={15}/> Nuevo caso
        </button>
      </div>
    </div>
  );
}
