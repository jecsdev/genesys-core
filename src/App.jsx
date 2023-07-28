import './App.css';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductCategories from './pages/ProductCategories';
import CreateProductCategory from './pages/CreateProductCategory';
import AddProduct from './pages/AddProduct';
import ProtectedRoutes from './utils/ProtectedRoutes';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/productcategories" element={<ProductCategories />} />
            <Route path="/createproductcategory" element={<CreateProductCategory />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Route>
          {/* Ruta para manejar cualquier otra URL no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
