import React, { useEffect, useState } from 'react';
import './topbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import styled from 'styled-components';

export default function Topbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/home">
            <div>
              <TopList>
                <TopListItem>Welcome</TopListItem>
                <TopListItem>
                  {user && <UserEmail>{user.email}</UserEmail>}
                </TopListItem>
                <TopListItem>
                  <button onClick={handleLogout} className='bottomButton' style={{textDecoration: 'none'}}>로그아웃</button>
                </TopListItem>
              </TopList>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const TopList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TopListItem = styled.li`
  padding: 10px;
  margin-right: 10px;
`;

const UserEmail = styled.p`
  margin: 0;
`;