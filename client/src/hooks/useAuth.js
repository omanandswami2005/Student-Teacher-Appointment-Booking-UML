/**
 * Custom hook to access authentication context.
 *
 * This hook provides an easy way to access the `AuthContext` within your components.
 * 
 * Usage:
 * ```jsx
 * import useAuth from 'path/to/useAuth';
 * 
 * const Component = () => {
 *   const auth = useAuth();
 *   // Use the auth object as needed
 * };
 * ```
 *
 * @returns {object} The value provided by `AuthContext`.
 */
import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; 

const useAuth = () => useContext(AuthContext);

export default useAuth;
