import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://honest-surprise-46391dbd44.strapiapp.com';

export const getPortfolios = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/portfolios?populate=*`);
    return res.data.data; // Strapi v4 retourne { data: [...] }
  } catch (error) {
    console.error("Erreur getPortfolios:", error);
    return [];
  }
};

// utils/api.js
export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/categories?populate=*`);
    return res.data.data; // Retourne directement le tableau des catégories
  } catch (error) {
    console.error("Erreur getCategories:", error);
    return [];
  }
};