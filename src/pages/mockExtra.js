export const CONTACTOS = [
  { id: 'c1', nombre: 'Juan Pérez',          tipo: 'Cliente',     empresa: 'Industrias del Norte S.A.', email: 'jperez@industriasnorte.com', tel: '+54 11 4523-1289', casos: 2, idx: 1 },
  { id: 'c2', nombre: 'María López',         tipo: 'Cliente',     empresa: 'Constructora Andina SRL',   email: 'maria.lopez@constructoraandina.com.ar', tel: '+54 11 5232-7841', casos: 1, idx: 2 },
  { id: 'c3', nombre: 'Carlos Ramírez',      tipo: 'Cliente',     empresa: 'Comercializadora Sur S.A.', email: 'cramirez@comsur.com', tel: '+54 11 6213-0027', casos: 3, idx: 3 },
  { id: 'c4', nombre: 'Dr. Roberto Vázquez', tipo: 'Contraparte', empresa: 'Estudio Vázquez & Asoc.',   email: 'rvazquez@vazquez.legal', tel: '+54 11 4801-1010', casos: 1, idx: 4 },
  { id: 'c5', nombre: 'Lic. Susana Aguirre', tipo: 'Perito',      empresa: 'Pericias Contables SRL',   email: 's.aguirre@periciascon.com', tel: '+54 11 4233-9921', casos: 4, idx: 5 },
  { id: 'c6', nombre: 'Banco del Plata',     tipo: 'Cliente',     empresa: 'Banco del Plata S.A.',     email: 'legales@bdelplata.com', tel: '+54 11 5500-2300', casos: 5, idx: 2 },
  { id: 'c7', nombre: 'Vega Corporativo',    tipo: 'Cliente',     empresa: 'Vega Corporativo S.A.',    email: 'legales@vegacorp.com.ar', tel: '+54 11 4322-7700', casos: 2, idx: 6 },
];

export const DOCUMENTOS = [
  { id: 'd1', nombre: 'Demanda — Pérez c/ Industrias del Norte.pdf', tipo: 'Demanda',      caso: 'Pérez c/ Industrias del Norte', casoId: '00123/2026', tamano: '2.4 MB', fecha: '21 may 2026', autor: 'Ana Martínez', idx: 1, firmado: true },
  { id: 'd2', nombre: 'Contrato de honorarios.docx',                  tipo: 'Contrato',     caso: 'López c/ Constructora Andina',  casoId: '00456/2026', tamano: '184 KB', fecha: '21 may 2026', autor: 'Diego Ramírez', idx: 2, firmado: true },
  { id: 'd3', nombre: 'Pericia contable preliminar.pdf',              tipo: 'Pericia',      caso: 'TechNova c/ Distribuidora Andina', casoId: '01567/2026', tamano: '5.1 MB', fecha: '20 may 2026', autor: 'Laura Sánchez', idx: 3, firmado: false },
  { id: 'd4', nombre: 'Escrito de contestación.pdf',                  tipo: 'Escrito',      caso: 'Sánchez c/ Fernández',         casoId: '01011/2026', tamano: '780 KB', fecha: '19 may 2026', autor: 'Ana Martínez', idx: 1, firmado: true },
  { id: 'd5', nombre: 'Poder notarial.pdf',                           tipo: 'Poder',        caso: 'Ramírez c/ Comercializadora Sur', casoId: '00789/2026', tamano: '320 KB', fecha: '18 may 2026', autor: 'Laura Sánchez', idx: 3, firmado: true },
  { id: 'd6', nombre: 'Notificación judicial.pdf',                    tipo: 'Notificación', caso: 'Cooperativa El Surco',         casoId: '01678/2026', tamano: '210 KB', fecha: '17 may 2026', autor: 'Ana Martínez', idx: 1, firmado: false },
  { id: 'd7', nombre: 'Acuerdo de confidencialidad.docx',             tipo: 'Contrato',     caso: 'TechNova c/ Distribuidora Andina', casoId: '01567/2026', tamano: '92 KB',  fecha: '15 may 2026', autor: 'Laura Sánchez', idx: 3, firmado: true },
];

export const FACTURAS = [
  { id: 'F-2026-0214', cliente: 'Industrias del Norte S.A.',  fecha: '21 may 2026', vto: '20 jun 2026', monto: '$ 285.000', estado: 'Emitida' },
  { id: 'F-2026-0213', cliente: 'Constructora Andina SRL',    fecha: '18 may 2026', vto: '17 jun 2026', monto: '$ 412.500', estado: 'Pagada' },
  { id: 'F-2026-0212', cliente: 'Comercializadora Sur S.A.',  fecha: '15 may 2026', vto: '14 jun 2026', monto: '$ 175.000', estado: 'Pagada' },
  { id: 'F-2026-0211', cliente: 'Vega Corporativo S.A.',      fecha: '12 may 2026', vto: '11 jun 2026', monto: '$ 620.000', estado: 'Vencida' },
  { id: 'F-2026-0210', cliente: 'Banco del Plata',            fecha: '08 may 2026', vto: '07 jun 2026', monto: '$ 348.000', estado: 'Emitida' },
  { id: 'F-2026-0209', cliente: 'Cooperativa El Surco',       fecha: '03 may 2026', vto: '02 jun 2026', monto: '$ 98.500',  estado: 'Pagada' },
];

