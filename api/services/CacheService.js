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
  * @param stores String OR Array of stores names
  * @return Single OR MultiCache Instance
  */
  getCaches(stores) {
    if (_.isEmpty(stores) || _.isUndefined(stores)) {
      stores = this.app.config.caches.defaults
    }
    return this.getStores(stores)
  }

  /**
  * Get the stores from store configuration
  * @param storesConfig the configuration
  * @return Caching Intances
  */
  getStores(storesConfig) {
    // @TODO: Chache Manager caching Call
    const that = this
    const storePresets = new Array()
    _.each(storesConfig, function(value){
      storePresets.push(_.find(that.app.config.caches.stores, {name: value}))
    })
    _.each(storePresets, function(value){
      switch (value.type) {
      case 'memory':
        that.storeInstances[value.name] = that.stores.memory(value)
        break
      case 'fs':
        that.storeInstances[value.name] = that.stores.fs(value)
        break
      case 'fsbinary':
        that.storeInstances[value.name] = that.stores.fsbinary(value)
        break
      case 'mongodb':
        that.storeInstances[value.name] = that.stores.mongodb(value)
        break
      case 'mongoose':
        that.storeInstances[value.name] = that.stores.mongoose(value)
        break
      case 'redis':
        that.storeInstances[value.name] = that.stores.redis(value)
        break
      case 'hazelcast':
        that.storeInstances[value.name] = that.stores.hazelcast(value)
        break
      default:
        throw new Error('E_INCORECT_PARAMETER_IN_CONFIGURATION')
      }
    })
    this.storeInstances = that.storeInstances
    if (this.storeInstances.length > 1) {
      return cacheManager.multiCaching(this.storeInstances)
    }
    else {
      let instanceName
      for (const instance in this.storeInstances){
        instanceName = instance
      }
      return this.storeInstances[instanceName]
    }
  }
}
