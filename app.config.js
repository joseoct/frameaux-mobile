export default {
  expo: {
    name: 'Frameaux',
    icon: './src/assets/icon.png',
    version: '1.0.1',
    ios: {
      bundleIdentifier: 'com.frameaux',
      buildNumber: '1.0.2',
    },
    android: {
      package: 'com.frameaux',
      versionCode: 1,
    },
    extra: {
      API_URL:
        process.env.ENVIRONMENT === 'production'
          ? 'https://api.frameaux.ga'
          : 'http://localhost:3333',
    },
  },
};
