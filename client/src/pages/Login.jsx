import 'flowbite';
import  { useState } from 'react';
import { useAuth } from '../context/authContext';
const Login = () => {
const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);

      // State to manage input data (username and password)
  const [data, setData] = useState({
    email: "",
    password: "",
  });

    const toggleForm = () => {
        setIsLogin(!isLogin);
      };

    // Function to update state when input data change
  const handleDataChange =
  (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

   // Function to handle the login process
   const handleLogin = async () => await login(data);

   const handleRegister = async () => await register(data);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6 m-4">
      {isLogin ? (
        <h2 className="text-2xl font-bold text-center">Login</h2>
      ) : (
        <h2 className="text-2xl font-bold text-center">Student Registration</h2>
      )}
        <form className="space-y-4">
            {!isLogin && (  <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="e.g. omanand swami"
            />
          </div>) }
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              value={data.email}
              onChange={handleDataChange("email")}
              placeholder="e.g. mail@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              value={data.password}
              onChange={handleDataChange("password")}
              placeholder="********"

            />
          </div>
          {/* <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div> */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={isLogin ? () => handleLogin() : () => handleRegister()}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
         {isLogin ? 'Don\'t' : 'Already'} have an account?{' '}
          <button
            
            className="text-indigo-600   hover:underline"
            onClick={toggleForm}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
