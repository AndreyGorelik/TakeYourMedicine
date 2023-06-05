module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
  'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          pages: './src/pages',
          src: './src',
        },
      },
    ],
  ],
};