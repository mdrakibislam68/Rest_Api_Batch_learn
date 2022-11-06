import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import GlobalProvider, { GlobalContext } from "../../Context/Index";

const PublicRoute = ({ children }) => {
  const { token } = GlobalProvider();

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
