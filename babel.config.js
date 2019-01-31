module.exports = function (api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>1%', 'not ie > 0', 'not op_mini all'],
        },
      },
    ],
    '@babel/preset-react',
  ]

  const generateScopedName = api.env('test')
    ? '[local]'
    : '[local]__[path][name]__[hash:base64:5]'
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    ['react-css-modules', { generateScopedName }],
  ]

  return { presets, plugins }
}
