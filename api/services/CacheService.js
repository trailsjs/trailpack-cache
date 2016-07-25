'use strict'

const cacheManager = require('cache-manager')
const Service = require('trails-service')
const _ = require('lodash')

/**
 * @module CacheService
 * @description Cache Service
 */
module.exports = class CacheService extends Service {
  constructor(app) {
    super(app)
    this.stores = require('./stores')
    return this.getCaches();
  }

  /**
  * Get one or multiple cache stores
  * If not defined it will get all the defaults stores
  * @param stores String OR Array of stores names
  * @return Single OR MultiCache Instance
  */
  getCaches(stores) {
    if (_.isEmpty(stores)) {
      const stores = this.app.config.caches.defaults
    }
    return this.getStores(stores)
  }

  getStores(storesList) {
    // @TODO: Chache Manager Stores Configuration
  }
}
