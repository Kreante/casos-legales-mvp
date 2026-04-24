import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { useStore } from '../store/StoreContext.jsx';

export default function PageConfig() {
  const { state, dispatch } = useStore();
  const s = state.settings;
  const [section, setSection] = useState('general');

  const update = (patch) => dispatch({ type: 'SETTINGS_UPDATE', payload: patch });
  const setNotif = (k) => update({ notif: { ...s.notif, [k]: !s.notif[k] } });
  const setSeg = (k) => update({ seg: { ...s.seg, [k]: !s.seg[k] } });

  const sections = [
    { id: 'general',  label: 'General',           icon: 'settings' },
    { id: 'estudio',  label: 'Datos del estudio', icon: 'building' },
    { id: 'notif',    label: 'Notificaciones',    icon: 'bell' },
    { id: 'integ',    label: 'Integraciones',     icon: 'shield' },
    { id: 'fact',     label: 'Facturación',       icon: 'dollar' },
    { id: 'seg',      label: 'Seguridad',         icon: 'shield' },
  ];

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Configuración</h1>
          <p className="page-subtitle">Preferencias del estudio y de tu cuenta</p>
        </div>
      </div>
      <div className="settings-grid">
        <nav className="settings-nav">
          {sections.map((sec) => (
            <button
              key={sec.id}
              className={`sn-item ${section === sec.id ? 'active' : ''}`}
              onClick={() => setSection(sec.id)}
            >
              <Icon name={sec.icon} size={15}/> {sec.label}
            </button>
          ))}
        </nav>
        <div className="card">
          {section === 'general' && (
            <>
              <div className="section-card">
                <div className="sc-head"><h4 className="sc-title">Idioma y región</h4></div>
                <div className="kv-grid">
                  <div className="field">
                    <label>Idioma</label>
                    <select defaultValue="es-AR">
                      <option value="es-AR">Español (Argentina)</option>
                      <option value="es-MX">Español (México)</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Zona horaria</label>
                    <select defaultValue="GMT-3">
                      <option>GMT-3 — Buenos Aires</option>
                      <option>GMT-5 — Bogotá / CDMX</option>
                      <option>GMT-6 — CDMX</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Formato de fecha</label>
                    <select><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select>
                  </div>
                  <div className="field">
                    <label>Moneda</label>
                    <select>
                      <option>ARS — Peso argentino</option>
                      <option>USD — Dólar</option>
                      <option>MXN — Peso mexicano</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="section-card">
                <div className="sc-head"><h4 className="sc-title">Apariencia</h4></div>
                <div className="kv-grid">
                  <div>
                    <div className="kv-label">Tema</div>
                    <div className="seg" style={{ maxWidth: 280, marginTop: 8 }}>
                      {[['light','Claro'],['dark','Oscuro']].map(([k, l]) => (
                        <button key={k} className={s.theme === k ? 'active' : ''} onClick={() => update({ theme: k })}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="kv-label">Barra lateral</div>
                    <div className="seg" style={{ maxWidth: 280, marginTop: 8 }}>
                      {[['dark','Oscura'],['light','Clara']].map(([k, l]) => (
                        <button key={k} className={s.sidebar === k ? 'active' : ''} onClick={() => update({ sidebar: k })}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="kv-label">Color de acento</div>
                    <div className="seg" style={{ maxWidth: 420, marginTop: 8, flexWrap: 'wrap' }}>
                      {[['indigo','Indigo'],['violet','Violeta'],['cobalt','Cobalto'],['emerald','Esmeralda'],['ochre','Ocre']].map(([k, l]) => (
                        <button key={k} className={s.accent === k ? 'active' : ''} onClick={() => update({ accent: k })}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="kv-label">Densidad de tabla</div>
                    <div className="seg" style={{ maxWidth: 280, marginTop: 8 }}>
                      {[['comfy','Cómoda'],['standard','Estándar'],['compact','Compacta']].map(([k, l]) => (
                        <button key={k} className={s.density === k ? 'active' : ''} onClick={() => update({ density: k })}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-card" style={{ borderBottom: 'none' }}>
                <div className="muted" style={{ fontSize: 12.5 }}>Los cambios se aplican automáticamente y se guardan en tu dispositivo.</div>
              </div>
            </>
          )}
          {section === 'estudio' && (
            <div className="section-card" style={{ borderBottom: 'none' }}>
              <div className="sc-head"><h4 className="sc-title">Datos del estudio</h4></div>
              <div className="kv-grid">
                <div className="field"><label>Razón social</label><input defaultValue="Estudio Martínez & Asociados"/></div>
                <div className="field"><label>CUIT / RFC</label><input defaultValue="30-71234567-9"/></div>
                <div className="field"><label>Matrícula</label><input defaultValue="T° 142 F° 88"/></div>
                <div className="field"><label>Email de contacto</label><input defaultValue="contacto@estudio.legal"/></div>
                <div className="field" style={{ gridColumn: '1/-1' }}>
                  <label>Domicilio</label><input defaultValue="Av. Corrientes 1234, Piso 7, CABA"/>
                </div>
              </div>
              <div className="row" style={{ gap: 8, justifyContent: 'flex-end', marginTop: 18 }}>
                <button className="btn btn-primary btn-sm">Guardar cambios</button>
              </div>
            </div>
          )}
          {section === 'notif' && (
            <div className="section-card" style={{ borderBottom: 'none' }}>
              <div className="sc-head"><h4 className="sc-title">Canales y alertas</h4></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  ['email',    'Notificaciones por email', 'Resumen diario y alertas críticas a tu correo.'],
                  ['push',     'Notificaciones push',      'Alertas en tiempo real en navegador y móvil.'],
                  ['audiencia','Audiencias',               'Recordatorios 24h antes de audiencias agendadas.'],
                  ['plazos',   'Plazos judiciales',        'Avisos 7 / 3 / 1 días antes del vencimiento.'],
                  ['reportes', 'Reporte semanal',          'Resumen de cartera todos los lunes a las 09:00.'],
                ].map(([k, label, desc]) => (
                  <div key={k} className="between" style={{ padding: '14px 0', borderTop: '1px solid var(--c-divider)' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{desc}</div>
                    </div>
                    <button
                      className="toggle-sw"
                      data-on={s.notif[k] ? 'true' : 'false'}
                      onClick={() => setNotif(k)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === 'integ' && (
            <div className="section-card" style={{ borderBottom: 'none' }}>
              <div className="sc-head"><h4 className="sc-title">Integraciones disponibles</h4></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  { n: 'Sistema de Notificaciones Electrónicas', k: 'success', s: 'Conectado' },
                  { n: 'MEV / Mesa de Entradas Virtual',          k: 'success', s: 'Conectado' },
                  { n: 'AFIP — Facturación electrónica',          k: 'success', s: 'Conectado' },
                  { n: 'Google Calendar',                          k: 'muted',   s: 'Desconectado' },
                  { n: 'Microsoft Outlook',                        k: 'muted',   s: 'Desconectado' },
                  { n: 'Mercado Pago',                             k: 'success', s: 'Conectado' },
                ].map((it, i) => (
                  <div className="card" key={i} style={{ padding: 16, boxShadow: 'none' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 8 }}>{it.n}</div>
                    <div className="between">
                      <span className={`pill ${it.k}`}><span className="pill-dot"/>{it.s}</span>
                      <button className="btn btn-secondary btn-sm">{it.k === 'success' ? 'Configurar' : 'Conectar'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === 'fact' && (
            <div className="section-card" style={{ borderBottom: 'none' }}>
              <div className="sc-head"><h4 className="sc-title">Configuración de facturación</h4></div>
              <div className="kv-grid">
                <div className="field"><label>Punto de venta</label><input defaultValue="0001"/></div>
                <div className="field"><label>Próximo nº</label><input defaultValue="00000215"/></div>
                <div className="field">
                  <label>IVA por defecto</label>
                  <select><option>21%</option><option>10.5%</option><option>0%</option></select>
                </div>
                <div className="field">
                  <label>Plazo de pago default</label>
                  <select><option>30 días</option><option>15 días</option><option>60 días</option></select>
                </div>
              </div>
            </div>
          )}
          {section === 'seg' && (
            <div className="section-card" style={{ borderBottom: 'none' }}>
              <div className="sc-head"><h4 className="sc-title">Seguridad de la cuenta</h4></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  ['twofa',      'Autenticación en dos pasos (2FA)', 'Solicitar código adicional al iniciar sesión.'],
                  ['autoLogout', 'Cierre de sesión automático',       'Cerrar sesión tras 30 min de inactividad.'],
                  ['auditoria',  'Auditoría de accesos',              'Registrar dispositivos e IPs con acceso.'],
                ].map(([k, label, desc]) => (
                  <div key={k} className="between" style={{ padding: '14px 0', borderTop: '1px solid var(--c-divider)' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{desc}</div>
                    </div>
                    <button className="toggle-sw" data-on={s.seg[k] ? 'true' : 'false'} onClick={() => setSeg(k)}/>
                  </div>
                ))}
                <div style={{ marginTop: 18 }}>
                  <button className="btn btn-secondary btn-sm">Cambiar contraseña</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
