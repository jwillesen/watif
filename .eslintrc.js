module.exports = {
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'node': true,
    'jest': true,
  },
  plugins: ['react'],
  extends: ['standard', 'plugin:react/recommended'],
  rules: {
    "comma-dangle": ["error", "always-multiline"],

    "no-var": ["error"],
    "prefer-const": ["error"],

    "no-alert": ["warn"],
    "no-console": ["warn"],
    "no-debugger": ["warn"],
  },
}
