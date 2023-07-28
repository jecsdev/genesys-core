import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import AuthService from '../auth-services/auth-service';
function ProtectedRoutes() {
 
  let auth = AuthService;
  const user = auth.getCurrentUser();
  console.log(user);
  return user ? <Outlet/> : <Navigate to="/login"/>;
  
  
}
export default ProtectedRoutes;