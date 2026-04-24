import Icon from '../components/Icon.jsx';
import RowMenu from '../components/RowMenu.jsx';
import { useStore } from '../store/StoreContext.jsx';

const tone = (e) => (e === 'Pagada' ? 'success' : e === 'Vencida' ? 'danger' : 'info');

// Parsea strings tipo "$ 285.000" a número aproximado
function parseMonto(s) {
  if (!s) return 0;
  const num = String(s).replace(/[^0-9.,-]/g, '').replace(/\./g, '').replace(',', '.');
  return parseFloat(num) || 0;
}
function fmtMoney(n) {
  if (n >= 1_000_000) return `$ ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$ ${Math.round(n / 1_000)}K`;
  return `$ ${n.toFixed(0)}`;
}

export default function PageFacturacion({ onNew }) {
  const { state, dispatch } = useStore();
  const { facturas } = state;

  const totales = facturas.reduce((acc, f) => {
    const m = parseMonto(f.monto);
    acc.total += m;
    if (f.estado === 'Pagada') acc.cobrado += m;
    else if (f.estado === 'Vencida') acc.vencido += m;
    else acc.pendiente += m;
    return acc;
  }, { total: 0, cobrado: 0, pendiente: 0, vencido: 0 });

  const del = (id) => {
    if (window.confirm(`¿Eliminar factura ${id}?`)) dispatch({ type: 'FACTURA_DELETE', payload: { id } });
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Facturación</h1>
          <p className="page-subtitle">Honorarios emitidos, cobros y vencimientos</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar</button>
          <button className="btn btn-primary" onClick={() => onNew('factura')}>
            <Icon name="plus" size={15}/> Nueva factura
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Facturado',        v: fmtMoney(totales.total),     c: 'navy',  i: 'dollar' },
          { l: 'Cobrado',          v: fmtMoney(totales.cobrado),   c: 'green', i: 'check-square' },
          { l: 'Pendiente cobro',  v: fmtMoney(totales.pendiente), c: 'amber', i: 'clock' },
          { l: 'Vencido',          v: fmtMoney(totales.vencido),   c: 'red',   i: 'alert' },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-value">{s.v}</div>
            </div>
            <div className={`stat-icon ${s.c}`}><Icon name={s.i} size={18}/></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Facturas recientes · {facturas.length}</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nº</th><th>Cliente</th><th>Fecha emisión</th><th>Vencimiento</th>
              <th style={{ textAlign: 'right' }}>Monto</th><th>Estado</th><th></th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="row-link">
                <td className="mono" style={{ fontWeight: 600 }}>{f.id}</td>
                <td>{f.cliente}</td>
                <td className="muted">{f.fecha}</td>
                <td className="muted">{f.vto}</td>
                <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{f.monto}</td>
                <td><span className={`pill ${tone(f.estado)}`}><span className="pill-dot"/>{f.estado}</span></td>
                <td>
                  <div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                    <button className="menu-btn" title="Descargar"><Icon name="download" size={14}/></button>
                    <RowMenu
                      items={[
                        ...(f.estado !== 'Pagada'
                          ? [{ label: 'Marcar como pagada', icon: 'check', onClick: () => dispatch({ type: 'FACTURA_MARK_PAID', payload: { id: f.id } }) }]
                          : []),
                        { label: 'Eliminar', icon: 'trash', danger: true, onClick: () => del(f.id) },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {facturas.length === 0 && (
              <tr><td colSpan={7} className="muted" style={{ padding: 24, textAlign: 'center' }}>Sin facturas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
