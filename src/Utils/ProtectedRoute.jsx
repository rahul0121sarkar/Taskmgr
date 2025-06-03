// src/utils/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user, authLoaded } = useAuth();

  if (!authLoaded) return <div>Loading...</div>; // or a spinner
  if (!user) {
    alert("You need to be logged in to view tasks");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
