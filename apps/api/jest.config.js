module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    '<rootDir>/src/modules/auth/**/*.ts',
    '<rootDir>/src/modules/users/**/*.ts',
    '<rootDir>/src/modules/videos/**/*.ts',
    '<rootDir>/src/modules/projects/**/*.ts',
    '<rootDir>/src/modules/feedback/**/*.ts',
    '<rootDir>/src/modules/settlements/**/*.ts',
    '<rootDir>/src/modules/cloudflare/**/*.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/index.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
