const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource', // 👈 Modern way (recommended)
          generator: {
            filename: 'img/[name][ext]', // Or 'img/[name].[hash][ext]' if you want cache busting
          },
        },
      ],
    },
    output: {
      filename: 'bundle.[contenthash].js', // Hashes för cachehantering
    },
  },
});
