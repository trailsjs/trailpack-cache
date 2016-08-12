'use strict'

const cacheManager = require('cache-manager')
const fsStore = require('cache-manager-fs-binary')

/**
 * @module FsbinaryStore
 * @description Fsbinary Store Provider
 */
module.exports = (config) => {
  config.store = fsStore
  return cacheManager.caching(config)
}
