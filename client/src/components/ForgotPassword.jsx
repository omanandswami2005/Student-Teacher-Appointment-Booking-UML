import { useState } from 'react';
import { forgotPassword } from '../api/authApi'; // You need to implement this
import { requestHandler } from '../utils';
import { showSuccessToast } from '../utils/toastUtils';
import ReCAPTCHA from 'react-google-recaptcha';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [message, setMessage] = useState('');

  const makeReq = async () => {
    await requestHandler(
      async () => await forgotPassword(email, captchaToken),
      null,
      (res) => {
        setMessage(res.message);
        showSuccessToast(`${res.message}`);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setMessage('Please complete the CAPTCHA.');
      return;
    }
    await makeReq();
  };
  const site = import.meta.env.VITE_SITE_KEY;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="e.g. mail@example.com"
            />
          </div>
          <div>
            <ReCAPTCHA sitekey={site} onChange={handleCaptchaChange} />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
            >
              Send Reset Email
            </button>
          </div>
        </form>
        {message && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
