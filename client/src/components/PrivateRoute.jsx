import { useEffect, useState, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkAuthUser } from '../api/authApi';
import { requestHandler } from '../utils';

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute = ({ role }) => {
  // console.log(role);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const verifyAuth = useCallback(async () => {
    await requestHandler(
      async () => await checkAuthUser(),
      null,
      (res) => {
        // console.log(res.data.user.role);
        setUserRole(res.data.user.role);
        if (res.role === role) {
          // console.log(res.data.user.role);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    );
  }, [role]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  if (isAuthenticated === null) {
    return (
      <div
        role="status"
        className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    ); // Show a loading indicator while authentication is being checked
  }

  if (userRole !== role) {
    // console.log('.............');
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};

// Define PropTypes for the PrivateRoute component
PrivateRoute.propTypes = {
  role: PropTypes.string.isRequired,
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
