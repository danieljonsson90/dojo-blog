/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js', // Relative to apps/blog
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  outputDir: path.resolve(__dirname, '../../dist/apps/blog'), // Set correct build output

  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          },
        },
      ],
    },
    output: {
      filename: 'bundle.[contenthash].js',
    },
  },
});
