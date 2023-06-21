import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
