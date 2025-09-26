import axios from "axios";
import { getToken, removeToken } from "../storage";

const api = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br",
  headers: {
    Accept: "application/json;version=v1_web",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default api;
