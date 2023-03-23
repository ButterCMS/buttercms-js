/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
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