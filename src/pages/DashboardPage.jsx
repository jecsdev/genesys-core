import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getDashboardStats } from '../api/dashboardApi';
import { usePermissions } from '../hooks/usePermissions';
import './DashboardPage.css';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = usePermissions();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (fullName) =>
    fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const AVATAR_COLORS = ['#3b82f6', '#f0a500', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
  const getColor = (name) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHrs < 1) return 'Hace unos minutos';
    if (diffHrs < 24) return `Hace ${diffHrs} hora${diffHrs > 1 ? 's' : ''}`;
    if (diffDays === 1) return 'Ayer';
    return date.toLocaleDateString('es-DO', { day: '2-digit', month: 'short' });
  };

  const STATS_CONFIG = [
    {
      label: 'Total Titulares',
      value: stats?.totalAffiliates ?? 0,
      change: stats?.totalActive ?? 0,
      changeLabel: 'activos',
      icon: <UserStatIcon />,
    },
    {
      label: 'Dependientes',
      value: stats?.totalDependents ?? 0,
      change: null,
      changeLabel: 'registrados',
      icon: <UsersStatIcon />,
    },
    {
      label: 'Empresas',
      value: stats?.totalCompanies ?? 0,
      change: null,
      changeLabel: 'afiliadas',
      icon: <BuildingStatIcon />,
    },
    {
      label: 'Inactivos',
      value: stats?.totalInactive ?? 0,
      change: null,
      changeLabel: 'requieren revisión',
      icon: <ClockStatIcon />,
      warn: true,
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {/* TopBar */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Resumen General</h1>
            <p className="page-subtitle">Bienvenido de vuelta, aquí está lo que sucede hoy.</p>
          </div>
          {role === 'Administrator' && (
            <div className="page-header-actions">
              <button className="btn-primary-action" onClick={() => navigate('/titulares/nuevo')}>
                <PlusIcon /> Nueva Afiliación
              </button>
            </div>
          )}
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="empty-state">Cargando...</div>
          ) : (
            <>
              {/* Stats */}
              <div className="stats-grid">
                {STATS_CONFIG.map((s) => (
                  <div key={s.label} className={`stat-card ${s.warn ? 'warn' : ''}`}>
                    <div className="stat-info">
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-value">{s.value.toLocaleString()}</span>
                      <span className="stat-change">
                        {s.change !== null && (
                          <span className="stat-change-val">{s.change}</span>
                        )}{' '}
                        {s.changeLabel}
                      </span>
                    </div>
                    <div className="stat-icon">{s.icon}</div>
                  </div>
                ))}
              </div>

              {/* Recent Table */}
              <div className="recent-panel">
                <div className="recent-header">
                  <span className="recent-title">Afiliaciones Recientes</span>
                  <button className="recent-ver-btn" onClick={() => navigate('/titulares')}>
                    Ver todos →
                  </button>
                </div>

                {stats?.recentAffiliations?.length === 0 ? (
                  <div className="empty-state">No hay afiliaciones registradas aún.</div>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>NOMBRE COMPLETO</th>
                          <th>CÉDULA</th>
                          <th>EMPRESA</th>
                          <th>TIPO</th>
                          <th>ESTADO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.recentAffiliations?.map((r, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="affiliate-cell">
                                <div className="affiliate-avatar" style={{ background: getColor(r.fullName) }}>
                                  {getInitials(r.fullName)}
                                </div>
                                <div>
                                  <div className="affiliate-name">{r.fullName}</div>
                                  <div className="affiliate-time">{formatDate(r.createdAt)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="cell-cedula">{r.identification}</td>
                            <td>{r.companyName}</td>
                            <td>
                              <span className={`badge ${r.type === 'Titular' ? 'badge-titular' : 'badge-dependent'}`}>
                                {r.type}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${r.isActive ? 'badge-active' : 'badge-pending'}`}>
                                {r.isActive ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function UserStatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function UsersStatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function BuildingStatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function ClockStatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}