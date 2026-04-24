import { useEffect, useState } from 'react';
import { useStore } from './store/StoreContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import PageHome from './pages/PageHome.jsx';
import PageCases from './pages/PageCases.jsx';
import PageCaseDetail from './pages/PageCaseDetail.jsx';
import PageTasks from './pages/PageTasks.jsx';
import PageCalendar from './pages/PageCalendar.jsx';
import PageAlerts from './pages/PageAlerts.jsx';
import PageContactos from './pages/PageContactos.jsx';
import PageDocumentos from './pages/PageDocumentos.jsx';
import PageReportes from './pages/PageReportes.jsx';
import PageFacturacion from './pages/PageFacturacion.jsx';
import PagePlantillas from './pages/PagePlantillas.jsx';
import PageRecordatorios from './pages/PageRecordatorios.jsx';
import PageEquipos from './pages/PageEquipos.jsx';
import PageUsuarios from './pages/PageUsuarios.jsx';
import PageConfig from './pages/PageConfig.jsx';
import PagePlaceholder from './pages/PagePlaceholder.jsx';
import ModalCreateCase from './modals/ModalCreateCase.jsx';
import ModalCreateEvent from './modals/ModalCreateEvent.jsx';
import ModalCreateTask from './modals/ModalCreateTask.jsx';
import ModalCreateContacto from './modals/ModalCreateContacto.jsx';
import ModalCreateDocumento from './modals/ModalCreateDocumento.jsx';
import ModalCreateFactura from './modals/ModalCreateFactura.jsx';
import ModalCreatePlantilla from './modals/ModalCreatePlantilla.jsx';
import ModalCreateRecordatorio from './modals/ModalCreateRecordatorio.jsx';
import ModalCreateEquipo from './modals/ModalCreateEquipo.jsx';
import ModalCreateUsuario from './modals/ModalCreateUsuario.jsx';

const user = { name: 'Ana Martínez', firstName: 'Ana', role: 'Abogada Senior', avatarIdx: 1 };

const MODALS = {
  caso: ModalCreateCase, evento: ModalCreateEvent, tarea: ModalCreateTask,
  contacto: ModalCreateContacto, documento: ModalCreateDocumento,
  factura: ModalCreateFactura, plantilla: ModalCreatePlantilla,
  recordatorio: ModalCreateRecordatorio, equipo: ModalCreateEquipo, usuario: ModalCreateUsuario,
};

export default function App() {
  const { state } = useStore();
  const [page, setPage] = useState('home');
  const [caseId, setCaseId] = useState(null);
  const [modal, setModal] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  // Aplicar settings (tema / sidebar / acento / densidad) al root
  useEffect(() => {
    const s = state.settings || {};
    const root = document.documentElement;
    root.setAttribute('data-theme', s.theme || 'light');
    root.setAttribute('data-sidebar', s.sidebar || 'dark');
    root.setAttribute('data-accent', s.accent || 'indigo');
    const body = document.body;
    body.classList.remove('density-compact', 'density-standard', 'density-comfy');
    body.classList.add(`density-${s.density || 'standard'}`);
  }, [state.settings]);

  const goCase = (id, fallback) => {
    if (id) { setCaseId(id); setPage('case-detail'); }
    else if (fallback) { setPage(fallback); setCaseId(null); }
  };
  const goNav = (id) => { setPage(id); setCaseId(null); };
  const openNew = (kind, extra) => setModal({ kind, ...(typeof extra === 'object' ? extra : { casoId: extra }) });

  let content;
  if (page === 'home') content = <PageHome onCase={goCase} onNew={openNew} onNav={goNav} user={user}/>;
  else if (page === 'casos') content = <PageCases onCase={goCase} onNew={openNew}/>;
  else if (page === 'case-detail') content = <PageCaseDetail caseId={caseId} onCase={goCase} onNew={openNew}/>;
  else if (page === 'tareas') content = <PageTasks onCase={goCase} onNew={openNew}/>;
  else if (page === 'calendario') content = <PageCalendar onNew={openNew}/>;
  else if (page === 'alertas') content = <PageAlerts onCase={goCase}/>;
  else if (page === 'contactos') content = <PageContactos onNew={openNew}/>;
  else if (page === 'documentos') content = <PageDocumentos onCase={goCase} onNew={openNew}/>;
  else if (page === 'reportes') content = <PageReportes/>;
  else if (page === 'facturacion') content = <PageFacturacion onNew={openNew}/>;
  else if (page === 'plantillas') content = <PagePlantillas onNew={openNew}/>;
  else if (page === 'recordatorios') content = <PageRecordatorios onCase={goCase} onNew={openNew}/>;
  else if (page === 'equipos') content = <PageEquipos onNew={openNew}/>;
  else if (page === 'usuarios') content = <PageUsuarios onNew={openNew}/>;
  else if (page === 'config') content = <PageConfig/>;
  else content = <PagePlaceholder title="Sección" subtitle="Próximamente"/>;

  const ModalComp = modal && MODALS[modal.kind];

  return (
    <div className="app" data-collapsed={collapsed} data-screen-label={page}>
      <Sidebar
        current={page === 'case-detail' ? 'casos' : page}
        onNav={goNav}
        user={user}
      />
      <div className="main">
        <Topbar onCollapse={() => setCollapsed((c) => !c)} onNew={openNew}/>
        <div className="content">{content}</div>
      </div>
      {ModalComp && <ModalComp onClose={() => setModal(null)} casoId={modal.casoId}/>}
    </div>
  );
}
