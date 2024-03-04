import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!user) {
    navigate("/login");
    return null; // Return null if user is not available
  }

  return <Fragment>{children}</Fragment>;
  // Or using empty tags: return <>{children}</>;
};

export default ProtectedRoute;
