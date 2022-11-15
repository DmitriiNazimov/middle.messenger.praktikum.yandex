/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const productionConfig = require('./webpack.prod');

const developmentConfig = require('./webpack.dev');

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
