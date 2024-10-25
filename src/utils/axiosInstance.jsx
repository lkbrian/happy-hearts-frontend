// src/utils/axiosInstance.js
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const axiosInstance = axios.create({
  baseURL: "/api", // Set your base API URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      "Intercepted Request to Append Server URL ",
      config.baseURL + config.url
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const { status } = response || {};

    if (status === 401) {
      const auth = useAuth();
      await auth.logout();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
