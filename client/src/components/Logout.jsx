// import React from 'react';
import  {requestHandler}  from '../utils';
import {logoutUser} from '../api/authApi';

import {useNavigate} from 'react-router-dom';

const LogoutButton = () => {

    const nav = useNavigate();

    const onLogout = async () => {

        //confirm logout
    if(!window.confirm('Are you sure you want to logout?')) return
        await requestHandler(
async () => await logoutUser(),
null,
(res) => {
  console.log(res);
  nav('/',{replace:true});
}
        )

        
    }
  return (
    <button
      onClick={onLogout}
      className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
