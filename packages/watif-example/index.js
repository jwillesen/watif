const contextRequire = require.context('./src', true, /\.js$/)
const itemExports = {}
contextRequire.keys().forEach((moduleName) => {
  Object.assign(itemExports, contextRequire(moduleName))
})
module.exports.items = itemExports
