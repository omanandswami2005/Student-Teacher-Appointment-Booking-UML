import 'flowbite';

import  { useState, useEffect } from 'react';
import  useAuth  from '../hooks/useAuth';
import {checkAuthUser} from '../api/authApi';
import { useNavigate } from 'react-router-dom';


const StudentRegistration = () => {

  const {  register } = useAuth();

const navigate = useNavigate();


useEffect(()=>{
 
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

},[navigate])


const [data, setData] = useState({
  name:"",
  email: "",
  password: "",
});
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const handleDataChange =
  (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };


  const handleRegister = async () => await register(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">Student Registration</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleDataChange("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder='e.g. Omanand Prashant Swami'
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={handleDataChange("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="e.g. mail@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={data.password}
              placeholder="********"
              onChange={handleDataChange("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentRegistration;
