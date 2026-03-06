import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { createCompany, getCompany, updateCompany } from '../api/companyApi';
import './NuevaEmpresaPage.css';

export default function NuevaEmpresaPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    rnc: '',
    phone: '',
    address: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      getCompany(id).then(res => setForm({
        name: res.data.name,
        rnc: res.data.rnc,
        phone: res.data.phone,
        address: res.data.address,
        isActive: res.data.isActive,
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEditing) {
        await updateCompany(id, form);
      } else {
        await createCompany(form);
      }
      navigate('/empresas');
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
            <button className="btn-back" onClick={() => navigate('/empresas')}>
              <BackIcon />
            </button>
            <div>
              <h1 className="page-title">
                {isEditing ? 'Editar Empresa' : 'Nueva Empresa'}
              </h1>
              <p className="page-subtitle">
                Complete el formulario para {isEditing ? 'actualizar la' : 'registrar una nueva'} empresa afiliada.
              </p>
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn-cancel" onClick={() => navigate('/empresas')}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSubmit} disabled={loading}>
              <SaveIcon />
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Guardar Empresa'}
            </button>
          </div>
        </div>

        <div className="form-content">
          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Información General */}
            <div className="form-section">
              <div className="form-section-header">
                <DocIcon />
                <div>
                  <h2 className="form-section-title">Información General</h2>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>ID Empresa</label>
                  <input
                    type="text"
                    value={isEditing ? `#${id}` : '#AUTO'}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Registro</label>
                  <input
                    type="text"
                    value={new Date().toLocaleDateString('es-PA')}
                    disabled
                    className="input-disabled"
                  />
                </div>
                <div className="form-group full">
                  <label>Nombre de la Empresa *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ej. Soluciones Globales S.A."
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>RNC / Identificación Fiscal *</label>
                  <input
                    type="text"
                    name="rnc"
                    placeholder="00000000-0-000000"
                    value={form.rnc}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+507 0000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="form-section">
              <div className="form-section-header">
                <LocationIcon />
                <h2 className="form-section-title">Ubicación</h2>
              </div>
              <div className="form-group">
                <label>Dirección Física</label>
                <textarea
                  name="address"
                  placeholder="Ciudad, Calle, Edificio, Oficina..."
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>

            {/* Estado */}
            <div className="form-section">
              <div className="form-section-header">
                <StatusIcon />
                <h2 className="form-section-title">Estado del Registro</h2>
              </div>
              <div className="radio-group">
                <label className={`radio-option ${form.isActive ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="isActive"
                    checked={form.isActive}
                    onChange={() => setForm(prev => ({ ...prev, isActive: true }))}
                  />
                  Activa
                </label>
                <label className={`radio-option ${!form.isActive ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="isActive"
                    checked={!form.isActive}
                    onChange={() => setForm(prev => ({ ...prev, isActive: false }))}
                  />
                  Inactiva
                </label>
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
function DocIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
function LocationIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function StatusIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}