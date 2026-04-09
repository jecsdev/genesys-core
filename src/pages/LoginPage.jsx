import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginRequest } from '../api/authApi';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    const res = await loginRequest({ username, password });
    login(res.data.token);
    navigate('/dashboard');
  } catch {
    setError('Usuario o contraseña incorrectos. Por favor intenta nuevamente.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Icono */}
        <div className="login-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <h1 className="login-title">Bienvenido de nuevo</h1>
        <p className="login-subtitle">Ingresa tus credenciales para acceder al sistema</p>

        {/* Error */}
        {error && (
          <div className="login-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Error de autenticación</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div className="login-field">
            <label>Usuario</label>
            <div className="input-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="login-field">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Olvidaste contraseña */}
          <div className="login-forgot">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          {/* Botón */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="login-footer">
          © 2023 Sistema de Afiliaciones. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}