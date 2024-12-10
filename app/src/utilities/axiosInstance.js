import axios from "axios";
import Cookies  from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(
    (config) => {
       
        const accessToken = Cookies .get('token');
        if (accessToken) {
           
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
      
        const response = await axiosInstance.post("/users/refreshToken");
        const newAccessToken = response.data.token;

       
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        
        return axiosInstance(originalRequest);
      } catch (err) {
        
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
