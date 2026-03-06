import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import './DashboardPage.css';

const STATS = [
  { label: 'Total Titulares', value: '2,543', change: '+12%', changeLabel: 'vs mes anterior', icon: <UserStatIcon />, color: 'gold' },
  { label: 'Dependientes', value: '4,120', change: '+5%', changeLabel: 'vs mes anterior', icon: <UsersStatIcon />, color: 'gold' },
  { label: 'Empresas', value: '86', change: '+2', changeLabel: 'nuevas este mes', icon: <BuildingStatIcon />, color: 'gold' },
  { label: 'Pendientes', value: '14', change: '⚠ Atención', changeLabel: 'requieren revisión', icon: <ClockStatIcon />, color: 'warn' },
];

const RECENT = [
  { initials: 'JR', color: '#3b82f6', name: 'Juan Rodríguez', time: 'Hace 2 horas', cedula: '8-765-1234', empresa: 'TechSolutions S.A.', tipo: 'Titular', estado: 'Activo' },
  { initials: 'AM', color: '#f0a500', name: 'Ana Martínez', time: 'Hace 4 horas', cedula: '4-123-4567', empresa: 'Logística Global', tipo: 'Dependiente', estado: 'Activo' },
  { initials: 'CP', color: '#10b981', name: 'Carlos Perez', time: 'Ayer', cedula: '3-456-7890', empresa: 'Inversiones 2020', tipo: 'Titular', estado: 'Pendiente' },
  { initials: 'LS', color: '#8b5cf6', name: 'Luisa Sanchez', time: 'Ayer', cedula: '8-987-6543', empresa: 'TechSolutions S.A.', tipo: 'Dependiente', estado: 'Activo' },
  { initials: 'RM', color: '#ef4444', name: 'Roberto Mendez', time: '23 Oct', cedula: '9-111-2222', empresa: 'Banco Nacional', tipo: 'Titular', estado: 'Activo' },
];

export default function DashboardPage() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <TopBar
          title="Resumen General"
          subtitle="Bienvenido de vuelta, aquí está lo que sucede hoy."
          actionLabel="Nueva Afiliación"
          onAction={() => {}}
        />
        <div className="dashboard-content">
          {/* Stats */}
          <div className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className={`stat-card ${s.color}`}>
                <div className="stat-info">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-change">
                    <span className="stat-change-val">{s.change}</span>
                    {' '}{s.changeLabel}
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
              <button className="recent-ver-btn">Ver todos →</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>NOMBRE COMPLETO</th>
                    <th>CÉDULA</th>
                    <th>EMPRESA</th>
                    <th>TIPO</th>
                    <th>ESTADO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT.map((r) => (
                    <tr key={r.cedula}>
                      <td>
                        <div className="affiliate-cell">
                          <div className="affiliate-avatar" style={{ background: r.color }}>
                            {r.initials}
                          </div>
                          <div>
                            <div className="affiliate-name">{r.name}</div>
                            <div className="affiliate-time">{r.time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="cell-cedula">{r.cedula}</td>
                      <td>{r.empresa}</td>
                      <td>{r.tipo}</td>
                      <td>
                        <span className={`badge ${r.estado === 'Activo' ? 'badge-active' : 'badge-pending'}`}>
                          {r.estado}
                        </span>
                      </td>
                      <td>
                        <button className="row-menu-btn">⋮</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
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