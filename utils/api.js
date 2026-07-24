// utils/api.js
import axios from 'axios';

import { API_URL } from './baseUrl';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ AUTH ============
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  profile: () => api.get('/auth/profile'),
};

// ============ PORTFOLIO ============
export const portfolioApi = {
  getAll: () => {
  console.log('📡 Appel API: /portfolios');
  return api.get('/portfolios');
},
  getAllAdmin: () => api.get('/portfolios/all'),
  getById: (id) => api.get(`/portfolios/${id}`),
  getBySlug: (slug) => api.get(`/portfolios/slug/${slug}`),
  create: (data) => api.post('/portfolios', data),
  update: (id, data) => api.put(`/portfolios/${id}`, data),
  delete: (id) => api.delete(`/portfolios/${id}`),
  getCount: () => api.get('/portfolios/stats/count'),
};

// ============ SERVICES ============
export const serviceApi = {
  getAll: () => api.get('/services'),
  getAllAdmin: () => api.get('/services/all'),
  getById: (id) => api.get(`/services/${id}`),
  getBySlug: (slug) => api.get(`/services/slug/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  getCount: () => api.get('/services/stats/count'),
  getRecent: (limit = 5) => api.get(`/services/stats/recent?limit=${limit}`),
};

// ============ BLOG ============
export const blogApi = {
  getAll: () => api.get('/blogs'),
  getAllAdmin: () => api.get('/blogs/all'),
  getFeatured: () => api.get('/blogs/featured'),
  getById: (id) => api.get(`/blogs/${id}`),
  getBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  togglePublish: (id) => api.post(`/blogs/${id}/toggle-publish`),
  toggleFeatured: (id) => api.post(`/blogs/${id}/toggle-featured`),
  getCount: () => api.get('/blogs/stats/count'),
  getRecent: (limit = 5) => api.get(`/blogs/stats/recent?limit=${limit}`),
  getStats: () => api.get('/blogs/stats'),
};

// ============ TESTIMONIALS ============
export const testimonialApi = {
  getAll: () => api.get('/testimonials'),
  getAllAdmin: () => api.get('/testimonials/all'),
  getTop: (limit = 5) => api.get(`/testimonials/top?limit=${limit}`),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
  getCount: () => api.get('/testimonials/stats/count'),
  getAverageRating: () => api.get('/testimonials/stats/average-rating'),
};

// ============ PARTNERS ============
export const partnerApi = {
  getAll: () => api.get('/partners'),
  getAllAdmin: () => api.get('/partners/all'),
  getById: (id) => api.get(`/partners/${id}`),
  create: (data) => api.post('/partners', data),
  update: (id, data) => api.put(`/partners/${id}`, data),
  delete: (id) => api.delete(`/partners/${id}`),
  getCount: () => api.get('/partners/stats/count'),
};

// ============ HEALTH ============
export const healthApi = {
  check: () => api.get('/health'),
};

export default api;