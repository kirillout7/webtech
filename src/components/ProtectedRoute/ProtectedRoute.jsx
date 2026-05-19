import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * «Защищённый маршрут».
 * Если пользователь не залогинен — он перенаправляется на /login,
 * а текущий адрес сохраняется в state, чтобы после входа вернуть
 * пользователя туда, куда он шёл.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
