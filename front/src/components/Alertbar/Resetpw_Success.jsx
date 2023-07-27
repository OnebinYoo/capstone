import React from 'react';
import { Link } from 'react-router-dom';
import check from '../../assets/icon/check.png';
import './alertbar.css';

const Resetpw_Success = () => {
  return (
    <div className='AlertBar-Success' style={{borderRadius: '30px'}}>
      <div className='Success-content'>
      <img className='Success-content-img' src={check} alt='성공아이콘'/>
      <label className='Success-content-label' style={{ padding: '5px', color: '#1E4620', fontSize: '15px', lineHeight: '1.8'}}>
        비밀번호 재설정 메일이 전송되었습니다 <br/>
        <Link to="/login" style={{color: '#1E4620'}}>로그인 하러 가기</Link>
      </label>
      </div>
    </div>
  );
};

export default Resetpw_Success;