
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied to backend via Vite config
});

// Automatically attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('nitexus_user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
