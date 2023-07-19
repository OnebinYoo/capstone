import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
      <button onClick={goBack}>뒤로 가기</button>
    </div>
  );
};

export default ErrorPage;