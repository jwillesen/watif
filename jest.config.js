module.exports = {
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.env.js'],
  moduleNameMapper: {
    '(css|html)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageReporters: ['html', 'text'],
}
