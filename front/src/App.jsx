import React from 'react';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import Home from './pages/home/Home'
import Log from './pages/log/Log';
import Setting from './pages/setting/Setting'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/log' element={<Log />} />
          <Route exact path='/setting' element={<Setting />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;