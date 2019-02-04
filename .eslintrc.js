module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['promise', 'jest', 'prettier', 'jsx-a11y', 'react'],
  extends: [
    'airbnb',
    'prettier/react',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',

    'import/no-extraneous-dependencies': 'off', // doesn't play well with lerna and webpack
    'import/prefer-default-export': 'off',

    'react/destructuring-assignment': 'off',
    'react/sort-comp': 'off', // finicky
    'react/require-default-props': 'off',
    'react/prefer-stateless-function': 'off',

    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}],

    'comma-dangle': ['error', 'always-multiline'],
    'no-var': ['error'],
    'prefer-const': ['error'],

    'no-alert': ['warn'],
    'no-console': ['warn'],
    'no-debugger': ['warn'],
  },
}
