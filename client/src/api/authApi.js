import axiosInstance from './axiosInstance';

/**
 * Log in a user with the provided data.
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} The response data.
 */
export const loginUser = async (data) => {
  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
};

/**
 * Register a new user with the provided data.
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} The response data.
 */
export const registerUser = async (data) => {
  const response = await axiosInstance.post('/api/auth/register', data);
  return response.data;
};

/**
 * Log out the current user.
 * @returns {Promise<Object>} The response data.
 */
export const logoutUser = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};

/**
 * Check if the current user is authenticated.
 * @returns {Promise<Object>} The response data.
 */
export const checkAuthUser = async () => {
  const response = await axiosInstance.get('/api/auth/check-auth');
  return response.data;
};

/**
 * Verify a user's email using a token.
 * @param {string} token - The email verification token.
 * @returns {Promise<Object>} The response data.
 */
export const verifyEmail = async (token) => {
  const response = await axiosInstance.get(
    `/api/auth/verify-email?token=${token}`
  );
  return response.data;
};

/**
 * Send a forgot password request with the user's email and captcha token.
 * @param {string} email - The user's email.
 * @param {string} captchaToken - The reCAPTCHA token.
 * @returns {Promise<Object>} The response data.
 */
export const forgotPassword = async (email, captchaToken) => {
  const response = await axiosInstance.post(`/api/auth/forgot-password`, {
    email,
    captchaToken,
  });
  return response.data;
};

/**
 * Reset a user's password using a token and new password.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password.
 * @returns {Promise<Object>} The response data.
 */
export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post(`/api/auth/reset-password`, {
    newPassword,
    token,
  });
  return response.data;
};