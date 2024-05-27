module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
module.exports = {
  transformIgnorePatterns: ['node_modules/(?!es-module-lexer)'],
};