export const PLANTILLAS = [
  { id: 'p1', nombre: 'Demanda laboral por despido sin causa', cat: 'Laboral',   uso: 28, actu: '12 may 2026' },
  { id: 'p2', nombre: 'Contestación de demanda comercial',     cat: 'Comercial', uso: 19, actu: '08 may 2026' },
  { id: 'p3', nombre: 'Recurso de apelación',                  cat: 'General',   uso: 14, actu: '02 may 2026' },
  { id: 'p4', nombre: 'Convenio de divorcio',                  cat: 'Familia',   uso: 11, actu: '28 abr 2026' },
  { id: 'p5', nombre: 'Acuerdo de confidencialidad (NDA)',     cat: 'Comercial', uso: 22, actu: '21 abr 2026' },
  { id: 'p6', nombre: 'Poder general judicial',                cat: 'General',   uso: 36, actu: '15 abr 2026' },
  { id: 'p7', nombre: 'Carta documento intimación',            cat: 'General',   uso: 41, actu: '10 abr 2026' },
  { id: 'p8', nombre: 'Acuerdo transaccional laboral',         cat: 'Laboral',   uso: 9,  actu: '05 abr 2026' },
];

export const RECORDATORIOS = [
  { id: 'r1', titulo: 'Renovar suscripción ColectaWeb',         caso: '—',                                  fecha: '24 may 2026', hora: '09:00', tipo: 'Administrativo', kind: 'warn' },
  { id: 'r2', titulo: 'Llamar a perito contable',                caso: 'TechNova c/ Distribuidora Andina',  fecha: '23 may 2026', hora: '11:30', tipo: 'Llamada',         kind: 'info' },
  { id: 'r3', titulo: 'Verificar pago de tasa judicial',         caso: 'Cooperativa El Surco',              fecha: '22 may 2026', hora: '14:00', tipo: 'Plazo',           kind: 'danger' },
  { id: 'r4', titulo: 'Reunión interna seguimiento de cartera', caso: '—',                                  fecha: '26 may 2026', hora: '10:00', tipo: 'Reunión',         kind: 'info' },
  { id: 'r5', titulo: 'Actualizar honorarios trimestre',         caso: '—',                                  fecha: '30 may 2026', hora: '17:00', tipo: 'Administrativo', kind: 'info' },
];

export const EQUIPOS = [
  { id: 'eq1', nombre: 'Laboral',           lider: 'Ana Martínez',    lid: 1, miembros: 4, casos: 12 },
  { id: 'eq2', nombre: 'Comercial',         lider: 'Diego Ramírez',   lid: 2, miembros: 5, casos: 18 },
  { id: 'eq3', nombre: 'Civil y Familia',   lider: 'Laura Sánchez',   lid: 3, miembros: 3, casos: 9  },
  { id: 'eq4', nombre: 'Contencioso Adm.',  lider: 'Diego Ramírez',   lid: 2, miembros: 2, casos: 5  },
];

export const USUARIOS = [
  { id: 'u1', nombre: 'Ana Martínez',    email: 'ana@estudio.legal',     rol: 'Admin',     equipo: 'Laboral',         estado: 'Activo',  ult: 'Hace 2 min',  idx: 1 },
  { id: 'u2', nombre: 'Diego Ramírez',   email: 'diego@estudio.legal',   rol: 'Abogado',   equipo: 'Comercial',       estado: 'Activo',  ult: 'Hace 12 min', idx: 2 },
  { id: 'u3', nombre: 'Laura Sánchez',   email: 'laura@estudio.legal',   rol: 'Abogada',   equipo: 'Civil y Familia', estado: 'Activo',  ult: 'Hace 1 h',    idx: 3 },
  { id: 'u4', nombre: 'Sofía García',    email: 'sofia@estudio.legal',   rol: 'Paralegal', equipo: 'Laboral',         estado: 'Activo',  ult: 'Hace 3 h',    idx: 4 },
  { id: 'u5', nombre: 'Martín Ibáñez',   email: 'martin@estudio.legal',  rol: 'Paralegal', equipo: 'Comercial',       estado: 'Inactivo',ult: 'Hace 4 días', idx: 5 },
  { id: 'u6', nombre: 'Camila Ruiz',     email: 'camila@estudio.legal',  rol: 'Asistente', equipo: 'Comercial',       estado: 'Activo',  ult: 'Hace 5 h',    idx: 6 },
];
