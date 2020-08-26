module.exports = {
  testMatch: [
    '**/__tests__/*.(js|jsx)',
  ],
  moduleNameMapper: {
    '\\.(less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
