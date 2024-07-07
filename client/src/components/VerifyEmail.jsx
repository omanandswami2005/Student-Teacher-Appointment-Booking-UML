import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { requestHandler } from '../utils';
import { verifyEmail } from '../api/authApi';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ? true : false;
    if (isDark) document.documentElement.classList.add('dark');
    const verifyEmailToken = async () => {
      await requestHandler(
        async () => await verifyEmail(token),
        null,
        (res) => {
          setMessage(res.message);
        }
      );
      setLoading(false); // Set loading to false after the request completes
    };

    if (token) {
      verifyEmailToken();
    } else {
      setMessage('No token provided.');
      setLoading(false); // Set loading to false if no token is provided
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
          Email Verification
        </h2>
        {loading ? (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Verifying your email...
          </p>
        ) : (
          <>
            {message && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
            )}
            {message === 'Email verified successfully 😃' && (
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                >
                  Click here to login
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
