import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequiresAuth() {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
