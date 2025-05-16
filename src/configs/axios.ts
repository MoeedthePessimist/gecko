import axios from "axios";
import { env } from "./env";

// Create an Axios instance
const api = axios.create({
  baseURL: env.axios.BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or use a secure storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally clear token, redirect to login, or try token refresh
      localStorage.removeItem("authToken");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
