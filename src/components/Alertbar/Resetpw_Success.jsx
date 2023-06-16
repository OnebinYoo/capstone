// Resetpw_Success.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Resetpw_Success = (/*{ message }*/) => {
  return (
    <div className='alertSuccessBar'>
      <label style={{ color: 'black', fontWeight: 'bold', fontSize: '15px'}}>
        비밀번호 재설정 메일이 전송되었습니다 <br/>
        <Link to="/" style={{color: 'black'}}>로그인 하러 가기</Link>
      </label>
    </div>
  );
};

export default Resetpw_Success;