// AuthProvider.js
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, registerUser } from '../api/authApi';
import Loader from '../components/Loader';
import { requestHandler } from '../utils';
import { showSuccessToast } from '../utils/toastUtils';

// Create a context to manage authentication-related data and functions
const AuthContext = createContext({
  login: async () => {},
  checkAuth: async () => {},
  register: async () => {},
  logout: async () => {},
});

/**
 * Creates an AuthProvider component that provides authentication-related data and functions.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child elements to be rendered.
 * @return {ReactElement} The rendered AuthProvider component.
 */
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Asynchronously logs in a user with the provided data.
   *
   * @param {Object} data - The data required for user login.
   * @return {Promise<void>} A promise that resolves when the login is successful.
   */
  const login = async (data) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        showSuccessToast(`${res.message}\n Welcome ${data.name} !`);
        // console.info(data);

        navigate(`/${data.redirectUrl}/dashboard`, {
          replace: true,
        }); // Redirect to the chat page after successful login
      }
    );
  };

  /**
   * Registers a user with the provided data asynchronously.
   *
   * @param {Object} data - The data required for user registration.
   * @return {Promise<void>} A promise that resolves after successful registration.
   */
  const register = async (data) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      (res) => {
        showSuccessToast(`${res.message}`);
        navigate('/login'); // Redirect to the login page after successful registration
      }
    );
  };

  /**
   * Logs out the user asynchronously.
   *
   * @return {Promise<void>} A promise that resolves after successful logout.
   */
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        showSuccessToast('Logged out successfully!');
        navigate('/login'); // Redirect to the login page after successful logout
      }
    );
  };

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {isLoading ? <Loader /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
