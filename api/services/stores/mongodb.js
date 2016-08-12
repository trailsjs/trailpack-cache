'use strict'

const cacheManager = require('cache-manager')
const mongoStore = require('cache-manager-mongodb')

/**
 * @module MongodbStore
 * @description Mongodb Store  Provider
 */
module.exports = (config) => {
  config.store = mongoStore
  return cacheManager.caching(config)
}
