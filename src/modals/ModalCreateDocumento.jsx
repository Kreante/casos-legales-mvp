import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreateDocumento({ onClose }) {
  const { state, dispatch } = useStore();
  const [f, setF] = useState({ nombre: '', tipo: 'Demanda', casoId: '', autor: 'Ana Martínez', tamano: '' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.nombre.trim() || !f.casoId) return;
    dispatch({ type: 'DOCUMENTO_CREATE', payload: { ...f, idx: 1, firmado: false } });
    onClose();
  };

  return (
    <Modal title="Nuevo documento" subtitle="Subí o registrá un documento del estudio" icon="doc" onClose={onClose} onSave={save} saveLabel="Crear documento">
      <div className="field"><label>Nombre del archivo</label><input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Demanda laboral.pdf"/></div>
      <div className="field-row">
        <div className="field">
          <label>Tipo</label>
          <select value={f.tipo} onChange={(e) => set('tipo', e.target.value)}>
            {['Demanda','Contrato','Pericia','Escrito','Poder','Notificación'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field"><label>Tamaño</label><input value={f.tamano} onChange={(e) => set('tamano', e.target.value)} placeholder="Ej. 1.2 MB"/></div>
      </div>
      <div className="field">
        <label>Caso asociado</label>
        <select value={f.casoId} onChange={(e) => set('casoId', e.target.value)}>
          <option value="" disabled>Seleccioná un caso</option>
          {state.casos.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.titulo}</option>)}
        </select>
      </div>
      <div className="field"><label>Autor</label><input value={f.autor} onChange={(e) => set('autor', e.target.value)}/></div>
    </Modal>
  );
}
