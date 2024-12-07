import axios from "axios";
import Cookies  from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or Redux store (wherever you're storing it)
        const accessToken = Cookies .get('token');
        if (accessToken) {
            // Include the token in the Authorization header
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        // Request a new access token using the refresh token
        const response = await axiosInstance.post("/users/refreshToken");
        const newAccessToken = response.data.token;

        // Update the instance's Authorization header
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (err) {
        // Optional: Redirect to login or handle logout
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
