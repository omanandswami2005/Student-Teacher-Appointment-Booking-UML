import axios from 'axios';


const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/',
  withCredentials: true,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors can be added here for request/response handling, e.g., for adding auth tokens
// axiosInstance.interceptors.request.use(
//   config => {
//     // Add authorization token here if needed
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// Response interceptor

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error, e.g., redirect to login page
//       console.error('Unauthorized access - redirecting to login.');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
