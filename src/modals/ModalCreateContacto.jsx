import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreateContacto({ onClose }) {
  const { dispatch } = useStore();
  const [f, setF] = useState({ nombre: '', tipo: 'Cliente', empresa: '', email: '', tel: '' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nombre.trim()) return;
    dispatch({ type: 'CONTACTO_CREATE', payload: { ...f, idx: Math.floor(Math.random() * 6) + 1 } });
    onClose();
  };

  return (
    <Modal title="Nuevo contacto" subtitle="Clientes, contrapartes o peritos" icon="users" onClose={onClose} onSave={save} saveLabel="Crear contacto">
      <div className="field"><label>Nombre</label><input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Juan Pérez"/></div>
      <div className="field">
        <label>Tipo</label>
        <div className="seg">
          {['Cliente','Contraparte','Perito'].map((s) => (
            <button key={s} className={f.tipo === s ? 'active' : ''} onClick={() => set('tipo', s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Empresa</label><input value={f.empresa} onChange={(e) => set('empresa', e.target.value)} placeholder="Razón social"/></div>
        <div className="field"><label>Email</label><input type="email" value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="email@dominio.com"/></div>
      </div>
      <div className="field"><label>Teléfono</label><input value={f.tel} onChange={(e) => set('tel', e.target.value)} placeholder="+54 11 0000-0000"/></div>
    </Modal>
  );
}
