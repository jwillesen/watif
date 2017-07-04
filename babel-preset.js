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

  const plugins = []

  return { presets, plugins }
}
