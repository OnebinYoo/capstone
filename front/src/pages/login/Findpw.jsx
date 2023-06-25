import React, { useState } from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import ResetpwSuccess from '../../components/Alertbar/Resetpw_Success';
import LoginError from '../../components/Alertbar/LoginError'; 

const Findpw = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFindPassword();
    }
  };

  const handleFindPassword = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsButtonDisabled(true);

    if (!email) {
      setErrorMessage('이메일을 입력해 주세요');
      setIsButtonDisabled(false);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage('비밀번호 재설정 이메일이 전송되었습니다');
      })
      .catch((error) => {
        setErrorMessage('이메일을 정확히 입력해 주세요');
        setIsButtonDisabled(false);
      });
  };

  return (
    <div className='loginpage'>
      <div className='titleWrap'>
        비밀번호 재설정
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
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        {errorMessage && <LoginError message={errorMessage}/>}
        {successMessage && <ResetpwSuccess />}
        <div className='bottomButtonWrap'>
          <button onClick={handleFindPassword} className='bottomButton' disabled={isButtonDisabled}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Findpw;
