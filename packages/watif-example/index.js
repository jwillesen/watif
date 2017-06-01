const glob = require('glob')
const path = require('path')
const pattern = path.join(__dirname, 'src/**/*.js')
const storyFiles = glob.sync(pattern)
storyFiles.forEach((file) => {
  Object.assign(module.exports, require(file))
})
