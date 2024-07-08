import axios from 'axios';

/**
 * Create an Axios instance with custom configuration.
 *
 * The Axios instance is configured to:
 * - Include credentials in requests.
 * - Set a timeout of 40 seconds.
 * - Use 'application/json' as the Content-Type for all requests.
 *
 * @module axiosInstance
 * @returns {AxiosInstance} The configured Axios instance.
 */
const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
