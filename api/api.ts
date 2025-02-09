import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_ROOT!,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  config.headers["X-Api-Access-Token"] =
    process.env.EXPO_PUBLIC_API_ACCESS_TOKEN!;

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
