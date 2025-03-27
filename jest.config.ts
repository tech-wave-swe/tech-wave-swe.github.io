// jest.config.js
module.exports = {
  // Specify the test match pattern to only run .test.ts files
  testMatch: ["<rootDir>/src/test/**/*.test.ts"],

  verbose: true,

  // Specify file extensions to process
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Use ts-jest for TypeScript support
  preset: "ts-jest",

  moduleNameMapper: {
    "^vscode$": "<rootDir>/src/test/unit/Mock/vscode.ts",
  },

  // Test environment (typically 'node' for VSCode extensions)
  testEnvironment: "node",

  // Optional: Ignore specific paths
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Add coverage configuration
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "clover"],

  // Specify which files to collect coverage from
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/test/**/*.ts",
    "!src/**/*.d.ts",
    "!src/extension.ts", // Exclude main extension file if needed
    "!**/node_modules/**",
  ],

  // Optional: Set coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
