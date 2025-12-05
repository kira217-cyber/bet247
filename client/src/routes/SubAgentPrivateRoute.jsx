import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SubAgentPrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Sub Agent"
  if (!user || user.role !== "Sub Agent") {
    return <Navigate to="/sub-agent-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default SubAgentPrivateRoute;