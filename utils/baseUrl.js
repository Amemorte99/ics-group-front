// utils/baseUrl.js
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.icsolution.fr/api';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'https://api.icsolution.fr';

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
};