// src/services/axios.js
import axios from "axios";

// Set up Axios instance
const baseURL = "https://fakestoreapi.com";

const instance = axios.create({ baseURL });

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  // Add any headers or configurations you need here
  return config;
});

export default instance;
