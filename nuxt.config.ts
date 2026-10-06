// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  runtimeConfig: {
    public: {
      // Surchargé par NUXT_PUBLIC_CONTACT_EMAIL (voir .env.example et Vercel).
      contactEmail: 'contact@maisondescoursiers.example'
    }
  },
  vite: {
    // Leaflet est importé dynamiquement côté client : on le pré-optimise pour
    // éviter un rechargement de dépendance au premier affichage de la carte.
    optimizeDeps: { include: ['leaflet'] }
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  i18n: {
    // Pour ajouter une langue : un fichier i18n/locales/<code>.json, un dossier
    // content/<code>/ et une entrée ici (avec `dir: 'rtl'` pour l'arabe).
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    // Le sélecteur de langue est le seul moyen de changer de langue : pas de
    // redirection silencieuse selon la langue du navigateur.
    detectBrowserLanguage: false
  },
  icon: {
    // Embarque localement toutes les icônes utilisées : pas d'appel à l'API Iconify.
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  }
})
