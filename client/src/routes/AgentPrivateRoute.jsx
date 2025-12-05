import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const AgentPrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is logged in and has role "Agent"
  if (!user || user.role !== "Agent") {
    return <Navigate to="/agent-login" state={{ from: location?.pathname }} />;
  }

  return children;
};

export default AgentPrivateRoute;