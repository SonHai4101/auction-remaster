import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data) {
        return response.data;
      }
      return response;
    }
    return response;
  },
  (error) => {
    const errorMessage = "Something went wrong";
    if (error.response.data) {
      throw { ...error.response.data };
    } else {
      throw { ...error, message: errorMessage };
    }
  }
);

export { axiosInstance };
