import React from 'react';

import './alertbar.css';
import error from '../../assets/icon/error.png';

const SettingError = ({ message }) => {
  return (
    <div className='AlertBar-SettingError'>
        <div className='Error-content'>
            <img className='Error-content-img' src={error} alt='에러아이콘' />
            <label className='Error-content-label'>
                { message }
            </label>  
        </div>
    </div>
  );
};

export default SettingError;