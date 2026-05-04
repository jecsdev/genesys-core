import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getServicePlans, deleteServicePlan } from '../api/servicePlanApi';
import './PlanesPage.css';

export default function PlanesPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchPlans(); }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getServicePlans();
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desactivar este plan?')) return;
    try {
      await deleteServicePlan(id);
      fetchPlans();
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(price);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div>
            <h1 className="page-title">Planes de Servicio</h1>
            <p className="page-subtitle">Gestiona los planes de afiliación disponibles.</p>
          </div>
          <button className="btn-primary-action" onClick={() => navigate('/planes/nuevo')}>
            <PlusIcon /> Nuevo Plan
          </button>
        </div>

        <div className="page-content">
          {loading ? (
            <div className="empty-state">Cargando...</div>
          ) : plans.length === 0 ? (
            <div className="empty-state">No hay planes registrados.</div>
          ) : (
            <div className="plans-grid">
              {plans.map(plan => (
                <div key={plan.id} className={`plan-card ${!plan.isActive ? 'inactive' : ''}`}>
                  <div className="plan-card-header">
                    <div className="plan-icon">
                      <PlanIcon />
                    </div>
                    <span className={`badge ${plan.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      {plan.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-price">
                    <span className="price-label">Precio mensual</span>
                    <span className="price-value">{formatPrice(plan.basePrice)}</span>
                  </div>

                  <div className="plan-details">
                    <div className="plan-detail-item">
                      <UsersIcon />
                      <span>{plan.includedDependents} dependientes incluidos</span>
                    </div>
                    <div className="plan-detail-item">
                      <MoneyIcon />
                      <span>{formatPrice(plan.extraDependentPrice)} por dependiente extra</span>
                    </div>
                    <div className="plan-detail-item">
                      <AffiliateIcon />
                      <span>{plan.affiliatesCount} afiliados</span>
                    </div>
                  </div>

                  {plan.benefits.length > 0 && (
                    <div className="plan-benefits">
                      <span className="benefits-title">Beneficios incluidos:</span>
                      <ul>
                        {plan.benefits.map((b, i) => (
                          <li key={i}>
                            <CheckIcon /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="plan-actions">
                    <button
                      className="btn-plan-edit"
                      onClick={() => navigate(`/planes/editar/${plan.id}`)}
                    >
                      <EditIcon /> Editar
                    </button>
                    <button
                      className="btn-plan-delete"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
function PlanIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function UsersIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function MoneyIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
}
function AffiliateIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function EditIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}