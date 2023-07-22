import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import errorpage from '../../assets/icon/errorpage.png';
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);

  const goHome = () => {
    if (authState.isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='ErrorPageWrap'>
      <div className='ErrorPageContent'>
        <div className='ErrorPageLeft'>
          <img src={errorpage} alt='에러페이지' />
        </div>
        <div className='ErrorPageRight'>
          <div className='ErrorPageText'>
            <h1>페이지를 찾을 수가 없어요</h1>
          <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
          </div>
          <div className='ErrorpageButton'>
            <button onClick={goHome}>홈으로 이동</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;