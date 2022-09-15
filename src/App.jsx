import './App.css';
import React from 'react';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Qrscanner from './pages/Qrscanner';
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes/>}> 
                <Route path="/home" element={<Home/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path ="/qrscanner" element ={<Qrscanner/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Route>
            <Route index path="/login" element={<Login/>}/>
          </Routes>
          
      </BrowserRouter>
      
    </div>
  );
}
export default App;
