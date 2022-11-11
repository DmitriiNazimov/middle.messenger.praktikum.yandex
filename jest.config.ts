import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less|png)$': 'identity-obj-proxy',
    '^nanoid(/(.*)|$)': 'nanoid$1',
  },
};

export default config;
