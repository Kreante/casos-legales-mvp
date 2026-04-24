import Icon from '../components/Icon.jsx';

export default function Modal({ title, subtitle, icon, children, onClose, onSave, saveLabel = 'Crear' }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            {icon && <div className="modal-icon"><Icon name={icon} size={20}/></div>}
            <h3 className="modal-title">{title}</h3>
            <p className="modal-subtitle">{subtitle}</p>
          </div>
          <button className="menu-btn" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={onSave}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
}
