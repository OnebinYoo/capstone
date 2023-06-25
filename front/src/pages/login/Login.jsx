import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import LoginError from '../../components/Alertbar/LoginError'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('계정을 입력해 주세요');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/invalid-email).' || errorMessage === 'Firebase: Error (auth/wrong-password).'|| errorMessage === 'Firebase: Error (auth/user-not-found).') {
          setErrorMessage('계정을 정확하게 입력해 주세요.');
        } else if (errorMessage === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
          setErrorMessage('계정에 여러번의 로그인 시도가 있었습니다. 잠시후 다시 시도해 주세요.');
        } else {
          setErrorMessage('로그인 중 에러가 발생했습니다.');
        }
      }
    );
  };

  return (
    <div className='loginpage' style={{color : ""}}>
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>
      <div className='contentWrap'>
        <div className='inputTitle'>
          <label htmlFor="email">이메일</label>
          <div className='inputWrap'>
            <input
              className='input'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className='inputTitle'>
          <label htmlFor="password">비밀번호</label>
          <div className='inputWrap'>
            <input
              className='input'
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {errorMessage && <LoginError message={errorMessage}/>}

        <div className='bottomButtonWrap'>
          <button onClick={handleLogin} className='bottomButton'>로그인</button>
        </div>
        <div className='inputTitle'  style={{marginTop: '20px'}}>
          <Link to="/findpw" style={{color: 'black'}}>비밀번호 재설정</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;