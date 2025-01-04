const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    configure: (webpackConfig) => {
      const eslintPluginIndex = webpackConfig.plugins.findIndex(
        (plugin) => plugin.constructor.name === 'ESLintWebpackPlugin'
      );

      if (eslintPluginIndex !== -1) {
        webpackConfig.plugins.splice(eslintPluginIndex, 1);
      }

      return webpackConfig;
    },
  },
};
