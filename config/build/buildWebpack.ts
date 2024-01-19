import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildDevServer } from './buildDevserver';
import { buildLoaders } from './buildLoader';
import { buildPlugins } from './buildPlugins';


export function buildWebpack(options): webpack.Configuration {
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true
    },
    plugins: buildPlugins(),
    module: {
      rules: buildLoaders(),
    },
    resolve:
      devtool: isDev? 'inline-source-map': false,
    devServer: isDev ? buildDevServer : undefined,
  }
}