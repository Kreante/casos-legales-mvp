// Seed inicial de Casos Legales. Las fechas relativas del diseño se anclan a
// la fecha de carga, para que los estados (vencido/próximo/atrasada) sigan
// siendo realistas al ejecutar el prototipo en cualquier momento.

const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

function fmtFecha(d) {
  return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtFechaCorta(d) {
  return `${d.getDate()} ${meses[d.getMonth()]}`;
}
function fmtFechaHora(d) {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${fmtFecha(d)}, ${hh}:${mm}`;
}

function offsetISO(days, hour = 9, minute = 0) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function buildSeed() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const casos = [
    {
      id: '00123/2026',
      caratulado: 'Pérez, Juan c/ Industrias del Norte S.A. s/ Despido',
      titulo: 'Pérez c/ Industrias del Norte',
      cliente: 'Juan Pérez',
      clienteRazon: 'Industrias del Norte S.A.',
      tipo: 'Demanda laboral',
      fuero: 'Laboral',
      estado: 'En trámite',
      abogado: 'Ana Martínez',
      avatarIdx: 1,
      apertura: fmtFecha(new Date(today.getFullYear(), 0, 12)),
      tribunal: 'Juzgado Nacional del Trabajo Nº 14',
      expediente: 'CNT 24315/2025',
      monto: '$ 12.450.000 ARS',
      desc: 'Despido sin causa, reclamo por indemnización art. 245 LCT, multas y horas extras impagas.',
      ultActuISO: offsetISO(-1, 10, 45),
    },
    {
      id: '00456/2026',
      caratulado: 'López, María c/ Constructora Andina SRL s/ Incumplimiento',
      titulo: 'López c/ Constructora Andina',
      cliente: 'María López',
      clienteRazon: 'Constructora Andina SRL',
      tipo: 'Incumplimiento contractual',
      fuero: 'Comercial',
      estado: 'En proceso',
      abogado: 'Diego Ramírez',
      avatarIdx: 2,
      apertura: fmtFecha(new Date(today.getFullYear(), 1, 3)),
      tribunal: 'Juzgado Nacional de Comercio Nº 8',
      expediente: 'COM 31201/2026',
      monto: '$ 8.300.000 ARS',
      desc: 'Incumplimiento de obra contractual, plazos vencidos y vicios redhibitorios.',
      ultActuISO: offsetISO(-1, 9, 15),
    },
    {
      id: '00789/2026',
      caratulado: 'Ramírez, Carlos c/ Comercializadora Sur S.A. s/ Daños y perjuicios',
      titulo: 'Ramírez c/ Comercializadora Sur',
      cliente: 'Carlos Ramírez',
      clienteRazon: 'Comercializadora Sur S.A.',
      tipo: 'Daños y perjuicios',
      fuero: 'Civil',
      estado: 'En trámite',
      abogado: 'Laura Sánchez',
      avatarIdx: 3,
      apertura: fmtFecha(new Date(today.getFullYear(), 1, 18)),
      tribunal: 'Juzgado Civil Nº 27',
      expediente: 'CIV 18402/2026',
      monto: '$ 4.700.000 ARS',
      desc: 'Reclamo por daños materiales y morales por accidente de tránsito ocurrido el 12/12/2025.',
      ultActuISO: offsetISO(-2, 16, 30),
    },
    {
      id: '01011/2026',
      caratulado: 'Sánchez, L. c/ Fernández, R. s/ Divorcio contencioso',
      titulo: 'Sánchez c/ Fernández — Divorcio',
      cliente: 'Laura Sánchez',
      clienteRazon: 'Persona física',
      tipo: 'Divorcio contencioso',
      fuero: 'Familia',
      estado: 'En proceso',
      abogado: 'Ana Martínez',
      avatarIdx: 1,
      apertura: fmtFecha(new Date(today.getFullYear(), 2, 1)),
      tribunal: 'Juzgado de Familia Nº 5',
      expediente: 'FAM 9821/2026',
      monto: '—',
      desc: 'Disolución del vínculo y liquidación de bienes gananciales con menores a cargo.',
      ultActuISO: offsetISO(-2, 11, 20),
    },
    {
      id: '01234/2025',
      caratulado: 'Banco del Plata c/ Transportes del Valle S.A. s/ Ejecutivo',
      titulo: 'Banco del Plata c/ Transportes del Valle',
      cliente: 'Banco del Plata',
      clienteRazon: 'Transportes del Valle S.A.',
      tipo: 'Cobro de obligaciones',
      fuero: 'Comercial',
      estado: 'Cerrado',
      abogado: 'Diego Ramírez',
      avatarIdx: 2,
      apertura: fmtFecha(new Date(today.getFullYear() - 1, 6, 14)),
      tribunal: 'Juzgado Nacional de Comercio Nº 12',
      expediente: 'COM 14021/2025',
      monto: '$ 2.150.000 ARS',
      desc: 'Ejecución de pagaré. Sentencia firme y cobro efectivo.',
      ultActuISO: offsetISO(-5, 15, 45),
    },
    {
      id: '01567/2026',
      caratulado: 'TechNova Solutions c/ Distribuidora Andina s/ Propiedad intelectual',
      titulo: 'TechNova c/ Distribuidora Andina',
      cliente: 'TechNova Solutions',
      clienteRazon: 'Distribuidora Andina S.A.',
      tipo: 'Propiedad intelectual',
      fuero: 'Comercial',
      estado: 'En proceso',
      abogado: 'Laura Sánchez',
      avatarIdx: 3,
      apertura: fmtFecha(new Date(today.getFullYear(), 2, 21)),
      tribunal: 'Juzgado Civil y Comercial Federal Nº 3',
      expediente: 'CCF 7621/2026',
      monto: '$ 18.900.000 ARS',
      desc: 'Uso indebido de marca registrada y software propietario.',
      ultActuISO: offsetISO(-5, 9, 10),
    },
    {
      id: '01678/2026',
      caratulado: 'Cooperativa El Surco c/ Inmobiliaria Central s/ Pago tasa judicial',
      titulo: 'Cooperativa El Surco c/ Inmobiliaria Central',
      cliente: 'Cooperativa El Surco',
      clienteRazon: 'Inmobiliaria Central SRL',
      tipo: 'Cobro de tasa',
      fuero: 'Comercial',
      estado: 'En trámite',
      abogado: 'Ana Martínez',
      avatarIdx: 1,
      apertura: fmtFecha(new Date(today.getFullYear(), 3, 8)),
      tribunal: 'Juzgado Comercial Nº 4',
      expediente: 'COM 22045/2026',
      monto: '$ 1.250.000 ARS',
      desc: 'Reclamo por pago de tasa judicial pendiente y honorarios.',
      ultActuISO: offsetISO(-6, 13, 42),
    },
    {
      id: '01890/2026',
      caratulado: 'Vega Corporativo c/ Estado Provincial s/ Amparo',
      titulo: 'Vega Corporativo c/ Estado Provincial',
      cliente: 'Vega Corporativo S.A.',
      clienteRazon: 'Estado Provincial',
      tipo: 'Amparo',
      fuero: 'Contencioso Adm.',
      estado: 'En trámite',
      abogado: 'Diego Ramírez',
      avatarIdx: 2,
      apertura: fmtFecha(new Date(today.getFullYear(), 3, 20)),
      tribunal: 'Juzgado Contencioso Administrativo Nº 2',
      expediente: 'CAF 3318/2026',
      monto: '—',
      desc: 'Amparo por acto administrativo lesivo. Medida cautelar pendiente.',
      ultActuISO: offsetISO(-7, 11, 0),
    },
  ];

  // Tareas — días relativos a hoy (negativo = atraso, positivo = futuro)
  const tareasRaw = [
    { id: 't1', titulo: 'Revisión de contrato', casoId: '00123/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: -12 },
    { id: 't2', titulo: 'Presentar escrito de descargo', casoId: '01678/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: -10 },
    { id: 't3', titulo: 'Enviar documentación al perito', casoId: '00789/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: -9 },
    { id: 't4', titulo: 'Responder traslado de demanda', casoId: '00456/2026', responsable: 'Diego Ramírez', avatarIdx: 2, days: -8 },
    { id: 't5', titulo: 'Recopilar prueba documental', casoId: '01567/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: -7 },
    { id: 't6', titulo: 'Audiencia preliminar', casoId: '00456/2026', responsable: 'Diego Ramírez', avatarIdx: 2, days: 0, hora: '10:00' },
    { id: 't7', titulo: 'Vencimiento contrato locación', casoId: '01567/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: 1, hora: '16:00' },
    { id: 't8', titulo: 'Reunión con cliente', casoId: '01890/2026', responsable: 'Diego Ramírez', avatarIdx: 2, days: 1, hora: '11:00' },
    { id: 't9', titulo: 'Elaborar contestación', casoId: '01011/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: 2, hora: '15:00' },
    { id: 't10', titulo: 'Revisión de pruebas', casoId: '00123/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: 3 },
    { id: 't11', titulo: 'Análisis de documentación', casoId: '01890/2026', responsable: 'Diego Ramírez', avatarIdx: 2, days: 10 },
    { id: 't12', titulo: 'Informe de viabilidad', casoId: '00789/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: 15 },
    { id: 't13', titulo: 'Notificación judicial', casoId: '00789/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: 18 },
    { id: 't14', titulo: 'Revisión de anexos', casoId: '01567/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: 20 },
    { id: 't15', titulo: 'Informar al cliente', casoId: '00456/2026', responsable: 'Diego Ramírez', avatarIdx: 2, days: 25 },
    { id: 't16', titulo: 'Contrato de confidencialidad', casoId: '01567/2026', responsable: 'Laura Sánchez', avatarIdx: 3, days: -7, completada: true },
    { id: 't17', titulo: 'Escrito de contestación', casoId: '01011/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: -8, completada: true },
    { id: 't18', titulo: 'Pago de tasa de justicia', casoId: '01678/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: -10, completada: true },
    { id: 't19', titulo: 'Informe pericial entregado', casoId: '00123/2026', responsable: 'Ana Martínez', avatarIdx: 1, days: -12, completada: true },
  ];

  const tareas = tareasRaw.map((t) => {
    const [hh, mm] = (t.hora || '09:00').split(':').map(Number);
    return {
      id: t.id,
      titulo: t.titulo,
      casoId: t.casoId,
      responsable: t.responsable,
      avatarIdx: t.avatarIdx,
      fechaISO: offsetISO(t.days, hh, mm),
      hora: t.hora || null,
      completada: !!t.completada,
    };
  });

  const eventosRaw = [
    { id: 'e1', tipo: 'Plazo', titulo: 'Pago de tasa judicial', casoId: '01678/2026', days: -12, icono: 'alert' },
    { id: 'e2', tipo: 'Plazo', titulo: 'Presentar escrito de descargo', casoId: '01678/2026', days: -9, icono: 'alert' },
    { id: 'e3', tipo: 'Audiencia', titulo: 'Audiencia preliminar', casoId: '00456/2026', days: 0, hora: '10:00', icono: 'gavel' },
    { id: 'e4', tipo: 'Plazo', titulo: 'Vencimiento contrato', casoId: '01567/2026', days: 1, hora: '16:00', icono: 'clock' },
    { id: 'e5', tipo: 'Otro', titulo: 'Reunión con cliente', casoId: '01890/2026', days: 1, hora: '11:00', icono: 'users' },
    { id: 'e6', tipo: 'Audiencia', titulo: 'Audiencia de prueba', casoId: '00123/2026', days: 11, hora: '09:30', icono: 'gavel' },
    { id: 'e7', tipo: 'Plazo', titulo: 'Cierre de etapa probatoria', casoId: '00789/2026', days: 14, icono: 'clock' },
    { id: 'e8', tipo: 'Audiencia', titulo: 'Audiencia de juicio', casoId: '01567/2026', days: 21, hora: '10:00', icono: 'gavel' },
    { id: 'e9', tipo: 'Audiencia', titulo: 'Audiencia de conciliación', casoId: '01011/2026', days: -7, completado: true, icono: 'check' },
    { id: 'e10', tipo: 'Plazo', titulo: 'Notificación enviada', casoId: '01234/2025', days: -6, completado: true, icono: 'check' },
    { id: 'e11', tipo: 'Otro', titulo: 'Informe legal entregado', casoId: '01678/2026', days: -5, completado: true, icono: 'check' },
  ];

  const eventos = eventosRaw.map((e) => {
    const [hh, mm] = (e.hora || '09:00').split(':').map(Number);
    return {
      id: e.id,
      tipo: e.tipo,
      titulo: e.titulo,
      casoId: e.casoId,
      fechaISO: offsetISO(e.days, hh, mm),
      hora: e.hora || null,
      completado: !!e.completado,
      icono: e.icono,
    };
  });

  const notificaciones = [
    { id: 'a1', titulo: 'Audiencia mañana 09:00 AM', sub: 'Caso 00456/2026 — López c/ Constructora Andina', when: 'Hoy, 08:30', kind: 'warn' },
    { id: 'a2', titulo: 'Documento por vencer', sub: 'Poder notarial — Caso 00789/2026', when: 'Hoy, 07:45', kind: 'warn' },
    { id: 'a3', titulo: 'Tarea atrasada', sub: 'Revisión de contratos — Caso 00123/2026', when: 'Ayer, 18:20', kind: 'danger' },
    { id: 'a4', titulo: 'Nuevo mensaje del cliente', sub: 'María López — Caso 00456/2026', when: 'Ayer, 16:05', kind: 'info' },
    { id: 'a5', titulo: 'Plazo próximo a vencer', sub: 'Contestación demanda — Caso 01011/2026', when: 'Ayer, 12:30', kind: 'warn' },
    { id: 'a6', titulo: 'Tasa judicial vencida', sub: 'Caso 01678/2026 — Cooperativa El Surco', when: 'Hace 2 días', kind: 'danger' },
  ];

  const contactos = [
    { id: 'c1', nombre: 'Juan Pérez',          tipo: 'Cliente',     empresa: 'Industrias del Norte S.A.', email: 'jperez@industriasnorte.com', tel: '+54 11 4523-1289', casos: 2, idx: 1 },
    { id: 'c2', nombre: 'María López',         tipo: 'Cliente',     empresa: 'Constructora Andina SRL',   email: 'maria.lopez@constructoraandina.com.ar', tel: '+54 11 5232-7841', casos: 1, idx: 2 },
    { id: 'c3', nombre: 'Carlos Ramírez',      tipo: 'Cliente',     empresa: 'Comercializadora Sur S.A.', email: 'cramirez@comsur.com', tel: '+54 11 6213-0027', casos: 3, idx: 3 },
    { id: 'c4', nombre: 'Dr. Roberto Vázquez', tipo: 'Contraparte', empresa: 'Estudio Vázquez & Asoc.',   email: 'rvazquez@vazquez.legal', tel: '+54 11 4801-1010', casos: 1, idx: 4 },
    { id: 'c5', nombre: 'Lic. Susana Aguirre', tipo: 'Perito',      empresa: 'Pericias Contables SRL',   email: 's.aguirre@periciascon.com', tel: '+54 11 4233-9921', casos: 4, idx: 5 },
    { id: 'c6', nombre: 'Banco del Plata',     tipo: 'Cliente',     empresa: 'Banco del Plata S.A.',     email: 'legales@bdelplata.com', tel: '+54 11 5500-2300', casos: 5, idx: 2 },
    { id: 'c7', nombre: 'Vega Corporativo',    tipo: 'Cliente',     empresa: 'Vega Corporativo S.A.',    email: 'legales@vegacorp.com.ar', tel: '+54 11 4322-7700', casos: 2, idx: 6 },
  ];

  const documentos = [
    { id: 'd1', nombre: 'Demanda — Pérez c/ Industrias del Norte.pdf', tipo: 'Demanda',      casoId: '00123/2026', tamano: '2.4 MB', fecha: fmtFecha(new Date()), autor: 'Ana Martínez', idx: 1, firmado: true },
    { id: 'd2', nombre: 'Contrato de honorarios.docx',                  tipo: 'Contrato',     casoId: '00456/2026', tamano: '184 KB', fecha: fmtFecha(new Date()), autor: 'Diego Ramírez', idx: 2, firmado: true },
    { id: 'd3', nombre: 'Pericia contable preliminar.pdf',              tipo: 'Pericia',      casoId: '01567/2026', tamano: '5.1 MB', fecha: fmtFecha(new Date(Date.now() - 86400000)), autor: 'Laura Sánchez', idx: 3, firmado: false },
    { id: 'd4', nombre: 'Escrito de contestación.pdf',                  tipo: 'Escrito',      casoId: '01011/2026', tamano: '780 KB', fecha: fmtFecha(new Date(Date.now() - 2*86400000)), autor: 'Ana Martínez', idx: 1, firmado: true },
    { id: 'd5', nombre: 'Poder notarial.pdf',                           tipo: 'Poder',        casoId: '00789/2026', tamano: '320 KB', fecha: fmtFecha(new Date(Date.now() - 3*86400000)), autor: 'Laura Sánchez', idx: 3, firmado: true },
    { id: 'd6', nombre: 'Notificación judicial.pdf',                    tipo: 'Notificación', casoId: '01678/2026', tamano: '210 KB', fecha: fmtFecha(new Date(Date.now() - 4*86400000)), autor: 'Ana Martínez', idx: 1, firmado: false },
    { id: 'd7', nombre: 'Acuerdo de confidencialidad.docx',             tipo: 'Contrato',     casoId: '01567/2026', tamano: '92 KB',  fecha: fmtFecha(new Date(Date.now() - 6*86400000)), autor: 'Laura Sánchez', idx: 3, firmado: true },
  ];

  const facturas = [
    { id: 'F-2026-0214', cliente: 'Industrias del Norte S.A.',  fecha: fmtFecha(new Date()),                          vto: fmtFecha(new Date(Date.now() + 30*86400000)), monto: '$ 285.000', estado: 'Emitida' },
    { id: 'F-2026-0213', cliente: 'Constructora Andina SRL',    fecha: fmtFecha(new Date(Date.now() - 3*86400000)),   vto: fmtFecha(new Date(Date.now() + 27*86400000)), monto: '$ 412.500', estado: 'Pagada' },
    { id: 'F-2026-0212', cliente: 'Comercializadora Sur S.A.',  fecha: fmtFecha(new Date(Date.now() - 6*86400000)),   vto: fmtFecha(new Date(Date.now() + 24*86400000)), monto: '$ 175.000', estado: 'Pagada' },
    { id: 'F-2026-0211', cliente: 'Vega Corporativo S.A.',      fecha: fmtFecha(new Date(Date.now() - 40*86400000)),  vto: fmtFecha(new Date(Date.now() - 10*86400000)), monto: '$ 620.000', estado: 'Vencida' },
    { id: 'F-2026-0210', cliente: 'Banco del Plata',            fecha: fmtFecha(new Date(Date.now() - 13*86400000)),  vto: fmtFecha(new Date(Date.now() + 17*86400000)), monto: '$ 348.000', estado: 'Emitida' },
    { id: 'F-2026-0209', cliente: 'Cooperativa El Surco',       fecha: fmtFecha(new Date(Date.now() - 18*86400000)),  vto: fmtFecha(new Date(Date.now() + 12*86400000)), monto: '$ 98.500',  estado: 'Pagada' },
  ];

  const plantillas = [
    { id: 'p1', nombre: 'Demanda laboral por despido sin causa', cat: 'Laboral',   uso: 28, actu: fmtFecha(new Date(Date.now() - 12*86400000)) },
    { id: 'p2', nombre: 'Contestación de demanda comercial',     cat: 'Comercial', uso: 19, actu: fmtFecha(new Date(Date.now() - 16*86400000)) },
    { id: 'p3', nombre: 'Recurso de apelación',                  cat: 'General',   uso: 14, actu: fmtFecha(new Date(Date.now() - 22*86400000)) },
    { id: 'p4', nombre: 'Convenio de divorcio',                  cat: 'Familia',   uso: 11, actu: fmtFecha(new Date(Date.now() - 27*86400000)) },
    { id: 'p5', nombre: 'Acuerdo de confidencialidad (NDA)',     cat: 'Comercial', uso: 22, actu: fmtFecha(new Date(Date.now() - 34*86400000)) },
    { id: 'p6', nombre: 'Poder general judicial',                cat: 'General',   uso: 36, actu: fmtFecha(new Date(Date.now() - 40*86400000)) },
    { id: 'p7', nombre: 'Carta documento intimación',            cat: 'General',   uso: 41, actu: fmtFecha(new Date(Date.now() - 45*86400000)) },
    { id: 'p8', nombre: 'Acuerdo transaccional laboral',         cat: 'Laboral',   uso: 9,  actu: fmtFecha(new Date(Date.now() - 50*86400000)) },
  ];

  const recordatorios = [
    { id: 'r1', titulo: 'Renovar suscripción ColectaWeb',         casoId: null,         fecha: fmtFecha(new Date(Date.now() + 2*86400000)), hora: '09:00', tipo: 'Administrativo', kind: 'warn',   leido: false },
    { id: 'r2', titulo: 'Llamar a perito contable',               casoId: '01567/2026', fecha: fmtFecha(new Date(Date.now() + 1*86400000)), hora: '11:30', tipo: 'Llamada',         kind: 'info',   leido: false },
    { id: 'r3', titulo: 'Verificar pago de tasa judicial',        casoId: '01678/2026', fecha: fmtFecha(new Date()),                        hora: '14:00', tipo: 'Plazo',           kind: 'danger', leido: false },
    { id: 'r4', titulo: 'Reunión interna seguimiento de cartera', casoId: null,         fecha: fmtFecha(new Date(Date.now() + 4*86400000)), hora: '10:00', tipo: 'Reunión',         kind: 'info',   leido: false },
    { id: 'r5', titulo: 'Actualizar honorarios trimestre',        casoId: null,         fecha: fmtFecha(new Date(Date.now() + 8*86400000)), hora: '17:00', tipo: 'Administrativo', kind: 'info',   leido: true },
  ];

  const equipos = [
    { id: 'eq1', nombre: 'Laboral',          lider: 'Ana Martínez',  lid: 1, miembros: 4, casos: 12 },
    { id: 'eq2', nombre: 'Comercial',        lider: 'Diego Ramírez', lid: 2, miembros: 5, casos: 18 },
    { id: 'eq3', nombre: 'Civil y Familia',  lider: 'Laura Sánchez', lid: 3, miembros: 3, casos: 9  },
    { id: 'eq4', nombre: 'Contencioso Adm.', lider: 'Diego Ramírez', lid: 2, miembros: 2, casos: 5  },
  ];

  const usuarios = [
    { id: 'u1', nombre: 'Ana Martínez',    email: 'ana@estudio.legal',     rol: 'Admin',     equipo: 'Laboral',         estado: 'Activo',   ult: 'Hace 2 min',  idx: 1 },
    { id: 'u2', nombre: 'Diego Ramírez',   email: 'diego@estudio.legal',   rol: 'Abogado',   equipo: 'Comercial',       estado: 'Activo',   ult: 'Hace 12 min', idx: 2 },
    { id: 'u3', nombre: 'Laura Sánchez',   email: 'laura@estudio.legal',   rol: 'Abogada',   equipo: 'Civil y Familia', estado: 'Activo',   ult: 'Hace 1 h',    idx: 3 },
    { id: 'u4', nombre: 'Sofía García',    email: 'sofia@estudio.legal',   rol: 'Paralegal', equipo: 'Laboral',         estado: 'Activo',   ult: 'Hace 3 h',    idx: 4 },
    { id: 'u5', nombre: 'Martín Ibáñez',   email: 'martin@estudio.legal',  rol: 'Paralegal', equipo: 'Comercial',       estado: 'Inactivo', ult: 'Hace 4 días', idx: 5 },
    { id: 'u6', nombre: 'Camila Ruiz',     email: 'camila@estudio.legal',  rol: 'Asistente', equipo: 'Comercial',       estado: 'Activo',   ult: 'Hace 5 h',    idx: 6 },
  ];

  const settings = {
    theme: 'light',      // light | dark
    sidebar: 'dark',     // dark | light
    accent: 'indigo',    // indigo | violet | cobalt | emerald | ochre
    density: 'standard', // compact | standard | comfy
    notif: { email: true, push: true, audiencia: true, plazos: true, reportes: false },
    seg:   { twofa: true, autoLogout: true, auditoria: false },
  };

  return { casos, tareas, eventos, notificaciones, contactos, documentos, facturas, plantillas, recordatorios, equipos, usuarios, settings };
}

export const SEED = buildSeed();
export { fmtFecha, fmtFechaCorta, fmtFechaHora };
