// lib/api.ts or services/api.ts
import axios from 'axios';
import Constants from 'expo-constants';
import { getData } from '@/lib/utils/storage';

console.log(Constants.expoConfig?.extra?.API_URL);

const apiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add Authorization header if token exists
apiClient.interceptors.request.use (
  async (config) => {
    const token = await getData('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
);

apiClient.interceptors.response.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error)
  }
)

export default apiClient;
