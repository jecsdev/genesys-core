import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getDependents, deleteDependent } from '../api/dependentApi';
import { getAffiliates } from '../api/affiliateApi';
import './DependientesPage.css';

export default function DependientesPage() {
  const [dependents, setDependents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [search, setSearch] = useState('');
  const [filterAffiliate, setFilterAffiliate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    let result = dependents;
    if (filterAffiliate) result = result.filter(d => d.affiliateId === parseInt(filterAffiliate));
    if (filterStatus === 'activo') result = result.filter(d => d.isActive);
    if (filterStatus === 'inactivo') result = result.filter(d => !d.isActive);
    if (search) result = result.filter(d =>
      `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      d.identification.toLowerCase().includes(search.toLowerCase()) ||
      d.dependentNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.affiliateName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [dependents, search, filterAffiliate, filterStatus]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [depRes, affRes] = await Promise.all([getDependents(), getAffiliates()]);
      setDependents(depRes.data);
      setAffiliates(affRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este dependiente?')) return;
    try {
      await deleteDependent(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const getInitials = (firstName, lastName) =>
    `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  const AVATAR_COLORS = ['#3b82f6', '#f0a500', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
  const getColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

  const RELATIONSHIPS = ['Hijo/a', 'Cónyuge', 'Padre/Madre', 'Hermano/a', 'Otro'];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Gestión de Dependientes</h1>
          </div>
          <div className="page-header-actions">
            <button className="btn-export">
              <DownloadIcon /> Exportar
            </button>
            <button className="btn-primary-action" onClick={() => navigate('/dependientes/nuevo')}>
              <PlusIcon /> Registrar Dependiente
            </button>
          </div>
        </div>

        <div className="page-content">
          {/* Filtros */}
          <div className="filters-row">
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar por nombre, cédula o titular..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={filterAffiliate}
              onChange={(e) => setFilterAffiliate(e.target.value)}
            >
              <option value="">Todos los titulares</option>
              {affiliates.map(a => (
                <option key={a.id} value={a.id}>
                  {a.firstName} {a.lastName}
                </option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Estado: Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-panel">
            {loading ? (
              <div className="empty-state">Cargando...</div>
            ) : paginated.length === 0 ? (
              <div className="empty-state">No se encontraron dependientes.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>DEPENDIENTE</th>
                      <th>Nº DEPENDIENTE</th>
                      <th>TITULAR</th>
                      <th>PARENTESCO</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((d) => (
                      <tr key={d.id}>
                        <td>
                          <div className="affiliate-cell">
                            <div className="affiliate-avatar" style={{ background: getColor(d.id) }}>
                              {getInitials(d.firstName, d.lastName)}
                            </div>
                            <div>
                              <div className="affiliate-name">{d.firstName} {d.lastName}</div>
                              <div className="affiliate-id">ID: {d.identification}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-number">{d.dependentNumber}</span>
                        </td>
                        <td>
                          <div className="affiliate-name">{d.affiliateName}</div>
                          <div className="affiliate-id">{d.affiliateNumber}</div>
                        </td>
                        <td>
                          <span className="badge badge-relationship">{d.relationship}</span>
                        </td>
                        <td>
                          <span className={`badge ${d.isActive ? 'badge-active' : 'badge-inactive'}`}>
                            {d.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button
                              className="btn-row-action"
                              title="Editar"
                              onClick={() => navigate(`/dependientes/editar/${d.id}`)}
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn-row-action danger"
                              title="Eliminar"
                              onClick={() => handleDelete(d.id)}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="pagination">
                <span className="pagination-info">
                  Mostrando {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length} dependientes
                </span>
                <div className="pagination-controls">
                  <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      className={`page-btn ${page === p ? 'active' : ''}`}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  ))}
                  <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                </div>
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
function EditIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}