'use strict'

const Trailpack = require('trailpack')

module.exports = class CacheTrailpack extends Trailpack {

  /**
   * Validate caches config
   */
  validate() {
    if (!this.app.config.caches) {
      return Promise.reject(
        new Error('There no cache.js under ./config,' +
          'check it\'s load in ./config/index.js or create it !')
      )
    }
  }

  /**
   * Check if there some stores, if not set a default one
   */
  configure() {
    if (this.app.config.caches.stores.length === 0) {
      this.app.config.caches.stores = [
        // Default Memory Store
        {
          name: 'memory',
          type: 'memory',
          max: 500,
          ttl: 0
        }]

      this.app.config.caches.defaults = ['memory']
    }
  }

  /**
   * create caching stores
   */
  initialize() {
    return this.app.services.CacheService.init()
  }

  unload() {
    return this.app.services.CacheService.unload()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
