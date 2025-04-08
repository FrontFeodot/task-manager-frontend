import axios from 'axios';

const BASE_URL = window.origin === 'http://localhost:3000' ? 'http://localhost:4000' : 'https://task-manager-backend-2fp1.onrender.com'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default axiosInstance;
