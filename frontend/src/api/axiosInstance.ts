import axios from "axios";

/*
    Axios is a library that makes HTTPs request,
    like fetching data from API.
*/

// Create a custom axios instance that makes an API call
// from a specific url and headers for the content format.
const axiosInstance = axios.create({
  baseURL: import.meta.env.Vite_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Check for any token and attached to the reuest bearer.
// Ensure secure access to APIs
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If response is successful, get the response,
// otherwise reject the token (401 - unauthorised) and redirect to login page.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "./login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
