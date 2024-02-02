import axios, { type AxiosInstance } from "axios";


const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.football-data.org/v4/', //process.env.VUE_APP_API_DOMAIN,
  headers: {
    "X-Auth-Token": '0e7bd0129748442b995277990a795678', //process.env.VUE_APP_API_KEY,
  },
});

export default apiClient;