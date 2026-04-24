import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function ModalCreateCase({ onClose }) {
  const { dispatch } = useStore();
  const [form, setForm] = useState({
    caratulado: '', cliente: '', clienteRazon: '', fuero: '', tipo: '', estado: 'Activo', desc: '',
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.caratulado.trim()) return;
    dispatch({
      type: 'CASO_CREATE',
      payload: {
        caratulado: form.caratulado,
        titulo: form.caratulado,
        cliente: form.cliente,
        clienteRazon: form.clienteRazon,
        fuero: form.fuero || '—',
        tipo: form.tipo || 'Otro',
        estado: form.estado,
        desc: form.desc,
      },
    });
    onClose();
  };

  return (
    <Modal title="Crear caso" subtitle="Registrá un nuevo expediente para tu cartera" icon="briefcase" onClose={onClose} onSave={save} saveLabel="Crear caso">
      <div className="field">
        <label>Caratulado / Nombre del caso</label>
        <input value={form.caratulado} onChange={(e) => set('caratulado', e.target.value)} placeholder="Ej. Pérez, Juan c/ Empresa S.A. s/ Despido"/>
      </div>
      <div className="field-row">
        <div className="field"><label>Cliente</label><input value={form.cliente} onChange={(e) => set('cliente', e.target.value)} placeholder="Nombre del cliente"/></div>
        <div className="field"><label>Razón social / contraparte</label><input value={form.clienteRazon} onChange={(e) => set('clienteRazon', e.target.value)} placeholder="Empresa o persona"/></div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Fuero</label>
          <select value={form.fuero} onChange={(e) => set('fuero', e.target.value)}>
            <option value="" disabled>Seleccioná un fuero</option>
            <option>Civil</option><option>Comercial</option><option>Laboral</option>
            <option>Familia</option><option>Penal</option><option>Contencioso Adm.</option>
          </select>
        </div>
        <div className="field"><label>Tipo de caso</label><input value={form.tipo} onChange={(e) => set('tipo', e.target.value)} placeholder="Ej. Demanda laboral"/></div>
      </div>
      <div className="field">
        <label>Estado inicial</label>
        <div className="seg">
          {['Activo','En proceso','Cerrado'].map((s) => (
            <button key={s} className={form.estado === s ? 'active' : ''} onClick={() => set('estado', s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Descripción (opcional)</label>
        <textarea value={form.desc} onChange={(e) => set('desc', e.target.value)} placeholder="Resumen del caso, partes, hechos relevantes…"/>
      </div>
    </Modal>
  );
}
