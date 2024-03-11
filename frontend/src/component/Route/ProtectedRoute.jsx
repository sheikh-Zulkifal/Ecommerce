import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null; // Return null if loading
  }

  if (!isAuthenticated || !user) {
    navigate("/login");
    return null; // Return null if user is not available
  }

  if (isAdmin && user.role !== "admin") {
    navigate("/login");
    return null; // Return null if user is not admin
  }

  return <Fragment>{children}</Fragment>; // Render children if user is authenticated and authorized
};

export default ProtectedRoute;
