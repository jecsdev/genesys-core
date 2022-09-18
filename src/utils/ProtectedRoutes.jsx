import {Outlet, Navigate} from 'react-router-dom';
import AuthService from '../auth-services/auth-service';
function ProtectedRoutes() {
    let auth = AuthService
  return (
    auth.getCurrentUser ? <Outlet/>: <Navigate to="/login"/>
    
  )
}

export default ProtectedRoutes;