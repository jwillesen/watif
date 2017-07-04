const contextRequire = require.context('./src', true, /\.js$/)
const dynamicExports = {}
contextRequire.keys().forEach((moduleName) => {
  Object.assign(dynamicExports, contextRequire(moduleName))
})
module.exports = dynamicExports
