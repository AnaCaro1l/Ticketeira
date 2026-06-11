import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@UniTick:token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('@UniTick:token');
      localStorage.removeItem('@UniTick:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);