/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

// PRODUCTION сборка

// Минификация CSS в экспортированном файле.
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// Минификация JS/TS
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: { chunks: 'all' },
  },
};
