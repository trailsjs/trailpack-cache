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

  init() {
    const stores = this.app.config.caches.stores
    const storesCreation = []

    for (let store of stores) {
      if (store.options && store.options.collection) {
        storesCreation.push(new Promise(resolve => {
          let mongoStore
          store.createCollectionCallback = () => {
            return resolve({
              name: store.name,
              store: mongoStore
            })
          }
          mongoStore = cacheManager.caching(store)
        }))
      }
      else {
        storesCreation.push(Promise.resolve({
          name: store.name,
          store: cacheManager.caching(store)
        }))
      }
    }

    return Promise.all(storesCreation).then(results => {
      for (let result of results) {
        this.storeInstances[result.name] = result.store
      }
    })
  }

  getStore(name) {
    if (!name) {
      name = this.app.config.caches.defaults[0]
    }
    if (this.storeInstances[name]) {
      return this.storeInstances[name]
    }
    else {
      throw new Error('unknown store named ' + name)
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

  unload() {
    const unloadActions = []
    for (let key in this.storeInstances) {
      const cache = this.storeInstances[key]
      if (cache.store && cache.store.client) {
        unloadActions.push(new Promise((resolve, reject) => {
          cache.store.client.close(true, err => {
            if (err) {
              reject(err)
            }
            else {
              resolve()
            }
          })
        }))
      }
    }
    return Promise.all(unloadActions)
  }
}
