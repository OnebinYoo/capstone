import React, {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Log from './pages/log/Log';
import Setting from './pages/setting/Setting';
import Login from './pages/login/Login';
import Findpw from './pages/login/Findpw';
import RuleAdd from './pages/setting/RuleAdd';
import RuleAdj from './pages/setting/RuleAdj';
import ErrorPage from './pages/error/ErrorPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/findpw" element={<Findpw />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/log" element={<Log/>} />
        <Route exact path="/setting" element={<Setting/>} />
        <Route exact path="/setting/ruleadd" element={<RuleAdd />} />
        <Route exact path="/setting/ruleadj" element={<RuleAdj />} />
        <Route Component={ErrorPage}/>
      </Routes>
    </Router>
  );
}

export default App;