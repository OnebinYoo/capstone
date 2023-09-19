import React from 'react';

import './alertbar.css';
import check from '../../assets/icon/check.png';

const SettingSuccess = ({ message }) => {
  return (
    <div className='AlertBar-SettingSuccess'>
        <div className='Success-content'>
            <img className='Success-content-img' src={check} alt='성공아이콘' />
            <label className='Success-content-label'>
                { message }
            </label>  
        </div>
    </div>
  );
};

export default SettingSuccess;