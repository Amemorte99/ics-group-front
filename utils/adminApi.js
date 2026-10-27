// utils/adminApi.js
import axios from 'axios';
import { API_URL } from './baseUrl';

console.log('🔗 API URL:', API_URL);

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Exigé par l'API pour toute modification authentifiée par cookie (protection CSRF).
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// La session vit dans des cookies httpOnly : le navigateur n'expose plus aucun jeton au JavaScript.
// On ne garde en localStorage que le profil affiché (nom, rôle), sans donnée sensible.
const USER_KEY = 'adminUser';
if (typeof window !== 'undefined') localStorage.removeItem('adminToken'); // ancien stockage du jeton

const endSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
  if (!window.location.pathname.startsWith('/admin/login')) window.location.href = '/admin/login';
};

// Une seule demande de renouvellement à la fois, même si plusieurs requêtes expirent ensemble.
let refreshing = null;
const refreshSession = () => {
  if (!refreshing) {
    refreshing = adminApi.post('/auth/refresh').finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
};

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isAuthCall = config?.url?.startsWith('/auth/');
    if (response?.status === 401 && config && !config._retried && !isAuthCall) {
      config._retried = true;
      try {
        await refreshSession();
        return adminApi(config);
      } catch (refreshError) {
        endSession();
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ============
export const authApi = {
  login: (email, password, otp) => adminApi.post('/auth/login', { email, password, ...(otp ? { otp } : {}) }),
  logout: async () => {
    try {
      await adminApi.post('/auth/logout');
    } catch (error) {
      // la session locale est fermée dans tous les cas
    }
    endSession();
  },
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch (error) {
      return null;
    }
  },
  saveUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  isAuthenticated: () => typeof window !== 'undefined' && !!localStorage.getItem(USER_KEY),
  profile: () => adminApi.get('/auth/profile'),
  changePassword: (currentPassword, newPassword) => adminApi.post('/auth/change-password', { currentPassword, newPassword }),
  setupTwoFactor: () => adminApi.post('/auth/2fa/setup'),
  enableTwoFactor: (code) => adminApi.post('/auth/2fa/enable', { code }),
  disableTwoFactor: (password, code) => adminApi.post('/auth/2fa/disable', { password, code }),
};

// ============ AUDIT ============
export const adminAuditApi = {
  list: (params) => adminApi.get('/audit', { params }),
};

// ============ USERS ============
export const adminUserApi = {
  getAll: () => adminApi.get('/users'),
  getById: (id) => adminApi.get(`/users/${id}`),
  create: (data) => adminApi.post('/users', data),
  update: (id, data) => adminApi.put(`/users/${id}`, data),
  delete: (id) => adminApi.delete(`/users/${id}`),
};

// ============ PORTFOLIO ============
export const adminPortfolioApi = {
  getAll: () => adminApi.get('/portfolios/all'),
  getById: (id) => adminApi.get(`/portfolios/${id}`),
  getBySlug: (slug) => adminApi.get(`/portfolios/slug/${slug}`), // ✅ AJOUTÉ
  create: (data) => adminApi.post('/portfolios', data),
  update: (id, data) => adminApi.put(`/portfolios/${id}`, data),
  delete: (id) => adminApi.delete(`/portfolios/${id}`),
  toggleActive: (id) => adminApi.post(`/portfolios/${id}/toggle-active`), // ✅ AJOUTÉ
};

// ============ SERVICES ============
export const adminServiceApi = {
  getAll: () => adminApi.get('/services/all'),
  getById: (id) => adminApi.get(`/services/${id}`),
  create: (data) => adminApi.post('/services', data),
  update: (id, data) => adminApi.put(`/services/${id}`, data),
  delete: (id) => adminApi.delete(`/services/${id}`),
  toggleActive: (id) => adminApi.post(`/services/${id}/toggle-active`), // ✅ AJOUTÉ
};

// ============ BLOG ============
export const adminBlogApi = {
  getAll: () => adminApi.get('/blogs/all'),
  getById: (id) => adminApi.get(`/blogs/${id}`),
  getBySlug: (slug) => adminApi.get(`/blogs/slug/${slug}`),
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
  toggleActive: (id) => adminApi.post(`/testimonials/${id}/toggle-active`), // ✅ AJOUTÉ
  toggleFeatured: (id) => adminApi.post(`/testimonials/${id}/toggle-featured`), // ✅ AJOUTÉ
};

// ============ PARTNERS ============
export const adminPartnerApi = {
  getAll: () => adminApi.get('/partners/all'),
  getById: (id) => adminApi.get(`/partners/${id}`),
  create: (data) => adminApi.post('/partners', data),
  update: (id, data) => adminApi.put(`/partners/${id}`, data),
  delete: (id) => adminApi.delete(`/partners/${id}`),
  toggleActive: (id) => adminApi.post(`/partners/${id}/toggle-active`), // ✅ AJOUTÉ
  toggleFeatured: (id) => adminApi.post(`/partners/${id}/toggle-featured`), // ✅ AJOUTÉ
};

// ============ DASHBOARD ============
export const adminDashboardApi = {
  overview: () => adminApi.get('/dashboard'),
};

// ============ CONTACT ============
export const adminContactApi = {
  getAll: (unreadOnly = false) => adminApi.get('/contact', { params: unreadOnly ? { unread: true } : {} }),
  unreadCount: () => adminApi.get('/contact/unread-count'),
  setRead: (id, isRead) => adminApi.patch(`/contact/${id}/read`, { isRead }),
  delete: (id) => adminApi.delete(`/contact/${id}`),
};

// ============ MÉDIATHÈQUE ============
export const adminMediaApi = {
  getAll: (search) => adminApi.get('/media', { params: search ? { search } : {} }),
  upload: (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('files', file));
    return adminApi.post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateAlt: (id, alt) => adminApi.patch(`/media/${id}`, { alt }),
  delete: (id) => adminApi.delete(`/media/${id}`),
};

// ============ SEO PAR PAGE ============
export const adminSeoApi = {
  getAll: () => adminApi.get('/seo'),
  save: (data) => adminApi.put('/seo', data),
  delete: (id) => adminApi.delete(`/seo/${id}`),
};

// ============ UPLOAD ============
export const uploadApi = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return adminApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadMultiple: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return adminApi.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default adminApi;