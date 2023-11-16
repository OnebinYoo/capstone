import React, { useEffect, useState } from 'react';
import './topbar.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import menu from '../../assets/icon/menu.png';

export default function Topbar({toggleColumnLeft}) {
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
      navigate('/login');
    });
    localStorage.clear();
  };

  return (
    <div className='TopList'>
      <div className='TopListItem toplistleft'>
        <div className='menuWrap'>
          <button className='menu' onClick={toggleColumnLeft}>
            <img className='menuImg' src={menu} alt='메뉴' />
          </button>
        </div>
        <div className='logo'>관리자페이지</div>
      </div>
      <div className='TopListItem toplistright'>
        <div className='UserEmail'>{username}님 환영합니다</div>
        <button onClick={handleLogout} className='bottomButton' style={{ width: '120px', height: '50px'}}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
