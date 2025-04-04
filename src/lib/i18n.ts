
// Simple i18n utility for application localization
// This is a basic implementation that can be replaced with a more robust solution like i18next or react-intl

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Define available languages
export const LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

// Define translations
const translations: Translations = {
  en: {
    // Goals page translations
    'goals.title': 'Your Goals',
    'goals.addNew': 'Add New Goal',
    'goals.noGoals': 'No goals found in this category.',
    
    // Goal categories
    'goals.category.all': 'All Goals',
    'goals.category.lifestyle': 'Lifestyle',
    'goals.category.therapy': 'Therapy',
    'goals.category.medication': 'Medication',
    'goals.category.social': 'Social',
    'goals.category.copingSkills': 'Coping Skills',
    'goals.category.physicalHealth': 'Physical Health',
    
    // Goal status
    'goals.status.active': 'Active',
    'goals.status.completed': 'Completed',
    'goals.status.cancelled': 'Cancelled',
    'goals.status.overdue': 'Overdue',
    
    // Goal duration
    'goals.duration.short': 'Short Term',
    'goals.duration.medium': 'Medium Term',
    'goals.duration.long': 'Long Term',
    
    // Goal origin
    'goals.origin.hana': 'Hana Suggested',
    'goals.origin.patient': 'Personal',
  },
  es: {
    // Goals page translations - Spanish
    'goals.title': 'Tus Objetivos',
    'goals.addNew': 'Añadir Nuevo Objetivo',
    'goals.noGoals': 'No se encontraron objetivos en esta categoría.',
    
    // Goal categories
    'goals.category.all': 'Todos los Objetivos',
    'goals.category.lifestyle': 'Estilo de Vida',
    'goals.category.therapy': 'Terapia',
    'goals.category.medication': 'Medicación',
    'goals.category.social': 'Social',
    'goals.category.copingSkills': 'Habilidades de Afrontamiento',
    'goals.category.physicalHealth': 'Salud Física',
    
    // Goal status
    'goals.status.active': 'Activo',
    'goals.status.completed': 'Completado',
    'goals.status.cancelled': 'Cancelado',
    'goals.status.overdue': 'Atrasado',
    
    // Goal duration
    'goals.duration.short': 'Corto Plazo',
    'goals.duration.medium': 'Medio Plazo',
    'goals.duration.long': 'Largo Plazo',
    
    // Goal origin
    'goals.origin.hana': 'Sugerido por Hana',
    'goals.origin.patient': 'Personal',
  },
  fr: {
    // Goals page translations - French
    'goals.title': 'Vos Objectifs',
    'goals.addNew': 'Ajouter un Nouvel Objectif',
    'goals.noGoals': 'Aucun objectif trouvé dans cette catégorie.',
    
    // Goal categories
    'goals.category.all': 'Tous les Objectifs',
    'goals.category.lifestyle': 'Mode de Vie',
    'goals.category.therapy': 'Thérapie',
    'goals.category.medication': 'Médication',
    'goals.category.social': 'Social',
    'goals.category.copingSkills': 'Compétences d\'adaptation',
    'goals.category.physicalHealth': 'Santé Physique',
    
    // Goal status
    'goals.status.active': 'Actif',
    'goals.status.completed': 'Terminé',
    'goals.status.cancelled': 'Annulé',
    'goals.status.overdue': 'En retard',
    
    // Goal duration
    'goals.duration.short': 'Court Terme',
    'goals.duration.medium': 'Moyen Terme',
    'goals.duration.long': 'Long Terme',
    
    // Goal origin
    'goals.origin.hana': 'Suggéré par Hana',
    'goals.origin.patient': 'Personnel',
  },
};

// Current language (could be stored in localStorage, context, or state)
let currentLanguage = 'en';

// Get current language
export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

// Set current language
export const setLanguage = (lang: string): void => {
  if (translations[lang]) {
    currentLanguage = lang;
  } else {
    console.warn(`Language ${lang} is not supported. Falling back to English.`);
    currentLanguage = 'en';
  }
};

// Translate function
export const t = (key: string, params?: Record<string, string>): string => {
  const translation = translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
  
  if (params) {
    return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
      return acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    }, translation);
  }
  
  return translation;
};

// Get category translation key
export const getCategoryKey = (category: string): string => {
  switch (category) {
    case 'All Goals': return 'goals.category.all';
    case 'Lifestyle': return 'goals.category.lifestyle';
    case 'Therapy': return 'goals.category.therapy';
    case 'Medication': return 'goals.category.medication';
    case 'Social': return 'goals.category.social';
    case 'Coping Skills': return 'goals.category.copingSkills';
    case 'Physical Health': return 'goals.category.physicalHealth';
    default: return category;
  }
};

// Get status translation key
export const getStatusKey = (status: string): string => {
  switch (status) {
    case 'ACTIVE': return 'goals.status.active';
    case 'COMPLETED': return 'goals.status.completed';
    case 'CANCELLED': return 'goals.status.cancelled';
    case 'OVERDUE': return 'goals.status.overdue';
    default: return status;
  }
};

// Get duration translation key
export const getDurationKey = (durationType: string): string => {
  switch (durationType) {
    case 'SHORT': return 'goals.duration.short';
    case 'MEDIUM': return 'goals.duration.medium';
    case 'LONG': return 'goals.duration.long';
    default: return durationType;
  }
};

// Get origin translation key
export const getOriginKey = (origin: string): string => {
  switch (origin) {
    case 'HANA': return 'goals.origin.hana';
    case 'PATIENT': return 'goals.origin.patient';
    default: return origin;
  }
};
