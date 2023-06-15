// LoginError.jsx

import React from 'react';

const LoginError = ({ message }) => {
  return (
    <div className='alertErrorBar'>
      <label style={{ color: 'black', fontWeight: 'bold', fontSize: '15px'}}>
        { message }
      </label>     
    </div>
  );
};

export default LoginError;