/**
 * Cache Stores
 */
module.exports = {
  memory: require('./memory'),
  mongodb: require('./mongodb'),
  mongoose: require('./mongoose'),
  fs: require('./fs'),
  fsbinary: require('./fsbinary'),
  hazelcast: require('hazelcast')
}
