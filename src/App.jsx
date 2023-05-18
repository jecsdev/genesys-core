import './App.css';
import React from 'react';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Qrscanner from './pages/Qrscanner';
import Login from './pages/Login';
import ProductCategories from './pages/ProductCategories';
import CreateProductCategory from './pages/CreateProductCategory';
import ProtectedRoutes from './utils/ProtectedRoutes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/productcategories" element={<ProductCategories/>}/>
                <Route path="/createproductcategory" element={<CreateProductCategory/>}/>
                <Route path ="/qrscanner" element ={<Qrscanner/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
