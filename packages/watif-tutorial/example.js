const contextRequire = require.context('./src/items', true, /\.js$/)
const itemExports = {}
contextRequire.keys().forEach((moduleName) => {
  Object.assign(itemExports, contextRequire(moduleName))
})

export {itemExports as items}
export * from './src/index.js'
