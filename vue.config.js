import { defineConfig } from '@vue/cli-service';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export default defineConfig({
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
