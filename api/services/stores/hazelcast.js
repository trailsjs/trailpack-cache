'use strict'

const cacheManager = require('cache-manager')
const hazelcastStore = require('cache-manager-hazelcast')

/**
 * @module HazelcastStore
 * @description Hazelcast Store Provider
 */
module.exports = (config) => {
  config.store = hazelcastStore
  return cacheManager.caching(config)
}
