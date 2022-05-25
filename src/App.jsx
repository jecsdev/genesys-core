
import './App.css';
import React from 'react';
import Menu from './components/Menu';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
