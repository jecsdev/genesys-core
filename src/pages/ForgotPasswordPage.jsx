import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import './ForgotPasswordPage.css';

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </div>

        <h1 className="login-title">¿Olvidaste tu contraseña?</h1>
        <p className="login-subtitle">
          No te preocupes. Ingresa tu usuario y notificaremos al administrador para que restablezca tu acceso.
        </p>

        {sent ? (
          <div className="forgot-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p>Notificación enviada al administrador.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="forgot-password-field">
            <label>Usuario</label>
            <div className="input-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="ej. Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-btn" style={{ width: '100%' }}>
            Notificar a administrador
          </button>
        </form>
        )}

        <Link to="/" className="forgot-back">
          ← Volver al inicio de sesión
        </Link>

        <p className="login-footer">
          © 2023 Sistema de Afiliaciones. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}