import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://oro24world.com/api',
  headers: {
    'x-app-id': 'KYCTY', // Provided in your example
    'Content-Type': 'application/json',
  },
});

// Optional: attach token from localStorage if you like
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
