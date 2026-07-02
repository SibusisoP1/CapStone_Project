import axios from "axios";

// Base URL of the backend API. Override with VITE_API_URL in a .env file.
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Root of the backend server (used to build absolute URLs for uploaded images).
export const SERVER_URL = API_URL.replace(/\/api\/?$/, "");

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const stored = localStorage.getItem("userInfo");
  const userInfo = stored ? JSON.parse(stored) : null;
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// Turn a stored image path (e.g. "/src/uploads/xyz.png") into an absolute URL.
export const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `${SERVER_URL}${img.startsWith("/") ? "" : "/"}${img}`;
};

export default axiosInstance;
