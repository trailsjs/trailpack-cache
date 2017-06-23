'use strict'

const cacheManager = require('cache-manager')
const Service = require('trails/service')

/**
 * @module CacheService
 * @description Cache Service
 */
module.exports = class CacheService extends Service {

  constructor(app) {
    super(app)
    this.storeInstances = {}
  }

  getStore(name) {
    if (!name) {
      name = this.app.config.caches.defaults[0]
    }
    if (this.storeInstances[name]) {
      return this.storeInstances[name]
    }
    else {
      const stores = this.app.config.caches.stores.filter(store => store.name === name)
      if (stores.length === 0) {
        throw new Error('Store ' + name + ' doesn\'t exist')
      }
      this.storeInstances[name] = cacheManager.caching(stores[0])
      return this.storeInstances[name]
    }
  }

  /**
   * Get stores for multi caching
   * @param {Array} names of store wanted
   * @return {Object} Multi Caching Instance
   * @throws {Error} If no Store available/configured
   */
  getMultiCachingStore(names) {
    if (!names || names.length === 0) {
      names = this.app.config.caches.defaults
    }
    const name = names.join('_')
    if (this.storeInstances[name]) {
      return this.storeInstances[name]
    }
    else {
      const stores = []
      names.forEach(type => {
        stores.push(this.getStore(type))
      })
      this.storeInstances[name] = cacheManager.multiCaching(stores)
      return this.storeInstances[name]
    }
  }
}
