import { createContext, useContext } from 'react';
import { SITE_URL } from './site';

export const LOCALES = ['fr', 'en', 'ar'];
export const DEFAULT_LOCALE = 'fr';

export const LOCALE_META = {
  fr: { label: 'Français', short: 'FR', dir: 'ltr', og: 'fr_FR' },
  en: { label: 'English', short: 'EN', dir: 'ltr', og: 'en_US' },
  ar: { label: 'العربية', short: 'ع', dir: 'rtl', og: 'ar_AR' },
};

// Chemin d'une page dans une langue : le français est à la racine, /en et /ar pour les autres.
export const localizedPath = (path, locale) => {
  const clean = path === '/' ? '' : path;
  return locale === DEFAULT_LOCALE ? path : `/${locale}${clean}`;
};

export const localizedUrl = (path, locale) => `${SITE_URL}${localizedPath(path, locale)}`.replace(/\/$/, '') || SITE_URL;

export const makeI18n = (locale = DEFAULT_LOCALE, messages = {}) => {
  const current = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  return {
    locale: current,
    dir: LOCALE_META[current].dir,
    isRtl: LOCALE_META[current].dir === 'rtl',
    // tx({ fr, en, ar }) : choisit le texte de la langue courante (français par défaut)
    tx: (value) => (value && typeof value === 'object' ? value[current] ?? value.fr : value),
    // t('nav.home') : texte du dictionnaire partagé
    t: (key) => messages[current]?.[key] ?? messages.fr?.[key] ?? key,
  };
};

export const I18nContext = createContext(makeI18n());
export const useI18n = () => useContext(I18nContext);
