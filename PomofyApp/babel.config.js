module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... otras cosas que puedas tener ...
      'react-native-reanimated/plugin', // <-- ¡ESTA LÍNEA ES CRUCIAL!
    ],
  };
};