import { seoApi } from '../utils/api';

const TTL_MS = 5 * 60 * 1000;
let cache = { at: 0, map: {} };

// Réglages SEO édités dans le back office, indexés par chemin. Mis en cache pour ne pas ralentir chaque page.
export async function getSeoOverrides() {
  if (Date.now() - cache.at < TTL_MS) return cache.map;
  try {
    const response = await seoApi.getAll();
    const map = {};
    (Array.isArray(response.data) ? response.data : []).forEach((entry) => {
      map[entry.path] = entry;
    });
    cache = { at: Date.now(), map };
  } catch (error) {
    cache = { at: Date.now() - TTL_MS + 30 * 1000, map: cache.map };
  }
  return cache.map;
}
