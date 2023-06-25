import React from 'react';

import './alertbar.css';

const LoginError = ({ message }) => {
  return (
    <div className='alertErrorBar'>
      <label style={{ color: 'white', fontWeight: 'bold', fontSize: '15px'}}>
        { message }
      </label>     
    </div>
  );
};

export default LoginError;