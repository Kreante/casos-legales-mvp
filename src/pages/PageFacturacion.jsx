import Icon from '../components/Icon.jsx';
import { FACTURAS } from './mockExtra.js';

const tone = (e) => (e === 'Pagada' ? 'success' : e === 'Vencida' ? 'danger' : 'info');

export default function PageFacturacion() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Facturación</h1>
          <p className="page-subtitle">Honorarios emitidos, cobros y vencimientos</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nueva factura</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Facturado este mes', v: '$ 2.1M', t: '+9%',  c: 'navy',  i: 'dollar' },
          { l: 'Cobrado',            v: '$ 1.6M', t: '+12%', c: 'green', i: 'check-square' },
          { l: 'Pendiente cobro',    v: '$ 488K', t: '—',    c: 'amber', i: 'clock' },
          { l: 'Vencido',            v: '$ 84K',  t: '−18%', c: 'red',   i: 'alert' },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-value">{s.v}</div>
              {s.t !== '—' && <div className="stat-trend"><strong>{s.t}</strong> vs. mes anterior</div>}
            </div>
            <div className={`stat-icon ${s.c}`}><Icon name={s.i} size={18}/></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Facturas recientes</h3>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn-secondary btn-sm">Estado <Icon name="chevron-down" size={12}/></button>
            <button className="btn btn-secondary btn-sm">Cliente <Icon name="chevron-down" size={12}/></button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nº</th><th>Cliente</th><th>Fecha emisión</th><th>Vencimiento</th>
              <th style={{ textAlign: 'right' }}>Monto</th><th>Estado</th><th></th>
            </tr>
          </thead>
          <tbody>
            {FACTURAS.map((f) => (
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
                    <button className="menu-btn"><Icon name="more" size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
