import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreatePlantilla({ onClose }) {
  const { dispatch } = useStore();
  const [f, setF] = useState({ nombre: '', cat: 'General' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nombre.trim()) return;
    dispatch({ type: 'PLANTILLA_CREATE', payload: { ...f } });
    onClose();
  };

  return (
    <Modal title="Nueva plantilla" subtitle="Modelo reutilizable para escritos" icon="doc" onClose={onClose} onSave={save} saveLabel="Crear plantilla">
      <div className="field"><label>Nombre</label><input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Demanda laboral por despido"/></div>
      <div className="field">
        <label>Categoría</label>
        <div className="seg" style={{ flexWrap: 'wrap' }}>
          {['Laboral','Comercial','Civil','Familia','General'].map((c) => (
            <button key={c} className={f.cat === c ? 'active' : ''} onClick={() => set('cat', c)}>{c}</button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
