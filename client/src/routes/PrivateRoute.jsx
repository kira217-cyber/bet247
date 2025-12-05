import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Mother Admin"
  if (!user || user.role !== "Mother Admin") {
    return <Navigate to="/admin-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default PrivateRoute;