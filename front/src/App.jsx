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

import { AuthProvider } from './components/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/findpw" element={<Findpw />} />

          {/* 로그인이 되어 있을 때만 PrivateRoutes를 통해 보호된 페이지로 이동 */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="log" element={<Log />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/ruleadd" element={<RuleAdd />} />
            <Route path="setting/ruleadj" element={<RuleAdj />} />
          </Route>

          {/* 이외의 모든 페이지는 에러 페이지로 이동 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
