// App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import FindId from './components/FindId';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/findid" element={<FindId />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;