import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreateEquipo({ onClose }) {
  const { dispatch } = useStore();
  const [f, setF] = useState({ nombre: '', lider: '', miembros: 1 });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nombre.trim()) return;
    dispatch({
      type: 'EQUIPO_CREATE',
      payload: {
        nombre: f.nombre,
        lider: f.lider || 'Sin asignar',
        lid: Math.floor(Math.random() * 6) + 1,
        miembros: Number(f.miembros) || 1,
        casos: 0,
      },
    });
    onClose();
  };

  return (
    <Modal title="Nuevo equipo" subtitle="Área de práctica o grupo de trabajo" icon="users" onClose={onClose} onSave={save} saveLabel="Crear equipo">
      <div className="field"><label>Nombre del equipo</label><input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Penal Económico"/></div>
      <div className="field-row">
        <div className="field"><label>Líder</label><input value={f.lider} onChange={(e) => set('lider', e.target.value)} placeholder="Nombre del líder"/></div>
        <div className="field"><label>Miembros iniciales</label><input type="number" min="1" value={f.miembros} onChange={(e) => set('miembros', e.target.value)}/></div>
      </div>
    </Modal>
  );
}
