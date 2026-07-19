// utils/baseUrl.js
export const API_URL = 'http://localhost:3001/api';
export const API_BASE_URL = 'http://localhost:3001';

export const getApiUrl = (endpoint) => {
  // Supprime le / au début si présent pour éviter les doubles //
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
};