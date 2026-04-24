import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

function combineISO(date) {
  if (!date) return new Date().toISOString();
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d, 18, 0).toISOString();
}

export default function ModalCreateTask({ onClose, casoId }) {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState({
    titulo: '', casoId: casoId || '', responsable: '', date: '', notas: '',
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.titulo.trim() || !form.casoId || !form.date) return;
    dispatch({
      type: 'TAREA_CREATE',
      payload: {
        titulo: form.titulo,
        casoId: form.casoId,
        responsable: form.responsable || 'Sin asignar',
        fechaISO: combineISO(form.date),
        notas: form.notas,
      },
    });
    onClose();
  };

  return (
    <Modal title="Crear tarea" subtitle="Definí un próximo paso para el caso" icon="check-square" onClose={onClose} onSave={save} saveLabel="Crear tarea">
      <div className="field">
        <label>Título</label>
        <input value={form.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Ej. Revisar contestación de demanda"/>
      </div>
      <div className="field">
        <label>Caso asociado</label>
        <select value={form.casoId} onChange={(e) => set('casoId', e.target.value)}>
          <option value="" disabled>Seleccioná un caso</option>
          {state.casos.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.titulo}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Responsable</label><input value={form.responsable} onChange={(e) => set('responsable', e.target.value)} placeholder="Nombre del abogado o equipo"/></div>
        <div className="field"><label>Fecha límite</label><input type="date" value={form.date} onChange={(e) => set('date', e.target.value)}/></div>
      </div>
      <div className="field">
        <label>Notas (opcional)</label>
        <textarea value={form.notas} onChange={(e) => set('notas', e.target.value)} placeholder="Detalles, enlaces, contexto…"/>
      </div>
    </Modal>
  );
}
