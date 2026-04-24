import { createContext, useContext, useEffect, useReducer } from 'react';
import { SEED } from './seed.js';

const STORAGE_KEY = 'casos-legales-v0';

const initialState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SEED;
})();

function nowISO() { return new Date().toISOString(); }
function rid() { return (crypto.randomUUID?.() || 'id-' + Math.random().toString(36).slice(2, 10)); }

function reducer(state, action) {
  switch (action.type) {
    case 'CASO_CREATE': {
      const id = action.payload.id || `${String(Math.floor(10000 + Math.random()*90000))}/${new Date().getFullYear()}`;
      const caso = {
        id,
        caratulado: action.payload.caratulado || action.payload.titulo,
        titulo: action.payload.titulo || action.payload.caratulado,
        cliente: action.payload.cliente || '',
        clienteRazon: action.payload.clienteRazon || '',
        tipo: action.payload.tipo || 'Otro',
        fuero: action.payload.fuero || '—',
        estado: action.payload.estado || 'Activo',
        abogado: action.payload.abogado || 'Ana Martínez',
        avatarIdx: action.payload.avatarIdx || 1,
        apertura: action.payload.apertura || new Date().toLocaleDateString('es-AR'),
        tribunal: action.payload.tribunal || '—',
        expediente: action.payload.expediente || '—',
        monto: action.payload.monto || '—',
        desc: action.payload.desc || '',
        ultActuISO: nowISO(),
      };
      return { ...state, casos: [caso, ...state.casos] };
    }
    case 'EVENTO_CREATE': {
      const ev = {
        id: rid(),
        tipo: action.payload.tipo || 'Otro',
        titulo: action.payload.titulo || 'Evento',
        casoId: action.payload.casoId,
        fechaISO: action.payload.fechaISO,
        hora: action.payload.hora || null,
        completado: false,
        icono: action.payload.tipo === 'Audiencia' ? 'gavel' : action.payload.tipo === 'Plazo' ? 'clock' : 'users',
      };
      return {
        ...state,
        eventos: [ev, ...state.eventos],
        casos: state.casos.map((c) => c.id === ev.casoId ? { ...c, ultActuISO: nowISO() } : c),
      };
    }
    case 'EVENTO_TOGGLE': {
      return {
        ...state,
        eventos: state.eventos.map((e) =>
          e.id === action.payload.id ? { ...e, completado: !e.completado, icono: !e.completado ? 'check' : e.icono } : e
        ),
      };
    }
    case 'TAREA_CREATE': {
      const tk = {
        id: rid(),
        titulo: action.payload.titulo || 'Tarea',
        casoId: action.payload.casoId,
        responsable: action.payload.responsable || 'Sin asignar',
        avatarIdx: action.payload.avatarIdx || 1,
        fechaISO: action.payload.fechaISO,
        hora: action.payload.hora || null,
        completada: false,
        notas: action.payload.notas || '',
      };
      return {
        ...state,
        tareas: [tk, ...state.tareas],
        casos: state.casos.map((c) => c.id === tk.casoId ? { ...c, ultActuISO: nowISO() } : c),
      };
    }
    case 'TAREA_TOGGLE': {
      return {
        ...state,
        tareas: state.tareas.map((t) =>
          t.id === action.payload.id ? { ...t, completada: !t.completada } : t
        ),
      };
    }
    case 'RESET':
      return SEED;
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
