import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage';
import EmpresasPage from './pages/EmpresasPage.jsx';
import NuevaEmpresaPage from './pages/NuevaEmpresaPage';
import TitularesPage from './pages/AffiliatesPage.jsx';
import NuevoTitularPage from './pages/NewAffiliatePage.jsx';

// Ruta protegida
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>             
                <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/empresas" element={<PrivateRoute><EmpresasPage /></PrivateRoute>} />
          <Route path="/empresas/nueva" element={<PrivateRoute><NuevaEmpresaPage /></PrivateRoute>} />
          <Route path="/empresas/editar/:id" element={<PrivateRoute><NuevaEmpresaPage /></PrivateRoute>} />
          <Route path="/titulares" element={<PrivateRoute><TitularesPage /></PrivateRoute>} />
          <Route path="/titulares/nuevo" element={<PrivateRoute><NuevoTitularPage /></PrivateRoute>} />
          <Route path="/titulares/editar/:id" element={<PrivateRoute><NuevoTitularPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}