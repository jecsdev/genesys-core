import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import {
  downloadCompaniesReport,
  downloadAffiliatesReport,
  downloadDependentsReport,
  downloadAffiliatesByCompanyReport,
} from '../api/reportApi';
import { usePermissions } from '../hooks/usePermissions';
import './ReportesPage.css';

const REPORTS = [
  {
    id: 'companies',
    title: 'Listado de Empresas',
    description: 'Listado completo de todas las empresas registradas, incluyendo RNC, dirección y estado actual.',
    icon: <BuildingIcon />,
    fn: downloadCompaniesReport,
  },
  {
    id: 'affiliates',
    title: 'Listado de Titulares',
    description: 'Relación de titulares afiliados con sus datos personales, número de afiliado y empresa asociada.',
    icon: <UserIcon />,
    fn: downloadAffiliatesReport,
  },
  {
    id: 'dependents',
    title: 'Listado de Dependientes',
    description: 'Lista global de dependientes registrados, vinculados a sus respectivos titulares.',
    icon: <UsersIcon />,
    fn: downloadDependentsReport,
  },
  {
    id: 'affiliates-by-company',
    title: 'Titulares por Empresa',
    description: 'Detalle agrupado que muestra la cantidad y detalle de titulares activos por cada empresa.',
    icon: <ChartIcon />,
    fn: downloadAffiliatesByCompanyReport,
  },
];

export default function ReportesPage() {
  const [loading, setLoading] = useState({});
  const [success, setSuccess] = useState({});
  const { canDownload } = usePermissions();

  const handleDownload = async (report) => {
    setLoading(prev => ({ ...prev, [report.id]: true }));
    setSuccess(prev => ({ ...prev, [report.id]: false }));
    try {
      await report.fn();
      setSuccess(prev => ({ ...prev, [report.id]: true }));
      setTimeout(() => setSuccess(prev => ({ ...prev, [report.id]: false })), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, [report.id]: false }));
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Centro de Reportes</h1>
          </div>
        </div>

        <div className="page-content">
          <div className="reports-section">
            <h2 className="reports-section-title">Reportes Generales</h2>
            <p className="reports-section-subtitle">
              Seleccione un reporte para visualizar, imprimir o exportar los datos del sistema.
            </p>
          </div>

          <div className="reports-grid">
            {REPORTS.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-icon">{report.icon}</div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
                {canDownload('reportes') && (
                  <div className="report-actions">
                    <button
                      className={`btn-download ${success[report.id] ? 'success' : ''}`}
                      onClick={() => handleDownload(report)}
                      disabled={loading[report.id]}
                    >
                      {loading[report.id] ? (
                        <>
                          <SpinnerIcon /> Generando...
                        </>
                      ) : success[report.id] ? (
                        <>
                          <CheckIcon /> Descargado
                        </>
                      ) : (
                        <>
                          <DownloadIcon /> Descargar Excel
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
function BuildingIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function UserIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function UsersIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function ChartIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function SpinnerIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/><path d="M21 12a9 9 0 00-9-9"/></svg>;
}
function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}