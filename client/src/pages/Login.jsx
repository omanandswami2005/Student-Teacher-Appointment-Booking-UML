import 'flowbite';
import  { useState, useEffect } from 'react';
import  useAuth  from '../hooks/useAuth';
import {checkAuthUser} from '../api/authApi';
import { useNavigate } from 'react-router-dom';
// import DarkToggler from '../components/DarkToggler';

const Login = () => {
const { login, register } = useAuth();
const [isLogin, setIsLogin] = useState(true);
const navigate = useNavigate();



    useEffect(() => {

      const isDark = localStorage.theme ==="dark"? true:false;
      if(isDark) document.documentElement.classList.add('dark');
   const autoLogin =  async () => {
     try {
       const res = await checkAuthUser();
       console.log(res);
       if (res.success) {
         navigate(`/${res.data.user.role}`,{replace:true});
       }
     } catch (error) {
      //  console.error(error);
     
     }
    }
     autoLogin();

    }, [ navigate ]);

      // State to manage input data (username and password)
  const [data, setData] = useState({
    name: "",
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

  return (<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 m-4">
      {isLogin ? (
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">Login</h2>
      ) : (
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">Student Registration</h2>
      )}
      <form className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleDataChange("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
              required
              placeholder="e.g. omanand swami"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
            required
            value={data.email}
            onChange={handleDataChange("email")}
            placeholder="e.g. mail@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
            required
            value={data.password}
            onChange={handleDataChange("password")}
            placeholder="********"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? "Don't" : 'Already'} have an account?{' '}
        <button
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
          onClick={toggleForm}
        >
          {isLogin ? 'Register (students only)' : 'Login'}
        </button>
      </p>
    </div>
  </div>
  );
};

export default Login;
