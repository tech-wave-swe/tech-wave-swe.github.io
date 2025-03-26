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
  ]
};