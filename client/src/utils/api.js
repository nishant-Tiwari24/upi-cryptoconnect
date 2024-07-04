// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5550/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
