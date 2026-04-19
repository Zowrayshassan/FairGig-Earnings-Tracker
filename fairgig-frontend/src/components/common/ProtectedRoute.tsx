import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    // Redirect to login if no user is found
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = JSON.parse(storedUser);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user role is not allowed, redirect to their default home
    const redirectPath = user.role === 'Verifier' ? '/verifier' : 
                         user.role === 'Advocate' ? '/advocate' : 
                         '/worker';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
