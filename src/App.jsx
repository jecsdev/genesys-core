
import './App.css';
import React from 'react';
import Menu from './components/Menu';
import Inventory from './pages/Inventory';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/inventory" element={<Inventory/>}/> 
          </Routes>
        </Menu>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
