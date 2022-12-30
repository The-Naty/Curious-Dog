import axios from 'axios';
import { toast } from 'react-toastify';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

client.interceptors.response.use(
  response => response,
  error => {
    toast(`${(error?.response?.data?.error || error?.response?.data) ?? error}`, { type: 'error' });
    throw error;
  },
);

export default client;
