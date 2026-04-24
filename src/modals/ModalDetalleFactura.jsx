import Modal from './Modal.jsx';
import Icon from '../components/Icon.jsx';
import { useStore } from '../store/StoreContext.jsx';

const tone = (e) => (e === 'Pagada' ? 'success' : e === 'Vencida' ? 'danger' : 'info');

export default function ModalDetalleFactura({ onClose, id }) {
  const { state, dispatch } = useStore();
  const f = state.facturas.find((x) => x.id === id);
  if (!f) return null;

  const markPaid = () => dispatch({ type: 'FACTURA_MARK_PAID', payload: { id } });
  const del = () => {
    if (window.confirm(`¿Eliminar factura ${id}?`)) { dispatch({ type: 'FACTURA_DELETE', payload: { id } }); onClose(); }
  };

  const footer = (
    <>
      <button className="btn btn-secondary" onClick={del}><Icon name="trash" size={14}/> Eliminar</button>
      <div style={{ flex: 1 }}/>
      <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
      {f.estado !== 'Pagada' && (
        <button className="btn btn-primary" onClick={markPaid}><Icon name="check" size={14}/> Marcar pagada</button>
      )}
    </>
  );

  return (
    <Modal title={`Factura ${f.id}`} subtitle={f.cliente} icon="dollar" onClose={onClose} footer={footer} width={640}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0 18px' }}>
        <div>
          <div className="kv-label">Monto</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>{f.monto}</div>
        </div>
        <span className={`pill ${tone(f.estado)}`}><span className="pill-dot"/>{f.estado}</span>
      </div>

      <div className="kv-grid">
        <div><div className="kv-label">Cliente</div><div className="kv-value">{f.cliente}</div></div>
        <div><div className="kv-label">Número</div><div className="kv-value mono">{f.id}</div></div>
        <div><div className="kv-label">Fecha de emisión</div><div className="kv-value">{f.fecha}</div></div>
        <div><div className="kv-label">Vencimiento</div><div className="kv-value">{f.vto}</div></div>
      </div>

      <div className="section-card" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 18 }}>
        <div className="sc-head"><h4 className="sc-title">Detalle</h4></div>
        <table className="table" style={{ boxShadow: 'none' }}>
          <thead>
            <tr><th>Concepto</th><th style={{ textAlign: 'right' }}>Importe</th></tr>
          </thead>
          <tbody>
            <tr><td>Honorarios profesionales</td><td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{f.monto}</td></tr>
            <tr><td className="muted">IVA 21% (incluido)</td><td className="muted" style={{ textAlign: 'right' }}>—</td></tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
