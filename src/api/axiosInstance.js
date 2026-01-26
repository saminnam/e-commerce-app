import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // base URL for all API calls
});

// Add Authorization header to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get saved JWT
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
