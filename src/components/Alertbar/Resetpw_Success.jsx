// Resetpw_Success.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Resetpw_Success = (/*{ message }*/) => {
  return (
    <div className='alertSuccessBar'>
      <label style={{ padding: '5px', color: 'black', fontWeight: 'bold', fontSize: '15px', lineHeight: '1.7'}}>
        비밀번호 재설정 메일이 전송되었습니다 <br/>
        <Link to="/" style={{color: 'black'}}>로그인 하러 가기</Link>
      </label>
    </div>
  );
};

export default Resetpw_Success;