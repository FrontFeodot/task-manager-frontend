import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // serverUrl
  timeout: 10000, // response timeout
});

export default axiosInstance;
