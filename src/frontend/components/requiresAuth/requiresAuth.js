import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts";

export default function RequiresAuth() {
  const { state } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
