import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { usePermissions } from './hooks/usePermissions';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage';
import EmpresasPage from './pages/EmpresasPage.jsx';
import NuevaEmpresaPage from './pages/NuevaEmpresaPage';
import TitularesPage from './pages/AffiliatesPage.jsx';
import NuevoTitularPage from './pages/NewAffiliatePage.jsx';
import DependientesPage from './pages/DependientesPage';
import NuevoDependientePage from './pages/NuevoDependientePage';
import ReportesPage from './pages/ReportesPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import PerfilPage from './pages/PerfilPage';

// Ruta protegida por autenticación
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

// Ruta protegida por rol — redirige a /dashboard si no tiene canView del módulo
const RoleRoute = ({ children, module }) => {
  const { user } = useAuth();
  const { canView } = usePermissions();
  if (!user) return <Navigate to="/" replace />;
  return canView(module) ? children : <Navigate to="/dashboard" replace />;
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
          <Route path="/empresas/nueva" element={<RoleRoute module="empresas"><NuevaEmpresaPage /></RoleRoute>} />
          <Route path="/empresas/editar/:id" element={<RoleRoute module="empresas"><NuevaEmpresaPage /></RoleRoute>} />
          <Route path="/titulares" element={<PrivateRoute><TitularesPage /></PrivateRoute>} />
          <Route path="/titulares/nuevo" element={<RoleRoute module="titulares"><NuevoTitularPage /></RoleRoute>} />
          <Route path="/titulares/editar/:id" element={<RoleRoute module="titulares"><NuevoTitularPage /></RoleRoute>} />
          <Route path="/dependientes" element={<PrivateRoute><DependientesPage /></PrivateRoute>} />
          <Route path="/dependientes/nuevo" element={<RoleRoute module="dependientes"><NuevoDependientePage /></RoleRoute>} />
          <Route path="/dependientes/editar/:id" element={<RoleRoute module="dependientes"><NuevoDependientePage /></RoleRoute>} />
          <Route path="/reportes" element={<PrivateRoute><ReportesPage /></PrivateRoute>} />
          <Route path="/configuracion" element={<RoleRoute module="configuracion"><ConfiguracionPage /></RoleRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}