import axiosInstance from './axiosInstance';

export const loginUser = async (data) => {
  // console.log(data)
  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axiosInstance.post('/api/auth/register', data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};

export const checkAuthUser = async () => {
  const response = await axiosInstance.get('/api/auth/check-auth');
  return response.data;
};

//verify email
export const verifyEmail = async (data) => {
  const response = await axiosInstance.get(
    `/api/auth/verify-email?token=${data}`
  );
  return response.data;
};

//forgot password
export const forgotPassword = async (email, captchaToken) => {
  const response = await axiosInstance.post(`/api/auth/forgot-password`, {
    email,
    captchaToken,
  });
  return response.data;
};

//reset password
export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post(`/api/auth/reset-password`, {
    newPassword,
    token,
  });
  return response.data;
};
