import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import './ConfiguracionPage.css';

// ── Role Mapper ──
const roleToSpanish = {
  Administrator: 'Administrador',
  Accountant: 'Contabilidad',
  Reader: 'Lector'
};

const roleToEnum = {
  Administrador: 'Administrator',
  Contabilidad: 'Accountant',
  Lector: 'Reader'
};

const ROLES = ['Administrador', 'Contabilidad', 'Lector']; // display en español

const ROLE_INFO = {
  Administrador: {
    description: 'Acceso total a todas las funciones y configuraciones del sistema.',
    color: '#f0a500',
    bg: '#fffbeb',
    enumValue: 'Administrator'
  },
  Contabilidad: {
    description: 'Puede crear, editar y aprobar afiliaciones. Sin acceso a configuración.',
    color: '#3b82f6',
    bg: '#eff6ff',
    enumValue: 'Accountant'
  },
  Lector: {
    description: 'Acceso de solo lectura a reportes y listados. No puede editar.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    enumValue: 'Reader'
  },
};

// Helpers
const getSpanishRole = (enumRole) => roleToSpanish[enumRole] || enumRole;
const getEnumRole = (spanishRole) => roleToEnum[spanishRole] || spanishRole;
const getRoleInfo = (enumRole) => ROLE_INFO[getSpanishRole(enumRole)] || null;

export default function ConfiguracionPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    fullName: '', userName: '', password: '', role: 'Contabilidad', isActive: true
  });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.userName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingUser(null);
    setForm({ fullName: '', userName: '', password: '', role: 'Contabilidad', isActive: true });
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setForm({
      fullName: user.fullName,
      userName: user.userName,
      password: '',
      role: getSpanishRole(user.role), 
      isActive: user.isActive
    });
    setFormError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    setFormError('');
    setSaving(true);
    try {
      const payload = {
        fullName: form.fullName,
        userName: form.userName,
        role: getEnumRole(form.role), 
        isActive: form.isActive
      };

      if (editingUser) {
        await updateUser(editingUser.id, payload);
      } else {
        await createUser({ ...payload, password: form.password });
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error al guardar. Intenta nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Nunca';
    return new Date(dateStr).toLocaleDateString('es-DO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const roleCount = (spanishRole) =>
    users.filter(u => u.role === getEnumRole(spanishRole)).length;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div>
            <h1 className="page-title">Configuración</h1>
            <p className="page-subtitle">Administración de usuarios y roles del sistema.</p>
          </div>
        </div>

        <div className="page-content">
          {/* Role Cards */}
          <div className="roles-grid">
            {ROLES.map(role => (
              <div key={role} className="role-card">
                <div className="role-card-header">
                  <div className="role-icon" style={{ background: ROLE_INFO[role].bg }}>
                    <RoleIcon role={role} color={ROLE_INFO[role].color} />
                  </div>
                  <button className="btn-ghost-sm">···</button>
                </div>
                <h3 className="role-name">{role}</h3>
                <p className="role-description">{ROLE_INFO[role].description}</p>
                <div className="role-footer">
                  <span className="role-count">+{roleCount(role)} usuarios</span>
                </div>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="table-panel">
            <div className="panel-header">
              <div className="search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Buscar usuario por nombre o correo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-primary-action" onClick={handleOpenCreate}>
                <PlusIcon /> Nuevo Usuario
              </button>
            </div>

            {loading ? (
              <div className="empty-state">Cargando...</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">No se encontraron usuarios.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>USUARIO</th>
                      <th>ROL ASIGNADO</th>
                      <th>ESTADO</th>
                      <th>ÚLTIMO ACCESO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="affiliate-cell">
                            <div className="affiliate-avatar" style={{
                              background: u.role === 'Administrator' ? '#f0a500'
                                : u.role === 'Accountant' ? '#3b82f6' : '#8b5cf6'
                            }}>
                              {getInitials(u.fullName)}
                            </div>
                            <div>
                              <div className="affiliate-name">{u.fullName}</div>
                              <div className="affiliate-id">{u.userName}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge" style={{
                            background: getRoleInfo(u.role)?.bg || '#f3f4f6',
                            color: getRoleInfo(u.role)?.color || '#374151'
                          }}>
                            {getSpanishRole(u.role)} {/* ← muestra en español */}
                          </span>
                        </td>
                        <td>
                          <div className="status-dot">
                            <span className={`dot ${u.isActive ? 'active' : 'inactive'}`}></span>
                            {u.isActive ? 'Activo' : 'Inactivo'}
                          </div>
                        </td>
                        <td className="last-login">{formatDate(u.lastLogin)}</td>
                        <td>
                          <div className="row-actions">
                            <button className="btn-row-action" onClick={() => handleOpenEdit(u)}>
                              <EditIcon />
                            </button>
                            <button className="btn-row-action danger" onClick={() => handleDelete(u.id)}>
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
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button className="btn-ghost-sm" onClick={() => setShowModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              {formError && <div className="form-error">{formError}</div>}
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  placeholder="Ej. María González"
                  value={form.fullName}
                  onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Nombre de Usuario *</label>
                <input
                  type="username"
                  placeholder="Ej. maria.gonzalez"
                  value={form.userName}
                  onChange={(e) => setForm(p => ({ ...p, userName: e.target.value }))}
                />
              </div>
              {!editingUser && (
                <div className="form-group">
                  <label>Contraseña *</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={form.password}
                    onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))}
                  className="form-select"
                >
                  {/* Muestra en español, envía en español (se convierte en handleSave) */}
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={form.isActive}
                  onChange={(e) => setForm(p => ({ ...p, isActive: e.target.value === 'true' }))}
                  className="form-select"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icons ──
function RoleIcon({ role, color }) {
  if (role === 'Administrador')
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (role === 'Contabilidad')
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
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
function CloseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}