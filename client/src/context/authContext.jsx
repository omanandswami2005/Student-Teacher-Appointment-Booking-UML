import  { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../api/authApi";
import Loader from "../components/Loader";
import { LocalStorage, requestHandler } from "../utils";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Function to handle user login
  const login = async (data) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        // console.log(data);
        // setUser(data.user);
        setToken(data.token);
        // LocalStorage.set("user", data.user);
        LocalStorage.set("tokenLocal", data.token);
        
        navigate("/dash"); // Redirect to the chat page after successful login
      },
      alert // Display error alerts on request failure
    );
  };

  // Function to handle user registration
  const register = async (data) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        alert("Account created successfully! Go ahead and login.");
        navigate("/login"); // Redirect to the login page after successful registration
      },
      alert // Display error alerts on request failure
    );
  };

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        LocalStorage.clear(); // Clear local storage on logout
        navigate("/login"); // Redirect to the login page after successful logout
      },
      alert // Display error alerts on request failure
    );
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");
    if (_token && _user?._id) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {isLoading ? <Loader /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};
// Add PropTypes validation for the 'children' prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired }
  
// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };