// Import required modules and types from React and react-router-dom libraries
// import React  from "react";
import { Navigate } from "react-router-dom";
// Import authentication context for retrieving user and token information
import PropTypes from 'prop-types';
// import { useAuth } from "../context/authContext";
import { LocalStorage } from "../utils";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute = ({ children }) => {
  // Destructure token and user details from the authentication context
  const token = LocalStorage.get("tokenLocal");
    console.log(token)
  // If there's no token or user ID, redirect to the login page
  if (!token) return <Navigate to="/login" replace />;

  // If authenticated, render the child components
  return children;
};

// Define PropTypes for the PrivateRoute component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;