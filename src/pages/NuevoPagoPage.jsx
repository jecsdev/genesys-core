import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { createPayment, getPayments, updatePayment } from '../api/paymentApi';
import { getAffiliates } from '../api/affiliateApi';
import './NuevoPagoPage.css';

const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Tarjeta', 'Cheque'];

export default function NuevoPagoPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    affiliateId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentMethod: 'Efectivo',
    referenceNumber: '',
    status: 'Pending',
    notes: ''
  });
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAffiliates().then(res => setAffiliates(res.data));
    if (isEditing) {
      getPayments(id).then(res => {
        const p = res.data;
        setForm({
          affiliateId: p.affiliateId,
          amount: p.amount,
          paymentDate: p.paymentDate.split('T')[0],
          dueDate: p.dueDate.split('T')[0],
          paymentMethod: p.paymentMethod,
          referenceNumber: p.referenceNumber || '',
          status: p.status,
          notes: p.notes || ''
        });
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
      const payload = {
        ...form,
        affiliateId: parseInt(form.affiliateId),
        amount: parseFloat(form.amount),
        paymentDate: new Date(form.paymentDate).toISOString(),
        dueDate: new Date(form.dueDate).toISOString(),
      };
      if (isEditing) {
        await updatePayment(id, payload);
      } else {
        await createPayment(payload);
      }
      navigate('/pagos');
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
            <button className="btn-back" onClick={() => navigate('/pagos')}>
              <BackIcon />
            </button>
            <h1 className="page-title">
              {isEditing ? 'Editar Pago' : 'Registrar Pago'}
            </h1>
          </div>
          <div className="page-header-actions">
            <button className="btn-cancel" onClick={() => navigate('/pagos')}>Cancelar</button>
            <button className="btn-save" onClick={handleSubmit} disabled={loading}>
              <SaveIcon />
              {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Registrar Pago'}
            </button>
          </div>
        </div>

        <div className="form-content">
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-section-header">
                <PaymentIcon />
                <div>
                  <h2 className="form-section-title">Información del Pago</h2>
                  <p className="form-section-subtitle">Registra el pago del afiliado.</p>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Afiliado *</label>
                  <select
                    name="affiliateId"
                    value={form.affiliateId}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccionar afiliado...</option>
                    {affiliates.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.firstName} {a.lastName} — {a.affiliateNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Monto (RD$) *</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Método de Pago</label>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {PAYMENT_METHODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha de Pago *</label>
                  <input
                    type="date"
                    name="paymentDate"
                    value={form.paymentDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Vencimiento *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Número de Referencia</label>
                  <input
                    type="text"
                    name="referenceNumber"
                    placeholder="Ej. TRF-001234"
                    value={form.referenceNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Pending">Pendiente</option>
                    <option value="Paid">Pagado</option>
                    <option value="Overdue">Vencido</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Notas</label>
                  <textarea
                    name="notes"
                    placeholder="Observaciones adicionales..."
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                  />
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
function PaymentIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}