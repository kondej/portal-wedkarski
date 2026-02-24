import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getUser: () => api.get('/auth/user')
};

export const polowAPI = {
    getAll: (params) => api.get('/polowy-wszystkie', { params }),
    getAllUser: (params) => api.get('/polowy', { params }),
    get: (id) => api.get(`/polowy/${id}`),
    create: (data) => api.post('/polowy', data),
    update: (id, data) => api.put(`/polowy/${id}`, data),
    delete: (id) => api.delete(`/polowy/${id}`)
};

export const lowiskoAPI = {
    getAll: (params) => api.get('/lowiska', { params }),
    get: (id) => api.get(`/lowiska/${id}`),
    getTypes: () => api.get('/lowiska-typy'),
    create: (data) => api.post('/lowiska', data),
    update: (id, data) => api.put(`/lowiska/${id}`, data),
    delete: (id) => api.delete(`/lowiska/${id}`)
};

export const gatunekAPI = {
    getAll: (params) => api.get('/gatunki', { params }),
    get: (id) => api.get(`/gatunki/${id}`),
    create: (data) => api.post('/gatunki', data),
    update: (id, data) => api.put(`/gatunki/${id}`, data),
    delete: (id) => api.delete(`/gatunki/${id}`)
};

export default api;