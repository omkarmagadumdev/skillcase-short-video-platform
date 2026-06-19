import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN } from "../utils/routes";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (!(isAuthenticated && token)) {
    return <Navigate to={LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
