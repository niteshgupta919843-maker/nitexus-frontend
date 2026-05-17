
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Redirect to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Redirect to home if not admin
export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
