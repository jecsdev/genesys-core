import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getProfile, updateProfile, changePassword } from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import './PerfilPage.css';

export default function PerfilPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [form, setForm] = useState({ fullName: '', userName: '' });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      setProfile(res.data);
      setForm({ fullName: res.data.fullName, userName: res.data.userName });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await updateProfile(form);
      setSuccessMsg('Perfil actualizado correctamente.');
      fetchProfile();
    } catch {
      setErrorMsg('Error al actualizar el perfil.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordSuccess('Contraseña actualizada correctamente.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Error al cambiar la contraseña.');
    } finally {
      setSavingPassword(false);
    }
  };

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Nunca';
    return new Date(dateStr).toLocaleDateString('es-DO', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  if (loading) return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="empty-state">Cargando...</div>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-back" onClick={() => navigate('/configuracion')}>
              <BackIcon />
            </button>
            <div>
              <h1 className="page-title">Mi Perfil</h1>
            </div>
          </div>
          <button className="btn-save" onClick={handleSaveProfile} disabled={saving}>
            <SaveIcon />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

        <div className="perfil-content">
          <div className="perfil-left">
            {/* Avatar Card */}
            <div className="avatar-card">
              <div className="perfil-avatar-wrap">
                <div className="perfil-avatar">
                  {getInitials(profile?.fullName || '')}
                </div>
              </div>
              <h2 className="perfil-name">{profile?.fullName}</h2>
              <p className="perfil-role">{profile?.role}</p>
              <div className="perfil-stats">
                <div className="perfil-stat">
                  <span className="perfil-stat-label">Miembro desde</span>
                  <span className="perfil-stat-value">{formatDate(profile?.createdAt)}</span>
                </div>
                <div className="perfil-stat">
                  <span className="perfil-stat-label">Último acceso</span>
                  <span className="perfil-stat-value">{formatDate(profile?.lastLogin)}</span>
                </div>
              </div>
              <button className="btn-logout-perfil" onClick={() => { logout(); navigate('/'); }}>
                <LogoutIcon /> Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="perfil-right">
            {/* Info Personal */}
            <div className="form-section">
              <div className="form-section-header">
                <UserIcon />
                <div>
                  <h2 className="form-section-title">Información Personal</h2>
                  <p className="form-section-subtitle">Actualiza tu nombre y correo electrónico.</p>
                </div>
              </div>

              {successMsg && <div className="alert-success">{successMsg}</div>}
              {errorMsg && <div className="form-error">{errorMsg}</div>}

              <div className="form-grid">
                <div className="form-group full">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))}
                  />
                </div>
                <div className="form-group full">
                  <label>Usuario</label>
                  <input
                    type="text"
                    value={form.userName}
                    onChange={(e) => setForm(p => ({ ...p, userName: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Cambiar Contraseña */}
            <div className="form-section">
              <div className="form-section-header">
                <LockIcon />
                <div>
                  <h2 className="form-section-title">Cambiar Contraseña</h2>
                  <p className="form-section-subtitle">Cambia tu contraseña periódicamente para mayor seguridad.</p>
                </div>
              </div>

              {passwordSuccess && <div className="alert-success">{passwordSuccess}</div>}
              {passwordError && <div className="form-error">{passwordError}</div>}

              <div className="form-grid">
                <div className="form-group full">
                  <label>Contraseña Actual</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Repite la contraseña"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <button className="btn-save" onClick={handleChangePassword} disabled={savingPassword}>
                  <LockIcon size={15} />
                  {savingPassword ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons ──
function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
}
function SaveIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
}
function UserIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function LockIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}
function LogoutIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}