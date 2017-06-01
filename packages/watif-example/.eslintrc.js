module.exports = {
  rules: {
    'camelcase': ['off'], // so we can use the `verb_` naming convention
    'react/no-unescaped-entities': ['off'], // so descriptions can use quotes and apostrophes without warning
    'react/display-name': ['off'], // so stateless functions can return jsx without warning
  },
}
