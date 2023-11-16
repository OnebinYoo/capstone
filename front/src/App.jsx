import React from 'react';
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
import PrivateRoutes from './components/privateroutes/PrivateRoutes';
import { AuthProvider } from './components/privateroutes/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="log" element={<Log />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/ruleadd" element={<RuleAdd />} />
            <Route path="setting/ruleadj" element={<RuleAdj />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
