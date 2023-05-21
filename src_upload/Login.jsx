import React, { useState } from 'react';
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyDVheOkbRXZU-eXaJ8OXRWfZtBelLsjFnQ",
  authDomain: "capstone-dab03.firebaseapp.com",
  projectId: "capstone-dab03"
};
firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('사용자 로그인:', user);
        window.location.href = '/home';
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
      });
  };

  return (
    <div>
      <h2>로그인</h2>
      <form>
        <div>
          <label>이메일:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>로그인</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;