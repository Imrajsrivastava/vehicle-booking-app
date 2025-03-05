import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
