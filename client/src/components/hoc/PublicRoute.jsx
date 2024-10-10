import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ user }) => {
  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={"/home"} replace />;
};

export default PublicRoute;
