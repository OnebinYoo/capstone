import React, { useEffect, useState } from 'react';
import './topbar.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

export default function Topbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let username = '';

  useEffect(() => {
    const unlogin = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/');
      }
    });

    return () => {
      unlogin();
    };
  }, [navigate]);

  if (user) {
    const email = user.email;
    username = email.substring(0, email.indexOf('@'));
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };


  return (
    <div className='TopList'>
      <div className='TopListItem toplistleft'>
        관리자페이지
      </div>
      <div className='TopListItem toplistright'>
        <div className='UserEmail'>{username}님 환영합니다</div>
        <button onClick={handleLogout} className='bottomButton' style={{ width: '120px' }}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
