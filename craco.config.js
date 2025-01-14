const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@theme': path.resolve(__dirname, 'src/theme'),
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
