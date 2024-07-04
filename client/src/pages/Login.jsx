import 'flowbite';
import  { useState, useEffect } from 'react';
import  useAuth  from '../hooks/useAuth';
import {checkAuthUser} from '../api/authApi';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const { login } = useAuth();

const navigate = useNavigate();



    useEffect(() => {

      const isDark = localStorage.theme ==="dark"? true:false;
      if(isDark) document.documentElement.classList.add('dark');
   const autoLogin =  async () => {
   
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
     
    }
     autoLogin();

    }, [ navigate ]);

      // State to manage input data (username and password)
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};


    const nav = () => {
      navigate('/register', {replace:true});
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


  return (<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 m-4">
    
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">Login</h2>
      
      <form className="space-y-4">
       
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
            type={showPassword ? "text" : "password"}
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-gray-200"
            required
            value={data.password}
            onChange={handleDataChange("password")}
            placeholder="********"
          />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="  text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 border rounded-md mt-2 p-2"
              disabled={data.password.length === 0}
            >
            {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={ handleLogin }
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <button
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
          onClick={nav}
        >
          Register Now (Student only !)
        </button>
      </p>
    </div>
  </div>
  );
};

export default Login;
