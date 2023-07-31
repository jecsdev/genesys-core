import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import AuthService from '../auth-services/auth-service';
function ProtectedRoutes() {
  //Check if user exist to login
  let auth = AuthService;
  const user = auth.getCurrentUser();
  return user ? <Outlet/> : <Navigate to="/login"/>;
  
  
}
export default ProtectedRoutes;