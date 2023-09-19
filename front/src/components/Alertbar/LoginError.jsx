import React from 'react';
import error from '../../assets/icon/error.png';
import './alertbar.css';


const LoginError = ({ message }) => {
  return (
    <div className='AlertBar-Error'>
      <div className='Error-content'>
        <img className='Error-content-img' src={error} alt='에러아이콘'/>
        <label className='Error-centen-label'>{ message }</label>
      </div>
    </div>
  );
};

export default LoginError;