/* eslint-disable @typescript-eslint/no-var-requires */

// DEV сборка

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // Настройки для сервера разработки.
  devServer: {
    hot: true, // Перезагрузка при изменении файлов.
    open: true, // Чтобы сразу барузер открывался при запуске dev сервера.
    static: {
      // Отслеживать изменения статических файлов.
      watch: true,
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      // уведомлять в браузере о проблемах.
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    historyApiFallback: true, // Чтобы при обновлении страницы открывал index.html, а не текущий URL
    compress: true, // gzip
    port: 1234,
  },
};
