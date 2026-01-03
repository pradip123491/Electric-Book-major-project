import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!user.isAdmin) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
