/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

// Плагин для обработки HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Плагин для экспорта css в отдельный файл, а не инлайново в html.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Адаптирует стили под старыe браузеры.
const postCssPresetEnv = require('postcss-preset-env');

const path = require('path');

module.exports = {
  target: 'web', // для какой платформы создаем сборку
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      handlebars: 'handlebars/dist/handlebars',
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
    },
  },
  cache: { type: 'filesystem' }, // кэширование для ускорения сборки
  entry: path.resolve(__dirname, 'src/index.ts'), // точка входа
  output: {
    clean: true, // удалять старую сборку
    path: path.resolve(__dirname, 'dist'), // куда сохранять сборку
    filename: 'script.[contenthash].js',
    publicPath: '/',
    assetModuleFilename: 'asset/resource/[name][ext]', // путь для картинок и шрифтов
  },
  module: {
    rules: [
      {
        // Для отслеживания изменений html в режиме hot reload.
        // По умолчанию html не отслеживается.
        // Нужно прописать в index.ts: import './index.html';
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.ts?$/,
        use: [
          'thread-loader', // ускорение сборки через мультипоточность
          {
            loader: 'babel-loader',
            // кэширование для ускорения сборки
            options: {
              cacheCompression: false,
              cacheDirectory: true,
            },
          },
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [postCssPresetEnv] } },
          },
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // Чтобы картинки попали в папку dist их нужно импортировать в стилях или js/ts
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { enabled: false },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: { interlaced: false },
              webp: { quality: 75 },
            },
          },
        ],
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
  ],
};
