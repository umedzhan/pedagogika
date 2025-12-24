// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await api.get("/me");
    return res.data.id;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
};

export default api;
