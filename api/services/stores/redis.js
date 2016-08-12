'use strict'

const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

/**
 * @module RedisStore
 * @description Redis Store Provider
 */
module.exports = (config) => {
  config.store = redisStore
  return cacheManager.caching(config)
}
