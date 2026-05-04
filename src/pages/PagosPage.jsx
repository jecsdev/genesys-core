import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getPayments, deletePayment } from '../api/paymentApi';
import './PagosPage.css';

const STATUS_INFO = {
  Paid: { label: 'Pagado', color: '#10b981', bg: '#f0fdf4' },
  Pending: { label: 'Pendiente', color: '#f0a500', bg: '#fffbeb' },
  Overdue: { label: 'Vencido', color: '#ef4444', bg: '#fef2f2' },
};

const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Tarjeta', 'Cheque'];

export default function PagosPage() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchPayments(); }, []);

  useEffect(() => {
    let result = payments;
    if (filterStatus) result = result.filter(p => p.status === filterStatus);
    if (search) result = result.filter(p =>
      p.affiliateName.toLowerCase().includes(search.toLowerCase()) ||
      p.affiliateNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.referenceNumber?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [payments, search, filterStatus]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este pago?')) return;
    try {
      await deletePayment(id);
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (amount) =>
    new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <div className="page-header">
          <div>
            <h1 className="page-title">Gestión de Pagos</h1>
            <p className="page-subtitle">Historial y registro de pagos de afiliados.</p>
          </div>
          <button className="btn-primary-action" onClick={() => navigate('/pagos/nuevo')}>
            <PlusIcon /> Registrar Pago
          </button>
        </div>

        <div className="page-content">
          <div className="filters-row">
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar por afiliado o referencia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Paid">Pagado</option>
              <option value="Pending">Pendiente</option>
              <option value="Overdue">Vencido</option>
            </select>
          </div>

          <div className="table-panel">
            {loading ? (
              <div className="empty-state">Cargando...</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">No se encontraron pagos.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>AFILIADO</th>
                      <th>MONTO</th>
                      <th>FECHA PAGO</th>
                      <th>FECHA VENCE</th>
                      <th>MÉTODO</th>
                      <th>REFERENCIA</th>
                      <th>ESTADO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="affiliate-name">{p.affiliateName}</div>
                          <div className="affiliate-id">{p.affiliateNumber}</div>
                        </td>
                        <td className="amount-cell">{formatPrice(p.amount)}</td>
                        <td>{formatDate(p.paymentDate)}</td>
                        <td>{formatDate(p.dueDate)}</td>
                        <td>{p.paymentMethod}</td>
                        <td className="reference-cell">{p.referenceNumber || '—'}</td>
                        <td>
                          <span className="badge" style={{
                            background: STATUS_INFO[p.status]?.bg || '#f3f4f6',
                            color: STATUS_INFO[p.status]?.color || '#374151'
                          }}>
                            {STATUS_INFO[p.status]?.label || p.status}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button
                              className="btn-row-action"
                              onClick={() => navigate(`/pagos/editar/${p.id}`)}
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn-row-action danger"
                              onClick={() => handleDelete(p.id)}
                            >
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
    </div>
  );
}

// ── Icons ──
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function EditIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}