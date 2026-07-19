// utils/adminApi.js
import axios from 'axios';

// ✅ URL correcte
const adminApi = axios.create({
  baseURL: 'http://localhost:3001/api',  // Pas de / à la fin !
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour le token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs 401
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ============
export const authApi = {
  login: (email, password) => adminApi.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  },
  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('adminUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('adminToken');
    }
    return false;
  },
};

// ============ PORTFOLIO ============
export const adminPortfolioApi = {
  getAll: () => adminApi.get('/portfolios/all'),
  getById: (id) => adminApi.get(`/portfolios/${id}`),
  create: (data) => adminApi.post('/portfolios', data),
  update: (id, data) => adminApi.put(`/portfolios/${id}`, data),
  delete: (id) => adminApi.delete(`/portfolios/${id}`),
};

// ============ SERVICES ============
export const adminServiceApi = {
  getAll: () => adminApi.get('/services/all'),
  getById: (id) => adminApi.get(`/services/${id}`),
  create: (data) => adminApi.post('/services', data),
  update: (id, data) => adminApi.put(`/services/${id}`, data),
  delete: (id) => adminApi.delete(`/services/${id}`),
};

// ============ BLOG ============
export const adminBlogApi = {
  getAll: () => adminApi.get('/blogs/all'),
  getById: (id) => adminApi.get(`/blogs/${id}`),
  create: (data) => adminApi.post('/blogs', data),
  update: (id, data) => adminApi.put(`/blogs/${id}`, data),
  delete: (id) => adminApi.delete(`/blogs/${id}`),
  togglePublish: (id) => adminApi.post(`/blogs/${id}/toggle-publish`),
  toggleFeatured: (id) => adminApi.post(`/blogs/${id}/toggle-featured`),
};

// ============ TESTIMONIALS ============
export const adminTestimonialApi = {
  getAll: () => adminApi.get('/testimonials/all'),
  getById: (id) => adminApi.get(`/testimonials/${id}`),
  create: (data) => adminApi.post('/testimonials', data),
  update: (id, data) => adminApi.put(`/testimonials/${id}`, data),
  delete: (id) => adminApi.delete(`/testimonials/${id}`),
};

// ============ PARTNERS ============
export const adminPartnerApi = {
  getAll: () => adminApi.get('/partners/all'),
  getById: (id) => adminApi.get(`/partners/${id}`),
  create: (data) => adminApi.post('/partners', data),
  update: (id, data) => adminApi.put(`/partners/${id}`, data),
  delete: (id) => adminApi.delete(`/partners/${id}`),
};

export default adminApi;