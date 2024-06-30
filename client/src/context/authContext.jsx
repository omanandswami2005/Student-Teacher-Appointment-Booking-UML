// AuthProvider.js
import  { createContext,  useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser,  } from "../api/authApi";
import Loader from   "../components/Loader";
import { requestHandler } from "../utils";
import { showSuccessToast } from '../utils/toastUtils';

// Create a context to manage authentication-related data and functions
const AuthContext = createContext({
  login: async () => {},
  checkAuth: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Create a component that provides authentication-related data and functions
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        showSuccessToast(`${res.message}\n Welcome ${data.name} !`);
        // console.info(data); 

        navigate(`/${data.redirectUrl}/dashboard`); // Redirect to the chat page after successful login
      },
     
    );
  };

  

  const register = async (data) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        showSuccessToast("Account created successfully! \nGo ahead and login.");
        navigate("/login"); // Redirect to the login page after successful registration
      },
     
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        showSuccessToast("Logged out successfully!");
        navigate("/login"); // Redirect to the login page after successful logout
      },
     
    );
  };

  return (
    <AuthContext.Provider value={{ login, register, logout,  }}>
      {isLoading ? <Loader /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
