import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SubAdminPrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Sub Admin"
  if (!user || user.role !== "Sub Admin") {
    return <Navigate to="/sub-admin-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default SubAdminPrivateRoute;