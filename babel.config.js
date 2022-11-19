module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@assets': './assets',
          '@components': './app/components',
          '@navigator': './app/navigator',
          '@screens': './app/screens',
          '@theme': './app/theme',
          '@utils': './app/utils',
          '@store': './app/store',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
