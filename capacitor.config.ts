import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.professor.historygeo',
  appName: 'أرشيف أستاذ الاجتماعيات',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    ScreenOrientation: {
      initialOrientation: 'portrait'
    }
  }
};

export default config;
