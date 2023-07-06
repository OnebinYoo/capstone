import React, {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Log from './pages/log/Log';
import Setting from './pages/setting/Setting';
import Login from './pages/login/Login';
import Findpw from './pages/login/Findpw';
import PrivateRoutes from './components/PrivateRoutes';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/findpw" element={<Findpw />} />
        {/* <Route element={<PrivateRoutes/>}> */}
          <Route path="/home" element={<Home />} />
          <Route path="/log" element={<Log/>} />
          <Route path="/setting" element={<Setting/>} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
