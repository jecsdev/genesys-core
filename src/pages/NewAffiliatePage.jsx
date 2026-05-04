import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { createAffiliate, getAffiliate, updateAffiliate } from '../api/affiliateApi';
import { getCompanies } from '../api/companyApi';
import { getServicePlans } from '../api/servicePlanApi';
import './NewAffiliatePage.css';

export default function NewAffiliatePage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    isActive: true,
    companyId: '',
    servicePlanId: '',
  });
  const [companies, setCompanies] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [affiliateNumber, setAffiliateNumber] = useState('');

  useEffect(() => {
    Promise.all([getCompanies(), getServicePlans()]).then(([cRes, pRes]) => {
      setCompanies(cRes.data);
      setPlans(pRes.data.filter(p => p.isActive)); // solo planes activos
    });

    if (isEditing) {
      getAffiliate(id).then(res => {
        const a = res.data;
        setForm({
          firstName: a.firstName,
          lastName: a.lastName,
          identification: a.identification,
          email: a.email,
          phone: a.phone,
          address: a.address,
          position: a.position,
          isActive: a.isActive,
          companyId: a.companyId,
          servicePlanId: a.servicePlanId,
        });
        setAffiliateNumber(a.affiliateNumber);
      });
    }
  }, [id]);

  // Actualiza el plan seleccionado cuando cambia el id
  useEffect(() => {
    const plan = plans.find(p => p.id === parseInt(form.servicePlanId));
    setSelectedPlan(plan || null);
  }, [form.servicePlanId, plans]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        companyId: parseInt(form.companyId),
        servicePlanId: parseInt(form.servicePlanId)
      };
      if (isEditing) {
        await updateAffiliate(id, payload);
      } else {
        await createAffiliate(payload);
      }
      navigate('/titulares');
    } catch {
      setError('Ocurrió un error al guardar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(price);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-back" onClick={() => navigate('/titulares')}>
              <BackIcon />
            </button>
            <div>
              <h1 className="page-title">
                {isEditing ? 'Editar Titular' : 'Registrar Nuevo Titular'}
              </h1>
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn-cancel" onClick={() => navigate('/titulares')}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSubmit} disabled={loading}>
              <SaveIcon />
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Guardar Titular'}
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
                  <p className="form-section-subtitle">Datos básicos e identificación del titular.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Nombre Completo *</label>
                  <div className="name-grid">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Ej. Carlos Alberto"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Ej. Mendoza"
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
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono Móvil</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Ej. +1 809-000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label>Dirección Residencial</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Ciudad, Calle, Casa/Apto"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Datos de Afiliación */}
            <div className="form-section">
              <div className="form-section-header">
                <AffiliateIcon />
                <div>
                  <h2 className="form-section-title">Datos de Afiliación</h2>
                  <p className="form-section-subtitle">Asociación con empresa y estado en el sistema.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Empresa Asociada *</label>
                  <select
                    name="companyId"
                    value={form.companyId}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccionar empresa...</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Cargo / Puesto</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="Ej. Gerente de Ventas"
                    value={form.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Número de Afiliado</label>
                  <div className="auto-field">
                    <input
                      type="text"
                      value={isEditing ? affiliateNumber : 'Se genera automáticamente'}
                      disabled
                      className="input-disabled"
                    />
                    {!isEditing && <span className="auto-badge">AUTO</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Estado del Titular</label>
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

            {/* Plan de Servicio */}
            <div className="form-section">
              <div className="form-section-header">
                <PlanIcon />
                <div>
                  <h2 className="form-section-title">Plan de Servicio</h2>
                  <p className="form-section-subtitle">Selecciona el plan que cubrirá al titular y sus dependientes.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Plan *</label>
                  <select
                    name="servicePlanId"
                    value={form.servicePlanId}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccionar plan...</option>
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatPrice(p.basePrice)}/mes
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedPlan && (
                <div className="plan-preview">
                  <div className="plan-preview-header">
                    <h3>{selectedPlan.name}</h3>
                    <span className="plan-preview-price">{formatPrice(selectedPlan.basePrice)}/mes</span>
                  </div>
                  <p className="plan-preview-desc">{selectedPlan.description}</p>
                  <div className="plan-preview-stats">
                    <div className="plan-preview-stat">
                      <span className="stat-label">Dependientes incluidos</span>
                      <span className="stat-value">{selectedPlan.includedDependents}</span>
                    </div>
                    <div className="plan-preview-stat">
                      <span className="stat-label">Costo dependiente extra</span>
                      <span className="stat-value">{formatPrice(selectedPlan.extraDependentPrice)}</span>
                    </div>
                  </div>
                  {selectedPlan.benefits.length > 0 && (
                    <div className="plan-preview-benefits">
                      <span className="stat-label">Beneficios incluidos:</span>
                      <ul>
                        {selectedPlan.benefits.map((b, i) => (
                          <li key={i}><CheckIcon /> {b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
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
function AffiliateIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>;
}
function PlanIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}