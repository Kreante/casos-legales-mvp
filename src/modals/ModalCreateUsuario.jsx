import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreateUsuario({ onClose }) {
  const { state, dispatch } = useStore();
  const [f, setF] = useState({ nombre: '', email: '', rol: 'Abogado', equipo: '' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nombre.trim() || !f.email.trim()) return;
    dispatch({
      type: 'USUARIO_CREATE',
      payload: {
        ...f,
        equipo: f.equipo || (state.equipos[0]?.nombre ?? '—'),
        idx: Math.floor(Math.random() * 6) + 1,
        estado: 'Activo',
        ult: 'Recién invitado',
      },
    });
    onClose();
  };

  return (
    <Modal title="Invitar usuario" subtitle="Sumá un miembro al estudio" icon="user" onClose={onClose} onSave={save} saveLabel="Invitar">
      <div className="field-row">
        <div className="field"><label>Nombre</label><input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Nombre y apellido"/></div>
        <div className="field"><label>Email</label><input type="email" value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="email@estudio.legal"/></div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Rol</label>
          <select value={f.rol} onChange={(e) => set('rol', e.target.value)}>
            {['Admin','Abogado','Abogada','Paralegal','Asistente'].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Equipo</label>
          <select value={f.equipo} onChange={(e) => set('equipo', e.target.value)}>
            <option value="">— Sin equipo —</option>
            {state.equipos.map((eq) => <option key={eq.id} value={eq.nombre}>{eq.nombre}</option>)}
          </select>
        </div>
      </div>
    </Modal>
  );
}
