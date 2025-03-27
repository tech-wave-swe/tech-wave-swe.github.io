// jest.config.js
module.exports = {
  // Specify the test match pattern to only run .test.ts files
  testMatch: [
    '<rootDir>/test/**/*.test.ts'
  ],

  verbose: true,

  // Specify file extensions to process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Use ts-jest for TypeScript support
  preset: 'ts-jest',

  moduleNameMapper: {
    '^vscode$': '<rootDir>/__mocks__/vscode.ts'
  },

  // Test environment (typically 'node' for VSCode extensions)
  testEnvironment: 'node',

  // Optional: Ignore specific paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],

  collectCoverage: true,

  // Specify coverage reporters
  coverageReporters: [
    'text',      // Prints coverage summary to console
    'lcov',      // Generates lcov.info file for Coveralls
    'text-summary'
  ],

  // Specify which files to include in coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/Models/**/*.ts',      // Exclude type definition files
    '!src/test/**/*.{js,jsx,ts,tsx}', // Exclude test files
    '!**/node_modules/**'
  ],
};