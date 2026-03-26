import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { createDependent, getDependent, updateDependent } from '../api/dependentApi';
import { getAffiliates } from '../api/affiliateApi';
import './NuevoDependientePage.css';

const RELATIONSHIPS = ['Hijo/a', 'Cónyuge', 'Padre/Madre', 'Hermano/a', 'Otro'];

export default function NuevoDependientePage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const location = useLocation();

  // Permite pre-seleccionar titular si viene desde la página de titulares
  const preselectedAffiliateId = location.state?.affiliateId || '';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    relationship: '',
    phone: '',
    isActive: true,
    affiliateId: preselectedAffiliateId,
  });
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dependentNumber, setDependentNumber] = useState('');

  useEffect(() => {
    getAffiliates().then(res => setAffiliates(res.data));
    if (isEditing) {
      getDependent(id).then(res => {
        const d = res.data;
        setForm({
          firstName: d.firstName,
          lastName: d.lastName,
          identification: d.identification,
          relationship: d.relationship,
          phone: d.phone,
          isActive: d.isActive,
          affiliateId: d.affiliateId,
        });
        setDependentNumber(d.dependentNumber);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form, affiliateId: parseInt(form.affiliateId) };
      if (isEditing) {
        await updateDependent(id, payload);
      } else {
        await createDependent(payload);
      }
      navigate('/dependientes');
    } catch {
      setError('Ocurrió un error al guardar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-back" onClick={() => navigate('/dependientes')}>
              <BackIcon />
            </button>
            <div>
              <h1 className="page-title">
                {isEditing ? 'Editar Dependiente' : 'Registrar Nuevo Dependiente'}
              </h1>
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn-cancel" onClick={() => navigate('/dependientes')}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSubmit} disabled={loading}>
              <SaveIcon />
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Guardar Dependiente'}
            </button>
          </div>
        </div>

        <div className="form-content">
          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Información Personal */}
            <div className="form-section">
              <div className="form-section-header">
                <UserIcon />
                <div>
                  <h2 className="form-section-title">Información Personal</h2>
                  <p className="form-section-subtitle">Datos básicos del dependiente.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Nombre Completo *</label>
                  <div className="name-grid">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellido"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cédula / Identificación *</label>
                  <input
                    type="text"
                    name="identification"
                    placeholder="Ej. 001-1234567-8"
                    value={form.identification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Ej. +1 809-000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Datos de Afiliación */}
            <div className="form-section">
              <div className="form-section-header">
                <LinkIcon />
                <div>
                  <h2 className="form-section-title">Datos de Afiliación</h2>
                  <p className="form-section-subtitle">Asociación con el titular.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Titular Asociado *</label>
                  <select
                    name="affiliateId"
                    value={form.affiliateId}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccionar titular...</option>
                    {affiliates.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.firstName} {a.lastName} — {a.affiliateNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Parentesco *</label>
                  <select
                    name="relationship"
                    value={form.relationship}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccionar parentesco...</option>
                    {RELATIONSHIPS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de Dependiente</label>
                  <div className="auto-field">
                    <input
                      type="text"
                      value={isEditing ? dependentNumber : 'Se genera automáticamente'}
                      disabled
                      className="input-disabled"
                    />
                    {!isEditing && <span className="auto-badge">AUTO</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    name="isActive"
                    value={form.isActive}
                    onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
                    className="form-select"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
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
function LinkIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
}