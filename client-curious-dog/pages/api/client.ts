import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { getAuthToken } from '../../util/token-storage';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

client.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAuthToken();

  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
});

client.interceptors.response.use(
  response => response,
  error => {
    toast(`${(error?.response?.data?.error || error?.response?.data) ?? error}`, { type: 'error' });
    return Promise.reject(error);
  },
);

export default client;
