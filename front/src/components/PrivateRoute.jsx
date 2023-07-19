import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const user = auth.currentUser;

  return user ? <Route {...rest} element={<Element />} /> : <Navigate to="/" />;
};

export default PrivateRoute;
