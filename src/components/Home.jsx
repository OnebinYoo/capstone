import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
  }, [navigate]); // navigate를 의존성 배열에 추가

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Home</h2>
      {user && <p>Welcome, {user.email}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
