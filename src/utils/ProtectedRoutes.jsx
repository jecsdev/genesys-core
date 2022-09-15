import {Outlet, Navigate} from 'react-router-dom';
import AuthService from '../auth-services/auth-service';
function ProtectedRoutes() {
    let auth = AuthService
  return (
    auth.logIn ? <Outlet/>: <Navigate to="/login"/>
  )
}

export default ProtectedRoutes;