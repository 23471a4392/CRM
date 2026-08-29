/**
 * Application configuration module.
 *
 * Reads environment variables (VITE_*) and exposes them as a typed
 * configuration object so the rest of the codebase never touches
 * `import.meta.env` directly.
 */

const config = Object.freeze({
  // App metadata
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Ledger CRM',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  // API settings (for future backend)
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30_000,
  },

  // Feature flags
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    csvImport: import.meta.env.VITE_ENABLE_CSV_IMPORT !== 'false',
    csvExport: import.meta.env.VITE_ENABLE_CSV_EXPORT !== 'false',
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
    activityLog: import.meta.env.VITE_ENABLE_ACTIVITY_LOG === 'true',
  },

  // Storage keys
  storage: {
    prefix: import.meta.env.VITE_STORAGE_PREFIX || 'ledger-crm',
    version: Number(import.meta.env.VITE_STORAGE_VERSION) || 1,
  },
});

export default config;
