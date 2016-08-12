'use strict'

const cacheManager = require('cache-manager')

/**
 * @module MemoryStore
 * @description Memory Store Provider
 */
module.exports = (config) => {
  config.store = 'memory'
  return cacheManager.caching(config)
}
