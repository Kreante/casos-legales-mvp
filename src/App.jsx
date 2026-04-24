import { useState } from 'react';
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

const user = { name: 'Ana Martínez', firstName: 'Ana', role: 'Abogada Senior', avatarIdx: 1 };

export default function App() {
  const [page, setPage] = useState('home');
  const [caseId, setCaseId] = useState(null);
  const [modal, setModal] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const goCase = (id, fallback) => {
    if (id) { setCaseId(id); setPage('case-detail'); }
    else if (fallback) { setPage(fallback); setCaseId(null); }
  };
  const goNav = (id) => { setPage(id); setCaseId(null); };
  const openNew = (kind, casoId) => setModal({ kind, casoId });

  let content;
  if (page === 'home') content = <PageHome onCase={goCase} onNew={openNew} onNav={goNav} user={user}/>;
  else if (page === 'casos') content = <PageCases onCase={goCase} onNew={openNew}/>;
  else if (page === 'case-detail') content = <PageCaseDetail caseId={caseId} onCase={goCase} onNew={openNew}/>;
  else if (page === 'tareas') content = <PageTasks onCase={goCase} onNew={openNew}/>;
  else if (page === 'calendario') content = <PageCalendar onNew={openNew}/>;
  else if (page === 'alertas') content = <PageAlerts onCase={goCase}/>;
  else if (page === 'contactos') content = <PageContactos onCase={goCase}/>;
  else if (page === 'documentos') content = <PageDocumentos onCase={goCase}/>;
  else if (page === 'reportes') content = <PageReportes/>;
  else if (page === 'facturacion') content = <PageFacturacion/>;
  else if (page === 'plantillas') content = <PagePlantillas/>;
  else if (page === 'recordatorios') content = <PageRecordatorios/>;
  else if (page === 'equipos') content = <PageEquipos/>;
  else if (page === 'usuarios') content = <PageUsuarios/>;
  else if (page === 'config') content = <PageConfig/>;
  else content = <PagePlaceholder title="Sección" subtitle="Próximamente"/>;

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

      {modal?.kind === 'caso'   && <ModalCreateCase  onClose={() => setModal(null)}/>}
      {modal?.kind === 'evento' && <ModalCreateEvent onClose={() => setModal(null)} casoId={modal.casoId}/>}
      {modal?.kind === 'tarea'  && <ModalCreateTask  onClose={() => setModal(null)} casoId={modal.casoId}/>}
    </div>
  );
}
