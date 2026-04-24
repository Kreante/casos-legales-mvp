// Cálculo dinámico de estados desde la fecha actual.
// Estados de evento: vencido | proximo | pendiente | completado
// Estados de tarea:  atrasada | proxima | pendiente | completada
// Riesgo de caso: critico | atencion | bajo

const DAY_MS = 24 * 60 * 60 * 1000;

export function eventoEstado(ev) {
  if (ev.completado) return 'completado';
  const f = new Date(ev.fechaISO);
  const now = new Date();
  const diff = (f - now) / DAY_MS;
  if (diff < 0) return 'vencido';
  if (diff <= 7) return 'proximo';
  return 'pendiente';
}

export function tareaEstado(t) {
  if (t.completada) return 'completada';
  const f = new Date(t.fechaISO);
  const now = new Date();
  const diff = (f - now) / DAY_MS;
  if (diff < 0) return 'atrasada';
  if (diff <= 7) return 'proxima';
  return 'pendiente';
}

export function casoRiesgo(casoId, eventos, tareas) {
  const evs = eventos.filter((e) => e.casoId === casoId);
  const tks = tareas.filter((t) => t.casoId === casoId);
  if (evs.some((e) => eventoEstado(e) === 'vencido')) return 'critico';
  const atencion =
    evs.some((e) => eventoEstado(e) === 'proximo') ||
    tks.some((t) => tareaEstado(t) === 'atrasada');
  if (atencion) return 'atencion';
  return 'bajo';
}

const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

export function fmtFechaCorta(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${meses[d.getMonth()]}`;
}

export function fmtFechaHora(iso) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`;
}

export function relativoCorto(iso) {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(yest.getDate() - 1);
  const isYesterday = d.toDateString() === yest.toDateString();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (sameDay) return `Hoy, ${hh}:${mm}`;
  if (isYesterday) return `Ayer, ${hh}:${mm}`;
  return fmtFechaHora(iso);
}
