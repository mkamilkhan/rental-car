import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return key; // Return key if translation not found
    }
  }
  
  return value || key;
};

export default translations;


