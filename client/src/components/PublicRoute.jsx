// Import necessary libraries and types
// import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";
import PropType from 'prop-types';
import { LocalStorage } from "../utils";

// Define the PublicRoute component which takes in children as its prop
const PublicRoute= ({ children }) => {
  // Destructure token and user from the authentication context
//   const { token,  } = useAuth();

const token = LocalStorage.get("tokenLocal");

  // If there is a valid token and user ID, navigate the user to the dasboard
  if (token) return <Navigate to="/dash" replace />;

  // If no token or user ID exists, render the child components as they are
  return children;
};

// Define PropTypes for the PublicRoute component
PublicRoute.propTypes = {
  children: PropType.node.isRequired
};

// Export the PublicRoute component for use in other parts of the application
export default PublicRoute;