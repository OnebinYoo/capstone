import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoutes = () => {
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authState.isLoggedIn) {
    navigate('/login');
    return null;
  }

  return <Outlet />;
};

export default PrivateRoutes;
