import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

function combineISO(date, time) {
  if (!date) return new Date().toISOString();
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = (time || '09:00').split(':').map(Number);
  return new Date(y, m - 1, d, hh || 9, mm || 0).toISOString();
}

export default function ModalCreateEvent({ onClose, casoId }) {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState({
    tipo: 'Audiencia', casoId: casoId || '', date: '', time: '', titulo: '', desc: '',
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.titulo.trim() || !form.casoId || !form.date) return;
    dispatch({
      type: 'EVENTO_CREATE',
      payload: {
        tipo: form.tipo,
        titulo: form.titulo,
        casoId: form.casoId,
        fechaISO: combineISO(form.date, form.time),
        hora: form.time || null,
      },
    });
    onClose();
  };

  return (
    <Modal title="Crear evento o plazo" subtitle="Registrá una fecha crítica del caso" icon="calendar" onClose={onClose} onSave={save} saveLabel="Crear evento">
      <div className="field">
        <label>Tipo</label>
        <div className="seg">
          {['Audiencia','Plazo','Otro'].map((s) => (
            <button key={s} className={form.tipo === s ? 'active' : ''} onClick={() => set('tipo', s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Título</label>
        <input value={form.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Ej. Audiencia de prueba"/>
      </div>
      <div className="field">
        <label>Caso asociado</label>
        <select value={form.casoId} onChange={(e) => set('casoId', e.target.value)}>
          <option value="" disabled>Seleccioná un caso</option>
          {state.casos.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.titulo}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Fecha</label><input type="date" value={form.date} onChange={(e) => set('date', e.target.value)}/></div>
        <div className="field"><label>Hora</label><input type="time" value={form.time} onChange={(e) => set('time', e.target.value)}/></div>
      </div>
      <div className="field">
        <label>Descripción</label>
        <textarea value={form.desc} onChange={(e) => set('desc', e.target.value)} placeholder="Detalle del evento, ubicación, número de sala…"/>
      </div>
    </Modal>
  );
}
