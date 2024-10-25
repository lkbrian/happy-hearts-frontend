import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const AuthenticatedRoutes = () => {
  const { isAuthenticated } = useAuth();
  // console.log(isAuthenticated);
  return isAuthenticated
    ? React.createElement(Outlet)
    : React.createElement(Navigate, { to: "/login" });
};

export default AuthenticatedRoutes;
