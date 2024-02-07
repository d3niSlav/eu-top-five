import axios, { type AxiosInstance } from 'axios';


const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.football-data.org/v4/', // process.env.VUE_APP_API_DOMAIN,
  headers: {
    "X-Auth-Token": 'YOUR_API_KEY', // process.env.VUE_APP_API_KEY,
  },
});

export default apiClient;