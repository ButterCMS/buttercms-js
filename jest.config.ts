import { type Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!isomorphic-unfetch)"],
  automock: false,
  resetMocks: false,
  setupFiles: [
    "./jestSetup.ts"
  ]
};

module.exports = config