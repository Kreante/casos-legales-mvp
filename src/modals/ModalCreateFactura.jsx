import { useState } from 'react';
import Modal from './Modal.jsx';
import { useStore } from '../store/StoreContext.jsx';

function fmt(d) {
  const m = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ModalCreateFactura({ onClose }) {
  const { state, dispatch } = useStore();
  const nextNumero = () => {
    const existing = state.facturas
      .map((f) => parseInt((f.id.match(/(\d{4})$/) || [])[1], 10))
      .filter((n) => Number.isFinite(n));
    const max = existing.length ? Math.max(...existing) : 214;
    return `F-${new Date().getFullYear()}-${String(max + 1).padStart(4, '0')}`;
  };
  const today = new Date();
  const vto = new Date(Date.now() + 30 * 86400000);
  const [f, setF] = useState({
    id: nextNumero(), cliente: '', monto: '',
    fecha: fmt(today), vto: fmt(vto),
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!f.cliente.trim() || !f.monto.trim()) return;
    dispatch({ type: 'FACTURA_CREATE', payload: { ...f, estado: 'Emitida' } });
    onClose();
  };

  return (
    <Modal title="Nueva factura" subtitle="Honorarios, anticipos o gastos" icon="dollar" onClose={onClose} onSave={save} saveLabel="Crear factura">
      <div className="field-row">
        <div className="field"><label>Número</label><input className="mono" value={f.id} onChange={(e) => set('id', e.target.value)}/></div>
        <div className="field"><label>Monto</label><input value={f.monto} onChange={(e) => set('monto', e.target.value)} placeholder="$ 0.00"/></div>
      </div>
      <div className="field">
        <label>Cliente</label>
        <select value={f.cliente} onChange={(e) => set('cliente', e.target.value)}>
          <option value="" disabled>Seleccioná un cliente</option>
          {state.contactos.filter((c) => c.tipo === 'Cliente').map((c) => <option key={c.id} value={c.empresa || c.nombre}>{c.empresa || c.nombre}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Fecha emisión</label><input value={f.fecha} onChange={(e) => set('fecha', e.target.value)}/></div>
        <div className="field"><label>Vencimiento</label><input value={f.vto} onChange={(e) => set('vto', e.target.value)}/></div>
      </div>
    </Modal>
  );
}
