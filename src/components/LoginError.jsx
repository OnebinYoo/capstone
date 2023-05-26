// LoginError.jsx

import React from 'react';

const LoginError = ({ message }) => {
  return (
    <div className='errorMessageWrap'>
      <label style={{color: 'black', fontWeight: 'bold', fontSize: '15px'}}>계정을 정확히 입력해 주세요</label>     
    </div>);
};

export default LoginError;