// FindId.jsx

import React, { useState } from 'react';
import { auth } from '../firebase';

const FindId = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFindId = () => {
    if (!email) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }

    auth
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.includes('password')) {
          setSuccessMessage('입력하신 이메일로 가입된 계정이 있습니다.');
        } else {
          setErrorMessage('입력하신 이메일로 가입된 계정이 없습니다.');
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className='loginpage'>
      <div className='titleWrap'>
        가입된 이메일 찾기
      </div>
      <div className='contentWrap'>
        <div className='inputTitle'>
          <label htmlFor='email'>이메일</label>
          <div className='inputWrap'>
            <input
              className='input'
              type='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {errorMessage && <div className='error'>{errorMessage}</div>}
        {successMessage && <div className='success'>{successMessage}</div>}
        <div className='bottomButtonWrap'>
          <button onClick={handleFindId} className='bottomButton'>이메일 찾기</button>
        </div>
      </div>
    </div>
  );
};

export default FindId;