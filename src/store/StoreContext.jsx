import { createContext, useContext, useEffect, useReducer } from 'react';
import { SEED } from './seed.js';

const STORAGE_KEY = 'casos-legales-v0';

function mergeSeed(stored) {
  // Asegura que nuevas claves del seed (entidades / settings) existan
  // aunque el localStorage provenga de una versión previa.
  const out = { ...SEED, ...stored };
  out.settings = { ...SEED.settings, ...(stored?.settings || {}) };
  if (out.settings.notif) out.settings.notif = { ...SEED.settings.notif, ...stored.settings.notif };
  if (out.settings.seg)   out.settings.seg   = { ...SEED.settings.seg,   ...stored.settings.seg };
  return out;
}

const initialState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return mergeSeed(JSON.parse(raw));
  } catch {}
  return SEED;
})();

function nowISO() { return new Date().toISOString(); }
function rid() { return (crypto.randomUUID?.() || 'id-' + Math.random().toString(36).slice(2, 10)); }

const generic = {
  create: (key) => (state, payload) => ({ ...state, [key]: [{ id: rid(), ...payload }, ...state[key]] }),
  del:    (key) => (state, id)      => ({ ...state, [key]: state[key].filter((x) => x.id !== id) }),
  update: (key) => (state, id, patch) => ({
    ...state,
    [key]: state[key].map((x) => (x.id === id ? { ...x, ...patch } : x)),
  }),
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    // ===== Casos / eventos / tareas (MVP core) =====
    case 'CASO_CREATE': {
      const id = payload.id || `${String(Math.floor(10000 + Math.random()*90000))}/${new Date().getFullYear()}`;
      const caso = {
        id,
        caratulado: payload.caratulado || payload.titulo,
        titulo: payload.titulo || payload.caratulado,
        cliente: payload.cliente || '',
        clienteRazon: payload.clienteRazon || '',
        tipo: payload.tipo || 'Otro',
        fuero: payload.fuero || '—',
        estado: payload.estado || 'Activo',
        abogado: payload.abogado || 'Ana Martínez',
        avatarIdx: payload.avatarIdx || 1,
        apertura: payload.apertura || new Date().toLocaleDateString('es-AR'),
        tribunal: payload.tribunal || '—',
        expediente: payload.expediente || '—',
        monto: payload.monto || '—',
        desc: payload.desc || '',
        ultActuISO: nowISO(),
      };
      return { ...state, casos: [caso, ...state.casos] };
    }
    case 'EVENTO_CREATE': {
      const ev = {
        id: rid(),
        tipo: payload.tipo || 'Otro',
        titulo: payload.titulo || 'Evento',
        casoId: payload.casoId,
        fechaISO: payload.fechaISO,
        hora: payload.hora || null,
        completado: false,
        icono: payload.tipo === 'Audiencia' ? 'gavel' : payload.tipo === 'Plazo' ? 'clock' : 'users',
      };
      return {
        ...state,
        eventos: [ev, ...state.eventos],
        casos: state.casos.map((c) => c.id === ev.casoId ? { ...c, ultActuISO: nowISO() } : c),
      };
    }
    case 'EVENTO_TOGGLE':
      return { ...state, eventos: state.eventos.map((e) => e.id === payload.id ? { ...e, completado: !e.completado } : e) };
    case 'TAREA_CREATE': {
      const tk = {
        id: rid(),
        titulo: payload.titulo || 'Tarea',
        casoId: payload.casoId,
        responsable: payload.responsable || 'Sin asignar',
        avatarIdx: payload.avatarIdx || 1,
        fechaISO: payload.fechaISO,
        hora: payload.hora || null,
        completada: false,
        notas: payload.notas || '',
      };
      return {
        ...state,
        tareas: [tk, ...state.tareas],
        casos: state.casos.map((c) => c.id === tk.casoId ? { ...c, ultActuISO: nowISO() } : c),
      };
    }
    case 'TAREA_TOGGLE':
      return { ...state, tareas: state.tareas.map((t) => t.id === payload.id ? { ...t, completada: !t.completada } : t) };

    // ===== Secundarias =====
    case 'CONTACTO_CREATE':   return generic.create('contactos')(state, { idx: 1, casos: 0, ...payload });
    case 'CONTACTO_DELETE':   return generic.del('contactos')(state, payload.id);

    case 'DOCUMENTO_CREATE':  return generic.create('documentos')(state, { firmado: false, idx: 1, tamano: '—', fecha: new Date().toLocaleDateString('es-AR'), ...payload });
    case 'DOCUMENTO_DELETE':  return generic.del('documentos')(state, payload.id);
    case 'DOCUMENTO_TOGGLE_FIRMA':
      return generic.update('documentos')(state, payload.id, { firmado: !state.documentos.find((d) => d.id === payload.id)?.firmado });

    case 'FACTURA_CREATE':    return generic.create('facturas')(state, { estado: 'Emitida', ...payload });
    case 'FACTURA_DELETE':    return generic.del('facturas')(state, payload.id);
    case 'FACTURA_MARK_PAID': return generic.update('facturas')(state, payload.id, { estado: 'Pagada' });

    case 'PLANTILLA_CREATE':  return generic.create('plantillas')(state, { uso: 0, actu: new Date().toLocaleDateString('es-AR'), ...payload });
    case 'PLANTILLA_DELETE':  return generic.del('plantillas')(state, payload.id);

    case 'RECORDATORIO_CREATE': return generic.create('recordatorios')(state, { leido: false, kind: 'info', ...payload });
    case 'RECORDATORIO_DELETE': return generic.del('recordatorios')(state, payload.id);
    case 'RECORDATORIO_TOGGLE_LEIDO':
      return generic.update('recordatorios')(state, payload.id, { leido: !state.recordatorios.find((r) => r.id === payload.id)?.leido });

    case 'EQUIPO_CREATE':     return generic.create('equipos')(state, { miembros: 0, casos: 0, lid: 1, ...payload });
    case 'EQUIPO_DELETE':     return generic.del('equipos')(state, payload.id);

    case 'USUARIO_CREATE':    return generic.create('usuarios')(state, { estado: 'Activo', idx: 1, ult: 'Recién invitado', ...payload });
    case 'USUARIO_DELETE':    return generic.del('usuarios')(state, payload.id);
    case 'USUARIO_TOGGLE_ESTADO':
      return generic.update('usuarios')(state, payload.id, {
        estado: state.usuarios.find((u) => u.id === payload.id)?.estado === 'Activo' ? 'Inactivo' : 'Activo',
      });

    // ===== Settings =====
    case 'SETTINGS_UPDATE':
      return { ...state, settings: { ...state.settings, ...payload } };

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
