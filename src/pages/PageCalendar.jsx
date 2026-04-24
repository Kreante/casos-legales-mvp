import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { useStore } from '../store/StoreContext.jsx';
import { eventoEstado } from '../store/selectors.js';

const MES_NOMBRES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOWS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

const TONE = { vencido: 'danger', proximo: 'warn', pendiente: 'info', completado: 'success' };

export default function PageCalendar({ onNew }) {
  const { state } = useStore();
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventosDelMes = state.eventos.filter((e) => {
    const d = new Date(e.fechaISO);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push({ outside: true, key: `o${i}` });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ outside: false, n: i, key: `d${i}` });
  while (cells.length < 42) cells.push({ outside: true, key: `t${cells.length}` });

  const evtsForDay = (n) => eventosDelMes.filter((e) => new Date(e.fechaISO).getDate() === n);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Calendario</h1>
          <p className="page-subtitle">Audiencias, plazos y eventos del estudio</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="seg">
            <button className="active">Mes</button>
            <button>Semana</button>
            <button>Día</button>
          </div>
          <button className="btn btn-primary" onClick={() => onNew('evento')}>
            <Icon name="plus" size={15}/> Nuevo evento
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 18 }}>
        <div className="cal-head">
          <div className="row" style={{ gap: 4 }}>
            <button className="tb-icon-btn" style={{ width: 32, height: 32 }} onClick={() => setCursor(new Date(year, month - 1, 1))}>
              <Icon name="chevron-left" size={15}/>
            </button>
            <button className="tb-icon-btn" style={{ width: 32, height: 32 }} onClick={() => setCursor(new Date(year, month + 1, 1))}>
              <Icon name="chevron-right" size={15}/>
            </button>
            <h2 className="cal-month" style={{ marginLeft: 8 }}>{MES_NOMBRES[month]} {year}</h2>
          </div>
          <div className="row" style={{ gap: 16 }}>
            {[
              { l: 'Vencido', c: 'var(--c-danger)' },
              { l: 'Próximo', c: 'var(--c-warn)' },
              { l: 'Pendiente', c: 'var(--c-info)' },
              { l: 'Completado', c: 'var(--c-success)' },
            ].map((x) => (
              <span key={x.l} className="row" style={{ gap: 6, fontSize: 12.5, color: 'var(--c-text-3)' }}>
                <span className="pill-dot" style={{ background: x.c, width: 8, height: 8, borderRadius: '50%' }}/>
                {x.l}
              </span>
            ))}
          </div>
        </div>

        <div className="cal-grid">
          {DOWS.map((d) => <div className="cal-dow" key={d}>{d}</div>)}
          {cells.map((c) => {
            const isToday =
              !c.outside &&
              c.n === today.getDate() &&
              today.getMonth() === month &&
              today.getFullYear() === year;
            const evts = !c.outside ? evtsForDay(c.n) : [];
            return (
              <div key={c.key} className={`cal-day ${c.outside ? 'outside' : ''} ${isToday ? 'today' : ''}`}>
                <div className="cal-num">{c.outside ? '' : c.n}</div>
                {evts.slice(0, 3).map((e) => (
                  <div key={e.id} className={`cal-event ${TONE[eventoEstado(e)]}`}>
                    {e.hora ? `${e.hora} ` : ''}{e.titulo}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
