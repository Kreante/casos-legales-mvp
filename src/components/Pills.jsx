export function RiskPill({ level }) {
  const map = {
    critico:  { kind: 'danger',  label: 'Crítico'  },
    atencion: { kind: 'warn',    label: 'Atención' },
    bajo:     { kind: 'success', label: 'Bajo'     },
  };
  const m = map[level] || map.bajo;
  return <span className={`pill ${m.kind}`}><span className="pill-dot"/>{m.label}</span>;
}

export function StatusPill({ value }) {
  const map = {
    'Activo':     'success',
    'En trámite': 'info',
    'En proceso': 'info',
    'En revisión':'warn',
    'Cerrado':    'muted',
    'Negociación':'accent',
  };
  return <span className={`pill ${map[value] || 'muted'}`}><span className="pill-dot"/>{value}</span>;
}

export function TaskStatePill({ state }) {
  const map = {
    atrasada:   { kind: 'danger',  label: 'Atrasada'   },
    proxima:    { kind: 'warn',    label: 'Próxima'    },
    pendiente:  { kind: 'info',    label: 'Pendiente'  },
    completada: { kind: 'success', label: 'Completada' },
  };
  const m = map[state];
  return <span className={`pill ${m.kind}`}><span className="pill-dot"/>{m.label}</span>;
}

export function EventStatePill({ state }) {
  const map = {
    vencido:    { kind: 'danger',  label: 'Vencido'    },
    proximo:    { kind: 'warn',    label: 'Próximo'    },
    pendiente:  { kind: 'info',    label: 'Pendiente'  },
    completado: { kind: 'success', label: 'Completado' },
  };
  const m = map[state];
  return <span className={`pill ${m.kind}`}><span className="pill-dot"/>{m.label}</span>;
}
