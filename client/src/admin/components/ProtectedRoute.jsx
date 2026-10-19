import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) return <Navigate to={"/admin/login"} replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
