import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getCompanies, deleteCompany, updateCompany } from '../api/companyApi';
import { usePermissions } from '../hooks/usePermissions';
import './EmpresasPage.css';

export default function EmpresasPage() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('todas');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { canCreate, canEdit, canDelete } = usePermissions();

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    let result = companies;
    if (tab === 'activas') result = result.filter(c => c.isActive);
    if (tab === 'inactivas') result = result.filter(c => !c.isActive);
    if (search) result = result.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.ruc.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [companies, tab, search]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await getCompanies();
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (company) => {
    try {
      await updateCompany(company.id, { ...company, isActive: !company.isActive });
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta empresa?')) return;
    try {
      await deleteCompany(id);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-PA', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Empresas Afiliadas</h1>
            <p className="page-subtitle">Gestione la información y estado de las empresas registradas.</p>
          </div>
          <div className="page-header-actions">
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar empresa o RNC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {canCreate('empresas') && (
              <button className="btn-primary-action" onClick={() => navigate('/empresas/nueva')}>
                <PlusIcon /> Nueva Empresa
              </button>
            )}
          </div>
        </div>

        <div className="page-content">
          {/* Tabs */}
          <div className="tabs-row">
            <div className="tabs">
              {[
                { key: 'todas', label: `Todas ${companies.length}` },
                { key: 'activas', label: `Activas ${companies.filter(c => c.isActive).length}` },
                { key: 'inactivas', label: `Inactivas ${companies.filter(c => !c.isActive).length}` },
              ].map(t => (
                <button
                  key={t.key}
                  className={`tab ${tab === t.key ? 'active' : ''}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="table-panel">
            {loading ? (
              <div className="empty-state">Cargando...</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">No se encontraron empresas.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>EMPRESA</th>
                      <th>CONTACTO</th>
                      <th>REGISTRO</th>
                      <th>ESTADO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id}>
                        <td className="cell-id">#{c.id}</td>
                        <td>
                          <div className="company-cell">
                            <div className="company-icon">
                              <BuildingIcon />
                            </div>
                            <div>
                              <div className="company-name">{c.name}</div>
                              <div className="company-rnc">RNC: {c.rnc}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="company-contact">{c.address}</div>
                          <div className="company-phone">{c.phone}</div>
                        </td>
                        <td>{formatDate(c.createdAt)}</td>
                        <td>
                          <span className={`badge ${c.isActive ? 'badge-active' : 'badge-inactive'}`}>
                            {c.isActive ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            {canEdit('empresas') && (
                              <button
                                className="btn-row-action"
                                title="Editar"
                                onClick={() => navigate(`/empresas/editar/${c.id}`)}
                              >
                                <EditIcon />
                              </button>
                            )}
                            <button
                              className="btn-row-action"
                              title={c.isActive ? 'Desactivar' : 'Activar'}
                              onClick={() => handleToggleStatus(c)}
                            >
                              <ToggleIcon active={c.isActive} />
                            </button>
                            {canDelete('empresas') && (
                              <button
                                className="btn-row-action danger"
                                title="Eliminar"
                                onClick={() => handleDelete(c.id)}
                              >
                                <TrashIcon />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function BuildingIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function EditIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}
function ToggleIcon({ active }) {
  return active
    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>;
}