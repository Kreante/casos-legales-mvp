import Modal from './Modal.jsx';
import Icon from '../components/Icon.jsx';
import { useStore } from '../store/StoreContext.jsx';

const EXTENSION = { Laboral: '.docx', Comercial: '.docx', Civil: '.docx', Familia: '.docx', General: '.docx' };

export default function ModalDetallePlantilla({ onClose, id }) {
  const { state, dispatch } = useStore();
  const p = state.plantillas.find((x) => x.id === id);
  if (!p) return null;

  const usar = () => {
    const casoId = state.casos[0]?.id;
    if (!casoId) { window.alert('Necesitás al menos un caso para aplicar la plantilla.'); return; }
    dispatch({
      type: 'DOCUMENTO_CREATE',
      payload: {
        nombre: `${p.nombre}${EXTENSION[p.cat] || '.docx'}`,
        tipo: p.cat === 'Comercial' ? 'Contrato' : p.cat === 'Laboral' ? 'Demanda' : 'Escrito',
        casoId,
        autor: 'Ana Martínez',
        idx: 1,
        tamano: '—',
        firmado: false,
      },
    });
    window.alert(`Documento creado a partir de la plantilla "${p.nombre}". Lo encontrás en Documentos.`);
    onClose();
  };

  const del = () => {
    if (window.confirm(`¿Eliminar plantilla "${p.nombre}"?`)) {
      dispatch({ type: 'PLANTILLA_DELETE', payload: { id } });
      onClose();
    }
  };

  const footer = (
    <>
      <button className="btn btn-secondary" onClick={del}><Icon name="trash" size={14}/> Eliminar</button>
      <div style={{ flex: 1 }}/>
      <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
      <button className="btn btn-primary" onClick={usar}>Usar plantilla <Icon name="arrow-right" size={13}/></button>
    </>
  );

  return (
    <Modal title={p.nombre} subtitle={`Categoría: ${p.cat}`} icon="doc" onClose={onClose} footer={footer} width={620}>
      <div className="kv-grid">
        <div><div className="kv-label">Categoría</div><div className="kv-value">{p.cat}</div></div>
        <div><div className="kv-label">Usos totales</div><div className="kv-value">{p.uso}</div></div>
        <div><div className="kv-label">Última actualización</div><div className="kv-value">{p.actu}</div></div>
        <div><div className="kv-label">Formato</div><div className="kv-value mono">{EXTENSION[p.cat] || '.docx'}</div></div>
      </div>

      <div className="section-card" style={{ borderBottom: 'none', marginTop: 18 }}>
        <div className="sc-head"><h4 className="sc-title">Vista previa</h4></div>
        <div
          style={{
            padding: 20, borderRadius: 10, background: 'var(--c-surface-low)',
            border: '1px dashed var(--c-border)', color: 'var(--c-text-3)', fontSize: 13, lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>{p.nombre.toUpperCase()}</div>
          <p>En la ciudad de [CIUDAD], a los [DÍA] días del mes de [MES] de [AÑO], entre [PARTE A] y [PARTE B], se deja constancia de lo siguiente:</p>
          <p>PRIMERO.— Objeto y encuadre legal conforme a la legislación vigente aplicable al fuero <strong>{p.cat}</strong>.</p>
          <p>SEGUNDO.— Condiciones particulares, plazos, obligaciones de las partes y cláusulas especiales.</p>
          <p className="muted" style={{ fontSize: 12 }}>— Plantilla editable al aplicarla a un caso —</p>
        </div>
      </div>
    </Modal>
  );
}
