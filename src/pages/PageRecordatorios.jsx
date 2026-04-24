import Icon from '../components/Icon.jsx';
import { RECORDATORIOS } from './mockExtra.js';

export default function PageRecordatorios() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Recordatorios</h1>
          <p className="page-subtitle">Avisos personales y de equipo · separados de plazos judiciales</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm"><Icon name="settings" size={14}/> Preferencias</button>
          <button className="btn btn-primary"><Icon name="plus" size={15}/> Nuevo recordatorio</button>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Próximos · {RECORDATORIOS.length}</h3>
          <button className="btn btn-ghost btn-sm">Marcar todo como leído</button>
        </div>
        <div>
          {RECORDATORIOS.map((r) => {
            const tone = r.kind === 'danger' ? 'danger' : r.kind === 'warn' ? 'warn' : 'info';
            const pillLabel = r.kind === 'danger' ? 'Urgente' : r.kind === 'warn' ? 'Próximo' : 'Programado';
            return (
              <div
                key={r.id}
                className="evt-row"
                style={{
                  padding: '14px 22px',
                  borderTop: '1px solid var(--c-divider)',
                  display: 'grid',
                  gridTemplateColumns: '4px 28px minmax(0,1fr) auto auto auto',
                  gap: 14,
                }}
              >
                <div className={`evt-bar ${tone}`}/>
                <div className={`evt-icon ${tone}`}><Icon name="bell" size={14}/></div>
                <div className="evt-body">
                  <div className="evt-title">{r.titulo}</div>
                  <div className="evt-sub">
                    {r.tipo}{r.caso !== '—' ? ` · ${r.caso}` : ''}
                  </div>
                </div>
                <div className="evt-date">{r.fecha} · {r.hora}</div>
                <span className={`pill ${tone}`}><span className="pill-dot"/>{pillLabel}</span>
                <button className="menu-btn"><Icon name="more" size={15}/></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
