// lib/api.ts or services/api.ts
import axios from 'axios';
import Constants from 'expo-constants';
import { getData } from '@/lib/utils/storage';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header if token exists
api.interceptors.request.use(
  async (config) => {
    const token = await getData('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
