import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      console.log('ProtectedRoute - Auth check:', { isLoggedIn, loginTime });
      
      // ALWAYS require fresh authentication for dashboard access
      if (isLoggedIn !== 'true') {
        console.log('ProtectedRoute - Not authenticated, redirecting');
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      // Check session expiry (24 hours)
      if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          console.log('ProtectedRoute - Session expired, clearing');
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminUsername');
          localStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }
      }

      console.log('ProtectedRoute - Authentication successful');
      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [location]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-gray-600">Verifying access...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login');
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
