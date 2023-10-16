import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
