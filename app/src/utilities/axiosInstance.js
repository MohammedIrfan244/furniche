import axios from "axios";
import Cookies from "js-cookie";
import axiosErrorManager from "./axiosErrorManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // Ensures cookies are sent
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried to avoid infinite loops
      try {
        // Attempt to refresh the token
        const response = await axios.post("http://localhost:3001/api/users/refreshToken", {}, {
          withCredentials: true, // Include cookies in the request
        });
        const newAccessToken = response.data.token;

        // Update cookies and headers with new token
        Cookies.set("token", newAccessToken, { secure: true, sameSite: "None" });
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);
        toast.error("Session expired. Please log in again.");
        Cookies.remove("token"); // Clear invalid token
        Cookies.remove("refreshToken"); // Clear refresh token
        Cookies.remove("user"); // Clear user data

        // Redirect to login
        const navigate = useNavigate();
        navigate("/login");
        return Promise.reject(err);
      }
    }

    // Handle other errors
    console.error("Request failed:", axiosErrorManager(error));
    return Promise.reject(error);
  }
);

export default axiosInstance;
