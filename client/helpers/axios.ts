import axios from 'axios';
import {redirect} from 'next/navigation'
import { useCookies } from 'next-client-cookies';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers && !config.url?.includes('auth')) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response?.status === 401 && !error.request?.responseURL?.includes('auth')) {
      redirect('/login')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;