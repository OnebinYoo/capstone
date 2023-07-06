import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoutes = ({ component: RouteComponent, ...rest }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={currentUser ? <RouteComponent /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoutes;
