// utils/baseUrl.js
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getApiUrl = (endpoint) => `${API_URL}${endpoint}`;