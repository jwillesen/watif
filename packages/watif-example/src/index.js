// export const foo = 'foo'
// export default 'foo'

const contextRequire = require.context('./items', true, /\.js$/)
const dynamicExports = {}
contextRequire.keys().forEach((moduleName) => {
  Object.assign(dynamicExports, contextRequire(moduleName))
})
module.exports = dynamicExports

// module.exports.items = {}
// module.exports.meta = {
//   title: 'House Sitting',
// }
//
// const glob = require('glob')
// const path = require('path')
// const pattern = path.join(__dirname, './*/**/*.js')
// const storyFiles = glob.sync(pattern)
// storyFiles.forEach((file) => {
//   Object.assign(module.exports.items, require(file))
// })
