const path = require('path');

/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  rootDir: __dirname,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@koku-ui/ui-lib(.*)$': path.resolve(__dirname, '../../libs/ui-lib/src$1'),
    '^@koku-ui/onprem-cloud-deps(.*)$': path.resolve(__dirname, '../../libs/onprem-cloud-deps/src$1'),
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: false }],
    '^.+\\.svg$': 'jest-transform-stub',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
