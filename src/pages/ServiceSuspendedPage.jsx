import logo from '../assets/logo.png';
import { BRANDING, getCopyright } from '../utils/branding';
import './ServiceSuspendedPage.css';

export default function ServiceSuspendedPage() {
  return (
    <main className="suspension-page">
      <section className="suspension-card" aria-labelledby="suspension-title">
        <img className="suspension-logo" src={logo} alt={BRANDING.clientName} />
        <div className="suspension-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <p className="suspension-label">Servicio finalizado</p>
        <h1 id="suspension-title">El período de pruebas ha finalizado</h1>
        <p className="suspension-message">
          El período de acceso de prueba de {BRANDING.poweredBy} ha concluido.
          Durante este período el sistema estuvo disponible para su evaluación.
        </p>
        <p className="suspension-contact">
          Para conocer los próximos pasos y continuar con el servicio, por favor contacte a su proveedor.
        </p>
        <div className="suspension-divider" />
        <p className="suspension-footer">{getCopyright()}</p>
      </section>
    </main>
  );
}
