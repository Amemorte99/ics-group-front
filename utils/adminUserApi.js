// utils/adminUserApi.js
import adminApi from './adminApi';

export const adminUserApi = {
  getAll: () => adminApi.get('/users'),
  getById: (id) => adminApi.get(`/users/${id}`),
  create: (data) => adminApi.post('/users', data),
  update: (id, data) => adminApi.put(`/users/${id}`, data),
  delete: (id) => adminApi.delete(`/users/${id}`),
};