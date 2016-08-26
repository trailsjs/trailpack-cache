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
    this.storeInstances = new Array()
    this.stores = require('./stores')
  }

  /**
   * Get one or multiple cache stores
   * If not defined it will get all the defaults stores
   * @param {Array|String} stores String OR Array of stores names
   * @return {Object} Single OR MultiCache Instance
   */
  getCaches(stores) {
    if (_.isEmpty(stores) || _.isUndefined(stores)) {
      stores = this.app.config.caches.defaults
    }
    return this.getStores(stores)
  }

  /**
   * Get the stores from store configuration
   * @param {Object} storesConfig the configuration
   * @return {Object|Array} Caching Intances
   * @throws {Error} If no Store available/configured
   */
  getStores(storesConfig) {
    // @TODO: Chache Manager caching Call
    const storePresets = new Array()
    _.each(storesConfig, value => {
      storePresets.push(_.find(this.app.config.caches.stores, {
        name: value
      }))
    })
    _.each(storePresets, value => {
      if (!_.isFunction(this.stores[value.type]))
        throw new Error('E_INCORECT_PARAMETER_IN_CONFIGURATION')

      this.storeInstances[value.name] = this.stores[value.type](value)
    })
    const keys = _.keys(this.storeInstances)
    if (!keys.length)
      throw new Error('E_NO_STORES_CONFIGURED')

    if (keys.length > 1)
      return cacheManager.multiCaching(this.storeInstances)
    else
      return this.storeInstances[keys[0]]
  }
}
