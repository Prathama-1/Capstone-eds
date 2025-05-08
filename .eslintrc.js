module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    // 'linebreak-style': 'off', // allow windows linebreaks
    'object-curly-newline': 'off',
    'quotes': 'off',
    'no-undef': 'off',
    'operator-linebreak': 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'spaced-comment': 'off',
    'prefer-const': 'off',
    'no-inner-declarations': 'off',
    'prefer-template': 'off',
    'no-dupe-keys': 'off',
    'quote-props': 'off',
    'no-trailing-spaces': 'off',
    'arrow-parens': 'off',
    'no-restricted-syntax': 'off',
    'nonblock-statement-body-position': 'off',
    'curly': 'off',
  },
};
