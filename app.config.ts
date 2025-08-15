// app.config.ts
import 'dotenv/config';
import { router } from 'expo-router';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'protein_structure_prediction',
  slug: 'protein_structure_prediction',
  version: '1.0.0',
  orientation: 'portrait',
  // icon: '@/assets/images/icon.png',
  scheme: 'proteinstructureprediction',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  ios: {
    supportsTablet: true,
  },

  android: {
    adaptiveIcon: {
      // foregroundImage: '@/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },

  web: {
    bundler: 'metro',
    output: 'static',
    // favicon: '@/assets/images/favicon.png',
  },

  plugins: [
    'expo-router',
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    API_URL: process.env.API_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    ENV: process.env.ENV || 'development',
    router: {
      origin: false
    }
  },
});
