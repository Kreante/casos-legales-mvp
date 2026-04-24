import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';

export default function PageReportes() {
  const meses = [
    { m: 'Dic', v: 56, h: 50 }, { m: 'Ene', v: 72, h: 64 }, { m: 'Feb', v: 65, h: 58 },
    { m: 'Mar', v: 84, h: 75 }, { m: 'Abr', v: 92, h: 81 }, { m: 'May', v: 86.5, h: 77 },
  ];
  const fueros = [
    { f: 'Laboral',         pct: 32, color: '#0051d5' },
    { f: 'Comercial',       pct: 28, color: '#7c3aed' },
    { f: 'Civil',           pct: 18, color: '#047857' },
    { f: 'Familia',         pct: 12, color: '#b45309' },
    { f: 'Contencioso Adm.',pct: 10, color: '#be123c' },
  ];
  const max = Math.max(...meses.map((m) => m.v));

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Reportes</h1>
          <p className="page-subtitle">Indicadores clave del estudio · últimos 6 meses</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="seg"><button>3M</button><button className="active">6M</button><button>12M</button></div>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Casos abiertos', v: '128', t: '+12%', c: 'navy', i: 'briefcase' },
          { l: 'Casos cerrados (mes)', v: '14', t: '+22%', c: 'green', i: 'check-square' },
          { l: 'Tasa de éxito', v: '78%', t: '+4 pts', c: 'blue', i: 'star' },
          { l: 'Facturación (mes)', v: '$ 2.1M', t: '+9%', c: 'amber', i: 'dollar' },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div>
              <div className="stat-label">{s.l}</div>
              <div className="stat-value">{s.v}</div>
              <div className="stat-trend"><Icon name="arrow-up" size={12}/><strong>{s.t}</strong> vs. periodo anterior</div>
            </div>
            <div className={`stat-icon ${s.c}`}><Icon name={s.i} size={18}/></div>
          </div>
        ))}
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)' }}>
        <div className="card">
          <div className="card-head">
            <h3 className="card-title">Horas registradas vs. facturadas</h3>
            <div className="row" style={{ gap: 14, fontSize: 12.5 }}>
              <span className="row" style={{ gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--c-accent)' }}/>Registradas
              </span>
              <span className="row" style={{ gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--c-surface-3)' }}/>Facturadas
              </span>
            </div>
          </div>
          <div style={{ padding: '8px 22px 18px' }}>
            <div className="chart-bars">
              {meses.map((m, i) => (
                <div className="chart-bar" key={i}>
                  <div style={{ width: '100%', display: 'flex', gap: 4, alignItems: 'flex-end', height: 200 }}>
                    <div className="bar" style={{ height: `${(m.v / max) * 100}%` }}/>
                    <div className="bar muted" style={{ height: `${(m.h / max) * 100}%` }}/>
                  </div>
                  <div className="bar-lbl">{m.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3 className="card-title">Distribución por fuero</h3></div>
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div
              className="donut"
              style={{
                background: `conic-gradient(${fueros
                  .map((f, i, arr) => {
                    const start = arr.slice(0, i).reduce((a, b) => a + b.pct, 0);
                    return `${f.color} ${start}% ${start + f.pct}%`;
                  })
                  .join(', ')})`,
              }}
            >
              <div className="donut-center">
                <div className="num">128</div>
                <div className="lbl">casos</div>
              </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {fueros.map((f, i) => (
                <div key={i} className="between" style={{ fontSize: 13 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: f.color }}/>
                    {f.f}
                  </div>
                  <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{f.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 18 }}/>
      <div className="card">
        <div className="card-head"><h3 className="card-title">Top abogados por casos cerrados</h3></div>
        <table className="table">
          <thead>
            <tr>
              <th>Abogado</th><th>Cerrados</th><th>Activos</th><th>Tasa éxito</th><th>Horas</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: 'Ana Martínez', i: 1, c: 12, a: 14, t: '85%', h: '142.5' },
              { n: 'Diego Ramírez', i: 2, c: 9,  a: 18, t: '78%', h: '128.0' },
              { n: 'Laura Sánchez', i: 3, c: 7,  a: 9,  t: '74%', h: '96.5'  },
            ].map((r, i) => (
              <tr key={i}>
                <td><div className="row" style={{ gap: 10 }}><Avatar name={r.n} idx={r.i} size="sm"/>{r.n}</div></td>
                <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{r.c}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{r.a}</td>
                <td><span className="pill success"><span className="pill-dot"/>{r.t}</span></td>
                <td className="mono">{r.h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
