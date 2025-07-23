import axios from 'axios';

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add access token
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('https://localhost:3000/auth/refresh', {
          refreshToken,
        });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        axiosClient.defaults.headers[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Optionally handle logout here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
