import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { createServicePlan, getServicePlan, updateServicePlan } from '../api/servicePlanApi';
import './NuevoPlanPage.css';

export default function NuevoPlanPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    basePrice: '',
    includedDependents: 4,
    extraDependentPrice: '',
    isActive: true,
    benefits: []
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      getServicePlan(id).then(res => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description,
          basePrice: p.basePrice,
          includedDependents: p.includedDependents,
          extraDependentPrice: p.extraDependentPrice,
          isActive: p.isActive,
          benefits: p.benefits
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setForm(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit.trim()] }));
    setNewBenefit('');
  };

  const handleRemoveBenefit = (index) => {
    setForm(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        basePrice: parseFloat(form.basePrice),
        extraDependentPrice: parseFloat(form.extraDependentPrice),
        includedDependents: parseInt(form.includedDependents)
      };
      if (isEditing) {
        await updateServicePlan(id, payload);
      } else {
        await createServicePlan(payload);
      }
      navigate('/planes');
    } catch {
      setError('Error al guardar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-back" onClick={() => navigate('/planes')}>
              <BackIcon />
            </button>
            <h1 className="page-title">
              {isEditing ? 'Editar Plan' : 'Nuevo Plan de Servicio'}
            </h1>
          </div>
          <div className="page-header-actions">
            <button className="btn-cancel" onClick={() => navigate('/planes')}>Cancelar</button>
            <button className="btn-save" onClick={handleSubmit} disabled={loading}>
              <SaveIcon />
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Plan'}
            </button>
          </div>
        </div>

        <div className="form-content">
          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Info General */}
            <div className="form-section">
              <div className="form-section-header">
                <PlanIcon />
                <div>
                  <h2 className="form-section-title">Información del Plan</h2>
                  <p className="form-section-subtitle">Datos básicos del plan de servicio.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Nombre del Plan *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ej. Plan Básico"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Descripción</label>
                  <textarea
                    name="description"
                    placeholder="Describe el plan..."
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Precio Base Mensual (RD$) *</label>
                  <input
                    type="number"
                    name="basePrice"
                    placeholder="0.00"
                    value={form.basePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dependientes Incluidos</label>
                  <input
                    type="number"
                    name="includedDependents"
                    value={form.includedDependents}
                    onChange={handleChange}
                    min="0"
                    max="20"
                  />
                </div>
                <div className="form-group">
                  <label>Costo por Dependiente Extra (RD$)</label>
                  <input
                    type="number"
                    name="extraDependentPrice"
                    placeholder="0.00"
                    value={form.extraDependentPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    name="isActive"
                    value={form.isActive}
                    onChange={(e) => setForm(p => ({ ...p, isActive: e.target.value === 'true' }))}
                    className="form-select"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Beneficios */}
            <div className="form-section">
              <div className="form-section-header">
                <CheckIcon />
                <div>
                  <h2 className="form-section-title">Beneficios del Plan</h2>
                  <p className="form-section-subtitle">Agrega los beneficios incluidos en este plan.</p>
                </div>
              </div>

              <div className="benefit-input-row">
                <input
                  type="text"
                  placeholder="Ej. Servicio funerario completo"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                />
                <button type="button" className="btn-add-benefit" onClick={handleAddBenefit}>
                  <PlusIcon /> Agregar
                </button>
              </div>

              {form.benefits.length === 0 ? (
                <p className="empty-benefits">No hay beneficios agregados aún.</p>
              ) : (
                <div className="benefits-list">
                  {form.benefits.map((b, i) => (
                    <div key={i} className="benefit-item">
                      <CheckIconGreen /> <span>{b}</span>
                      <button type="button" onClick={() => handleRemoveBenefit(i)}>
                        <XIcon />
                      </button>
                    </div>
                  ))}
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
function PlanIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function CheckIconGreen() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function XIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}