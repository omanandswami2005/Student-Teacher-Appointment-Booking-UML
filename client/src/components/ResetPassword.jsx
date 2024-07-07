// frontend/components/ResetPassword.js
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/authApi'; // You need to implement this
import { requestHandler } from '../utils';
import { showSuccessToast } from '../utils/toastUtils';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  const makeReq = async () => {
    await requestHandler(
      async () => await resetPassword(token, newPassword),
      null,
      (res) => {
        showSuccessToast(`${res.message}`);
        setIsResetSuccessful(true);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage('Please enter new password and confirm password');
      return;
    }
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    await makeReq();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        {!isResetSuccessful ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
              Reset Password
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                  placeholder="********"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                  placeholder="********"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
            {message && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
              Password Reset Successful 🎉
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Your password has been reset successfully.
            </p>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
