// App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Home from './Home';
import Findpw from './components/Findpw';
import Log from './Log';
import Setting from './Setting';
import TopBarTest from './components/topbar/TopbarTest';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/log" element={<Log />} />
          <Route path="/topbartest" element={<TopBarTest />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;