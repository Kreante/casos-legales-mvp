import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

const M = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
function fmtDate(d) { return `${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`; }

export default function ModalCreateRecordatorio({ onClose }) {
  const { state, dispatch } = useStore();
  const [f, setF] = useState({ titulo: '', tipo: 'Administrativo', casoId: '', fecha: '', hora: '09:00', kind: 'info' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.titulo.trim() || !f.fecha) return;
    const [y, m, d] = f.fecha.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    dispatch({
      type: 'RECORDATORIO_CREATE',
      payload: {
        titulo: f.titulo,
        tipo: f.tipo,
        casoId: f.casoId || null,
        fecha: fmtDate(date),
        hora: f.hora,
        kind: f.kind,
        leido: false,
      },
    });
    onClose();
  };

  return (
    <Modal title="Nuevo recordatorio" subtitle="Avisos personales y de equipo" icon="bell" onClose={onClose} onSave={save} saveLabel="Crear recordatorio">
      <div className="field"><label>Título</label><input value={f.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Ej. Llamar al cliente"/></div>
      <div className="field-row">
        <div className="field">
          <label>Tipo</label>
          <select value={f.tipo} onChange={(e) => set('tipo', e.target.value)}>
            {['Administrativo','Llamada','Reunión','Plazo'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Prioridad</label>
          <div className="seg">
            {[['info','Normal'],['warn','Próximo'],['danger','Urgente']].map(([k, l]) => (
              <button key={k} className={f.kind === k ? 'active' : ''} onClick={() => set('kind', k)}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="field">
        <label>Caso asociado (opcional)</label>
        <select value={f.casoId} onChange={(e) => set('casoId', e.target.value)}>
          <option value="">Ninguno</option>
          {state.casos.map((c) => <option key={c.id} value={c.id}>{c.titulo}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Fecha</label><input type="date" value={f.fecha} onChange={(e) => set('fecha', e.target.value)}/></div>
        <div className="field"><label>Hora</label><input type="time" value={f.hora} onChange={(e) => set('hora', e.target.value)}/></div>
      </div>
    </Modal>
  );
}
