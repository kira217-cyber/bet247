import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const MasterPrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Master"
  if (!user || user.role !== "Master") {
    return <Navigate to="/master-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default MasterPrivateRoute;