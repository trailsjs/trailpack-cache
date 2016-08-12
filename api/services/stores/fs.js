'use strict'

const cacheManager = require('cache-manager')
const fsStore = require('cache-manager-fs')

/**
 * @module FsStore
 * @description Fs Store Provider
 */
module.exports = (config) => {
  config.store = fsStore
  return cacheManager.caching(config)
}
