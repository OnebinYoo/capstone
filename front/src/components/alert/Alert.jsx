import React from 'react';
import warning from '../../assets/icon/warning.png';

import './alert.css';

const Alert = ({ ruleName, onCancel, onDelete }) => {
  return (
    <div className='AlertContainer'>
      <div className='AlertContent'>
        <div className='AlertWarningContent'>
            <div className='AlertImg'>
                 <img src={warning} alt="warning"/>
            </div>
            <div className='AlertMessage'>경고</div>
        </div>
        <p className='WarningMessage'>정말로 삭제하시겠습니까?</p>
        <p className='WarningRuleName'>삭제할 규칙: {ruleName}</p>
        <div className='AlertButtons'>
          <button className='CancelButton' onClick={onCancel}>취소</button>
          <button className='DeleteButton' onClick={onDelete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;