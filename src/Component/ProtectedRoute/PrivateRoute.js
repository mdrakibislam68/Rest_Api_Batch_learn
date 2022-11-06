import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import GlobalProvider from "../../Context/Index";

const PrivateRoute = ({ children }) => {
  const { token } = GlobalProvider();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
