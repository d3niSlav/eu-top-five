import axios, { type AxiosInstance } from 'axios';


const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // process.env.VUE_APP_USERS_API_DOMAIN,
});

apiClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;