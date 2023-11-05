module.exports = {
  allowUncaught: false,
  diff: true,
  exit: true,
  extension: ['test.ts'],
  'node-option': [
    'experimental-specifier-resolution=node',
    'loader=ts-node/esm/transpile-only',
  ],
  fullTrace: true,
  package: './package.json',
  recursive: true,
  require: [
    './src/tests/mochaHooks.ts',
  ],
  slow: 1000,
  timeout: 90000,
};
