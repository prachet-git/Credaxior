import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }: any) {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");


  if (!token) {
    return <Navigate to="/" replace />;
  }

  
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
