import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://oro24world.com/api',
  headers: {
    'x-app-id': 'KYCTY', 
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
