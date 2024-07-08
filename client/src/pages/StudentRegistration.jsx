import 'flowbite';

import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { checkAuthUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
/**
 * Renders the StudentRegistration component, which allows students to register for an account.
 *
 * @return {JSX.Element} The rendered StudentRegistration component.
 */
const StudentRegistration = () => {
  /**
   * The `register` function from the `useAuth` hook, used to register a new user.
   */
  const { register } = useAuth();

  /**
   * The `useNavigate` hook from `react-router-dom`, used to navigate to other pages.
   */
  const navigate = useNavigate();

  /**
   * State to manage validation errors.
   */
  const [errors, setErrors] = useState({});

  /**
   * Asynchronously attempts to automatically log in the user if they are already authenticated.
   *
   * @return {Promise<void>} A promise that resolves after attempting auto-login.
   */
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ? true : false;
    if (isDark) document.documentElement.classList.add('dark');

    const autoLogin = async () => {
      try {
        const res = await checkAuthUser();
        const { data } = res;
        if (res.success) {
          navigate(`/${data.user.redirectUrl}/dashboard`, {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    autoLogin();
  }, [navigate]);

  /**
   * State to manage the form data.
   */
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  /**
   * State to manage the visibility of the password field.
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the visibility of the password field.
   *
   * @return {void} No return value.
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Updates the form data based on user input.
   *
   * @param {string} name - The name of the form field.
   * @param {Event} e - The event object from the form input change.
   * @return {void} No return value.
   */
  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  /**
   * Handles the form submission.
   *
   * @param {Event} event - The event object from the form submission.
   * @return {Promise<void>} A promise that resolves after handling the form submission.
   */
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // 1. Validate the form data
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    // 2. If no errors, proceed with registration
    if (Object.keys(validationErrors).length === 0) {
      await register(data); // Your registration function
      // Handle success (e.g., show a success message)
    }
  };

  /**
   * Validates the form data.
   *
   * @param {object} data - The form data.
   * @return {object} An object containing any validation errors.
   */
  const validateForm = (data) => {
    const errors = {};
    // Validation rules
    if (!data.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.password || data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
          Student Registration
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleDataChange('name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="e.g. Omanand Prashant Swami"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={handleDataChange('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="e.g. mail@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={data.password}
              placeholder="********"
              onChange={handleDataChange('password')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 border rounded-md mt-2 px-2 py-1 text-xs"
              disabled={data.password.length === 0}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegistration;
