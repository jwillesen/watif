const esModules = process.env.ES_MODULES

module.exports = function (context, opts) {
  const presetEnvOpts = {
    targets: {
      browsers: ['last 2 versions', 'not ie <= 10'],
    },
  }

  if (esModules) presetEnvOpts.modules = false

  const presets = [
    [require.resolve('babel-preset-env'), presetEnvOpts],
  ]

  const plugins = [
    ['babel-plugin-react-css-modules', {
      'generateScopedName': '[path]__[name]__[local]__[hash:base64:5]',
    }],
  ]
  if (process.env.NODE_ENV === 'test' || process.env.BABEL_ENV === 'test') {
    plugins.pop()
  }

  return { presets, plugins }
}
