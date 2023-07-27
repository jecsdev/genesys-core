import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ProductCategories from './pages/ProductCategories';
import CreateProductCategory from './pages/CreateProductCategory';
import ProtectedRoutes from './utils/ProtectedRoutes';
import AddProduct from './pages/AddProduct';

function App() {
  // handles user authentication state
  const isAuthenticated = false; 

  return (
    <div className="App">
      <Router>
        <Routes>
          /* conditional redirection */
          <Route path="/" element={isAuthenticated ? <Home /> : <Redirect to="/login" />} />
          <Route path="/login" element={<Login />} />

          /* Rutas protegidas que requieren autenticación */
          <Route
            element={
              isAuthenticated ? (
                <ProtectedRoutes>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/productcategories" element={<ProductCategories />} />
                  <Route path="/createproductcategory" element={<CreateProductCategory />} />
                  <Route path="/addProduct" element={<AddProduct />} />
                </ProtectedRoutes>
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          /* Ruta para manejar cualquier otra URL no encontrada */
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

